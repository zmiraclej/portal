package cn.com.wtrj.jx.web.portal.controller.dm;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.JsonObject;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjEcomPermission;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjParent;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjStudent;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtEcomClass;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtParent;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtSchoolInfo;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtStage;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtStudent;
import cn.com.wtrj.jx.web.portal.service.MtdmParentService;
import cn.com.wtrj.jx.web.portal.service.StudentService;
import cn.com.wtrj.jx.web.portal.service.TeacherService;
import cn.com.wtrj.jx.web.portal.service.dto.School;
import cn.com.wtrj.jx.web.portal.service.dto.SchoolClass;
import cn.com.wtrj.jx.web.portal.utils.WeixinUtil;

@Controller
public class StudentController extends BaseController {
	private final static Logger logger = LoggerFactory.getLogger(StudentController.class);
	
	//默认为测试的
	private String appid = "wx2a049328ee5d3386";
	private String secret = "JUXuAQ9sUU7m-4f9JK0Vp9c3435oUCfaDfYeR757fya1yYlBX3UIG6UmoEaiIe9o";
	private Integer agentId;
	private Long departmentId = 1L;
	
	
	//---------------家长企业微信号配置信息begin----------------
	@Value("${parent_sync_appid_beicheng}")
	private String appidBeicheng;
	@Value("${parent_sync_secret_beicheng}")
	private String secretBeicheng;
	@Value("${parent_sync_agent_id_beicheng}")
	private Integer agentIdBeicheng;
	@Value("${parent_sync_dept_beicheng}")
	private Long deptBeicheng;
	
	@Value("${parent_sync_appid_dazhou}")
	private String appidDazhou;
	@Value("${parent_sync_secret_dazhou}")
	private String secretDazhou;
	@Value("${parent_sync_agent_id_dazhou}")
	private Integer agentIdDazhou;
	@Value("${parent_sync_dept_dazhou}")
	private Long deptDazhou;
	
	@Value("${parent_sync_appid_jinjiang}")
	private String appidJinjiang;
	@Value("${parent_sync_secret_jinjiang}")
	private String secretJinjiang;
	@Value("${parent_sync_agent_id_jinjiang}")
	private Integer agentIdJinjiang;
	@Value("${parent_sync_dept_jinjiang}")
	private Long deptJinjiang;
	
	@Value("${parent_sync_appid_pixian}")
	private String appidPixian;
	@Value("${parent_sync_secret_pixian}")
	private String secretPixian;
	@Value("${parent_sync_agent_id_pixian}")
	private Integer agentIdPixian;
	@Value("${parent_sync_dept_pixian}")
	private Long deptPixian;
	
	@Value("${parent_sync_appid_chenghua}")
	private String appidChenghua;
	@Value("${parent_sync_secret_chenghua}")
	private String secretChenghua;
	@Value("${parent_sync_agent_id_chenghua}")
	private Integer agentIdChenghua;
	@Value("${parent_sync_dept_chenghua}")
	private Long deptChenghua;
	
	@Value("${parent_sync_appid_dujiangyan}")
	private String appidDujiangyan;
	@Value("${parent_sync_secret_dujiangyan}")
	private String secretDujiangyan;
	@Value("${parent_sync_agent_id_dujiangyan}")
	private Integer agentIdDujiangyan;
	@Value("${parent_sync_dept_dujiangyan}")
	private Long deptDujiangyan;
	//---------------家长企业微信号配置信息  end ----------------
	
	
	@Value("${upload.file.disk.base.path}")
	private String diskPath;
	
	@Value("${upload.file.relative.photo.path}")
	private String relativePath;
	
	@Value("${file_server_path}")
	private String serverIp;

	
	@Autowired
	StudentService studentService;
	
	@Autowired
	MtdmParentService mtdmParentService;
	
	@Autowired
	private TeacherService teacherService;
	
	@RequestMapping("/student-list")
	public String list(Map<String, Object> p,Model params){
		p.put("id", MenuId.STUDENTS);
		this.doCommonSetting(p);
		String schoolCode = null;
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		String userTid = String.valueOf(user.getTeacherId());
		String userId = String.valueOf(user.getId());
		//判断是否为运维人员
		List<String> roleId = studentService.selectRoleIdByUserId(userId);
		if(roleId != null) {
			boolean yw = false;
			for (String id : roleId) {
				if(id.equals("01009")) {
					yw = true;
					break;
				}
			}
			if(yw) {
				//运维人员可以查询所有学生
				params.addAttribute("yw",true);
				//查询所有学校
				List<MtSchoolInfo> schools = studentService.searchAllSchool();
				if(schools != null && schools.size() > 0) {
					//schoolCode = schools.get(0).getCode();
					params.addAttribute("schools", schools);
				}
				//查询所有学部
				schoolCode = "0";
				List<MtStage> stages = studentService.searchAllStage(schoolCode);
				if(stages != null && stages.size() > 0) {
					params.addAttribute("stages", stages);
					String stage = "0";
					//查询所有年级
					List<String> grades = studentService.searchAllGrade(schoolCode, stage);
					if(grades != null && grades.size()>0) {
						params.addAttribute("grades", grades);
						String grade = "0";
						//查询所有班级
						List<MtEcomClass> classes = studentService.searchAllClasses(schoolCode, stage, grade);
						params.addAttribute("classes",classes);
						
					}
				}
			}else {
				params.addAttribute("yw",false);
				List<WtrjEcomPermission> usList = studentService.searchCascadeSchool(String.valueOf(user.getTeacherId()));
				
				if(usList != null && usList.size() > 0) {
					schoolCode = usList.get(0).getSchoolCode();
					params.addAttribute("schools", usList);
				}
				
				if(StringUtils.isNotBlank(schoolCode)) {
					params.addAttribute("schoolCode", schoolCode);
					
					//查询教师学部信息
					List<WtrjEcomPermission> stages = studentService.searchCascadeStage(schoolCode,userTid);
					
					if(stages != null && stages.size() >0) {
						
						params.addAttribute("stages", stages);
						
						String stage = stages.get(0).getStage();
						
						List<String> grades = studentService.searchCascadeGrade(schoolCode, stage, userTid);
						
						if(grades != null && grades.size() >0) {
							
							params.addAttribute("grades", grades);
							
							String grade = grades.get(0);
							
							List<WtrjEcomPermission> classes = studentService.searchCascadeClasses(schoolCode, stage, grade, userTid);
							params.addAttribute("classes", classes);
							
						}
					}

				}
			}
			
		}
		
		return "dm/students";
	}
	
	@ResponseBody
	@RequestMapping(value = "/searchStudents")
	public PageData<List<MtStudent>> searchStudents(PageSearchParam param,Model params,WtrjEcomPermission p) {
		logger.info("学生查询开始");

		
//		try {
//			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
//			List<School> usList = teacherService.findUserSchools(user.getTeacherId());
//			
//			//List<School> tsList = teacherService.findTeacherSelectionSchools(teacherId);
//			
//			List<String> scs = new ArrayList<>();
//			
//			for(School s : usList) {
//				scs.add(s.getCode());
//			}
//			
//			// 获取用户数量
//			int total = teacherService.countTeachers(scs, param.getSearch());
//			ret.setTotal(total);
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
//			// 获取用户明细
//			int end = param.getOffset() + param.getLimit();
//			List<Teacher> teacherList = teacherService.searchTeachersByPage(param.getOffset() + 1, end, scs, param.getSearch());

//			ret.setRows(teacherList);
//		} catch (Exception e) {
//			logger.error("用户查询！", e);
//		}
		
		PageData<List<MtStudent>> ret = new PageData<List<MtStudent>>();
		try {
			//查询教师学校信息
			int total = 0;
			int end = 0;
			List<MtStudent> studentList = null;
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			
			/*String uid = teacherService.selectUserRoleById(user.getId());*/
			/*if(uid != null) {
				total = studentService.countStudents(param.getSearch());
				end = param.getOffset() + param.getLimit();
			}else {
				
			}*/
			String userId = String.valueOf(user.getId());
			//判断是否为运维人员
			List<String> roleId = studentService.selectRoleIdByUserId(userId);
			end = param.getOffset() + param.getLimit();
			if(roleId != null) {
				boolean yw = false;
				for (String id : roleId) {
					if(id.equals("01009")) {
						yw = true;
						break;
					}
				}
				if(yw) {
					if(p.getSchoolCode().equals("0") && p.getStage().equals("0") && p.getGrade() == 0 && p.getClassId() == 0) {
						total = studentService.countStudents(param.getSearch());
						studentList = studentService.searchStudentsByPage(param.getOffset() + 1, end, param.getSearch());
					}else{
						total = studentService.countStudentByYw(p);
						studentList = studentService.selectAllStudents(param.getOffset() + 1, end, param.getSearch(), p.getSchoolCode(), String.valueOf(p.getGrade()),p.getStage(), String.valueOf(p.getClassId()));
					}
				}else {
					p.setTeacherId(user.getTeacherId());
					total = studentService.countStudentsByTeacherId(p);
					studentList = studentService.selectStudentsByTeacherPage(param.getOffset() + 1, end, param.getSearch(), p.getSchoolCode(), String.valueOf(p.getGrade()), p.getStage(), String.valueOf(p.getClassId()), String.valueOf(user.getTeacherId()));
				}
			}
						
			// 获取学生数量
			//total = studentService.countStudents(param.getSearch());
			ret.setTotal(total);
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
			// 获取学生明细
			
			//studentList = studentService.searchStudentsByPage(param.getOffset() + 1, end, param.getSearch());
	
			ret.setRows(studentList);
			
		} catch (Exception e) {
			logger.error("学生查询！", e);
		}
		
		logger.info("学生查询结束");
		
		return ret;
	}
	
	/*private List<String> findStagesBySchoolCode(String schoolCode) {
		return teacherService.findTeacherStages(schoolCode);
	}

	private List<String> findGradesByStage(String schoolCode, String stage) {
		return teacherService.findTeacherGrades(schoolCode, stage);
	}
	
	private List<SchoolClass> findClassesByGrade(String schoolCode, String stage, String grade){
		return teacherService.findTeacherClasses(schoolCode, stage, grade);
	}*/
	
	
	
	@ResponseBody
	@RequestMapping(value = "/saveNewStudent", method = RequestMethod.POST)
	public BaseRet<String> saveNewStudent(@RequestBody MtStudent student) {
		logger.info("新增学生保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			
			//处理-1
			if(null != student.getCardColor() && "-1".equals(student.getCardColor())){
				student.setCardColor("");
			}
			if(null != student.getSchoolCode() && "-1".equals(student.getSchoolCode())){
				student.setSchoolCode("");
			}
			if(null != student.getCureentSchoolCode() && "-1".equals(student.getCureentSchoolCode())){
				student.setCureentSchoolCode("");
			}
			if(null != student.getGradeNo() && -1 == student.getGradeNo()){
				student.setGradeNo(null);
			}
			if(null != student.getClassNo() && -1 == student.getClassNo()){
				student.setClassNo(null);
			}
			if(null != student.getClassId() && -1 == student.getClassId()){
				student.setClassId(null);
			}
			
			//判断 学生身份证号码、学籍号、一卡通卡号必须唯一
			int cnt = 0;
			cnt = studentService.existIdCardNumber(student.getIdCardNumber(),null);
			if(cnt > 0){
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("身份证号码已经存在！" );
				return ret;
			}
			
			cnt = 0;
			cnt = studentService.existStudentNo(student.getStudentNo(),null);
			if(cnt > 0){
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("学籍号已经存在！" );
				return ret;
			}
			
			
			if(null != student.getCardNo() && !"".equals(student.getCardNo())){
				cnt = 0;
				cnt = studentService.existCardNo(student.getCardNo(),null);
				if(cnt > 0){
					ret.setCode(Constant.RetCode.ERROR);
					ret.setMsg("一卡通卡号已经存在！" );
					return ret;
				}
			}
			
			
			
			studentService.addStudent(student);
			return ret;
			
		} catch (Exception e) {
			logger.error("新增学生保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("新增学生失败！" + e.getMessage());
		}
		logger.info("新增学生保存结束.");
		return ret;
	}
	
	
	@RequestMapping("/toEditStudent")
	public String toEditStudent(Integer studentId,Boolean yw, Model model,Map<String, Object> p) {
		MtStudent t = studentService.getStudent(studentId);
		model.addAttribute("yw",yw);
		model.addAttribute("t", t);
		
//		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
//		
//		List<School> usList = teacherService.findUserSchools(user.getTeacherId());
//		
//		if(usList != null && usList.size()>0 &&t.getSlist() != null && t.getSlist().size() > 0) {
//			
//			for(School s : usList) {
//				
//				boolean checked = false;
//				for(School ts : t.getSlist()){
//					if(s.getCode().equals(ts.getCode())) {
//						checked = true;
//						break;
//					}
//				}
//				if(checked) {
//					s.setChecked(true);
//				}
//				
//			}
//			
//		}
//		
//		model.addAttribute("schools", usList);
		return "dm/student-edit";
		//return "setting/teacher-edit";
		
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
	
	@RequestMapping("/toEditStudentPhoto")
	public String toEditStudentPhoto(Integer studentId, Model model,Map<String, Object> p) {
		MtStudent t = studentService.getStudent(studentId);
		model.addAttribute("t", t);
//		model.addAttribute("vpath",virtualPath);
		String photo = "";
		if(null != t.getPhoto() && !"".equals(t.getPhoto().trim())){
			photo = t.getPhoto().trim();
		}
		model.addAttribute("photoUrl", serverIp +'/'+ relativePath + photo);
		
		return "dm/student-photo-upload";
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/saveEditStudent", method = RequestMethod.POST)
	public BaseRet<String> saveEditStudent(@RequestBody MtStudent student) {
		logger.info("修改学生保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			
//			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			
			MtStudent t = studentService.getStudent(student.getId()); //findStudentById
			
//			if(t != null) {
//				if(teacher.getPhone().equals(t.getPhone()) && Integer.parseInt(t.getId().toString()) != Integer.parseInt(teacher.getId().toString())) {
//					ret.setCode(Constant.RetCode.ERROR);
//					ret.setMsg("修改教师失败，电话号已存在！");
//					return ret;
//				}
//			}
//			
//			List<School> usList = teacherService.findUserSchools(user.getTeacherId());
			
			ret.setCode(Constant.RetCode.SUCCESS);
			
			//处理-1
			if(null != student.getCardColor() && "-1".equals(student.getCardColor())){
				student.setCardColor("");
			}
			if(null != student.getSchoolCode() && "-1".equals(student.getSchoolCode())){
				student.setSchoolCode("");
			}
			if(null != student.getCureentSchoolCode() && "-1".equals(student.getCureentSchoolCode())){
				student.setCureentSchoolCode("");
			}
			if(null != student.getGradeNo() && -1 == student.getGradeNo()){
				student.setGradeNo(null);
			}
			if(null != student.getClassNo() && -1 == student.getClassNo()){
				student.setClassNo(null);
			}
			if(null != student.getClassId() && -1 == student.getClassId()){
				student.setClassId(null);
			}
			
			//判断 学生身份证号码、学籍号、一卡通卡号必须唯一
			int cnt = 0;
			cnt = studentService.existIdCardNumber(student.getIdCardNumber(),student.getId());
			if(cnt > 0){
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("身份证号码已经存在！" );
				return ret;
			}
			
			cnt = 0;
			cnt = studentService.existStudentNo(student.getStudentNo(),student.getId());
			if(cnt > 0){
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("学籍号已经存在！" );
				return ret;
			}
			
			
			if(null != student.getCardNo() && !"".equals(student.getCardNo())){
				cnt = 0;
				cnt = studentService.existCardNo(student.getCardNo(),student.getId());
				if(cnt > 0){
					ret.setCode(Constant.RetCode.ERROR);
					ret.setMsg("一卡通卡号已经存在！" );
					return ret;
				}
			}
			
			studentService.editStudent(student);
			
			return ret;
		} catch (Exception e) {
			logger.error("修改学生保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("修改学生失败！" + e.getMessage());
		}
		logger.info("修改学生保存结束.");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "/saveEditStudentPhoto", method = RequestMethod.POST)
	public BaseRet<String> saveEditStudentPhoto(@RequestBody MtStudent student) {
		logger.info("修改学生照片保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			
			MtStudent t = studentService.getStudent(student.getId()); //findStudentById
			if(null == student.getPhoto() || "".equals(student.getPhoto())){
				student.setPhoto(t.getPhoto());
			}
			ret.setCode(Constant.RetCode.SUCCESS);
			studentService.editStudentPhoto(student.getId(),student.getPhoto());
			
			return ret;
		} catch (Exception e) {
			logger.error("修改学生照片保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("修改学生照片失败！" + e.getMessage());
		}
		logger.info("修改学生照片保存结束.");
		return ret;
	}
	
	
	//显示家长
	@RequestMapping("/toFindStudentsParents")
	public String toFindStudentsParents(String studentId, Model model,Map<String, Object> p) {
//		List<School> usList = teacherService.findTeacherSelectionSchools(teacherId);
//		
//		model.addAttribute("schools", usList);
		model.addAttribute("studentId", studentId);
		
//		return "setting/teacher-roles";
		return "dm/students-parents";
	}
	
	@ResponseBody
	@RequestMapping("/findStudentParents")
	public List<MtParent> findStudentParents(Integer studentId) {
		List<MtParent> parentList = studentService.findStudentParents(studentId);
		
		// ---------------------获取关联微信账号信息---------------------
		for (MtParent p : parentList) {
			try {
				JsonObject jo = WeixinUtil.getUserInfo(appid, secret, p.getPhone());
				if (jo != null) {
					if ("0".equals(jo.get("errcode").getAsString())) {
						p.setWxAccount(jo.get("userid").getAsString());
						p.setWxMobile(jo.get("mobile").getAsString());
					}
				}
			} catch (Exception e) {
				logger.error("微信调用异常！", e);
			}
			
		}
		
		return parentList;
	}
	@ResponseBody
	@RequestMapping(value = "/unlockParent", method = RequestMethod.POST)
	public BaseRet<String> unlockParent(Integer studentId,Integer parentId) {
		logger.info("解除家长绑定开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			
			ret.setCode(Constant.RetCode.SUCCESS);
			studentService.deleteStudentParentsRelation(parentId, studentId);
			
			return ret;
		} catch (Exception e) {
			logger.error("解除家长绑定失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("解除家长绑定失败！" + e.getMessage());
		}
		logger.info("解除家长绑定结束.");
		return ret;
	}
	
	
	
	@ResponseBody
	@RequestMapping(value = "/parentSynWxAccount", method = RequestMethod.POST)
	public BaseRet<String> synWxAccount(@RequestBody MtParent p, Integer studentId) {
		logger.info("同步微信家长信息开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			//根据学生Id-->school_code-->判断不同的appid\secret\agentid
			MtStudent student = studentService.getStudent(studentId);
			
			//如果学生ID所关联的schoolCode为空，提示用户不能同步
			if(null == student.getSchoolCode() || "".equals(student.getSchoolCode().trim())){
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("学生信息中未包含学校编码（school_code）信息");
				return ret;
			}
			
			
			int schoolCode = Integer.valueOf(student.getSchoolCode());
			if (schoolCode >=1 && schoolCode <=5) {
				appid = this.appidJinjiang;
				agentId = this.agentIdJinjiang;
				secret = this.secretJinjiang;
				departmentId = this.deptJinjiang;
			} else if (schoolCode >=6 && schoolCode <=9) {
				appid = this.appidChenghua;
				agentId = this.agentIdChenghua;
				secret = this.secretChenghua;
				departmentId = this.deptChenghua;
			} else if (schoolCode >=10 && schoolCode <=13) {
				appid = this.appidPixian;
				agentId = this.agentIdPixian;
				secret = this.secretPixian;
				departmentId = this.deptPixian;
			} else if (schoolCode >=14 && schoolCode <=17) {
				appid = this.appidBeicheng;
				agentId = this.agentIdBeicheng;
				secret = this.secretBeicheng;
				departmentId = this.deptBeicheng;
			} else if (schoolCode >=18 && schoolCode <=21) {
				appid = this.appidDazhou;
				agentId = this.agentIdDazhou;
				secret = this.secretDazhou;
				departmentId = this.deptDazhou;
			} else if (schoolCode >=22 && schoolCode <=25) {
				appid = this.appidDujiangyan;
				agentId = this.agentIdDujiangyan;
				secret = this.secretDujiangyan;
				departmentId = this.deptDujiangyan;
			}

			
			ret.setCode(Constant.RetCode.SUCCESS);
			WtrjParent parent = mtdmParentService.getParentById(p.getId());
			if (parent != null) {
				JsonObject jo = WeixinUtil.getUserInfo(appid, secret, parent.getPhone());
				if (jo != null) {
					if ("0".equals(jo.get("errcode").getAsString())) {
						String wxMobile = jo.get("mobile").getAsString();
						if (!wxMobile.equals(parent.getPhone())) {
							// 更新用户手机号
							JsonObject updRst = WeixinUtil.changeUserMobileInfo(appid, secret, parent.getPhone(), parent.getPhone());
							if (updRst == null || !"0".equals(updRst.get("errcode").getAsString())) {
								ret.setCode(Constant.RetCode.ERROR);
								ret.setMsg("微信同步失败");
							}
							
						}
					} else if("60111".equals(jo.get("errcode").getAsString())){
						// 创建用户
						//JsonObject addRst = WeixinUtil.createUser(appId, secret, teacher.getName(), teacher.getJobNumber(), teacher.getPhone(), Long.valueOf(deptId));
						JsonObject addRst = WeixinUtil.createUser(appid, secret, parent.getPhone(), parent.getPhone(), parent.getPhone(), this.departmentId);
						if (addRst == null || !"0".equals(addRst.get("errcode").getAsString())) {
							ret.setCode(Constant.RetCode.ERROR);
							ret.setMsg("微信同步失败");
						}
					}
				} 
			}
			
			return ret;
		} catch (Exception e) {
			logger.error("同步微信家长信息失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("同步微信家长信息失败！" + e.getMessage());
		}
		logger.info("同步微信家长信息结束.");
		return ret;
	}


	@ResponseBody
	@RequestMapping(value = "/saveNewParents", method = RequestMethod.POST)
	public BaseRet<String> saveNewParents(@RequestBody MtParent parent,String studentId,Integer flag) {
		logger.info("新增学生家长保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			
			if(flag == 0){
				MtParent mp = mtdmParentService.getParentByPhone(parent.getPhone());
				if(null == mp){
					//家长手机号不重复
					ret.setCode(Constant.RetCode.SUCCESS);
					
					studentService.addStudentParents(parent,studentId);
					
					//TODO 调用企业微信号
//					try {
//						WeixinUtil.createUser(appId, secret, parent.getName(), parent.getPhone(), parent.getPhone(), departmentId);
//					} catch (Exception e) {
//						logger.error("新增家长-调用企业微信号-createUser-失败！", e);
//					}
					
					
				} else {
					//家长手机号重复(存在)
					
					//需要调出已经存在的家长手机号信息，并提示是否将家长与当前学生绑定。
					List<MtStudent> list = studentService.findStudentsByPhone(parent.getPhone());
					
					if(null != list && list.size() == 0){
						//该手机号的父母未绑定学生，提示是否绑定
						ret.setCode("-99");
						ret.setMsg("该手机号的家长信息:\r\n" + "   姓名：" + mp.getName() + "   性别：" + mp.getSex() + "\r\n是否将该家长与当前学生绑定?");
					} else{
						//该手机号的父母已绑定学生
						String msg = "";
						boolean ifSelf = false;//判断该手机号已经关联的学生列表中，是否有自身
						for (MtStudent mtStudent : list) {
							if(mtStudent.getId() == Integer.parseInt(studentId)){
								ifSelf = true;
								break;
							}
							msg += (mtStudent.getName() + "-" + mtStudent.getIdCardNumber() + "\r\n");
						}
						if(ifSelf){
							//家长手机号重复，包括自己
							ret.setCode("-101");
						} else{
							//家长手机号重复，不包括自己
							ret.setCode("-100");
							ret.setMsg(msg);
						}
					}
					
					
				}
				
			} else if(flag == 1) {
				//家长手机号重复,继续绑定当前学生；无须调用企业微信号
				ret.setCode(Constant.RetCode.SUCCESS);
				studentService.addStudentParents(parent,studentId,1);
			}
			
			return ret;
			
			
		} catch (Exception e) {
			logger.error("新增学生家长保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("新增学生家长失败！" + e.getMessage());
		}
		logger.info("新增学生家长保存结束.");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping("/deleteStudent")
	public BaseRet<String> deleteStudent(Integer studentId) {
		logger.info("删除学生开始");
		
		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
		    studentService.deleteStudent(studentId);
			
			ret.setCode(Constant.RetCode.SUCCESS);
		} catch (Exception e) {
			logger.error("删除学生失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("删除学生失败！" + e.getMessage());
		}
		
		
		
		logger.info("删除学生结束.");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "/saveEditParents", method = RequestMethod.POST)
	public BaseRet<String> saveEditParents(@RequestBody MtParent parent,Integer studentId,Integer flag) {
		logger.info("修改学生家长保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			
			if(flag == 0){
				//获取库中的家长信息
				WtrjParent soureParent =  mtdmParentService.getParentById(parent.getId());
				if(soureParent.getPhone().equals(parent.getPhone())){
					//修改手机号之外的信息，不调用企业微信号
					mtdmParentService.update(parent);
					ret.setCode(Constant.RetCode.SUCCESS);
				} else {
					//用户修改了手机号,则调用企业微信号删除记录；更新家长表（更新前：判断新手机号是否关联了其他学生；原来的手机号也要做判断）
					List<MtStudent> list = studentService.findStudentsByPhone(parent.getPhone());
					if(null == list || list.size() == 0){
						//新手机号未关联任何学生：更新家长表，与当前学生的关联关系不变，调用新手机号的微信企业号；旧手机号的微信企业号删除处理即可
						mtdmParentService.update(parent);
						ret.setCode(Constant.RetCode.SUCCESS);
						
//						//TODO 调用新手机号的微信企业号；旧手机号的微信企业号删除处理即可
//						try {
////							WeixinUtil.changeUserMobileInfo(appId,secret,parent.getPhone(),parent.getPhone());
//							WeixinUtil.createUser(appId, secret, parent.getName(), parent.getPhone(), parent.getPhone(), departmentId);
//						} catch (Exception e) {
//							logger.error("修改家长手机号-调用企业微信号-createUser-失败！", e);
//						}
						
					} else {
						//新手机号关联了学生，提示否关联当前学生：是-改变关联关系  否-不处理
						String msg = "";
						boolean ifSelf = false;//判断新手机号已经关联的学生列表中，是否有自身
						for (MtStudent mtStudent : list) {
							if(mtStudent.getId() == studentId){
								ifSelf = true;
								continue;
							}
							msg += (mtStudent.getName() + "-" + mtStudent.getIdCardNumber() + "\r\n");
						}
						if(ifSelf){
							//新手机号已经关联自身,不允许修改
							ret.setCode("-101");
						} else{
							//新手机号关联了其他学生,提示否关联当前学生：是-改变关联关系(更新家长表，改变关联)  否-不处理
							ret.setCode("-100");
							ret.setMsg(msg);
						}
					}
					
					
//					原来的手机号处理
//					TODO 调用企业微信号删除记录
				}
				//
			} else if(flag == 1){
				//-100：这里不做处理，交给用户
				//新手机号关联了其他学生,关联当前学生：是-改变关联关系(更新家长表，改变关联)  否-不处理   ;
				//旧手机号的处理:判断是否关联其他学生 是：
			}
			
			return ret;
		} catch (Exception e) {
			logger.error("修改学生家长保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("修改学生家长失败！" + e.getMessage());
		}
		logger.info("修改学生家长保存结束.");
		return ret;
	}
	
	
	
	@ResponseBody
	@RequestMapping("/deleteStudentParents")
	public BaseRet<String> deleteStudentParents(Integer parentId,Integer studentId) {
		logger.info("删除学生家长开始");
		
		BaseRet<String> ret = new BaseRet<String>();
		//删除当前学生的家长信息
		
		List<MtStudent> list = studentService.findStudentsByParentId(parentId);
		boolean ifFound = false;//是否包括当前studentId
		int k = 0;
		for (MtStudent mtStudent : list) {
			k++;
			if(mtStudent.getId().intValue() == studentId.intValue()){
				ifFound = true;
			}
		}
		
		if(ifFound){
			
			try {
				if(k>1){
					//当该家长关联了其他学生时，只删除与当前学生的级联信息	
					studentService.deleteStudentParentsRelation(parentId,studentId);
				} else if(k==1){
					//当该家长没有关联其他学生，删除级联信息+删除家长信息+删除企业号相应记录
					studentService.deleteStudentParents(parentId,studentId);
					
					//TODO 调用企业微信号(删除)
//					WeixinUtil.
				} 
				
				ret.setCode(Constant.RetCode.SUCCESS);
			} catch (Exception e) {
				logger.error("删除学生家长失败！", e);
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("删除学生家长失败！" + e.getMessage());
			}
			
		} else {
			//当前学生不在家长关联的学生中
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("学生没有关联当前的家长！");
		}
		
		
		logger.info("删除学生家长结束.");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/student/getParentInfo", method = RequestMethod.POST)
	public WtrjParent getParentInfo(Integer parentId) {
		logger.info("获取单条家长信息开始");
		
		WtrjParent parent = mtdmParentService.getParentById(parentId); 
		
//		BaseRet<String> ret = new BaseRet<String>();
//		try {
//			ret.setCode(Constant.RetCode.SUCCESS);
//			
//			studentService.addStudent(student);
//			
//			return ret;
//		} catch (Exception e) {
//			logger.error("新增学生保存失败！", e);
//			ret.setCode(Constant.RetCode.ERROR);
//			ret.setMsg("新增学生失败！" + e.getMessage());
//		}
		
		
		logger.info("获取单条家长信息结束.");
		return parent;
	}
	
	
	/**
	 * 支持多上传，但是现在前台未选择文件后自动上传，相当每次只上传一个文件
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/photoFileUpload")
	public BaseRet<String> filesUpload(HttpServletRequest request) {
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		List<MultipartFile> files = multipartRequest.getFiles("files");
		BaseRet<String> rs = new BaseRet<String>();
		if (files != null && files.size() > 0) {
			
			MultipartFile file = files.get(0);
			
			int last = file.getOriginalFilename().lastIndexOf(".");
			
			if(last == -1) {
				rs.setCode(Constant.RetCode.ERROR);
				rs.setMsg("上传失败，上传文件必须为.jpg .jpeg .gif .png图片类型");
				return rs;
			}
			
			String suffix = file.getOriginalFilename().substring(last);
			
			if(".jpg".equals(suffix) || ".jpeg".equals(suffix) || ".gif".equals(suffix) || ".png".equals(suffix)) {

				String filePath = saveFile(file);
				logger.info("file path : "+filePath);
				
				rs.setCode(Constant.RetCode.SUCCESS);
				rs.setData(filePath);
				rs.setMsg(file.getOriginalFilename());
			}
			else {
				rs.setCode(Constant.RetCode.ERROR);
				rs.setMsg("上传失败，上传图片的扩展名必须为.jpg .jpeg .gif .png ");
			}
			
			
			return rs;
		}
		
		return null;
	}
	
	private String saveFile(MultipartFile file) {
	//	if (!file.isEmpty()) {
			try {
				StringBuffer fileName = new StringBuffer();
				String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
				fileName.append(System.nanoTime()).append(RandomStringUtils.randomNumeric(4)).append(suffix);
	
				StringBuffer filePath = new StringBuffer(diskPath + relativePath);
				filePath.append(fileName);
				File path = new File(diskPath + relativePath);
				if (!path.exists()) {
					path.mkdirs();
				}
				File f = new File(filePath.toString());
				file.transferTo(f);
				return fileName.toString();
			} catch (Exception e) {
				logger.error("文件上传错误," + e.getMessage());
			}
	//	}
		return "";
	}


	
	//级联操作
	/**
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/student/cascadeschools")
	public List<WtrjEcomPermission> searchSchools(){
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		List<WtrjEcomPermission> list = studentService.searchCascadeSchool(String.valueOf(user.getTeacherId()));
		return list;
	}
	
	/**
	 * 根据学校编码拿到学段
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/student/cascadestages")
	public List<WtrjEcomPermission> searchStages(String schoolCode){
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		String userId = String.valueOf(user.getTeacherId());
		List<WtrjEcomPermission> list = studentService.searchCascadeStage(schoolCode,userId);
		return list;
	}
	
	/**
	 * 根据学校编码拿到年级
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/student/cascadegrades")
	public List<String> searchGrades(String schoolCode,String stage){
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		List<String> list = studentService.searchCascadeGrade(schoolCode,stage,String.valueOf(user.getTeacherId()));
		return list;
	}
	
	@ResponseBody
	@RequestMapping(value = "/student/cascadeclasses")
	public List<WtrjEcomPermission> searchClasses(String schoolCode,String stage,String grade){
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		List<WtrjEcomPermission> list = studentService.searchCascadeClasses(schoolCode,stage,grade,String.valueOf(user.getTeacherId()));
		return list;
	}
	
	@ResponseBody
	@RequestMapping(value="/yw/AllSchool")
	public List<MtSchoolInfo> searchAllSchool(){
		List<MtSchoolInfo> schools = studentService.searchAllSchool();
		return schools;
	}
	@ResponseBody
	@RequestMapping(value="/yw/AllStage")
	public List<MtStage> searchAllStage(String schoolCode){
		List<MtStage> stages = studentService.searchAllStage(schoolCode);
		return stages;
	}
	@ResponseBody
	@RequestMapping(value="/yw/AllGrade")
	public List<String> searchAllGrade(String schoolCode,String stage){
		List<String> grades = studentService.searchAllGrade(schoolCode, stage);
		return grades;
	}
	
	@ResponseBody
	@RequestMapping(value="/yw/AllClasses")
	public List<MtEcomClass> searchAllClasses(String schoolCode,String stage,String grade){
		List<MtEcomClass> classes = studentService.searchAllClasses(schoolCode, stage, grade);
		return classes;
	}
	
	
	
	
}
