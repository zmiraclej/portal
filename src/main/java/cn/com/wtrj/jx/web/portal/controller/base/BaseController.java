package cn.com.wtrj.jx.web.portal.controller.base;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjTeacher;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleSchoolDto;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtUserMenuDto;
import cn.com.wtrj.jx.web.portal.service.ITeacherService;
import cn.com.wtrj.jx.web.portal.service.ScoreNoticeService;
import cn.com.wtrj.jx.web.portal.service.StudentService;
import cn.com.wtrj.jx.web.portal.service.TeacherService;
import cn.com.wtrj.jx.web.portal.service.common.IPermissionService;
import cn.com.wtrj.jx.web.portal.service.common.ITeacherPermissionService;
import cn.com.wtrj.jx.web.portal.service.dto.Role;
import cn.com.wtrj.jx.web.portal.service.dto.UserPermission;
import cn.com.wtrj.jx.web.portal.service.dto.notice.EcomPermisson;
import cn.com.wtrj.jx.web.portal.service.notice.IEcomPermissionService;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleSchoolRelationshipService;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleService;
import cn.com.wtrj.jx.web.portal.util.HttpRequestUtil;

@Controller
@RequestMapping("/")
public class BaseController {

	private static Logger logger = Logger.getLogger(BaseController.class);

	@Autowired
	ServletContext servletContext;

	@Value("${upload.file.temp}")
	protected String upload_file_temp;

	@Value("${upload.file.save}")
	protected String upload_file_save;

	@Value("${portal.logout.url}")
	protected String logoutUrl;

	@Value("${sso.oa.url}")
	protected String oaLoginUrl;

	@Value("${nc.token.url}")
	protected String ncTokenUrl;

	@Value("${nc.login.url}")
	protected String ncLoginUrl;
	
	@Value("${mail.login.url}")
	protected String mailLogUrl;
	
	@Value("${mail.domain.name}")
	protected String mailDomainName;

	@Autowired
	protected IRoleService roleService;

	@Autowired
	protected IRoleSchoolRelationshipService roleSchoolService;

	@Autowired
	protected IPermissionService permissionService;

	@Autowired
	protected ITeacherService teacherService;

	@Autowired
	private ITeacherPermissionService tpService;

	@Autowired
	IEcomPermissionService teacherAuthService;

	@Autowired
	ScoreNoticeService scoreNoticeService;
	
	@Autowired
	private TeacherService tService;
	
	@Autowired
	StudentService studentService;

	/**
	 * 获取Session用户
	 * 
	 * @return
	 */
	protected User getCurrentUser() {
		return (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
	}

	/**
	 * 报表模板目录
	 */
	protected String getTemplateDir() {
		try {
			return servletContext.getResource("/WEB-INF/var/").getPath();
		} catch (Exception e) {
			return "";
		}
	}

	/**
	 * 获取当前登录用户用户名
	 * 
	 * @return
	 */
	protected String getUserName() {
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		return user.getUsername();
	}

	protected Map<String, Boolean> getUserMenus() {

		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");

		List<MtUserMenuDto> dtos = roleService.searchMenusByUserId(user.getId());
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		if (dtos != null) {
			for (MtUserMenuDto dto : dtos) {
				Boolean own = map.get(dto.getMenuId());
				if (own == null || !own) {
					map.put(dto.getMenuId(), dto.getUserId() == null ? false : true);
				}
			}
		}

		// 管理员权限设定
		if ("admin".equals(user.getUsername())) {
			map.put("setting", true);
			map.put("users", true);
			map.put("roles", true);
			map.put("eduPlan", true);
			map.put("planTemplate", true);
			map.put("planList", true);
			map.put("planApproval", true);
			map.put("scoreUpload", true);
			map.put("scoreNotice", true);
			map.put("createExam", true);
			map.put("teachers", true);
			map.put("count", true);
			map.put("countStandard", true);
			map.put("students", true);
			map.put("scoreRecovery", true);
			map.put("answerCount", true);
			map.put("parenteNotice", true);
			map.put("teacherNotice", true);
		}

		// 处理教务计划菜单及权限
		// map = doTeachEduPemission(user.getId(), user.getPhone(), map);
		this.setTeachEduPermission(map, user.getPhone());

		map.put("index", true);

		return map;
	}

	private void setTeachEduPermission(Map<String, Boolean> map, String phone) {
		// 任课老师老师上传成绩的权限设置
		WtrjTeacher teacher = null;
		if (getCurrentUser().getTeacherId() != null) {
			teacher = teacherService.findTeacherById(getCurrentUser().getTeacherId());
		}
		
		if (teacher != null) {
			map.put("eduPlan", true);
			map.put("scoreNotice", true);
		}
		

		// 班主任权限判定
		if (this.getCurrentUser().getTeacherId() != null) {
			/*List<TeacherPermission> ts = scoreNoticeService.findTeacherClasses(this.getCurrentUser().getTeacherId());
			if (ts != null && ts.size() > 0) {
				map.put("eduPlan", true);
				map.put("scoreNotice", true);
			}*/
			
			
			//德育权限
			List<TeacherPermission> schools = tpService.findSchoolsByTeacherId(String.valueOf(this.getCurrentUser().getTeacherId()));
			
			if(schools != null && schools.size() > 0) {
				
				for(TeacherPermission school :  schools) {
					List<Role> roles = tService.findTeacherRoleTypes(this.getCurrentUser().getTeacherId(), school.getSchoolCode());
				
					if(roles != null && roles.size() >0) {
						// 计划类型
						for(Role r : roles) {
							if("1".equals(r.getId()) || "5".equals(r.getId()) || "7".equals(r.getId()) || "8".equals(r.getId())) {
								//德育菜单权限
								map.put("moral", true);
							}
							
							//班主任及以上权限
							if("5".equals(r.getId()) || "2".equals(r.getId()) || "3".equals(r.getId()) || "4".equals(r.getId()) || "6".equals(r.getId())) {
								map.put("eduPlan", true);
								map.put("scoreNotice", true);
							}
							//只有班主任可以查看学生档案
							if("5".equals(r.getId())){
								map.put("setting", true);
								map.put("students", true);
							}
							
							if("1".equals(r.getId())) {
								//单科成绩发送菜单权限
								map.put("scoreNotice", true);
							}
							
						}
					}

				}

			}
			
		}
	}

	/*
	 * private Map<String, Boolean> doTeachEduPemission(Integer userId, String
	 * phone, Map<String, Boolean> map) { try {
	 * 
	 * //获取当前用户教师权限信息 TeacherPermissionDto tpd =
	 * tpService.findTeacherPermissionByPhone(phone);
	 * 
	 * if(tpd != null) {
	 * SecurityUtils.getSubject().getSession().setAttribute("eduPlanPemission",
	 * tpd);
	 * 
	 * if(tpd.getIsRk() || tpd.getIsBk() || tpd.getIsJy()) { map.put("eduPlan",
	 * true); map.put("planTemplate", true); map.put("planList", true); }
	 * 
	 * }
	 * 
	 * String role = roleService.selectUserRoleByRoleId(userId, "ROLE-EDU");
	 * if(Strings.isNotBlank(role)) { map.put("eduPlan", true);
	 * map.put("planTemplate", true); map.put("planApproval", true); }
	 * 
	 * } catch (Exception e) { e.printStackTrace(); logger.info(e.getMessage());
	 * }
	 * 
	 * 
	 * return map;
	 * 
	 * }
	 */

	/**
	 * 页面跳转通用设定
	 * 
	 * @param model
	 * @throws UnsupportedEncodingException
	 */
	protected void doCommonSetting(Map<String, Object> model) {

		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		// 设定登录用户名
		model.put("userName", this.getUserName());
		// 设定菜单
		model.put("menuDis", this.getUserMenus());

		model.put("logoutUrl", this.logoutUrl);

		model.put("ssoOaUrl", this.oaLoginUrl + this.getUserName());
		// 获取token
		String ncUrl = this.ncTokenUrl + getUserName();
		/*String ncToken = HttpRequestUtil.httpGetToStr(ncUrl);
		// 设定登录链接
		String ncLoginUrl = this.ncLoginUrl + ncToken;*/
		model.put("ssoNcUrl", ncUrl);

		// 设定邮件单点
		Base64 base64 = new Base64();
		byte[] textUser = null;
		byte[] textPwd = null;
		try {
			textUser = user.getUsername().concat(this.mailDomainName).getBytes("UTF-8");
			textPwd = user.getPassword().getBytes("UTF-8");
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		String mailLoginUrl = this.mailLogUrl + base64.encodeToString(textUser) + "&passwd="
				+ base64.encodeToString(textPwd) + "&box=inbox&sbox=inbox&co_language_select=index.php?lang=../language/chinese_gb.php&co_sy_id=10";
		model.put("ssoMailUrl", mailLoginUrl);

	}

	/**
	 * 获取单一学校权限用户信息
	 * 
	 * @return
	 */
	protected MtRoleSchoolDto getUserOwnSchool() {
		List<MtRoleSchoolDto> dtos = roleSchoolService.searchRoleSchoolInfoByUserId(this.getCurrentUser().getId());
		if (dtos.size() > 1) {
			return null;
		}
		return dtos.get(0);
	}

	/**
	 * 获取当前登录用户权限
	 * 
	 * @return
	 */
	protected UserPermission getPermission() {
		UserPermission up = new UserPermission();

		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		WtrjTeacher teacher = teacherService.searchTeacherByPhone(user.getPhone());
		if (teacher != null) {
			up = permissionService.searchUserPermission(teacher.getId());
		}

		return up;
	}

	/**
	 * 获取当前登录用户权限
	 * 
	 * @return
	 */
	protected EcomPermisson getTeacherPermission(){

		Object obj = SecurityUtils.getSubject().getSession().getAttribute("wtrj_portal_teacher_auth");
		if (obj == null) {
			EcomPermisson p = teacherAuthService.searchTeacherPermisson(this.getCurrentUser().getTeacherId());

			SecurityUtils.getSubject().getSession().setAttribute("wtrj_portal_teacher_auth", p);
			return p;
		} else {
			EcomPermisson p = (EcomPermisson) obj;
			if (p.getOwnedSchools() == null || p.getOwnedTeachers() == null) {
				p = teacherAuthService.searchTeacherPermisson(this.getCurrentUser().getTeacherId());
				SecurityUtils.getSubject().getSession().setAttribute("wtrj_portal_teacher_auth", p);
			}
		}

		return (EcomPermisson) obj;
	}
	
	protected void saveTeacherPermission(EcomPermisson p) {
		SecurityUtils.getSubject().getSession().setAttribute("wtrj_portal_teacher_auth", p);
	}

}
