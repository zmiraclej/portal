package cn.com.wtrj.jx.web.portal.controller.response.transfer;

import java.util.Date;

/**
 * 
 * @author qc
 *	新闻
 */

public class NewsDatasRet {
	private String id;
	private String title;//标题
	private String brief;//摘要
	private String typeId;
	private String typeName;//新闻类型  （行业新闻、单位新闻、图片新闻）
	private boolean imageNews;//是否为图片新闻
	private String imgUrl;
	private String hrefUrl;
	private Integer spaceType;
	private String newsId;
	private Long publishDate;
	private String publishDepartmentName;
	
	public Long getPublishDate() {
		return publishDate;
	}
	public void setPublishDate(Long publishDate) {
		this.publishDate = publishDate;
	}
	public String getPublishDepartmentName() {
		return publishDepartmentName;
	}
	public void setPublishDepartmentName(String publishDepartmentName) {
		this.publishDepartmentName = publishDepartmentName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getBrief() {
		return brief;
	}
	public void setBrief(String brief) {
		this.brief = brief;
	}
	public String getTypeId() {
		return typeId;
	}
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public boolean isImageNews() {
		return imageNews;
	}
	public void setImageNews(boolean imageNews) {
		this.imageNews = imageNews;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
	this.imgUrl = imgUrl;
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
/*	public Date getPublishDate() {
		return publishDate;
	}
	public void setPublishDate(Date publishDate) {
		this.publishDate = publishDate;
	}*/
	
	
	
	
	
	
	
	
}
