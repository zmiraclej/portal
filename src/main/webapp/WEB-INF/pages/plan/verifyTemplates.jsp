<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title id="Description">计划管理</title>
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
					<li class="active">计划审核</li>
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
		<div class="layui-input-inline" style="height: 34px;  margin-top: -5px;">
			学校:
			<select id="searchSchoolCode" class="layui-select" style="height: 34px;">
				<option value="">--全部--</option>
				 <c:forEach items="${schools}" var="s">
					<option value="${s.code}">${s.name}</option>
				</c:forEach> 
			</select>
			学年:
			<select id="searchSchoolYear" class="layui-select" style="height: 34px;">
				<option value="">--全部--</option>
				<c:forEach items="${schoolYear}" var="e">
					<option value="${e.key}">${e.value}</option>
				</c:forEach>
			</select>
			
			学期:
			<select id="searchSchoolTerm" class="layui-select" style="height: 34px;">
				<option value="">--全部--</option>
				<c:forEach items="${schoolTerm}" var="e">
					<option value="${e.key}">${e.value}</option>
				</c:forEach>
			</select>
			
			年级:
			<select id="searchGrade" name="grade">
						<option value="">--全部--</option>
						<c:forEach items="${grades}" var="g">
						<c:if test="${g == 1}">
							<option value="${g}">一年级</option>
						</c:if>
						<c:if test="${g == 2}">
							<option value="${g}">二年级</option>
						</c:if>
						<c:if test="${g == 3}">
							<option value="${g}">三年级</option>
						</c:if>
						</c:forEach>
					</select>
			学科:
			<select id="searchCourse" name="course">
						<option value="">--全部--</option>
						<c:forEach items="${courses}" var="c">
							<option value="${c.key}">${c.value}</option>
						</c:forEach>
					</select>
			
			类型:
			<select id="searchType" class="layui-select" style="height: 34px;">
				<option value="">--全部--</option>
				<c:forEach items="${eduType}" var="e">
				<option value="${e.key}">${e.value}</option>
				</c:forEach>
			</select>
			
			状态:
			<select id="searchStatus" class="layui-select" style="height: 34px;">
				<option value="">--全部--</option>
				<option value="0">已提交</option>
				<option value="1">已审核</option>
				<option value="2">已驳回</option>
				<option value="-1">未提交</option>
			</select>
			
			教师名称:
			<input type="text" id="searchTeacherName" style="height: 30px;"/>
		</div>
		<div class="layui-btn-group" style="margin-left: 10px">
			<button id="verifyTemplate" class="fristBtnDes">
				<li class="btnIconCss"><img
					src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>审核计划
			</button>
		</div>
	</div>
	<c:forEach items="${eduType }" var="e">
							<script>initEduType('${e.key}','${e.value}');</script>
						</c:forEach>

	<!-- 新增模板弹框 -->
	<div id="templateAddContent"
		style="display: none; width: 100%; height: 90%">
		<form class="layui-form" action="">
			<div class="layui-form-item" style="margin-top: 10px">
				<label class="layui-form-label" style="width: 120px">学年:</label>
				<div class="layui-input-inline">
					<input type="text" class="form-control" readonly="readonly" name="year">
				</div>
			</div>

			<div class="layui-form-item ">
				<label class="layui-form-label" style="width: 120px">学期:</label>
				<div class="layui-input-inline">
				<input type="text" class="form-control" readonly="readonly" name="termName">
				</div>
			</div>
			<div class="layui-form-item ">
				<label class="layui-form-label" style="width: 120px">计划类型:</label>
				<div class="layui-input-inline"><input type="text" class="form-control" readonly="readonly" name="typeRole"></div>
			</div>
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">学校名称:</label>
				<div class="layui-input-inline">
					<input type="text" class="form-control" readonly="readonly" name="schoolName">
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">学部:</label>
				<div class="layui-input-inline">
					<input type="text" class="form-control" readonly="readonly" name="stage">
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">年级:</label>
				<div class="layui-input-inline" >
					<input type="text" class="form-control" readonly="readonly" name="grade">
				</div>
				
				
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">课程:</label>
				<div class="layui-input-inline">
				<input type="text" class="form-control" readonly="readonly" name="courseName">
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">教师名称:</label>
				<div class="layui-input-inline">
					<input type="text" id="_createUserName" name="teacherName" class="form-control" readonly>
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">创建时间:</label>
				<div class="layui-input-inline">
					<input type="text" id="_createDate" name="createDate" class="form-control" readonly>
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">计划模板:</label>
				<div class="layui-input-inline" style="margin-top: 5px;">
					<a style="color:green;" id="downloadUrl" href="" target="_Blank">模板文件</a>
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">计划评分:</label>
				<div class="layui-input-block">
            		<input type="radio" name="score" value="优" title="优" checked>
					<input type="radio" name="score" value="良" title="良">
					<input type="radio" name="score" value="中" title="中">
					<input type="radio" name="score" value="差" title="差">					
				</div>
			</div>
			
			<div class="layui-form-item">
				<label class="layui-form-label" style="width: 120px">审核结果:</label>
				<div class="layui-input-inline">
					<select id="_verify" name="verify">
						<option value="1">审核通过</option>
						<option value="2">审核不通过</option>
					</select>
				</div>
			</div>
			<input type="hidden" id="_id" name="id">
			<div class="layui-form-item">
		    <div class="layui-input-block">
		      <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
		      <button type="reset" class="layui-btn layui-btn-primary" onclick="resetForm();">重置</button>
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
	<script src="js/pages/plan/verifyTemplates.js"></script>

	<!-- 自定义script -->
	<script type="text/javascript">
		//条件搜索
		$("#searchType,#searchSchoolCode,#searchSchoolYear,#searchSchoolTerm,#searchCourse,#searchGrade,#searchStatus,#searchTeacherName").change(function() {
			$('#templatesTable').bootstrapTable('refresh', getTParam());
		});
		
		//清空表单
		function resetForm(){
			$('#_id').val("");
			$('#_score').val("");
	     }
		//审核数据填充		
		function getTeacherTemplate(tId) {
			$.post("findTeacherTemplateByid", {
				"tId" : tId
			}, function(data) {
				$('#_id').val(data.id);
				$('input[name="courseName"]').val(data.courseName);
				$('input[name="termName"]').val(data.termName);
				var stage = "";
				if(data.stage=='1'){
					stage = "小学";
				}else if(data.stage=='2'){
					stage = "初中";
				}else{
					stage = "高中";
				}
				$('input[name="stage"]').val(stage);
				$('input[name="year"]').val(data.year);
				var role = "";
				if(data.type=='01'){
					role = "任课老师";
				}else if(data.type=='02'){
					role = "备课组";
				}else{
					role = "教研组";
				}
				$('input[name="typeRole"]').val(role);
				if(data.grade){
					$('input[name="grade"]').val(data.grade+"年级");
				}
				
				$('input[name="teacherName"]').val(data.createUserName);
				$('input[name="createDate"]').val(dateFormatUtil(data.createDate));
				$('input[name="schoolName"]').val(data.schoolName);
				$('#downloadUrl').attr('href','http://report.cdwtrj.com:8000/wtrj/plan/save/'+data.url);
			});
		}
		
		function dateFormatUtil(longTypeDate){  
	         var dateTypeDate = "";  
	         var date = new Date();  
	         date.setTime(longTypeDate);  
	         dateTypeDate += date.getFullYear();   //年  
	         dateTypeDate += "-" + getMonth(date); //月   
	         dateTypeDate += "-" + getDay(date);   //日  
	         return dateTypeDate;  
	     }  
		//返回 01-12 的月份值   
	     function getMonth(date){  
	         var month = "";  
	         month = date.getMonth() + 1; //getMonth()得到的月份是0-11  
	         if(month<10){  
	             month = "0" + month;  
	         }  
	         return month;  
	     }  
	       
	     //返回01-30的日期  
	     function getDay(date){  
	         var day = "";  
	         day = date.getDate();  
	         if(day<10){  
	             day = "0" + day;  
	         }  
	         return day;  
	     } 
	</script>

</body>
</html>