package cn.com.wtrj.jx.web.portal.controller.health;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HealthController {
	
	@ResponseBody
	@RequestMapping("/health")
	public Map<String, String> health() {
		
		Map<String, String> map = new HashMap<>();
		map.put("status", "UP");
		map.put("description", "门户服务");
		
		return map;
	}

}
