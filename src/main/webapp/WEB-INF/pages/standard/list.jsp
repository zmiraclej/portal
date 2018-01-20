<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<%-- <c:set var="ctx" value="${pageContext.request.contextPath}"/> --%>
<html>
<head>
  <meta charset="utf-8">
  <title>评分标准</title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
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
  	<!--
    注意样式表优先级
    主题样式必须在easyui组件样式后。
-->
  
<link href="${ctx}/easyui/themes/insdep/easyui.css" rel="stylesheet" type="text/css">
<link href="${ctx}/easyui/themes/insdep/easyui_animation.css" rel="stylesheet" type="text/css">
<!--
    easyui_animation.css
    Insdep对easyui的额外增加的动画效果样式，根据需求引入或不引入，此样式不会对easyui产生影响
-->
 
<link href="${ctx}/easyui/themes/insdep/icon.css" rel="stylesheet" type="text/css">
<!--
    icon.css
    美化过的easyui官方icons样式，根据需要自行引入
-->  
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
				<li><a href="#"><i class="fa fa-dashboard"></i>综合素质评价 </a></li>
				<li class="active">评分标准</li>
			</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle">
			
			<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top: 0px;">
					<div class="row">
						<div class="col-xs-12">
							<div class="box">
								<div class="box-header">
									<div class="form-group">
										<a href="javascript:void(0)" style="color: white;" id="create" class="btn btn-primary"
											style="float: left"><i class="glyphicon glyphicon-plus"></i>
											添加</a>
									</div>
								</div>
								<jsp:include page="/WEB-INF/layouts/message.jsp"></jsp:include>
								<!-- /.box-header -->
								<div class="box-body">
									<div id="example2_wrapper"
										class="dataTables_wrapper form-inline dt-bootstrap">
										<div class="row">
											<div class="col-sm-12">
												<table id="example2"
													class="table table-bordered table-hover dataTable"
													role="grid" aria-describedby="example2_info">
													<thead>
														<tr role="row">
															<th class="col-md-1">编码</th>
															<th class="col-md-1">名称</th>
															<th class="col-md-1">基准分</th>
															<th class="col-md-1">加减分(最低~最高)</th>
															<th class="col-md-1">是否可用</th>
															<th class="col-md-2">操作</th>
													</thead>
													<tbody>
														<c:forEach items="${standards.rows}" var="s">
															
																<tr role="row" class="odd">
																	<td>${s.code}</td>
																	<td>${s.name}</td>
																	<td>${s.baseScore}</td>
																	<td>
																	<c:if test="${s.type=='01'}">+(${s.insScoreMin}~${s.insScoreMax})</c:if>
																	<c:if test="${s.type=='02'}">-(${s.insScoreMin}~${s.insScoreMax})</c:if>
																	</td>
																	<td><c:if test="${s.blDelFlg=='1'}">不可用</c:if> <c:if
																			test="${s.blDelFlg=='0'}">可用</c:if></td>
																	<td><a
																		data-href="${ctx }/deleteFlag/${s.code}"
																		data-toggle="confirmation" class="btn btn-sm btn-primary">
																		<i class="fa fa-times"></i>删 除</a> 
																		<a href="javascript:void(0)" style="color: white;" onclick="openEdit('${s.code}')"
																		class="btn btn-sm btn-primary"><i
																			class="fa fa-edit"></i>编 辑</a>
																			
																		<a href="javascript:void(0)" onclick="openDitail('${s.code}')"
																		class="btn btn-sm btn-default"><i
																			class="fa fa-edit"></i>详情</a>
																			</td>
																</tr>

															
														</c:forEach>
													</tbody>
												</table>
											</div>
										</div>
										<tags:pagination page="${standards}" paginationSize="5" />
									</div>
								</div>
								<!-- /.box-body -->
							</div>
						</div>
					</div>
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

<div id="addModal" class="easyui-dialog" style="padding:5px;width:700px;height:500px;"
			title="新增评分标准" data-options="iconCls:'icon-add',modal:true, closed:true" buttons="#add-dlg-buttons">
</div>
	
<div id="add-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-redo" onclick="javascript:addformBtn()">保存</a>
</div>

<div id="editModal" class="easyui-dialog" style="padding:5px;width:700px;height:500px;"
			title="修改评分标准" data-options="iconCls:'icon-add',modal:true, closed:true" buttons="#edit-dlg-buttons">
</div>
	
<div id="edit-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-redo" onclick="javascript:editformBtn()">更新</a>
</div>

<div id="ditailModal" class="easyui-dialog" style="padding:5px;width:700px;height:500px;"
			title="评分标准详情" data-options="iconCls:'icon-view',modal:true, closed:true" buttons="#ditail-dlg-buttons">
</div>
	
<div id="ditail-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-redo" onclick="javascript:ditailClose()">关闭</a>
</div>

<script type="text/javascript" src="js/plugins/jQuery/jquery-3.2.1.min.js"></script>
<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	 <script src="${ctx}/js/plugins/bootstrap/js/bootstrap-tooltip.js"></script>
	 <script src="${ctx}/js/plugins/bootstrap/js/bootstrap-confirmation.js"></script>
<!-- ./wrapper -->

<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/plugins/layui2/layui.all.js"></script> -->
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="${ctx}/easyui/jquery.easyui-1.5.1.min.js"></script>
	<script type="text/javascript" src="${ctx}/easyui/themes/insdep/jquery.insdep-extend.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>
<script src="${ctx}/js/plugins/ztree/jquery.ztree.core.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/plugins/sortable.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/plugins/purify.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/fileinput.js"></script>
<script src="${ctx}/js/plugins/file-input/js/locales/zh.js"></script>
	<script>
	/*$(function() {
	    $('[data-toggle="confirmation"]').confirmation({
	    	btnOkClass: 'btn-xs btn-success', 
	    	btnCancelClass: 'btn-xs btn-danger',
	    	title: '是否删除?'
	    });
	}); */
	
	$(function() {
	    $('[data-toggle="confirmation"]').confirmation({
	    	animation:true,
	    	placement:'top',
	    	btnOkClass: 'btn-sm btn-primary', 
	    	btnCancelClass: 'btn-sm btn-default',
	    	btnOkLabel:'确定',
	    	btnCancelLabel:'取消',
	    	title: '是否删除?'
	    });
	});
	//打开新增窗口
	$('#create').click(function(){
		$('#addModal').window('open');
		$('#addModal').window('refresh','create');
	});
	//新增提交
	function addformBtn(){
		/* console.log($('#addform #code').val());
		console.log($('#addform #code').val().length);
		console.log($('#addform #blLeaf').val());
		console.log($('#addform #blLeaf').val() == '0'); */
		if($('#addform #code').val().length == 2 && $('#addform #blLeaf').val() == '1'){
			$.messager.alert('提示','请选择正确的编号等级');
		}else if($('#addform #code').val().length > 2 && $('#addform #blLeaf').val() == '0'){
			$.messager.alert('提示','请选择正确的编号等级');
		}else if($('#addform #code').val().length < 2){
			$.messager.alert('提示','编号长度必须大于或等于两位');
		}else{
			var ok = true;
			var code = $('#addform #code').val();
			console.log(code);
			if($('#addform #code').val()==null || $('#addform #code').val()==''){
				ok = false;
			}else if($('#addform #name').val()==null || $('#addform #name').val()==''){
				ok = false;
			}else if($('#addform #baseScore').val()==null || $('#addform #baseScore').val()==''){
				ok = false;
			}else if($('#addform #insNum').val()==null || $('#addform #insNum').val()==''){
				ok = false;
			}else if($('#addform #insScoreMin').val()==null || $('#addform #insScoreMin').val()==''){
				ok = false;
			}else if($('#addform #insScoreMax').val()==null || $('#addform #insScoreMax').val()==''){
				ok = false;
			}else{
				ok = true;
			}
			if(ok){
				$.ajax({
					async: false,
					url:"selectByCode?code="+code,
			        success:function(data){
			        	console.log(data);
			        	if(data == '1'){
			        		$.messager.alert('提示','已存在该编号！');
			        	}else{
			        		$('#addform').submit();
							$('#addModal').window('close');
			        	}
			        }
				});
			}else{
				$.messager.alert('提示','请录入完整的信息！');
			}
		}
	};
	//修改提交
	function editformBtn(){
		/* console.log($('#editform #code').val());
		console.log($('#editform #code').val().length); */
			var ok = true;
			if($('#editform #name').val()==null || $('#editform #name').val()==''){
				ok = false;
			}else if($('#editform #baseScore').val()==null || $('#editform #baseScore').val()==''){
				ok = false;
			}else if($('#editform #insNum').val()==null || $('#editform #insNum').val()==''){
				ok = false;
			}else if($('#editform #insScoreMin').val()==null || $('#editform #insScoreMin').val()==''){
				ok = false;
			}else if($('#editform #insScoreMax').val()==null || $('#editform #insScoreMax').val()==''){
				ok = false;
			}else{
				ok = true;
			}
			if(ok){
				$('#editform').submit();
				$('#editform').window('close');
			}else{
				$.messager.alert('提示','请录入完整的信息！');
			}
	}
	//打开修改弹窗
	function openEdit(id){
		$('#editModal').window('open');
		$('#editModal').window('refresh','edit/'+id);
	}
	//打开详情弹窗
	function openDitail(id){
		$('#ditailModal').window('open');
		$('#ditailModal').window('refresh','ditail/'+id);
	}
	
	function ditailClose(){
		$('#ditailModal').window('close');
	}
	</script>
</body>
</html>
