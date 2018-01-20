package cn.com.wtrj.jx.web.portal.controller.request.zs;

public class ZsStudentPlaceQueryParam {
	
	private String schoolCode;
	
	private String zsGrade;
	
	private Integer year;
	

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

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}
}
