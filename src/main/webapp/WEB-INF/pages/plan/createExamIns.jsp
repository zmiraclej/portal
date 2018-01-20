<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>创建考次</title>
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="js/plugins/bootstrap/css/bootstrap.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
<!-- icons -->
<link rel="stylesheet" href="css/ionicons/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="css/AdminLTE.min.css">
<link rel="stylesheet" href="css/skins/_all-skins.min.css">
<link rel="stylesheet" href="css/pages/mycss.css">
<link rel="stylesheet" href="js/plugins/layui/css/layui.css">

<!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<style>
select{
width:200px;
height:34px;
text-align: center;
}
label{
width:100px;
height:34px;
}
td{
line-height: 50px !important;
}
</style>
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

		<div class="content-wrapper" style="background-color: white">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
			<ul class="breadcrumb">
				<i style="background: url(img/position.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 20px"></i>
				<span>当前位置：</span>
				<li><a href="#">成绩管理</a> <span class="divider"></span></li>
				<li><a href="#">考次创建</a> <span class="divider"></span></li>
			</ul>
			</section>
			<!-- 中间部分-top     end -->
		
			<!-- 中间部分-main     startup -->
			<section class="content">
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
							<a class="btn btn-primary" onClick="add()">确认添加</button>	
						</td>
					</tr>
				</table>
			</form>
			
			<strong style="font-size: 15px;margin-left: 8px">考次列表</strong>
			<hr>
			<table id="data" class="table table-striped">
				<tr>
					<th>考次ID</th><th>考次名称</th><th>创建时间</th><th>操作</th>
				</tr>
				<c:forEach var="exam" items="${examInfoList}">
					<tr>
						<td>${exam.id}</td>
						<td>${exam.name}</td>
						<td>${exam.createTime}</td>
						<td><a class="btn btn-primary" href="javascript:del(${exam.id})">删除</a></td>
					</tr>
				</c:forEach>
				
			</table>
			<!-- 中间部分-main     end -->
		</div>
	</div>
	<!-- 底部       startup  -->
	<%@ include file="../includes/bottom.jsp"%>
	<!-- 底部       end -->


	<!-- 设置按钮页面       startup -->
	<%@ include file="../includes/rightSetup.jsp"%>
	<div class="control-sidebar-bg"></div>
	<!-- ./wrapper -->
	<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
	<script src="js/plugins//layui/layui.js"></script>
	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/jquery-form.js"></script>
	<script type="text/javascript">
	//校区选择,加载学部，重置班级
	
	$(function(){
		selectSchool();
		selectGrade();
	})
	
	function selectSchool(){
		$("#grade").html("<option value='-1'>--------请选择年级--------</option>");
		var schoolCodes=$("#school").val();
		$.get("searchStagesBySchoolCodes?schoolCodes="+schoolCodes,function(data){
			var str="<option value='-1'>--------请选择学部--------</option>";
			for(var i=0;i<data.length;i++){
				var obj=data[i];
				str+="<option value='"+obj.stageNo+"'>"+obj.stageName+"</option>";
			}
			$("#stage").html(str);
		})
	}
	
	function selectGrade(){
		var schoolCodes=$("#school").val();
		var stage=$("#stage").val();
		$.get("searchGrades?schoolCodes="+schoolCodes+"&stage="+stage,function(data){
			var str="<option value='-1'>--------请选择年级--------</option>";
			for(var i=0;i<data.length;i++){
				var obj=data[i];
				str+="<option value='"+obj.gradeNo+"'>"+obj.gradeName+"</option>";
			}
			$("#grade").html(str);
		})
	}
	
	function add(){
		if(check()){
			_wait();
			$("#form").ajaxSubmit(function(data){
				//关闭操作等待效果
				layer.closeAll();
				if(data.code=="02"){
					layer.msg('保存成功', {
					    time: 2000, //20s后自动关闭
					    btn: ['确定'],
					    yes:function(){
							$.get("getExamInfos",function(data){
								var str="<tr><th>考次ID</th><th>考次名称</th><th>创建时间</th><th>操作</th></tr>"
								for(var i=0;i<data.data.length;i++){
									var obj=data.data[i];
									str+="<tr><td>"+obj.id+"</td><td>"+obj.name+"</td><td>"+obj.createTime+"</td>"
									+"<td><a class='btn btn-primary' href='javascript:del("+obj.id+")'>删除</a></td>";
								}
								$("#data").html(str);
							})
					    }
					  });
				}else{
					layer.msg(data.msg, {
					    time: 2000, //20s后自动关闭
					    btn: ['确定']
					  });
				}
			},"json")
		}
	}
	
	
	function check(){
		var schoolCodes=$("#school").val();
		if(schoolCodes=='-1'){
			_msg('请选择校区', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var stage=$("#stage").val();
		if(stage=='-1'){
			_msg('请选择学部', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var grade=$("#grade").val();
		if(grade=='-1'){
			_msg('请选择年级', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var schoolYear=$("#schoolYear").val();
		if(schoolYear=='-1'){
			_msg('请选择学年', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var term=$("#term").val();
		if(term=='-1'){
			_msg('请选择学期', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var type=$("#type").val();
		if(type=='-1'){
			_msg('请选择考试类别', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
/* 		var seq=$("#seq").val();
		if(seq=='-1'){
			_msg('请选择考试序列', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		} */
		
		var examYear=$("#examYear").val();
		if(examYear=='-1'){
			_msg('请选择考试时间(年份)', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		
		var examMonth=$("#examMonth").val();
		if(examMonth=='-1'){
			_msg('请选择考试时间(月份)', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var showname=$("#school option:selected").html()
		+$("#stage option:selected").html()
		+$("#grade option:selected").html()
		+$("#schoolYear option:selected").html()
		+$("#term option:selected").html()
		+$("#type option:selected").html();
		if($("#seq option:selected").val()!=-1){
			showname+="("
			+$("#seq option:selected").html()
			+")";
		}
		$("#examName").val(showname);
		return true;
	}
	

		$(window).resize(
				function() {
					$("#mainTable").css("height",
							$('.content-wrapper').height() - 100);
				});
		$(document).ready(
				function() {
					$("#mainTable").css("height",
							$('.content-wrapper').height() - 100);
				});
		
		
		function del(id){
			layer.msg('确认删除？', {
			    time: 0, //20s后自动关闭
			    btn:['确定','取消'],
			    yes:function(){
			    	_wait();
					$.post("deleteExamIns?id="+id,function(data){
						layer.closeAll();
						if(data.code=="02"){	
							$.get("getExamInfos",function(data){
								var str="<tr><th>考次ID</th><th>考次名称</th><th>创建时间</th><th>操作</th></tr>"
								for(var i=0;i<data.data.length;i++){
									var obj=data.data[i];
									str+="<tr><td>"+obj.id+"</td><td>"+obj.name+"</td><td>"+obj.createTime+"</td>"
									+"<td><a class='btn btn-primary' href='javascript:del("+obj.id+")'>删除</a></td>";
								}
								$("#data").html(str);
							})
						}else{
							layer.msg(data.msg, {
							    time: 2000, //20s后自动关闭
							    btn: ['确定']
							  });
						}
				 })
			}
	});	
}
	</script>
</body>
</html>