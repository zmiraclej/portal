<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

	<input type="hidden" id="examInsId" name="examInsId" value="${input.examInsId }">
	<input type="hidden" id="classId" name="classId" value="${input.classId }">
	<input type="hidden" id="examType" name="examType" value="${input.examType }">
	<input type="hidden" id="visibleState" name="visibleState" value="${input.visibleState }">
	<table id="view-score-table"  style="width:100%;height:100%"></table>
	<%-- <div id="view-score-tabs" class="easyui-tabs" style="width:100%;height:100%">
		<div title="基础成绩">
			
		</div>
		<div title="成绩分段人数统计">
		<select id="view-rangeName" style="width:200px;">
			<c:if test="${fn:length(ranges) == 0 }">
				<option value="-1">--无分数段信息--</option>
			</c:if>
			<c:if test="${fn:length(ranges)>0 }">
				<option value="-1">请选择分数段名称</option>
				<c:forEach items="${ranges }" var="r">
					<option value="${r.name }">${r.name }</option>
				</c:forEach>
			</c:if>
		</select>
		<table id="view-scoreRange-table"></table>
		</div>
	</div> --%>


<script>
$(function(){
	/* var arts = ${arts};
	var science = ${science};
	var courses = ${courses};
	console.log(courses);
	var rangesColumns = [
		{
			field : 'ranges',
			title : '分数段',
			width:80,
			align : 'center'
		},
		{
			field : 'sumCount',
			title : '总分人数',
			width:60,
			align : 'center'
		}
	];
	//多科显示
	if($('#examType').val() == '1'){
		//文综
		if(arts == 1){
			rangesColumns.push({
				field : 'artsCount',
				title : '文综人数',
				width:60,
				align : 'center'
			});
		}
		//理综
		if(science == 1){
			rangesColumns.push({
				field : 'scienceCount',
				title : '理综人数',
				width:60,
				align : 'center'
			});
		}
		if(courses != null && courses.length >0){
			for(var i = 0;i<courses.length;i++){
				rangesColumns.push({
					field : courses[i].code,
					title : courses[i].name,
					width:50,
					halign : 'center',
					align : 'left'
				});
			}
		}
	}
	$('#view-rangeName').combobox({
		editable:false,
		onChange:function(n,o){
			var scoreRanges = n;
			if(n != '-1'){
				$('#view-scoreRange-table').datagrid({
					url:'scoreManage/scoreRangeCount',
					rownumbers : true,
					fitColumns : true, 
					singleSelect:true,
					columns :  [rangesColumns],
					queryParams:{
						name:n,
						examInsId:$('#examInsId').val(),
						classId:$('#classId').val(),
						arts:arts,
						science:science,
						courses:courses
					}
				});
			}
		}
	});  */
	var visibleState = $('#visibleState').val();
	var showGradeOrde = false;
	
	if(visibleState == '0'){
		showGradeOrde = true;
	}
	
	var columns;
	
	if(showGradeOrde){
		columns =[ [ {
			field : 'orderNumber',
			title : '班级排名',
			halign : 'center',
			align : 'center'
		},{
			field : 'gradeOrderNo',
			title : '年级排名',
			halign : 'center',
			align : 'center'
		},{
			field : 'studentCode',
			title : '学生编号',
			halign : 'center',
			align : 'center'
		},{
			field : 'name',
			title : '学生姓名',
			halign : 'center',
			align : 'center'
		}, {
			field : 'sumNumber',
			title : '成绩合计',
			halign : 'center',
			align : 'center'
		}, {
			field : 'averageNumber',
			title : '平均分',
			halign : 'center',
			align : 'center'
		}, {
			field : 'classTopScore',
			title : '班级最高分',
			halign : 'center',
			align : 'center'
		}, {
			field : 'courseScore',
			title : '各科成绩',
			halign : 'center',
			align : 'left'
		} ]];
	}
	else{
		columns =[ [ {
			field : 'orderNumber',
			title : '班级排名',
			halign : 'center',
			align : 'center'
		},{
			field : 'studentCode',
			title : '学生编号',
			halign : 'center',
			align : 'center'
		},{
			field : 'name',
			title : '学生姓名',
			halign : 'center',
			align : 'center'
		}, {
			field : 'sumNumber',
			title : '成绩合计',
			halign : 'center',
			align : 'center'
		}, {
			field : 'averageNumber',
			title : '平均分',
			halign : 'center',
			align : 'center'
		}, {
			field : 'classTopScore',
			title : '班级最高分',
			halign : 'center',
			align : 'center'
		},{
			field : 'classBottomScore',
			title : '班级最低分',
			halign : 'center',
			align : 'center'
		}, {
			field : 'courseScore',
			title : '各科成绩',
			halign : 'center',
			align : 'left'
		} ]];
	}


	$('#view-score-table').datagrid({
		url : 'scoreManage/viewScoreInputData?examInsId=${input.examInsId }&classId=${input.classId }&visibleState=${input.visibleState}',
		idField : 'classId',
		rownumbers : true,
		fitColumns : false,
		columns :  columns 
	});
	
});
</script>