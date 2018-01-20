package cn.com.wtrj.jx.web.portal.job;

import java.util.Calendar;
import java.util.UUID;

import org.apache.log4j.Logger;

import com.google.common.base.Strings;
import com.google.gson.JsonObject;

import cn.com.wtrj.jx.web.portal.controller.request.notice.Sms;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptMsg;
import cn.com.wtrj.jx.web.portal.service.impl.SmsService;
import cn.com.wtrj.jx.web.portal.util.HttpRequestUtils;

public class SmsJob implements Runnable {

	private static Logger logger = Logger.getLogger(SmsJob.class);

	private Sms sms;
	
	private SmsService smsService;

	public SmsJob(Sms sms, SmsService smsService) {
		this.sms = sms;
		this.smsService = smsService;
	}

	@Override
	public void run() {

		if (sms == null)
			return;

		if (Strings.isNullOrEmpty(sms.getContent()))
			return;

		if (sms.getMobiles() == null || sms.getMobiles().size() == 0)
			return;


		for (String phone : sms.getMobiles()) {
			String messageId = UUID.randomUUID().toString();

			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("content", "【维睿教育社区】"+sms.getContent());
			jsonObject.addProperty("smsType", sms.getSmsType());
			jsonObject.addProperty("messageId", messageId);
			jsonObject.addProperty("mobile", phone);
			logger.info(jsonObject.toString());
			// 短信通知
			JsonObject result = HttpRequestUtils.httpPost(sms.getSendUrl(), jsonObject);

			WtrjRptMsg param = new WtrjRptMsg();
			param.setContent(sms.getContent());
			param.setMsgCode(sms.getMsgCode());
			param.setMsgType("2");
			param.setType("2");
			param.setSendTime(Calendar.getInstance().getTime());
			param.setToUser(phone);
			if (result != null && result.get("errorcode") != null
					&& "0".equals(result.get("errorcode").getAsString())) {
				param.setSuccessFlag("2");

			} else {
				param.setSuccessFlag("1");

			}
			param.setId(messageId);
			smsService.saveSmsInfo(param);

		}

	}

}
