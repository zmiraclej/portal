package cn.com.wtrj.jx.web.portal.realm;

import java.io.Serializable;

public class ShiroUser implements Serializable {
	private static final long serialVersionUID = -1748602382963711884L;

	private String mobile;

	private String name;

	private String password;

	private Integer userId;
	/**是否班主任，0-否  1-是*/
	private String blHeadTeacher;;

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
	public String getBlHeadTeacher() {
		return blHeadTeacher;
	}

	public void setBlHeadTeacher(String blHeadTeacher) {
		this.blHeadTeacher = blHeadTeacher;
	}

	@Override
	public String toString() {
		return "ShiroUser [mobile=" + mobile + ", name=" + name + ", password=" + password + ", userId=" + userId
				+ ", blHeadTeacher=" + blHeadTeacher + "]";
	}


}
