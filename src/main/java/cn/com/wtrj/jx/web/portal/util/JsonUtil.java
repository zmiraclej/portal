package cn.com.wtrj.jx.web.portal.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.text.SimpleDateFormat;

/**
 * Created by Administrator on 2017/8/17.
 */

public class JsonUtil {
    private static ObjectMapper mapper = new ObjectMapper();

    public JsonUtil() {
    }

    public static String toJson(Object object) {
        try {
            return mapper.writeValueAsString(object);
        } catch (IOException var2) {
            return null;
        }
    }

    public static <T> T fromJson(String jsonString, Class<T> clazz) {
        if(StringUtils.isEmpty(jsonString)) {
            return null;
        } else {
            try {
                return mapper.readValue(jsonString, clazz);
            } catch (IOException var3) {
                return null;
            }
        }
    }

    static {
        mapper.setSerializationInclusion(JsonInclude.Include.NON_DEFAULT);
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        mapper.setDateFormat(fmt);
    }
}
