package cn.com.wtrj.jx.web.portal.controller.request.base;

public class PageSearchParam {
	// 模糊检索条件
	private String search;
	// 排序列
	private String sort;
	// 起始位置
	private Integer offset = 0;
	// 检索条数
	private Integer limit = 30;
	
	// page从1开始
	private Integer page = 1;
	/** 检索条数 **/
	private Integer pageSize = 5;
	/**
	 * 排序方法：ASC/DESC
	 */
	private String order;

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public Integer getOffset() {
		return offset;
	}

	public void setOffset(Integer offset) {
		this.offset = offset;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	
	public int getStart() {

		int start = ((page - 1) * pageSize)+1;
		return start;
	}

	public int getEnd() {
		int end = (page) * pageSize;
		return end;
	}

}
