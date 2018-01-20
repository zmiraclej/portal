package cn.com.wtrj.jx.web.portal.controller.request.notice;

import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import org.apache.log4j.Logger;

import com.google.common.base.Strings;
import com.google.gson.JsonObject;

import cn.com.wtrj.jx.web.portal.job.SmsJob;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptMsg;
import cn.com.wtrj.jx.web.portal.service.impl.SmsService;
import cn.com.wtrj.jx.web.portal.util.HttpRequestUtils;

public class WxJob implements Runnable {

	private static Logger logger = Logger.getLogger(SmsJob.class);
	
	private String sendAppid;
	
	private String sendSecret;
	
	private Integer agentId;
	
	private String content;
	
	private List<String> toUser;
	
	private String msgCode;
	
	private SmsService smsService;
	
	private String sendUrl;
	
	private String type;

	public WxJob(String sendUrl, String type, String sendAppid, String sendSecret, Integer agentId, String content, String msgCode, SmsService smsService, List<String> toUser) {
		this.sendAppid = sendAppid;
		this.sendSecret = sendSecret;
		this.agentId = agentId;
		this.content = content;
		this.toUser = toUser;
		this.msgCode = msgCode;
		this.sendUrl = sendUrl;
		this.smsService = smsService;
		this.type = type;
	}

	@Override
	public void run() {
		
		if(Strings.isNullOrEmpty(sendAppid))
			return;
		
		if(Strings.isNullOrEmpty(sendSecret))
			return;
		
		if(agentId == null)
			return;
		
		if(content == null)
			return;
		
		if(toUser == null || toUser.size() == 0)
			return;
		
		// 微信通知
		for (String user : toUser) {
			String messageId = UUID.randomUUID().toString();

			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("sendAppid", sendAppid);
			jsonObject.addProperty("agentId", agentId);
			jsonObject.addProperty("messageId", messageId);
			jsonObject.addProperty("sendSecret", sendSecret);
			jsonObject.addProperty("content", "【维睿教育社区】"+content);
			jsonObject.addProperty("toUser", user);

			// 发送微信
			JsonObject result = HttpRequestUtils.httpPost(sendUrl, jsonObject);

			WtrjRptMsg param = new WtrjRptMsg();
			param.setContent(content);
			param.setMsgCode(msgCode);
			param.setMsgType("1");
			param.setType(type);
			param.setSendTime(Calendar.getInstance().getTime());
			param.setToUser(user);
			if (result != null && result.get("errorcode") != null
					&& "0".equals(result.get("errorcode").getAsString())) {
				param.setSuccessFlag("2");

			} else {
				param.setSuccessFlag("3");

			}
			param.setId(messageId);
			smsService.saveSmsInfo(param);
		}
		
	}

}
