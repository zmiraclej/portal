package cn.com.wtrj.jx.web.portal.controller.report.nc;

import java.math.BigDecimal;
import java.util.ArrayList;
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
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtExpectedBean;
import cn.com.wtrj.jx.web.portal.service.ExpectedService;
import cn.com.wtrj.jx.web.portal.service.response.report.EChartsRet;

/**
 * 预期目标分析
 * 
 * 【TODO】20170817改版后新加，暂时没有业务来源
 *
 */
@Controller
@RequestMapping("/Expected")
public class ExpectedController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(ExpectedController.class);

	@Autowired
	ExpectedService service;

	/**
	 * 预期目标分析
	 * 
	 * @param year
	 *            年份
	 * @param segementCode
	 *            板块编码
	 * @param orgCode
	 *            公司编码
	 * @return
	 */
	@RequestMapping(value = "/searchExpectedGoal", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<EChartsRet> searchExpectedGoal(Integer year, @RequestParam(value = "parentCode") String segementCode,
			@RequestParam(value = "childCode") String orgCode) {
		logger.info("预期目标分析数据查询【开始】");
		BaseRet<EChartsRet> ret = new BaseRet<EChartsRet>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<MtExpectedBean> rs = service.searchExpectedGoal(year, this.getCurrentUser().getId(), segementCode, orgCode);

			List<String> names = new ArrayList<String>();
			List<BigDecimal> shijiJingli = new ArrayList<BigDecimal>();
			List<BigDecimal> shijiMaoli = new ArrayList<BigDecimal>();
			List<BigDecimal> shijiXiaoshoue = new ArrayList<BigDecimal>();
			List<BigDecimal> yuqiJingli = new ArrayList<BigDecimal>();
			List<BigDecimal> yuqiMaoli = new ArrayList<BigDecimal>();
			List<BigDecimal> yuqiXiaoshoue = new ArrayList<BigDecimal>();
			for (MtExpectedBean r : rs) {
				names.add(r.getNames());
				shijiJingli.add(r.getShijiJingli());
				shijiMaoli.add(r.getShijiMaoli());
				shijiXiaoshoue.add(r.getShijiXiaoshoue());
				yuqiJingli.add(r.getYuqiJingli());
				yuqiMaoli.add(r.getYuqiMaoli());
				yuqiXiaoshoue.add(r.getYuqiXiaoshoue());
			}

			EChartsRet ec = new EChartsRet();
			ret.setData(ec);
		} catch (Exception e) {
			logger.error("预期目标分析数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("预期目标分析数据查询异常！");
		}
		logger.info("预期目标分析数据查询【结束】");
		return ret;
	}

}
