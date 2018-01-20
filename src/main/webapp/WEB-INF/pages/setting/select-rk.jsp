<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">选择角色类型</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="css/jqueryTable/jqx.base.css" type="text/css" />
	    <!-- Bootstrap 3.3.6 -->
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
		
		<fieldset class="layui-elem-field">
			  <legend>学科</legend>
			  <div class="layui-field-box">
				    <c:forEach items="${dicts}" var="c">
				    	<input type="radio" name="course" value="${c.code }" lay-skin="primary" title="${c.name }">
			    	</c:forEach>
			  </div>
			</fieldset>

		<c:forEach items="${grades}" var="g">
			<fieldset class="layui-elem-field">
			  <legend>${g.stageName }&nbsp;${g.grade }&nbsp;年级 </legend>
			  <div class="layui-field-box">
					<c:set value="${g.classes }" var="classes"></c:set>
				    <c:forEach items="${classes}" var="c">
				    	<input type="checkbox" name="classes" value="${c.classId }" stage="${g.stage }"  grade="${g.grade }" lay-skin="primary" title="${c.className }">
			    	</c:forEach>
			  </div>
			</fieldset>
		</c:forEach>
		
		
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
    var value = $('[name=course]:checked').attr('value');
    var text = $('[name=course]:checked').attr('title');
    
    var data = {};
    
    if(value == null || value == '' || value == undefined){
    	layer.msg('请选择需要配置的学科', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
    	
    	return;
    }
    else{
    	data['courseCode'] = value,
		data['courseName'] = text
    }
    
    var classes = new Array();
    
    $('[name=classes]:checked').each(function(){
    	var classValue = $(this).attr('value');
        var classText = $(this).attr('title');
        var classGrade = $(this).attr('grade');
        var classStage = $(this).attr('stage');
        
        classes.push({
    		'classId': classValue,
            'className': classText,
            'grade': classGrade,
            'stage': classStage
    	});
    });
    
    if(classes == null || classes.length == 0){
    	layer.msg('请选择需要配置的班级', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
    	
    	return;
    }
    
    data['classes'] = classes;

    return data;
}
</script>
</body>


</html>