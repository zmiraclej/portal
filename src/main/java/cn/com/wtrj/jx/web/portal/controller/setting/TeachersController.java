package cn.com.wtrj.jx.web.portal.controller.setting;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.JsonObject;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.Teacher;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjTeacher;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjUser;
import cn.com.wtrj.jx.web.portal.service.TeacherService;
import cn.com.wtrj.jx.web.portal.service.UserService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dto.Grade;
import cn.com.wtrj.jx.web.portal.service.dto.Role;
import cn.com.wtrj.jx.web.portal.service.dto.School;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleService;
import cn.com.wtrj.jx.web.portal.utils.WeixinUtil;

@Controller
public class TeachersController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(TeachersController.class);

	@Autowired
	UserService userService;

	@Autowired
	IRoleService roleService;

	@Autowired
	TeacherService teacherService;
	
	@Autowired
	IDictService dictService;
	
	@Value("${teacher_sync_appid}")
	String appId;
	
	@Value("${teacher_sync_secret}")
	String secret;
	
	@Value("${teacher_sync_dept}")
	String deptId;
	
	
	/**
	 * 反回页面
	 * 
	 * @return
	 */
	@RequestMapping("/teachers")
	public String searchTeachers(Map<String, Object> model, Model params) {
		// 记录所选模块的Id
		model.put("id", MenuId.SETTING_TEACHERS);
		this.doCommonSetting(model);

		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		
		List<School> usList = teacherService.findUserSchools(user.getTeacherId());
		
		params.addAttribute("schools", usList);
		
		return "setting/teachers";
	}

	@ResponseBody
	@RequestMapping(value = "/searchTeachers")
	public PageData<List<Teacher>> searchTeachers(PageSearchParam param) {
		logger.info("用户查询开始");

		PageData<List<Teacher>> ret = new PageData<List<Teacher>>();
		try {
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			List<School> usList = teacherService.findUserSchools(user.getTeacherId());
			
			//List<School> tsList = teacherService.findTeacherSelectionSchools(teacherId);
			
			List<String> scs = new ArrayList<>();
			
			for(School s : usList) {
				scs.add(s.getCode());
			}
			
			// 获取用户数量
			int total = teacherService.countTeachers(scs, param.getSearch());
			ret.setTotal(total);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
			// 获取用户明细
			int end = param.getOffset() + param.getLimit();
			List<Teacher> teacherList = teacherService.searchTeachersByPage(param.getOffset() + 1, end, scs, param.getSearch());

			// ---------------------获取关联用户信息---------------------
			List<Integer> userIds = new ArrayList<Integer>();
			for (Teacher teacher : teacherList) {
				if (teacher.getUserId() != null) {
					userIds.add(teacher.getUserId());
				}
			}
			
			if (userIds.size() > 0) {
				List<WtrjUser> users = userService.searchUsersByIds(userIds);
				if (users != null && users.size() > 0) {
					Map<Integer,WtrjUser> map = new HashMap<Integer, WtrjUser>();
					for (WtrjUser record : users) {
						map.put(record.getId(), record);
					}
					for (Teacher teacher : teacherList) {
						WtrjUser u = map.get(teacher.getUserId());
						if (u != null) {
							teacher.setLoginUserName(u.getName());
							teacher.setLoginUserPhone(u.getTel());
						}
					}
				}
			}
			
			// ---------------------获取关联微信账号信息---------------------
			for (Teacher t : teacherList) {
				try {
					JsonObject jo = WeixinUtil.getUserInfo(appId, secret, t.getJobNumber());
					if (jo != null) {
						if ("0".equals(jo.get("errcode").getAsString())) {
							t.setWxAccount(jo.get("userid").getAsString());
							t.setWxMobile(jo.get("mobile").getAsString());
						}
					}
				} catch (Exception e) {
					logger.error("微信调用异常！", e);
				}
				
			}
			
			ret.setRows(teacherList);
		} catch (Exception e) {
			logger.error("用户查询！", e);
		}
		logger.info("用户查询结束");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "/saveNewTeacher", method = RequestMethod.POST)
	public BaseRet<String> saveNewTeacher(@RequestBody Teacher teacher) {
		logger.info("新增教师保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			
			teacherService.addTeacher(teacher);
			
			return ret;
		} catch (Exception e) {
			logger.error("新增教师保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("新增教师失败！" + e.getMessage());
		}
		logger.info("新增教师保存结束.");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "/synWxAccount", method = RequestMethod.POST)
	public BaseRet<String> synWxAccount(@RequestBody Integer id) {
		logger.info("同步微信教师信息开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			WtrjTeacher teacher = teacherService.findTeacherById(id);
			if (teacher != null) {
				JsonObject jo = WeixinUtil.getUserInfo(appId, secret, teacher.getJobNumber());
				if (jo != null) {
					if ("0".equals(jo.get("errcode").getAsString())) {
						String wxMobile = jo.get("mobile").getAsString();
						if (!wxMobile.equals(teacher.getPhone())) {
							// 更新用户手机号
							JsonObject updRst = WeixinUtil.changeUserMobileInfo(appId, secret, teacher.getJobNumber(), teacher.getPhone());
							if (updRst == null || !"0".equals(updRst.get("errcode").getAsString())) {
								ret.setCode(Constant.RetCode.ERROR);
								ret.setMsg("微信同步失败");
							}
							
						}
					} else if("60111".equals(jo.get("errcode").getAsString())){
						// 创建用户
						JsonObject addRst = WeixinUtil.createUser(appId, secret, teacher.getName(), teacher.getJobNumber(), teacher.getPhone(), Long.valueOf(deptId));
						if (addRst == null || !"0".equals(addRst.get("errcode").getAsString())) {
							ret.setCode(Constant.RetCode.ERROR);
							ret.setMsg("微信同步失败");
						}
					}
				} 
			}
			
			return ret;
		} catch (Exception e) {
			logger.error("同步微信教师信息失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("同步微信教师信息失败！" + e.getMessage());
		}
		logger.info("新增教师保存结束.");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "/saveEditTeacher", method = RequestMethod.POST)
	public BaseRet<String> saveEditTeacher(@RequestBody Teacher teacher) {
		logger.info("修改教师保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			
			Teacher t = teacherService.findTeacherByPhone(teacher.getPhone());
			
			if(t != null) {
				if(teacher.getPhone().equals(t.getPhone()) && Integer.parseInt(t.getId().toString()) != Integer.parseInt(teacher.getId().toString())) {
					ret.setCode(Constant.RetCode.ERROR);
					ret.setMsg("修改教师失败，电话号已存在！");
					return ret;
				}
			}
			
			List<School> usList = teacherService.findUserSchools(user.getTeacherId());
			
			ret.setCode(Constant.RetCode.SUCCESS);
			
			teacherService.editTeacher(teacher, usList);
			
			return ret;
		} catch (Exception e) {
			logger.error("修改教师保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("修改教师失败！" + e.getMessage());
		}
		logger.info("修改教师保存结束.");
		return ret;
	}
	
	@RequestMapping("/toEditTeacher")
	public String toEditTeacher(Integer teacherId, Model model) {
		
		Teacher t = teacherService.getTeacher(teacherId);
		model.addAttribute("t", t);
		
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		
		List<School> usList = teacherService.findUserSchools(user.getTeacherId());
		
		if(usList != null && usList.size()>0 &&t.getSlist() != null && t.getSlist().size() > 0) {
			
			for(School s : usList) {
				
				boolean checked = false;
				for(School ts : t.getSlist()){
					if(s.getCode().equals(ts.getCode())) {
						checked = true;
						break;
					}
				}
				if(checked) {
					s.setChecked(true);
				}
				
			}
			
		}
		
		model.addAttribute("schools", usList);
		
		return "setting/teacher-edit";
		
		//logger.info("新增教师保存开始");

		/*BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			
			teacherService.addTeacher(teacher);
			
			return ret;
		} catch (Exception e) {
			logger.error("新增教师保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("新增教师失败！" + e.getMessage());
		}
		logger.info("新增教师保存结束.");
		return ret;*/
	}
	
	
	/*@RequestMapping("/toSchoolsPermission")
	public String toSchoolPermission(Integer teacherId) {
		
		List<School> tsList = teacherService.findUserSchools(teacherId);
		
		
		
		return "setting/school-permission";
	}*/

	@RequestMapping("/findSelectionSchools")
	public String findSelectionSchools(String teacherId, Model model){
		List<School> tsList = teacherService.findTeacherSelectionSchools(teacherId);
		model.addAttribute("schools", tsList);
		return "setting/school-selection";
	}

	@RequestMapping("/toSchoolsPermission")
	public String findSchools(String teacherId, String schoolCode, Model model){

		List<DictItem> items = dictService.findDictItemsByCode("subject");
		
		List<Grade> gs = teacherService.findGradesBySchoolCode(schoolCode);
		
		model.addAttribute("dicts", items);
		model.addAttribute("grades", gs);
		
		return "setting/school-permission";
	}
	
	@RequestMapping("/toFindTeacherRoles")
	public String toFindTeacherRoles(String teacherId, Model model) {

		List<School> usList = teacherService.findTeacherSelectionSchools(teacherId);
		
		model.addAttribute("schools", usList);
		model.addAttribute("teacherId", teacherId);
		
		return "setting/teacher-roles";
	}
	
	@RequestMapping("/toPersonalTeacherRole")
	public String toPersonalTeacherRole(Map<String, Object> model, Model params) {
		// 记录所选模块的Id
		//model.put("id", MenuId.SETTING_TEACHERS);
		
		
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		//Teacher teacher = teacherService.findTeacherByPhone(user.getPhone());
		//String teacherId = teacher.getId().toString();
		
		String teacherId = null;
		
		if(user.getTeacherId() != null) {
			teacherId = String.valueOf(user.getTeacherId());
		}
		
		List<School> usList = teacherService.findTeacherSelectionSchools(teacherId);
		
		params.addAttribute("schools", usList);
		params.addAttribute("teacherId", teacherId);
		
		this.doCommonSetting(model);
		return "setting/personal-teacher-role";
	}
	
	@ResponseBody
	@RequestMapping("/findTeacherRoles")
	public List<Role> findTeacherRoles(Integer teacherId, String schoolCode) {
		return teacherService.findTeacherRoles(teacherId, schoolCode);
	}
	
	@ResponseBody
	@RequestMapping("/deleteTeacherRole")
	public BaseRet<String> deleteTeacherRole(Integer teacherId, String type, String schoolCode) {
		
		teacherService.deleteTeacherRole(teacherId, type, schoolCode);

		BaseRet<String> ret = new BaseRet<String>();
		ret.setCode(Constant.RetCode.SUCCESS);
		
		return ret;
	}
	
	public String findTeacherRoleInfos(String roleType, String schoolCode, Integer teacherId, Model model) {
		List<TeacherPermission> tps = teacherService.findTeacherRoleInfos(roleType, schoolCode, teacherId);
		model.addAttribute("tps", tps);
		model.addAttribute("roleType", roleType);
		return "setting/select-view";
	}

	@RequestMapping("/toSelectTeacherRole")
	public String toSelectTeacherRole(String teacherId, Model model) {
		return "setting/select-role";
	}
	
	@RequestMapping("/toAddTeacherRole")
	public String toAddTeacherRole(String roleCode, String schoolCode, Model model) {
		
		if("1".equals(roleCode) || "3".equals(roleCode)) {
			List<DictItem> items = dictService.findDictItemsByCode("subject");
			
			List<Grade> gs = teacherService.findGradesBySchoolCode(schoolCode);
			
			model.addAttribute("dicts", items);
			model.addAttribute("grades", gs);
			
			if("1".equals(roleCode) ) {
				return "setting/select-rk";
			}
			
			if("3".equals(roleCode) ) {
				return "setting/select-bk";
			}
			
		}
		
		if("2".equals(roleCode)) {
			List<DictItem> items = dictService.findDictItemsByCode("subject");
			
			model.addAttribute("dicts", items);
			return "setting/select-jy";
		}
		
		if("4".equals(roleCode)) {
			List<Grade> gs = teacherService.findGradesBySchoolCode(schoolCode);
			
			model.addAttribute("grades", gs);
			return "setting/select-nj";
		}
		
		if("5".equals(roleCode) || "7".equals(roleCode)) {
			List<Grade> gs = teacherService.findGradesBySchoolCode(schoolCode);
			
			model.addAttribute("grades", gs);
			return "setting/select-bzr";
		}
		
		return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "/saveTeacherRole", method = RequestMethod.POST)
	public BaseRet<String> saveTeacherRole(@RequestBody TeacherPermission tp){
		
		logger.info("新增教师角色保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		ret.setCode(Constant.RetCode.SUCCESS);
		
		teacherService.addTeacherRole(tp);
		logger.info("新增教师角色保存结束");
		return ret;
	}
}
