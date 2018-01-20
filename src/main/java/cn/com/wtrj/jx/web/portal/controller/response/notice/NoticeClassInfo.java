package cn.com.wtrj.jx.web.portal.controller.response.notice;

import java.util.List;

/*
 * 通知用班级信息
 */
public class NoticeClassInfo {
	private String className;
	
	private Integer classNo;
	
	private Integer classId;
	
	private List<NoticeTeacherInfo> teachers;
	
	private Boolean selected;

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Integer getClassNo() {
		return classNo;
	}

	public void setClassNo(Integer classNo) {
		this.classNo = classNo;
	}

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public List<NoticeTeacherInfo> getTeachers() {
		return teachers;
	}

	public void setTeachers(List<NoticeTeacherInfo> teachers) {
		this.teachers = teachers;
	}

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
	
	
}
