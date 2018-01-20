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
import cn.com.wtrj.jx.web.portal.model.mt.entities.CapitalBean;
import cn.com.wtrj.jx.web.portal.service.IWtrjCapitalService;
import cn.com.wtrj.jx.web.portal.util.BigDecimalUtil;

/**
 * 资金报表控制器
 * 
 * @author jitao
 *
 */

@Controller
@RequestMapping("/Capital")
public class CapitalController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(CapitalController.class);

	@Autowired
	IWtrjCapitalService iWtrjCapitalService;

	@RequestMapping(value = "/searchCapitalInfoByProject", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<CapitalBean>> searchCapitalInfoByProject(@RequestParam(value = "typeInfo") String type) {
		logger.info("资金报表按板块所得数据查询【开始】");
		BaseRet<List<CapitalBean>> ret = new BaseRet<List<CapitalBean>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<CapitalBean> list = iWtrjCapitalService.searchCapitalInfoByProject(type, this.getCurrentUser().getId());
			for (CapitalBean capitalBean : list) {
				capitalBean.setMoney(BigDecimalUtil.getBigDecimalVal(capitalBean.getMoney()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("资金报表按板块所得数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("资金报表按板块所得数据查询异常！");
		}
		logger.info("资金报表按板块所得数据查询【结束】");
		return ret;
	}

	@RequestMapping(value = "/searchCapitalInfoBySchool", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<CapitalBean>> searchCapitalInfoBySchool(@RequestParam(value = "project") String project,
			@RequestParam(value = "type") String type) {
		logger.info("资金报表按校区分布所得数据查询【开始】");
		BaseRet<List<CapitalBean>> ret = new BaseRet<List<CapitalBean>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<CapitalBean> list = iWtrjCapitalService.searchCapitalInfoBySchool(project, type, this.getCurrentUser().getId());
			for (CapitalBean capitalBean : list) {
				capitalBean.setMoney(BigDecimalUtil.getBigDecimalVal(capitalBean.getMoney()));
			}
			ret.setData(list);
		} catch (Exception e) {
			logger.error("资金报表按校区分布所得数据查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("资金报表按校区分布所得数据查询异常！");
		}
		logger.info("资金报表按校区分布所得数据查询【结束】");
		return ret;
	}
}
