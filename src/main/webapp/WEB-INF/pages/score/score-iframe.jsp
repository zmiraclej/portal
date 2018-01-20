<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title id="Description">成绩管理</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

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

<body>

	<div id="tb" style="padding:5px;height:auto">
		<div style="margin-bottom:5px;text-align: right;">
		 	<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">学年</label>
			<input class="easyui-combobox" type="text" id="school-year" name="school-year"/>&nbsp;&nbsp;
			<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">学期</label>
			<input class="easyui-combobox" type="text" id="school-term" name="school-term"/>&nbsp;&nbsp;
			<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">学校</label>
			<input class="easyui-combobox" type="text" id="school-code" name="school-code"/>&nbsp;&nbsp;
			<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">学部</label>
			<input class="easyui-combobox" type="text" id="school-stage" name="school-stage" style="width: 150px;"/>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		</div>
		<div style="margin-bottom:5px;text-align: right;overflow: auto;">
		<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">年级</label>
			<input class="easyui-combobox" type="text" id="school-grade" name="school-grade"/>&nbsp;&nbsp;
			<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">班级</label>
			<input class="easyui-combobox" type="text" id="school-class" name="school-class"/>&nbsp;&nbsp;
			<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">科目</label>
			<input class="easyui-combobox" type="text" id="school-course" name="school-course"/>&nbsp;&nbsp;
			<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">考次</label>
			<input class="easyui-textbox" type="text" id="school-exam-ins-name" name="school-exam-ins-name" style="width: 150px;"/>
			<a class="easyui-linkbutton" onclick="searchScoreIns()" iconCls="icon-search">查询</a>
		</div>
		<div style="margin-bottom:5px;text-align: right;">
			<!-- <a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="openScoreRange()">分数段维护</a> -->
			<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="openSingleScoreWin()">单科成绩上传</a>
			<a id="multiExamBtn" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="openMultiExamWin()">创建多科考次</a>
			<!-- <a id="multiExamBtn" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="sumGradeInputScore()">年级多科排名汇总</a> -->
		</div>
	</div>

	<table id="score-table"  style="width:100%;height:100%"></table>
	
	<!-- <div id="score-range-win" class="easyui-dialog" style="padding:5px;width:800px;height:500px;"
			title="分数段维护" data-options="iconCls:'icon-add',modal:true, closed:true" buttons="#score-range-dlg-buttons">
	</div>
	
	<div id="score-range-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-save" onclick="javascript:saveScoreRange()">保存</a>
	</div> -->
	
	
	<div id="single-score-first-win" class="easyui-dialog" style="padding:5px;width:500px;height:600px;"
			title="创建单科考次" data-options="iconCls:'icon-add',modal:true, closed:true" buttons="#dlg-buttons">
	</div>
	
	<div id="dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-redo" onclick="javascript:nextToScoreInputWin()">下一步</a>
	</div>
	
	<div id="multi-exam-win" class="easyui-dialog" style="padding:5px;width:500px;height:600px;"
			title="创建多科考次" data-options="iconCls:'icon-add',modal:true, closed:true" buttons="#multi-exam-dlg-buttons">
	</div>
	
	<div id="multi-exam-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-save" onclick="javascript:saveMultiExam()">保存</a>
	</div>
	
	<div id="multi-score-win" class="easyui-dialog" style="padding:5px;width:500px;height:400px;"
			title="上传成绩" data-options="iconCls:'icon-add',modal:true, closed:true" buttons="#multi-score-dlg-buttons">
	</div>
	
	<div id="multi-score-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-save" onclick="javascript:nextMultiScoreWin()">下一步</a>
	</div>
	
	<div id="score-input-win" class="easyui-dialog"  maximizable=true style="padding:5px;width:1000px;height:600px;"
			title="保存成绩" data-options="iconCls:'icon-add',modal:true, closed:true" buttons="#score-input-dlg-buttons">
	</div>
	
	<div id="score-input-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-save" onclick="javascript:saveInputScore()">保存</a>
	</div>
	
	<div id="view-score-input-win" class="easyui-dialog" maximizable=true style="padding:5px;width:750px;height:600px;"
			title="预览成绩" data-options="iconCls:'icon-view',modal:true, closed:true" buttons="#view-score-input-dlg-buttons">
	</div>
	
	<div id="view-score-input-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-close" onclick="$('#view-score-input-win').window('close');">关闭</a>
	</div>
	
	<div id="view-score-sendState-win" class="easyui-dialog" style="padding:5px;width:800px;height:600px;"
			title="发送状态" data-options="iconCls:'icon-view',modal:true, closed:true" buttons="#view-score-sendState-dlg-buttons">
	</div>
	
	<div id="view-score-sendState-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-close" onclick="$('#view-score-sendState-win').window('close');">关闭</a>
	</div>
	
	<div id="send-score-input-win" class="easyui-dialog" style="padding:5px;width:650px;height:400px;"
			title="发送成绩" data-options="iconCls:'icon-view',modal:true, closed:true" buttons="#send-score-input-dlg-buttons">
	</div>
	
	<div id="send-score-input-dlg-buttons">
		<a class="easyui-linkbutton" iconCls="icon-close" onclick="sendInputScore()">发送</a>
	</div>
	
	<div id="score-input-classRemark-win" class="easyui-dialog" style="padding:5px;width:700px;height:550px;"
			title="选择评语" data-options="iconCls:'icon-view',modal:true, closed:true" buttons="#score-input-classRemark-dlg-buttons">
	</div>
	
	<div id="score-input-classRemark-dlg-buttons">
		<a class="easyui-linkbutton" onclick="addClassRemark()">添加评语</a>
	</div>
	
	
	<script type="text/javascript" src="${ctx}/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx}/easyui/jquery.easyui-1.5.1.min.js"></script>
	<script type="text/javascript" src="${ctx}/easyui/themes/insdep/jquery.insdep-extend.min.js"></script>

	<script src="${ctx }/js/pages/score/score-manage.js"></script> 

</body>
</html>