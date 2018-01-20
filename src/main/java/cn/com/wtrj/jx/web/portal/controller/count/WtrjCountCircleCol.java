package cn.com.wtrj.jx.web.portal.controller.count;

import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.request.base.WebSupport;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.moralStudent.WtrjMoralCountCycle;
import cn.com.wtrj.jx.web.portal.model.entities.moralStudent.WtrjMoralINS;
import cn.com.wtrj.jx.web.portal.model.entities.moralStudent.WtrjMoralStudent;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtEcomClass;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtSchoolInfo;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtStage;
import cn.com.wtrj.jx.web.portal.model.mt.entities.moral.MtInsDto;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.service.StudentService;
import cn.com.wtrj.jx.web.portal.service.common.ITeacherPermissionService;
import cn.com.wtrj.jx.web.portal.service.moralStudent.IWtrjMoralCountCycleService;


/**
 * 总分统计配置
 * 
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/")
public class WtrjCountCircleCol extends BaseController {
	@Autowired
	private IWtrjSchoolInfoService wtrjSchoolInfoService;

	@Autowired
	private IWtrjMoralCountCycleService wtrjMoralCountCycleService;
	
	@Autowired
	private ITeacherPermissionService tpService;
	
	@Autowired
	StudentService studentService;

	// 分页
	@RequestMapping(value = "/countpage", method = RequestMethod.GET)
	public String page(PageSearchParam param, Model model, Map<String,Object> p,HttpServletRequest request) {
		
		PageData<List<WtrjMoralCountCycle>> page = new PageData<List<WtrjMoralCountCycle>>(param.getPage(), param.getPageSize());
		p.put("id", MenuId.COUNT);
		this.doCommonSetting(p);
		int total=wtrjMoralCountCycleService.countCountCycle();
		page.setTotalCount(total);
		List<WtrjMoralCountCycle> list=wtrjMoralCountCycleService.selectCountCycleByPage(param.getStart(),param.getEnd());
		page.setRows(list);

		WebSupport.putParams(request, model, this.getClass().getName());
		model.addAttribute("settings", page);
		return "count/list";
	}

	// 添加+查询所有学校
	@RequestMapping(value = "/countcreate",method = RequestMethod.GET)
	public String create(Model model,Map<String,Object> p, HttpServletRequest request) {
		p.put("id", MenuId.COUNT);
		this.doCommonSetting(p);
		/*User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		if(user != null) {
			List<TeacherPermission> schools = tpService.findSchoolsByTeacherId(String.valueOf(user.getTeacherId()));
			if(schools != null && schools.size() > 0) {
				
			}
		}*/
		/*model.addAttribute("schools", wtrjSchoolInfoService.searchAll());*/
		String schoolCode = null;
		List<MtSchoolInfo> schools = studentService.searchAllSchool();
		if(schools != null && schools.size() > 0) {
			schoolCode = schools.get(0).getCode();
			model.addAttribute("schools", schools);
		}
		//查询所有学部
		List<MtStage> stages = studentService.searchAllStage(schoolCode);
		if(stages != null && stages.size() > 0) {
			model.addAttribute("stages", stages);
			String stage = stages.get(0).getCode();
			//查询所有年级
			List<String> grades = studentService.searchAllGrade(schoolCode, stage);
			if(grades != null && grades.size()>0) {
				model.addAttribute("grades", grades);
				String grade = grades.get(0);
				//查询所有班级
				List<MtEcomClass> classes = studentService.searchAllClasses(schoolCode, stage, grade);
				model.addAttribute("classes",classes);
				
			}
		}
		
		return "count/form";
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {   
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
        dateFormat.setLenient(true);   
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));   
    } 
	// 保存
	@RequestMapping(value = "/countsave",method = RequestMethod.POST)
	public String save(WtrjMoralCountCycle cycle, HttpServletRequest request, RedirectAttributes redirect,
			Model model) throws UnsupportedEncodingException {
		Date d = new Date();
		/*String countName = new String(cycle.getCountName().getBytes("ISO-8859-1"),"UTF-8");
		cycle.setCountName(countName);*/
		cycle.setCreateTime(d);
		cycle.setUpdateTime(d);
		cycle.setBlDelFlg(Constants.FALSE);
		try {
			wtrjMoralCountCycleService.insertCountCycle(cycle);
		} catch (Exception e) {
			redirect.addFlashAttribute("errorMsg", "操作失败，请联系统管理员。");
			return WebSupport.returnUrl(request, "redirect:/countpage", this.getClass().getName());
		}
		redirect.addFlashAttribute("successMsg", "操作成功。");
		return "redirect:/countpage";
	}

	@RequestMapping(value = "/countdeleteByFlag/{id}", method = RequestMethod.GET)
	public String deleteByFlag(@PathVariable("id") Integer id, HttpServletRequest request, RedirectAttributes redirect,
			Model model) {

		try {
			wtrjMoralCountCycleService.updateDelFlagById(id, Constants.TRUE);
		} catch (Exception e) {
			redirect.addFlashAttribute("errorMsg", "操作失败，请联系统管理员。");
			return WebSupport.returnUrl(request, "redirect:/countpage", this.getClass().getName());
		}
		redirect.addFlashAttribute("successMsg", "操作成功。");
		return "redirect:/countpage";
	}

	@RequestMapping(value = "/countedit", method = RequestMethod.GET)
	public  String edit(@RequestParam(value="id")Integer id,Model model,Map<String,Object> p, HttpServletRequest request){
		p.put("id", MenuId.COUNT);
		this.doCommonSetting(p);
		WtrjMoralCountCycle countCycle = wtrjMoralCountCycleService.getCountCycleById(id);
		model.addAttribute("countCycle",countCycle);
		String schoolCode = null;
		List<MtSchoolInfo> schools = studentService.searchAllSchool();
		if(schools != null && schools.size() > 0) {
			//schoolCode = schools.get(0).getCode();
			model.addAttribute("schools", schools);
		}
		//查询所有学部
		List<MtStage> stages = studentService.searchAllStage(countCycle.getSchoolCode());
		if(stages != null && stages.size() > 0) {
			model.addAttribute("stages", stages);
			String stage = stages.get(0).getCode();
			//查询所有年级
			List<String> grades = studentService.searchAllGrade(countCycle.getSchoolCode(), stage);
			if(grades != null && grades.size()>0) {
				model.addAttribute("grades", grades);
				String grade = grades.get(0);
				//查询所有班级
				List<MtEcomClass> classes = studentService.searchAllClasses(countCycle.getSchoolCode(), stage, grade);
				model.addAttribute("classes",classes);
				
			}
		}
		return "count/edit";
	}


	@RequestMapping(value = "/countupdate", method = RequestMethod.POST)
	public  String update(WtrjMoralCountCycle cycle, HttpServletRequest request, RedirectAttributes redirect,
						  Model model) throws UnsupportedEncodingException{

		Date d = new Date();
		/*String countName = new String(cycle.getCountName().getBytes("ISO-8859-1"),"UTF-8");
		cycle.setCountName(countName);*/
		cycle.setUpdateTime(d);
		try {
			wtrjMoralCountCycleService.updateCountCycleByIdSelective(cycle);
		} catch (Exception e) {
			redirect.addFlashAttribute("errorMsg", "操作失败，请联系统管理员。");
			return WebSupport.returnUrl(request, "redirect:/countpage", this.getClass().getName());
		}
		redirect.addFlashAttribute("successMsg", "操作成功。");
		return "redirect:/countpage";
	}
	
	
	@ResponseBody
	@RequestMapping(value="/count/AllSchool")
	public List<MtSchoolInfo> searchAllSchool(){
		List<MtSchoolInfo> schools = studentService.searchAllSchool();
		return schools;
	}
	@ResponseBody
	@RequestMapping(value="/count/AllStage")
	public List<MtStage> searchAllStage(String schoolCode){
		List<MtStage> stages = studentService.searchAllStage(schoolCode);
		return stages;
	}
	@ResponseBody
	@RequestMapping(value="/count/AllGrade")
	public List<String> searchAllGrade(String schoolCode,String stage){
		List<String> grades = studentService.searchAllGrade(schoolCode, stage);
		return grades;
	}
	
	@ResponseBody
	@RequestMapping(value="/count/AllClasses")
	public List<MtEcomClass> searchAllClasses(String schoolCode,String stage,String grade){
		List<MtEcomClass> classes = studentService.searchAllClasses(schoolCode, stage, grade);
		return classes;
	}


}
