package cn.com.wtrj.jx.web.portal.controller.response;

/**
 * 学校基本信息封装实体（仅含ID、名称）
 * 
 * @author wuxudong
 *
 */
public class SchoolInfoSimpleRet
{
    /** 学校ID */
    private int schoolId;
    /** 学校名称 */
    private String schoolName;

    public int getSchoolId()
    {
        return schoolId;
    }

    public void setSchoolId(int schoolId)
    {
        this.schoolId = schoolId;
    }

    public String getSchoolName()
    {
        return schoolName;
    }

    public void setSchoolName(String schoolName)
    {
        this.schoolName = schoolName;
    }

    public SchoolInfoSimpleRet()
    {
        super();
        // TODO Auto-generated constructor stub
    }

    public SchoolInfoSimpleRet(int schoolId, String schoolName)
    {
        super();
        this.schoolId = schoolId;
        this.schoolName = schoolName;
    }

    @Override
    public String toString()
    {
        return "SchoolInfoSimpleRet [schoolId=" + schoolId + ", schoolName=" + schoolName + "]";
    }

}
