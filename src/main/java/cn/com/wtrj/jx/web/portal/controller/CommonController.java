package cn.com.wtrj.jx.web.portal.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.SchoolRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjSchoolInfo;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.util.LoginUtil;

@Controller
@RequestMapping("/")
public class CommonController extends BaseController
{

    private static final Logger logger = LoggerFactory.getLogger(CommonController.class);

	@Value("${hr.sql.url}")
	protected String hrSqlUrl;
	@Value("${hr.sql.username}")
	protected String hrSqlUsername;
	@Value("${hr.sql.userpwd}")
	protected String hrSqlUserpwd;
	@Value("${hr.login.url}")
	protected String hrLoginUrl;
    
    @Resource
    private IWtrjSchoolInfoService schoolService;
    
    @RequestMapping(value = "/searchSchoolInfo")
	@ResponseBody
	public BaseRet<List<SchoolRet>> searchSchoolInfo() {
		logger.info("查询学校信息【开始】");
		BaseRet<List<SchoolRet>> ret = new BaseRet<List<SchoolRet>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			
			List<SchoolRet> rs = new ArrayList<SchoolRet>();
			
			List<WtrjSchoolInfo> schools = schoolService.searchAll();
			for (WtrjSchoolInfo dto : schools) {
				SchoolRet sr = new SchoolRet();
				sr.setSchoolCode(dto.getCode());
				sr.setSchoolName(dto.getName());
				
				rs.add(sr);
			}
			
			ret.setData(rs);
		} catch (Exception ex) {
			ret.setCode(Constant.RetCode.ERROR);
			logger.error("查询学校信息【异常】", ex);
		}
		logger.info("查询学校信息【结束】");
		return ret;
	}
    
    /**
     *查询Hr单点登录接口 
     **/
    @RequestMapping(value = "/searchHrLoginUrl")
    @ResponseBody
    public Object searchHrLoginUrl(){
    	logger.info("HR单点接口地址获取 开始");
    	Map<String, Object>map =new HashMap<String, Object>();
    	 /**hr单点登录**/
        String hrUrl="";
		try {
			hrUrl = hrLoginUrl+LoginUtil.getHrLoginTekit(hrSqlUrl, hrSqlUsername, hrSqlUserpwd,getUserName())+"&Func_Code=1000";
			map.put("code", "02");
			map.put("hrUrl", hrUrl);
			map.put("msg", "接口地址获取成功");
		} catch (Exception e) {
			map.put("code", "01");
			logger.error("HR接口地址获取失败", e);
		}
		logger.info("HR接口地址获取 结束");
		return map;
    }
}
