<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>总分统计配置</title>
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
				<li><a href="#"><i class="fa fa-dashboard"></i>学生管理 </a></li>
				<li class="active">总分统计配置列表</li>
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
										<a href="${ctx }/countcreate" class="btn btn-primary"
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
															<th class="col-md-1">学校名称</th>
															<th class="col-md-1">学部</th>
															<th class="col-md-1">年级</th>
															<th class="col-md-1">统计名称</th>
															<th class="col-md-1">统计周期-开始时间</th>
															<th class="col-md-1">统计周期-结束时间</th>
															<th class="col-md-1">是否可用</th>
															<th class="col-md-2">操作</th>
													</thead>
													<tbody>
														<c:forEach items="${settings.rows}" var="s">
															<c:if test="${s.blDelFlg=='0'}">
																<tr role="row" class="odd">
																	<td>${s.name}</td>
																	<td><c:if test="${s.stage=='1' }">小学</c:if> <c:if
																			test="${s.stage=='2' }">初中</c:if> <c:if
																			test="${s.stage=='3' }">高中</c:if></td>
																	<td>${s.grade}年级</td>
																	<td>${s.countName}</td>
																	<td><fmt:formatDate value="${s.cycleStart}"
																			pattern="YYYY-MM-dd" /></td>
																	<td><fmt:formatDate value="${s.cycleEnd}"
																			pattern="YYYY-MM-dd" /></td>
																			<%-- <td>${s.cycleStart}</td>
																			<td>${s.cycleEnd}</td> --%>
																	<td><c:if test="${s.blDelFlg=='1'}">不可用</c:if> <c:if
																			test="${s.blDelFlg=='0'}">可用</c:if></td>
																	<td><a
																		data-href="${ctx }/countdeleteByFlag/${s.id}"
																		data-toggle="confirmation" class="btn btn-sm btn-primary">
																		<i class="fa fa-times"></i>删 除</a> <a
																		href="${ctx }/countedit?id=${s.id}"
																		class="btn btn-sm btn-default"><i
																			class="fa fa-edit"></i>编 辑</a></td>
																</tr>

															</c:if>
														</c:forEach>
													</tbody>
												</table>
											</div>
										</div>
										<tags:pagination page="${settings}" paginationSize="5" />
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
<script type="text/javascript" src="js/plugins/jQuery/jquery-3.2.1.min.js"></script>
<!-- ./wrapper -->
<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="${ctx}/js/plugins/bootstrap/js/bootstrap-tooltip.js"></script>
	 <script src="${ctx}/js/plugins/bootstrap/js/bootstrap-confirmation.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/plugins/layui2/layui.all.js"></script>
<script type="text/javascript" src="js/common.js"></script>

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
	
	</script>
</body>
</html>
