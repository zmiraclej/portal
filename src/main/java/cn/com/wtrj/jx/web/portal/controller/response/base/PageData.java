package cn.com.wtrj.jx.web.portal.controller.response.base;


public class PageData<T> {
	
	private Integer total;
	
	private T rows;
	protected int pageNo = 1;
	protected int pageSize = -1;
	protected int totalCount = -1;
	
	
	
	
	public PageData() {
		super();
	}
	public PageData(int pageNo, int pageSize) {
		setPageNo(pageNo);
		this.pageSize = pageSize;
	}
	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
		if (pageNo < 1) {
			this.pageNo = 1;
		}
	}
	public PageData<T> pageNo(final int thePageNo) {
		setPageNo(thePageNo);
		return this;
	}
	
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public PageData<T> pageSize(final int thePageSize) {
		setPageSize(thePageSize);
		return this;
	}
	public int getFirst() {
		return ((pageNo - 1) * pageSize) + 1;
	}

	public int getMax() {
		return ((pageNo - 1) * pageSize) + totalCount;
	}
	
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getTotalPages() {
		if (totalCount < 0) {
			return -1;
		}

		int count = totalCount / pageSize;
		if (totalCount % pageSize > 0) {
			count++;
		}
		return count;
	}
	
	public boolean isHasNext() {
		return (pageNo + 1 <= getTotalPages());
	}

	public int getNextPage() {
		if (isHasNext()) {
			return pageNo + 1;
		} else {
			return pageNo;
		}
	}

	public boolean isHasPre() {
		return (pageNo - 1 >= 1);
	}

	public int getPrePage() {
		if (isHasPre()) {
			return pageNo - 1;
		} else {
			return pageNo;
		}
	}
	
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public T getRows() {
		return rows;
	}
	public void setRows(T rows) {
		this.rows = rows;
	}
	
}
