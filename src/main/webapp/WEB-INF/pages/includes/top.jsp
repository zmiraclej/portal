<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
       <span class="logo-mini"><img src="${ctx}/img/top_logo.png" style="width: 40px;height: 40px;margin-left:2px;margin-top:5px" ></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><img src="${ctx}/img/top_logo.png" style="width: 40px;height: 40px;margin-top:-6px;margin-right:10px" ><b>嘉祥集团</b></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a id="sidebarToggleBtn" href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button" style="height:50px;;background: url(img/toggle.png) no-repeat center center">
        <span class="sr-only"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
        <!-- http://oa.jxfls.com:8088/seeyon/main.do?method=main -->
		  <li>
              <a href="${ssoOaUrl}" target="_blank" id="oaLogin">
                  	智能办公
                  <span class="label label-danger"></span>
              </a>
          </li>
          <li>
              <a target="_blank" onclick="hrLogin()" style="cursor: pointer;">
                  	人力资源管理
                  <span class="label label-danger"></span>
              </a>
          </li>
          <li>
              <a href="${ssoNcUrl}" target="_blank">
                  	财务管理
                  <span class="label label-danger"></span>
              </a>
          </li>
          <li>
              <a href="http://www.jx9c.com:8087/qiq/88/ExamMark_UE/ExamMark_UE_OR.html" target="_blank">
                  	网络阅卷
                  <span class="label label-danger"></span>
              </a>
          </li>
          <li>
              <a href="${ssoMailUrl}" target="_blank">
                  	电子邮件
                  <span class="label label-danger"></span>
              </a>
          </li>
          
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="${ctx }/img/loginUser.png" class="user-image" alt="User Image">
              <span class="hidden-xs">
              	<%
			  		String username=request.getParameter("userName");
			  		if(username!= null && !"".equals(username.trim())){
			  			out.println(username);
			  		}else{
			  			 out.println("请登录");
			  		}
			 	%>
              </span>
            </a>
             <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="img/loginUser.png" class="img-circle" alt="User Image">

                <p>
                                  当前登录用户 - ${userName}
                  <small></small>
                </p>
              </li>
              <!-- Menu Body -->
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="pwd" class="btn btn-default btn-flat">修改密码</a>
                </div>
                <div class="pull-right">
                  <a href="logout" class="btn btn-default btn-flat">退&nbsp;出</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <script>
  	function hrLogin(){
  		$.ajax({								 //按板块获取后台数据
				type : "GET",
				url : "./searchHrLoginUrl",
				dataType : "json",
				success : function(result) {	
					if ("02" == result.code){
						window.open(result.hrUrl);
					}else if ("01" == result.code) {
						layer.msg(result.msg)
					}	
				}
			});
  	}
  </script>
</body>
</html>