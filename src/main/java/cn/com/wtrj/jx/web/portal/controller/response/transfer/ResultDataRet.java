package cn.com.wtrj.jx.web.portal.controller.response.transfer;

import java.util.List;

/**
 * OA接口调用时返回对象解析bean
 * 
 * **/
public class ResultDataRet {
	
	private List<AffairsRet> data;
	public List<AffairsRet> getData() {
		return data;
	}
	public void setData(List<AffairsRet> data) {
		this.data = data;
	}	
}
