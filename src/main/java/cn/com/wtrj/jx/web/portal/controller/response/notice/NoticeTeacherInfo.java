package cn.com.wtrj.jx.web.portal.controller.response.notice;

/**
 * 通知用教师信息
 * @author wusm
 *
 */
public class NoticeTeacherInfo {
	private String name;
	
	private String jobNo;
	
	private String mobile;
	
	private Boolean selected;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getJobNo() {
		return jobNo;
	}

	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
}
