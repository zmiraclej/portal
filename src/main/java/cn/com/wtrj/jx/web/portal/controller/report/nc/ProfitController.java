package cn.com.wtrj.jx.web.portal.controller.report.nc;

import java.util.Calendar;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.ResponseNameAndValue;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtIntegerAndBigDecimalBean;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtStringAndBigDecimalBean;
import cn.com.wtrj.jx.web.portal.service.IWtrjProfitService;
import cn.com.wtrj.jx.web.portal.util.BigDecimalUtil;

/**
 * WtrjProfit 盈利表controller
 * 
 * @author zhangbin
 *
 */
@Controller
@RequestMapping("/profit")
public class ProfitController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(ProfitController.class);

	@Autowired
	IWtrjProfitService wtrjProfitService;

	/**
	 * 查询某一年某月所有板块的盈利情况（净利）
	 * 
	 * @param year
	 *            年份（净利）
	 * @param month
	 *            月份
	 * @return ret
	 */
	@RequestMapping(value = "/searchProfitByMonth", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchProfitByMonth(Integer year, Integer month) {
		logger.info("财务利润表查询某一年某月所有板块的盈利情况（净利）【开始】year :{},month :{}", year, month);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<MtStringAndBigDecimalBean> list = wtrjProfitService.searchProfitByMonth(year, month, this.getCurrentUser().getId());
			ResponseNameAndValue respProfit = new ResponseNameAndValue();
			for (MtStringAndBigDecimalBean mtProfit : list) {
				respProfit.getNameList().add(mtProfit.getStringName().toString());
				respProfit.getValueList().add(BigDecimalUtil.autoGet(mtProfit.getSumValue()));
			}
			ret.setData(respProfit);
			logger.info("财务利润表查询某一年某月所有板块的盈利情况（净利）【结束】 list.size :" + list.size());
		} catch (Exception e) {
			logger.error("财务利润表查询某一年某月所有板块的盈利情况（净利）数据异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务利润表查询某一年某月所有板块的盈利情况（净利）数据异常！");
		}
		return ret;
	}

	/**
	 * 查询某一年某月教育板块所有的盈利情况（净利）
	 * 
	 * @param year
	 *            年份（净利）
	 * @param month
	 *            月份
	 * @param project
	 *            板块（教育）
	 * @return ret
	 */
	@RequestMapping(value = "/searchProfitByMonthAndProject", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchProfitByMonthAndProject(Integer year, Integer month, String project) {
		logger.info("财务利润表查询某一年某月教育板块所有的盈利情况（净利）【开始】year :{},month :{},project:{}", year, month, project);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<MtStringAndBigDecimalBean> list = wtrjProfitService.searchProfitByMonthAndProject(year, month, project, this.getCurrentUser()
					.getId());
			logger.info("财务利润表查询某一年某月教育板块所有的盈利情况（净利）【结束】 list.size :" + list.size());
			// 将查询结果转换为页面需要的实体类型
			ResponseNameAndValue respProfit = new ResponseNameAndValue();
			for (MtStringAndBigDecimalBean mtProfit : list) {
				respProfit.getNameList().add(mtProfit.getStringName().toString());
				respProfit.getValueList().add(BigDecimalUtil.autoGet(mtProfit.getSumValue()));
			}

			ret.setData(respProfit);
			logger.info("将查询结果转换为页面需要的实体类型【结束】");
		} catch (Exception e) {
			logger.error("财务利润表查询某一年某月教育板块所有的盈利情况（净利）数据异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务利润表查询某一年某月教育板块所有的盈利情况（净利）数据异常！");
		}
		return ret;
	}

	/**
	 * 财务利润表数据查询所有年份（净利）
	 * 
	 * @return list
	 */
	@RequestMapping(value = "/searchYers", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<List<Integer>> searchYers() {
		logger.info("财务利润表数据查询所有年份（净利）【开始】");
		BaseRet<List<Integer>> ret = new BaseRet<List<Integer>>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<Integer> list = wtrjProfitService.searchYears();
			logger.info("财务利润表数据查询所有年份（净利）【结束】 list.size :" + list.size());

			ret.setData(list);
		} catch (Exception e) {
			logger.error("财务利润表数据查询所有年份（净利）！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务利润表数据查询所有年份（净利）数据异常！");
		}
		return ret;
	}

	/**
	 * 根据年份查询所有盈利情况（毛利）
	 * 
	 * @return ret
	 */
	@RequestMapping(value = "/searchGrossProfitOneYear", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchGrossProfitOneYear(Integer year) {
		logger.info("财务利润表根据年份（毛利）查询所有盈利情况（毛利）数据查询【开始】year :{}", year);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			// 如果年份（毛利）为空就获取当前年份（毛利）
			if (year == null) {
				Calendar now = Calendar.getInstance();
				year = now.get(Calendar.YEAR);
			}

			List<MtIntegerAndBigDecimalBean> list = wtrjProfitService.searchGrossProfitOneYear(year);

			// 将查询结果转换为页面需要的实体类型
			ResponseNameAndValue respProfit = new ResponseNameAndValue();
			respProfit.setYear(year);
			logger.debug("财务利润表根据年份（毛利）查询所有盈利情况（毛利） list.size :{}", list.size());
			for (MtIntegerAndBigDecimalBean mtProfit : list) {
				respProfit.getNameList().add(mtProfit.getIntName().toString());
				respProfit.getValueList().add(BigDecimalUtil.autoGet(mtProfit.getSumValue()));
			}
			ret.setData(respProfit);
			logger.info("将查询结果转换为页面需要的实体类型【结束】");
		} catch (Exception e) {
			logger.error("财务利润表根据年份（毛利）查询所有盈利情况（毛利）数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务利润表根据年份（毛利）查询所有盈利情况（毛利）数据查询异常！");
		}
		logger.info("财务利润表根据年份（毛利）查询所有盈利情况（毛利）【结束】 ");
		return ret;
	}

	/**
	 * 查询某一年某月所有板块的盈利情况（毛利）
	 * 
	 * @param year
	 *            年份
	 * @param month
	 *            月份
	 * @return ret
	 */
	@RequestMapping(value = "/searchGrossProfitByMonth", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchGrossProfitByMonth(Integer year, Integer month) {
		logger.info("财务利润表查询某一年某月所有板块的盈利情况（毛利）【开始】year :{},month :{}", year, month);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<MtStringAndBigDecimalBean> list = wtrjProfitService.searchGrossProfitByMonth(year, month);
			ResponseNameAndValue respProfit = new ResponseNameAndValue();
			for (MtStringAndBigDecimalBean mtProfit : list) {
				respProfit.getNameList().add(mtProfit.getStringName());
				respProfit.getValueList().add(BigDecimalUtil.autoGet(mtProfit.getSumValue()));
			}
			ret.setData(respProfit);
			logger.info("财务利润表查询某一年某月所有板块的盈利情况（毛利）【结束】 list.size :" + list.size());
		} catch (Exception e) {
			logger.error("财务利润表查询某一年某月所有板块的盈利情况（毛利）数据异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务利润表查询某一年某月所有板块的盈利情况（毛利）数据异常！");
		}
		return ret;
	}

	/**
	 * 查询某一年某月教育板块所有的盈利情况（毛利）
	 * 
	 * @param year
	 *            年份（毛利）
	 * @param month
	 *            月份
	 * @param project
	 *            板块（教育）
	 * @return ret
	 */
	@RequestMapping(value = "/searchGrossProfitByMonthAndProject", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchGrossProfitByMonthAndProject(Integer year, Integer month, String project) {
		logger.info("财务利润表查询某一年某月教育板块所有的盈利情况（毛利）【开始】year :{},month :{},project:{}", year, month, project);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<MtStringAndBigDecimalBean> list = wtrjProfitService.searchGrossProfitByMonthAndProject(year, month, project);
			logger.info("财务利润表查询某一年某月教育板块所有的盈利情况（毛利）【结束】 list.size :" + list.size());
			// 将查询结果转换为页面需要的实体类型
			ResponseNameAndValue respProfit = new ResponseNameAndValue();
			for (MtStringAndBigDecimalBean mtProfit : list) {
				respProfit.getNameList().add(mtProfit.getStringName());
				respProfit.getValueList().add(BigDecimalUtil.autoGet(mtProfit.getSumValue()));
			}

			ret.setData(respProfit);
			logger.info("将查询结果转换为页面需要的实体类型【结束】");
		} catch (Exception e) {
			logger.error("财务利润表查询某一年某月教育板块所有的盈利情况（毛利）数据异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务利润表查询某一年某月教育板块所有的盈利情况（毛利）数据异常！");
		}
		return ret;
	}

}
