package cn.com.wtrj.jx.web.portal.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.com.wtrj.jx.web.portal.service.UserService;

@Controller
public class MenuController {
	private final static Logger logger = LoggerFactory.getLogger(MenuController.class);
	
	@Resource
    private UserService userService;

    /**
     * 跳转首页
     * 
     * @return
     */
    @RequestMapping("/searchMenu")
    public String index(Map<String, Object> model, HttpServletRequest request)
    {


        return "index";
    }
}
