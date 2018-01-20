<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>大数据分析总视图</title>
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
		<link rel="stylesheet" href="css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="js/plugins/layui2/css/layui.css">
		<link rel="stylesheet" href="css/pages/mycss.css">
		<link rel="stylesheet" href="css/pages/reportHome.css">
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
						<li>
							<a href="#">大数据分析总视图</a>
						</li>
					</ul>
				</section>
				<!-- 中间部分-top     end -->

				<!-- 中间部分-main     startup -->
				<section class="content">
					<div class="page-content">
						<!--财务指标：1行-->
						<div class="layui-row layui-col-space10 line">
							<div class="layui-col-md1">
								<img class="img-type" src="img/report/u1.png" />
							</div>
							<div class="layui-col-md11">
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标1</div>
									</div>
									<div id="nc1" class="target-input" onclick="forwardToReport(this)">
										<div id="nc1_name" class="d1"></div>
										<div id="nc1_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_nc1" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标2</div>
									</div>
									<div id="nc2" class="target-input" onclick="forwardToReport(this)">
										<div id="nc2_name" class="d1"></div>
										<div id="nc2_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_nc2" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标3</div>
									</div>
									<div id="nc3" class="target-input" onclick="forwardToReport(this)">
										<div id="nc3_name" class="d1"></div>
										<div id="nc3_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_nc3" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标4</div>
									</div>
									<div id="nc4" class="target-input" onclick="forwardToReport(this)">
										<div id="nc4_name" class="d1"></div>
										<div id="nc4_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_nc4" onclick="showIndexAnalysis(this)" />
								</div>
							</div>
						</div>
						<!--财务指标：2行-->
						<div class="layui-row layui-col-space10 line">
							<div class="layui-col-md1">
								<img class="img-type" src="img/report/uplace.png" />
							</div>
							<div class="layui-col-md11">
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标5</div>
									</div>
									<div id="nc5" class="target-input" onclick="forwardToReport(this)">
										<div id="nc5_name" class="d1"></div>
										<div id="nc5_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_nc5" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标6</div>
									</div>
									<div id="nc6" class="target-input" onclick="forwardToReport(this)">
										<div id="nc6_name" class="d1"></div>
										<div id="nc6_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_nc6" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标7</div>
									</div>
									<div id="nc7" class="target-input" onclick="forwardToReport(this)">
										<div id="nc7_name" class="d1"></div>
										<div id="nc7_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_nc7" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3" style="display: none;">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标8</div>
									</div>
									<div id="nc8" class="target-input" onclick="forwardToReport(this)">
										<div id="nc8_name" class="d1"></div>
										<div id="nc8_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_nc8" onclick="showIndexAnalysis(this)" />
								</div>
							</div>
						</div>
						<fieldset class="layui-elem-field layui-field-title site-title"></fieldset>

						<!--招生指标-->
						<div class="layui-row layui-col-space10 line">
							<div class="layui-col-md1">
								<img class="img-type" src="img/report/u2.png" />
							</div>
							<div class="layui-col-md11">
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标1</div>
									</div>
									<div id="zs1" class="target-input" onclick="forwardToReport(this)">
										<div id="zs1_name" class="d1"></div>
										<div id="zs1_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_zs1" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标2</div>
									</div>
									<div id="zs2" class="target-input" onclick="forwardToReport(this)">
										<div id="zs2_name" class="d1"></div>
										<div id="zs2_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_zs2" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标3</div>
									</div>
									<div id="zs3" class="target-input" onclick="forwardToReport(this)">
										<div id="zs3_name" class="d1"></div>
										<div id="zs3_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_zs3" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3" style="display: none;">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标4</div>
									</div>
									<div id="zs4" class="target-input" onclick="forwardToReport(this)">
										<div id="zs4_name" class="d1"></div>
										<div id="zs4_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_zs4" onclick="showIndexAnalysis(this)" />
								</div>
							</div>
						</div>
						<fieldset class="layui-elem-field layui-field-title site-title"></fieldset>

						<!--成绩指标-->
						<div class="layui-row layui-col-space10 line">
							<div class="layui-col-md1">
								<img class="img-type" src="img/report/u3.png" />
							</div>
							<div class="layui-col-md11">
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标1</div>
									</div>
									<div id="score1" class="target-input" onclick="forwardToReport(this)">
										<div id="score1_name" class="d1"></div>
										<div id="score1_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_score1" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标2</div>
									</div>
									<div id="score2" class="target-input" onclick="forwardToReport(this)">
										<div id="score2_name" class="d1"></div>
										<div id="score2_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_score2" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标3</div>
									</div>
									<div id="score3" class="target-input" onclick="forwardToReport(this)">
										<div id="score3_name" class="d1"></div>
										<div id="score3_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_score3" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标4</div>
									</div>
									<div id="score4" class="target-input" onclick="forwardToReport(this)">
										<div id="score4_name" class="d1"></div>
										<div id="score4_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_score4" onclick="showIndexAnalysis(this)" />
								</div>
							</div>
						</div>
						<fieldset class="layui-elem-field layui-field-title site-title"></fieldset>

						<!--人员指标-->
						<div class="layui-row layui-col-space10 line" style="display: none;">
							<div class="layui-col-md1">
								<img class="img-type" src="img/report/u4.png" />
							</div>
							<div class="layui-col-md11">
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标1</div>
									</div>
									<div id="edu1" class="target-input" onclick="forwardToReport(this)">
										<div id="edu1_name" class="d1"></div>
										<div id="edu1_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_edu1" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3" style="display: none;">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标2</div>
									</div>
									<div id="edu2" class="target-input" onclick="forwardToReport(this)">
										<div id="edu2_name" class="d1"></div>
										<div id="edu2_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_edu2" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3" style="display: none;">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标3</div>
									</div>
									<div id="edu3" class="target-input" onclick="forwardToReport(this)">
										<div id="edu3_name" class="d1"></div>
										<div id="edu3_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_edu3" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3" style="display: none;">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标4</div>
									</div>
									<div id="edu4" class="target-input" onclick="forwardToReport(this)">
										<div id="edu4_name" class="d1"></div>
										<div id="edu4_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_edu4" onclick="showIndexAnalysis(this)" />
								</div>
							</div>
						</div>
						<!-- <fieldset class="layui-elem-field layui-field-title site-title"></fieldset> -->

						<!--管理指标-->
						<div class="layui-row layui-col-space10 line" style="display: none;">
							<div class="layui-col-md1">
								<img class="img-type" src="img/report/u5.png" />
							</div>
							<div class="layui-col-md11">
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标1</div>
									</div>
									<div id="man1" class="target-input" onclick="forwardToReport(this)">
										<div id="man1_name" class="d1"></div>
										<div id="man1_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_man1" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标2</div>
									</div>
									<div id="man2" class="target-input" onclick="forwardToReport(this)">
										<div id="man2_name" class="d1"></div>
										<div id="man2_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_man2" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标3</div>
									</div>
									<div id="man3" class="target-input" onclick="forwardToReport(this)">
										<div id="man3_name" class="d1"></div>
										<div id="man3_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_man3" onclick="showIndexAnalysis(this)" /> <img class="img-split " src="img/report/split.png" />
								</div>
								<div class="layui-col-md3">
									<img class="img-goal" src="img/report/z1.png" />
									<div class="target-default">
										<div>指标4</div>
									</div>
									<div id="man4" class="target-input" onclick="forwardToReport(this)">
										<div id="man4_name" class="d1"></div>
										<div id="man4_text" class="d2"></div>
									</div>
									<img class="img-info" src="img/report/o1.png" id="img_info_man4" onclick="showIndexAnalysis(this)" />
								</div>
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

		<div id="indexAnalysis" class="index-analysis">
			<form class="layui-form analysis" action="" id="dataForm" method="post">
				<input id="id" name="id" type="hidden">
				<input id="userIndexId" name="userIndexId" value="1" type="hidden">
				<div class="layui-form-item analysis-item">
					<label class="layui-form-label analysis-item-label">指标计算公式</label>
					<div class="layui-input-block">
						<input type="text" id="calcPop" name="reason" disabled="disabled" class="layui-input  txtPop">
					</div>
				</div>
				<div class="layui-form-item analysis-item">
					<label class="layui-form-label analysis-item-label">指标说明</label>
					<div class="layui-input-block">
						<input type="text" id="txtPop" name="reason" disabled="disabled" class="layui-input  txtPop">
					</div>
				</div>
				<div class="layui-form-item analysis-item">
					<label class="layui-form-label analysis-item-label">数据分析结果</label>
					<div class="layui-input-block">
						<textarea id="result" name="result" lay-verify="required" placeholder="请输入内容" class="layui-textarea  analysis-item-area"></textarea>
					</div>
				</div>
				<div class="layui-form-item analysis-item">
					<label class="layui-form-label analysis-item-label">数据分析人</label>
					<div class="layui-input-block">
						<input type="text" id="employeeName" disabled="disabled" class="layui-input  employeeName">
					</div>
				</div>
				<div class="layui-form-item analysis-item">
					<label class="layui-form-label analysis-item-label">数据分析时间</label>
					<div class="layui-input-block">
						<input type="text" id="createTime" disabled="disabled" class="layui-input  createTime">
					</div>
				</div>
				<div class="layui-form-item analysis-item">
					<div class="layui-input-block">
						<button id='submit' class="layui-btn layui-btn-small" lay-submit="" lay-filter="submit1">提交</button>
					</div>
				</div>
			</form>
		</div>

		<!-- 设置按钮页面       startup -->
		<%@ include file="../includes/rightSetup.jsp"%>
		<div class="control-sidebar-bg"></div>
		<!-- 设置按钮页面       end -->

		<!-- jQuery 2.2.3 -->
		<script src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
		<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
		<!-- jQuery UI 1.11.4 -->
		<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
		<script src="js/app.min.js"></script>
		<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
		<script src="js/plugins/layui2/layui.js"></script>
		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/pages/report/reportHome.js"></script>
		<script type="text/javascript">
			$(window).resize(
				function() {
					$("#mainTable").css("height",
						$('.content-wrapper').height() - 100);
				});
			$(document).ready(
				function() {
					$("#mainTable").css("height",
						$('.content-wrapper').height() - 100);
				});
		</script>
	</body>

</html>