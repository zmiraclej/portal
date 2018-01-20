<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">选择角色类型</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="css/jqueryTable/jqx.base.css" type="text/css" />
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
	<link rel="stylesheet" href="js/plugins/bootstrap-treeview/bootstrap-treeview.min.css">	
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
	<link rel="stylesheet" href="css/pages/report.css">
</head>

<body >
<form class="form-inline">
	<div style="margin: 10px 20px 0px 10px;">
		<table style="width: 100%;">
			<tr>
				<td width="80px" align="right">
				学校：
				</td>
				<td>
				<select id="school" class="form-control">
						    	<c:forEach items="${schools}" var="s">
						    		<c:choose> 
									  <c:when test="${schoolCode eq s.code}">   
									    <option value="${s.code }" selected="selected">${s.name }</option> 
									  </c:when> 
									  <c:otherwise>   
									   	<option value="${s.code }" >${s.name }</option>
									  </c:otherwise> 
									</c:choose> 
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td width="80px" align="right">
				 学部：
				</td>
				<td>
					<select id="stage" class="form-control" >
							<c:forEach items="${stages}" var="s">
									<c:if test="${s eq '1' }">
										<option value="${s }" >小学 </option>
									</c:if>
									<c:if test="${s eq '2' }">
										<option value="${s }" >初中 </option>
									</c:if>
									<c:if test="${s eq '3' }">
										<option value="${s }" >高中</option>
									</c:if>
									
							</c:forEach>
						</select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td width="80px" align="right">
				年级：
				</td>
				<td>
				<select id="grade" class="form-control">
						    	<c:forEach items="${grades}" var="g">
						    		<option value="${g }">${g } 年级</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td width="80px" align="right">
				班级：
				</td>
				<td>
				<select id="class"  class="form-control">
						    	<c:forEach items="${classes}" var="c">
						    		<option value="${c.classId }" >${c.className }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
		</table>
	</div>  
</form>

<script type="text/javascript" src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- ./wrapper -->
<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/plugins/layui/layui.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap-treeview/bootstrap-treeview.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>
<script type="text/javascript">

$(function(){
	
	$('#school').change(function(){
		
		var schoolCode = $(this).val();
		
		changeStage( schoolCode );
		
	});

	$('#stage').change(function(){
		
		var schoolCode = $('#school').val();
		var stage  = $(this).val();
		
		changeGrades( schoolCode, stage );
		
	});

	$('#grade').change(function(){
		
		var stage = $('#stage').val();
		var grade = $(this).val();
		var schoolCode = $('#school').val();
		
		changeClasses(grade,stage, schoolCode);
		
	});
	
});

function changeStage( schoolCode ){
	
	$.ajax({
		url : "exam/changeStagesBySchoolCode?schoolCode="+schoolCode,
		success : function(result) {
			
			$('#stage').empty();
			var stage;
			if(result && result.length > 0){
				var opHtml = "";
				for(i=0;i<result.length;i++){
					//console.log(result[i]);
					if(i==0){
						stage = result[i];
					}
					
					//console.log( result[i]);
					
					var txt = "";
					
					if(result[i] == '1'){
						txt = "小学";
					}
					
					if(result[i] == '2'){
						txt = "初中";						
					}
											
					if(result[i] == '3'){
						txt = "高中";
					}
					
					opHtml += '<option value="'+result[i]+'" >'+txt+'</option>';
				}
				$('#stage').html(opHtml);
				
			}
			else{
				$('#stage').html('<option value="-1" >暂无相应学部</option>');
			}
			
			changeGrades( schoolCode, stage );
			
		}
	});
	
}

function changeClasses( grade, stage, schoolCode ){
	$.ajax({
		url : "exam/changeClassesByGrade?schoolCode="+schoolCode+"&grade="+grade+"&stage="+stage,
		success : function(result) {
			
			$('#class').empty();
			
			var classId;
			
			if(result && result.length > 0){
				var grade;
				var opHtml = "";
				for(i=0;i<result.length;i++){
					//console.log(result[i]);
					if(i==0){
						classId = result[i].classId;
					}
					opHtml += '<option value="'+result[i].classId+'" >'+result[i].className+'</option>';
				}
				$('#class').html(opHtml);
				
			}
			
		}
	});
}

function changeGrades( schoolCode, stage ){
	$.ajax({
		url : "exam/changeGradesByStage?schoolCode="+schoolCode+"&stage="+stage,
		success : function(result) {
			$('#grade').empty();
			var grade;
			if(result && result.length > 0){
				var grade;
				var opHtml = "";
				for(i=0;i<result.length;i++){
					//console.log(result[i]);
					if(i==0){
						grade = result[i];
					}
					
					opHtml += '<option value="'+result[i]+'" >'+result[i]+' 年级</option>';
				}
				$('#grade').html(opHtml);
				
			}
			
			changeClasses(grade, stage, schoolCode );
		}
	});
}


var callbackdata = function (){
	var schoolCode = $('#school').val();
	var grade = $('#grade').val();
	var classId = $('#class').val();
	
	var back = true;
	
	if(schoolCode == null || schoolCode == '' || schoolCode == undefined){
		back = false;
	}
	
	if(grade == null || grade == '' || grade == undefined){
		back = false;
	}
	
	if(classId == null || classId == '' || classId == undefined){
		back = false;
	}
	
	if(back){
		
		var data = {
			'schoolCode': schoolCode,
			'grade': grade,
			'classId': classId
		}
		
		return data;	
	}
	
	return;
}
</script>
</body>


</html>