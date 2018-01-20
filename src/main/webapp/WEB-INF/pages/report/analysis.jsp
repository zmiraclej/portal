<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>经营业绩汇总</title>
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
						<li>
							<a href="#">大数据分析</a> <span class="divider"></span></li>
						<li>
							<a href="#">经营业绩汇总</a> <span class="divider"></span></li>
					</ul>
				</section>
				<!-- 中间部分-top     end -->

				<!-- 中间部分-main     startup -->
				<section class="content">
					<blockquote class="layui-elem-quote">
						<span style="font-size: 14px">当前您的数据查看权限为：集团大盘数据、全部板块及公司数据</span>
						<a id="excelExport" style="float: right;margin-right: 20px;cursor: pointer;">
							<font style="color: blue;">数据导出</font>
						</a>
						<div class="layui-input-inline" style="width: 220px;float: right;margin-right: 10px;margin-top: -8px;">
							<input type="text" class="layui-input" id="rangedate" placeholder="时间跨度">
						</div>
					</blockquote>
					<div class="page-content">
						<div id='mainTable' style="text-align: center;">
							<div id="treeGrid"></div>
						</div>
					</div>
				</section>
				<!-- 中间部分-main     end -->
			</div>
		</div>
		<!-- 底部       startup  -->
		<%@ include file="../includes/bottom.jsp"%>
		<!-- 底部       end -->

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
		<script type="text/javascript" src="js/plugins/jQuery/table/jqxdata.export.js"></script>
		<script type="text/javascript" src="js/plugins/jQuery/table/jqxcheckbox.js"></script>
		<script type="text/javascript" src="js/plugins/jQuery/table/jqxlistbox.js"></script>
		<script type="text/javascript" src="js/plugins/jQuery/table/jqxdropdownlist.js"></script>
		<script type="text/javascript" src="js/plugins/jQuery/table/localization.js"></script>

		<script src="js/plugins/layui2/layui.js"></script>

		<script src="js/app.min.js"></script>
		<script type="text/javascript" src="js/pages/report/common.js"></script>
		<script type="text/javascript" src="js/pages/report/analysis.js"></script>
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