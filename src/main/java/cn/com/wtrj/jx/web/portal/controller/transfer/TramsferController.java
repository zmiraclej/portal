package cn.com.wtrj.jx.web.portal.controller.transfer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant.RetCode;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.transfer.AffairsRet;
import cn.com.wtrj.jx.web.portal.controller.response.transfer.BulletinsRet;
import cn.com.wtrj.jx.web.portal.controller.response.transfer.NewsDatasRet;
import cn.com.wtrj.jx.web.portal.controller.response.transfer.ResultDataRet;
import cn.com.wtrj.jx.web.portal.controller.response.transfer.SummarysRet;
import cn.com.wtrj.jx.web.portal.util.GSONUtils;
import cn.com.wtrj.jx.web.portal.util.HttpRequestUtil;
import cn.com.wtrj.jx.web.portal.util.RestWebServiceClient;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.seeyon.client.CTPRestClient;
@Controller
@RequestMapping("/")
public class TramsferController extends BaseController{
	private final static Logger logger = LoggerFactory.getLogger(TramsferController.class);
	
	
	@Value("${oa.url}")
	protected String oaUrl;
	
	//图片新闻
	@ResponseBody
	@RequestMapping(value = "/searchImagesAndNews", method = RequestMethod.GET)
	public Object searchImagesAndNews() {
		String loginName = getUserName();
		String unitId = "670869647114347";
		logger.info("查询图片新闻开始[]");
		Map<String, Object> map = new HashMap<String, Object>();
		List<NewsDatasRet> records=new ArrayList<NewsDatasRet>();
		try {
			Gson gson = new Gson(); 
			CTPRestClient restClient = RestWebServiceClient.getCTPRestClient("test", "123123", oaUrl);
			
			//图片新闻查询
			String content = restClient.get("news/unit/"+unitId+"?ticket="+loginName+"&imageOrFocus=0", String.class);
			records = GSONUtils.toList(String.valueOf(content), new TypeToken<List<NewsDatasRet>>(){}.getType());
			//待办事项查询
			String Daibancontent = restClient.get("affairs/pending/code/"+loginName, String.class);
			ResultDataRet Daibanrecords = gson.fromJson(Daibancontent,ResultDataRet.class);
			
			//最新公告
			String gonggaoList = restClient.get("bulletin/unit/"+unitId+"?ticket="+loginName, String.class);
			List<BulletinsRet>Gonggaorecords = GSONUtils.toList(String.valueOf(gonggaoList),new TypeToken<List<BulletinsRet>>(){}.getType());
			
			//获取单位新闻
			String newList = restClient.get("news/unit/"+unitId+"?ticket="+loginName+"&imageOrFocus=2", String.class);
			List<NewsDatasRet>unidNews = GSONUtils.toList(String.valueOf(newList), new TypeToken<List<NewsDatasRet>>(){}.getType());
			
			//获取追踪事项
			String zhuizList = restClient.get("affairs/done/code/"+getUserName(), String.class);
			ResultDataRet Zhuizrecords = gson.fromJson(zhuizList,ResultDataRet.class);
			/**
			 *loginName:登录用户名 
			 * type:1为代办公文，2为已办公文
			 **/
			String oaGwDbUrl=oaUrl+"/seeyon/wtrj.do?method=getEdocInfos&loginName="+loginName+"&type=";
			//代办公文
			String gwDbList=HttpRequestUtil.httpGetToStr(oaGwDbUrl+1);
			/*String gwDbList = restClient.get("edoc/receipt/draft?track="+loginName, String.class);*/
			List<SummarysRet> gwDbRecords = GSONUtils.toList(String.valueOf(gwDbList), new TypeToken<List<SummarysRet>>(){}.getType());
			
			//已办公文
			String gwYbList=HttpRequestUtil.httpGetToStr(oaGwDbUrl+2);
			/*String gwYbList = restClient.get("edoc/receipt/sent?track="+loginName, String.class);*/
			List<SummarysRet> gwYbRecords = GSONUtils.toList(String.valueOf(gwYbList), new TypeToken<List<SummarysRet>>(){}.getType());

			map.put("data", records);
			map.put("gonggaoData", Gonggaorecords);
			map.put("unidNewsData", unidNews);
			map.put("sxDbData", Daibanrecords);
			map.put("sxZzData", Zhuizrecords);
			map.put("gwDbRecords", gwDbRecords);
			map.put("gwYbRecords", gwYbRecords);
			map.put("code", RetCode.SUCCESS);
			map.put("msg", "查询成功");
		} catch (Exception e) {
			map.put("code", RetCode.ERROR);
			map.put("msg", "查询失败");
			logger.error("异常中止!", e);
		}
		logger.info("查询图片新闻结束");
		return map;
	}
}
