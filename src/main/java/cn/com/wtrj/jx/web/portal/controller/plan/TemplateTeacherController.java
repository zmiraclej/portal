package cn.com.wtrj.jx.web.portal.controller.plan;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seeyon.ctp.util.Strings;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjSchoolInfo;
import cn.com.wtrj.jx.web.portal.model.entities.wtrjEdu.WtrjEduPlan;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.service.TeacherService;
import cn.com.wtrj.jx.web.portal.service.common.ITeacherPermissionService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dto.Role;
import cn.com.wtrj.jx.web.portal.service.dto.School;
import cn.com.wtrj.jx.web.portal.service.dto.TeacherPermissionDto;
import cn.com.wtrj.jx.web.portal.service.wtrjEdu.IWtrjEduPlanService;
import cn.com.wtrj.jx.web.portal.util.JsonUtil;

//教师端上传模板,查询模板信息
@Controller
@RequestMapping("/")
public class TemplateTeacherController extends BaseController {
	@Autowired
	private IWtrjSchoolInfoService wtrjSchoolInfoService;
	@Autowired
	private IWtrjEduPlanService wtrjEduPlanService;
	@Autowired
	private IDictService dictService;

	@Autowired
	private ITeacherPermissionService tpService;
	
	@Autowired
	private TeacherService teacherService;
	
	// 跳转到模板设置界面
	@RequestMapping("/toTeacherPlanTemplates")
	public String toTeacherPlanTemplates(HttpServletRequest request, Model model, Map<String, Object> m) {
		
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		
		if(user != null) {
			List<TeacherPermission> schools = tpService.findSchoolsByTeacherId(String.valueOf(user.getTeacherId()));
			
			if(schools != null && schools.size() > 0) {
				model.addAttribute("schools", schools);
				
				String schoolCode = schools.get(0).getSchoolCode();
				
				List<TeacherPermission> grades = tpService.findGrades(String.valueOf(user.getTeacherId()), schoolCode);
				
				if(grades != null && grades.size()>0) {
					model.addAttribute("grades", grades);
					model.addAttribute("defaultStage", grades.get(0).getStage());
					
					List<TeacherPermission> courses = tpService.findCourses(String.valueOf(user.getTeacherId()), schoolCode, String.valueOf(grades.get(0).getGrade()),  grades.get(0).getStage());
					model.addAttribute("courses", courses);
				}
				
				List<DictItem> dict = dictService.findDictItemsByCode(Constant.PlanType.edu_play_type);
				
				List<Role> roles = teacherService.findTeacherRoleTypes(user.getTeacherId(), schoolCode);
				
				if(roles != null && roles.size() >0) {
					// 计划类型
					List<BasePlanDto> typeList = new ArrayList<BasePlanDto>();
					BasePlanDto bpd = null;
					for (DictItem d : dict) {
						
						for(Role r : roles) {
							
							if("edu-plan-type-bk".equals(d.getCode()) && "3".equals(r.getId())) {
								bpd = new BasePlanDto(d.getCode(), d.getName());
								typeList.add(bpd);
							}
							
							if("edu-plan-type-jy".equals(d.getCode()) && "2".equals(r.getId())) {
								bpd = new BasePlanDto(d.getCode(), d.getName());
								typeList.add(bpd);
							}
							
							if("edu-plan-type-teacher".equals(d.getCode()) && "1".equals(r.getId())) {
								bpd = new BasePlanDto(d.getCode(), d.getName());
								typeList.add(bpd);
							}
							
						}
					}
					
					model.addAttribute("eduType", typeList);
					
				}

			}
			
			
			// 学年
			List<BasePlanDto> yearList = new ArrayList<BasePlanDto>();
			List<DictItem> dict = dictService.findDictItemsByCode(Constant.PlanType.school_year);
			for (DictItem d : dict) {
				BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
				yearList.add(bpd);
			}
			model.addAttribute("schoolYear", yearList);
			
			// 学期
			List<BasePlanDto> termList = new ArrayList<BasePlanDto>();
			dict = dictService.findDictItemsByCode(Constant.PlanType.school_term);
			for (DictItem d : dict) {
				BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
				termList.add(bpd);
			}
			model.addAttribute("schoolTerm", termList);		
		}
		
		m.put("id", MenuId.PLAN_LIST);
		doCommonSetting(m);
		return "plan/teacherTemplates";
	}

		@RequestMapping("/template/findGrades")
		@ResponseBody
		public List<TeacherPermission> findGrades(String schoolCode) {
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			List<TeacherPermission> grades = tpService.findGrades(String.valueOf(user.getTeacherId()), schoolCode);
			return grades;
		}
		
		@RequestMapping("/template/findCourses")
		@ResponseBody
		public List<TeacherPermission> findCourses(String schoolCode, String grade, String stage) {
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			List<TeacherPermission> courses = tpService.findCourses(String.valueOf(user.getTeacherId()), 
					schoolCode, grade,  stage);
			return courses;
		}
		
		@RequestMapping("/template/findRoles")
		@ResponseBody
		public List<BasePlanDto> findTeacherRoles(String schoolCode) {
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			List<Role> roles = teacherService.findTeacherRoleTypes(user.getTeacherId(), schoolCode);
			
			// 计划类型
			List<BasePlanDto> typeList = new ArrayList<BasePlanDto>();
			
			if(roles != null && roles.size() >0) {
				
				List<DictItem> dict = dictService.findDictItemsByCode(Constant.PlanType.edu_play_type);
				
				// 计划类型
				BasePlanDto bpd = null;
				for (DictItem d : dict) {
					
					for(Role r : roles) {
						
						if("edu-plan-type-bk".equals(d.getCode()) && "3".equals(r.getId())) {
							bpd = new BasePlanDto(d.getCode(), d.getName());
							typeList.add(bpd);
						}
						
						if("edu-plan-type-jy".equals(d.getCode()) && "2".equals(r.getId())) {
							bpd = new BasePlanDto(d.getCode(), d.getName());
							typeList.add(bpd);
						}
						
						if("edu-plan-type-teacher".equals(d.getCode()) && "1".equals(r.getId())) {
							bpd = new BasePlanDto(d.getCode(), d.getName());
							typeList.add(bpd);
						}
						
					}
				}
				
				
				
			}
			return typeList;
		}
		
	// 获取模板分页查询
	@RequestMapping("/pageTeacherTemplates")
	@ResponseBody
	public PageData<List<WtrjEduPlan>> pageTemplates(PageSearchParam param, String type, HttpServletRequest request,
			Model model) {
		PageData<List<WtrjEduPlan>> ret = new PageData<List<WtrjEduPlan>>();
		int start = param.getOffset() + 1;
		int end = param.getOffset() + param.getLimit();
		/*TeacherPermissionDto tpd = (TeacherPermissionDto) SecurityUtils.getSubject().getSession()
				.getAttribute("portal-edu-plan-pemission");*/
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		int teacherId = user.getTeacherId();
		List<WtrjEduPlan> list = wtrjEduPlanService.getTeacherEduPlanByPage(teacherId, start, end);
		int count = wtrjEduPlanService.countTeacherEduPlanByPage(teacherId);
		ret.setRows(list);
		ret.setTotal(count);
		return ret;
	}

	// 保存模板
	@RequestMapping("/saveTeacherPlanTemplates")
	@ResponseBody
	public BaseRet<String> savePlanTemplates(@RequestBody WtrjEduPlan plan, HttpServletRequest request, Model model) {
		BaseRet<String> rs = new BaseRet<String>();
		try {
			/*TeacherPermissionDto tpd = (TeacherPermissionDto) SecurityUtils.getSubject().getSession()
					.getAttribute("portal-edu-plan-pemission");*/
			
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			
			// 0等待审核；1：审核不通过；2：审核通过
			/* plan.setStatus("0"); */
			plan.setDelFlag("0");
			plan.setCreateUserId(user.getTeacherId());

			plan.setCreateUserName(user.getTeacherName());
			plan.setCreateDate(new Date());

			// 教师所属学校
			// plan.setSchoolCode(user.getSchoolCode());
			// WtrjSchoolInfo school =
			// wtrjSchoolInfoService.searchSchoolBySchoolCode(user.getSchoolCode());
			// if(school==null){
			// plan.setSchoolName("");
			// }else{
			// plan.setSchoolName(school.getName());
			// }
			
			if(Strings.isBlank(plan.getCourse())) {
				plan.setCourseName(null);
			}
			
			wtrjEduPlanService.insert(plan);
			rs.setCode(Constant.RetCode.SUCCESS);
			rs.setMsg("操作成功");
		} catch (Exception e) {
			rs.setCode(Constant.RetCode.ERROR);
			rs.setMsg("操作失败，请联系管理员。");
		}
		return rs;
	}

	// 保存模板
	@RequestMapping(value = "/deleteTeacherPlanTemplates")
	@ResponseBody
	public BaseRet<String> deleteTeacherPlanTemplates(Integer id, HttpServletRequest request, Model model) {
		BaseRet<String> rs = new BaseRet<String>();
		try {
			wtrjEduPlanService.updateDelFlag(id, "1");
			rs.setCode(Constant.RetCode.SUCCESS);
			rs.setMsg("操作成功");
		} catch (Exception e) {
			rs.setCode(Constant.RetCode.ERROR);
			rs.setMsg("操作失败，请联系管理员。");
		}
		return rs;
	}

	public Map<String, List<TeacherPermission>> getBaseInfo() {
		Map<String, List<TeacherPermission>> map = new HashMap<String, List<TeacherPermission>>();
		TeacherPermissionDto tpd = (TeacherPermissionDto) SecurityUtils.getSubject().getSession()
				.getAttribute("eduPlanPemission");
		if (tpd.getTps() == null) {
			return map;
		}
		List<TeacherPermission> tps = tpd.getTps();

		if (tps.size() > 0) {
			for (TeacherPermission tp : tps) {
				if (StringUtils.isNotEmpty(tp.getSchoolCode()) && map.containsKey(tp.getSchoolCode())) {
					map.get(tp.getSchoolCode()).add(tp);
				} else {
					List<TeacherPermission> tlist = new ArrayList<TeacherPermission>();
					tlist.add(tp);
					map.put(tp.getSchoolCode(), tlist);
				}
			}

		}
		return map;
	}

}
