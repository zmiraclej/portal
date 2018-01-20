<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title id="Description">考次管理</title>
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
<script>
var eduType = new Array();
function initEduType(k,v){
	var param = {
			key:k,
			value:v
	}
	eduType.push(param);
}

</script>
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
					<li class="active">考次管理</li>
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
									<table id="examInsTable" data-toggle="table">
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

	<!-- 工具按钮栏  -->
	<div id="examInsToolbar" class="btn-group">
		
		<div class="layui-btn-group" style="margin-left: 10px">
		
			<button id="addExamInsBtn" class="fristBtnDes">
				<li class="btnIconCss"><img
					src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>创建
			</button>
		
			<button id="deleteExamInsBtn" class="fristBtnDes">
				<li class="btnIconCss"><img
					src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>删除
			</button>
			
			<!-- <button id="delScoreBtn" class="fristBtnDes ">
				<li class="btnIconCss"><img
					src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>删&nbsp;除
			</button> -->
		</div>
	</div>


	<!-- 新增模板弹框 -->
	<div id="examInsAddContent"
		style="display: none; width: 100%; height: 90%">
		<form class="layui-form" action="">
			<label>校区:</label>
			<select id="school" name="school" onChange="selectSchool()">
				<option value="-1">--------请选择校区--------</option>
				<option value="2,3,4,5">锦江校区</option>
				<option value="7,8,9">成华校区</option>
				<option value="11,12,13">郫县校区</option>
				<option value="15,16,17">北城校区</option>
				<option value="19,20,21">达州校区</option>
			</select>
		</form>
		
		<form action="createExamIns" method="post" id="form">
				<table class="table table-striped">
					<tr>
						<td class="col-md-3">
							<label>校区:</label>
							<select id="school" name="school" onChange="selectSchool()">
								<option value="-1">--------请选择校区--------</option>
								<option value="2,3,4,5">锦江校区</option>
								<option value="7,8,9">成华校区</option>
								<option value="11,12,13">郫县校区</option>
								<option value="15,16,17">北城校区</option>
								<option value="19,20,21">达州校区</option>
							</select>
						</td>
						<td  class="col-md-3"> 
							<label>学部:</label>
							<select id="stage" name="stage" onChange="selectGrade()">
							<option value="-1">--------请选择学部--------</option>
							</select>
						</td>
						<td  class="col-md-3">
							<label>年级:</label>
							<select id="grade" name="grade">
								<option value="-1">--------请选择年级--------</option>
							</select>
						</td>
						<td  class="col-md-3">
							<label>学年:</label>
							<select id="schoolYear" name="schoolYear">
								<option value="-1">--------请选择学年--------</option>
								<c:forEach var="schoolYear" items="${schoolYearList}">
								<option value="${schoolYear.code}">${schoolYear.name}</option>
								</c:forEach>
							</select>
						</td>
					</tr>
					
					<tr>
						<td  class="col-md-3">
							<label>学期:</label>
							<select id="term" name="term">
								<option value="-1">--------请选择学期--------</option>
								<c:forEach var="term" items="${schoolTermList}">
								<option value="${term.code}">${term.name}</option>
								</c:forEach>
							</select>
						</td>
						<td  class="col-md-3">
							<label>考试类别:</label>
							<select id="type" name="type">
								<option value="-1">-------请选择考试类别-------</option>
								<c:forEach var="type" items="${examTypeList}">
								<option value="${type.code}">${type.name}</option>
								</c:forEach>
							</select>
						</td>
						<td  class="col-md-3">
							<label>考试序列(选填):</label>
							<select id="seq" name="seq">
								<option value="-1">------请选择考试序列------</option>
								<c:forEach var="examSeq" items="${examSeqList}">
								<option value="${examSeq.code}">${examSeq.name}</option>
								</c:forEach>
							</select>
						</td>
					</tr>
					
					<tr>
						<td>
							<label>考试时间:</label>
							<select id="examYear" name="examYear">
								<option value='-1'>--------请选择年份--------</option>
								<option value="2017">2017</option>
								<option value="2018">2018</option>
								<option value="2019">2019</option>
							</select>
							年
						</td>
						<td>
							<label>--------</label>
							<select id="examMonth" name="examMonth">
								<option value="-1">--------请选择月份--------</option>
								<option value="01">1</option>
								<option value="02">2</option>
								<option value="03">3</option>
								<option value="04">4</option>
								<option value="05">5</option>
								<option value="06">6</option>
								<option value="07">7</option>
								<option value="08">8</option>
								<option value="09">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>月
						</td>
						<td>
							
						</td>
						<td>
							 
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<label>考次名称:</label>
							<input type="text" style="width:500px;height:34px" readonly="readonly" id="examName" name="examName">	
						</td> 
					</tr>
				</table>		
			</form>
			<button class="btn btn-primary" onClick="add()">确认添加</button>
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
	<script type="text/javascript"
		src="js/plugins/bootstrap-treeview/bootstrap-treeview.min.js"></script>
	<!-- Latest compiled and minified JavaScript -->
	<script
		src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
	<!-- Latest compiled and minified Locales -->
	<script
		src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>
	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>
	<!-- 模板js -->
	<script src="js/pages/plan/score-examins-list.js"></script>

	<!-- 自定义script -->
	<script type="text/javascript">
	$(function(){

	});

	</script>

</body>
</html>