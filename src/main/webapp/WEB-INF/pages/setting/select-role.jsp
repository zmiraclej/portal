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
						 <div class="layui-form-item">
					    <label class="layui-form-label">角色类型：</label>
					    <div class="layui-input-block">
							<input type="radio" name="role" value="1" title="任课教师" checked="checked" class="layui-input">
							<input type="radio" name="role" value="2" title="教研组长" class="layui-input">
							<input type="radio" name="role" value="3" title="备课组长" class="layui-input">
							<input type="radio" name="role" value="4" title="年级组长" class="layui-input">
							<input type="radio" name="role" value="5" title="班主任" class="layui-input">
							<input type="radio" name="role" value="6" title="学部领导" class="layui-input">
							<input type="radio" name="role" value="7" title="生辅老师" class="layui-input">
							<input type="radio" name="role" value="8" title="德育老师" class="layui-input">
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
    var value = $('[name=role]:checked').attr('value');
    var text = $('[name=role]:checked').attr('title');
    
    var data = {};
    
    if(value == null || value == '' || value == undefined){
    	layer.msg('请选择需要添加的角色类型', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
    	
    	return;
    }
    
    data = {
            'roleCode': value,
            'roleName': text
        };
    
    return data;
}
</script>
</body>


</html>