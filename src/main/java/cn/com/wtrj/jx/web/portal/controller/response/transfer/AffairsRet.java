package cn.com.wtrj.jx.web.portal.controller.response.transfer;
/**
 * 事项服务
 * @author qc
 *
 */
public class AffairsRet {

	private String id;//事项Id
	private String subject;//事项标题
	private String state;//状态
	private Long receiveTime; //接收时间
	private String subState;
	
	public String getSubState() {
		return subState;
	}
	public void setSubState(String subState) {
		this.subState = subState;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Long getReceiveTime() {
		return receiveTime;
	}
	public void setReceiveTime(Long receiveTime) {
		this.receiveTime = receiveTime;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	
	
	
}
