package cn.com.wtrj.jx.web.portal.controller.setting;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.portal.common.util.MailIntfacesUtils;
import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.BindEmployeeDelParam;
import cn.com.wtrj.jx.web.portal.controller.request.BindEmployeeUpdParam;
import cn.com.wtrj.jx.web.portal.controller.request.PwdParam;
import cn.com.wtrj.jx.web.portal.controller.request.UserAddParam;
import cn.com.wtrj.jx.web.portal.controller.request.UserDeleteParam;
import cn.com.wtrj.jx.web.portal.controller.request.UserRoleUpdParam;
import cn.com.wtrj.jx.web.portal.controller.request.UserUpdParam;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.controller.response.setting.RolesRet;
import cn.com.wtrj.jx.web.portal.controller.response.setting.UsersRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjUser;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleDto;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtUserDto;
import cn.com.wtrj.jx.web.portal.service.UserService;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleService;

@Controller
public class UsersController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(UsersController.class);
	
	@Value("${mail.interfaces.url}")
	protected String mailInterfacesUrl;
	
	@Value("${mail.domain.name}")
	protected String mailDomainName;
	
	@Value("${mail.admin.name}")
	protected String mailAdminName;
	
	@Value("${mail.admin.password}")
	protected String mailAdminPassword;

	@Autowired
	UserService userService;

	@Autowired
	IRoleService roleService;

	/**
	 * 反回页面
	 * 
	 * @return
	 */
	@RequestMapping("/users")
	public String searchUsers(Map<String, Object> model) {
		// 记录所选模块的Id
		model.put("id", MenuId.SETTING_USERS);
		this.doCommonSetting(model);

		return "setting/users";
	}

	@ResponseBody
	@RequestMapping(value = "/searchUsers")
	public PageData<List<UsersRet>> searchUsers(PageSearchParam param) {
		logger.info("用户查询开始");

		PageData<List<UsersRet>> ret = new PageData<List<UsersRet>>();
		try {
			// 获取用户数量
			int total = userService.countUsers(param.getSearch());
			ret.setTotal(total);

			// 获取用户明细
			List<UsersRet> userList = new ArrayList<UsersRet>();

			int end = param.getOffset() + param.getLimit();
			List<MtUserDto> list = userService.searchUsersByPage(param.getOffset() + 1, end, param.getSearch());

			if (list != null && list.size() > 0) {
				for (MtUserDto dto : list) {
					UsersRet user = new UsersRet();
					user.setId(dto.getUserId());
					user.setName(dto.getUserName());
					user.setPassword(dto.getPwd());
					user.setMobile(dto.getPhone());
					user.setJobCode(dto.getJobCode());
					user.setEmployeeId(dto.getEmployeeId());
					user.setEmployeeName(dto.getEmployeeName());
					user.setEmployeeNumber(dto.getEmployeeNumber());

					userList.add(user);
				}

			}

			ret.setRows(userList);
		} catch (Exception e) {
			logger.error("用户查询！", e);
		}
		logger.info("用户查询结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/searchUserRoles")
	public PageData<List<RolesRet>> searchUserRoles(PageSearchParam param, Integer userId) {
		logger.info("用户角色查询开始");
		PageData<List<RolesRet>> ret = new PageData<List<RolesRet>>();
		try {
			// 获取用户数量
			int total = roleService.countRoles(param.getSearch());
			ret.setTotal(total);

			// 获取用户明细
			List<RolesRet> roleList = new ArrayList<RolesRet>();

			int end = param.getOffset() + param.getLimit();
			List<MtRoleDto> list = roleService.searchUserRolesByPage(userId, param.getOffset(), end, param.getSearch());

			if (list != null && list.size() > 0) {
				for (MtRoleDto dto : list) {
					RolesRet role = new RolesRet();
					role.setName(dto.getRoleName());
					role.setId(dto.getRoleId());
					role.setOwn(dto.getUserId() == null ? false : true);

					roleList.add(role);
				}

			}

			ret.setRows(roleList);
		} catch (Exception e) {
			logger.error("用户角色查询！", e);
		}
		logger.info("用户角色查询结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/changePwd", method = RequestMethod.POST)
	public BaseRet<String> changePwd(@RequestBody PwdParam param) {
		logger.info("密码更新开始");

		BaseRet<String> ret = new BaseRet<String>();
		MailIntfacesUtils mailUtil = new MailIntfacesUtils();
		try {
			String checkMessage = mailUtil.checkMailUser(this.getUserName(), param.getPwd(),mailInterfacesUrl,mailDomainName,mailAdminName,mailAdminPassword);
			if(checkMessage.equals("Success")){
				String updateMessage = mailUtil.updateMailUser(this.getUserName(), param.getPwd(),mailInterfacesUrl,mailDomainName,mailAdminName,mailAdminPassword);
				if(updateMessage.equals("Success")){
					userService.changePwd(this.getCurrentUser().getId(), param.getPwd());
					ret.setMsg("门户与邮件系统密码同步更新成功");
					ret.setCode(Constant.RetCode.SUCCESS);
				}else{
					ret.setCode(Constant.RetCode.ERROR);
					ret.setMsg("邮件系统密码更新失败，门户密码修改终止");
				}
			}else{
				userService.changePwd(this.getCurrentUser().getId(), param.getPwd());
				ret.setCode(Constant.RetCode.SUCCESS);
				ret.setMsg("门户密码修改完成");
			}

		} catch (Exception e) {
			logger.error("密码更新失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		logger.info("密码更新结束.");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/saveNewUser", method = RequestMethod.POST)
	public BaseRet<String> saveNewUser(@RequestBody UserAddParam param) {
		logger.info("新增用户保存开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			Boolean rst = userService.addUser(param.getUserName(), param.getPassword(), param.getTel());
			if (!rst) {
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("用户名已存在!");
			}
		} catch (Exception e) {
			logger.error("新增用户保存失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("新增用户失败！" + e.getMessage());
		}
		logger.info("新增用户保存结束.");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
	public BaseRet<String> deleteUser(@RequestBody UserDeleteParam param) {
		logger.info("用户删除开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			userService.deleteUser(param.getUserId());
		} catch (Exception e) {
			logger.error("用户删除失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("用户删除失败！" + e.getMessage());
		}
		logger.info("用户删除结束.");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/updateUser", method = RequestMethod.POST)
	public BaseRet<String> updateUser(@RequestBody UserUpdParam param) {
		logger.info("用户更新开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			WtrjUser user = new WtrjUser();
			user.setId(param.getUserId());
			user.setName(param.getUserName());
			user.setPwd(param.getPassword());
			user.setTel(param.getTel());
			Boolean rst = userService.updateUser(user);
			if (!rst) {
				ret.setCode(Constant.RetCode.ERROR);
				ret.setMsg("用户名重复！");
			}
		} catch (Exception e) {
			logger.error("用户更新失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("用户更新失败！" + e.getMessage());
		}
		logger.info("用户更新结束.");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/updateUserRoles", method = RequestMethod.POST)
	public BaseRet<String> updateUserRoles(@RequestBody UserRoleUpdParam param) {
		logger.info("用户角色更新开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			userService.updateUserRoles(param.getUserId(), param.getRoles());
		} catch (Exception e) {
			logger.error("用户角色更新失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
			ret.setMsg("用户角色更新失败！" + e.getMessage());
		}
		logger.info("用户角色更新结束.");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/updBindEmployee", method = RequestMethod.POST)
	public BaseRet<String> updBindEmployee(@RequestBody BindEmployeeUpdParam param) {
		logger.info("绑定员工更新开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			userService.updBindEmployee(param.getUserId(), param.getEmployeeId());

		} catch (Exception e) {
			logger.error("绑定员工更新失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		logger.info("绑定员工更新结束.");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/deleteBindEmployee", method = RequestMethod.POST)
	public BaseRet<String> deleteBindEmployee(@RequestBody BindEmployeeDelParam param) {
		logger.info("删除绑定员工开始");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			userService.deleteBindEmployee(param.getUserId());

		} catch (Exception e) {
			logger.error("删除绑定员工失败！", e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		logger.info("删除绑定员工结束.");
		return ret;
	}
}
