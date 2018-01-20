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

<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">

<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">
<link rel="stylesheet" href="css/pages/standard.css">

<!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>

<style>
			.buttons {
                position:relative
            }
            .button,.iconbutton {
                height:30px;
                border-radius:2px;
                background-color:#ff8762;
                line-height:30px;
                text-align:center;
                color:#fff;
                width:inherit;
                font-size:13px;
                font-family:微软雅黑;
                min-width:80px;
                cursor:pointer
            }
            .buttonDisabled {
                padding:6px 15px 7px 15px;
                background-color:#eee;
                color:#656565;
                height:30px;
                border-radius:2px;
                line-height:30px;
                text-align:center;
                width:inherit;
                font-size:13px
            }
            .button {
                padding:6px 15px 7px 15px
            }
            .iconbutton {
                padding:6px 15px 7px 30px
            }
            .button:hover,.iconbutton:hover {
                background-color:#f0724a
            }

            a {
                text-decoration: none;
            }
            a:hover {
                text-decoration: none;
                color:white;
            }

</style>
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
					<li><a href="#">成绩数据分析</a> <span class="divider"></span></li>
					<li><a href="#">均分统计</a> <span class="divider"></span></li>
				</ul>
       		</section>
			<!-- 中间部分-top     end -->
			
			<!-- 中间部分-main     startup -->
			<div class="content">
			<!-- 图表1 -->
					<div id="groupIncomeExpenditure" class="chartArea">
						 <div class="chart_title"><span>均分统计表</span></div>
						 <div class="btn_container" style="width:500px">
							<div style="float:left;height: 35px">
								<select style="width: 300px; height: 35px;padding-left: 1px;" id="examIns">
				               		
				               </select>
							</div>
							<div style="float:left;margin-left:10px;width:80px">
		                 	  <button id="backParent" class="layui-btn layui-btn-normal" style="height: 35px">返回上层</button>
		                    </div>
						</div>
					
						<div id="junfenTongjiChart" style="height: 400px; width: 100%; margin-top:15px"></div>
					</div>
				</div>
			
			<!-- 中间部分-main     end -->
		</div>
		
		<div id="studentScore" style="disply:none;width:100%;height:100%">
			
			<div style="float:left;width:200px;height:100%;padding-left:5px;font-size:15px">
				<div style="width:200px;height:35px;padding-left:5px;font-size:15px;display:block;">
					  <a class="button" id="toStudentScoreReport" href="toStudentScoreReport" target="_blank" style="float:left;width:100px;height: 35px;margin-top:5px;">成绩报告</a> 
					  <a class="button" id="toStudentKnowledgeReport" href="toStudentKnowledgeReport" target="_blank" style="float:left;margin-left:5px;height: 35px;width:65px;margin-top:5px;"><span>知识点</span></a>
	            </div>
            	<div  style="margin-top:10px;text-align:left">
            		<span id="studentName"><b>陈澎</b> 同学:</span>
            	</div>
				<p style="margin-top:5px">
				你的 <b><font color="green"><span id="subjectName">英语</span></font></b> 优秀,请继续保持。
				</p>
				<p style="margin-top:5px">
				你的 <b><font color="red">听力</font></b> 有待提高。
				</p>
				<p style="margin-top:5px">
				你的 <b><font color="green">语言知识/阅读/写作</font></b> 优秀,请继续保持。
				</p>
				<p style="margin-top:5px">
				你的 <b><font color="green">应用/理解/掌握</font></b> 优秀,请继续保持。
				</p>
			</div>
			<div id="personScoreRadar" style="float:left;width:400px;height:100%">
				
			</div>
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
	<script src="js/pages/report/score/junfenTongji.js"></script>
</body>
</html>