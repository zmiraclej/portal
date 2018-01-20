<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>总收支分析</title>
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
<link rel="stylesheet" href="css/pages/incomeExpenditure.css">

<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">
<link rel="stylesheet" href="css/pages/standard.css">
</head>

<body class="hold-transition skin-blue-light sidebar-mini">
<div class="wrapper">
	
	<!-- 头部开始 -->
	<jsp:include page="../../includes/top.jsp" >
		<jsp:param name="userName" value="${userName}" />
	</jsp:include>
	<!-- 头部结束 -->
	
	
	<!-- 左边部分       startup -->
	<jsp:include page="../../includes/left.jsp" >
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
				<li><a href="#">总收支分析</a> <span class="divider"></span></li>
			</ul>
        </section>
	    <!-- 中间部分-top     end -->
	    
	    	<!-- 中间部分-main     startup -->
		    <div class="content">
			<!-- 图表1 -->
				<div class="row"> 
					<div class="col-md-12 col-lg-12">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
							  <ul class="layui-tab-title">
							    <li class="layui-this"><span id="chartTitle"></span></li>
							  </ul>
							  <div class="layui-tab-content">
								  <div class="layui-tab-item layui-show" style="height:400px;overflow-y:auto">
								  	<div class="btn_container" style="height:35px">
										<div style="float:left;height: 35px">
											<select id="incomeExpenditureYear" class="text" style="height: 35px;width:80px">
												<option value="2016">2016</option>
												<option value="2017">2017</option>
											</select>
										</div>
												<div style="float:left;margin-left:10px;width:80px">
					                 	  <button id="return-button" class="layui-btn layui-btn-normal" style="height: 35px;display:none">返回上层</button>
					                    </div>
									</div>
									 <div id="container" style="height: 400px; width: 100%; margin-top:15px">
							      </div>
							  </div>
							</div>
						  </div>
					 </div>
				</div>
				
				<div class="content" id="segementChart" style="display:none">
					<!-- 图表2 -->
					
					<div id="groupIncomeExpenditure2" class="chartArea">
					<div class="chart_title"><span id="chartTitle1"></span></div>
						<div class="btn_container">
							<div style="float:left;height: 35px;">
								<select id="incomeExpenditureYear2" class="text" style="width:80px">
									<option value="2016">2016</option>
									<option value="2017">2017</option>
								</select>
							</div>
							<div style="float:left;margin-left:1px;height: 35px">
									<select id="incomeExpenditureSelect2" class="text" style="width:80px">
										<option value="收入">总收入</option>
										<option value="支出">总支出</option>
									</select>
								</div> 
							<div style="width:100px;height:35px;float:left;margin-left:10px;">
								<button id="return-button2" class="layui-btn layui-btn-normal" style="height: 35px;display:none">返回上层</button>		
							</div>
							
	
						</div>
						<div id="container2" style="height: 400px; width: 100%"></div>
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
<!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>

	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>
<!-- 报表js -->
<script src="js/plugins/echarts/echarts-all-3.js"></script>

<script src="js/pages/report/nc/common.js"></script>
<script src="js/pages/report/nc/incomeExpenditure.js"></script>
<script src="js/pages/report/nc/incomeExpenditure2.js"></script>
</body>
</html>