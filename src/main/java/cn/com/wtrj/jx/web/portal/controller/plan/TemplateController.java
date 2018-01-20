package cn.com.wtrj.jx.web.portal.controller.plan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seeyon.ctp.util.Strings;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.controller.response.moral.ins.InsRet;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjSchoolInfo;
import cn.com.wtrj.jx.web.portal.model.entities.wtrjEdu.WtrjEduPlanTemplates;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.service.common.ITeacherPermissionService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dto.School;
import cn.com.wtrj.jx.web.portal.service.dto.TeacherPermissionDto;
import cn.com.wtrj.jx.web.portal.service.wtrjEdu.IWtrjEduPlanTemplatesService;
import cn.com.wtrj.jx.web.portal.util.JsonUtil;

@Controller
@RequestMapping("/")
public class TemplateController extends BaseController {
	@Autowired
	private IWtrjSchoolInfoService wtrjSchoolInfoService;
	@Autowired
	private IWtrjEduPlanTemplatesService wtrjEduPlanTemplatesService;

	@Autowired
	private IDictService dictService;
	
	@Autowired
	private ITeacherPermissionService tpService;

	// 跳转到模板设置界面
	@RequestMapping(value = "/toPlanTemplates")
	public String templates(HttpServletRequest request, Model model, Map<String, Object> m) {
		
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		
		if(user != null) {
			TeacherPermissionDto tp = tpService.findTeacherSchoolReferenceInfoByTeacherId(String.valueOf(user.getTeacherId()));
			
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
			List<DictItem> dict = dictService.findDictItemsByCode(Constant.PlanType.edu_play_type);
			for (DictItem d : dict) {
				BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
				typeList.add(bpd);
			}
			model.addAttribute("eduType", typeList);
			
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
		
		

		// 查询条件
		/*PlanTypeDto pt1 = new PlanTypeDto("01", "教师");
		PlanTypeDto pt2 = new PlanTypeDto("02", "备课组");
		PlanTypeDto pt3 = new PlanTypeDto("03", "教研组");
		List<PlanTypeDto> ptList = new ArrayList<PlanTypeDto>();
		ptList.add(pt1);
		ptList.add(pt2);
		ptList.add(pt3);
		model.addAttribute("types", ptList);

		// 计划类型
		List<BasePlanDto> typeList = new ArrayList<BasePlanDto>();
		// 学年
		List<BasePlanDto> yearList = new ArrayList<BasePlanDto>();
		// 学期
		List<BasePlanDto> termList = new ArrayList<BasePlanDto>();

		List<DictItem> dict = new ArrayList<DictItem>();
		dict = dictService.findDictItemsByCode(Constant.PlanType.edu_play_type);
		for (DictItem d : dict) {
			BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
			typeList.add(bpd);
		}
		model.addAttribute("eduType", typeList);
		dict = dictService.findDictItemsByCode(Constant.PlanType.school_year);
		for (DictItem d : dict) {
			BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
			yearList.add(bpd);
		}
		model.addAttribute("schoolYear", yearList);
		dict = dictService.findDictItemsByCode(Constant.PlanType.school_term);
		for (DictItem d : dict) {
			BasePlanDto bpd = new BasePlanDto(d.getCode(), d.getName());
			termList.add(bpd);
		}
		model.addAttribute("schoolTerm", termList);
		model.addAttribute("info", JsonUtil.toJson(getBaseInfo()));*/
		
		m.put("id", MenuId.PLAN_TEMPLATE);
		
		doCommonSetting(m);
		return "plan/templates";
	}

	// 获取模板分页查询
	@RequestMapping(value = "/pageTemplates")
	@ResponseBody
	public PageData<List<WtrjEduPlanTemplates>> pageTemplates(PageSearchParam param, String type,
			HttpServletRequest request, Model model) {
		PageData<List<WtrjEduPlanTemplates>> ret = new PageData<List<WtrjEduPlanTemplates>>();
		int start = param.getOffset() + 1;
		int end = param.getOffset() + param.getLimit();
		List<WtrjEduPlanTemplates> list = wtrjEduPlanTemplatesService.getEduPlanTemplatesByPage(type, start, end);
		/*List<WtrjEduPlanTemplates> wps = new ArrayList<WtrjEduPlanTemplates>();*/
		int count = wtrjEduPlanTemplatesService.countGetEduPlanTemplatesByPage(type);
		ret.setRows(list);
		ret.setTotal(count);
		return ret;
	}

	// 保存模板
	@RequestMapping(value = "/savePlanTemplates", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> savePlanTemplates(@RequestBody WtrjEduPlanTemplates planTemplates,
			HttpServletRequest request, Model model) {
		BaseRet<String> rs = new BaseRet<String>();
		try {
			planTemplates.setDelFlag("0");
			
			if(StringUtils.isBlank(planTemplates.getCourse())) {
				planTemplates.setCourseName(null);
			}
	
			wtrjEduPlanTemplatesService.insert(planTemplates);
			rs.setCode(Constant.RetCode.SUCCESS);
			rs.setMsg("操作成功");
		} catch (Exception e) {
			rs.setCode(Constant.RetCode.ERROR);
			rs.setMsg("操作失败，请联系管理员。");
		}
		return rs;
	}

	// 保存模板
	@RequestMapping(value = "/deletePlanTemplates")
	@ResponseBody
	public BaseRet<String> deletePlanTemplates(Integer id, HttpServletRequest request, Model model) {
		BaseRet<String> rs = new BaseRet<String>();
		try {
			wtrjEduPlanTemplatesService.updateDelFlag(id, "1");
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
		if(tpd == null || tpd.getTps()==null){
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
