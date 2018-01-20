package cn.com.wtrj.jx.web.portal.controller.response;

/**
 * 生源地统计封装实体，用于页面数据展示
 * 
 * @author wuxudong
 *
 */
public class SourcePlaceRet {

	/** 生源地全名 （直辖市直接为市名，非直辖市为省名+市名） */
	private String fullName;
	/** 录取人数 */
	private int luquNum;

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public int getLuquNum() {
		return luquNum;
	}

	public void setLuquNum(int luquNum) {
		this.luquNum = luquNum;
	}

	public SourcePlaceRet() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "SourcePlaceRet [fullName=" + fullName + ", luquNum=" + luquNum + "]";
	}

}
