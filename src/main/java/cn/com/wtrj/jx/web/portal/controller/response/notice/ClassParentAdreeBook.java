package cn.com.wtrj.jx.web.portal.controller.response.notice;

import java.util.List;

public class ClassParentAdreeBook {
	// 班级姓名
	private String className;
	
	private String schoolCode;
	
	private Integer stage;
	
	private Integer grade;
	
	private Integer classNo;
	
	// 班级家长通讯录
	private List<ParentAddressBook> parents;

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public List<ParentAddressBook> getParents() {
		return parents;
	}

	public void setParents(List<ParentAddressBook> parents) {
		this.parents = parents;
	}

	public String getSchoolCode() {
		return schoolCode;
	}

	public void setSchoolCode(String schoolCode) {
		this.schoolCode = schoolCode;
	}

	public Integer getStage() {
		return stage;
	}

	public void setStage(Integer stage) {
		this.stage = stage;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public Integer getClassNo() {
		return classNo;
	}

	public void setClassNo(Integer classNo) {
		this.classNo = classNo;
	}
}
