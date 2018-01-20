package cn.com.wtrj.jx.web.portal.controller.response;

public class BaseRet<T> {
	
	// 
	private String code;
	
	//
	private String msg;	
	
	//
	private T data;


	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
