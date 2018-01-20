<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理分析</title>
  <!-- Tell the browser to be responsive to screen width -->
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
  <link rel="stylesheet" href="css/pages/enrollDetail.css">
    <link rel="stylesheet" href="css/pages/standard.css">
 <link rel="stylesheet" href="css/pages/mycss.css">
  <!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>

<!-- layer -->
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/common.js"></script>



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
	
	<div class="content-wrapper">
		<!-- 中间部分-top     startup -->
		    <section class="content-header">
            	<ul class="breadcrumb">
					<i style="background: url(img/position.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 20px"></i>
					<span>当前位置：</span>
					<li><a href="#">大数据分析</a> <span class="divider"></span></li>
					<li><a href="#">招生数据分析</a> <span class="divider"></span></li>
					<li><a href="#">录取数据分析</a> <span class="divider"></span></li>
				</ul>
        	</section>
		<!-- 中间部分-top     end -->
		
		<!-- 中间部分-main     startup -->

            <div class="page-content">
                 <div class="row" style="width: 100%; height: 100%; !important;margin:10px;background-color:white" >
                        <div class="chart_title"><span>${schoolName} - 录取状况明细</span></div>
                        <div id="btn_div">
                              <ul class="input-ul">
                                	   
                               		 <%-- <label>校区</label>
                                     <select style="height:34px;width:150px;" id="school">                              
	                                     <option value="-1">全部</option>
	                                     <c:forEach var="school" items="${schoolList}">
	                                     <option value="${school.schoolId}">${school.schoolName}</option>
										 </c:forEach>
                                     </select> --%>
                               <li> 
                                     <label>招生类型</label>
                                     <select style="height:34px;width:150px" id="schedule">
                                        <option value="全部">全部</option>
                                       	 <%-- <c:forEach var="scheduleType" items="${scheduleTypeList}">
	                                     <option value="${scheduleType}">${scheduleType}</option>
										 </c:forEach> --%>
										<option value="初一">小升初</option>
										<option value="高一">初升高</option>
                                     </select>
                                     <span>&nbsp;&nbsp;&nbsp;</span> 
                                </li>
                                
                                    <!-- 起始日期默认设置为一个月前 --> 
                                <li>       
									<label>报名起始日期</label>
									<input type="date" style="height: 34px;width: 150px;" class="Wdate" 
									id="beginDate" name="biginDate" value="${defaultBeginDate}"
								onFocus="WdatePicker({lang:'zh-cn',readOnly:true,maxDate:new Date(),isShowClear:false})"/>
									<span>&nbsp;&nbsp;&nbsp;</span>
								</li>
									<!-- 结束日期默认设置为今天 -->
								<li>
									<label>报名结束日期</label>
									<input type="date" style="height: 34px;width:150px;" class="Wdate"
          							 id="endDate" name="endDate" value="${defaultEndDate}"
         						  onFocus="WdatePicker({lang:'zh-cn',readOnly:true,maxDate:new Date(),isShowClear:false})"/>
									<a href="#" class="btn btn-primary" onclick="searchRecords()"><i class="fa fa-search"></i>&nbsp;查&nbsp;&nbsp;询</a>
                               	</li>
                               	</ul>
                            </div>  
                    <div style="display: none">
                        <input name="edit_serial"/>
                    </div>
                    <div style="overflow:auto;width:100%; height:650px;">
                        <table id="mailTable" class="table table-striped table-bordered table-hover sx-table" style="width:1080px;max-height:650px;margin: auto; margin-top: 10px;">
                            <thead style="width:1080px">
                            <tr style="width:1080px">
                            	<th>序号</th>
                            	<th>校区</th>
                            	<th>招生计划</th>
                            	<th>报名人数</th>
                                <th>审核通过人数</th>                 
                                <th>参测人数</th>
                                <th>录取人数</th>           
                                <th>缴费人数</th>
                          		<th>操作</th>                          
                            </tr>
                            </thead>
                            <tbody id="data" >                                  
                            </tbody>
                        </table>                        
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

<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>

<script src="js/pages/report/enrollDetail.js"></script>
<script src="js/plugins/My97DatePicker/WdatePicker.js"></script>

<script type="text/javascript">

$(window).resize(function(){

    if ($(".page-content").width() >= 1080){

        $("#btn_div").css("margin-left", ($(".page-content").width() - 1080) / 2);
        $(".content-header").css("margin-right", ($(".page-content").width() - 1105) / 2);

    }else {

        $("#btn_div").css("margin-left", 0);
        $(".content-header").css("margin-right", 0);

    }
});

$(document).ready(function(){

    if ($(".page-content").width() >= 1080){
        $("#btn_div").css("margin-left", ($(".page-content").width() - 1080) / 2 );
        $(".content-header").css("margin-right", ($(".page-content").width() - 1105) / 2);

    }else {
		
        $("#btn_div").css("margin-left", 0);
        $(".content-header").css("margin-right", 0);

    }
});

</script>
</body>
</html>