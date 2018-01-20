package cn.com.wtrj.jx.web.portal.controller.request;

import java.io.Serializable;

public class UserDeleteParam  implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8266402828459332001L;
		
	private Integer userId;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
}	
