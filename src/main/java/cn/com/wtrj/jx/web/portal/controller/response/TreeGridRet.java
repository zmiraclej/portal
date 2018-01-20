package cn.com.wtrj.jx.web.portal.controller.response;

import java.util.List;
/**
 * 管理员组织架构管理（增删改查）
 * @author sx
 *
 */
public class TreeGridRet {
	private boolean expanded;
	//部门名称
	private String name;

	//部门的番号
	private String code;
	
	//数据打包
	private List<TreeGridRet> children;
	
	public boolean isExpanded() {
		return expanded;
	}
	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public List<TreeGridRet> getChildren() {
		return children;
	}
	public void setChildren(List<TreeGridRet> children) {
		this.children = children;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
