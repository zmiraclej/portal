package cn.com.wtrj.jx.web.portal.job;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.google.common.base.Strings;

import cn.com.wtrj.jx.web.portal.utils.WeixinUtil;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.cp.api.WxCpService;
import me.chanjar.weixin.cp.bean.WxCpMessage;
import me.chanjar.weixin.cp.bean.article.NewArticle;

public class WxJob implements Runnable {

	private static Logger logger = Logger.getLogger(WxJob.class);
	
	private List<Map<String, String>> list;
	
    private String sendAppid;
	
	private String sendSecret;
	
	private Integer agentId;
	
	public WxJob(String sendAppid, String sendSecret, Integer agentId, List<Map<String, String>> list) {
		this.sendAppid = sendAppid;
		this.sendSecret = sendSecret;
		this.agentId = agentId;
		
		this.list = list;
	}

	@Override
	public void run() {
		// 微信通知
		WxCpService wxCpService = WeixinUtil.getWxCpService(sendAppid, sendSecret);
					
		for (Map<String, String> map : list) {
			WxCpMessage newsMessage = WxCpMessage.TEXT().agentId(agentId).toUser(map.get("phone")).content(map.get("content")).build();
			try {
				wxCpService.messageSend(newsMessage);
			} catch (WxErrorException e) {
				e.printStackTrace();
				logger.info(e.getMessage());
			}
		}
		
	}

}
