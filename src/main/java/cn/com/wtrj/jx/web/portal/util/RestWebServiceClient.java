package cn.com.wtrj.jx.web.portal.util;

import com.seeyon.client.CTPRestClient;
import com.seeyon.client.CTPServiceClientManager;

public class RestWebServiceClient {

	// 定义REST动态客户机
	private static CTPRestClient client = null;
	/**
	 * 
	 * @param userName REST用户登录名
	 * @param password REST用户密码
	 * @param url 服务主机地址，包含{协议}{Ip}:{端口}，如http://127.0.0.1:8088
	 * @return
	 */
	public static CTPRestClient getCTPRestClient(String userName,String password,String url) {
		CTPServiceClientManager clientManager = CTPServiceClientManager.getInstance(url);
		client = clientManager.getRestClient();
		client.authenticate(userName, password); 
		return client;
	}
	
	//测试新闻列表（指定单位）接口
	public static void main(String[] args) {
		String loginName = "casuser";
		/*String unitId = "670869647114347";
		CTPRestClient restClient = RestWebServiceClient.getCTPRestClient("test", "123123", "http://oa.jxfls.com:8088");
		String content = restClient.get("news/unit/"+unitId+"?ticket="+loginName, String.class);
		*/
		
		
		
		CTPRestClient restClient = RestWebServiceClient.getCTPRestClient("test", "123123", "http://oa.cdwtrj.com:8088");
		String content = restClient.get("affairs/track?ticket="+loginName, String.class);
		
		/*CTPRestClient restClient = RestWebServiceClient.getCTPRestClient("test", "123123", "http://oa.jxfls.com:8088");
		String content = restClient.get("orgMember/?loginName="+loginName, String.class);
		*/
		
		System.out.println(content);
	}
	
}
