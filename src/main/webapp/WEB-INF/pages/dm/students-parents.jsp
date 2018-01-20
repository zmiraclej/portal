<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">学生家长管理</title>
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
	
	
	
	<div id="studentParentsToolbar" class="btn-group">
	<%-- <div class="layui-input-inline" style="height: 34px;  margin-top: -5px;">
		<select id="school" class="layui-select" style="height: 34px;">
		    	<c:forEach items="${schools}" var="s">
		    		<option value="${s.code }" stage="${s.stage }">${s.name }</option>
				</c:forEach>
		 </select>
	</div> --%>
     <div class="layui-btn-group" style="margin-left:10px">
		    
		    <button id="addStudentParents"  class="fristBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>新&nbsp;增</button>
		    <button id="editStudentParents" class="fristBtnDes ">
		    <li class="btnIconCss">
			<img src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>编&nbsp;辑</button>
		    <button id="deleteStudentParents" class="thirBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>删&nbsp;除</button> 
  	</div>
</div>
	
	<div class="wrapper" style="margin: 10px;">
		<input type="hidden" id="studentId" name="studentId" value="${studentId }">
		<table id="studentParentsTable" data-toggle="table"></table>
	
	</div>
	
	

<div id="parentsAddContent" style="display:none;width:100%;height:90%">
		<form class="layui-form" action="" method="post" name="frmParentsAdd" id="frmParentsAdd">
		  <div class="layui-form-item" style="margin-top:10px">
		  	<div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">家长姓名:</label>
		      <div class="layui-input-inline">
		        <input type="text" name="name" lay-verify="name" autocomplete="off" placeholder="请输入家长姓名" class="layui-input" style="width:200px">
		      </div>
		    </div>
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">性别:</label>
		      <div class="layui-input-inline" style="width:200px;">
				      <input id="sex" type="text" name="sex" lay-verify="studentNo" autocomplete="off" placeholder="请输入性别" class="layui-input" style="width:200px">
		      </div>
		    </div>
		    
		     <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">手机号:</label>
		      <div class="layui-input-inline">
		        <input id="phone" type="text" name="phone" lay-verify="phone" autocomplete="off" placeholder="请输入手机号" class="layui-input" style="width:200px">
		      </div>
		    </div>
		    
		  </div>
		  
		  
		 <div class="layui-form-item">
		    <div class="layui-input-block">
		      <button class="fristBtnDes" lay-submit lay-filter="frmParentsAdd">
		      <li class="btnIconCss">
			<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>立即提交</button>
		      <button type="reset" class="thirBtnDes">
		      <li class="btnIconCss">
			<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>重置</button>
		    </div>
		  </div>
	
		</form>  
	</div>
	
<div id="parentsEditContent" style="display:none;width:100%;height:90%">
		<form class="layui-form" action="" method="post" name="frmParentsEdit" id="frmParentsEdit">
		  <input type="hidden" name="id">
		  <div class="layui-form-item" style="margin-top:10px">
		  	<div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">家长姓名:</label>
		      <div class="layui-input-inline">
		        <input type="text" name="name" lay-verify="name" autocomplete="off" placeholder="请输入家长姓名" class="layui-input" style="width:200px">
		      </div>
		    </div>
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">性别:</label>
		      <div class="layui-input-inline" style="width:200px;">
				      <input id="sex" type="text" name="sex" lay-verify="studentNo" autocomplete="off" placeholder="请输入性别" class="layui-input" style="width:200px">
		      </div>
		    </div>
		    
		     <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">手机号:</label>
		      <div class="layui-input-inline">
		        <input id="phone" type="text" name="phone" lay-verify="phone" autocomplete="off" placeholder="请输入手机号" class="layui-input" style="width:200px">
		      </div>
		    </div>
		    
		  </div>
		  
		  
		 <div class="layui-form-item">
		    <div class="layui-input-block">
		      <button class="fristBtnDes" lay-submit lay-filter="frmParentsEdit">
		      <li class="btnIconCss">
			<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>立即提交</button>
		      <button type="reset" class="thirBtnDes">
		      <li class="btnIconCss">
			<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>重置</button>
		    </div>
		  </div>
	
		</form>  
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

<script src="js/pages/dm/students-parents.js"></script>
</body>

</html>