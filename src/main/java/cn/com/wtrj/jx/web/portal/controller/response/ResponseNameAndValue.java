package cn.com.wtrj.jx.web.portal.controller.response;

import java.util.ArrayList;
import java.util.List;
/**
 * controller中ajax返回值组合实体类
 * @author zhangbin
 *
 */
public class ResponseNameAndValue {

	int year;

	// 放置值
	private List<Double> valueList;
	// 放置值的名称
	private List<String> nameList;
	
	private List<Double> maoliList;
	
	public ResponseNameAndValue() {
		this.valueList = new ArrayList<>();
		this.nameList = new ArrayList<>();
		this.maoliList = new ArrayList<>();
	}
	
	public List<Double> getMaoliList() {
		return maoliList;
	}
	public void setMaoliList(List<Double> maoliList) {
		this.maoliList = maoliList;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public List<Double> getValueList() {
		return valueList;
	}

	public void setValueList(List<Double> valueList) {
		this.valueList = valueList;
	}

	public List<String> getNameList() {
		return nameList;
	}

	public void setNameList(List<String> nameList) {
		this.nameList = nameList;
	}

	@Override
	public String toString() {
		return "ResponseProfit [year=" + year + ", valueList=" + valueList + ", nameList=" + nameList + "]";
	}

	
	
}
