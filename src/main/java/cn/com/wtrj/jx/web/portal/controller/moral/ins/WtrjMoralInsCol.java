package cn.com.wtrj.jx.web.portal.controller.moral.ins;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

import com.google.common.base.Strings;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.controller.response.moral.ins.InsRet;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjStudent;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjTeacher;
import cn.com.wtrj.jx.web.portal.model.entities.moralStudent.WtrjMoralINS;
import cn.com.wtrj.jx.web.portal.model.entities.moralStudent.WtrjMoralStandard;
import cn.com.wtrj.jx.web.portal.model.entities.wtrjEdu.WtrjEduPlanTemplates;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtStudent;
import cn.com.wtrj.jx.web.portal.model.mt.entities.StudentDto;
import cn.com.wtrj.jx.web.portal.model.mt.entities.moral.ClassSchoolDto;
import cn.com.wtrj.jx.web.portal.model.mt.entities.moral.MtInsDto;
import cn.com.wtrj.jx.web.portal.service.IWtrjEcomClassService;
import cn.com.wtrj.jx.web.portal.service.IWtrjStudentService;
import cn.com.wtrj.jx.web.portal.service.TeacherService;
import cn.com.wtrj.jx.web.portal.service.common.ITeacherPermissionService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dto.Role;
import cn.com.wtrj.jx.web.portal.service.dto.UserPermission;
import cn.com.wtrj.jx.web.portal.service.moralStudent.IWtrjMoralINSService;
import cn.com.wtrj.jx.web.portal.service.moralStudent.IWtrjMoralStandardService;
import cn.com.wtrj.jx.web.portal.util.JsonUtil;

@Controller
@RequestMapping("/")
public class WtrjMoralInsCol extends BaseController {
	private final static Logger logger = LoggerFactory.getLogger(WtrjMoralInsCol.class);

	@Autowired
	private IWtrjMoralINSService iWtrjMoralINSService;

	@Autowired
	private IWtrjStudentService iWtrjStudentService;
	@Autowired
	private IWtrjMoralStandardService wtrjMoralStandardService;

	@Autowired
	private IWtrjEcomClassService iWtrjEcomClassService;

	@Autowired
	private TeacherService tService;

	@Autowired
	private IDictService dictService;
	
	@Autowired
	private ITeacherPermissionService tpService;
	
	@Value("${file_server_path}")
	private String savePath;
	
	/**
	 * 跳转实例列表页面
	 */
	@RequestMapping("/moral")
	public String index(HttpServletRequest request, Map<String,Object> p, Model model) {
		List<WtrjMoralStandard> list = wtrjMoralStandardService.getAll();
		p.put("insTree", treeData(list));
		p.put("id", MenuId.MORAL);
		this.doCommonSetting(p);
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		if(user != null) {
			List<TeacherPermission> schools = tpService.findSchoolsByTeacherId(String.valueOf(user.getTeacherId()));
			
			if(schools != null && schools.size() > 0) {
				model.addAttribute("schools", schools);
				
				String schoolCode = schools.get(0).getSchoolCode();
				
				
				List<Role> roles = tService.findTeacherRoleTypes(user.getTeacherId(), schoolCode);
				
				List<Role> dyRoles = new ArrayList<Role>();
				
				if(roles != null && roles.size() >0) {
					// 计划类型
					for(Role r : roles) {
						if("1".equals(r.getId())) {
							dyRoles.add(r);
						}
						
						if("5".equals(r.getId())) {
							dyRoles.add(r);						
						}
						
						if("7".equals(r.getId())) {
							dyRoles.add(r);
						}
						
						if("8".equals(r.getId())) {
							dyRoles.add(r);
							model.addAttribute("dy", "1");
						}
					}
					
					if(dyRoles.size() >0) {
						model.addAttribute("roles", dyRoles);
						List<TeacherPermission> classes = tService.findTeacherPermissionClass(user.getTeacherId(), dyRoles.get(0).getId(), schoolCode);
						List<DictItem> courses = dictService.findDictItemsByCode(Constant.PlanType.subject);
						model.addAttribute("classes", classes);
						model.addAttribute("courses", courses);
					}
					
					
				}
				
			}
		
		}
		
		return "ins/wtrjIns";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ins/findTeacherRoles")
	public List<Role> findTeacherRoles(String schoolCode) {
		
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		if(user != null) {
			List<Role> roles = tService.findTeacherRoleTypes(user.getTeacherId(), schoolCode);
			return roles;
		}
		
		return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ins/findTeacherClasss")
	public List<TeacherPermission> findTeacherRoles(String schoolCode, String role) {
		
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		if(user != null) {
			List<TeacherPermission> classes = tService.findTeacherPermissionClass(user.getTeacherId(), role, schoolCode);
			return classes;
		}
		
		return null;
	}

	/**
	 * 
	 * @param param
	 * @param gradeNo
	 *            年级
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/searchIns")
	public PageData<List<WtrjMoralINS>> searchIns(PageSearchParam param, String schoolCode, String role,String classId) {
		PageData<List<WtrjMoralINS>> ret = new PageData<List<WtrjMoralINS>>();
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		int start = param.getOffset() + 1;
		int end = param.getOffset() + param.getLimit();
		logger.info("教师角色："+role);
		int count = iWtrjMoralINSService.countIns(user.getTeacherId(), schoolCode, Integer.valueOf(role), classId);
		
		List<WtrjMoralINS> list = iWtrjMoralINSService.pageIns(user.getTeacherId(), schoolCode, Integer.valueOf(role), classId, start, end);
		
		
		ret.setRows(list);
		ret.setTotal(count);
		
		
		/*
		int start = param.getOffset() + 1;
		int end = param.getOffset() + param.getLimit();
		List<WtrjEduPlanTemplates> list = wtrjEduPlanTemplatesService.getEduPlanTemplatesByPage(type, start, end);
		List<WtrjEduPlanTemplates> wps = new ArrayList<WtrjEduPlanTemplates>();
		int count = wtrjEduPlanTemplatesService.countGetEduPlanTemplatesByPage(type);
		ret.setRows(list);
		ret.setTotal(count);*/
		
//		tService.
		
//		tService.findTeacherRoles(teacherId, schoolCode);
		
//		WtrjTeacher teacher = teacherService.searchTeacherByPhone(user.getPhone());
		
		
		
		/*UserPermission u = getPermission();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		try {

			// 模拟登录角色
//			u.setIsHeadTeacher(true);
			//			u.setIsCourseTeacher(true);
			//			u.setIsMoralTeacher(true);
			//			u.setIsDormTeacher(true);
			// 获取实例明细
			int end = param.getOffset() + param.getLimit();
			List<InsRet> ins = new ArrayList<InsRet>();
			List<MtInsDto> list = new ArrayList<MtInsDto>();
			// 班主任和任课老师直接查询教师Id
			if ((u.getIsHeadTeacher() != null && u.getIsHeadTeacher())
					|| (u.getIsCourseTeacher() != null && u.getIsCourseTeacher())) {
				// 模拟老师ID
				//teacher.setId(2);
				//classNo = 110;
				int total = iWtrjMoralINSService.countSelectINSByTeacherId(param.getSearch(), user.getTeacherId(), classNo);
				ret.setTotal(total);
				list = iWtrjMoralINSService.selectINSByPageByTeacherId(param.getOffset() + 1, end, param.getSearch(),
						user.getTeacherId(), classNo);
			}
			// 生辅老师通过 CLASS_ID 和 SEX 查询
			if (u.getIsDormTeacher() != null && u.getIsDormTeacher()) {
				list = iWtrjMoralINSService.lifeTeacherGetINS(param.getOffset() + 1, end, getPermission().getDormClassId(), param.getSearch(), classNo);
				ret.setTotal(list.size());
			}
			// 德育老师通过学校查询
			if (u.getIsMoralTeacher() != null && u.getIsMoralTeacher()) {
				list = iWtrjMoralINSService.deYuTeacherGetINS(param.getOffset() + 1, end, u.getSchoolCode(), param.getSearch(), classNo);
				ret.setTotal(list.size());
			}
			for (MtInsDto mt : list) {
				InsRet i = new InsRet();
				i.setId(mt.getId());
				i.setRecDate(sdf.format(mt.getRecDate()));
				i.setStdCode(mt.getStdCode());
				i.setStuName(mt.getStuName());
				i.setStdName(mt.getStdName());
				i.setUpdateTime(sdf.format(mt.getUpdateTime()));
				i.setActScore(mt.getActScore() == null ? "--" : mt.getActScore() + "");
				if (mt.getBlTeacherAuth() != null) {
					String s = mt.getBlTeacherAuth().equals("0") ? "未审核" : "已审核";
					i.setBlTeacherAuth(s);
				}
				System.out.println();
				i.setRecType(mt.getRecType().equals("01") ? "学生记录" : "教师补录");
				ins.add(i);
			}

			ret.setRows(ins);
		} catch (Exception e) {
			logger.error("实例查询！", e);
		}
		logger.info("实例查询结束");*/
		return ret;
	}
	

	@ResponseBody
	@RequestMapping(value = "/findStudentsByTidByName")
	public List<StudentDto> findStudentsByTidByName(String searchName, String schoolCode,String classId) {
		
		if(!Strings.isNullOrEmpty(searchName) && !Strings.isNullOrEmpty(schoolCode) && !Strings.isNullOrEmpty(classId)) {
			return iWtrjStudentService.searchStudentsByName(searchName, schoolCode,classId);
		}
		
		/*User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		WtrjTeacher teacher = teacherService.searchTeacherByPhone(user.getPhone());
		teacher.setId(6);
		List<WtrjStudent> list = new ArrayList<WtrjStudent>();
		UserPermission u = getPermission();
		// 模拟登录角色
		u.setIsHeadTeacher(true);*/

		// up.setIsCourseTeacher(true);
		// up.setIsMoralTeacher(true);
		// up.setIsDormTeacher(true);
		// 班主任和任课老师
		// 班主任和任课老师直接查询教师Id
		/*if (u.getIsHeadTeacher() != null && u.getIsHeadTeacher()) {
			list = iWtrjStudentService.findStudentsByTeacherIdAndParam(teacher.getId(), searchName);
		}
		// 生辅老师通过 CLASS_ID 和 SEX 查询
		if (u.getIsDormTeacher() != null && u.getIsDormTeacher()) {
			list = iWtrjMoralINSService.lifeTeacherGetStudents(u.getDormClassId(), searchName);
		}
		// 德育老师通过学校查询
		if (u.getIsMoralTeacher() != null && u.getIsMoralTeacher()) {
			list = iWtrjMoralINSService.deYuTeacherGetStudents(u.getSchoolCode(), searchName);
		}*/
		return null;
	}

	@ResponseBody
	@RequestMapping(value = "/saveIns", method = RequestMethod.POST)
	public String saveIns(@RequestBody WtrjMoralINS ins) {
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		WtrjTeacher teacher = teacherService.searchTeacherByPhone(user.getPhone());
		//teacher.setId(2);
		MtStudent ms =  iWtrjStudentService.selectById(ins.getStudentId());
		String teacherType="";
		if("1".equals(ins.getTeacherType())) {
			teacherType="2";
		}else if("2".equals(ins.getTeacherType())) {
			teacherType="6";
		}else if("3".equals(ins.getTeacherType())) {
			teacherType="4";
		}else if("4".equals(ins.getTeacherType())) {
			teacherType="5";
		}else if("5".equals(ins.getTeacherType())) {
			teacherType="1";
		}else if("6".equals(ins.getTeacherType())) {
			teacherType="101";
		}else if("7".equals(ins.getTeacherType())) {
			teacherType="3";
		}else if("8".equals(ins.getTeacherType())) {
			teacherType="7";
		}else {
			teacherType="100";
		}
		ins.setTeacherType(teacherType);
		ins.setStuName(ms.getName());
		ins.setRecDate(new Date());
		ins.setAuthTeacherName(teacher.getName());
		ins.setAuthTeacherId(teacher.getId());
		ins.setBlTeacherAuth("0");
		ins.setCreateTime(new Date());
		ins.setRecType("02");//实例类型
		ins.setRecUser(teacher.getId());//审核老师id
		ins.setUpdateTime(new Date());
		ins.setBldDelFlg("0");
		ins.setAuthResult("04");
		try {
			iWtrjMoralINSService.insertINS(ins);
		} catch (RuntimeException e) {
			logger.error("教师创建实例！", e);
			return "创建失败";
		}
		return "创建成功";
	}

	@ResponseBody
	@RequestMapping(value = "/findInsByid", method = RequestMethod.POST)
	public MtInsDto findInsByid(Integer insId) {
		MtInsDto ins = iWtrjMoralINSService.getINSDto(insId);
		ins.setRecType(ins.getRecType().equals("01") ? "学生实例" : "老师补录");
		Map<String, Object> map = iWtrjMoralINSService.getScoreByStandard(ins.getStdCode());
		String score = "评分范围："+map.get("min") + "分 —" + map.get("max")+"分";
		ins.setFilePath(savePath+"/wtrj/moral/save/");
		ins.setScore(score);
		ins.setMinScore(map.get("min").toString());
		ins.setMaxScore(map.get("max").toString());
		return ins;
	}

	@ResponseBody
	@RequestMapping(value = "/updateIns", method = RequestMethod.POST)
	public String updateIns(@RequestBody WtrjMoralINS ins) {
		try {
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			WtrjTeacher teacher = teacherService.searchTeacherByPhone(user.getPhone());
			ins.setAuthDate(new Date());
			ins.setUpdateTime(new Date());
			ins.setBlTeacherAuth("1");
			ins.setAuthTeacherName(teacher.getName());
			ins.setAuthTeacherId(teacher.getId());
			if(ins.getAuthResult().equals("03")){
				ins.setActScore(0);
			}
			iWtrjMoralINSService.updateByPrimaryKeySelective(ins);
		} catch (RuntimeException e) {
			return "审核失败";
		}
		return "审核成功";
	}

	private String treeData(List<WtrjMoralStandard> standards) {
		// 结果集
		List<Map> list = new ArrayList<Map>();

		// 一级
		List<WtrjMoralStandard> one = new ArrayList<>();
		// 二级
		List<WtrjMoralStandard> two = new ArrayList<>();

		for (WtrjMoralStandard standard : standards) {
			if (standard.getCode().length() == 2) {
				one.add(standard);
			} else {
				two.add(standard);
			}
		}

		// 一级---二级映射
		Map<String, List<WtrjMoralStandard>> map = new HashMap<>();
		// 遍历一级
		for (WtrjMoralStandard standard : one) {

			List<WtrjMoralStandard> child = new ArrayList<>();
			// 遍历二级
			for (WtrjMoralStandard standard2 : two) {
				if (standard2.getCode().substring(0, 2).equals(standard.getCode())) {
					child.add(standard2);
				}
			}
			map.put(standard.getCode(), child);

		}

		// 遍历一级
		for (WtrjMoralStandard standard : one) {
			Map node = new HashMap();
			node.put("name", standard.getName());
			node.put("key", standard.getCode());
			List<WtrjMoralStandard> child = map.get(standard.getCode());

			List<Map> myChild = new ArrayList<>();

			for (WtrjMoralStandard s : child) {
				Map mapChild = new HashMap();
				mapChild.put("name", s.getName());
				mapChild.put("key", s.getCode());
				myChild.add(mapChild);
			}
			node.put("children", myChild);
			list.add(node);

		}
		String s = JsonUtil.toJson(list);
		return s;
	}

	@ResponseBody
	@RequestMapping(value = "/queryClassNo", method = RequestMethod.GET)
	public List<ClassSchoolDto> queryClassNo() {
		String schoolCode = getPermission().getSchoolCode();
		schoolCode = schoolCode == null ? "110" : schoolCode;
		List<ClassSchoolDto> list = iWtrjEcomClassService.getEcomClassBySchoolCode(schoolCode);
		return list;
	}

}
