<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title id="Description">教师模板管理</title>
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
					<li><a href="#"><i class="fa fa-dashboard"></i>计划管理 </a></li>
					<li class="active">教师模板管理</li>
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
									<table id="templatesTable" data-toggle="table">
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
	<div id="templatesToolbar" class="btn-group">
		<%-- <div class="layui-input-inline"
			style="height: 34px; margin-top: -5px;">
			<select id="searchType" class="layui-select" style="height: 34px;">
				<option value="">--全部--</option>
				<c:forEach items="${eduType}" var="e">
				<option value="${e.key}">${e.value}</option>
				</c:forEach>
			</select>
		</div> --%>
		<div class="layui-btn-group" style="margin-left: 10px">
			<button id="addTemplate" class="fristBtnDes">
				<li class="btnIconCss"><img
					src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>新增计划
			</button>
			<!-- <button id="updateTemplate" class="fristBtnDes ">
				<li class="btnIconCss"><img
					src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>修&nbsp;改
			</button> -->
			<button id="delTemplate" class="fristBtnDes ">
				<li class="btnIconCss"><img
					src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>删&nbsp;除
			</button>
		</div>
	</div>


	<!-- 新增模板弹框 -->
	<div id="templateAddContent"
		style="display: none; width: 100%; height: 90%">
		<form class="layui-form" action="">
			<div class="layui-form-item" style="margin-top: 10px">
				<label class="layui-form-label" style="width: 120px">学年:</label>
				<div class="layui-input-inline">
					<select id="_year" name="year">
						<c:forEach items="${schoolYear}" var="s">
							<option value="${s.key}">${s.value}</option>
						</c:forEach>
					</select>
				</div>
			</div>

			<div class="layui-form-item ">
				<label class="layui-form-label" style="width: 120px">学期:</label>
				<div class="layui-input-inline">
					<select id="_term" name="term">
						<c:forEach items="${schoolTerm}" var="s">
							<option value="${s.key}">${s.value}</option>
						</c:forEach>
					</select>
				</div>
			</div>
			<div class="layui-form-item ">
				<label class="layui-form-label" style="width: 120px">计划类型:</label>
				<div class="layui-input-inline">
					<select id="_type" name="type">
						<c:if test="${eduType != null  && fn:length(eduType) > 0 }">
							<c:forEach items="${eduType }" var="e">
								<option value="${e.key}">${e.value}</option>
							</c:forEach>
						</c:if>
						<c:if test="${eduType == null || fn:length(eduType) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
						
					</select>
				</div>
			</div>
			<c:forEach items="${eduType }" var="e">
				<script>initEduType('${e.key}','${e.value}');</script>
			</c:forEach>
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">学校名称:</label>
				<div class="layui-input-inline">
					<select id="_schoolCode"  lay-filter="test" name="schoolCode">
						<c:forEach items="${schools}" var="school">
							<option stage="${school.stage }" value="${school.schoolCode}">${school.schoolName}</option>
						</c:forEach>
					</select>
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">学部:</label>
				<div class="layui-input-inline" id="stageText">
	
						<c:if test="${defaultStage eq '1'}">
								小学
							</c:if>
							<c:if test="${defaultStage eq '2'}">
								初中
							</c:if>
							<c:if test="${defaultStage eq '3'}">
								高中
							</c:if>
							<input id="stage" name="stage" type="hidden" value="${defaultStage }">
				</div>
			</div>
			
			<div class="layui-form-item" id="grade_div">
				<label class="layui-form-label" style="width: 120px">年级:</label>
				<div class="layui-input-inline">
					<select id="_grade" lay-filter="grade" name="grade">
						<c:forEach items="${grades}" var="g">
							<option stage="${g.stage}" value="${g.grade}"> ${g.grade} 年级</option>
		
						</c:forEach>
					</select>
				</div>
			</div>
			
			<div class="layui-form-item" id="course_div">
				<label class="layui-form-label" style="width: 120px">课程:</label>
				<div class="layui-input-inline">
					
					
						<select id="_course" name="course">
							<c:if test="${courses != null  && fn:length(courses) > 0 }">
							<c:forEach items="${courses}" var="c">
								<option value="${c.courseCode}">${c.courseName}</option>
							</c:forEach>
							</c:if>
							<c:if test="${courses == null || fn:length(courses) == 0 }">
								<option value="-1">-- 空 --</option>
							</c:if>
						</select>
					
					
					
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">模板上传:</label>
				<div class="layui-upload">
					<input id="fileExcel" type="file" name="files" lay-type="file" class="layui-upload-file">
					<input id="_url" type="hidden" name="url" lay-verify="fileUrl">
					<span id="successFileShow" style="color:green"></span>
				</div>
			</div>
			<input type="hidden" id="_status" name="status" value="0">
			<div class="layui-form-item">
		    <div class="layui-input-block">
		      <button class="layui-btn" lay-submit lay-filter="formDemo" onclick="changeVerify(0);">立即提交</button>
		      <button class="layui-btn layui-btn-primary" lay-submit lay-filter="formDemo2" onclick="changeVerify(-1);">保存</button>
		    </div>
		  </div>
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
	<script src="js/pages/plan/teacherTemplates.js"></script>

	<!-- 自定义script -->
	<script type="text/javascript">
	$(function(){
		//initSelectData('${info}');
		
	});
		//条件搜索
		/* $("#searchType").change(function() {
			$('#templatesTable').bootstrapTable('refresh', getTParam());
		}); */
		//清空表单
		function resetForm(){
			$('#successFileShow').html("");
			$('#_url').val("");
	     }
		function changeVerify(status){
			$('#_status').val(status);
		}

	</script>

</body>
</html>