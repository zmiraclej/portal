<!doctype html>
<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <meta charset="utf-8">
    <title>欢迎登录</title>

    <link href="css/login.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="js/plugins/layui/css/layui.css">

    <script type="text/javascript" src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>

    <script>

        function fvh() {
            var vh = $(window).height();
            $(".index_login").height(vh);
        }
        $(function () {
            fvh();
        })
        $(window).resize(function () {
            fvh();
        })
        
    </script>
</head>

<body>
<div class="index_login">
    <div class="outer_box">
        <div class="big_logo"></div>
        <h1><img src="images/login_wel_txt.png"></h1>
        <div class="login_box">
           <div class="w261">
                    <div class="user">
                        <input class="input_box" placeholder="请输入用户名" id="username" size="25" tabindex="1" name="username" autocomplete="off" htmlEscape="true" />
                    </div>
                    <div class="user">
                        <input class="input_box password" type="password" placeholder="请输入密码"  id="password" size="25" tabindex="2" name="password"  htmlEscape="true" autocomplete="off" />
                    </div>

                    <button id="loginButton" class="button">立即登录</button>
                    <div style="width:100%;text-align:center"><span path="*" id="msg" class="alert_tip" style="margin-left:auto;margin-right:auto"></span></div>
                    
                </div>
        </div><!--login_box_end-->
    </div><!--outer_box_end-->
</div>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
  <script>
		$("#loginButton").on("click",function(){
			var username = $("#username").val();
			var password = $("#password").val();
			
			if (username == "") {
				$("#msg").html("必须录入用户名");
				return;
			}
			if (password == "") {
				$("#msg").html("必须录入密码");
				return;
			}
			var params = {};
			params["username"] = username;
			params["password"] = password;
			
			var index = layer.load(0, {shade: false}); 
			
			$.ajax({
		           url: "doLogin",
		           type: "POST",
		           contentType: "application/json",
		           dataType:"json",
		           data:JSON.stringify(params),
		           success: function(result) {
		        	   layer.closeAll('loading');
		               if('02'==result.code){
		            	   window.location.href ="index";
		               } else {
		            	   $("#msg").html("认证信息无效");
		               }
		           }
		       }
			);
		});

  </script>
</body>
</html>
