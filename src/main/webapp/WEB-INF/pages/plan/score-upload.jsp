<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title id="Description">模板管理</title>
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
	<div id="templateAddContent" style="width: 100%; height: 90%;padding: 10px;">
			<table style="width: 100%;">
				
				<tr>
				<td width="120px" align="right">
				学年：
				</td>
				<td>
					<select id="year"  class="form-control" style="width: 550px;">
						    	<c:forEach items="${years}" var="y">
						    		<option value="${y.code }" >${y.name }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td align="right">
				学期：
				</td>
				<td>
					<select id="term"  class="form-control" style="width: 550px;">
						    	<c:forEach items="${terms}" var="t">
						    		<option value="${t.code }" >${t.name }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
				<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
				<tr>
					<td width="120px" align="right">
						学校：
					</td>
					<td>
					<select id="school" class="form-control"  style="width: 550px;">
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
				<td align="right">
				 学部：
				</td>
				<td>
				<select id="stage" class="form-control"  style="width: 550px;">
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
				<td align="right">
				年级：
				</td>
				<td>
				<select id="grade" class="form-control" style="width: 550px;">
						    	<c:forEach items="${grades}" var="g">
										<option value="${g }"> ${g } 年级</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td align="right">
				班级：
				</td>
				<td>
				<select id="class"  class="form-control" style="width: 550px;">
						    	<c:forEach items="${classes}" var="c">
						    		<option value="${c.classId }" >${c.className }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td align="right">
				考试类型：
				</td>
				<td>
				<select id="types"  class="form-control" style="width: 550px;">
					<c:forEach items="${types}" var="t">
						    		<option value="${t.code }" >${t.name }</option>
								</c:forEach>
				</select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td align="right">
				科目：
				</td>
				<td>
				<select id="course"  class="form-control" style="width: 550px;">
						    	<c:forEach items="${courses}" var="c">
						    		<option value="${c.code }" >${c.name }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td align="right">
				单科满分：
				</td>
				<td>
					<input id="score" class="form-control" style="width:550px;"/>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5px;"></td>
			</tr>
			<tr>
				<td align="right">
				考次：
				</td>
				<td>
				<select id="ins"  class="form-control" style="width: 550px;">
					<c:if test="${exins != null  && fn:length(exins) > 0 }">
							<c:forEach items="${exins}" var="c">
								   <option remark="${c.remark }" value="${c.id }" >${c.name }</option>
							</c:forEach>
						
					</c:if>
					<c:if test="${exins == null || fn:length(exins) == 0 }">
								<option value="-1"> --- 暂无考次信息 ---  </option>
					</c:if>
				</select>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="10px;"></td>
			</tr>
			<tr>
				<td align="right">
				备注：
				</td>
				<td>
				<div id="insRemark">${exinsRemark }</div>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="10px;"></td>
			</tr>
			</table>
			<table style="width: 100%;">
				<tr>
					<td colspan="2" height="5px;"></td>
				</tr>
				<tr>
					<td width="120px" align="right">
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 120px">模板上传:</label>
						</div>
					</td>
					<td>
						
						<form class="layui-form" action="">
						<div class="layui-form-item">
		
						<div class="layui-upload">
							<input id="fileExcel" type="file" name="files" lay-type="file" class="layui-upload-file">
							<input id="filePath" type="hidden" name="filePath" lay-verify="fileUrl">
							<span id="successFileShow" style="color:green"></span>
						</div>
					</div>
					
				</form>
						
					<td>
				</td>
			</tr>
			</table>
			
					
				
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
	<script type="text/javascript">
	layui.use(['form','upload'], function(){
		var form = layui.form();
		var $ = layui.jquery;
		
		//表单初始化
		form.render();
		  
		//文件上传初始化
		layui.upload({
				elem: '#fileExcel',
				url: 'scoreFileUpload',
				//exts: 'xlsx|xls', //只允许上传excel
				accept: 'file',
				success: function(res){
					if(res.code=="02"){
						layer.msg("上传成功");
						$('#successFileShow').html(res.msg);
						$('#filePath').val(res.data);
					}else{
						layer.msg("模板上传失败");
						$('#successFileShow').html(res.msg);
						$('#filePath').val('');
					}
				}
			});
	});
	
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
		
		$('#class').change(function(){
			findScoreUploadExamIns();
		});
		
		
		$('#year').change(function(){
			findScoreUploadExamIns();
		});
		
		$('#term').change(function(){
			findScoreUploadExamIns();
		});
		
		$('#types').change(function(){
			findScoreUploadExamIns();
		});
		
		$('#ins').change(function(){
			
			var remark = $("#ins").find("option:selected").attr('remark');
			
			$("#insRemark").empty();
			$("#insRemark").html(remark);
			
		});
		 
		$('#course').change(function(){
			findScoreUploadExamIns();
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
				
				findScoreUploadExamIns();
				
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
	
	function findScoreUploadExamIns(){
		
		var year = $('#year').val();
		var term = $('#term').val();
		var schoolCode = $('#school').val();
		var grade = $('#grade').val();
		var types = $('#types').val();
		var classId = $('#class').val();
		var courseCode = $('#course').val();
		
		if(year == null || year == '' || year == undefined){
			return;
		}
		
		if(term == null || term == '' || term == undefined){
			return;
		}
		
		if(schoolCode == null || schoolCode == '' || schoolCode == undefined){
			return;
		}
		
		if(grade == null || grade == '' || grade == undefined){
			return;
		}
		
		if(types == null || types == '' || types == undefined){
			return;
		}
		
		$.ajax({
			url : "findScoreUploadExamIns?schoolCode="+schoolCode+"&grade="+grade+"&typeCode="+types+"&year="+year+"&term="+term+"&classId="+classId+"&courseCode="+courseCode,
			success : function(result) {
				
				$('#ins').empty();
				$("#insRemark").empty();
				var remark;
				if(result && result.length > 0){
					var grade;
					var opHtml = "";
					for(i=0;i<result.length;i++){
						//console.log(result[i]);
						if(i==0){
							remark = result[i].remark;
						}
						opHtml += '<option remark="'+result[i].remark+'" value="'+result[i].id+'" >'+result[i].name+'</option>';
					}
					$('#ins').html(opHtml);
					$("#insRemark").html(remark);
					
				}
				
			}
		});
	}
	
	var callbackdata = function () {
		
		var filePath = $('#filePath').val();
		
		var yearCode = $('#year').val();
		var yearName = $('#year').find("option:selected").text();
		var termCode = $('#term').val();
		var termName = $('#term').find("option:selected").text();
		var schoolCode = $('#school').val();
		var schoolName = $('#school').find("option:selected").text();
		var grade = $('#grade').val();
		var classId = $('#class').val();
		var className = $('#class').find("option:selected").text();
		var courseCode = $('#course').val();
		var courseName = $('#course').find("option:selected").text();
		var typeCode = $('#types').val();
		var typeName = $('#types').find("option:selected").text();
		var examInsId = $('#ins').val();
		var examInsName = $('#ins').find("option:selected").text();
		var score = $('#score').val();
	
	    if(examInsId == null || examInsId == '' || examInsId == undefined){
	    	layer.msg('没有考次信息!', {
	            time: 1000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
	    	
	    	return;
	    }
	    
	    if(score == null || score == '' || score == undefined){
	    	layer.msg('请填写单科满分信息!', {
	            time: 1000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
	    	
	    	return;
	    }
	    
	    if(filePath == null || filePath == ''){
	    	layer.msg('请上传excel成绩单!', {
	            time: 1000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
	    	
	    	return;
	    }
	    
	    var data = {
	    		'yearCode':yearCode,
	    		'yearName':yearName,
	    		'termCode':termCode,
	    		'termName':termName,
	    		'schoolCode':schoolCode,
	    		'schoolName':schoolName,
	    		'grade':grade,
	    		'classId':classId,
	    		'className':className,
	    		'courseCode':courseCode,
	    		'courseName':courseName,
	    		'typeCode': typeCode,
	    		'examInsId': examInsId,
	    		'typeName': typeName,
	    		'examInsName': examInsName,
	    		'filePath':filePath,
	    		'fullScore':score
	    };
	    
	    return data;
	}
	
	</script>
</body>
</html>