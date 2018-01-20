package cn.com.wtrj.jx.web.portal.controller.request;

import java.io.Serializable;
import java.util.List;

import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleRptIndexDto;

public class RoleRptIndexUpdParam implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<MtRoleRptIndexDto> indexes;

	private String roleId;

	public List<MtRoleRptIndexDto> getIndexes() {
		return indexes;
	}

	public void setIndexes(List<MtRoleRptIndexDto> indexes) {
		this.indexes = indexes;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

}
