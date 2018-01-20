package cn.com.wtrj.jx.web.portal.controller.moral.standard;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.count.Constants;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.request.base.WebSupport;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.moralStudent.WtrjMoralStandard;
import cn.com.wtrj.jx.web.portal.service.moralStudent.IWtrjMoralStandardService;


/**
 * 
 * 
 * @author Administrator
 * 
 */
@Controller
@RequestMapping("/")
public class WtrjStandardCol extends BaseController {
	@Autowired
	private IWtrjMoralStandardService wtrjMoralStandardService;

	// 分页
	@RequestMapping(value = "/countStandard", method = RequestMethod.GET)
	public String countStandard(PageSearchParam param, Model model, Map<String,Object> m,HttpServletRequest request) {

		PageData<List<WtrjMoralStandard>> page = new PageData<List<WtrjMoralStandard>>(param.getPage(),param.getPageSize());
		m.put("id", MenuId.COUNTSTANDARD);
		model.addAttribute("ctx",request.getContextPath());
		doCommonSetting(m);
		//this.doCommonSetting(p);
		List<WtrjMoralStandard> list = wtrjMoralStandardService.selectStandardByPage(param.getStart(), param.getEnd());
		page.setRows(list);
		int totalCount = wtrjMoralStandardService.countStandards();
		page.setTotalCount(totalCount);
		WebSupport.putParams(request, model, this.getClass().getName());
		model.addAttribute("standards", page);
		return "standard/list";
		
	}

	
	// 添加界面
		@RequestMapping(value = "/create", method = RequestMethod.GET)
		public String create(Map<String,Object> m,HttpServletRequest request) {
			return "standard/form";
		}
	
		// 保存
		@RequestMapping(value = "/save", method = RequestMethod.POST)
		public String save(WtrjMoralStandard standard, Map<String,Object> m,HttpServletRequest request, RedirectAttributes redirect) {
			m.put("id", MenuId.COUNTSTANDARD);
			doCommonSetting(m);
			int rs = 0;
			try {
				//String name = new String(standard.getName().getBytes("ISO-8859-1"),"UTF-8");
				//standard.setName(name);
				standard.setBlDelFlg(Constants.FALSE);
				rs = wtrjMoralStandardService.insertStandard(standard);
			} catch (Exception e) {
				redirect.addFlashAttribute("errorMsg", "保存失败，请联系管理员。");
				return WebSupport.returnUrl(request, "redirect:/standard/page", this.getClass().getName());
			}
			redirect.addFlashAttribute("successMsg", "操作成功");
			return WebSupport.returnUrl(request, "redirect:/countStandard", this.getClass().getName());
		}



	
		// 逻辑删除
		@RequestMapping(value = "/deleteFlag/{code}", method = RequestMethod.GET)
		public String delete(@PathVariable(value = "code") String code,HttpServletRequest request, RedirectAttributes redirect) {
			try {
			wtrjMoralStandardService.updateFlag(code, Constants.TRUE);
			} catch (Exception e) {
				redirect.addFlashAttribute("errorMsg", "操作失败，请联系统管理员。");
				return WebSupport.returnUrl(request, "redirect:/countStandard", this.getClass().getName());
			}
			redirect.addFlashAttribute("successMsg", "操作成功。");
			return "redirect:/countStandard";
		}
	
		@RequestMapping(value = "/edit/{code}", method = RequestMethod.GET)
		public String edit(@PathVariable(value = "code") String code, Model model,Map<String,Object> m,RedirectAttributes redirect, HttpServletRequest request){
			WtrjMoralStandard standard=null;
			try{
				standard=wtrjMoralStandardService.getStandardByCode(code);
			}catch (Exception e){
				System.out.println("-------------------" + e.getMessage());
			}
			
				WebSupport.putParams(request, model, this.getClass().getName());
				model.addAttribute("standard", standard);
				return "standard/edit";
			/*else {
				redirect.addFlashAttribute("errorMsg", "指标有误");
				return WebSupport.returnUrl(request, "redirect:/countStandard", this.getClass().getName());
			}*/
		}
		@RequestMapping(value = "/ditail/{code}", method = RequestMethod.GET)
		public String ditail(@PathVariable(value = "code") String code, Model model,Map<String,Object> m,RedirectAttributes redirect, HttpServletRequest request){
			WtrjMoralStandard standard=null;
			try{
				standard=wtrjMoralStandardService.getStandardByCode(code);
			}catch (Exception e){
				System.out.println("-------------------" + e.getMessage());
			}
			
				//WebSupport.putParams(request, model, this.getClass().getName());
				model.addAttribute("standard", standard);
				return "standard/ditail";
			
		}
	

		@RequestMapping(value = "/standardUpdate", method = RequestMethod.POST)
		public String standardUpdate(WtrjMoralStandard standard,HttpServletRequest request,Map<String,Object> m, RedirectAttributes redirect) {
			m.put("id", MenuId.COUNTSTANDARD);
			doCommonSetting(m);
			int rs = 0;
			try {
				standard.setBlDelFlg(Constants.FALSE);
				String OldCode=standard.getCode();
				rs = wtrjMoralStandardService.updateAll(standard,OldCode);
			} catch (Exception e) {
				System.out.println("-------------------" + e.getMessage());
			}
			// 为空，保存失败
			if (rs == 0) {
				redirect.addFlashAttribute("errorMsg", "更新失败，请联系管理员。");
				return WebSupport.returnUrl(request, "redirect:/countStandard", this.getClass().getName());
			}
			redirect.addFlashAttribute("successMsg", "操作成功");
			return WebSupport.returnUrl(request, "redirect:/countStandard", this.getClass().getName());
		}
		
		@ResponseBody
		@RequestMapping("/selectByCode")
		public String selectByCode(String code) {
			 WtrjMoralStandard standard = null;
			 String flag = "";
			 try {
				standard = wtrjMoralStandardService.getStandardByCode(code);
				if(standard == null) {
					flag = "0";
				}else {
					flag ="1";
				}
			} catch (Exception e) {
				// TODO: handle exception
			}
			return flag;
		}
		




}
