package cn.com.wtrj.jx.web.portal.controller.report.zs;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleSchoolDto;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleSchoolRelationshipService;

@Controller
public class ZsEnrollDetailController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(ZsEnrollDetailController.class);

	@Autowired
	IRoleSchoolRelationshipService roleSchoolService;

	@Autowired
	IWtrjSchoolInfoService schoolInfoService;

	@Value("${server.esb.ip}")
	String serverIp;

	// 录取情况明细表初始化数据（默认起始日期，默认结束日期）
	@RequestMapping(value = "/enrollDetailInit")
	public String initData(Map<String, Object> model, HttpServletRequest request) {
		logger.info("录取情况明细表初始化数据查询开始");
		// 设置默认起始日期为三个月前
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, -3);
		String defaultBeginDate = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
		request.setAttribute("defaultBeginDate", defaultBeginDate);

		// 设置默认结束日期为当天
		String defaultEndDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		request.setAttribute("defaultEndDate", defaultEndDate);

		List<MtRoleSchoolDto> dtos = roleSchoolService.searchRoleSchoolInfoByUserId(this.getCurrentUser().getId());
		if (dtos != null) {
			if (dtos.size() == 1) {
				model.put("schoolName", dtos.get(0).getNickName());
			} else {
				model.put("schoolName", "集团");
			}
		}

		request.setAttribute("id", MenuId.ENROLL_DETAIL);

		this.doCommonSetting(model);

		logger.info("录取情况明细表初始化数据查询结束");
		return "report/zs/enrollDetail";
	}
}
