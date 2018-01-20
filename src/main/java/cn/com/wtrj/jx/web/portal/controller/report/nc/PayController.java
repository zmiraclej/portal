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
import cn.com.wtrj.jx.web.portal.service.IWtrjPayService;
import cn.com.wtrj.jx.web.portal.util.BigDecimalUtil;

/**
 * 薪酬表controller
 * 
 * @author zhangbin
 *
 */
@Controller
@RequestMapping("/pay")
public class PayController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(PayController.class);

	@Autowired
	IWtrjPayService wtrjPayService;

	@RequestMapping(value = "/searchPayOneYear", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchPayOneYear(Integer year) {
		logger.info("薪酬查询某年某月数据【开始】year :{}", year);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			// 如果年份为空就获取当前年份
			if (year == null) {
				Calendar now = Calendar.getInstance();
				year = now.get(Calendar.YEAR);
			}

			List<MtIntegerAndBigDecimalBean> list = wtrjPayService.searchPayOneYear(year, this.getCurrentUser().getId());

			// 将查询结果转换为页面需要的实体类型
			ResponseNameAndValue respPay = new ResponseNameAndValue();
			respPay.setYear(year);
			logger.debug("薪酬根据年份查询所有薪酬情况 list.size :{}", list.size());
			for (MtIntegerAndBigDecimalBean mtPay : list) {
				respPay.getNameList().add(mtPay.getIntName().toString());
				respPay.getValueList().add(BigDecimalUtil.autoGet(mtPay.getSumValue()));
			}

			ret.setData(respPay);
			logger.info("将查询结果转换为页面需要的实体类型【结束】");
		} catch (Exception e) {
			logger.error("薪酬根据年份查询所有薪酬情况数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("薪酬根据年份查询所有薪酬情况数据查询异常！");
		}
		return ret;
	}

	/**
	 * 薪酬数据查询所有年份
	 * 
	 * @return list
	 */
	@RequestMapping(value = "/searchYers", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<List<Integer>> searchYers() {
		logger.info("薪酬数据查询所有年份【开始】");
		BaseRet<List<Integer>> ret = new BaseRet<List<Integer>>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<Integer> list = wtrjPayService.searchYears();
			logger.info("薪酬数据查询所有年份【结束】 list.size :" + list.size());

			ret.setData(list);
		} catch (Exception e) {
			logger.error("薪酬数据查询所有年份！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("薪酬数据查询所有年份！");
		}
		return ret;
	}

	/**
	 * 以板块为分组条件查询某年所有数据
	 * 
	 * @param year
	 * @return
	 */
	@RequestMapping(value = "/searchPayGroupByProject", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchPayGroupByProject(Integer year) {
		logger.info("薪酬以板块为分组条件查询某年所有数据【开始】year :{}", year);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			// 如果年份为空就获取当前年份
			if (year == null) {
				Calendar now = Calendar.getInstance();
				year = now.get(Calendar.YEAR);
			}

			List<MtStringAndBigDecimalBean> list = wtrjPayService.searchPayGroupByProject(year, this.getCurrentUser().getId());
			logger.debug("薪酬以板块为分组条件查询某年所有数据 list.size :{}", list.size());
			// 将查询结果转换为页面需要的实体类型
			ResponseNameAndValue respPay = new ResponseNameAndValue();
			respPay.setYear(year);
			for (MtStringAndBigDecimalBean mtPay : list) {
				respPay.getNameList().add(mtPay.getStringName());
				respPay.getValueList().add(BigDecimalUtil.autoGet(mtPay.getSumValue()));
			}

			ret.setData(respPay);
			logger.info("将查询结果转换为页面需要的实体类型【结束】");
		} catch (Exception e) {
			logger.error("薪酬以板块为分组条件查询某年所有数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("薪酬以板块为分组条件查询某年所有数据查询异常！");
		}
		return ret;
	}

	/**
	 * 查询某板块（教育）某年所有薪酬数据
	 * 
	 * @param year
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "/searchPayBySomeProject  ", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchPayBySomeProject(Integer year, String project) {
		logger.info("查询某板块（教育）某年所有薪酬数据【开始】year :{},month: {}", year, project);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<MtStringAndBigDecimalBean> list = wtrjPayService.searchPayBySomeProject(year, project, this.getCurrentUser().getId());
			// 将查询结果转换为页面需要的实体类型

			ResponseNameAndValue respPay = new ResponseNameAndValue();
			for (MtStringAndBigDecimalBean mtPay : list) {
				respPay.getNameList().add(mtPay.getStringName());
				respPay.getValueList().add(BigDecimalUtil.autoGet(mtPay.getSumValue()));
			}
			ret.setData(respPay);

			logger.debug("查询某板块（教育）某年所有薪酬数据 【结束】 list.size :{}", list.size());
		} catch (Exception e) {
			logger.error("查询某板块（教育）某年所有薪酬数据！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("查询某板块（教育）某年所有薪酬数据！");
		}
		return ret;
	}

	/**
	 * 查询某公司某年所有薪酬项目数据
	 * 
	 * @param year
	 * @param orgName
	 * @return
	 */
	@RequestMapping(value = "/searchPayBySomeOrgName  ", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<ResponseNameAndValue> searchPayBySomeOrgName(Integer year, String orgNickName) {
		logger.info("查询某公司某年所有薪酬项目数据【开始】year :{},month: {}", year, orgNickName);
		BaseRet<ResponseNameAndValue> ret = new BaseRet<ResponseNameAndValue>();

		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<MtStringAndBigDecimalBean> list = wtrjPayService.searchPayBySomeOrgName(year, orgNickName, this.getCurrentUser().getId());
			// 将查询结果转换为页面需要的实体类型

			ResponseNameAndValue respPay = new ResponseNameAndValue();
			for (MtStringAndBigDecimalBean mtPay : list) {
				respPay.getNameList().add(mtPay.getStringName());
				respPay.getValueList().add(BigDecimalUtil.autoGet(mtPay.getSumValue()));
			}
			ret.setData(respPay);

			logger.debug("查询某公司某年所有薪酬项目数据 【结束】 list.size :{}", list.size());
		} catch (Exception e) {
			logger.error("查询某公司某年所有薪酬项目数据！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("查询某公司某年所有薪酬项目数据！");
		}
		return ret;
	}
}
