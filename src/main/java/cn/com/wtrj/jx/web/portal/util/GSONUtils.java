package cn.com.wtrj.jx.web.portal.util;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import cn.com.wtrj.jx.web.portal.controller.response.SourcePlaceRet;

/**
 * google json工具类
 * 
 * @author wuxudong
 *
 */
public class GSONUtils {
	/**
	 * 将com.google下的JSON或JSON数组字符串转化为List集合（可解决JAVA编译时类型擦除的问题）
	 * 
	 * @param object
	 *            JSON或者JSON数组字符串
	 * @param type
	 *            指定泛型的List的Type
	 * @return 指定泛型的List集合
	 */
	public static <T> List<T> toList(String str, Type type) throws Exception {
		Gson gson = new Gson();
		List<T> list = gson.fromJson(str, type);
		return list;
	}

	/**
	 * 动态拼接调用ESB接口的标准url
	 * 
	 * @param baseURL
	 *            基本URL路径
	 * @param schoolId
	 *            学校ID(全部时为-1)
	 * @param scheduleId
	 *            招生计划ID（全部时为-1）
	 * @param scheduleType
	 *            招生类型（初一/高一/全部）
	 * @param beginDate
	 *            起始日期
	 * @param endDate
	 *            结束日期
	 * @param year
	 *            年份（有年份和起始结束日期只能二选一）
	 * 
	 * @return 拼接好参数可用于直接调用接口的URL
	 */
	public static String getStandardURL(String baseURL, Integer schoolId, Integer scheduleId, String scheduleType,
			String beginDate, String endDate, String year) {
		StringBuilder url = new StringBuilder(baseURL);
		List<Object> list = new ArrayList<Object>();
		// 拼接学校ID
		if (schoolId != null && schoolId != -1) {
			list.add("schoolId=" + schoolId);
		} // 拼接招生计划ID
		if (scheduleId != null && scheduleId != -1) {
			list.add("scheduleId=" + scheduleId);
		} // 拼接招生类型(“小升初”对应“初一”/“初升高”对应“高一”/“全部”对应“全部”)
		if (scheduleType != null && !"全部".equals(scheduleType)) {
			list.add("zsGrade=" + scheduleType);
		} // 拼接起始日期，从00：00：00算起
		if (beginDate != null && !"".equals(beginDate)) {
			list.add("startTime=" + beginDate + " 00:00:00");
		} // 拼接结束日期，截止到23：59：59
		if (endDate != null && !"".equals(endDate)) {
			list.add("endTime=" + endDate + " 23:59:59");
		} // 拼接年份，从01-01 00：00：00 到12-31 23：59：59
		if (year != null && !"-1".equals(year)) {
			list.add("startTime=" + year + "-01-01 00:00:00");
			list.add("endTime=" + year + "-12-31 23:59:59");
		}
		StringBuilder queryParameters = new StringBuilder();
		if (list.size() > 0) {// 需要拼接查询参数，问号拼接
			for (int i = 0; i < list.size(); i++) {
				queryParameters.append(list.get(i));
				// 除去最后一个参数，其余每个参数键值对后拼接&符号
				if (i != list.size() - 1) {
					queryParameters.append("&");
				}
			}
			url.append("?" + queryParameters);
		}
		// 注意:调用接口时需要将空格替换为%20，否则会抛异常
		return url.toString().replaceAll(" ", "%20");
	}

	/**
	 * 生源地统计排序（取人数最多的10个）
	 * 
	 * @param list
	 *            待处理列表
	 * @return 人数最多的前10个列表
	 */
	public static List<SourcePlaceRet> sort(List<SourcePlaceRet> list) {
		List<SourcePlaceRet> sortedList = new ArrayList<SourcePlaceRet>();
		if (list.size() <= 10) {// 不足10个直接全部返回
			return list;
		} else {// 超过10个取人数最多的前10个
			for (int i = 0; i < list.size(); i++) {
				for (int j = i + 1; j < list.size(); j++) {
					if (list.get(i).getLuquNum() < list.get(j).getLuquNum()) {
						SourcePlaceRet temp = list.get(i);
						list.set(i, list.get(j));
						list.set(j, temp);
					}
				}
			}
			for (int i = 0; i < 10; i++) {
				sortedList.add(list.get(i));
			}
		}
		return sortedList;
	}
}
