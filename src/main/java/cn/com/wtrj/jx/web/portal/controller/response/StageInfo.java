package cn.com.wtrj.jx.web.portal.controller.response;

public class StageInfo {
	private int stageNo;
	private String stageName;

	public int getStageNo() {
		return stageNo;
	}

	public void setStageNo(int stageNo) {
		this.stageNo = stageNo;
	}

	public String getStageName() {
		return stageName;
	}

	public void setStageName(String stageName) {
		this.stageName = stageName;
	}

	public StageInfo(int stageNo) {
		super();
		this.stageNo = stageNo;
	}

	public StageInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "StageInfo [stageNo=" + stageNo + ", stageName=" + stageName + "]";
	}

}
