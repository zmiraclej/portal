package cn.com.wtrj.jx.web.portal.controller.response.setting;

public class RoleMenusRet {
	private String id;
	
	private String name;
	
	private Boolean own;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Boolean getOwn() {
		return own;
	}

	public void setOwn(Boolean own) {
		this.own = own;
	}

}
