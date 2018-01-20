package cn.com.wtrj.jx.web.portal.controller.response.hr;

import java.util.List;

public class ArchivesTreeRet {
	private String text;
	
	private String value;
	
	private List<ArchivesTreeRet> nodes;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public List<ArchivesTreeRet> getNodes() {
		return nodes;
	}

	public void setNodes(List<ArchivesTreeRet> nodes) {
		this.nodes = nodes;
	}
	
}
