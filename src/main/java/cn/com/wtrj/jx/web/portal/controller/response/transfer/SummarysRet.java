package cn.com.wtrj.jx.web.portal.controller.response.transfer;

import java.util.Date;

/**
 * 公文
 * @author qc
 *
 */
public class SummarysRet {

	private String id;//公文ID
	private String title;//公文标题
	private String state;//状态
	private String createDate;//创建时间
	private String sendMember;//公文发起人
	private String url;//打开连接
	private String app;//19发文 20收文 21签报
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getSendMember() {
		return sendMember;
	}
	public void setSendMember(String sendMember) {
		this.sendMember = sendMember;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getApp() {
		return app;
	}
	public void setApp(String app) {
		this.app = app;
	}
	
	
	
	
	
}
