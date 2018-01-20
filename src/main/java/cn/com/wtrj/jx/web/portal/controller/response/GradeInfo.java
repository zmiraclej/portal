package cn.com.wtrj.jx.web.portal.controller.response;

public class GradeInfo {
	private int gradeNo;
	private String gradeName;

	public int getGradeNo() {
		return gradeNo;
	}

	public void setGradeNo(int gradeNo) {
		this.gradeNo = gradeNo;
	}

	public String getGradeName() {
		return gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}

	public GradeInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public GradeInfo(int gradeNo) {
		super();
		this.gradeNo = gradeNo;
	}

	@Override
	public String toString() {
		return "GradeInfo [gradeNo=" + gradeNo + ", gradeName=" + gradeName + "]";
	}

}
