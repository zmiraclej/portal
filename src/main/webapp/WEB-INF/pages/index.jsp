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

<link rel="stylesheet" href="css/pages/mycss.css">
<link rel="stylesheet" href="css/pages/financial.css">

<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">

<link rel="stylesheet" href="css/pages/standard.css">
<link rel="stylesheet" href="js/plugins/unslider/css/unsliderStyle.css">
 
 <link rel="stylesheet" href="js/plugins/unslider/css/unslider.css">
<!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
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
<!-- 				<div class="row"> 
					<div style="background-color:white;margin:15px">
							<a><img src="img/oa.png" style="height:64px;width:64px"></a>
							<a><img src="img/hr.png"  style="height:62px;width:62px"></a>
					</div>
				</div> -->			
				<!-- 轮播图 -->	
					<div style="display:none">
					<%-- <iframe name="oaLoginView" id="oaIndexIframe" src="${ssoOaUrl}"></iframe> --%>
					</div>
					<div class="row"> 
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">图片新闻</li>
						  <a href="#" style="float:right;margin:10px" id="imageMore">更多</a>
						  </ul>
						  <div class="layui-tab-content" id="newsPicDiv">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyNews" style="heigth:250px">
								  	<div class="banner" id="b04">
									    <ul id="newsUi">
									        <!--  <li><a href="#"><img src="images/photo2.png" style="height:220px;width:770px;"></a></li>
									        <li><a href="#"><img src="images/news1.jpg" style="height:220px;width:770px;"></a></li>
									        <li><a href="#"><img src="images/photo4.jpg" style="height:220px;width:770px;"></a></li>  -->
									    </ul>
									    <a href="javascript:void(0);" class="unslider-arrow04 prev"><img class="arrow" id="al" src="images/arrowl.png" alt="prev" width="20" height="35"></a>
									    <a href="javascript:void(0);" class="unslider-arrow04 next"><img class="arrow" id="ar" src="images/arrowr.png" alt="next" width="20" height="37"></a>
									</div>
							  	</ul>
							  </div>
						  </div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title" id="test">
						    <li class="layui-this" id="danweiNewsLi">集团新闻</li>
						   
						  	<a href="" style="float:right;margin:10px" id="danweiNewsMore">更多</a>
						  	
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="danweiNews" style="heigth:260px">
							  	</ul>
							  </div>
		    				  
						  </div>
						</div>
					</div>
				</div>
				
				<div class="row"> 
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">单位最新公告</li>
							<a id="companyGonggaoMore" href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
							  	<ul id="companyGonggao" style="heigth:260px">
							  	</ul>
							  </div>
						  </div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="genzhunSx" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">待办事项</li>
						    <li>跟踪事项</li>
							<a id="shixiangMores" href="#" style="float:right;margin:10px">更多</a>
						  </ul>
						  <div class="layui-tab-content">
							  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto" >
							  	<ul id="daibanshixiang" style="heigth:260px">
							  	</ul>
							  </div>
		    				  <div class="layui-tab-item"  style="height:250px;overflow-y:auto">
							  	<ul id="genzongshixiang" style="heigth:260px">
							  	</ul>
							  </div>
						  </div>
						</div>
					</div>
				</div>
				<div class="row"> 
					<div class="col-md-6 col-lg-6">
						<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
						  <ul class="layui-tab-title">
						    <li class="layui-this">待办公文</li>
						    <li>已办公文</li>
							<!-- <a  id="companyGongwen" href="#" style="float:right;margin:10px">更多</a> -->
						  </ul>
						  <div class="layui-tab-content" style="height:260px;overflow-y:auto">
							  <div class="layui-tab-item layui-show" >
							  	<ul id="daibanGongwen" style="heigth:260px">
							  	</ul>
							  </div>
		    				  <div class="layui-tab-item">
		    				  <ul id="yibanGongwen" style="heigth:260px"></ul>
							  </div>
						  </div>
						</div>
					</div>
				</div>
				<!-- <div class="row">
					<blockquote class="layui-elem-quote" style="background-color:white;margin:15px">
					<span style="font-size:14px">当前财务数据年度：</span>
					<select id="incomeExpenditureYear" class="text" style="height: 30px;width:80px;marign-right:20px">
					</select>
					</blockquote>
				</div> -->
				<div class="row"> 
				    <c:if test="${menuDis.incomeExpenditure}"> 
						<div class="col-md-6 col-lg-6">
							<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
							  <ul class="layui-tab-title">
							    <li class="layui-this">集团年度总收支状况分析</li>
							    <a href="newCwReport" style="float:right;margin:10px">更多</a>
							  </ul>
							  <div class="layui-tab-content">
								  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
									  <div id="groupIncomeExpenditure" class="chartDiv leftChartDiv" style="height:100%">
											<div id="container" style="height: 85%; width: 98%;"></div>
										</div>
									  </div>
							  </div>
							</div>
						  </div>
					  </c:if>
					  <c:if test="${menuDis.profit}">
					   <div class="col-md-6 col-lg-6">
							<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
							  <ul class="layui-tab-title">
							    <li class="layui-this">集团年度盈利分析</li><!-- ;color:#FFBB66 -->
							    <a href="newCwReport" style="float:right;margin:10px">更多</a>
							  </ul>
							  <div class="layui-tab-content">
								  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
									  	<div id="groupGainFee" class="chartDiv rightChartDiv" style="height:100%">
											<div id="containerGainFeeReport1" style="height: 85%; width: 98%;"></div>
										</div>
								  </div>
							  </div>

							</div>
						</div>
					  </c:if>
				</div>
				
				<div class="row"> 
					<c:if test="${menuDis.capital}">
						<div class="col-md-6 col-lg-6">
							<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
							  <ul class="layui-tab-title">
							    <li class="layui-this">集团现金分析</li>
							    <a href="newCwReport" style="float:right;margin:10px">更多</a>
							  </ul>
							  <div class="layui-tab-content">
								  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
										<div id="capital" class="chartDiv leftChartDiv" style="height:100%">
											<div id="containerCapital" style="height: 85%; width: 98%;"></div>
										</div>
								  </div>
							  </div>
							</div>
						</div>
					</c:if>
					
					<c:if test="${menuDis.tax}">
						<div class="col-md-6 col-lg-6">
							<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
							  <ul class="layui-tab-title">
							    <li class="layui-this">集团实际上交税费分析</li>
							    <a href="newCwReport" style="float:right;margin:10px">更多</a>
							  </ul>
							  <div class="layui-tab-content">
								  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
									  	<div  class="chartDiv rightChartDiv" style="height:100%">
											<div id="containerTax" style="height: 85%; width: 98%;"></div>
										</div> 
								  </div>
							  </div>
							</div>
						</div>
					</c:if>
				</div>
				<div class="row"> 
					<c:if test="${menuDis.balanceSheet}">
						<div class="col-md-6 col-lg-6">
							<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color:white">
							  <ul class="layui-tab-title">
							    <li class="layui-this">集团资产/负债分析</li>
							    <a href="newCwReport" style="float:right;margin:10px">更多</a>
							  </ul>
							  <div class="layui-tab-content">
								  <div class="layui-tab-item layui-show" style="height:250px;overflow-y:auto">
									<div id="financeFee" class="chartDiv leftChartDiv"  style="height:100%">
										<div id="containerFinanceFee" style="height:  85%; width: 98%;"></div>
									</div>
								  </div>
							  </div>
							</div>
						</div>
					</c:if>
				</div>
			</section>
			<!-- 中间部分-main     end -->
		</div>
		
		<!-- 底部       startup  -->
		<%@ include file="includes/bottom.jsp"%>
		<!-- 底部       end -->
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

<!-- <script src="js/plugins/unslider/js/unslider-min.js"></script>-->
 <script src="js/plugins/unslider/js/unslider.min.js"></script>
 <script src="js/index.js"></script>
 <script src="js/indexTramsfer.js"></script>


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

<script>
layui.use('element', function(){
  var element = layui.element();
  //初始化给代办事项tab的链接赋值
  $("#shixiangMores").attr("href","http://oa.jxfls.com:8088/seeyon/collaboration/collaboration.do?method=listPending&_resourceCode=F01_listPending");
  element.on('tab(genzhunSx)', function(data){
	  var title=data.elem.context.innerText;
	  if(title=="待办事项"){
		  $("#shixiangMores").attr("href","http://oa.jxfls.com:8088/seeyon/collaboration/collaboration.do?method=listPending&_resourceCode=F01_listPending");
	  }else{
		  $("#shixiangMores").attr("href","http://oa.jxfls.com:8088/seeyon/collaboration/collaboration.do?method=listDone&_resourceCode=F01_listDone");
	  }
	  });
  
});

$(function(){
/*    $("#oaIndexIframe").attr("src",null); */
})

 $(document).ready(function(e) {
	 $("#danweiNews").mouseover(function(){
		 var obj_lis = document.getElementById("danweiNews").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseover = function(){
		            layer.tips(this.innerHTML , this ,{
		            	  tips: [2, '#009688']
		            });
		        }
		    }
		});
	 
	 $("#danweiNews").mouseout(function(){
		 var obj_lis = document.getElementById("danweiNews").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseout = function(){
		            layer.closeAll();
		        }
		    }
		});
	 
	 $("#companyGonggao").mouseover(function(){
		 var obj_lis = document.getElementById("companyGonggao").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseover = function(){
		            layer.tips(this.innerHTML , this ,{tips: [2, '#009688']} );
		        }
		    }
		});
	 $("#companyGonggao").mouseout(function(){
		 var obj_lis = document.getElementById("companyGonggao").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseout = function(){
		            layer.closeAll();
		        }
		    }
		});
	 $("#daibanshixiang").mouseover(function(){
		 var obj_lis = document.getElementById("daibanshixiang").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseover = function(){
		            layer.tips(this.innerHTML , this ,{tips: [2, '#009688']});
		        }
		    }
		});
	 $("#daibanshixiang").mouseout(function(){
		 var obj_lis = document.getElementById("daibanshixiang").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseout = function(){
		            layer.closeAll();
		        }
		    }
		});
	 $("#genzongshixiang").mouseover(function(){
		 var obj_lis = document.getElementById("genzongshixiang").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseover = function(){
		            layer.tips(this.innerHTML , this ,{tips: [2, '#009688']});
		        }
		    }
		});
	 $("#genzongshixiang").mouseout(function(){
		 var obj_lis = document.getElementById("genzongshixiang").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseout = function(){
		            layer.closeAll();
		        }
		    }
		});
	 $("#daibanGongwen").mouseover(function(){
		 var obj_lis = document.getElementById("daibanGongwen").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseover = function(){
		            layer.tips(this.innerHTML , this ,{tips: [2, '#009688']});
		        }
		    }
		});
	 $("#daibanGongwen").mouseout(function(){
		 var obj_lis = document.getElementById("daibanGongwen").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseout = function(){
		            layer.closeAll();
		        }
		    }
		});
	 $("#yibanGongwen").mouseover(function(){
		 var obj_lis = document.getElementById("yibanGongwen").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseover = function(){
		            layer.tips(this.innerHTML , this ,{tips: [2, '#009688']});
		        }
		    }
		});
	 $("#yibanGongwen").mouseout(function(){
		 var obj_lis = document.getElementById("yibanGongwen").getElementsByTagName("span");
		    for(i=0;i<obj_lis.length;i++){
		        obj_lis[i].onmouseout = function(){
		            layer.closeAll();
		        }
		    }
		});
});

</script>
</body>
</html>