package cn.com.wtrj.jx.web.portal.controller.response.setting;

public class RoleNcOrgRet {
	
	private String orgCode;
	
	private String orgName;
	
	private String orgNickName;
	
	private String segementCode;
	
	private String segementName;
	
	private Boolean own;
	
	public Boolean getOwn() {
		return own;
	}

	public void setOwn(Boolean own) {
		this.own = own;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getSegementCode() {
		return segementCode;
	}

	public void setSegementCode(String segementCode) {
		this.segementCode = segementCode;
	}

	public String getSegementName() {
		return segementName;
	}

	public void setSegementName(String segementName) {
		this.segementName = segementName;
	}

	public String getOrgNickName() {
		return orgNickName;
	}

	public void setOrgNickName(String orgNickName) {
		this.orgNickName = orgNickName;
	}

}
