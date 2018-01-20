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
import cn.com.wtrj.jx.web.portal.model.mt.entities.TaxBean;
import cn.com.wtrj.jx.web.portal.service.TaxService;
import cn.com.wtrj.jx.web.portal.util.BigDecimalUtil;

/**
 * 税务表controller
 * 
 * @author jitao
 *
 */
@Controller
@RequestMapping("/Tax")
public class TaxController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(TaxController.class);

	@Autowired
	TaxService taxService;

	/**
	 * 查询税务表中所有不重复的年份
	 * 
	 * @return 税务表中所有不重复的年份的集合
	 */
	@RequestMapping(value = "/searchTaxAllYears", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<Integer>> searchTaxAllYears() {
		logger.info("税务表所有不重复的年份数据查询【开始】");
		BaseRet<List<Integer>> ret = new BaseRet<List<Integer>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<Integer> list = taxService.searchTaxAllYears();
			ret.setData(list);
		} catch (Exception e) {
			logger.error("税务表所有不重复的年份数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("税务表所有不重复的年份数据查询异常！");
		}
		logger.info("税务表所有不重复的年份数据查询【结束】");
		return ret;
	}

	/**
	 * 按年份查找税务表某一年的数据
	 * 
	 * @param yearInfo
	 *            年份
	 * @return 税务表某一年的数据
	 */
	@RequestMapping(value = "/searchTaxInfoByYear", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<TaxBean>> searchTaxByYear(@RequestParam(value = "yearInfo") String yearInfo) {
		logger.info("税务表某一年的数据查询【开始】");
		BaseRet<List<TaxBean>> ret = new BaseRet<List<TaxBean>>();
		int year = Integer.parseInt(yearInfo);

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<TaxBean> list = taxService.searchTaxInfoByYear(year, this.getCurrentUser().getId());
			for (TaxBean TaxBean : list) {
				TaxBean.setTax(BigDecimalUtil.getBigDecimalVal(TaxBean.getTax()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("税务表某一年的数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("税务表某一年的数据查询异常！");
		}
		logger.info("税务表某一年的数据查询【结束】");
		return ret;
	}

	/**
	 * 按板块查询税务表的数据
	 * 
	 * @param yearInfo
	 *            年份
	 * @param monthInfo
	 *            月份
	 * @return 税务表板块数据
	 */
	@RequestMapping(value = "/searchTaxInfoByProject", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<TaxBean>> searchTaxInfoByProject(@RequestParam(value = "yearInfo") String yearInfo,
			@RequestParam(value = "monthInfo") String monthInfo) {
		logger.info("税务表板块数据查询【开始】");
		BaseRet<List<TaxBean>> ret = new BaseRet<List<TaxBean>>();
		int year = Integer.parseInt(yearInfo);
		int month = Integer.parseInt(monthInfo);

		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<TaxBean> list = taxService.searchTaxInfoByProject(year, month, this.getCurrentUser().getId());
			for (TaxBean TaxBean : list) {
				TaxBean.setTax(BigDecimalUtil.getBigDecimalVal(TaxBean.getTax()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("税务表板块数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("税务表板块数据查询异常！");
		}
		logger.info("税务表板块数据查询【结束】");
		return ret;
	}

}