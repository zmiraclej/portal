package cn.com.wtrj.jx.web.portal.controller.request;

import java.io.Serializable;

public class RoleDeleteParam  implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String roleId;

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

}
