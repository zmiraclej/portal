package cn.com.wtrj.jx.web.portal.controller.moral.standard;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.portal.common.controller.response.base.BaseRet;
import cn.com.wtrj.jx.web.portal.common.Constant.Constants;
import cn.com.wtrj.jx.web.portal.common.Constant.RetCode;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.moralStudent.WtrjMoralStandard;
import cn.com.wtrj.jx.web.portal.service.moralStudent.IWtrjMoralStandardService;
@Controller
@RequestMapping("/")
public class StandardController extends BaseController{
	private final static Logger logger = LoggerFactory.getLogger(StandardController.class);
	@Autowired
	private IWtrjMoralStandardService wtrjMoralStandardService;

	
	
	/**
	 * 跳转评分标准列表页面
	 */
	@RequestMapping(value = "/standard")
	public String toStandard(HttpServletRequest request, Model model, Map<String, Object> m) {
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");

		doCommonSetting(m);

		return "ins/standardList";
	}
	
	@ResponseBody
	@RequestMapping(value = "/searchstandard")
	public PageData<List<WtrjMoralStandard>> searchstandard(PageSearchParam param) {
		PageData<List<WtrjMoralStandard>> ret = new PageData<List<WtrjMoralStandard>>();
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		List<WtrjMoralStandard> list = wtrjMoralStandardService.selectStandardByPage(param.getOffset(), param.getLimit());
		int totalCount = wtrjMoralStandardService.countStandards();
		
		//int count = iWtrjMoralINSService.countIns(user.getTeacherId(), schoolCode, role, classId);
		
		//List<WtrjMoralINS> list = iWtrjMoralINSService.pageIns(user.getTeacherId(), schoolCode, role, classId, start, end);
		
		
		ret.setRows(list);
		ret.setTotal(totalCount);
	
		return ret;
	}
	
	
	
	// 逻辑删除
	@RequestMapping(value = "/deleteFlag")
	@ResponseBody
	public BaseRet<String> deleteFlag(String code) {
		logger.info("删除评分标准开始");
		BaseRet<String> ret = new BaseRet<String>();
		try {
			wtrjMoralStandardService.updateFlag(code, Constants.TRUE);
			ret.setMsg("查询成功");
		}catch (Exception e) {
			 logger.error("异常中止!", e);
			ret.setCode(RetCode.ERROR);
			ret.setMsg("查询失败");
		}
		ret.setCode(RetCode.SUCCESS);
		return ret;
	}
	// 添加
	@RequestMapping(value = "/saveStandard",method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveStandard(WtrjMoralStandard standard) {
		logger.info("添加开始");
		BaseRet<String> ret = new BaseRet<String>();
		int rs = 0;
		try {
			standard.setBlDelFlg(Constants.FALSE);
			rs = wtrjMoralStandardService.insertStandard(standard);
			ret.setMsg("添加成功");
		}catch (Exception e) {
			logger.error("异常中止!", e);
			ret.setCode(RetCode.ERROR);
			ret.setMsg("添加失败");
		}
		ret.setCode(RetCode.SUCCESS);
		return ret;
	}
	// 确认修改操作
	@RequestMapping(value = "/updateStandard",method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> updateStandard(WtrjMoralStandard standard) {
		logger.info("修改开始");
		BaseRet<String> ret = new BaseRet<String>();
		int rs = 0;
		 String OldCode=standard.getCode();
		try {
			standard.setBlDelFlg(Constants.FALSE);
			rs = wtrjMoralStandardService.updateAll(standard,OldCode);
			ret.setMsg("修改成功");
		}catch (Exception e) {
			logger.error("异常中止!", e);
			ret.setCode(RetCode.ERROR);
			ret.setMsg("修改失败");
		}
		ret.setCode(RetCode.SUCCESS);
		return ret;
	}
	// 查询详情
	@RequestMapping(value = "/standardDetail")
	@ResponseBody
	public BaseRet<WtrjMoralStandard> standardDetail(String code) {
		logger.info("查询开始");
		BaseRet<WtrjMoralStandard> ret = new BaseRet<WtrjMoralStandard>();
		
		WtrjMoralStandard standard=null;
		try{
			standard=wtrjMoralStandardService.getStandardByCode(code);
			ret.setMsg("查询成功");
			ret.setData(standard);
		}catch (Exception e){
			logger.error("异常中止!", e);
			ret.setCode(RetCode.ERROR);
			ret.setMsg("查询失败");
		}
		ret.setCode(RetCode.SUCCESS);
		return ret;
	}

	
}
