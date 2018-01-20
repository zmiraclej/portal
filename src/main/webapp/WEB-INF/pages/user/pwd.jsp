<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">用户信息</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="css/jqueryTable/jqx.base.css" type="text/css" />
	    <!-- Bootstrap 3.3.6 -->
	<link rel="stylesheet" href="js/plugins/bootstrap/css/bootstrap.css">
	  <!-- Font Awesome -->
	<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="css/ionicons/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="css/AdminLTE.min.css">
	<!-- AdminLTE Skins. Choose a skin from the css/skins
	     folder instead of downloading all of them to reduce the load. -->
	<link rel="stylesheet" href="css/skins/_all-skins.min.css">
	<link rel="stylesheet" href="js/plugins/bootstrap-treeview/bootstrap-treeview.min.css">	
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
	
	<link rel="stylesheet" href="css/pages/mycss.css">
	<link rel="stylesheet" href="css/pages/report.css">
<style>

.pwdDiv { 
   position:absolute; 
   top:100px; 
   left:50%; 
   margin-left:-150px; 
   margin-top:50px;
    /*此时宽和高都要固定*/ 
    width:400px; 
    background-color:white;
} 
</style>	
</head>

<body class="hold-transition skin-blue-light sidebar-mini">
	<div class="wrapper">

		<!-- 头部开始 -->
		<jsp:include page="../includes/top.jsp">
			<jsp:param name="userName" value="${userName}" />
		</jsp:include>
		<!-- 头部结束 -->


		<!-- 左边部分       startup -->
		<jsp:include page="../includes/left.jsp">
			<jsp:param name="userName" value="${userName}" />
		</jsp:include>

		<!-- 左边部分       end -->
		<div class="content-wrapper">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
				<ul class="breadcrumb">
				    <i style="background:url(img/position.png) no-repeat;background-size:auto 90%;height:100%;padding-left:20px"></i>
				    <span>当前位置：</span>
				    <li><a href="#">个人信息</a> <span class="divider"></span></li>
				    <li><a href="#">密码修改</a> <span class="divider"></span></li>
				</ul>
			</section>
			<!-- 中间部分-top     end -->
			<!-- 中间部分-main     startup -->
			<div class="middle">
				<section class="content"> 
					<div class="containDiv" style="margin:auto;width:90%;background-color:white">
						<div class="pwdDiv" style="width:400px;padding:30px">
							    <div class="layui-form-item ">
								    <label class="layui-form-label" style="width:120px">新密码:</label>
								    <div class="layui-input-inline">
								      <input id="newPwd" type="password" name="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
								    </div>
								 </div>
								 <div class="layui-form-item ">
								    <label class="layui-form-label" style="width:120px">再次确认密码:</label>
								    <div class="layui-input-inline">
								      <input id="newPwdConfirm" type="password" name="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
								    </div>
								 </div>
								
							    <div class="layui-form-item" style="margin-top:30px;text-align: center;">
								   <button id="changePwd" class="fristBtnDes" >
								   <li style="display:inline-block;width:20px;height:20px;text-align:center;margin-top:-5px;margin-right:5px">
							<img src="img/newIcon/data_storage_16px_1196189_easyicon.net.png"></li>保存修改</button>
								</div>
						</div>
					</div>
				</section>
			</div>
			
			<!-- 中间部分-main     end -->
		</div>
	</div>
	<!-- 底部       startup  -->
	<%@ include file="../includes/bottom.jsp"%>
	<!-- 底部       end -->

	<!-- 设置按钮页面       startup -->
	<%@ include file="../includes/rightSetup.jsp"%>
	<!-- 设置按钮页面       end -->
	<div class="control-sidebar-bg"></div>


</div>



<script type="text/javascript" src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- ./wrapper -->
<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap-treeview/bootstrap-treeview.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>

<script src="js/pages/user/pwd.js"></script>
</body>


</html>