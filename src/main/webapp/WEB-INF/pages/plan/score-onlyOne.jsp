<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title id="Description">单科成绩</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="css/jqueryTable/jqx.base.css"
	type="text/css" />
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
<link rel="stylesheet" href="css/pages/queryFile.css">
<link rel="stylesheet"
	href="js/plugins/bootstrap-treeview/bootstrap-treeview.min.css">
<link rel="stylesheet"
	href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
<link rel="stylesheet" href="css/pages/report.css">
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


		<div class="content-wrapper">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
				<ol class="breadcrumb">
					<li><a href="#"><i class="fa fa-dashboard"></i>教务管理 </a></li>
					<li class="active">单科成绩</li>
				</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle">

				<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top: 20px">
					<table width="100%">
						<tr>
							<td width="800px">
								<div
									style="height: 600px; width: 100%; background-color: white;">
									<input type="hidden" value="${fileServerPath }" name="fileServerPath" id="fileServerPath">
									<input type="hidden" value="${relativePath }" name="relativePath" id="relativePath">
									<table id="scoreNoticeTable" data-toggle="table">
									
									</table>
								</div>
							</td>
						</tr>
					</table>
				</section>
				<!-- 中间部分-main     end -->
			</div>
		</div>
		<!-- 底部       startup  -->
		<%@ include file="../includes/bottom.jsp"%>
		<!-- 底部       end -->

		<!-- 设置按钮页面       startup -->
		<%@ include file="../includes/rightSetup.jsp"%>
		<!-- 设置按钮页面       end -->
		<div class="control-sidebar-bg"></div>
	</div>

<div id="scoreNoticeToolbar" class="btn-group">
	<div class="layui-input-inline" style="height: 34px;  margin-top: -5px;">
		<select id="classes" class="layui-select" style="height: 34px;">
		    	<c:forEach items="${classes}" var="c">
		    		
					<c:if test="${c.stage eq '1' }">
						<option value="${c.classId }">小学  ${c.className }</option>
						
					</c:if>
					<c:if test="${c.stage eq '2' }">
						<option value="${c.classId }">初中 ${c.className }</option>
					</c:if>
					<c:if test="${c.stage eq '3' }">
						<option value="${c.classId }">高中 ${c.className }</option>
					</c:if>
					
				</c:forEach>
		 </select>
	</div>
	
	<%-- <div class="layui-input-inline" style="height: 34px;  margin-top: -5px;">
		<select id="inses" class="layui-select" style="height: 34px;">
		    	<c:forEach items="${inses}" var="i">
		    		<option value="${i.examInsId }">${i.examInsName }</option>
				</c:forEach>
		 </select>
	</div> --%>

     <div class="layui-btn-group" style="margin-left:10px">
		    
		    <!-- <button id="sumScore"  class="fristBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>成绩汇总计算</button> -->
		    
		    <button id="previewScore"  class="fristBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>成绩预览</button>
			
		    <button id="sendScoreSingle"  class="fristBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>发送成绩通知</button>
		    
  	</div>
</div>

<div id="selectSendType" style="display: none;">
	<form action="">
		<fieldset class="layui-elem-field">
			  <div class="layui-field-box" style="font-weight: bold;">
			&nbsp;&nbsp;&nbsp;&nbsp;  发送类型:&nbsp;&nbsp;
					<input type="checkbox" name="sendTypes" value="1" title="名次">名次&nbsp;&nbsp;
					<input type="checkbox" name="sendTypes" value="2"  title="平均分">平均分&nbsp;&nbsp;
					<input type="checkbox" name="sendTypes" value="3" title="班级最高分">班级最高分&nbsp;&nbsp;
			  </div>
			</fieldset>
	</form>
</div>

	<!-- script -->

	<script type="text/javascript"
		src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
	<!-- ./wrapper -->
	<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
	<script type="text/javascript" src="js/plugins/layui/layui.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<!-- Latest compiled and minified JavaScript -->
	<script
		src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
	<!-- Latest compiled and minified Locales -->
	<script
		src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>
	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>
	<!-- 模板js -->
	<script src="js/pages/plan/score-singer.js"></script>

</body>
</html>