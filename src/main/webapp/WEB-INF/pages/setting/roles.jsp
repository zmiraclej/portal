<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">角色管理</title>
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
	
	<link rel="stylesheet" href="css/pages/queryFile.css">
	<link rel="stylesheet" href="js/plugins/bootstrap-treeview/bootstrap-treeview.min.css">	
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
	
	<link rel="stylesheet" href="css/pages/mycss.css">
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
				<li class="active">角色管理</li>
			</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle">
			
			<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top:20px"> 
				    <table width="100%">
				    	<tr>
				    		<td width="600px" style="vertical-align: top;">
					    		<div style="height:600;width:100%;background-color:white;">
								    <table id="rolesTable" data-toggle="table">
									</table>
								</div>
				    		</td>
				    		<td style="vertical-align: top;height: auto;">
					    		<div class="layui-collapse" lay-filter="test">
					    		<div class="layui-colla-item" style="background-color:#FFF;height:55px">
								   <button id="saveRoleChange" class="fristBtnDes" style="height: 35px;float:right;margin-top:10px;margin-right:20px">
									<li class="btnIconCss">
									<img src="img/newIcon/data_storage_16px_1196189_easyicon.net.png"></li>保存权限</button>
								  </div>
								  <div class="layui-colla-item">
								    <h2 class="layui-colla-title" style="font-family:inherit">用户菜单权限设置</h2>
								    <div class="layui-colla-content" style="padding:0;margin-left:10px;margin-top:-15px">
									     <div style="margin-left:10px;height:300px;background-color:cyan">
						    				<div style="margin-top:20px">
						    					<div style="height:100%;">
						    						<div id="menusTree" style="height:300px;overflow-y:scroll"></div>
						    					</div>
						    				</div>
										 </div>
								    </div>
								  </div>
								  <div class="layui-colla-item">
								    <h2 class="layui-colla-title" style="font-family:inherit">NC财务报表权限设置</h2>
								    <div class="layui-colla-content" style="padding:0;margin-left:10px;">
								      		<div style="height:340px">
											     <table id="ncOrgTable" data-toggle="table" style="height:330px;overflow-y:scroll">
												 </table>
						    				</div>
						    				
								    </div>
								  </div>
								  <div class="layui-colla-item">
								    <h2 class="layui-colla-title" style="font-family:inherit">招生报表权限设置</h2>
								    <div class="layui-colla-content" style="padding:0;margin-left:10px;">
								      		<div style="height:340px">
											     <table id="roleSchoolTable" data-toggle="table" style="height:300px;overflow-y:scroll">
												 </table>
						    				</div>
								    </div>
								  </div>
								  <div class="layui-colla-item">
								    <h2 class="layui-colla-title" style="font-family:inherit">报表指标权限设置</h2>
								    <div class="layui-colla-content" style="padding:0;margin-left:10px;">
								      		<div style="height:350px">
											     <table id="roleReportTable" data-toggle="table" style="height:300px;overflow-y:scroll">
												 </table>
						    				</div>
								    </div>
								  </div>
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
<div id="rolesToolbar" class="btn-group">
	<div style="float:right;margin-right:2px;margin-left:10px">
    	 <button id="deleteRole" class="thirBtnDes" style="height: 35px;">
    	 <li class="btnIconCss">
		<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>删&nbsp除</button>
     </div>
     
    <div style="float:right;margin-right:2px;margin-left:10px">
    	 <button id="addRole" class="fristBtnDes" style="height: 35px;">
    	 <li class="btnIconCss">
		<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>新&nbsp增</button>
     </div>
</div>

<div id="roleAddContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	  <div class="layui-form-item" style="margin-top:20px">
	    <label class="layui-form-label">角色ID</label>
	    <div class="layui-input-block">
	      <input type="text" name="roleId" lay-verify="roleId" autocomplete="off" placeholder="请输入角色ID" class="layui-input" style="width:200px">
	    </div>
	  </div>
	  
	   <div class="layui-form-item">
	    <label class="layui-form-label">角色名称</label>
	    <div class="layui-input-block">
	      <input type="text" name="roleName" lay-verify="roleName" autocomplete="off" placeholder="请输入角色名称" class="layui-input" style="width:200px">
	    </div>
	   </div>
	   <div class="layui-form-item">
		    <div class="layui-input-block">
		      <button class="fristBtnDes" lay-submit lay-filter="saveRole">
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

<script type="text/javascript" src="js/pages/setting/menusTree.js"></script>


<script type="text/javascript" src="js/plugins/bootstrap-treeview/bootstrap-treeview.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>

<script src="js/pages/setting/roles.js"></script>
<script>
layui.use(['element', 'layer'], function(){
  var element = layui.element();
  var layer = layui.layer;
  
  //监听折叠
  element.on('collapse(test)', function(data){
  });
});
</script>
</body>
</html>