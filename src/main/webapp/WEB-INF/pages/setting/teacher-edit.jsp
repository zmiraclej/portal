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
	<form class="layui-form" action="">
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">员工号:</label>
	    <div class="layui-input-block">
	    	<input id="id" name="id" type="hidden" value="${t.id }">
	      <input id="jobNumber" type="text" name="jobNumber" lay-verify="jobNumber" value="${t.jobNumber }" autocomplete="off" placeholder="请输入员工号" class="layui-input" style="width:200px">
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
		    <label class="layui-form-label"  style="width:120px">姓名:</label>
		    <div class="layui-input-block">
		      <input id="name" type="text" name="name" value="${t.name }" lay-verify="name" autocomplete="off" placeholder="请输入姓名" class="layui-input" style="width:200px">
		    </div>
		  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">手机号:</label>
	    <div class="layui-input-block">
	      <input id="phone" type="text" name="phone"  value="${t.phone }" lay-verify="phone" autocomplete="off" placeholder="请输入手机号" class="layui-input" style="width:200px">
	    </div>
	     </div>
	    
	 <div class="layui-form-item" style="margin-top:10px">
		   <label class="layui-form-label"  style="width:120px">性别:</label>
		    <div class="layui-input-block">
		    	<c:if test="${t.sex eq '1' || t.sex == null}">
		    		<input id="newSexMale" type="radio" name="sex" value="1" title="男" checked="checked" class="layui-input" >
		    		<input id="newSexFmale" type="radio" name="sex" value="0" title="女" class="layui-input" >
		    	</c:if>
		    		<c:if test="${t.sex eq '0' }">
		    		<input id="newSexMale" type="radio" name="sex" value="1" title="男" class="layui-input" >
		    		<input id="newSexFmale" type="radio" name="sex" value="0" title="女" checked="checked" class="layui-input" >
		    	</c:if>
		    
		    </div>
		  </div>
		  
		  <div class="layui-form-item" style="margin-top:10px">
		   <label class="layui-form-label"  style="width:120px">学校:</label>
		    <div id="schoolsDiv" class="layui-input-block">
		    	<c:forEach items="${schools}" var="s">
		    		<c:if test="${s.checked }">
		    			<input type="checkbox" name="schoolCode" checked="checked" value="${s.code }" lay-skin="primary" title="${s.name }">
		    		</c:if>
		    		<c:if test="${!s.checked }">
		    			<input type="checkbox" name="schoolCode" value="${s.code }" lay-skin="primary" title="${s.name }">
		    		</c:if>
					
				</c:forEach>
		    	
		      <!-- <input type="checkbox" name="school" value="1" title="男" checked="checked" class="layui-input" >
		      <input type="checkbox" name="school" value="0" title="女" class="layui-input" > -->
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
	var form = layui.form;
	//监听提交
	
});

var callbackdata = function () {
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
    
    
    
   var data = {
            'id': id,
            'name': name,
            'jobNumber': jobNumber,
            'phone': phone,
            'sex': sex,
            'schools': schools
        };
    
    return data;
}
</script>
</body>


</html>