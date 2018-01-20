package cn.com.wtrj.jx.web.portal.controller.response.notice;

public class ParentNoticeStatus {
	private String studentName;
	
	private String parentName;
	
	private String mobile;
	
	private String wxStatus;
	
	private String shortMsgStatus;

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

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
}
