package cn.com.wtrj.jx.web.portal.controller.request;

import java.io.Serializable;

public class UserUpdParam  implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8266402828459332001L;
	
	private String password;
	
	private String userName;
	
	private Integer userId;
	
	private String tel;

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}
