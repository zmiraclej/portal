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
				<td colspan="2">
					<select id="year"  class="form-control" style="width: 400px;">
						    	<c:forEach items="${years}" var="y">
						    		<option value="${y.code }" >${y.name }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="3" height="5px;"></td>
			</tr>
			<tr>
				<td align="right">
				学期：
				</td>
				<td colspan="2">
					<select id="term"  class="form-control" style="width: 400px;">
						    	<c:forEach items="${terms}" var="t">
						    		<option value="${t.code }" >${t.name }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
				<tr>
				<td colspan="3" height="5px;"></td>
			</tr>
				<tr>
					<td width="120px" align="right">
						学校：
					</td>
					<td colspan="2">
					<select id="school" class="form-control"  style="width: 400px;">
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
				<td colspan="3" height="10px;"></td>
			</tr>
			<tr>
					<td align="right">
					     学部：
					</td>
					<td colspan="2" id="stageText">
						<select id="stage" class="form-control"  style="width: 400px;">
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
			<tr>
				<td colspan="3" height="10px;"></td>
			</tr>
				<td align="right">
				年级：
				</td>
				<td colspan="2">
				<select id="grade" class="form-control" style="width: 400px;">
						    	<c:forEach items="${grades}" var="g">
										<option value="${g }">  ${g } 年级</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="3" height="10px;"></td>
			</tr>
			<tr id="classTr" style="display: none;">
				<td align="right">
				班级：
				</td>
				<td colspan="2">
					<select id="class"  class="form-control" style="width: 400px;">
						    	<c:forEach items="${classes}" var="c">
						    		<option value="${c.classId }" >${c.className }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="3" height="5px;"></td>
			</tr>
			<tr >
				<td align="right">
				科目：
				</td>
				<td colspan="2">
				<input type="radio" name="coursesCount" value="1" checked="checked"/>多科
				&nbsp;&nbsp;&nbsp;<input type="radio" name="coursesCount" value="0"/>单科
				</td>
			</tr>
			<tr>
				<td colspan="3" height="5px;"></td>
			</tr>
			<tr id="courseBox" style="display: none;">
				
				<td align="right">
				科目名称：
				</td>
				<td>
				<select id="course" class="form-control" style="width: 400px;">
						    	<c:forEach items="${courses}" var="c">
						    		<option value="${c.code }" >${c.name }</option>
								</c:forEach>
						    </select>
				</td>
			</tr>
			<tr>
				<td colspan="3" height="5px;"></td>
		
			</tr>	

			<tr>
				<td align="right">
				考试类型：
				</td>
				<td colspan="2">
				<select id="types"  class="form-control" style="width: 400px;">
					<c:forEach items="${types}" var="t">
						    		<option value="${t.code }" >${t.name }</option>
								</c:forEach>
				</select>
				</td>
			</tr>
			<tr>
				<td colspan="3" height="5px;"></td>
			</tr>
			<%-- <tr>
					<td align="right">
					    考试序列(选填)：
					</td>
					<td colspan="2">
							<select id="seq" name="seq" class="form-control" style="width: 400px;">
								<option value="-1"> -- 请选择考试序列 -- </option>
								<c:forEach var="examSeq" items="${examSeqList}">
								<option value="${examSeq.code}">${examSeq.name}</option>
								</c:forEach>
							</select>
					</td>
				</tr> --%>
				<tr>
				<td colspan="3" height="5px;"></td>
			</tr>
				<tr>
					<td align="right">
					    考试时间：
					</td>
					<td colspan="2">
					
						<div class="layui-form-item">
						    <div class="layui-inline">
						     <select id="examYear" name="examYear" class="form-control" style="width: 240px;">
								<option value="2017">2017</option>
								<option value="2018">2018</option>
								<option value="2019">2019</option>
							</select>
						    </div>
						    <div class="layui-inline">
						      <select id="examMonth" name="examMonth" class="form-control" style="width: 140px;">
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
							</select>
						    </div>
						  </div>
					
							
					
							
					</td>
				</tr>
				<tr>
				<td colspan="3" height="5px;"></td>
			</tr>
			<tr>
					<td align="right">
					    考试次数：
					</td>
					<td colspan="2">
						<input type="number" class="form-control" id="examSeqCode" name="examSeqCode" min="1" max="100" value="1" style="width: 400px;"/>
					</td>
				</tr>
			<tr>
			<tr>
				<td colspan="3" height="10px;"></td>
			</tr>
			<tr>
					<td align="right">
					    考次名称：
					</td>
					<td colspan="2">
							<input type="text" class="form-control" style="width: 400px;" readonly="readonly" id="examName" name="examName">	
					</td>
				</tr>
			<tr>
				<td colspan="3" height="5px;"></td>
			</tr>
			<tr>
				<td align="right">
					    考次说明：
				</td>
				<td colspan="2">
							<textarea id="remark" rows="3" cols="54" style="resize: none;" ></textarea>	
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
		
		$('[name=coursesCount]').click(function() {
			var type = $('[name=coursesCount]:checked').val();
			//console.log(type);
			if(type==1){
				$('#courseBox').hide();
				$('#classTr').hide();
				
			}
			if(type==0){
				$('#courseBox').show();
				$('#classTr').show();
			}
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
	
	function changeCourse( schoolCode, stage, grade, classId ){
		$.ajax({
			url : "score/upload/changeCoursesByClassId?schoolCode="+schoolCode+"&grade="+grade+"&stage="+stage+"&classId="+classId,
			success : function(result) {
				
				$('#course').empty();
				if(result && result.length > 0){
					var grade;
					var opHtml = "";
					for(i=0;i<result.length;i++){
						//console.log(result[i]);
						if(i==0){
							grade = result[i].grade;
						}
						opHtml += '<option value="'+result[i].code+'" >'+result[i].name+'</option>';
					}
					$('#course').html(opHtml);
					
				}
				
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

	var callbackdata = function () {
		
		var schoolCode=$("#school").val();
		if(schoolCode == null && schoolCode == '' && schoolCode=='-1'){
			_msg('请选择学校', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		
		var stage=$("#stage").val();
		if(stage == null && stage == '' && stage=='-1'){
			_msg('请选择学部', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var grade=$("#grade").val();
		if(grade == null && grade == '' && grade=='-1'){
			_msg('请选择年级', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var schoolYear=$("#year").val();
		if(schoolYear == null && schoolYear == '' && schoolYear=='-1'){
			_msg('请选择学年', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var term=$("#term").val();
		if(term == null && term == '' && term=='-1'){
			_msg('请选择学期', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		var type=$("#types").val();
		if(type == null && type == '' && type=='-1'){
			_msg('请选择考试类别', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}

		var examYear=$("#examYear").val();
		if(examYear == null && examYear == '' && examYear=='-1'){
			_msg('请选择考试时间(年份)', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		
		var examMonth=$("#examMonth").val();
		if(examMonth == null && examMonth == '' && examMonth=='-1'){
			_msg('请选择考试时间(月份)', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
		
		var examSeqCode = $("#examSeqCode").val();
		
		if(examSeqCode == null && examSeqCode == '' && examSeqCode=='-1'){
			_msg('请选择考试次数', {
	            time: 2000, //2s后自动关闭
	            area: ['220px', '50px']
	          });
			return false;
		}
	    
		var examType = $('[name=coursesCount]:checked').val();
		var gradeText = $("#grade").val() + "年级";
		var examSeqName = "第 " + examSeqCode +" 次";
		
		var showname=$("#school option:selected").text()
		+" "+$("#stage option:selected").text()
		+" "+gradeText
		+" "+$("#year option:selected").text()
		+" "+$("#term option:selected").text()
		+" "+$("#types option:selected").text();
		
		if(examType == 0){
			showname += " ("+$('#class').find("option:selected").text()+" "+$('#course').find("option:selected").text() + " " +examSeqName+")";;
		}
		else{
			showname += " ("+examSeqName+")";
		}
		
		$("#examName").val(showname);
		
		
		var classId;
		var className;
		var courseId;
		var courseName;
		//判断科目是多选还是单选
		if(examType==1){
			classId = '';
			className ='';
			courseId = '';
			courseName = '';
		}
		if(examType==0){
			classId =  $('#class').val();;
			className =$('#class').find("option:selected").text();
			courseId = $('#course').val();
			courseName = $('#course').find("option:selected").text();
		}
	
		var remark = $('#remark').val();
	    var data = {
	    		'schoolCode':schoolCode,
	    		'schoolYearCode':schoolYear,
	    		'schoolTermCode':term,
	    		'grade':grade,
	    		'stage': stage,
	    		'typeCode': type,
	    		'name': $("#examName").val(),
	    	 	'examSeqCode': examSeqCode,
	    	 	'examSeqName': examSeqName,
	    		'examTime':examYear + examMonth,
	    		'examType':examType,
	    		'courseCode':courseId,
	    		'courseName':courseName,
	    		'classId':classId,
	    		'className':className,
	    		'remark':remark
	    };
	    
	    return data;
	}
	
	</script>
</body>
</html>