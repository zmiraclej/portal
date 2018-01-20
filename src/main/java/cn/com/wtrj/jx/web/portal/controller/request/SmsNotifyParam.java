package cn.com.wtrj.jx.web.portal.controller.request;

/**
 * 消息发送回调参数
 * 
 * @author wusm
 *
 */
public class SmsNotifyParam {
	// 消息ID
	private String messageId;

	// 接收人
	private String toUser;

	// 平台原始发送结果
	private String messageResult;

	// 发送状态
	private String sendState;

	public String getToUser() {
		return toUser;
	}

	public void setToUser(String toUser) {
		this.toUser = toUser;
	}

	public String getMessageResult() {
		return messageResult;
	}

	public void setMessageResult(String messageResult) {
		this.messageResult = messageResult;
	}

	public String getSendState() {
		return sendState;
	}

	public void setSendState(String sendState) {
		this.sendState = sendState;
	}

	public String getMessageId() {
		return messageId;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}
}
