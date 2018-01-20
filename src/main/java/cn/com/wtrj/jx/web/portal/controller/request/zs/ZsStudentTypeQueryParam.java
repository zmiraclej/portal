package cn.com.wtrj.jx.web.portal.controller.request.zs;

public class ZsStudentTypeQueryParam {
	
	private String schoolCode;
	
	private String zsGrade;
	
	private String beginDate;
	
	private String endDate;

	public String getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getZsGrade() {
		return zsGrade;
	}

	public void setZsGrade(String zsGrade) {
		this.zsGrade = zsGrade;
	}

	public String getSchoolCode() {
		return schoolCode;
	}

	public void setSchoolCode(String schoolCode) {
		this.schoolCode = schoolCode;
	}
}
