package cn.com.wtrj.jx.web.portal.controller.response.report;

public class UserNcOrgInfoRet {
	// 板块数
	private Integer segementNum;
	
	// 公司数
	private Integer orgNum;
	
	private String segementName;
	
	private String orgName;
	
	private String orgNickName;

	public Integer getSegementNum() {
		return segementNum;
	}

	public void setSegementNum(Integer segementNum) {
		this.segementNum = segementNum;
	}

	public Integer getOrgNum() {
		return orgNum;
	}

	public void setOrgNum(Integer orgNum) {
		this.orgNum = orgNum;
	}

	public String getSegementName() {
		return segementName;
	}

	public void setSegementName(String segementName) {
		this.segementName = segementName;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOrgNickName() {
		return orgNickName;
	}

	public void setOrgNickName(String orgNickName) {
		this.orgNickName = orgNickName;
	}
}
