package cn.com.wtrj.jx.web.portal.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseUtil {

	public static <T> Map<String, Object> sendList(List<T> T) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("root", T);
		map.put("success", 200);
		return map;
	}
}
