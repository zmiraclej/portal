<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">教师管理</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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

<body class="hold-transition skin-blue-light sidebar-mini">
<form class="layui-form" action="">
	<div class="wrapper" style="padding: 10px 10px 0 10px">

		<fieldset class="layui-elem-field">
			  <legend>学科</legend>
			  <div class="layui-field-box">
				    <c:forEach items="${dicts}" var="c">
				    	<input type="radio" name="classes" value="${c.code }" lay-skin="primary" title="${c.name }">
			    	</c:forEach>
			    	<input type="radio" name="classes" value="-1" lay-skin="primary" title="无" checked="checked">
			  </div>
			</fieldset>

		<fieldset class="layui-elem-field">
			  <legend> 年级组长 </legend>
			  <div class="layui-field-box">
				    <c:forEach items="${grades}" var="g">
				    	<input type="checkbox" name="classes" value="${g.grade }" lay-skin="primary" title="${g.grade } 年级">
			    	</c:forEach>
			  </div>
			</fieldset>

		<c:forEach items="${grades}" var="g">
			<fieldset class="layui-elem-field">
			  <legend> ${g.grade } 年级 </legend>
			  <div class="layui-field-box">
					<c:set value="${g.classes }" var="classes"></c:set>
				    <c:forEach items="${classes}" var="c">
				    	<input type="checkbox" name="classes" value="${c.classNo }" lay-skin="primary" title="${c.className }">
			    	</c:forEach>
			  </div>
			</fieldset>
		</c:forEach>
		
		
		
		<!-- <div class="layui-form-item" style="margin-top:10px">
				   <label class="layui-form-label"  style="width:120px">性别:</label>
				    <div class="layui-input-block">
				      <input id="newSexMale" type="radio" name="sex" value="1" title="男" checked="checked" class="layui-input" >
				      <input id="newSexFmale" type="radio" name="sex" value="0" title="女" class="layui-input" >
				    </div>
			  </div> -->
			  
			  <fieldset class="layui-elem-field">
			  <legend> 班主任 </legend>
			  <div class="layui-field-box">
				 <div class="layui-form-item">
				    <label class="layui-form-label">选择班级:</label>
				    <div id="classDiv" class="layui-input-block">
				      <input type="radio" name="sex" value="1" title="无" checked="checked" class="layui-input" >
				    </div>
				  </div>
			  </div>
			</fieldset>
		<input type="button" id="aaaa" name="sex" value="我是按钮" title="无" class="layui-input" >
	</div>
	
	<div class="layui-form-item" style="margin-top:10px;margin-left: 10px;">	
		  <ol style="color: red;">
			<li>教研组长：只选择学科</li>
			<li>年级组长：只选年级</li>
			<li>备课组长：选择学科和年级</li>
		</ol>
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

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>
<script type="text/javascript">
layui.use('form', function(){
	var form = layui.form;
	//监听提交
	
});

$(function(){
	$('#aaaa').click(function(){
		//alert('1');
		$('[name=classes]').each(function(){
			$(this).on('change',function(){
					alert($(this).attr('title'));
			})
		});
	 });
	///$("input[name='classes']").click(function(){
	//	alert($(this).attr('title'));
	//  });
	
	//$("[name='classes']").on('change',function(){
		///alert($(this).attr('title'));
//});
	
	//$('[name=classes]').each(function(){
	//	$(this).on('change',function(){
	//		alert($(this).attr('title'));
	//	})
	//});
});

</script>
</body>


</html>