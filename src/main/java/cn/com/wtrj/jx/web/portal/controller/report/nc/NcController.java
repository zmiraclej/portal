package cn.com.wtrj.jx.web.portal.controller.report.nc;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;

@Controller
@RequestMapping("/")
public class NcController extends BaseController {

	/**
	 * 跳转到profit.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/profit")
	public String profit(Map<String, Object> model) {
		model.put("id", MenuId.PROFIT);

		this.doCommonSetting(model);

		return "report/nc/profit";
	}

	/**
	 * 跳转到financial.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/financial")
	public String financial(Map<String, Object> model) {
		model.put("id", MenuId.FINANCIAL);

		this.doCommonSetting(model);

		return "report/nc/financial";
	}

	/**
	 * 跳转到incomeExpenditure.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/incomeExpenditure")
	public String incomeExpenditure(Map<String, Object> model) {
		model.put("id", MenuId.INCOME_EXPENDITURE);

		this.doCommonSetting(model);

		return "report/nc/incomeExpenditure";
	}

	/**
	 * 跳转到balanceSheet.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/balanceSheet")
	public String balanceSheet(Map<String, Object> model) {
		model.put("id", MenuId.BALANCE);

		this.doCommonSetting(model);

		return "report/nc/balanceSheet";
	}

	/**
	 * 跳转到pay.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/pay")
	public String pay(Map<String, Object> model) {
		model.put("id", MenuId.PAY);

		this.doCommonSetting(model);

		return "report/nc/pay";
	}

	/**
	 * 跳转到tax.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/tax")
	public String tax(Map<String, Object> model) {
		model.put("id", MenuId.TALLAGE);

		this.doCommonSetting(model);

		return "report/nc/tax";
	}

	/**
	 * 跳转到capital.jsp
	 * 
	 * @param model
	 * @param id
	 * @return
	 */
	@RequestMapping("/capital")
	public String capital(Map<String, Object> model) {
		model.put("id", MenuId.FUND);

		this.doCommonSetting(model);

		return "report/nc/capital";
	}

	/**
	 * 预期目标
	 * 
	 * @param model
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("/yuqiMubiao")
	public String yuqiMubiao(Map<String, Object> model) {
		model.put("id", MenuId.YUQI_MUBIAO);

		this.doCommonSetting(model);

		return "report/nc/yuqiMubiao";
	}
}
