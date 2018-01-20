package cn.com.wtrj.jx.web.portal.util;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class HttpRequestUtil {
    private static Logger logger = LoggerFactory
            .getLogger(HttpRequestUtil.class); // 日志记录

    /**
     * httpPost
     *
     * @param url
     *            路径
     * @param jsonParam
     *            参数
     * @return
     */
    public static JsonObject httpPost(String url, JsonObject jsonParam) {
        return httpPost(url, jsonParam, false);
    }

    /**
     * post请求
     *
     * @param url
     *            url地址
     * @param jsonParam
     *            参数
     * @param noNeedResponse
     *            不需要返回结果
     * @return
     */
    public static JsonObject httpPost(String url, JsonObject jsonParam,
            boolean noNeedResponse) {
    	JsonObject jsonResult = null;

        // 创建HttpClientBuilder
        HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
        // HttpClient
        CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
        try {

            HttpPost httpPost = new HttpPost(url);

            if (null != jsonParam) {
                // 解决中文乱码问题
                StringEntity entity = new StringEntity(jsonParam.toString(),
                        "utf-8");
                entity.setContentEncoding("UTF-8");
                entity.setContentType("application/json");
                httpPost.setEntity(entity);
            }
            HttpResponse result = closeableHttpClient.execute(httpPost);
            /** 请求发送成功，并得到响应 **/
            if (result.getStatusLine().getStatusCode() == 200) {
                String str = "";
                try {
                    /** 读取服务器返回过来的json字符串数据 **/
                    str = EntityUtils.toString(result.getEntity());
                    if (noNeedResponse) {
                        return null;
                    }
                    /** 把json字符串转换成json对象 **/
                    jsonResult = 
                            new JsonParser().parse(str).getAsJsonObject();
                } catch (Exception e) {
                    logger.error("post请求提交失败:" + url, e);
                }
            }

        } catch (IOException e) {
            logger.error("post请求提交失败:" + url, e);
        } finally {
            try {
                // 关闭流并释放资源
                closeableHttpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return jsonResult;
    }

    /**
     * 发送get请求
     *
     * @param url
     *            路径
     * @return
     */
    public static JsonObject httpGet(String url) {
        // get请求返回结果
    	JsonObject jsonResult = null;

        // 创建HttpClientBuilder
        HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
        // HttpClient
        CloseableHttpClient closeableHttpClient = httpClientBuilder.build();

        try {

            HttpGet httpGet = new HttpGet(url);

            // 执行get请求
            HttpResponse httpResponse = closeableHttpClient.execute(httpGet);
            // 获取响应消息实体
            HttpEntity entity = httpResponse.getEntity();
            // 判断响应实体是否为空
            if (entity != null) {
                /** 把json字符串转换成json对象 **/
                jsonResult = 
                new JsonParser().parse(EntityUtils.toString(entity)).getAsJsonObject();  

            }
        } catch (IOException e) {
            logger.error("get请求提交失败:" + url, e);
        } finally {
            try {
                // 关闭流并释放资源
                closeableHttpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return jsonResult;
    }
    
    public static JsonArray httpGetArray(String url) {
        // get请求返回结果
    	JsonArray jsonResult = null;

        // 创建HttpClientBuilder
        HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
        // HttpClient
        CloseableHttpClient closeableHttpClient = httpClientBuilder.build();

        try {

            HttpGet httpGet = new HttpGet(url);

            // 执行get请求
            HttpResponse httpResponse = closeableHttpClient.execute(httpGet);
            // 获取响应消息实体
            HttpEntity entity = httpResponse.getEntity();
            // 判断响应实体是否为空
            if (entity != null) {
                /** 把json字符串转换成json对象 **/
                jsonResult = 
                new JsonParser().parse(EntityUtils.toString(entity)).getAsJsonArray();  

            }
        } catch (IOException e) {
            logger.error("get请求提交失败:" + url, e);
        } finally {
            try {
                // 关闭流并释放资源
                closeableHttpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return jsonResult;
    }
    
    /**
     * 发送get请求
     *
     * @param url
     *            路径
     * @return 字符串
     */
    public static String httpGetToStr(String url) {
        // get请求返回结果
    	String result = "";

        // 创建HttpClientBuilder
        HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
        // HttpClient
        CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
        try {
            HttpGet httpGet = new HttpGet(url);
            // 执行get请求
            HttpResponse httpResponse = closeableHttpClient.execute(httpGet);
            // 获取响应消息实体
            HttpEntity entity = httpResponse.getEntity();
            // 判断响应实体是否为空
            if (entity != null) {
                result=EntityUtils.toString(entity);

            }
        } catch (IOException e) {
            logger.error("get请求提交失败:" + url, e);
        } finally {
            try {
                // 关闭流并释放资源
                closeableHttpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}
