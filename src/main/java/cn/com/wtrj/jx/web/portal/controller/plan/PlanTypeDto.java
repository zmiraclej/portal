package cn.com.wtrj.jx.web.portal.controller.plan;

public class PlanTypeDto {

	private String type;
	private String typeName;

	public PlanTypeDto(String type, String typeName) {
		this.type = type;
		this.typeName = typeName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

}
