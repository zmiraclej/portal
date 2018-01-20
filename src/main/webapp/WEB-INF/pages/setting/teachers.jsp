<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">教师管理</title>
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
			<jsp:param name="teacherName" value="${teacherName}" />
		</jsp:include>
		<!-- 头部结束 -->


		<!-- 左边部分       startup -->
		<jsp:include page="../includes/left.jsp">
			<jsp:param name="teacherName" value="${teacherName}" />
		</jsp:include>

		<!-- 左边部分       end -->


		<div class="content-wrapper">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
			<ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-dashboard"></i> 基础设定 </a></li>
				<li class="active">教师管理</li>
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
								    <table id="teachersTable" data-toggle="table">
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
<div id="teachersToolbar" class="btn-group">
	<!-- <div class="layui-input-inline" style="height: 34px;  margin-top: -5px;">
			<input type="text" id="search" style="height: 30px;"/>
		</div> -->
     <div class="layui-btn-group" style="margin-left:10px">
		    <button id="addTeacher"  class="fristBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>新&nbsp;增</button>
		    <!-- <button id="editteacher" class="fristBtnDes ">
		    <li class="btnIconCss">
			<img src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>编&nbsp;辑</button>
		    <button id="deleteteacher" class="thirBtnDes"> -->
		   <!--  <li class="btnIconCss">
			<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>删&nbsp;除</button> -->
  	</div>
</div>

<div id="teacherAddContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">员工号:</label>
	    <div class="layui-input-block">
	      <input id="newJobNumber" type="text" name="jobNumber" lay-verify="jobNumber" autocomplete="off" placeholder="请输入员工号" class="layui-input" style="width:200px">
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
		    <label class="layui-form-label"  style="width:120px">姓名:</label>
		    <div class="layui-input-block">
		      <input id="newName" type="text" name="name" lay-verify="name" autocomplete="off" placeholder="请输入姓名" class="layui-input" style="width:200px">
		    </div>
		  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">手机号:</label>
	    <div class="layui-input-block">
	      <input id="newPhone" type="text" name="phone" lay-verify="phone" autocomplete="off" placeholder="请输入手机号" class="layui-input" style="width:200px">
	    </div>
	     </div>
	    
	 <div class="layui-form-item" style="margin-top:10px">
		   <label class="layui-form-label"  style="width:120px">性别:</label>
		    <div class="layui-input-block">
		      <input id="newSexMale" type="radio" name="sex" value="1" title="男" checked="checked" class="layui-input" >
		      <input id="newSexFmale" type="radio" name="sex" value="0" title="女" class="layui-input" >
		    </div>
		  </div>
		  
		  <div class="layui-form-item" style="margin-top:10px">
		   <label class="layui-form-label"  style="width:120px">学校:</label>
		    <div id="schoolsDiv" class="layui-input-block">
		    	<c:forEach items="${schools}" var="s">
					<input type="checkbox" name="schoolCode" value="${s.code }" lay-skin="primary" title="${s.name }">
				</c:forEach>
		    	
		      <!-- <input type="checkbox" name="school" value="1" title="男" checked="checked" class="layui-input" >
		      <input type="checkbox" name="school" value="0" title="女" class="layui-input" > -->
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

<div id="roleTables"></div>

<div id="teacherEditContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	 <input id="editteacherId" type="text" name="teacherId" style="display:none">
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">用户名:</label>
	    <div class="layui-input-block">
	      <input  id="editteacherName" type="text" name="teacherName" lay-verify="teacherName" autocomplete="off" placeholder="请输入用户名" class="layui-input" style="width:200px">
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
		      <button class="fristBtnDes" lay-submit lay-filter="editteacher">
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

<script src="js/pages/setting/teachers.js"></script>
</body>


</html>