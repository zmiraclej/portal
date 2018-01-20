package cn.com.wtrj.jx.web.portal.controller.request.notice;

public class NoticeCourseSelectParam {
	private String courseCode;
	
	private String couserName;
	
	private Boolean selected;

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}

	public String getCourseCode() {
		return courseCode;
	}

	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}

	public String getCouserName() {
		return couserName;
	}

	public void setCouserName(String couserName) {
		this.couserName = couserName;
	}
}
