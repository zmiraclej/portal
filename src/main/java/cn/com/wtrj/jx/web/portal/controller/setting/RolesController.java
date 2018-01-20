package cn.com.wtrj.jx.web.portal.controller.setting;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
import cn.com.wtrj.jx.web.portal.controller.request.RoleAddParam;
import cn.com.wtrj.jx.web.portal.controller.request.RoleDeleteParam;
import cn.com.wtrj.jx.web.portal.controller.request.RoleMenuUpdParam;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.controller.response.setting.RoleMenuTreeRet;
import cn.com.wtrj.jx.web.portal.controller.response.setting.RolesRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRole;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleMenusDto;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleService;
import cn.com.wtrj.jx.web.portal.util.RoleMenuTreeUtil;

@Controller
public class RolesController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(RolesController.class);

	@Autowired
	IRoleService roleService;

	@RequestMapping("/roles")
	public String searchUsers(Map<String, Object> model) {
		// 记录所选模块的Id
		model.put("id", "roles");
		this.doCommonSetting(model);
		return "setting/roles";
	}

	@ResponseBody
	@RequestMapping(value = "/searchRoles")
	public PageData<List<RolesRet>> searchUsers(PageSearchParam param) {
		logger.info("角色查询开始");

		PageData<List<RolesRet>> ret = new PageData<List<RolesRet>>();
		try {
			// 获取角色数量
			int total = roleService.countRoles(param.getSearch());
			ret.setTotal(total);

			// 获取角色明细
			List<RolesRet> roleList = new ArrayList<RolesRet>();

			int end = param.getOffset() + param.getLimit();
			List<WtrjRole> list = roleService.searchRolesByPage(param.getOffset(), end, param.getSearch());

			if (list != null && list.size() > 0) {
				for (WtrjRole dto : list) {
					RolesRet role = new RolesRet();
					role.setId(dto.getId());
					role.setName(dto.getName());

					roleList.add(role);
				}

			}

			ret.setRows(roleList);
		} catch (Exception e) {
			logger.error("角色查询！", e);
		}
		logger.info("角色查询结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/searchRoleMenu")
	public BaseRet<List<RoleMenuTreeRet>> searchRoleMenu(String roleId) {
		logger.info("角色菜单查询开始");

		BaseRet<List<RoleMenuTreeRet>> ret = new BaseRet<List<RoleMenuTreeRet>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			List<RoleMenuTreeRet> tree = new ArrayList<RoleMenuTreeRet>();
			if (StringUtils.isNotEmpty(roleId)) {
				List<MtRoleMenusDto> list = roleService.searchMenusByRole(roleId);

				tree = RoleMenuTreeUtil.genDeptTree(list, "");
			}

			ret.setData(tree);
		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("角色菜单查询！", e);
		}
		logger.info("角色菜单查询结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/addRole")
	public BaseRet<String> addRole(@RequestBody RoleAddParam param) {
		logger.info("角色新增开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			Boolean rst = roleService.addRole(param.getRoleId(), param.getRoleName());
			if (!rst) {
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("角色ID已存在");
			}
		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("角色新增异常！", e);
		}
		logger.info("角色新增结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/updateRoleMenus")
	public BaseRet<String> updateRoleMenus(@RequestBody RoleMenuUpdParam param) {
		logger.info("角色菜单权限更新开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			roleService.updateRoleMenus(param.getRoleId(), param.getMenus());

		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("角色菜单权限更新异常！", e);
		}
		logger.info("角色菜单权限更新结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/deleteRole")
	public BaseRet<String> deleteRoles(@RequestBody RoleDeleteParam param) {
		logger.info("角色删除开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			roleService.deleteRole(param.getRoleId());

		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("角色删除异常！", e);
		}
		logger.info("角色删除结束");
		return ret;
	}
}
