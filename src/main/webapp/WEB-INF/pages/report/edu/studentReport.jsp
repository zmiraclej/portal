<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>学校经营报表</title>
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


<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">
<link rel="stylesheet" href="css/pages/standard.css">

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
				<ul class="breadcrumb">
					<i style="background: url(img/position.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 20px"></i>
					<span>当前位置：</span>
					<li><a href="#">大数据分析</a> <span class="divider"></span></li>
					<li><a href="#">人员数据分析</a> <span class="divider"></span></li>
					<li><a href="#">学生数据分析</a> <span class="divider"></span></li>
				</ul>
			</section>
			<!-- 中间部分-top     end -->
			
			<!-- 中间部分-main     startup -->
			
			<div class="content">
			<!-- 图表1 -->
					<div id="charts-container" class="chartArea">
						 <div class="chart_title"><span>学生数据统计分析</span></div>
						 <div class="btn_container">
							<div style="float:left;margin-left:10px;width:80px">
		                 	  <button id="returnBtn" class="layui-btn layui-btn-normal" style="height: 35px;display:none">返回上层</button>
		                    </div>
						</div>
						<div id="renyuanTongjiChart" style="height: 400px; width: 100%; margin-top:15px"></div>
					</div>
				</div>
			
			<!-- 中间部分-main     end -->
		</div>
		<div id="hrefOption" style="display:none;margin-left:auto;margin-right:auto;width:500px">
			<form class="layui-form" action="">
			   <div class="layui-form-item">
			  		<div class="layui-input-block" style="magin-top:20px">
			     		<label class="">请选择数据分析维度</label>
				    </div>
				    <div class="layui-input-block">
				      <input type="radio" name="sex" value="1" title="年级" checked="">
				      <input type="radio" name="sex" value="1" title="性别">
				       <input type="radio" name="sex" value="3" title="生源地">
				    </div>
			  </div>
			  
			  <div class="layui-form-item">
			    <div class="layui-input-block">
			      <button class="layui-btn" lay-submit="" lay-filter="demo1">查看</button>
			      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
			    </div>
			  </div>
		  </form>
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
	<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>
	<script src="js/plugins//layui/layui.js"></script>
	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>
	<!-- 报表js -->
	<script src="js/plugins/echarts/echarts-all-3.js"></script>
	<script src="js/pages/report/edu/studentReport.js"></script>
</body>
</html>