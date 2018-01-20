package cn.com.wtrj.jx.web.portal.controller.response;

/**
 * 生源封装实体
 * 
 * @author wuxudong
 *
 */
public class SourcePlaceInfo {
	/** 录取人数 */
	private int luquNum;

	/** 招生计划名称 */
	private String scheduleName;

	/** 省份 */
	private String provice;

	/** 招生计划ID */
	private int scheduleId;

	/** 学校名称 */
	private String schoolName;

	/** 城市 */
	private String city;

	/** 学校id */
	private int schoolId;

	/** 招生类别 */
	private String zsGrade;

	/** 省市完整名 */
	private String fullName;

	public SourcePlaceInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getLuquNum() {
		return luquNum;
	}

	public void setLuquNum(int luquNum) {
		this.luquNum = luquNum;
	}

	public String getScheduleName() {
		return scheduleName;
	}

	public void setScheduleName(String scheduleName) {
		this.scheduleName = scheduleName;
	}

	public String getProvice() {
		return provice;
	}

	public void setProvice(String provice) {
		this.provice = provice;
	}

	public int getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(int scheduleId) {
		this.scheduleId = scheduleId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}

	public String getZsGrade() {
		return zsGrade;
	}

	public void setZsGrade(String zsGrade) {
		this.zsGrade = zsGrade;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	@Override
	public String toString() {
		return "SourcePlaceRet [luquNum=" + luquNum + ", scheduleName=" + scheduleName + ", provice=" + provice
				+ ", scheduleId=" + scheduleId + ", schoolName=" + schoolName + ", city=" + city + ", schoolId="
				+ schoolId + ", zsGrade=" + zsGrade + ", fullName=" + fullName + "]";
	}

}
