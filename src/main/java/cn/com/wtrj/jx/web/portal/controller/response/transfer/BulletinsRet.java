package cn.com.wtrj.jx.web.portal.controller.response.transfer;
/**
 * 
 * @author qc
 *	最新公告
 */

public class BulletinsRet {
	private String id;
	private String hrefUrl;//超链接地址
	private Integer spaceType;
	private String newsId;//公告所在版块的id
	private String title;//标题
	private String brief;//公告摘要
	private Long publishDate;
	private String publishDeptName;
	
	
	public String getPublishDeptName() {
		return publishDeptName;
	}
	public void setPublishDeptName(String publishDeptName) {
		this.publishDeptName = publishDeptName;
	}
	public String getBrief() {
		return brief;
	}
	public void setBrief(String brief) {
		this.brief = brief;
	}
	public Long getPublishDate() {
		return publishDate;
	}
	public void setPublishDate(Long publishDate) {
		this.publishDate = publishDate;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getHrefUrl() {
		return hrefUrl;
	}
	public void setHrefUrl(String hrefUrl) {
		this.hrefUrl = hrefUrl;
	}
	public Integer getSpaceType() {
		return spaceType;
	}
	public void setSpaceType(Integer spaceType) {
		this.spaceType = spaceType;
	}
	public String getNewsId() {
		return newsId;
	}
	public void setNewsId(String newsId) {
		this.newsId = newsId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	
	
	
}
