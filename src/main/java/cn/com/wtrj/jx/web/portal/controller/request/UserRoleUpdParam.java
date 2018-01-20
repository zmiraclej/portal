package cn.com.wtrj.jx.web.portal.controller.request;

import java.io.Serializable;
import java.util.List;

public class UserRoleUpdParam  implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<String> roles;
	
	private Integer userId;

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}
