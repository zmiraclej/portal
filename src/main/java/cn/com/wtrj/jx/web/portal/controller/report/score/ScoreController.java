package cn.com.wtrj.jx.web.portal.controller.report.score;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;

/**
 * 成绩报表相关
 * 
 * @author wusm
 *
 */
@Controller
@RequestMapping("/")
public class ScoreController extends BaseController {

	/**
	 * 跳转到profit.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/junfenTongji")
	public String profit(Map<String, Object> model, String id, HttpServletRequest request) {
		model.put("id", MenuId.SCORE_JUNFEN);

		this.doCommonSetting(model);

		return "report/score/junfenTongji";
	}

	@RequestMapping("/toStudentScoreReport")
	public String toStudentScoreReport(Map<String, Object> model, HttpServletRequest request,
			@RequestParam(value = "studentName") String studentName, @RequestParam(value = "selectedClass") String selectedClass) {
		model.put("studentName", studentName);
		model.put("selectedClass", selectedClass);

		return "report/score/studentScore";
	}

	@RequestMapping("/toStudentKnowledgeReport")
	public String toStudentKnowledgeReport(Map<String, Object> model, HttpServletRequest request,
			@RequestParam(value = "studentName") String studentName, @RequestParam(value = "selectedClass") String selectedClass,
			@RequestParam(value = "subjectName") String subjectName, @RequestParam(value = "subjectValue") String subjectValue) {
		model.put("studentName", studentName);
		model.put("selectedClass", selectedClass);
		model.put("subjectName", subjectName);
		model.put("subjectValue", subjectValue);

		return "report/score/studentKnowledge";
	}

	/**
	 * 跳转到financial.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/fenduanTongji")
	public String financial(Map<String, Object> model, String id, HttpServletRequest request) {
		model.put("id", MenuId.SCORE_FENDUAN);
		request.getSession().setAttribute("role", 1);
		return "report/score/fenduanTongji";
	}

}
