package cn.com.wtrj.jx.web.portal.controller.response.notice;

public class NoticeStatus {
	private String teacherName;
	
	private String mobile;
	
	private String wxStatus;
	
	private String shortMsgStatus;

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getWxStatus() {
		return wxStatus;
	}

	public void setWxStatus(String wxStatus) {
		this.wxStatus = wxStatus;
	}

	public String getShortMsgStatus() {
		return shortMsgStatus;
	}

	public void setShortMsgStatus(String shortMsgStatus) {
		this.shortMsgStatus = shortMsgStatus;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
}
