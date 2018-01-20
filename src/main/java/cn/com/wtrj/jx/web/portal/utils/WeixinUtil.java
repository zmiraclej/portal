package cn.com.wtrj.jx.web.portal.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import cn.com.wtrj.jx.web.portal.util.HttpRequestUtils;
import me.chanjar.weixin.cp.api.WxCpService;
import me.chanjar.weixin.cp.api.impl.WxCpServiceImpl;
import me.chanjar.weixin.cp.config.WxCpConfigStorage;
import me.chanjar.weixin.cp.config.WxCpInMemoryConfigStorage;
import net.sf.json.JSONObject;


public class WeixinUtil {
	
	/**
	 * 将授权用户的userid转化为openid
	 * @param accessToken 调用接口凭证
	 * @param userId 用户id
	 * @return 
	 */
	public static JsonObject convertUseridToOpenid(String accessToken,String userId){
		String url="https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_openid?access_token="+accessToken;
		JsonObject obj=new JsonObject();
		obj.addProperty("userid", userId);
		return HttpRequestUtils.httpPost(url,obj);
	}
	
	
	/**
	 * 根据code获取成员信息
	 * @param token 调用接口凭证 
	 * @param code 通过成员授权获取到的code，每次成员授权带上的code将不一样，code只能使用一次，10分钟未被使用自动过期 
	 * @return
	 */
	public static JsonObject getUserInfo(String token, String code) {

		String getUser = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=" + token + "&code=" + code;

		JsonObject userResult = HttpRequestUtils.httpGet(getUser);

		return userResult;
	}
	
	/**
	 * 获取接口调用凭证
	 * @param appid
	 * @param secret
	 * @return
	 */
	public static String getToken(String appid, String secret) {
		String aturl = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" + appid + "&corpsecret=" + secret;

		JsonObject jo = HttpRequestUtils.httpGet(aturl);

		return jo.get("access_token").getAsString();
	}

	public static JsonObject getUserInfoByUserId(String token, String userId) {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=" + token + "&userid=" + userId;

		JsonObject jo = HttpRequestUtils.httpGet(url);
		return jo;
	}
	
//	public static JsonObject createUser(String token, String userId, String mobile, List<String> departmentIds){
//		String url = "https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=" + token;
//		
//		JsonObject jsonParam = new JsonObject();
//		jsonParam.addProperty("useId", userId);
//		jsonParam.addProperty("mobile", mobile);
//		JsonArray element = new JsonArray();
//		for (String dept : departmentIds) {
//			
//		}
//		element.add(2L);
//		userInfo.add("department", element);
//		jsonParam.addProperty("department", departmentIds.toArray());
//		HttpRequestUtils.httpPost(url, jsonParam );
//		
//	}

	public static JsonObject sendWeiXinMessage(String token, JsonObject jsonParam) {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + token;
		return HttpRequestUtils.httpPost(url, jsonParam);
	}

	public static WxCpService getWxCpService(String appid,String secret) {
		WxCpInMemoryConfigStorage config = new WxCpInMemoryConfigStorage();
        config.setCorpId(appid);      // 设置微信企业号的appid
        config.setCorpSecret(secret);  // 设置微信企业号的app corpSecret
        WxCpService wxCpService = new WxCpServiceImpl();
        wxCpService.setWxCpConfigStorage((WxCpConfigStorage)(config));
        return wxCpService;
	}
	
	
	/** 
     * 上传多媒体文件 到微信临时素材库
     * @param access_token 
     * @param type 图片（image）、语音（voice）、视频（video）和缩略图（thumb） 
     * 图片（image）: 1M，支持JPG格式 
     * 语音（voice）：2M，播放长度不超过60s，支持AMR\MP3\SPEEX格式 
     * 视频（video）：10MB，支持MP4格式 
     * 缩略图（thumb）：64KB，支持JPG格式 
     * @param fileUrl 
     * @return 
     * @throws IOException 
     */  
    @SuppressWarnings("deprecation")  
    public static String uploadMedia(String access_token, String type,  
            String fileUrl) throws IOException {  
        String media_id = null;  
        CloseableHttpResponse response = null;  
        String url = "https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token="  
                + access_token + "&type=" + type;  
        CloseableHttpClient httpclient = null;  
        httpclient = HttpClients.createDefault();  
        HttpPost httpPost = new HttpPost(url);  
        FileBody bin = new FileBody(new File(fileUrl));  
        MultipartEntity mpEntity = new MultipartEntity(); // 文件传输  
        mpEntity.addPart("media", bin);  
        httpPost.setEntity(mpEntity);  
        try {  
            response = httpclient.execute(httpPost);  
            int statusCode = response.getStatusLine().getStatusCode();  
            if (statusCode == HttpStatus.SC_OK) {  
                HttpEntity entity = response.getEntity();  
                String jsonString = EntityUtils.toString(entity);  
                JSONObject fromObject = JSONObject.fromObject(jsonString);  
                Object media_idObject = fromObject.get("media_id");  
                if (media_idObject != null) {  
                    media_id = media_idObject.toString();  
                } else {  
                    System.out.println(fromObject.toString());  
                }  
            }  
        } catch (ClientProtocolException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
            if(response != null){  
                response.close();  
            }  
            if(httpclient!= null){  
                httpclient.close();  
            }  
        }  
        return media_id;  
    }
    
    /**
     * 获取用户信息
     * 
     * @param appId
     * @param secret
     * @param wxUserId
     * @param mobile
     * @return
     */
    public static JsonObject getUserInfo(String appId, String secret, String wxUserId){
		String aturl = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid="+appId+"&corpsecret="+secret;
		
		JsonObject jo = HttpRequestUtils.httpGet(aturl);
		
		String url = "https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=" + jo.get("access_token").getAsString() + "&userid=" + wxUserId;

		JsonObject rst = HttpRequestUtils.httpGet(url);
		return rst;
	}
    
    /**
	 * 更改用户手机号
	 * 
	 * @param wxUserId
	 * @param mobile
	 * @return
	 */
	public static JsonObject changeUserMobileInfo(String appId, String secret, String wxUserId, String mobile){
		String aturl = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid="+appId+"&corpsecret="+secret;
		
		JsonObject jo = HttpRequestUtils.httpGet(aturl);
		
		String changeUser = "https://qyapi.weixin.qq.com/cgi-bin/user/update?access_token="+jo.get("access_token").getAsString();
		JsonObject userInfo = new JsonObject();
		userInfo.addProperty("userid", wxUserId);
		userInfo.addProperty("mobile", mobile);
		
		JsonObject changeResult = HttpRequestUtils.httpPost(changeUser, userInfo);
		return changeResult;
	}
	
	/**
	 * 创建用户
	 * @param name
	 * @param wxUserId
	 * @param mobile
	 * @param weixinid
	 * @return
	 */
	public static JsonObject createUser(String appId, String secret, String name,String wxUserId, String mobile, Long departmentId){
		String aturl = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid="+appId+"&corpsecret="+secret;
		
		JsonObject jo = HttpRequestUtils.httpGet(aturl);
		
		String getUser = "https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token="+jo.get("access_token").getAsString() + "&userid="+wxUserId;
		JsonObject userResult = HttpRequestUtils.httpGet(getUser);
		if("60111".equals(userResult.get("errcode").getAsString())){
			String changeUser = "https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token="+jo.get("access_token").getAsString();
			JsonObject userInfo = new JsonObject();
			userInfo.addProperty("userid", wxUserId);
			userInfo.addProperty("mobile", mobile);
			userInfo.addProperty("name", name);
			JsonArray element = new JsonArray();
			element.add(departmentId);
			userInfo.add("department", element);
			
			JsonObject changeResult = HttpRequestUtils.httpPost(changeUser, userInfo);
			return changeResult;
		}
		return null;
	}
}
