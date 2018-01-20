<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>嘉祥信息化系统门户</title>
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
  
  <link rel="stylesheet" href="js/plugins/layui/css/layui.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">
  <link rel="stylesheet" href="css/pages/standard.css">
  <link rel="stylesheet" href="css/pages/mycss.css">
  <link rel="stylesheet" href="js/plugins/unslider/css/unslider.css">
    <link rel="stylesheet" href="js/plugins/unslider/css/unslider-dots.css">
  <!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>

   <style>
   		.chartDiv {
   			background-color:white;
   		}
   		
   		.banner { position: relative; overflow: auto; }
    .banner li { list-style: none; }
        .banner ul li { float: left; }
        
        ul, ol { padding: 0;}
		.banner { position: relative; overflow: auto; text-align: center;}
		.banner li { list-style: none; }
		.banner ul li { float: left; }
		#b04 { width: 640px;}
		#b04 .dots { position: absolute; left: 0; right: 0; bottom: 20px;}
		#b04 .dots li 
		{ 
		    display: inline-block; 
		    width: 10px; 
		    height: 10px; 
		    margin: 0 4px; 
		    text-indent: -999em; 
		    border: 2px solid #fff; 
		    border-radius: 6px; 
		    cursor: pointer; 
		    opacity: .4; 
		    -webkit-transition: background .5s, opacity .5s; 
		    -moz-transition: background .5s, opacity .5s; 
		    transition: background .5s, opacity .5s;
		}
		#b04 .dots li.active 
		{
		    background: #fff;
		    opacity: 1;
		}
		#b04 .arrow { position: absolute; top: 200px;}
		#b04 #al { left: 15px;}
		#b04 #ar { right: 15px;}
   </style>
</head>

<body class="hold-transition skin-blue-light sidebar-mini">
	<div class="wrapper">

		<!-- 头部开始 -->
		<jsp:include page="includes/top.jsp">
			<jsp:param name="userName" value="${userName}" />
		</jsp:include>
		<!-- 头部结束 -->


		<!-- 左边部分       startup -->
		<jsp:include page="includes/left.jsp">
			<jsp:param name="userName" value="${userName}" />
		</jsp:include>

		<!-- 左边部分       end -->
		<div class="content-wrapper">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
				<ul class="breadcrumb">
				    <i style="background:url(img/position.png) no-repeat;background-size:auto 90%;height:100%;padding-left:20px"></i>
				    <span>当前位置：</span>
				    <li><a href="#">首页</a> <span class="divider"></span></li>
				</ul>
			</section>
			<!-- 中间部分-top     end -->
			
			 <section class="content">
				<!-- 中间部分-main     startup -->
				<div class="row"> 
					<div style="background-color:white;margin:15px">
							<a><img src="img/oa.png" style="height:64px;width:64px"></a>
							<a><img src="img/hr.png"  style="height:62px;width:62px"></a>
					</div>
				</div>
				
				<div class="row"> 
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">图片新闻</li>
						    <a href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyNews" style="heigth:260px">
								  	<div class="banner" id="b04">
									    <ul>
									        <li><a href="#"><img src="images/photo2.png" style="height:220px;"></a></li>
									        <li><img src="images/news1.jpg" style="height:220px;"></li>
									         <li><img src="images/photo4.jpg" style="height:220px;"></li>
									    </ul>
									    <a href="javascript:void(0);" class="unslider-arrow04 prev"><img class="arrow" id="al" src="arrowl.png" alt="prev" width="20" height="35"></a>
									    <a href="javascript:void(0);" class="unslider-arrow04 next"><img class="arrow" id="ar" src="arrowr.png" alt="next" width="20" height="37"></a>
									</div>
							  	</ul>
							  </div>
						  </div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">单位新闻</li>
						    <li>行业新闻</li>
						    <a href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyNews" style="heigth:260px">
							  	</ul>
							  </div>
		    				  <div class="layui-tab-item">2</div>
						  </div>
						</div>
					</div>
				</div>
				
				<div class="row"> 
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">我的模板</li>
						    <a href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="myTemplate" style="heigth:260px">
									<li><a href="http://oa.cdwtrj.com:8088/seeyon/collaboration/collaboration.do?method=newColl&templateId=-662222587760653755" target="_blank">请假申请单</a></li>
							   </ul>
							  </div>
						  </div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">单位最新公告</li>
						    <a href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyNews" style="heigth:260px">
							  	</ul>
							  </div>
		    				  <div class="layui-tab-item">2</div>
						  </div>
						</div>
					</div>
				</div>
				<div class="row"> 
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">待办事项</li>
						    <li>跟踪事项</li>
						    <a href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyNews" style="heigth:260px">
							  	</ul>
							  </div>
		    				  <div class="layui-tab-item">2</div>
						  </div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">待办公文</li>
						    <li>已办公文</li>
						    <a href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyNews" style="heigth:260px">
							  	</ul>
							  </div>
		    				  <div class="layui-tab-item">2</div>
						  </div>
						</div>
					</div>
				</div>
				<div class="row"> 
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">待办事项</li>
						    <li>跟踪事项</li>
						    <a href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyNews" style="heigth:260px">
							  	</ul>
							  </div>
		    				  <div class="layui-tab-item">2</div>
						  </div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">待办公文</li>
						    <li>已办公文</li>
						    <a href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyNews" style="heigth:260px">
							  	</ul>
							  </div>
		    				  <div class="layui-tab-item">2</div>
						  </div>
						</div>
					</div>
				</div>
				
				<div style="height:300px"><img src="http://oa.cdwtrj.com:8088/seeyon/commonimage.do?method=showImage&amp;id=7218204177318691612&amp;size=custom&amp;h=208&amp;w=1334"></div>
				<!--3.3.1	--------------------------------------------------------------------------------收支情况表-->
				<div style="display:none;height:100px;width:600px">
				   <iframe name="export" id="oaIndexIframe" src="http://oa.cdwtrj.com:8088/seeyon/index.jsp"></iframe>
				</div>
				<div id="newsDiv" style="margin:20px;background:white;height:300px">
					
				</div>
				     
				<%-- <c:if test="${menuDis.nc}"> --%>
				<div class="charts-div">
					<%-- <c:if test="${menuDis.incomeExpenditure}"> --%>
					<div id="groupIncomeExpenditure" class="chartDiv leftChartDiv">
						<div class="btn_container">
							<div style="float:left;height: 35px;margin-left:20px">
								<span>集团年度总收支状况分析</span>
							</div>
							
							<div style="float:right;margin-right:10px;width:80px">
		                 	  <button id="return-button-incomeExpend" class="layui-btn layui-btn-normal" style="height: 35px;display:none">返回上层</button>
		                    </div>
		                    
							<div style="float:right;height: 35px;margin-right:10px">
								<select id="incomeExpenditureYear" class="text" style="height: 35px;width:80px">
									<option value="2016">2016</option>
									<option value="2017">2017</option>
								</select>
							</div>
						</div>
						
						<div id="container" style="height: 85%; width: 100%;clear: left"></div>
					</div>
				<%-- 	</c:if> --%>
					
					<!--3.3.2	盈利情况表-->
					<%-- <c:if test="${menuDis.profit}"> --%>
					<div id="groupGainFee" class="chartDiv rightChartDiv">
						<div class="btn_container">
							<div style="float:left;height: 35px;margin-left:20px">
								<span>集团年度盈利分析</span>
							</div>
							
							<div style="float:right;margin-right:10px;width:80px">
		                 	  <button id="return-buttonGainFeeReport1" class="layui-btn layui-btn-normal" style="height: 35px;display:none">返回上层</button>
		                    </div>
							
							<div style="float:right;height: 35px;margin-left:20px">
								<select id="groupGainFeeYearReport1" class="text" style="height: 35px;width:80px">
									<option value="2016">2016</option>
									<option value="2017">2017</option>
								</select>
							</div>
							
						</div>
						<div id="containerGainFeeReport1" style="height: 85%; width: 100%;clear: left"></div>
					</div>
				<%-- 	</c:if> --%>
					
					<!--3.3.5	资金报表-->
					<c:if test="${menuDis.capital}">
					<div id="capital" class="chartDiv leftChartDiv">
					<div class="btn_container">
						<div style="float:left;height: 35px;margin-left:20px"><span>集团现金分析</span></div>
						<div style="float:right;margin-left:10px;width:80px;margin-right:20px">
	                 	  <button id="return-buttonCapital" class="layui-btn layui-btn-normal" style="height: 35px;display:none">返回上层</button>
	                    </div>
	                    	
					</div>
						<div id="containerCapital" style="height: 85%; width: 100%;clear: left"></div>
					</div>
					</c:if>
					
				
					
					<!--3.3.4	税务表-->
					<%--  <c:if test="${menuDis.tax}">  --%>
					<div  class="chartDiv rightChartDiv">
						<div class="btn_container">
							<div style="float:left;height: 35px;margin-left:20px"><span>集团实际上交税费分析</span></div>
							<div style="float:right;margin-left:10px;width:80px">
		                 	  <button id="return-buttonTax" class="layui-btn layui-btn-normal" style="height: 35px;display:none">返回上层</button>
		                    </div>
							
							<div style="float:right;height: 35px;margin-left:20px">
								<select id="taxYear" class="text" style="height: 35px;width:80px">
								 	<option value="2016">2016</option>
									<option value="2017">2017</option> 
								</select>
							</div>
						</div>
						<div id="containerTax" style="height: 85%; width: 100%;clear: left"></div>
					</div> 
					 <%-- </c:if>  --%>
					 
							
					<!--3.3.3	资产负债表-->
					<%-- <c:if test="${menuDis.balanceSheet}"> --%>
					<div id="financeFee" class="chartDiv leftChartDiv" style="height: 400px;">
						<div class="btn_container">
						    <div style="float:left;height: 35px;margin-left:20px"><span>集团资产/负债分析</span></div>
							
							<div style="float:right;margin-right:10px;width:80px">
		                 	  <button id="return-buttonFinanceFee" class="layui-btn layui-btn-normal" style="height: 35px;display:none">返回上层</button>
		                    </div>
							
							<div style="float:right;height: 35px;margin-right:10px">
								<select id="financeFeeYear" class="text" style="height: 35px;width:80px">
									<!-- <option value="2016">2016</option>
									<option value="2017">2017</option> -->
								</select>
							</div>

						</div>
						<div id="containerFinanceFee" style="height: 365px; width: 100%;clear: left"></div>
					</div>
				<%-- 	</c:if> --%>
				</div>
				<%-- </c:if> --%>
			
			</section>
			<!-- 中间部分-main     end -->
		</div>
		
		<!-- 底部       startup  -->
		<%@ include file="includes/bottom.jsp"%>
		<!-- 底部       end -->

		<!-- 设置按钮页面       startup -->
		<%@ include file="includes/rightSetup.jsp"%>
		<!-- 设置按钮页面       end -->
		<div class="control-sidebar-bg"></div>
	</div>
<!-- ./wrapper -->

<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script src="js/plugins/layui/layui.js"></script>

<script src="js/pages/report/nc/common.js"></script>
<!-- AdminLTE App -->
<script src="js/app.min.js"></script>
<!-- 报表js -->
<script src="js/plugins/echarts/echarts-all-3.js"></script>

<script src="js/plugins/unslider/js/unslider-min.js"></script>

<!--  <script src="js/index.js"></script> --> 


<%--  <c:if test="${menuDis.balanceSheet}">
<script src="js/pages/report/nc/balanceSheet.js"></script>
</c:if>
<c:if test="${menuDis.incomeExpenditure}">
<script src="js/pages/report/nc/incomeExpenditure.js"></script>
</c:if>
<c:if test="${menuDis.tax}">
<script src="js/pages/report/nc/tax.js"></script>
</c:if>
<c:if test="${menuDis.capital}">
<script src="js/pages/report/nc/capital.js"></script>
</c:if>
<c:if test="${menuDis.profit}">
<script src="js/pages/report/nc/profit.js"></script>
</c:if> --%>  
</body>
<script>
//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function(){
  var element = layui.element();
  
});

$(function(){
   $("#oaIndexIframe").attr("src",null);
})

$(document).ready(function(e) {
    var unslider04 = $('#b04').unslider({
        dots: true
    }),
    data04 = unslider04.data('unslider');
     
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });
});

</script>

</html>