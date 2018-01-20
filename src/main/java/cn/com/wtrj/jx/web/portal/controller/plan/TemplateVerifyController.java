package cn.com.wtrj.jx.web.portal.controller.plan;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.wtrjEdu.WtrjEduPlan;
import cn.com.wtrj.jx.web.portal.service.common.ITeacherPermissionService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dto.School;
import cn.com.wtrj.jx.web.portal.service.dto.TeacherPermissionDto;
import cn.com.wtrj.jx.web.portal.service.wtrjEdu.IWtrjEduPlanService;

//教务处审核教务计划
@Controller
@RequestMapping("/")
public class TemplateVerifyController extends BaseController {

	@Autowired
	private IWtrjEduPlanService wtrjEduPlanService;
	@Autowired
	private IDictService dictService;
	@Autowired
	private ITeacherPermissionService tpService;

	// 跳转到模板设置界面
	@RequestMapping("/toVerifyPlans")
	public String templates(HttpServletRequest request, Map<String, Object> m, Model model) {
		m.put("id", MenuId.PLAN_APPROVAL);
		doCommonSetting(m);
		
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		
		if(user != null) {
			TeacherPermissionDto tp = tpService.findTeacherSchoolReferenceInfoByTeacherId(String.valueOf(user.getTeacherId()));
			SecurityUtils.getSubject().getSession().setAttribute("portal-edu-plan-pemission", tp);
			
			if(tp != null) {
				List<School> slist = new ArrayList<School>();
				
				int i = 1;
				
				for(String key : tp.getSchools().keySet()) {
					slist.add(tp.getSchools().get(key));
					
					if(i == 1) {
						Set<Integer> gs = tp.getSchools().get(key).getGrades();
						model.addAttribute("grades", gs);
						
						Map<String, String> courses = tp.getSchools().get(key).getCourses();
						
						model.addAttribute("courses", courses);
						i++;
					}

				}
				
				model.addAttribute("schools", slist);
			}
			
			// 计划类型
			List<BasePlanDto> typeList = new ArrayList<BasePlanDto>();
			// 学年
//			List<BasePlanDto> yearList = new ArrayList<BasePlanDto>();
			// 学期
//			List<BasePlanDto> termList = new ArrayList<BasePlanDto>();

			List<DictItem> dict = new ArrayList<DictItem>();
			dict = dictService.findDictItemsByCode(Constant.PlanType.edu_play_type);
			for (DictItem d : dict) {
				BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
				typeList.add(bpd);
			}
			model.addAttribute("eduType", typeList);
			
//			TeacherPermissionDto tpd = (TeacherPermissionDto) SecurityUtils.getSubject().getSession()
//					.getAttribute("eduPlanPemission");
			/*Map<String,Object> tmap = new HashMap<String,Object>();
			if(tpd != null) {
				for (TeacherPermission d : tpd.getTps()) {
					BasePlanDto bpd = new BasePlanDto(d.getSchoolCode(), d.getSchoolName());
					if(!tmap.containsKey(bpd.getKey())){
						tmap.put(bpd.getKey(), null);
						yearList.add(bpd);
					}
				}
			}*/
			
			// 学年
					List<BasePlanDto> yearList = new ArrayList<BasePlanDto>();
					dict = dictService.findDictItemsByCode(Constant.PlanType.school_year);
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
		
		
				
		/*dict = dictService.findDictItemsByCode(Constant.PlanType.school_term);
		
		for (DictItem d : dict) {
			BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
			termList.add(bpd);
		}
		model.addAttribute("schoolTerm", termList);*/
		return "plan/verifyTemplates";
	}

	// 获取模板分页查询
	@RequestMapping("/pageVerifyPlans")
	@ResponseBody
	public PageData<List<WtrjEduPlan>> pageTemplates(PageSearchParam param, HttpServletRequest request, Model model, 
			String type,
			String schoolCode,
			String schoolYear,
			String schoolTerm,
			String course,
			String grade,
			String status,
			String teacherName
			) {
		PageData<List<WtrjEduPlan>> ret = new PageData<List<WtrjEduPlan>>();
		int start = param.getOffset() + 1;
		int end = param.getOffset() + param.getLimit();
		List<WtrjEduPlan> list = wtrjEduPlanService.getVerifyEduPlanByPage(type,
				schoolCode,
				schoolYear,
				schoolTerm,
				course,
				grade,
				status,
				teacherName,
				start, end);
		int count = wtrjEduPlanService.countVerifyEduPlanByPage(type,
				schoolCode,
				schoolYear,
				schoolTerm,
				course,
				grade,
				status,
				teacherName);
		ret.setRows(list);
		ret.setTotal(count);
		return ret;
	}

	// 审核模板
	@RequestMapping(value = "/verifyPlan", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> updatePlanTemplates(@RequestBody VerifyDto verifyDto) {
		BaseRet<String> rs = new BaseRet<String>();
		try {
			wtrjEduPlanService.updateStatus(verifyDto.getId(), verifyDto.getVerify(), verifyDto.getScore());
			rs.setCode(Constant.RetCode.SUCCESS);
			rs.setMsg("操作成功");
		} catch (Exception e) {
			rs.setCode(Constant.RetCode.ERROR);
			rs.setMsg("操作失败，请联系管理员。");
		}
		return rs;
	}

	// 通过id获取计划模板
	@RequestMapping(value = "/findTeacherTemplateByid", method = RequestMethod.POST)
	@ResponseBody
	public WtrjEduPlan findTeacherTemplateByid(Integer tId) {
		WtrjEduPlan wp;
		try {
			// 计划类型
			List<BasePlanDto> typeList = new ArrayList<BasePlanDto>();
			List<DictItem> dict = new ArrayList<DictItem>();
			dict = dictService.findDictItemsByCode(Constant.PlanType.edu_play_type);
			for (DictItem d : dict) {
				BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
				typeList.add(bpd);
			}
			wp = wtrjEduPlanService.get(tId);
			for (BasePlanDto d : typeList) {
				if (wp.getType().equals(d.getKey())) {
					wp.setType(d.getValue());
					break;
				}
			}
		} catch (Exception e) {
			wp = new WtrjEduPlan();
		}
		return wp;
	}

}
