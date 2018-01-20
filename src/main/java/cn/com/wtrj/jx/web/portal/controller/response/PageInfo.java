package cn.com.wtrj.jx.web.portal.controller.response;

public class PageInfo<T> {
	// 总页数
	private int count;
	// 数据明细
	private T records;
	// 总数据条数
	private int totalCount;
	
	

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public T getRecords() {
		return records;
	}

	public void setRecords(T records) {
		this.records = records;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
