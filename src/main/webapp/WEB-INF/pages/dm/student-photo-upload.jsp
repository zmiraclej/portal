<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title id="Description">照片管理</title>
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
					<td colspan="2" height="5px;"></td>
				</tr>
				
				<tr>
						<td width="120px" align="right">
							<div class="layui-form-item">
								<label class="layui-form-label" style="width: 120px">已上传照片:</label>
							</div>
						</td>
						<td>
							<img width="200px" height="200px" alt="" src="${photoUrl }">
						<td>
					</td>
				</tr>
				<tr>
					<td width="120px" align="right">
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 120px">照片上传:</label>
						</div>
					</td>
					<td>
						
						<form class="layui-form" action="" method="post" enctype="multipart/form-data">
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
				url: 'photoFileUpload',
				exts: 'jpg|jpeg|gif|png', //只允许上传图片
				accept: 'file',
				success: function(res){
					if(res.code=="02"){
						layer.msg("上传成功，请点击保存！");
						$('#successFileShow').html(res.msg);
						$('#filePath').val(res.data);
					}else{
						layer.msg("图片上传失败");
						$('#successFileShow').html(res.msg);
						$('#filePath').val('');
					}
				}
			});
	});
	
	$(function(){
		
		/* $('#school').change(function(){
			
			var schoolCode = $(this).val();
			changeGrades( schoolCode );
			
			findScoreUploadExamIns();
	 	 
		});
		
		$('#grade').change(function(){
			
			var schoolCode = $('#school').val();
			var grade = $(this).val();
			changeClasses( grade, schoolCode );
			
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
		}); */
		
	});

	/* function changeGrades( schoolCode ){
		$.ajax({
			url : "changeGradesBySchoolCode?schoolCode="+schoolCode,
			success : function(result) {
				//console.log(result);
				$('#grade').empty();
				if(result && result.length > 0){
					var grade;
					var opHtml = "";
					for(i=0;i<result.length;i++){
						//console.log(result[i]);
						if(i==0){
							grade = result[i].grade;
						}
						
						var stageText = "小学";
						if(result[i].stage == '2'){
							stageText = "初中";
						}
						
						if(result[i].stage == '3'){
							stageText = "高中";
						}
						
						opHtml += '<option value="'+result[i].grade+'" >'+stageText + ' ' + result[i].grade+' 年级</option>';
					}
					$('#grade').html(opHtml);
					changeClasses(grade, schoolCode);
				}
				else{
					$('#class').empty();
				}
				
			}
		});
	}

	function changeClasses( grade, schoolCode ){
		$.ajax({
			url : "changeClassesByGrade?schoolCode="+schoolCode+"&grade="+grade,
			success : function(result) {
				
				//console.log(result);
				
				$('#class').empty();
				if(result && result.length > 0){
					var grade;
					var opHtml = "";
					for(i=0;i<result.length;i++){
						//console.log(result[i]);
						if(i==0){
							grade = result[i].grade;
						}
						opHtml += '<option value="'+result[i].classId+'" >'+result[i].className+'</option>';
					}
					$('#class').html(opHtml);
					
				}
				
			}
		});
	}
	
	function findScoreUploadExamIns(){
		
		var year = $('#year').val();
		var term = $('#term').val();
		var schoolCode = $('#school').val();
		var grade = $('#grade').val();
		var types = $('#types').val();
		
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
			url : "findScoreUploadExamIns?schoolCode="+schoolCode+"&grade="+grade+"&typeCode="+types+"&year="+year+"&term="+term,
			success : function(result) {
				
				$('#ins').empty();
				if(result && result.length > 0){
					var grade;
					var opHtml = "";
					for(i=0;i<result.length;i++){
						//console.log(result[i]);
						if(i==0){
							grade = result[i].grade;
						}
						opHtml += '<option value="'+result[i].id+'" >'+result[i].name+'</option>';
					}
					$('#ins').html(opHtml);
					
				}
				
			}
		});
	} */
	
	var callbackdata = function () {
		
		var filePath = $('#filePath').val();
		/*
		var yearCode = $('#year').val();
		var yearName = $('#year').find("option:selected").text();
		var score = $('#score').val();
	
	    if(examInsId == null || examInsId == '' || examInsId == undefined){
	    	layer.msg('没有考次信息!', {
	            time: 1000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
	    	
	    	return;
	    } */
	    
	    if(filePath == null || filePath == ''){
	    	layer.msg('请上传图片!', {
	            time: 1000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
	    	
	    	return;
	    }
	    
	    
	    var data = {
	    		'id':'${t.id}',
	    		'photo':filePath
	    };
	    
	    return data;
	}
	
	</script>
</body>
</html>