package cn.com.wtrj.jx.web.portal.controller.response.notice;

import java.util.List;

/**
 * 通知用年级信息
 * 
 * @author wusm
 *
 */
public class NoticeGradeInfo {
	private String gradeName;
	
	private Integer grade;
	
	private List<NoticeClassInfo> classes;
	
	private Boolean selected;

	public String getGradeName() {
		return gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public List<NoticeClassInfo> getClasses() {
		return classes;
	}

	public void setClasses(List<NoticeClassInfo> classes) {
		this.classes = classes;
	}

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
	
}
