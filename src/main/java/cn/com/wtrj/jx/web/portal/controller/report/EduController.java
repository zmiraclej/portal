package cn.com.wtrj.jx.web.portal.controller.report;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;

/**
 * 学校经营报表相关
 * 
 * @author wusm
 *
 */
@Controller
@RequestMapping("/")
public class EduController extends BaseController {

	/**
	 * 跳转到profit.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/renyuanTongji")
	public String profit(Map<String, Object> model, String id, HttpServletRequest request) {
		model.put("id", MenuId.EDU_RENYUAN);
		this.doCommonSetting(model);
		return "report/edu/renyuanTongji";
	}

	@RequestMapping("/teachersReport")
	public String teachersReport(Map<String, Object> model) {
		model.put("id", "teachersReport");
		this.doCommonSetting(model);
		return "report/edu/teachersReport";
	}

	@RequestMapping("/studentReport")
	public String studentReport(Map<String, Object> model) {
		model.put("id", "studentReport");
		this.doCommonSetting(model);
		return "report/edu/studentReport";
	}

}
