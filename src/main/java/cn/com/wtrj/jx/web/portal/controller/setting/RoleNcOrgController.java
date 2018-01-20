package cn.com.wtrj.jx.web.portal.controller.setting;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.RoleNcOrgUpdParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.controller.response.report.UserNcOrgInfoRet;
import cn.com.wtrj.jx.web.portal.controller.response.setting.RoleNcOrgRet;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleNcOrgDto;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtUserNcOrgDto;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtUserNcOrgNameDto;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleNcOrgService;

@Controller
public class RoleNcOrgController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(RoleNcOrgController.class);

	@Autowired
	IRoleNcOrgService service;

	@ResponseBody
	@RequestMapping(value = "/searchRoleNcOrg")
	public PageData<List<RoleNcOrgRet>> searchRoleNcOrg(String roleId) {
		logger.info("角色NC公司权限查询开始");

		PageData<List<RoleNcOrgRet>> ret = new PageData<List<RoleNcOrgRet>>();
		try {
			List<RoleNcOrgRet> rows = new ArrayList<RoleNcOrgRet>();

			if (StringUtils.isNotEmpty(roleId)) {
				List<MtRoleNcOrgDto> list = service.searchRoleNcOrg(roleId);
				for (MtRoleNcOrgDto dto : list) {
					RoleNcOrgRet r = new RoleNcOrgRet();
					r.setOrgCode(dto.getOrgCode());
					r.setOrgName(dto.getOrgName());
					r.setOrgNickName(dto.getOrgNickName());
					r.setSegementCode(dto.getSegementCode());
					r.setSegementName(dto.getSegementName());
					r.setOwn(StringUtils.isEmpty(dto.getRoleId()) ? false : true);

					rows.add(r);
				}
			}

			ret.setRows(rows);
			ret.setTotal(rows.size());
		} catch (Exception e) {
			logger.error("角色NC公司权限查询！", e);
		}
		logger.info("角色NC公司权限查询结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/updateRoleNcOrg")
	public BaseRet<String> updateRoleNcOrg(@RequestBody RoleNcOrgUpdParam param) {
		logger.info("角色NC公司权限更新开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			service.updateRoleNcOrg(param.getRoleId(), param.getOrgCodes());

		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("角色NC公司权限更新异常！", e);
		}
		logger.info("角色NC公司更新结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/searchNcOrgOfUser")
	public BaseRet<UserNcOrgInfoRet> searchNcOrgOfUser() {
		logger.info("用户NC报表权限查询开始");

		BaseRet<UserNcOrgInfoRet> ret = new BaseRet<UserNcOrgInfoRet>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			MtUserNcOrgDto dto = service.searchUserNcOrgNumber(this.getCurrentUser().getId());

			UserNcOrgInfoRet info = new UserNcOrgInfoRet();
			info.setOrgNum(dto.getOrgNum());
			info.setSegementNum(dto.getSegementNum());

			List<MtUserNcOrgNameDto> dtos = service.searchUserNcOrgInfoByUserId(this.getCurrentUser().getId());
			info.setSegementName(dtos.get(0).getSegementName());
			info.setOrgName(dtos.get(0).getOrgName());
			info.setOrgNickName(dtos.get(0).getOrgNickName());

			ret.setData(info);
		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("用户NC报表权限查询！", e);
		}
		logger.info("用户NC报表权限查询结束");
		return ret;
	}

}
