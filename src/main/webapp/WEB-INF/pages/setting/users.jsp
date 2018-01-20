<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">用户管理</title>
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
	<link rel="stylesheet" href="css/pages/mycss.css">
	<link rel="stylesheet" href="css/pages/queryFile.css">
	<link rel="stylesheet" href="js/plugins/bootstrap-treeview/bootstrap-treeview.min.css">	
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
	<link rel="stylesheet" href="css/pages/report.css">
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
			<ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-dashboard"></i> 基础设定 </a></li>
				<li class="active">用户管理</li>
			</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle">
			
			<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top:20px"> 
				    <table width="100%">
				    	<tr>
				    		<td width="800px">
					    		<div style="height:600px;width:100%;background-color:white;">
								    <table id="usersTable" data-toggle="table">
									</table>
								</div>
				    		</td>
				    		<td>
				    			<div style="margin-left:10px;height:600px;background-color:white">
								 	<table id="rolesTable" >
									</table>
								 </div>
				    		</td>
				    	</tr>
				    </table>
				</section>
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
<div id="usersToolbar" class="btn-group">
<!--    <div style="float:right;margin-right:2px;margin-left:10px">
    	 <button id="deleteUser" class="layui-btn layui-btn-normal" style="height: 35px;">删&nbsp;除</button>
     </div>
     
	<div style="float:right;margin-right:2px;margin-left:10px">
    	 <button id="editUser" class="layui-btn layui-btn-normal" style="height: 35px;">编&nbsp;辑</button>
     </div>
     
     <div style="float:right;margin-right:2px;margin-left:10px">
    	 <button id="bindEmployee" class="layui-btn layui-btn-normal" style="height: 35px;">绑定员工</button>
     </div>
    <div style="float:right;margin-right:2px;margin-left:10px">
    	 <button id="addUser" class="layui-btn layui-btn-normal" style="height: 35px;">新&nbsp增</button>
     </div> -->
     <div class="layui-btn-group" style="margin-left:10px">
		    <button id="addUser"  class="fristBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>新&nbsp;增</button>
		    <button id="editUser" class="fristBtnDes ">
		    <li class="btnIconCss">
			<img src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>编&nbsp;辑</button>
		    <button id="deleteUser" class="thirBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>删&nbsp;除</button>
		   <!--  <button id="bindEmployee" class="secBtnDes">绑定员工</button>
		     <button id="deleteBindEmployee" class="secBtnDes">解除绑定</button> -->
  	</div>
</div>

<div id="userAddContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">用户名:</label>
	    <div class="layui-input-block">
	      <input id="newUserName" type="text" name="userName" lay-verify="userName" autocomplete="off" placeholder="请输入用户名" class="layui-input" style="width:200px">
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">手机号:</label>
	    <div class="layui-input-block">
	      <input id="newTel" type="text" name="tel" lay-verify="tel" autocomplete="off" placeholder="请输入手机号" class="layui-input" style="width:200px">
	    </div>
	  </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">密码:</label>
	    <div class="layui-input-inline">
	      <input id="newPwd" type="password" name="password" lay-verify="pass" placeholder="请输入密码" autocomplete="off" class="layui-input">
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">再次确认密码:</label>
	    <div class="layui-input-inline">
	      <input id="newPwdConfirm" type="password" name="password" lay-verify="confirmPass" placeholder="请输入密码" autocomplete="off" class="layui-input">
	    </div>
	 </div>
		<div class="layui-form-item">
		    <div class="layui-input-block">
		      <button class="fristBtnDes" lay-submit lay-filter="formDemo">
		      <li class="btnIconCss">
			<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>立即提交</button>
		      <button type="reset" class="thirBtnDes">
		      <li class="btnIconCss">
			<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>重置</button>
		    </div>
		  </div>
	</form>  
</div>

<div id="bindEmployeeContent" style="display:none;width:100%;height:100%">
		<div id="currentUser"  style="display:table-cell;width:700px;vertical-align:middle;text-align:center">
		<span>&nbsp;</span>
		<span id="bindingEmployee" style="margin-left:10px">当前未绑定用户</span></div>
		
	<div style="height:420px;width:90%;background-color:white;margin-left:auto;margin-right:auto">
	    <table id="employeeBindTable" data-toggle="table">
		</table>
	</div>
	<div style="margin-top:50px;vertical-align:middle;text-align:center;">
			<button id="updBindEmployee" class="secBtnDes" style="height: 35px;">绑定员工</button>
	    	<button id="quitBind" class="thirBtnDes" style="height: 35px;">
	    	<li class="btnIconCss">
			<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>取&nbsp消</button>
	</div>
</div>

<div id="userEditContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	 <input id="editUserId" type="text" name="userId" style="display:none">
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">用户名:</label>
	    <div class="layui-input-block">
	      <input  id="editUserName" type="text" name="userName" lay-verify="userName" autocomplete="off" placeholder="请输入用户名" class="layui-input" style="width:200px">
	    </div>
	  </div>
	   <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">手机号:</label>
	    <div class="layui-input-block">
	      <input  id="editTel" type="text" name="tel" lay-verify="tel" autocomplete="off" placeholder="请输入手机号名" class="layui-input" style="width:200px">
	    </div>
	  </div>
	  
	   <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">密码</label>
	    <div class="layui-input-block">
	      <input id="editPassword" type="password" name="password" lay-verify="pass" autocomplete="off" placeholder="请输入密码 " class="layui-input" style="width:200px">
	    </div>
      <div class="layui-form-item " style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">再次确认密码:</label>
	    <div class="layui-input-block">
	      <input id="editPasswordConfirm" type="password" name="passwordVtype" lay-verify="confirmPass" placeholder="请输入密码" autocomplete="off" class="layui-input" style="width:200px">
	    </div>
	  </div>
		    
		</div>
		<div class="layui-form-item" style="margin-top:10px">
		    <div class="layui-input-block">
		      <button class="fristBtnDes" lay-submit lay-filter="editUser">
		      <li class="btnIconCss">
			<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>立即提交</button>
		      <button  class="thirBtnDes" lay-filter="cancel">
		      <li class="btnIconCss">
			<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>取消</button>
		    </div>
		  </div>
	  </div>
	 </form>
</div>

<div id="rolesToolbar" class="btn-group">
     
    <div style="float:right;margin-right:2px;margin-left:10px">
    	 <button id="updateUserRoles" class="fristBtnDes">
		   <li class="btnIconCss">
			<img src="img/newIcon/data_storage_16px_1196189_easyicon.net.png"></li>保&nbsp存</button>
     </div>
</div>

<script type="text/javascript" src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- ./wrapper -->
<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/plugins/layui/layui.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap-treeview/bootstrap-treeview.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>

<script src="js/pages/setting/users.js"></script>
</body>


</html>