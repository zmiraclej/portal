package cn.com.wtrj.jx.web.portal.controller.response.notice;

import java.util.List;

public class TeacherNotice {
	private Integer month;
	
	private List<Notice> notices;

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public List<Notice> getNotices() {
		return notices;
	}

	public void setNotices(List<Notice> notices) {
		this.notices = notices;
	}
	
}
