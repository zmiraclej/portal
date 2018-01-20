package cn.com.wtrj.jx.web.portal.controller.response.notice;

import java.io.Serializable;

public class ClassInfo extends GradeInfo implements Serializable{
	private static final long serialVersionUID = 1L;

	private Integer classNo;
	
    private String classKeyNo;

	public Integer getClassNo() {
		return classNo;
	}

	public void setClassNo(Integer classNo) {
		this.classNo = classNo;
	}

	public String getClassKeyNo() {
		return classKeyNo;
	}

	public void setClassKeyNo(String classKeyNo) {
		this.classKeyNo = classKeyNo;
	}
	
	
}
