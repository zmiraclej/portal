package cn.com.wtrj.jx.web.portal.controller;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.portal.common.controller.response.base.BaseRet;
import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.LoginParam;
import cn.com.wtrj.jx.web.portal.service.UserService;

@Controller
@RequestMapping("/")
public class LoginController extends BaseController {
	private final static Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private UserService userService;
	
	@ResponseBody
	@RequestMapping("/doLogin")
	public Object changePassword(@RequestBody LoginParam param) {
		logger.info("登录验证 开始nihaonihaonihao");
		
		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			
			UsernamePasswordToken upToken = new UsernamePasswordToken(param.getUsername(), param.getPassword());
			Subject user = SecurityUtils.getSubject();
			user.login(upToken);
			
		} catch (Exception e) {
			ret.setCode(Constant.RetCode.ERROR);
		}
		
		logger.info("登录验证 结束");
		return ret;
	}
}
