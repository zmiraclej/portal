package cn.com.wtrj.jx.web.portal.controller.response.setting;

import java.util.List;
import java.util.Map;

public class RoleMenuTreeRet {
	private String text;
	
	private String value;
	
	private Boolean own;
	
	private Map<String,Boolean> state;
	
	private List<RoleMenuTreeRet> nodes;

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

	public List<RoleMenuTreeRet> getNodes() {
		return nodes;
	}

	public void setNodes(List<RoleMenuTreeRet> nodes) {
		this.nodes = nodes;
	}

	public Boolean getOwn() {
		return own;
	}

	public void setOwn(Boolean own) {
		this.own = own;
	}

	public Map<String, Boolean> getState() {
		return state;
	}

	public void setState(Map<String, Boolean> state) {
		this.state = state;
	}
	
}
