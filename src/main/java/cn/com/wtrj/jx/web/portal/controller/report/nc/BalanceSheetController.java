package cn.com.wtrj.jx.web.portal.controller.report.nc;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.model.mt.entities.BalanceSheetBean;
import cn.com.wtrj.jx.web.portal.service.IWtrjBalanceSheetService;
import cn.com.wtrj.jx.web.portal.util.BigDecimalUtil;

/**
 * 资产负债表controller
 * 
 * @author jitao
 *
 */
@Controller
@RequestMapping("/BalanceSheet")
public class BalanceSheetController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(BalanceSheetController.class);

	@Autowired
	IWtrjBalanceSheetService wtrjBalanceSheetService;

	/**
	 * 查询资产负债表中所有不重复的年份
	 * 
	 * @return 资产负债表中所有不重复的年份的集合
	 */
	@RequestMapping(value = "/searchBalanceSheetAllYears", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<Integer>> searchBalanceSheetAllYears() {
		logger.info("资产负债表所有不重复的年份数据查询【开始】");
		BaseRet<List<Integer>> ret = new BaseRet<List<Integer>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<Integer> list = wtrjBalanceSheetService.searchBalanceSheetAllYears();
			ret.setData(list);
		} catch (Exception e) {
			logger.error("资产负债表所有不重复的年份数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("资产负债表所有不重复的年份数据查询异常！");
		}
		logger.info("资产负债表所有不重复的年份数据查询【结束】");
		return ret;
	}

	/**
	 * 按照板块查找资产负债表数据
	 * 
	 * @param yearInfo
	 *            查找的年份
	 * @param monthInfo
	 *            查找的月份
	 * @return 按照板块查找数据
	 */
	@RequestMapping(value = "/searchBalanceSheetInfoByProject", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<BalanceSheetBean>> searchBalanceSheetInfoByProject(@RequestParam(value = "yearInfo") String yearInfo,
			@RequestParam(value = "monthInfo") String monthInfo) {
		logger.info("资产负债情况表板块数据数据查询【开始】");
		BaseRet<List<BalanceSheetBean>> ret = new BaseRet<List<BalanceSheetBean>>();
		int year = Integer.parseInt(yearInfo);
		int month = Integer.parseInt(monthInfo);

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<BalanceSheetBean> list = wtrjBalanceSheetService.searchBalanceSheetInfoByProject(year, month, this.getCurrentUser().getId());
			for (BalanceSheetBean BalanceSheetBean : list) {
				BalanceSheetBean.setAsset(BigDecimalUtil.getBigDecimalVal(BalanceSheetBean.getAsset()));
				BalanceSheetBean.setDebt(BigDecimalUtil.getBigDecimalVal(BalanceSheetBean.getDebt()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("资产负债情况表板块数据数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("资产负债情况表板块的数据数据查询异常！");
		}
		logger.info("资产负债情况表板块的数据数据查询【结束】");
		return ret;
	}

	/**
	 * 通过校区查询资产负债情况
	 * 
	 * @param project
	 *            板块
	 * @param yearInfo
	 *            年份
	 * @param monthInfo
	 *            月份
	 * @return 校区资产负债情况
	 */

	@RequestMapping(value = "/searchBalanceSheetInfoBySchool", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<BalanceSheetBean>> searchBalanceSheetInfoBySchool(@RequestParam(value = "projectInfo") String project,
			@RequestParam(value = "yearInfo") String yearInfo, @RequestParam(value = "monthInfo") String monthInfo) {
		logger.info("资产负债情况表校区数据数据查询【开始】");
		BaseRet<List<BalanceSheetBean>> ret = new BaseRet<List<BalanceSheetBean>>();
		int year = Integer.parseInt(yearInfo);
		int month = Integer.parseInt(monthInfo);

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<BalanceSheetBean> list = wtrjBalanceSheetService.searchBalanceSheetInfoBySchool(project, year, month, this.getCurrentUser().getId());
			for (BalanceSheetBean BalanceSheetBean : list) {
				BalanceSheetBean.setAsset(BigDecimalUtil.getBigDecimalVal(BalanceSheetBean.getAsset()));
				BalanceSheetBean.setDebt(BigDecimalUtil.getBigDecimalVal(BalanceSheetBean.getDebt()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("资产负债情况表校区数据数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("资产负债情况表校区的数据数据查询异常！");
		}
		logger.info("资产负债情况表校区的数据数据查询【结束】");
		return ret;
	}
}
