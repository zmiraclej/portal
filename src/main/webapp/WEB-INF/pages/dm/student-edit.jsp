<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">学生档案编辑</title>
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
		<form class="layui-form" action="" method="post" name="formDemo">
		<input id="yw" name="yw" type="hidden" value="${yw }">
		  <input id="id" name="id" type="hidden" value="${t.id }">
		  <div class="layui-form-item" style="margin-top:10px">
		  	<div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">姓名:</label>
		      <div class="layui-input-inline">
		        <input id="name" type="text" name="name" lay-verify="name" autocomplete="off" placeholder="请输入学生姓名" class="layui-input" style="width:200px" value="${t.name }">
		      </div>
		    </div>
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">学籍号:</label>
		      <div class="layui-input-inline">
		        <input id="studentNo" type="text" name="studentNo" lay-verify="studentNo" autocomplete="off" placeholder="请输入学籍号" class="layui-input" style="width:200px" value="${t.studentNo }">
		      </div>
		    </div>
		    
		  </div>
		  
		  <div class="layui-form-item" style="margin-top:10px">
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">身份证号码:</label>
		      <div class="layui-input-inline">
		        <input id="idCardNumber" type="text" name="idCardNumber" lay-verify="idCardNumber" autocomplete="off" placeholder="请输入身份证号" class="layui-input" style="width:200px" value="${t.idCardNumber }">
		      </div>
		    </div>
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">性别:</label>
		      <div class="layui-input-inline" style="width:200px;">
		          <!-- <input id="newSexMale" type="radio" name="sex" value="1" title="男" checked="checked" class="layui-input" >
			      <input id="newSexFmale" type="radio" name="sex" value="0" title="女" class="layui-input" > -->
			      <select name="sex" id="sex" lay-filter="sex">
			      	<option value="-1" >请选择性别</option>
			        <option value="1" <c:if test="${t.sex eq 1 }"> selected="selected"</c:if>>男</option>
			        <option value="0" <c:if test="${t.sex eq 0 }"> selected="selected"</c:if>>女</option>
			      </select>
			  
		      </div>
		    </div>
		  </div>
		  <!-- <div class="layui-form-item" style="margin-top:10px">
		    <label class="layui-form-label"  style="width:120px">照片:</label>
		    <div class="layui-input-block">
		       <div class="layui-upload">
				  <button type="button" class="layui-btn" id="test1">上传图片</button>
				  <div class="layui-upload-list">
				    <img class="layui-upload-img" id="demo1">
				    <p id="demoText"></p>
				  </div>
			</div>  
		    </div>
		  </div> -->
		  
		  
		  
		   <div class="layui-form-item"  style="margin-top:10px">
		    <label class="layui-form-label"   style="width:120px">请选择班级:</label>
		    <div class="layui-input-inline" style="width:200px;">
		      <select name="schoolCode" id="schoolCode"  lay-filter="schoolCode">
		        <option value="-1">请选择校区学部</option>
		      </select>
		    </div>
		    <div class="layui-input-inline" style="width:116px">
		      <select name="cureentSchoolCode" id="cureentSchoolCode" lay-filter="cureentSchoolCode">
		        <option value="-1">请选择学段</option>
		      </select>
		    </div>
		    <div class="layui-input-inline"  style="width:116px">
		      <select name="gradeNo" id="gradeNo"  lay-filter="gradeNo">
		        <option value="-1">请选择年级</option>
		      </select>
		    </div>
		     <div class="layui-input-inline" style="width:116px">
		      <input type="hidden" name="classNo" id="classNo">
		      <select name="classId" id="classId"  lay-filter="classId">
		        <option value="-1">请选择班级</option>
		      </select>
		    </div>
		  </div>
		  
		<div class="layui-form-item" style="margin-top:10px">
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">一卡通卡号:</label>
		      <div class="layui-input-inline">
		        <input id="cardNo" type="text" name="cardNo" autocomplete="off" placeholder="请输入一卡通卡号" class="layui-input" style="width:200px" value="${t.cardNo }">
		      </div>
		    </div>
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">一卡通颜色:</label>
		      <div class="layui-input-inline"  style="width:200px">
		          <select name="cardColor" id="cardColor">
			        <option value="-1">请选择颜色</option>
			        <option value="蓝" <c:if test="${t.cardColor eq '蓝' }">selected="selected"</c:if>>蓝</option>
			        <option value="红" <c:if test="${t.cardColor eq '红' }">selected="selected"</c:if>>红</option>
			        <option value="黄" <c:if test="${t.cardColor eq '黄' }">selected="selected"</c:if>>黄</option>
			        <option value="绿" <c:if test="${t.cardColor eq '绿' }">selected="selected"</c:if>>绿</option>
			        <option value="白" <c:if test="${t.cardColor eq '白' }">selected="selected"</c:if>>白</option>
			      </select>
		      </div>
		    </div>
		  </div>
		  
		 <div class="layui-form-item" style="margin-top:10px">
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">学籍状态:</label>
		      <div class="layui-input-inline">
		        <select name="studentStatus" id="studentStatus">
			        <option value="0" <c:if test="${t.studentStatus eq '0' }">selected="selected"</c:if>>在读</option>
			        <option value="1" <c:if test="${t.studentStatus eq '1' }">selected="selected"</c:if>>休学</option>
			        <option value="2" <c:if test="${t.studentStatus eq '2' }">selected="selected"</c:if>>退学</option>
			        <option value="3" <c:if test="${t.studentStatus eq '3' }">selected="selected"</c:if>>毕业</option>
			      </select>
		      </div>
		    </div>
		    <!-- <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">缴费状态:</label>
		      <div class="layui-input-inline">
		         <select name="payStatus" id="payStatus" disabled="true">
			        <option value="0" <c:if test="${empty t.payStatus }">selected="selected"</c:if>>未缴费</option>
			        <option value="1" <c:if test="${t.payStatus eq '1' }">selected="selected"</c:if>>已缴费</option>
			      </select>
		      </div>
		    </div> -->
		    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">学号:</label>
		      <div class="layui-input-inline">
		         <input id="studentCode" type="text" name="studentCode" lay-verify="studentCode" autocomplete="off" placeholder="请输入学号" class="layui-input" style="width:200px" value="${t.studentCode }">
		      </div>
		    </div>
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
//Demo
layui.use('form', function(){
	var form = layui.form();
	
	var yw = $('#yw').val();
	var _schoolCode = '${t.schoolCode}';
	var _cureentSchoolCode = '${t.cureentSchoolCode}';
	var _gradeNo = '${t.gradeNo}';
	var _classId = '${t.classId}';
	var _classNo = '${t.classNo}';
	
	var schoolUrl;
	var stageUrl;
	var gradeUrl;
	var classUrl;
	if(yw == 'true'){
		schoolUrl="yw/AllSchool";
		stageUrl ="yw/AllStage?schoolCode="+_schoolCode;
		gradeUrl ="yw/AllGrade";
		classUrl="yw/AllClasses";
	}else{
		schoolUrl="student/cascadeschools";
		stageUrl ="student/cascadestages?schoolCode=" + _schoolCode;
		gradeUrl ="student/cascadegrades";
		classUrl="student/cascadeclasses";
	}
	//级联开始
	//级联
	  $.ajax({
	        type: "POST",
	        url: schoolUrl,
	        data: {},
	        dataType: "json",
	        cache: false,
	        success: function(a) {
//	        	console.info(a);
	            var length = a.length;
	            $('#schoolCode').html('<option value="-1">请选择校区学部</option>');
	            for (var i = 0; i < length; i++) {
	            if(yw == 'true'){
	            	$('#schoolCode').append('<option value="' + a[i].code + '">' + a[i].name + '</option>');
	            }else{
	            	$('#schoolCode').append('<option value="' + a[i].schoolCode + '">' + a[i].schoolName + '</option>');
	            }
	            	
	            };
	            if(null != _schoolCode && ''!= _schoolCode && undefined != _schoolCode && '-1'!=_schoolCode){
	            	 $("#schoolCode option[value='"+_schoolCode+"']").attr("selected", true);//选中
	            	 //加载学段开始
	            	   $.ajax({
					        type: "POST",
					        url: stageUrl,
					        dataType: "json",
					        cache: false,
					        success: function(result) {
					            var length = result.length;
					            $('#cureentSchoolCode').html('<option value="-1">请选择学段</option>');
					            
					            $('#gradeNo').html('<option value="-1">请选择年级</option>');
					            $('#classId').html('<option value="-1">请选择班级</option>');
					            $('#classNo').val('-1');
					            for (var i = 0; i < length; i++) {
					            if(yw == 'true'){
					            	$('#cureentSchoolCode').append('<option value="' + result[i].code + '">' + result[i].name + '</option>');
					            }else{
					            	var name;
		            				if(result[i].stage == 1){
		            					name="小学"
		            				}else if(result[i].stage == 2){
		            					name="初中"
		            				}else{
		            					name="高中"
		            				}
					                $('#cureentSchoolCode').append('<option value="' + result[i].stage + '">' + name + '</option>');
					            }
					            
					            };
					            if(null != _cureentSchoolCode && ''!= _cureentSchoolCode && undefined != _cureentSchoolCode && '-1'!=_cureentSchoolCode){
					            	 $("#cureentSchoolCode option[value='"+_cureentSchoolCode + "']").attr("selected", true);//选中
					            	 //加载年级开始
					            	 	$.ajax({
									        type: "POST",
									        url: gradeUrl,
									        data: {
									        	'schoolCode':$('#schoolCode').val(),
									        	'stage':_cureentSchoolCode
									        },
									        dataType: "json",
									        cache: false,
									        error: function(a, b, c) {},
									        success: function(a) {
									        	//console.info(a);
									            var length = a.length;
									            $('#gradeNo').html('<option value="-1">请选择年级</option>');
									            $('#classId').html('<option value="-1">请选择班级</option>');
									            $('#classNo').val('-1');
									            
									            for (var i = 0; i < length; i++) {
									                $('#gradeNo').append('<option value="' + a[i] + '">' + a[i] + '年级</option>');
									            };
									            if(null != _gradeNo && ''!= _gradeNo && undefined != _gradeNo && '-1'!=_gradeNo){
									            	 $("#gradeNo option[value='"+_gradeNo + "']").attr("selected", true);//选中
									            	 
									            	 //加载班级开始
									            	 	$.ajax({
													        type: "POST",
													        url: classUrl,
													        data: {
													        	'schoolCode':$('#schoolCode').val(),
													        	'stage':$('#cureentSchoolCode').val(),
													        	'grade':_gradeNo
													        },
													        dataType: "json",
													        cache: false,
													        error: function(a, b, c) {},
													        success: function(a) {
													            var length = a.length;
													            $('#classId').html('<option value="-1">请选择班级</option>');
													            $('#classNo').val('-1');
													           	var gradeName = $('#gradeNo').find('option:selected').text();
													           	console.log(a);
													            for (var i = 0; i < length; i++) {
													            if(yw == 'true'){
													            	$('#classId').append('<option value="' + a[i].id + '">' + a[i].classNo + '</option>');
													            }else{
													            	$('#classId').append('<option value="' + a[i].classId + '">' + a[i].classNo + '</option>');
													            }
													                
													            };
													            if(null != _classId && ''!= _classId && undefined != _classId && '-1'!=_classId){
													            	 $("#classId option[value='"+_classId + "']").attr("selected", true);//选中
													            	 $('#classNo').val(_classNo);
													            }
													            form.render('select'); //刷新select选择框渲染
													        }
													    });
									            	 //加载班级结束
									            }
									            
									            form.render('select'); //刷新select选择框渲染
									        }
									    });
					            	 //加载年级结束
					            	
					            }
					            form.render('select'); //刷新select选择框渲染
					            
					            
					            
					        }
					    });
	            	 //加载学段结束
	            }
	           
	            
	            
	            form.render('select'); //刷新select选择框渲染
	            
	            
	        }
	    });	
	
	//选择学部时
	  form.on('select(schoolCode)', function(data){
//		  console.info(data);
			var schoolCode = $('#schoolCode').val();
		  var Url;
		  if(yw == 'true'){
		  	Url = "yw/AllStage?schoolCode="+schoolCode;
		  }else{
		  	Url = "student/cascadestages?schoolCode="+schoolCode;
		  }
		  //拿到学段cureentSchoolCode和年级gradeNo
		  $.ajax({
		        type: "POST",
		        url: Url,
		        /*
		        data: {
		        	'schoolCode':data.value
		        },
		        */
		        //contentType: "application/json", 
		        dataType: "json",
		        cache: false,
		        success: function(result) {
//		        	console.info(result);
		            var length = result.length;
		            $('#cureentSchoolCode').html('<option value="-1">请选择学段</option>');
		            
		            $('#gradeNo').html('<option value="-1">请选择年级</option>');
		            $('#classId').html('<option value="-1">请选择班级</option>');
		            $('#classNo').val('-1');
		            if(result[0]==null){
		            	$('#cureentSchoolCode').html('<option value="-1">无学段信息</option>');
		            	$('#gradeNo').html('<option value="-1">无年级信息</option>');
		           		$('#classId').html('<option value="-1">无班级信息</option>');
		            }else{
		            for (var i = 0; i < length; i++) {
		            if(yw == 'true'){
		            	$('#cureentSchoolCode').append('<option value="' + result[i].code + '">' + result[i].name + '</option>');
		            }else{
		            	var name;
		            			if(result[i].stage == 1){
		            				name="小学"
		            			}else
		            			if(result[i].stage == 2){
		            				name="初中"
		            			}else{
		            				name="高中"
		            			}
		                $('#cureentSchoolCode').append('<option value="' + result[i].stage + '">' + name + '</option>');
		            }
		            			
		            };
		            }
		            form.render('select'); //刷新select选择框渲染
		        }
		    });
	  });
	  
	//选择学段
	  form.on('select(cureentSchoolCode)', function(data){
//		  console.info(data);
//		  console.info($('#schoolCode').val());
		  
		  $.ajax({
		        type: "POST",
		        url: gradeUrl,
		        data: {
		        	'schoolCode':$('#schoolCode').val(),
		        	'stage':data.value
		        },
		        dataType: "json",
		        cache: false,
		        error: function(a) {},
		        success: function(a) {
		        	//console.info(a);
		            var length = a.length;
		            $('#gradeNo').html('<option value="-1">请选择年级</option>');
		            $('#classId').html('<option value="-1">请选择班级</option>');
		            $('#classNo').val('-1');
		            if(a[0]==null){
		            	$('#gradeNo').html('<option value="-1">无年级信息</option>');
		            	$('#classId').html('<option value="-1">无班级信息</option>');
		            }else{
		            for (var i = 0; i < length; i++) {
		                $('#gradeNo').append('<option value="' + a[i] + '">' + a[i] + '年级</option>');
		            };
		            }
		            form.render('select'); //刷新select选择框渲染
		        }
		    });
	  });
	  
	  //选择年级
	  form.on('select(gradeNo)',function(data){
//		  console.info(data);
//		  console.info("cureentSchoolCode:" + $('#cureentSchoolCode').val());
//		  console.info("schoolCode:" + $('#schoolCode').val());
		  
		  $.ajax({
		        type: "POST",
		        url: classUrl,
		        data: {
		        	'schoolCode':$('#schoolCode').val(),
		        	'stage':$('#cureentSchoolCode').val(),
		        	'grade':data.value
		        },
		        dataType: "json",
		        cache: false,
		        error: function(a, b, c) {},
		        success: function(a) {
//		        	console.info(a);
		            var length = a.length;
		            $('#classId').html('<option value="-1">请选择班级</option>');
		            $('#classNo').val('-1');
		            var gradeName = $('#gradeNo').find('option:selected').text();
		            if(a[0] == null){
		            	$('#classId').html('<option value="-1">无班级信息</option>');
		            }else{
		            for (var i = 0; i < length; i++) {
		            	if(yw == 'true'){
		            		$('#classId').append('<option value="' + a[i].id + '">' +a[i].classNo+ '</option>');
		            	}else{
		            		$('#classId').append('<option value="' + a[i].classId + '">' +a[i].classNo+ '</option>');
		            	}
		                
		            };
		            }
		            form.render('select'); //刷新select选择框渲染
		        }
		    });
	  });
	  
	  //选择班级
	  form.on('select(classId)',function(data){
		  //修改隐藏域的值classNo
		  $('#classNo').val($('#classId').find('option:selected').text());
	  });
	  
	//级联结束
	
});

var callbackdata = function () {
	/*
    //var value = $('[name=role]:checked').attr('value');
    //var text = $('[name=role]:checked').attr('title');
    
    var id = $('#id').val();
    var jobNumber = $('#jobNumber').val();
    var name = $('#name').val();
    var phone = $('#phone').val();
    
    var sex = $('[name=sex]:checked').attr('value');
    var schools = new Array();
    
    $('[name=schoolCode]:checked').each(function(){
    	var value = $(this).attr('value');
        var text = $(this).attr('title');
        schools.push({
        	'code': value,
        	'name': text
        });
    });

   
    if(schools.length == 0){
    	layer.msg('至少选择一个学校', {
            time: 1500, //2s后自动关闭
            area: ['220px', '50px']
          });
    	return;
    }
    
    if(jobNumber == null || jobNumber == '' || jobNumber == undefined){
    	layer.msg('请输入员工号', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
    	
    	return;
    }
    
    if(name == null || name == '' || name == undefined){
    	layer.msg('请输入姓名', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
    	
    	return;
    }
    
    if(phone == null || phone == '' || phone == undefined){
    	layer.msg('请输入手机号', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
    	
    	return;
    }
    */
    
   var id = $('#id').val();
   var name = $('#name').val();
   var studentNo = $('#studentNo').val();
   var idCardNumber = $('#idCardNumber').val();
   var sex = $('#sex').val();
   var cardNo = $('#cardNo').val();
   var cardColor = $('#cardColor').val();
   var payStatus = $('#payStatus').val();
   var studentStatus = $('#studentStatus').val();
   var schoolCode = $('#schoolCode').val();
   var cureentSchoolCode = $('#cureentSchoolCode').val();
   var gradeNo = $('#gradeNo').val();
   var classId = $('#classId').val();
   var classNo = $('#classNo').val();
   var studentCode = $('#studentCode').val();
   
   //验证判断
   if(name == null || name == '' || name == undefined){
		layer.msg('请输入姓名', {
		       time: 1000, //2s后自动关闭
		       area: ['220px', '50px']
		 });
		$('#name').focus();
		
		return;
   }
   
   if(studentNo == null || studentNo == '' || studentNo == undefined){
		layer.msg('请输入学籍号', {
		       time: 1000, //2s后自动关闭
		       area: ['220px', '50px']
		 });
		$('#studentNo').focus();
		
		return;
   } else {
	   //判断是否为数字和字母
	   var re = /^[0-9a-zA-Z]*$/g;
	   if(false == re.test(studentNo)){
		   layer.msg('学籍号必须是数字字母', {
			       time: 1000, //2s后自动关闭
			       area: ['220px', '50px']
			 });
			$('#studentNo').focus();
			
			return;
	   }
   }
   
    if(idCardNumber == null || idCardNumber == '' || idCardNumber == undefined){
			layer.msg('请输入身份证号', {
			       time: 1000, //2s后自动关闭
			       area: ['220px', '50px']
			 });
			$('#idCardNumber').focus();
			
			return;
	 }
	 
	 /*if(studentCode == null || studentCode == '' || studentCode == undefined){
			layer.msg('请输入学号', {
			       time: 1000, //2s后自动关闭
			       area: ['220px', '50px']
			 });
			$('#studentCode').focus();
			
			return;
	 }*/
   
   var data = {
            'id': id,
            'name': name,
            'studentNo': studentNo,
            'sex': sex,
            'idCardNumber':idCardNumber,
            'cardNo': cardNo,
            'cardColor': cardColor,
            'payStatus': payStatus,
            'studentStatus': studentStatus,
            'schoolCode':schoolCode,
            'cureentSchoolCode':cureentSchoolCode,
            'gradeNo':gradeNo,
            'classId':classId,
            'classNo':classNo,
            'studentCode':studentCode
        };
    return data;
}
</script>
</body>


</html>