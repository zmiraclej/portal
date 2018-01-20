<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div style="padding: 10px 60px 20px 60px">
	<form id="multi-score-form" class="easyui-form" method="post" data-options="novalidate:true">
		<table cellpadding="5" style="width: 100%;">
			<tr>
	    			<td>
	    				<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;"> 班级</label>
	    				 &nbsp; &nbsp;${className }
	    			</td>
			</tr>
			 <tr>
	    		<td>
           		  <label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">多科</label>
           		   &nbsp; <input type="radio" name="scoreSection" value="0" checked="checked"> 否
           		   &nbsp; &nbsp;<input type="radio" name="scoreSection" value="1"> 是
	    		</td>
			</tr>
			<tr>
	    			<td style="overflow: auto;" id = "666">
	    				<input class="easyui-textbox" id="courseCode" name="courseCode" data-options="label:'科目'" style="width:350px;">
	    				
	    			</td>
			</tr>
			<tr>
	    		<td>
           		  <label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">分卷</label>
           		   &nbsp; <input type="radio" name="scoreMulti" value="0" checked="checked"> 否
           		   &nbsp; &nbsp;<input type="radio" name="scoreMulti" value="1"> 是
	    		</td>
			</tr>
			<tr>
	    			<td id = "777">
	    				<input type="hidden" id="examInsId" name="examInsId" value="${id }">
	    				<input type="hidden" id="schoolCode" name="schoolCode" value="${schoolCode }">
	    				<input type="hidden" id="stage" name="stage" value="${stage }">
	    				<input type="hidden" id="grade" name="grade" value="${grade }">
	    				<input type="hidden" id="examType" name="examType" value="1">
	    				<input type="hidden" id="course_name_" name="courseName" >
	    				<input type="hidden" id="className" name="className" value="${className }">
	    				<input type="hidden" id="classId" name="classId" value="${classId }">
           				<input type="text" id="fullScore" name="fullScore" class="easyui-numberbox" style="width:350px" value="100" data-options="required:true,label:'满分',min:0,max:1000"></input> 
	    			</td>
			</tr>
			
		</table>
	</form>
</div>

<script src="${ctx }/js/pages/score/custom.radio.js"></script>
<script src="${ctx }/js/pages/score/multi-score.js"></script> 
