<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>财务报表</title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
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
<link rel="stylesheet" href="css/pages/financial.css">

<!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
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
			<ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-dashboard"></i> 成绩报表</a></li>
				<li class="">分段统计表</li>
			</ol>
			</section>
			<!-- 中间部分-top     end -->


			<!-- 中间部分-main     startup -->
			<div class="content"> <!--3.3.3.2	财务费用情况表--> <!--图表1：以时间（月份）为维度，显示集团财务柱状图-->

				<div class="charts-container">
					<div class="btn_container" style="margin-right: 10px;">
						<input type="button" id="return-buttonFinancialReport1" value="返回" class="divWidth_fix">
						
						<select id="financialYearReport1" class="divWidth_fix">
							<option value="2017">2017</option>
							<option value="2016">2016</option>
						</select> 
						
						
					</div>
					
					<div class="FinancialReport1-container">
		
						<div id="financialReport1" style="height:500px;">
							<div id="containerFinancialReport1" style="height: 100%; width: 100%"></div>
						</div>
						
					</div>
		
		
					<!--图表2：以板块为维度，显示各板块年度财务费用分布饼图 -->
					<div class="btn_container mtp50">
						<input type="button" id="return-buttonFinancialReport2" value="返回" class="divWidth_fix">
						 
						<select id="financialYearReport2" class="divWidth_fix">
							<option value="2017">2017</option>
							<option value="2016">2016</option>
						</select> 
						
					</div>
					
					<div class="FinancialReport2-container">
		
						<div id="financialReport2" style="height:700px;">
							<div id="containerFinancialReport2"
								style="height: 100%; width: 100%"></div>
						</div>
					</div>
				</div>
			</div>
			<!-- 中间部分-main     end -->
		</div>
		<!-- 底部       startup  -->
		<%@ include file="../../includes/bottom.jsp"%>
		<!-- 底部       end -->

		<!-- 设置按钮页面       startup -->
		<%@ include file="../../includes/rightSetup.jsp"%>
		<!-- 设置按钮页面       end -->
		<div class="control-sidebar-bg"></div>
	</div>
	<!-- ./wrapper -->

	<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>

	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>
	<!-- 报表js -->
	<script src="js/plugins/echarts/echarts-all-3.js"></script>
	<script src="js/pages/report/financialReport1.js"></script>
	<script src="js/pages/report/financialReport2.js"></script>
</body>
</html>