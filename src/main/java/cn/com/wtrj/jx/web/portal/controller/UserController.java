package cn.com.wtrj.jx.web.portal.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.service.UserService;

@Controller
@RequestMapping("/")
public class UserController extends BaseController
{

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Resource
    private UserService userService;
    
    @RequestMapping("/login")
    public String login(Map<String, Object> model)
    {
        return "login";
    }
    
    
    /**
     * 跳转首页
     * 
     * @return
     */
    @RequestMapping("/index")
    public String index(Map<String, Object> model)
    {

    	model.put("id", "index");
    	
        this.doCommonSetting(model);
        
        return "index";
    }

    @RequestMapping("/pwd")
    public String changePassword(Map<String, Object> model, String id)
    {
        // 记录所选菜单模块ID
        model.put("id", "pwd");
        
        this.doCommonSetting(model);
        
        return "user/pwd";
    }
    

}
