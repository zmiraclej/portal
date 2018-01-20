<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title id="Description">走班汇总</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="css/jqueryTable/jqx.base.css"
	type="text/css" />
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

<link rel="stylesheet" href="css/pages/report.css">
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
 
<link href="${ctx}/easyui/themes/insdep/easyui_plus.css" rel="stylesheet" type="text/css">
<!--
    easyui_plus.css
    Insdep对easyui的额外增强样式,内涵所有 insdep_xxx.css 的所有组件样式
    根据需求可单独引入insdep_xxx.css或不引入，此样式不会对easyui产生影响
-->
 
<link href="${ctx}/easyui/themes/insdep/insdep_theme_default.css" rel="stylesheet" type="text/css">
<!--
    insdep_theme_default.css
    Insdep官方默认主题样式,更新需要自行引入，此样式不会对easyui产生影响
-->
 
<link href="${ctx}/easyui/themes/insdep/icon.css" rel="stylesheet" type="text/css">
<!--
    icon.css
    美化过的easyui官方icons样式，根据需要自行引入
-->

</head>

<body class="hold-transition skin-blue-light sidebar-mini" style="min-width:1200px;">
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
					<li><a href="#"><i class="fa fa-dashboard"></i>教务管理 </a></li>
					<li class="active">走班汇总</li>
				</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle">

				<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top: 20px">
					<table width="100%" style="overflow:auto;">
						<tr>
							<td>
								<div
									style="height: 800px; width: 1640px; background-color: white;overflow:auto;">
									<div class="easyui-tabs" style="width:100%;height:auto;">
									
										<div title="各科目统计">
											<div align="center" style="height: 50px; margin-top: 20px;"><strong>高中一年级</strong>
												<a href="javascript:void(0)" class="easyui-linkbutton" onclick="downloadAnswerCount(1,'code')" style="width:100px;float: left;">报表导出</a>
											</div>
											<table id="answerCount-view"></table>
											<div align="center" style="height: 50px;margin-top: 20px;"><strong>高中二年级</strong>
												<a href="javascript:void(0)" class="easyui-linkbutton" onclick="downloadAnswerCount(2,'code')" style="width:100px;float: left;">报表导出</a>
											</div> 
											<table id="answerCount-view2"></table>
										</div>
										<div title="各组合统计">
											<div align="center" style="height: 50px;margin-top: 20px;"><strong>高中一年级</strong>
												<a href="javascript:void(0)" class="easyui-linkbutton" onclick="downloadAnswerCount(1,'item')" style="width:100px;float: left;">报表导出</a>
											</div>
											<table id="answerItemCount-view" ></table>
											<div align="center" style="height: 50px;margin-top: 20px;"><strong>高中二年级</strong>
												<a href="javascript:void(0)" class="easyui-linkbutton" onclick="downloadAnswerCount(2,'item')" style="width:100px;float: left;">报表导出</a>
											</div>
											<table id="answerItemCount-view2" ></table>
										</div>
									</div>
									<!-- <div id="answer-tabs">
										<div title="各科目统计">
											<table id="answerCount-view"></table>
										</div>
										<div title="各组合统计">
											<table id="answerItemCount-view" ></table>
										</div>
									</div> -->
									
								</div>
							</td>
						</tr>
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

	<!-- script -->

	<script type="text/javascript"
		src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
	<!-- ./wrapper -->
	<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script src="js/app.min.js"></script>
	<script type="text/javascript" src="${ctx}/easyui/jquery.easyui-1.5.1.min.js"></script>
	<script type="text/javascript" src="${ctx}/easyui/themes/insdep/jquery.insdep-extend.min.js"></script>
	<script type="text/javascript">
	$(function(){
		
		/* $('#answer-tabs').tabs({
		    border:false,
		    onSelect:function(title){
				//alert(title+' is selected');
		    }
		}); */
		var columnsGradeA = [
			{
				field : 'courseName',
				title : '科目名称',
				width:60,
				align : 'center'
			}
		];
		var itemColumnsGradeA = [
			{
				field : 'id',
				title : '编号',
				width:60,
				align : 'center'
			},
			{
				field : 'subject1_name',
				title : '科目一',
				width:60,
				align : 'center'
			},
			{
				field : 'subject2_name',
				title : '科目二',
				width:60,
				align : 'center'
			},{
				field : 'subject3_name',
				title : '科目三',
				width:60,
				align : 'center'
			}
		];
		
		for(var i= 1;i<12;i++){
			columnsGradeA.push({
				field : 'wcsClassNo'+i,
				title : i+'班',
				width:60,
				align : 'center'
			});
			itemColumnsGradeA.push({
				field : 'wcsClassNo'+i,
				title : i+'班',
				width:60,
				align : 'center'
			});
		}
		columnsGradeA.push({
			field:"sumCount",
			title:"合计",
			width:60,
			align:"center"
		});
		itemColumnsGradeA.push({
			field:"sumItemCount",
			title:"合计",
			width:60,
			align:"center"
		});
		$('#answerCount-view').datagrid({
			url:'answerCount/findCount',
			rownumbers : true,
			fitColumns : true, 
			singleSelect:true,
			columns :  [columnsGradeA]
		}); 
		$('#answerItemCount-view').datagrid({
			url:'answerCount/findItemCount',
			rownumbers : true,
			fitColumns : true, 
			singleSelect:true,
			columns :  [itemColumnsGradeA]
		});
		
		
		
		var columns=[
			{
				field : 'courseName',
				title : '科目名称',
				width:60,
				align : 'center'
			}
		];	
	var itemColumns=[
		{
			field : 'id',
			title : '编号',
			width:60,
			align : 'center'
		},
		{
			field : 'subject1_name',
			title : '科目一',
			width:60,
			align : 'center'
		},
		{
			field : 'subject2_name',
			title : '科目二',
			width:60,
			align : 'center'
		},{
			field : 'subject3_name',
			title : '科目三',
			width:60,
			align : 'center'
		}
	]
	var wcsClassNo = ${wcsClassNo};
		for(var i = 0;i<wcsClassNo.length;i++){
			columns.push({
				field : wcsClassNo[i].wcsClassNo,
				title : wcsClassNo[i].wcsClassName,
				width:60,
				align : 'center' 
			});
			itemColumns.push({
				field : wcsClassNo[i].wcsClassNo,
				title : wcsClassNo[i].wcsClassName,
				width:60,
				align : 'center'
			});
		}
		columns.push({
			field:"sumCount",
			title:"合计",
			width:60,
			align:"center"
		});
		itemColumns.push({
			field:"sumItemCount",
			title:"合计",
			width:60,
			align:"center"
		});
		 $('#answerCount-view2').datagrid({
				url:'answerCount/findCountByGrade',
				rownumbers : true,
				fitColumns : true, 
				singleSelect:true,
				columns :  [columns]
		}); 
		$('#answerItemCount-view2').datagrid({
				url:'answerCount/findItemCountByGrade',
				rownumbers : true,
				fitColumns : true, 
				singleSelect:true,
				columns :  [itemColumns]
			});
	});
	function downloadAnswerCount(grade,type){
		window.open("answerCount/downLoadCount?grade="+grade+"&type="+type);
	}
	</script>
</body>
</html>