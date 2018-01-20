<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">评分标准</title>
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
	<link rel="stylesheet" href="js/plugins/ztree/zTreeStyle/zTreeStyle.css">
	<link rel="stylesheet" href="${ctx}/js/plugins/ztree/zTreeStyle/zTreeStyle.css">
  	<link rel="stylesheet" href="${ctx}/js/plugins/file-input/css/fileinput.min.css">
  	<%-- <link rel="stylesheet" href="${ctx}/js/plugins/daterangepicker/daterangepicker.css"> --%>
</head>

<body class="hold-transition skin-blue-light sidebar-mini">
	<div class="wrapper">

		<!-- 头部开始 -->
		<jsp:include page="../includes/top.jsp">
			<jsp:param name="userName" value="${userName}" />
		</jsp:include>
		<!-- 头部结束 -->


		<!-- 左边部分       startup -->
		<jsp:include page="../includes/left.jsp">
			<jsp:param name="userName" value="${userName}" />
		</jsp:include>

		<!-- 左边部分       end -->


		<div class="content-wrapper">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
			<ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-dashboard"></i> 综合素质评价 </a></li>
				<li class="active">评分标准</li>
			</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle">
			
			<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top:0px;">
					<table id="standardTable" data-toggle="table">
						
					</table>
				</section>
			<!-- 中间部分-main     end -->
		</div>
	</div>
	<!-- 底部       startup  -->
	<%@ include file="../includes/bottom.jsp"%>
	<!-- 底部       end -->

	<!-- 设置按钮页面       startup -->
	<%@ include file="../includes/rightSetup.jsp"%>
	<!-- 设置按钮页面       end -->
	<div class="control-sidebar-bg"></div>
	
</div>
<div id="insToolbar" class="btn-group">
	<div class="layui-btn-group" style="margin-left:10px">
			<button id="addStandard"  class="layui-btn">添加</button>
			<button id="editStandard"  class="layui-btn">编辑</button>
     		<button id="deleteStandard"  class="layui-btn">删除</button>
		    <button id="reviewStandard"  class="layui-btn">详情</button>
  	</div>
</div>



<!-- 查看详情-->
<div id="tatilContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	
	<div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">编号:</label>
	    <div class="layui-input-inline">
	      <input type="text" id="code" class="form-control" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">等级:</label>
	    <div class="layui-input-inline">
          <input type="text" id="blLeaf" class="form-control" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">名称:</label>
	     <div class="layui-input-inline"  style="width:350px">
	      <textarea id="name_" rows="5" class="form-control" readonly></textarea>
	    </div>
	  </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">审核角色:</label>
	     <div class="layui-input-inline">
          <input type="text" id="authRole" class="form-control" readonly>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">基准分:</label>
	    <div class="layui-input-inline">
          <input type="text" id="baseScore" class="form-control" readonly>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">加减分类型:</label>
	    <div class="layui-input-inline">
          <input type="text" id="type" class="form-control" readonly>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">累计次数:</label>
	    <div class="layui-input-inline">
	      <input id="insNum" type="text" class="form-control" autocomplete="off" readonly>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">最低加减分:</label>
	    <div class="layui-input-inline">
	      <input id="insScoreMin" type="text" class="form-control" autocomplete="off" readonly>
	    </div>
	 </div>
	
	 <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">最高加减分:</label>
	    <div class="layui-input-inline">
          <input type="text" id="insScoreMax" class="form-control" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">记录周期:</label>
	    <div class="layui-input-inline">
	    <input type="text" id="reportCycle" class="form-control" readonly>
	    </div>
	 </div>
	 	<input type="hidden" name="code" id="insId1" />
		<div class="layui-form-item">
		    <div class="layui-input-block" style="text-align: center">
		      <button class="layui-btn" lay-submit lay-filter="formDemo2">关闭</button>
		    </div>
		  </div>
	</form>  
</div>

<!-- 来到编辑页面-->
<div id="editContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
 	
 	<div  class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">编号:</label>
	    <div class="layui-input-inline">
	      <input type="text" id="code_" class="form-control" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">等级:</label>
	    <div class="layui-input-inline">
		     <select id="blLeaf_"  class="layui-select" style="height: 34px;">
				 <option value="0">一级</option>
				<option value="1">二级</option> 
			</select>
		</div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">名称:</label>
	     <div class="layui-input-inline"  style="width:350px">
	      <textarea id="name1_" rows="5" class="form-control" ></textarea>
	    </div>
	  </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">审核角色:</label>
	    <div class="layui-input-inline">
		     <select id="authRole_" class="layui-select" style="height: 34px;">
				<option value="1">班主任</option>
				<option value="2">任课老师</option>
				<option value="3">生辅老师</option>
				<option value="7">德育老师</option>
			</select>
		</div>
	    
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">基准分:</label>
	    <div class="layui-input-inline">
          <input type="text" id="baseScore_" class="form-control" >
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">加减分类型:</label>
	     <div class="layui-input-inline">
		     <select id="type_" class="layui-select" style="height: 34px;">
				<option value="01">加分</option>
				<option value="02">减分</option>
			</select>
		</div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">累计次数:</label>
	    <div class="layui-input-inline">
	      <input id="insNum_" type="text" class="form-control" autocomplete="off" >
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">最低加减分:</label>
	    <div class="layui-input-inline">
	      <input id="insScoreMin_" type="text" class="form-control" autocomplete="off" >
	    </div>
	 </div>
	
	 <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">最高加减分:</label>
	    <div class="layui-input-inline">
          <input type="text" id="insScoreMax_" class="form-control" >
	    </div>
	  </div>
	  <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">记录周期:</label>
	     <div class="layui-input-inline">
		     <select id="reportCycle_" class="layui-select" style="height: 34px;">
				<option value="01">不限</option>
				<option value="02">每月一次</option>
				<option value="03">期末一次</option>
				<option value="04">期中期末各一次</option>
			</select>
		</div>
	 </div>
	 	<input type="hidden" name="code" id="code_" />
		<div class="layui-form-item">
		    <div class="layui-input-block" style="text-align: center">
		      <button class="layui-btn" lay-submit lay-filter="formEdit">提交</button>
		    </div>
		  </div>
	</form>  
</div>



<!-- 添加页面-->
<div id="addContent" style="display:none;width:100%;height:90%">
		 例如，01代表思想品德，以此类推01,02,03；等级选择一级。
             	 <br/>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01001代表思想品德下面的某项评测标准，以此类推01002，01003；等级选择二级
	<form class="layui-form" action="">
	
	<div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">编号:</label>
	    <div class="layui-input-inline">
	      <input type="text" id="codev" name="code" class="form-control" >
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">等级:</label>
	    <div class="layui-input-inline">
		     <select id="blLeafv" name="blLeaf"  style="height: 34px;">
				<option value="0" >一级</option>
				<option value="1"  >二级</option>
			</select>
		</div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">名称:</label>
	     <div class="layui-input-inline"  style="width:350px">
	      <textarea id="namev" rows="5" class="form-control" ></textarea>
	    </div>
	  </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">审核角色:</label>
	    <div class="layui-input-inline">
		     <select id="authRolev" name="authRole" class="layui-select" style="height: 34px;">
				<option value="1">班主任</option>
				<option value="2">任课老师</option>
				<option value="3">生辅老师</option>
				<option value="7"  >德育老师</option>
			</select>
		</div>
	    
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">基准分:</label>
	    <div class="layui-input-inline">
          <input type="text" id="baseScorev" name="baseScore" class="form-control" >
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">加减分类型:</label>
	     <div class="layui-input-inline">
		     <select id="typev" name="type"  style="height: 34px;">
				<option value="01">加分</option>
				<option value="02">减分</option>
			</select>
		</div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">累计次数:</label>
	    <div class="layui-input-inline">
	      <input id="insNumv" name="insNum" type="text" class="form-control" autocomplete="off" >
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">最低加减分:</label>
	    <div class="layui-input-inline">
	      <input id="insScoreMinv" name="insScoreMin" type="text" class="form-control" autocomplete="off" >
	    </div>
	 </div>
	
	 <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">最高加减分:</label>
	    <div class="layui-input-inline">
          <input type="text" id="insScoreMaxv" name="insScoreMax" class="form-control" >
	    </div>
	  </div>
	  <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">记录周期:</label>
	     <div class="layui-input-inline">
		     <select id="reportCyclev"  name="reportCycle" style="height: 34px;">
				<option value="01">不限</option>
				<option value="02">每月一次</option>
				<option value="03">期末一次</option>
				<option value="04">期中期末各一次</option>
			</select>
		</div>
	 </div>
	 	<!-- <input type="hidden" name="code" id="code_" /> -->
		<div class="layui-form-item">
		    <div class="layui-input-block" style="text-align: center">
		      <button class="layui-btn" id="submitAdd"  lay-submit lay-filter="formAdd">提交</button> 
		     <!--  <button class="layui-btn" id="submitAdd"  >提交</button> -->
		    </div>
		  </div>
	</form>  
</div>



<script type="text/javascript" src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- ./wrapper -->
<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/plugins/layui/layui.js"></script>
<script type="text/javascript" src="js/common.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>

<script src="js/pages/ins/standardList.js"></script>
<script src="${ctx}/js/plugins/ztree/jquery.ztree.core.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/plugins/sortable.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/plugins/purify.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/fileinput.js"></script>
<script src="${ctx}/js/plugins/file-input/js/locales/zh.js"></script>

<script>




function getIns(insId,flag){
	
	$.post("standardDetail", {
		"code" : insId
	}, function(data) {
	
			var standard=data.data;
			//var date = new Date();
			var reportCycle = "";
			if(standard.reportCycle=="01"){
				reportCycle = "不限";
			}
			if(standard.reportCycle=="02"){
				reportCycle = "每月一次";
			}
			if(standard.reportCycle=="03"){
				reportCycle = "期末一次";
			}
			if(standard.reportCycle=="04"){
				reportCycle = "期中期末各一次";
			}
			var blLeaf="";
			if(standard.blLeaf=="0"){
				blLeaf = "一级";
			}
			if(standard.blLeaf=="1"){
				blLeaf = "二级";
			}
			var authRole="";
			if(standard.authRole=="1"){
				authRole = "班主任";
			}
			if(standard.authRole=="2"){
				authRole = "任课老师";
			}
			if(standard.authRole=="3"){
				authRole = "生辅老师";
			}
			if(standard.authRole=="7"){
				authRole = "德育老师";
			}
			var type="";
			if(standard.type=="01"){
				type = "加分";
			}
			if(standard.type=="02"){
				type = "减分";
			}
			if(flag==1){
				$('#code').val(standard.code);
				$('#blLeaf').val(blLeaf);
				$('#name_').val(standard.name);
				$('#authRole').val(authRole);
				$('#baseScore').val(standard.baseScore);
				$('#type').val(type);
				$('#insNum').val(standard.insNum);
				$('#insScoreMin').val(standard.insScoreMin);
				$('#insScoreMax').val(standard.insScoreMax);
				$('#reportCycle').val(reportCycle);
			}else if(flag==2){
				
				
				
				
				$('#code_').val(standard.code);
				var ss=standard.blLeaf;
				alert(ss);
				
				/* $("#blLeaf_>option").each(function(index,element){
					if($(this).val() == ss){
						$(this).attr("selected","selected");
					}
				}); */
				$("#blLeaf_").empty();
				if(ss == 0){
					$("#blLeaf_").append("<option value='0' selected='selected'>一级</option>");
					$("#blLeaf_").append("<option value='1'>二级</option>");
				}else{
					$("#blLeaf_").append("<option value='0'>一级</option>");
					$("#blLeaf_").append("<option value='1' selected='selected'>二级</option>");
				}
				
				
				//$("#blLeaf_").val(ss);
				//$("#blLeaf_").find("option:selected").removeAttr("selected");
		       // $("#blLeaf_ option[value='"+ss+"']").attr("selected",true);  
			 	//$('#blLeaf_ option:last').attr('selected','selected');

			 	//layui.form().render('select');
				$('#name1_').val(standard.name);
				$("#authRole_ option[value='"+standard.authRole+"']").attr("selected","selected");  
				$('#baseScore_').val(standard.baseScore);
				$("#type_ option[value='"+standard.type+"']").attr("selected","selected");  
				$('#insNum_').val(standard.insNum);
				$('#insScoreMin_').val(standard.insScoreMin);
				$('#insScoreMax_').val(standard.insScoreMax);
				$("#reportCycle_ option[value='"+standard.reportCycle+"']").attr("selected","selected");  
			}
	});
	var form;
	function callback(){
		form.render();
	}
}



layui.use(['form','layer'], function(){
	var form = layui.form();
	window.layer = layui.layer;
	form.render();
	 //自定义验证规则

	  form.on('submit(formAdd)', function(data){
		  //var jsonParam = JSON.stringify(data.field);
		  var codev=$("#codev").val();
		  if(codev==""){
			  layer.alert('编码不能为空');
			  return false;
		  }
		  var blLeafv=$('#blLeafv option:selected').val();
		  var namev=$("#namev").val();
		  if(namev==""){
			  layer.alert('名称不能为空');
			  return false;
		  }
		  var authRolev=$('#authRolev option:selected').val();
		  var baseScorev=$("#baseScorev").val();
		  if(isNaN(baseScorev)){
			  layer.alert('基本分只能填数字');
			  return false;
		  }
		  var typev=$('#typev option:selected').val();
		  var insNumv=$("#insNumv").val();
		  if(isNaN(insNumv)){
			  layer.alert('累计次数只能填数字');
			  return false;
		  }
		  var insScoreMinv=$("#insScoreMinv").val();
		  if(isNaN(insScoreMinv)){
			  layer.alert('最低加减分只能填数字');
			  return false;
		  }
		  var insScoreMaxv=$("#insScoreMaxv").val();
		  if(isNaN(insScoreMaxv)){
			  layer.alert('最高加减分只能填数字');
			  return false;
		  }
		  var reportCyclev=$('#reportCyclev option:selected').val();
		    $.ajax({
		    	type : "POST",
		    	url : "saveStandard",
		    	//contentType: "application/json", 
		    	//dataType : "text",
		    	data:{
		    		code:codev,
		    		blLeaf:blLeafv,
		    		name:namev,
		    		authRole:authRolev,
		    		baseScore:baseScorev,
		    		type:typev,
		    		insNum:insNumv,
		    		insScoreMin:insScoreMinv,
		    		insScoreMax:insScoreMaxv,
		    		reportCycle:reportCyclev
		    	},
		    	success : function(result) {
		    		if(result.code=='02'){
		    			layer.closeAll();
		    			//reset信息
		    			resetAdd();
		    			 $('#standardTable').bootstrapTable(  
	    		              "refresh",  
	    		              {  
	    		                  url:"searchstandard"
	    		              }  
		    		      );  
		    			//$('#standardTable').bootstrapTable(getTParam());
		    		}
		    	}
		    });
		    return false;
	  });

	  
	  
	  
	  form.on('submit(formEdit)', function(data){
		  //var jsonParam = JSON.stringify(data.field);
		   var codev=$("#code_").val();
		   if(codev==""||codev==null){
				  layer.alert('编码不能为空');
				  return false;
			  }
		  var blLeafv=$('#blLeaf_ option:selected').val();
		  var namev=$("#name1_").val();
		  if(namev==""||namev==null){
			  layer.alert('名称不能为空');
			  return false;
		  }
		  var authRolev=$('#authRole_ option:selected').val();
		  var baseScorev=$("#baseScore_").val();
		
		  if(isNaN(baseScorev)){
			  layer.alert('基本分只能填数字');
			  return false;
		  }
		  var typev=$('#type_ option:selected').val();
		  var insNumv=$("#insNum_").val();
		  
		  if(isNaN(insNumv)){
			  layer.alert('累计次数只能填数字');
			  return false;
		  }
		  var insScoreMinv=$("#insScoreMin_").val();
		 
		  if(isNaN(insScoreMinv)){
			  layer.alert('最低加减分只能填数字');
			  return false;
		  }
		  var insScoreMaxv=$("#insScoreMax_").val();
		  if(isNaN(insScoreMaxv)){
			  layer.alert('最高加减分只能填数字');
			  return false;
		  }
		  var reportCyclev=$('#reportCycle_ option:selected').val();
		    $.ajax({
		    	type : "POST",
		    	url : "updateStandard",
		    /* 	contentType: "application/json", 
		    	dataType : "text", */
		    	data:{
		    		code:codev,
		    		blLeaf:blLeafv,
		    		name:namev,
		    		authRole:authRolev,
		    		baseScore:baseScorev,
		    		type:typev,
		    		insNum:insNumv,
		    		insScoreMin:insScoreMinv,
		    		insScoreMax:insScoreMaxv,
		    		reportCycle:reportCyclev
		    	},
		    	success : function(result) {
		    		if(result.code=='02'){
		    			layer.closeAll();
		    			$('#standardTable').bootstrapTable(  
	    		              "refresh",  
	    		              {  
	    		                  url:"searchstandard"
	    		              }  
		    		      ); 
		    			resetEdit();
		    		}
		    	}
		    });
		    return false;
	  });
	  
	   form.on('submit(formDemo2)', function(data){
		  layer.closeAll();
		  return false;
	  }); 
	  
	   form.render();
	  
});

/* function getBlLeaf(){
	var html="";
	var params = {
	};
	var url = 'getBlLeaf';
	jQuery.ajax({
		type: 'POST',
		contentType: 'application/x-www-form-urlencoded',
		url: url,
		data: params,
		dataType: 'json',
		success: function (data) {
		var list=data.data;
		for(var i=0;i<list.length;i++){
			var obj = list[i];
			var id=obj.id;
			var name=obj.name;
			 html+='<option value="'+id+'">'+name+'</option>';
		}
		$("#blLeaf_").html(html);
		
		},
	})
	
	
} */
//清空编辑框
function resetEdit(){
	  $("#code_").val("");
	  $('#blLeaf_ option:first').attr("selected",true);
	  $("#name_").val("");
	  $('#authRole_ option:first').attr("selected",true);
	  $("#baseScore_").val("");
	  $('#type_ option:first').attr("selected",true);
	  $("#insNum_").val("");
	  $("#insScoreMin_").val("");
	  $("#insScoreMax_").val("");
	  $('#reportCycle_ option:first').attr("selected",true);
}

function resetAdd(){
	 $("#codev").val("");
	  $('#blLeafv option:first').attr("selected",true);
	  $("#namev").val("");
	  $('#authRolev option:first').attr("selected",true);
	  $("#baseScorev").val("");
	  $('#typev option:first').attr("selected",true);
	  $("#insNumv").val("");
	  $("#insScoreMinv").val("");
	  $("#insScoreMaxv").val("");
	  $('#reportCyclev option:first').attr("selected",true);
}
</script>
	


</body>
</html>