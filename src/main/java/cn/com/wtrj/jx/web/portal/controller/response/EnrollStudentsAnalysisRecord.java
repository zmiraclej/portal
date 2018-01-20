package cn.com.wtrj.jx.web.portal.controller.response;

/**
 * 校区某年度录取情况统计实体
 * @author wuxudong
 *
 */
public class EnrollStudentsAnalysisRecord {
	/**学校ID*/
	int schoolId;
	/**学校名称*/
	String schoolName;
	/**报名总人数*/
	int totalApply;
	/**测试总人数*/
	int totalTest;
	/**录取总人数*/
	int totalAdmit;
	
	public int getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public int getTotalApply() {
		return totalApply;
	}
	public void setTotalApply(int totalApply) {
		this.totalApply = totalApply;
	}
	public int getTotalTest() {
		return totalTest;
	}
	public void setTotalTest(int totalTest) {
		this.totalTest = totalTest;
	}
	public int getTotalAdmit() {
		return totalAdmit;
	}
	public void setTotalAdmit(int totalAdmit) {
		this.totalAdmit = totalAdmit;
	}
	public EnrollStudentsAnalysisRecord() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "EnrollStudentsAnalysisRecord [schoolId=" + schoolId + ", schoolName=" + schoolName + ", totalApply="
				+ totalApply + ", totalTest=" + totalTest + ", totalAdmit=" + totalAdmit + "]";
	}
	
}
