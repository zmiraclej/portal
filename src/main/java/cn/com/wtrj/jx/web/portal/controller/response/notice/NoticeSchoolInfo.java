package cn.com.wtrj.jx.web.portal.controller.response.notice;

import java.util.List;

/**
 * 通知用学校信息
 * @author wusm
 *
 */
public class NoticeSchoolInfo {
	private String schoolCode;
	
	private String schoolName;
	
	private Integer stage;
	
	private String stageName;
	
	private List<NoticeGradeInfo> grades;
	
	private Boolean selected;

	public String getSchoolCode() {
		return schoolCode;
	}

	public void setSchoolCode(String schoolCode) {
		this.schoolCode = schoolCode;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public Integer getStage() {
		return stage;
	}

	public void setStage(Integer stage) {
		this.stage = stage;
	}

	public String getStageName() {
		return stageName;
	}

	public void setStageName(String stageName) {
		this.stageName = stageName;
	}

	public List<NoticeGradeInfo> getGrades() {
		return grades;
	}

	public void setGrades(List<NoticeGradeInfo> grades) {
		this.grades = grades;
	}

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
	
	
	
}
