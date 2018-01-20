package cn.com.wtrj.jx.web.portal.controller.response.setting;

public class RoleSchoolRet {
	
	private String schoolCode;
	
	private String schoolName;
	
	private String roleId;
	
	private Boolean own;

	public String getSchoolCode() {
		return schoolCode;
	}

	public void setSchoolCode(String schoolCode) {
		this.schoolCode = schoolCode;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public Boolean getOwn() {
		return own;
	}

	public void setOwn(Boolean own) {
		this.own = own;
	}
	
}
