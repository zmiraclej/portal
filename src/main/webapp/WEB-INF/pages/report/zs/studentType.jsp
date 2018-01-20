<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>招生类型统计</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="/jx-web-portal/js/plugins/bootstrap/css/bootstrap.css" type="text/css">
    <!-- Font Awesome --> 
  <link rel="stylesheet" href="/jx-web-portal/css/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="/jx-web-portal/css/ionicons/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/jx-web-portal/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="/jx-web-portal/css/skins/_all-skins.min.css">
  
  <link rel="stylesheet" href="/jx-web-portal/css/pages/mycss.css">
  <link rel="stylesheet" href="css/pages/standard.css">
  
  <!-- jQuery 2.2.3 -->
<script src="/jx-web-portal/js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="/jx-web-portal/js/plugins/My97DatePicker/WdatePicker.js"></script>


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
					<li><a href="#">招生数据分析</a> <span class="divider"></span></li>
					<li><a href="#">招生类别分析</a> <span class="divider"></span></li>
				</ul>
        	</section>
		<!-- 中间部分-top     end -->
		
		<!-- 中间部分-main     startup -->
            <div class="page-content">
                 <div class="row" style="width: 100%; height: 100%; !important;margin:10px;background-color:white" >
					<div class="chart_title"><span>${schoolName} - 招生类别统计</span></div>
					<div class="btn_container" style="margin-top: 20px;margin-left:20px">
							<label>校区</label>
							<select style="height:34px;width:150px;" id="school">                              
							</select>
							<label>招生计划</label>
							<select style="height:34px;width:180px;" id="zsGrade">
							</select>
							<label>报名起始日期</label>
							<input type="date" style="height: 34px;width: 150px;" class="Wdate" 
									id="beginDate" name="biginDate" value="${beginDate}"
								onFocus="WdatePicker({lang:'zh-cn',readOnly:true,maxDate:new Date(),isShowClear:false})"/>
							
							<label>报名结束日期</label>
							<input type="date" style="height: 34px;width:150px;" class="Wdate"
          							 id="endDate" name="endDate" value="${endDate}"
         						  onFocus="WdatePicker({lang:'zh-cn',readOnly:true,maxDate:new Date(),isShowClear:false})"/>
							<a href="#" class="btn btn-primary"><i class="fa fa-search"></i>&nbsp;查&nbsp;&nbsp;询</a>					
					</div>
						
					<div id="containerEnrol-div" style="height:500px;">	
						<div id="containerEnrol2" style="height: 100%; width: 100%"></div>	
					</div>
			</div>
		</div>
    </div>
	<!-- 底部       startup  -->
	<%@ include file="../../includes/bottom.jsp"%>
	<!-- 底部       end --> 

  <!-- 设置按钮页面       startup -->
   <%@ include file="../../includes/rightSetup.jsp"%>
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery UI 1.11.4 -->
<script src="/jx-web-portal/js/plugins/jQueryUI/jquery-ui.min.js"></script>
<!-- AdminLTE App -->
<script src="/jx-web-portal/js/app.min.js"></script>
<script type="text/javascript" src="js/plugins/echarts/echarts-all-3.js"></script>
<script type="text/javascript" src="js/pages/report/studentType.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript">

$(window).resize(function(){

    if ($(".page-content").width() >= 1080){
		$(".default_pgContainer").css("margin-left", ($(".page-content").width() - 1070) / 2 );
		$("#btn_container").css("margin-right", ($(".page-content").width() - 1060) / 2 );
        $("#input_div").css("margin-left", ($(".page-content").width() - 1094) / 2 );
        $("#page_div").css("margin-right", ($(".page-content").width() - 1080) / 2);
        $(".content-header").css("margin-right", ($(".page-content").width() - 1080) / 2);

    }else {
		$(".default_pgContainer").css("margin-left", 15 );

        $("#btn_container").css("margin-right", 0);
        $("#input_div").css("margin-left", 0);
        $("#page_div").css("margin-right", 0);
        $(".content-header").css("margin-right", 0);

    }
});

$(document).ready(function(){

    if ($(".page-content").width() >= 1080){
		$(".default_pgContainer").css("margin-left", ($(".page-content").width() - 1070) / 2 );
        $("#btn_container").css("margin-right", ($(".page-content").width() - 1060) / 2 );
        $("#input_div").css("margin-left", ($(".page-content").width() - 1100) / 2 );
        $("#page_div").css("margin-right", ($(".page-content").width() - 1080) / 2 );
        $(".content-header").css("margin-right", ($(".page-content").width() - 1060) / 2);

    }else {
		$(".default_pgContainer").css("margin-left", 15 );
		
        $("#btn_container").css("margin-right", 0);
        $("#input_div").css("margin-left", 0);
        $("#page_div").css("margin-right", 0);
        $(".content-header").css("margin-right", 0);

    }
});


</script>
</body>
</html>