package cn.com.wtrj.jx.web.portal.controller.request;

import java.io.Serializable;
import java.util.List;

public class RoleMenuUpdParam  implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<String> menus;
	
	private String roleId;

	public List<String> getMenus() {
		return menus;
	}

	public void setMenus(List<String> menus) {
		this.menus = menus;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

}
