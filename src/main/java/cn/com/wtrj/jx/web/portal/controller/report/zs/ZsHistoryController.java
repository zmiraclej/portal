package cn.com.wtrj.jx.web.portal.controller.report.zs;

import java.util.ArrayList;
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
public class ZsHistoryController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(ZsHistoryController.class);

	@Autowired
	IRoleSchoolRelationshipService roleSchoolService;

	@Autowired
	IWtrjSchoolInfoService schoolInfoService;

	@Value("${server.esb.ip}")
	String serverIp;

	/**
	 * 招生报表-集团历年报名情况初始化数据
	 * 
	 * @return 年份列表数据
	 */
	@RequestMapping(value = "/enrollHistoryInit")
	public String enrollAnalysisInitData(Map<String, Object> model, HttpServletRequest request) {
		logger.info("集团历年报名情况初始化数据开始");
		// 记录对应菜单ID,用于控制菜单收放状态
		List<String> list = new ArrayList<String>();
		list.add("2017");
		request.getSession().setAttribute("yearList", list);

		List<MtRoleSchoolDto> dtos = roleSchoolService.searchRoleSchoolInfoByUserId(this.getCurrentUser().getId());
		if (dtos != null) {
			if (dtos.size() == 1) {
				model.put("schoolName", dtos.get(0).getNickName());
			} else {
				model.put("schoolName", "集团");
			}
		}

		request.setAttribute("id", MenuId.ENROLL_HISTORY);

		this.doCommonSetting(model);

		logger.info("集团历年报名情况初始化数据结束");
		return "report/zs/enrollHistory";
	}
}
