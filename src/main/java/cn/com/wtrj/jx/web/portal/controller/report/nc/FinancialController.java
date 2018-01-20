package cn.com.wtrj.jx.web.portal.controller.report.nc;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.report.OrgQueryParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.ResponseNameAndValue;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtIntegerAndBigDecimalBean;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtStringAndBigDecimalBean;
import cn.com.wtrj.jx.web.portal.service.IWtrjFinancialExpenseService;
import cn.com.wtrj.jx.web.portal.util.BigDecimalUtil;

/**
 * 财务费用情况表controller
 * 
 * @author zhangbin
 *
 */
@Controller
@RequestMapping("/financial")
public class FinancialController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(FinancialController.class);

	@Autowired
	IWtrjFinancialExpenseService wtrjFinancialExpenseService;

	@RequestMapping(value = "/serchFinancialOneYear", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> serchFinancialOneYear(Integer year) {
		logger.info("财务费用情况表查询某年某月数据【开始】year :{}", year);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			// 如果年份为空就获取当前年份
			if (year == null) {
				Calendar now = Calendar.getInstance();
				year = now.get(Calendar.YEAR);
			}

			List<MtIntegerAndBigDecimalBean> list = wtrjFinancialExpenseService.searchFinancialOneYear(year, this.getCurrentUser().getId());

			// 将查询结果转换为页面需要的实体类型
			ResponseNameAndValue respFinancial = new ResponseNameAndValue();
			respFinancial.setYear(year);
			logger.debug("财务费用情况表根据年份查询所有费用情况 list.size :{}", list.size());
			for (MtIntegerAndBigDecimalBean mtFinancial : list) {
				respFinancial.getNameList().add(mtFinancial.getIntName().toString());
				respFinancial.getValueList().add(BigDecimalUtil.autoGet(mtFinancial.getSumValue()));
			}
			ret.setData(respFinancial);
			logger.info("将查询结果转换为页面需要的实体类型【结束】");
		} catch (Exception e) {
			logger.error("财务费用情况表根据年份查询所有费用情况数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务费用情况表根据年份查询所有费用情况数据查询异常！");
		}
		return ret;
	}

	/**
	 * 财务费用情况表数据查询所有年份
	 * 
	 * @return list
	 */
	@RequestMapping(value = "/searchYers", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<List<Integer>> searchYers() {
		logger.info("财务费用情况表数据查询所有年份【开始】");
		BaseRet<List<Integer>> ret = new BaseRet<List<Integer>>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<Integer> list = wtrjFinancialExpenseService.searchYears();
			logger.info("财务费用情况表数据查询所有年份【结束】 list.size :" + list.size());

			ret.setData(list);
		} catch (Exception e) {
			logger.error("财务费用情况表数据查询所有年份！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务费用情况表数据查询所有年份！");
		}
		return ret;
	}

	/**
	 * 以板块为分组条件查询某年所有数据
	 * 
	 * @param year
	 * @return
	 */
	@RequestMapping(value = "/serchFinancialGroupByProject", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> serchFinancialGroupByProject(Integer year) {
		logger.info("财务费用情况表以板块为分组条件查询某年所有数据【开始】year :{}", year);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			// 如果年份为空就获取当前年份
			if (year == null) {
				Calendar now = Calendar.getInstance();
				year = now.get(Calendar.YEAR);
			}

			List<MtStringAndBigDecimalBean> list = wtrjFinancialExpenseService.searchFinancialGroupByProject(year, this.getCurrentUser().getId());
			logger.debug("财务费用情况表以板块为分组条件查询某年所有数据 list.size :{}", list.size());
			// 将查询结果转换为页面需要的实体类型
			ResponseNameAndValue respFinancial = new ResponseNameAndValue();
			respFinancial.setYear(year);
			for (MtStringAndBigDecimalBean mtFinancial : list) {
				respFinancial.getNameList().add(mtFinancial.getStringName());
				respFinancial.getValueList().add(BigDecimalUtil.autoGet(mtFinancial.getSumValue()));
			}

			ret.setData(respFinancial);
			logger.info("将查询结果转换为页面需要的实体类型【结束】");
		} catch (Exception e) {
			logger.error("财务费用情况表以板块为分组条件查询某年所有数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("财务费用情况表以板块为分组条件查询某年所有数据查询异常！");
		}
		return ret;
	}

	/**
	 * 查询某板块（教育）某年所有财务费用数据
	 * 
	 * @param year
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "/searchFinancialBySomeProject  ", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchFinancialBySomeProject(Integer year, String project) {
		logger.info("查询某板块（教育）某年所有财务费用数据【开始】year :{},month: {}", year, project);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<MtStringAndBigDecimalBean> list = wtrjFinancialExpenseService.searchFinancialBySomeProject(year, project, this.getCurrentUser()
					.getId());
			// 将查询结果转换为页面需要的实体类型

			ResponseNameAndValue respFinancial = new ResponseNameAndValue();
			for (MtStringAndBigDecimalBean mtFinancial : list) {
				respFinancial.getNameList().add(mtFinancial.getStringName());
				respFinancial.getValueList().add(BigDecimalUtil.autoGet(mtFinancial.getSumValue()));
			}
			ret.setData(respFinancial);

			logger.debug("查询某板块（教育）某年所有财务费用数据 【结束】 list.size :{}", list.size());
		} catch (Exception e) {
			logger.error("查询某板块（教育）某年所有财务费用数据！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("查询某板块（教育）某年所有财务费用数据！");
		}
		return ret;
	}

	/**
	 * 查询某公司某年所有财务费用项目数据
	 * 
	 * @param year
	 * @param orgName
	 * @return
	 */
	@RequestMapping(value = "/searchFinancialBySomeOrgName  ", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchFinancialBySomeOrgName(@RequestBody OrgQueryParam param) {
		logger.info("查询某公司某年所有财务费用项目数据【开始】year :{},orgNickName: {}", param.getYear(), param.getOrgNickName());
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<MtStringAndBigDecimalBean> list = wtrjFinancialExpenseService.searchFinancialByOrgNickName(param.getYear(), param.getOrgNickName());
			// 将查询结果转换为页面需要的实体类型

			int index = 0;
			BigDecimal otherData = BigDecimal.valueOf(0);

			ResponseNameAndValue respFinancial = new ResponseNameAndValue();
			for (MtStringAndBigDecimalBean mtFinancial : list) {
				if (index > 10) {
					otherData = otherData.add(mtFinancial.getSumValue());
				} else {
					respFinancial.getNameList().add(mtFinancial.getStringName());
					respFinancial.getValueList().add(BigDecimalUtil.autoGet(mtFinancial.getSumValue()));
				}

				index++;
			}
			respFinancial.getNameList().add("其他");
			respFinancial.getValueList().add(BigDecimalUtil.autoGet(otherData));
			ret.setData(respFinancial);

			logger.debug("查询某公司某年所有财务费用项目数据 【结束】 list.size :{}", list.size());
		} catch (Exception e) {
			logger.error("查询某公司某年所有财务费用项目数据！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("查询某公司某年所有财务费用项目数据！");
		}
		return ret;
	}
}
