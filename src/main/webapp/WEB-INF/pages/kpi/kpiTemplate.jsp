<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>考核发起</title>
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
<link rel="stylesheet" href="css/pages/mycss.css">
<link rel="stylesheet" href="css/pages/addRessBook.css">

<link rel="stylesheet" href="js/plugins/layui2/css/layui.css">
<link rel="stylesheet" href="css/pages/report.css">
<link rel="stylesheet" href="css/jqueryTable/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="css/jqueryTable/jqx.energyblue.css" type="text/css" />

<!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/common.js"></script>
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

		<div class="content-wrapper" style="background-color: white">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
			<ul class="breadcrumb">
				<i style="background: url(img/position.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 20px"></i>
				<span>当前位置：</span>
				<li><a href="#">绩效考核</a> <span class="divider"></span></li>
				<li><a href="#">考核管理</a> <span class="divider"></span></li>
				<li><a href="#">考核模板管理</a> <span class="divider"></span></li>
			</ul>
			</section>
			<!-- 中间部分-top     end -->

			<!-- 中间部分-main     startup -->
			<section class="content">
			<div class="page-content">
				<div id="toolbar" class="btn-group">
					<button id="down" onclick="down()" class="secBtnDes" style="margin-left: 0px">
					<li class="btnIconCss">
							<img src="img/newIcon/download_16px_1172411_easyicon.net.png"></li>导入模板下载
					</button>
					<button type="button" class="fristBtnDes" id="uploadBtn">
  						<li class="btnIconCss">
							<img src="img/newIcon/upload_16px_1172860_easyicon.net.png"></li>选择文件
					</button>
					<!-- <input type="file" name="file1" lay-type="file" class="layui-upload-file" lay-title="导入"> -->
				</div>
				<div id='mainTable' style="text-align: center; padding-top: 5px;">
					<div id='pjTable'></div>
				</div>
			</div>
			</section>
			<!-- 中间部分-main     end -->
		</div>
	</div>
	<!-- 底部       startup  -->
	<%@ include file="../includes/bottom.jsp"%>
	<!-- 底部       end -->

	<div id="addForm" style="width: 100%; display: none;">
		<form class="layui-form" action="" id="dataForm" method="post">
			<input id="tmplCode" name="tmplCode" value="${tmplCode}" type="hidden">
			<div class="layui-form-item" style="margin: 10px 10px 5px 0px;">
				<label class="layui-form-label" style="width:100px">模板名</label>
				<div class="layui-input-block">
					<input type="text" id="tmplName" name="tmplName" lay-verify="required" autocomplete="off" placeholder="必填" class="layui-input">
				</div>
			</div>
			<div class="layui-form-item" style="margin: 10px 10px 5px 0px;">
				<label class="layui-form-label" style="width:100px">模板类型</label>
				<div class="layui-input-block">
					<select id="tmplType" name="tmplType" lay-verify="required" lay-search="">
						<option value="">必选</option>
						<option value=1>自评</option>
						<option value="2">教研组评</option>
						<option value="3">年级组评</option>
						<option value="4">教务处评</option>
					</select>
				</div>
			</div>
			<div class="layui-form-item" style="margin: 120px 10px 5px 0px;">
				<div class="layui-input-block" style="width:55%; text-align:center;margin: auto;">
					<button class="fristBtnDes" lay-submit="" lay-filter="submit1">
					<li class="btnIconCss">
					<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>提交</button>
					<button id="reset" type="reset" class="thirBtnDes">
					<li class="btnIconCss">
					<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>重置</button>
					</div>
			</div>
		</form>
	</div>
	<div id='editLayer' style="overflow: auto; display: none; text-align: center">
		<div id='pjTreeGrid'></div>
	</div>

	<!-- 设置按钮页面       startup -->
	<%@ include file="../includes/rightSetup.jsp"%>
	<div class="control-sidebar-bg"></div>
	<input type="hidden" id="pageCount" style="width: 45px" />
	<input type="hidden" id="totalCount" style="width: 45px" />
	<!-- ./wrapper -->
	<script src="js/pages/paging/pagingCommon.js"></script>
	<script src="js/pages/tablePaging.js"></script>
	<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxcore.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxdata.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxbuttons.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxscrollbar.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxdatatable.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxtreegrid.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxcheckbox.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxlistbox.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxdropdownlist.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/localization.js"></script>
	<script src="js/plugins//layui2/layui.js"></script>

	<!-- 业务逻辑 -->
	<script src="js/pages/kpi/kpiTemplate.js"></script>
	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>
	<script type="text/javascript">
		$(window).resize(
				function() {
					$("#mainTable").css("height",
							$('.content-wrapper').height() - 100);
				});
		$(document).ready(
				function() {
					$("#mainTable").css("height",
							$('.content-wrapper').height() - 100);
				});
	</script>
</body>
</html>