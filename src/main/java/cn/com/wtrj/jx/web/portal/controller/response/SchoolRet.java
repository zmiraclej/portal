package cn.com.wtrj.jx.web.portal.controller.response;

public class SchoolRet
{
    private String schoolCode;
    
    /** 学校名称 */
    private String schoolName;

    public String getSchoolName()
    {
        return schoolName;
    }

    public void setSchoolName(String schoolName)
    {
        this.schoolName = schoolName;
    }

	public String getSchoolCode() {
		return schoolCode;
	}

	public void setSchoolCode(String schoolCode) {
		this.schoolCode = schoolCode;
	}

}
