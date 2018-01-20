package cn.com.wtrj.jx.web.portal.controller.notice;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.bean.SmsNotifyParam;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptMsg;
import cn.com.wtrj.jx.web.portal.service.impl.SmsService;

@Controller
@RequestMapping("/noticeCallBack")
public class NoticeCallBackController extends BaseController {

	private Logger logger = Logger.getLogger(NoticeCallBackController.class);

	@Autowired
	private SmsService smsService;

	@RequestMapping(value = "/shortmsgNotify")
	@ResponseBody
	public Object smsNotify(@RequestBody SmsNotifyParam param) {
		logger.info("短信发送回调开始");
		
		Map<String, String> rst = new HashMap<String, String>();
		rst.put("status", "-1");
		try {
			WtrjRptMsg msg = new WtrjRptMsg();
			msg.setId(param.getMessageId());
			msg.setSendResult(param.getMessageResult());
			if ("0".equals(param.getSendState())) {
				msg.setSuccessFlag("1");
			} else {
				msg.setSuccessFlag("3");
			}
			smsService.updateSmsInfo(msg);

			
			rst.put("status", "0");
		} catch (Exception e) {
			logger.error("回调失败", e);
		}
		
		logger.info("短信发送回调结束");
		return rst;
	}
	
	@RequestMapping(value = "/wxNotify")
	@ResponseBody
	public Object wxNotify(@RequestBody SmsNotifyParam param) {
		logger.info("微信发送回调开始");
		
		Map<String, String> rst = new HashMap<String, String>();
		rst.put("status", "-1");
		try {
			WtrjRptMsg msg = new WtrjRptMsg();
			msg.setId(param.getMessageId());
			msg.setSendResult(param.getMessageResult());
			if ("0".equals(param.getSendState())) {
				msg.setSuccessFlag("1");
			} else {
				msg.setSuccessFlag("0");
			}
			smsService.updateSmsInfo(msg);

			
			rst.put("status", "0");
		} catch (Exception e) {
			logger.error("回调失败", e);
		}
		
		logger.info("微信发送回调结束");
		return rst;
	}
}
