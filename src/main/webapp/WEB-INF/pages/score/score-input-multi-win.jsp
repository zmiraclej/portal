<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

	<input type="hidden" id="inputExamInsId" name="examInsId" value="${examInsId }">
	<input type="hidden" id="inputScoreMulti" name="scoreMulti" value="${scoreMulti }">
	<input type="hidden" id="inputScoreSection" name="scoreSection" value="${scoreSection }">
	<input type="hidden" id="inputClassId" name="classId" value="${classId }">
	<input type="hidden" id="inputCourseCode" name="courseCode" value="${courseCode }">
	<input type="hidden" id="inputExamType" name="examType" value="${examType }">
	<input type="hidden" id="inputCourseName" name="courseName" value="${courseName }">
	<input type="hidden" id="inputClassName" name="className" value="${className }">
	<input type="hidden" id="inputFullScore" name="fullScore" value="${fullScore }">
	<input type="hidden" id="inputFullScore" name="fullScore" value="${fullScore }">
	<style>
<!--
	 .score-txt {
	 	border: 1px #ccc solid;
	 	height: 30px;
	 }
-->
</style>	
	<div class="easyui-panel" style="width:100%;padding:10px">
		<div style="margin-bottom:20px">
			<form id="score-upload-form" method="post" enctype="multipart/form-data">
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="downloadScoreTemplate()" style="width:150px;">下载成绩模板</a>
			读取成绩：<input class="easyui-filebox" name="scoreFile" data-options="prompt:'选择导入文件...', buttonText:'选择', accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'" style="width:300px">
				<a href="javascript:void(0)" class="easyui-linkbutton" onclick="ajaxFileUploadMulti()" style="width:150px;">读取多科</a>
			</form>
		</div>
	</div>
	
	  <div id="score-input-tb" style="height:auto">
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="append()">增加学生</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除学生</a>
    </div>




<table id="fullscore">
  <tr >
    <td width="600px">
	   <table class="scoreboard" id="input-score-multi-div" style="display:inline">
	
		</table> 
    </td>
 
  	 <td width="600px">
	   <table class="scoreboard" id="input-score-single-div" style="display:inline">
	
		</table> 
    </td>
  </tr>
</table>




<table id="score-input-multi-dg" title="${examInsName }" style="width: 100%; height: auto">
	
</table>

 <div id="score-input-remark-win" class="easyui-dialog"
	style="padding: 5px; width: 700px; height: 550px;" title="选择评语"
	data-options="iconCls:'icon-view',modal:true, closed:true"
	buttons="#score-input-remark-dlg-buttons"></div>

<div id="score-input-remark-dlg-buttons">
	<a class="easyui-linkbutton" onclick="addRemarkToStudent()">添加评语</a>
</div> 

<script src="${ctx }/js/pages/score/multi-score-input.js"></script> 
<%-- <script type="text/javascript" src="${ctx}/easyui/jquery.min.js"></script> --%>
    <%-- <script src="${ctx }/js/pages/score/jquery.form.js"></script>  --%>
    </body>
</html>
