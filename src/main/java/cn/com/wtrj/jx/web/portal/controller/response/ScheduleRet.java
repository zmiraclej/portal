package cn.com.wtrj.jx.web.portal.controller.response;

/**
 * 招生类型基本信息封装实体
 * 
 * @author wuxudong
 *
 */
public class ScheduleRet
{
    /** 招生名称 */
    private String scheduleName;
    /** 招生id */
    private int scheduleId;
    /** 所属学校名称 */
    private String schoolName;
    /** 所属学校id */
    private int schoolId;

    public String getScheduleName()
    {
        return scheduleName;
    }

    public void setScheduleName(String scheduleName)
    {
        this.scheduleName = scheduleName;
    }

    public int getScheduleId()
    {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId)
    {
        this.scheduleId = scheduleId;
    }

    public String getSchoolName()
    {
        return schoolName;
    }

    public void setSchoolName(String schoolName)
    {
        this.schoolName = schoolName;
    }

    public int getSchoolId()
    {
        return schoolId;
    }

    public void setSchoolId(int schoolId)
    {
        this.schoolId = schoolId;
    }

    public ScheduleRet()
    {
        super();
        // TODO Auto-generated constructor stub
    }

    @Override
    public String toString()
    {
        return "ScheduleRet [scheduleName=" + scheduleName + ", scheduleId=" + scheduleId + ", schoolName="
            + schoolName + ", schoolId=" + schoolId + "]";
    }

}
