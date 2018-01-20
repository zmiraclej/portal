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
import cn.com.wtrj.jx.web.portal.controller.request.RoleSchoolUpdParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.controller.response.report.UserNcOrgInfoRet;
import cn.com.wtrj.jx.web.portal.controller.response.setting.RoleSchoolRet;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleSchoolDto;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleSchoolRelationshipService;

@Controller
public class RoleSchoolRelationshipController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(RoleSchoolRelationshipController.class);

	@Autowired
	IRoleSchoolRelationshipService service;

	@ResponseBody
	@RequestMapping(value = "/searchRoleSchool")
	public PageData<List<RoleSchoolRet>> searchRoleNcOrg(String roleId) {
		logger.info("角色学校权限查询开始");

		PageData<List<RoleSchoolRet>> ret = new PageData<List<RoleSchoolRet>>();
		try {
			List<RoleSchoolRet> rows = new ArrayList<RoleSchoolRet>();

			if (StringUtils.isNotEmpty(roleId)) {
				List<MtRoleSchoolDto> list = service.searchSchoolByRoleId(roleId);
				
				for (MtRoleSchoolDto dto : list) {
					RoleSchoolRet r = new RoleSchoolRet();
					r.setSchoolCode(dto.getSchoolCode());
					r.setSchoolName(dto.getSchoolName());
					r.setRoleId(dto.getRoleId());
					r.setOwn(StringUtils.isEmpty(dto.getRoleId()) ? false : true);

					rows.add(r);
				}
			}

			ret.setRows(rows);
			ret.setTotal(rows.size());
		} catch (Exception e) {
			logger.error("角色学校权限查询异常", e);
		}
		logger.info("角色学校权限查询结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/updateRoleSchoolRelationship")
	public BaseRet<String> updateRoleSchoolRelationship(@RequestBody RoleSchoolUpdParam param) {
		logger.info("角色学校权限更新开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			service.updateRoleSchool(param.getRoleId(), param.getSchoolCodes());

		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("角色学校权限更新异常！", e);
		}
		logger.info("角色学校权限更新结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/searchSchoolOfUser")
	public BaseRet<UserNcOrgInfoRet> searchSchoolOfUser() {
		logger.info("用户NC报表权限查询开始");

		BaseRet<UserNcOrgInfoRet> ret = new BaseRet<UserNcOrgInfoRet>();
		try {
//			List<MtUserNcOrgNameDto> dtos = service.searchUserNcOrgInfoByUserId(this.getCurrentUser().getId());
//			info.setSegementName(dtos.get(0).getSegementName());
//			info.setOrgName(dtos.get(0).getOrgName());
//			info.setOrgNickName(dtos.get(0).getOrgNickName());
//
//			ret.setData(info);
		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("用户NC报表权限查询！", e);
		}
		logger.info("用户NC报表权限查询结束");
		return ret;
	}

}
