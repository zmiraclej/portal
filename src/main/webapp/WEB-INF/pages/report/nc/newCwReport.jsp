<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>财务数据分析</title>
		<!-- Tell the browser to be responsive to screen width -->
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
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
		<link rel="stylesheet" href="css/pages/standard.css">
		<link rel="stylesheet" href="css/pages/report.css">

		<link rel="stylesheet" href="css/jqueryTable/jqx.base.css" type="text/css" />
		<link rel="stylesheet" href="css/jqueryTable/jqx.energyblue.css" type="text/css" />
		<link rel="stylesheet" href="js/plugins/layui2/css/layui.css" media="all">
	</head>

	<body class="hold-transition skin-blue-light sidebar-mini">
		<div class="wrapper">

			<!-- 头部开始 -->
			<jsp:include page="../../includes/top.jsp">
				<jsp:param name="userName" value="${userName}" />
			</jsp:include>
			<!-- 头部结束 -->

			<!-- 左边部分       startup -->
			<jsp:include page="../../includes/left.jsp">
				<jsp:param name="userName" value="${userName}" />
			</jsp:include>
			<!-- 左边部分       end -->

			<div class="content-wrapper">

				<!-- 中间部分-top     startup -->
				<section class="content-header">
					<ul class="breadcrumb">
						<i style="background: url(img/position.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 20px"></i>
						<span>当前位置：</span>
						<li><a href="#">大数据分析</a> <span class="divider"></span></li>
						<li><a href="#">财务数据分析</a> <span class="divider"></span></li>
						<li><a href="#">${reportName}</a> <span class="divider"></span></li>
					</ul>
				</section>
				<!-- 中间部分-top     end -->
				<!-- 中间部分-main     startup -->
				<div class="content">
					<!-- 版块导航 -->
					<ul class="layui-nav" style="background: #fbfbfb; height: 60px; color: #7b6a6a; padding: 0 10px;" lay-filter="demo" id="bankuai">
					</ul>
					<!-- 版块导航 -->
					<section class="content-header">
						<ul class="breadcrumb" id="caozuoBreadCrunb" style="margin-left: -6px;">
							<i style="background-size: auto 90%; height: 100%;"></i>
						</ul>
					</section>
					<div style="height: 50px; width: 100%; background: #FFF; border: 1px solid #c2c2c2; margin: 10px 0px 0px 0px">
						<form class="layui-form" style="float: left; width: 1000px; height: 40px; margin: 4px">
							<div class="layui-form-item">
								<label class="layui-form-label" style="width:85px;padding:9px 9px 9px 0px">当前操作：</label>
								<div class="layui-input-inline" style="display:none">
									<!--<select id="reportType" lay-filter="reportType" style="height: 100%; width: 180px">
										<option value="101">总收支数据分析</option>
										<option value="102">期间费用分析</option>
										<option value="103">资金分析</option>
										<option value="104">盈利分析</option>
										<option value="105">薪酬构成分析</option>
										<option value="106">资产负债分析</option>
										<option value="107">税务状况分析</option>
										<option value="108">预期目标分析</option>
									</select>-->
									<input type="text" class="layui-input" id="reportName" disabled="disabled" value="${reportName}">
								</div>
								<div class="layui-input-inline" style="width: 150px;">
									<input type="text" class="layui-input" id="rangedate" placeholder="时间跨度">
								</div>
								<div class="layui-input-inline" id='compareContent'>
									<select id="compare" lay-filter="compare" style="height: 100%; width: 150px">
										<option value="-9">默认</option>
										<option value="-1">上年同比</option>
									</select>
								</div>
							</div>
						</form>
					</div>
					<div class="row">
						<div class="col-md-12 col-lg-12">
							<div class="layui-tab layui-tab-card" lay-filter="docDemoTabBrief" style="background-color: white">
								<ul class="layui-tab-title">
									<li class="layui-this">图形图表</li>
								</ul>
								<div class="layui-tab-content">
									<div class="layui-tab-item layui-show">
										<div id="container" style="height: 420px; width: 100%; margin-top: 5px"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-12">
							<div class="layui-tab layui-tab-card" lay-filter="docDemoTabBrief" style="background-color: white">
								<ul class="layui-tab-title">
									<li class="layui-this">数据视图</li>
								</ul>
								<div class="layui-tab-content">
									<div class="layui-tab-item layui-show">
										<div id="containerTable" style="height: 420px; width: 100%; margin-top: 5px; overflow-y: auto"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 中间部分-main     end -->
				</div>
			</div>
		</div>
		<!-- 底部       startup  -->
		<%@ include file="../../includes/bottom.jsp"%>
		<!-- 底部       end -->

		<!-- 设置按钮页面       startup -->
		<%@ include file="../../includes/rightSetup.jsp"%>
		<div class="control-sidebar-bg"></div>
		<!-- 设置按钮页面       end -->
		<!-- ./wrapper -->
		<!-- jQuery 2.2.3 -->
		<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
		<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
		<!-- jQuery UI 1.11.4 -->
		<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
		<script src="js/app.min.js"></script>

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

		<!-- 报表js -->
		<script src="js/plugins/echarts/echarts-all-3.js"></script>
		<script src="js/plugins/layer/layer.js" charset="utf-8"></script>
		<script src="js/plugins/layui2/layui.js" charset="utf-8"></script>
		<script src="js/common.js"></script>
		<script src="js/pages/report/common.js"></script>
		<script src="js/pages/report/nc/common.js"></script>
		<script src="js/pages/report/nc/newCwReportEchart.js"></script>
		<script src="js/pages/report/nc/newCwReport.js"></script>
		<script>
		</script>
	</body>

</html>