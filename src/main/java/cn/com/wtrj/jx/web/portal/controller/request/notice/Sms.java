package cn.com.wtrj.jx.web.portal.controller.request.notice;

import java.io.Serializable;
import java.util.List;

public class Sms implements Serializable {
	
	private static final long serialVersionUID = 1L;

	/**
	 * 短信发送内容
	 */
	private String content;
	
	/**
	 * 短信发送手机号
	 */
	private List<String> mobiles;
	
	private String smsType;
	
	private String sendUrl;
	
	private String msgCode;
	
	private String type;
	
	public Sms(String sendUrl,String type, String smsType, String content, String msgCode, List<String> mobiles) {
		this.content = content;
		this.mobiles = mobiles;
		this.sendUrl = sendUrl;
		this.smsType = smsType;
		this.msgCode = msgCode;
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<String> getMobiles() {
		return mobiles;
	}

	public void setMobiles(List<String> mobiles) {
		this.mobiles = mobiles;
	}

	public String getSmsType() {
		return smsType;
	}

	public void setSmsType(String smsType) {
		this.smsType = smsType;
	}

	public String getSendUrl() {
		return sendUrl;
	}

	public void setSendUrl(String sendUrl) {
		this.sendUrl = sendUrl;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getMsgCode() {
		return msgCode;
	}

	public void setMsgCode(String msgCode) {
		this.msgCode = msgCode;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
