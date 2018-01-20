<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>教师绩效考核</title>
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="js/plugins/bootstrap/css/bootstrap.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
<!-- icons -->
<link rel="stylesheet" href="css/ionicons/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet" href="css/skins/_all-skins.min.css">
<link rel="stylesheet" href="css/pages/mycss.css">
<link rel="stylesheet" href="css/pages/addRessBook.css">

<link rel="stylesheet" href="js/plugins/layui/css/layui.css">

<link rel="stylesheet" href="css/jqueryTable/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="css/jqueryTable/jqx.energyblue.css" type="text/css" />

<!-- jQuery 2.2.3 -->
<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/common.js"></script>
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

		<div class="content-wrapper" style="background-color: white">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
			<ul class="breadcrumb">
				<i style="background: url(img/position.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 20px"></i>
				<span>当前位置：</span>
				<li><a href="#">绩效考核</a> <span class="divider"></span></li>
				<li><a href="#">教务处考核</a> <span class="divider"></span></li>
			</ul>
			</section>
			<!-- 中间部分-top     end -->

			<!-- 中间部分-main     startup -->
			<section class="content">
			<div class="page-content">
				<div class="row" style="overflow: auto; width: 100%; height: 650px;">
					<div id="toolbar" class="btn-group">
						<div class="layui-input-inline">
							<form class="layui-form" style="width: 300px;">
								<select id="kpiInsId" lay-filter="kpiInsId">
									<option value="">请选择考核活动</option>
									<c:if test="${fn:length(insArry)>0}">
										<optgroup label="考核中">
											<c:forEach items="${insArry}" var="kpiIns">
												<option value="${kpiIns.insId}">${kpiIns.insName}</option>
											</c:forEach>
										</optgroup>
									</c:if>
									<c:if test="${fn:length(insArryEnd)>0}">
										<optgroup label="考核结束">
											<c:forEach items="${insArryEnd}" var="kpiIns">
												<option value="${kpiIns.insId}">${kpiIns.insName}</option>
											</c:forEach>
										</optgroup>
									</c:if>
								</select>
							</form>
						</div>
					</div>
					<div id='mainTable' style="overflow: auto; text-align: center; padding-top: 5px;">
						<div id='pjTable'></div>
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

	<div id='editLayer' style="overflow: auto; display: none; text-align: center">
		<div id='pjTreeGrid' style="overflow: auto; margin-left: 5px; margin-top: 5px;"></div>
	</div>

	<!-- 设置按钮页面       startup -->
	<%@ include file="../includes/rightSetup.jsp"%>
	<div class="control-sidebar-bg"></div>
	</div>
	<input type="hidden" id="pageCount" style="width: 45px" />
	<input type="hidden" id="totalCount" style="width: 45px" />
	<!-- ./wrapper -->
	<script src="js/pages/paging/pagingCommon.js"></script>
	<script src="js/pages/tablePaging.js"></script>
	<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>

	<!-- Latest compiled and minified Locales -->
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxcore.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxdata.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxbuttons.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxscrollbar.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxdatatable.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxtreegrid.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxcheckbox.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxlistbox.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/jqxdropdownlist.js"></script>
	<script type="text/javascript" src="js/plugins/jQuery/table/localization.js"></script>
	<script src="js/plugins//layui/layui.js"></script>

	<script src="js/pages/kpi/jiaowuchuPingjia.js"></script>
	<script src="js/pages/kpi/kpiCommon.js"></script>
	<!-- AdminLTE App -->
	<script src="js/app.min.js"></script>

	<script type="text/javascript">
		$(window).resize(
				function() {
					if ($(".page-content").width() >= 1080) {
						$(".default_pgContainer").css("margin-left",
								($(".page-content").width() - 1115) / 2);
						$("#btn_container").css("margin-right",
								($(".page-content").width() - 1060) / 2);
						$("#input_div").css("margin-left",
								($(".page-content").width() - 1095) / 2);
						$("#page_div").css("margin-right",
								($(".page-content").width() - 1080) / 2);
						$(".content-header").css("margin-right",
								($(".page-content").width() - 1060) / 2);
					} else {
						$(".default_pgContainer").css("margin-left", 15);

						$("#btn_container").css("margin-right", 0);
						$("#input_div").css("margin-left", 0);
						$("#page_div").css("margin-right", 0);
						$(".content-header").css("margin-right", 0);
					}
				});

		$(document).ready(
				function() {
					if ($(".page-content").width() >= 1080) {
						$(".default_pgContainer").css("margin-left",
								($(".page-content").width() - 1115) / 2);
						$("#btn_container").css("margin-right",
								($(".page-content").width() - 1060) / 2);
						$("#input_div").css("margin-left",
								($(".page-content").width() - 1095) / 2);
						$("#page_div").css("margin-right",
								($(".page-content").width() - 1080) / 2);
						$(".content-header").css("margin-right",
								($(".page-content").width() - 1060) / 2);
					} else {
						$(".default_pgContainer").css("margin-left", 15);
						$("#btn_container").css("margin-right", 0);
						$("#input_div").css("margin-left", 0);
						$("#page_div").css("margin-right", 0);
						$(".content-header").css("margin-right", 0);
					}
				});
		$(document).ready(function() {
			layui.use([ 'jquery', 'form', 'layedit' ], function() {
				var form = layui.form();
				form.on('select(kpiInsId)', function(data) {
					initTable();
				});
			})
		});
	</script>
</body>
</html>