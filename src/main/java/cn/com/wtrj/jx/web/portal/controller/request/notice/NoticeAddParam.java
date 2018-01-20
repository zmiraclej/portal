package cn.com.wtrj.jx.web.portal.controller.request.notice;

import java.io.Serializable;
import java.util.List;

public class NoticeAddParam implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private String title;
	
	private String content;
	
	private List<String> files;
	
	private String psId;
	
	private boolean sendMessageFlg;
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<String> getFiles() {
		return files;
	}

	public void setFiles(List<String> files) {
		this.files = files;
	}

	public String getPsId() {
		return psId;
	}

	public void setPsId(String psId) {
		this.psId = psId;
	}

	public boolean isSendMessageFlg() {
		return sendMessageFlg;
	}

	public void setSendMessageFlg(boolean sendMessageFlg) {
		this.sendMessageFlg = sendMessageFlg;
	}
	
}
