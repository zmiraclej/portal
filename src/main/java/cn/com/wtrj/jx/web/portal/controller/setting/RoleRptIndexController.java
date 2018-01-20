package cn.com.wtrj.jx.web.portal.controller.setting;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.RoleRptIndexUpdParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleRptIndexDto;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleRptIndexService;

/**
 * 报表指标权限
 * 
 * @author BAI
 *
 */
@Controller
public class RoleRptIndexController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(RoleRptIndexController.class);

	@Autowired
	IRoleRptIndexService service;

	@ResponseBody
	@RequestMapping(value = "/searchRoleRptIndex", method = RequestMethod.GET)
	public PageData<List<MtRoleRptIndexDto>> searchRoleRptIndex(String roleId) {
		logger.info("报表指标权限查询开始");
		PageData<List<MtRoleRptIndexDto>> re = new PageData<List<MtRoleRptIndexDto>>();
		try {
			if(roleId!=null){
				List<MtRoleRptIndexDto> ds = service.searchRoleRptIndex(roleId);
				re.setRows(ds);
			}else{
				re.setRows(null);
			}
		} catch (Exception e) {
			re.setRows(null);
			logger.error("报表指标权限查询异常", e);
		}
		logger.info("报表指标权限查询结束");
		return re;
	}

	@ResponseBody
	@RequestMapping(value = "/saveRoleRptIndex", method = RequestMethod.POST)
	public BaseRet<String> saveRoleRptIndex(@RequestBody RoleRptIndexUpdParam param) {
		logger.info("报表指标权限更新开始");
		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			service.saveRoleRptIndex(param.getRoleId(), param.getIndexes());
		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("报表指标权限更新异常！", e);
		}
		logger.info("报表指标权限更新结束");
		return ret;
	}
}
