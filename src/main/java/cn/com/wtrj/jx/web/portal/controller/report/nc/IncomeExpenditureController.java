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
import cn.com.wtrj.jx.web.portal.model.mt.entities.IncomeExpenditureBean;
import cn.com.wtrj.jx.web.portal.service.IWtrjIncomeExpenditureService;
import cn.com.wtrj.jx.web.portal.util.BigDecimalUtil;

/**
 * 收支报表controller
 * 
 */
@Controller
@RequestMapping("/IncomeExpenditure")
public class IncomeExpenditureController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(IncomeExpenditureController.class);

	@Autowired
	IWtrjIncomeExpenditureService iWtrjIncome;

	/**
	 * 查询收支表所有不重复的年份
	 * 
	 * @return 收支表所有不重复的年份
	 */
	@RequestMapping(value = "/searchAllYears", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<Integer>> searchAllYears() {
		logger.info("收支情况表年份数据查询【开始】");
		BaseRet<List<Integer>> ret = new BaseRet<List<Integer>>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<Integer> list = iWtrjIncome.searchAllYears();

			ret.setData(list);
		} catch (Exception e) {
			logger.error("收支情况表年份数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("收支情况表年份数据查询异常！");
		}

		logger.info("收支情况表年份数据查询【结束】");
		return ret;
	}

	/**
	 * 按需获得板块数据
	 * 
	 * @param yearInfo
	 *            前台传过来的年份
	 * @param monthInfo
	 *            前台传过来的月份
	 * @return 板块数据集合
	 */
	@RequestMapping(value = "/searchInfoByProject", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<IncomeExpenditureBean>> searchInfoByProject(@RequestParam(value = "yearInfo") String yearInfo,
			@RequestParam(value = "monthInfo") String monthInfo) {
		logger.info("收支情况表数据按板块查询【开始】");
		BaseRet<List<IncomeExpenditureBean>> ret = new BaseRet<List<IncomeExpenditureBean>>();
		int year = Integer.parseInt(yearInfo);
		int month = Integer.parseInt(monthInfo);

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<IncomeExpenditureBean> list = iWtrjIncome.searchInfoByProject(year, month, this.getCurrentUser().getId());
			for (IncomeExpenditureBean incomeExpenditureBean : list) {
				incomeExpenditureBean.setIncome(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getIncome()));
				incomeExpenditureBean.setExpenditure(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getExpenditure()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("收支情况表数据按板块查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("收支情况表数据按板块查询异常！");
		}
		logger.info("收支情况表数据按板块查询【结束】");
		return ret;
	}

	/**
	 * 校区收支状况表
	 * 
	 * @param projectInfo
	 *            板块
	 * @param yearInfo
	 *            年份
	 * @param monthInfo
	 *            月份
	 * @return 校区收支数据
	 */
	@RequestMapping(value = "/searchInfoBySchool", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<IncomeExpenditureBean>> searchInfoBySchool(@RequestParam(value = "projectInfo") String project,
			@RequestParam(value = "yearInfo") String yearInfo, @RequestParam(value = "monthInfo") String monthInfo) {
		logger.info("收支情况表数据按校区查询【开始】");
		BaseRet<List<IncomeExpenditureBean>> ret = new BaseRet<List<IncomeExpenditureBean>>();
		int year = Integer.parseInt(yearInfo);
		int month = Integer.parseInt(monthInfo);
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<IncomeExpenditureBean> list = iWtrjIncome.searchInfoBySchool(project, year, month, this.getCurrentUser().getId());
			for (IncomeExpenditureBean incomeExpenditureBean : list) {
				incomeExpenditureBean.setIncome(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getIncome()));
				incomeExpenditureBean.setExpenditure(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getExpenditure()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("收支情况表数据按校区查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("收支情况表数据按校区查询异常！");
		}
		logger.info("收支情况表数据按校区查询【结束】");
		return ret;
	}

	/**
	 * 按需获得板块数据(某一年)
	 * 
	 * @param yearInfo
	 *            前台传过来的年份
	 * @param monthInfo
	 *            前台传过来的月份
	 * @return 板块数据集合
	 */
	@RequestMapping(value = "/searchInfoByProject2", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<IncomeExpenditureBean>> searchInfoByProject2(@RequestParam(value = "yearInfo") String yearInfo) {
		logger.info("收支情况表数据按板块查询【开始】");
		BaseRet<List<IncomeExpenditureBean>> ret = new BaseRet<List<IncomeExpenditureBean>>();
		int year = Integer.parseInt(yearInfo);

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<IncomeExpenditureBean> list = iWtrjIncome.searchInfoByProject2(year, this.getCurrentUser().getId());
			for (IncomeExpenditureBean incomeExpenditureBean : list) {
				incomeExpenditureBean.setIncome(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getIncome()));
				incomeExpenditureBean.setExpenditure(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getExpenditure()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("收支情况表数据按板块查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("收支情况表数据按板块查询异常！");
		}
		logger.info("收支情况表数据按板块查询【结束】");
		return ret;
	}

	/**
	 * 收支情况表数据按年份和板块查询数据
	 * 
	 * @param yearInfo
	 *            年份
	 * @param project
	 *            板块
	 * @return 收支情况表数据按年份和板块查询数据
	 */
	@RequestMapping(value = "/searchInfoByYearAndProject2", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<IncomeExpenditureBean>> searchInfoByYearAndProject2(@RequestParam(value = "yearInfo") String yearInfo,
			@RequestParam(value = "projectInfo") String project) {
		logger.info("收支情况表数据按年份和板块查询【开始】");
		BaseRet<List<IncomeExpenditureBean>> ret = new BaseRet<List<IncomeExpenditureBean>>();
		int year = Integer.parseInt(yearInfo);

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<IncomeExpenditureBean> list = iWtrjIncome.searchInfoByProjectAndYear(year, project, this.getCurrentUser().getId());
			for (IncomeExpenditureBean incomeExpenditureBean : list) {
				incomeExpenditureBean.setIncome(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getIncome()));
				incomeExpenditureBean.setExpenditure(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getExpenditure()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("收支情况表数据按年份和板块查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("收支情况表数据按年份和板块查询异常！");
		}
		logger.info("收支情况表数据按年份和板块查询【结束】");
		return ret;
	}

	/**
	 * 收支情况表数据按校区查询数据
	 * 
	 * @param project
	 *            板块
	 * @param yearInfo
	 *            年份
	 * @param monthInfo
	 *            月份
	 * @return 收支情况表数据按校区查询数据（校区）
	 */
	@RequestMapping(value = "/searchInfoBySchool2", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<IncomeExpenditureBean>> searchInfoBySchool2(@RequestParam(value = "projectInfo") String project,
			@RequestParam(value = "yearInfo") String yearInfo, @RequestParam(value = "monthInfo") String monthInfo) {
		logger.info("收支情况表数据按校区查询【开始】");
		BaseRet<List<IncomeExpenditureBean>> ret = new BaseRet<List<IncomeExpenditureBean>>();
		int year = Integer.parseInt(yearInfo);
		int month = Integer.parseInt(monthInfo);

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<IncomeExpenditureBean> list = iWtrjIncome.searchInfoByProjectAndYearAndMonth(year, month, project, this.getCurrentUser().getId());
			for (IncomeExpenditureBean incomeExpenditureBean : list) {
				incomeExpenditureBean.setIncome(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getIncome()));
				incomeExpenditureBean.setExpenditure(BigDecimalUtil.getBigDecimalVal(incomeExpenditureBean.getExpenditure()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("收支情况表数据按校区查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("收支情况表数据按校区查询异常！");
		}
		logger.info("收支情况表数据按校区查询【结束】");
		return ret;
	}
}
