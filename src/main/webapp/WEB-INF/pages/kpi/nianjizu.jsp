<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>年级组设定</title>
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="js/plugins/bootstrap/css/bootstrap.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
<!-- icons -->
<link rel="stylesheet" href="css/ionicons/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="css/AdminLTE.min.css">
<link rel="stylesheet" href="css/skins/_all-skins.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="css/pages/mycss.css">
<link rel="stylesheet" href="css/pages/report.css">
<link rel="stylesheet" href="js/plugins/bootstrap-treeview/bootstrap-treeview.min.css">	
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
	
<!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="js/plugins/jQuery/date/date.format.js"></script>

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
				    <li><a href="#">绩效考核</a> <span class="divider"></span></li>
				    <li><a href="#">考核管理</a> <span class="divider"></span></li>
				    <li><a href="#">年级组设定</a> <span class="divider"></span></li>
				</ul>
			</section>
			<!-- 中间部分-top     end -->

			<!-- 中间部分-main     startup -->
			<section class="content"> 
				    <table width="100%">
				    	<tr>
				    		<td width="40%">
					    		<div style="height:600px;width:100%;background-color:white;">
								    <table id="nianjizuTable" data-toggle="table">
									</table>
								</div>
				    		</td>
				    		<td width="50%">
				    			<div style="margin-left:10px;height:600px;background-color:white">
								 	<table id="nianjizuMemberTable" >
									</table>
								 </div>
				    		</td>
				    	</tr>
				    </table>
				</section>
			<!-- 中间部分-main     end -->
		</div>
		<!-- 底部       startup  -->
		<%@ include file="../includes/bottom.jsp"%>
		<!-- 底部       end -->

		<div id="addForm" style="width:90%; margin-top:10px; display: none">
			<form class="layui-form" action="" id="dataForm" method="post">

				<div class="layui-form-item">
				     <label class="layui-form-label" style="width:100px">学校</label>
				      <div class="layui-input-block">
                            <select id="addSchoolSelect" name="schoolCode" style="width: 250px; height: 35px;">
	                        </select>
	                  </div> 
                </div>
                <div class="layui-form-item">
					<label class="layui-form-label" style="width:100px">年级组编码</label>
					<div class="layui-input-block">
						<input type="text" id="name" name="nianjizuCode" lay-verify="required" autocomplete="off" placeholder="必填" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label" style="width:100px">年级组名</label>
					<div class="layui-input-block">
						<input type="text" id="name" name="nianjizuName" lay-verify="required" autocomplete="off" placeholder="必填" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-block" style="width:55%; text-align:center;margin: auto;">
					<button class="fristBtnDes" lay-submit="" lay-filter="saveNewNianjizu">
					<li class="btnIconCss">
					<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>提交</button>
					<button id="reset" type="reset" class="thirBtnDes">
					<li class="btnIconCss">
					<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>重置</button>
					</div>
				</div>
			</form>
		</div>
		

		<!-- 设置按钮页面       startup -->
		<%@ include file="../includes/rightSetup.jsp"%>
		<div class="control-sidebar-bg"></div>
		
	</div>
	<div id="nianjizuToolbar" class="btn-group">
	     <div class="layui-btn-group" style="margin-left:10px">
			    <button id="addNianjizuBtn"  class="fristBtnDes">
			    <li class="btnIconCss">
				<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>新&nbsp;增</button>
			    <button id="editNianjizuBtn" class="fristBtnDes "><li class="btnIconCss">
				<img src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>编&nbsp;辑</button>
			    <button id="deleteNianjizuBtn" class="thirBtnDes"><li class="btnIconCss">
				<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>删&nbsp;除</button>
			    <button id="bindNianjizuzhang" class="secBtnDes ">设置年级组长</button>
	  	</div>
  	</div>
  	
  	<div id="bindNianjizuzhangContent" style="display:none;width:100%;height:100%">
		<div id="currentUser"  style="display:table-cell;width:700px;vertical-align:middle;text-align:center">
		<span>&nbsp;</span>
		<span id="bindingNianjizuzhang" style="margin-left:10px">当前未设置年级组长</span></div>
		<div style="height:420px;width:90%;background-color:white;margin-left:auto;margin-right:auto">
		    <table id="employeeBindTable" data-toggle="table">
			</table>
		</div>
		<div style="margin-top:50px;vertical-align:middle;text-align:center;">
				<button id="updBindNianjizuzhang" class="secBtnDes" style="height: 35px;">绑定员工</button>
		    	<button id="quitBind" class="thirBtnDes" style="height: 35px;">
		    	<li class="btnIconCss">
				<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>取&nbsp消</button>
		</div>
	</div>
 
    <div id="nianjizuMemberToolbar" class="btn-group">
	     <div class="layui-btn-group" style="margin-left:10px">
			    <button id="addNianjizuMemberBtn"  class="fristBtnDes"><li class="btnIconCss">
				<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>新&nbsp;增</button>
			    <button id="deleteNianjizuMemberBtn" class="thirBtnDes"><li class="btnIconCss">
				<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>删&nbsp;除</button>
	  	</div>
  	</div>
	
	<div id="bindNianjizuMemberContent" style="display:none;width:100%;height:100%">
		<div style="height:400px;width:90%;background-color:white;margin-left:auto;margin-right:auto">
		    <table id="memberBindTable" data-toggle="table">
			</table>
		</div>
		<div style="width:50%; text-align:center;margin: auto;">
				<button id="addBindNianjizuMemberBtn" class="secBtnDes" style="height: 35px;">添加到年级组</button>
		    	<button id="quitBindMemberBtn" class="thirBtnDes" style="height: 35px;">
		    	<li class="btnIconCss">
				<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>取&nbsp消</button>
		</div>
	</div>
	
	<div id="editForm" style="width:90%; margin-top:10px; display: none">
			<form class="layui-form"  action="">
				<div class="layui-form-item">
				     <label class="layui-form-label" style="width:100px">学校</label>
				     <div class="layui-input-block">
						 <input type="text" id="editSchoolName" name="schoolName" lay-verify="required" autocomplete="off" disabled="disabled" class="layui-input">
					 </div>
                </div>
                <div class="layui-form-item">
					<label class="layui-form-label" style="width:100px">年级组编码</label>
					<div class="layui-input-block">
						<input type="text" id="editCode" name="nianjizuCode" lay-verify="required" autocomplete="off" placeholder="必填" disabled="disabled" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label" style="width:100px">年级组名</label>
					<div class="layui-input-block">
						<input type="text" id="editName" name="nianjizuName" lay-verify="required" autocomplete="off" placeholder="必填" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-block" style="width:55%; text-align:center;margin: auto;">
						<button class="fristBtnDes" lay-submit lay-filter="editNianjizu">
						<li class="btnIconCss">
				<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>提交</button>
						<button id="quitEditBtn" class="thirBtnDes">
						<li class="btnIconCss">
				<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>取消</button>
					</div>
				</div>
			</form>
		</div>
</div>
	<input type="hidden" id="pageCount" style="width: 45px" />
	<input type="hidden" id="totalCount" style="width: 45px" />
	<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/plugins/layui/layui.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<!-- Latest compiled and minified JavaScript -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
	<!-- Latest compiled and minified Locales -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>
		
	<!-- 画面逻辑 -->
	<script src="js/pages/kpi/nianjizu.js"></script>
	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>
	<script type="text/javascript">
 		$(window).resize(
				function() {
					if ($(".page-content").width() >= 1080) {
						$(".default_pgContainer").css("margin-left",
								($(".page-content").width() - 1115) / 2);
						$("#btn_container").css("margin-right",
								($(".page-content").width() - 1060) / 2);
						$("#input_div").css("margin-left",
								($(".page-content").width() - 1095) / 2);
						$("#page_div").css("margin-right",
								($(".page-content").width() - 1080) / 2);
						$(".content-header").css("margin-right",
								($(".page-content").width() - 1060) / 2);
					} else {
						$(".default_pgContainer").css("margin-left", 15);

						$("#btn_container").css("margin-right", 0);
						$("#input_div").css("margin-left", 0);
						$("#page_div").css("margin-right", 0);
						$(".content-header").css("margin-right", 0);
					}
				});
		$(document).ready(
				function() {
					if ($(".page-content").width() >= 1080) {
						$(".default_pgContainer").css("margin-left",
								($(".page-content").width() - 1115) / 2);
						$("#btn_container").css("margin-right",
								($(".page-content").width() - 1060) / 2);
						$("#input_div").css("margin-left",
								($(".page-content").width() - 1095) / 2);
						$("#page_div").css("margin-right",
								($(".page-content").width() - 1080) / 2);
						$(".content-header").css("margin-right",
								($(".page-content").width() - 1060) / 2);
					} else {
						$(".default_pgContainer").css("margin-left", 15);
						$("#btn_container").css("margin-right", 0);
						$("#input_div").css("margin-left", 0);
						$("#page_div").css("margin-right", 0);
						$(".content-header").css("margin-right", 0);
					}
				}); 
	</script>
</body>
</html>