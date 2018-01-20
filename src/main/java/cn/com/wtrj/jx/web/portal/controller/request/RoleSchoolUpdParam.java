package cn.com.wtrj.jx.web.portal.controller.request;

import java.io.Serializable;
import java.util.List;

public class RoleSchoolUpdParam  implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<String> schoolCodes;
	
	private String roleId;

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public List<String> getSchoolCodes() {
		return schoolCodes;
	}

	public void setSchoolCodes(List<String> schoolCodes) {
		this.schoolCodes = schoolCodes;
	}

}
