<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div style="padding: 10px 60px 20px 60px">
	<form id="send-score-form" class="easyui-form" method="post" data-options="novalidate:true">
		<table cellpadding="5" style="width: 100%;">
			
			<tr>
				<td>
					<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">发送类型</label>
				</td>
	    		<td>
	    		<input type="hidden" id="sendExamInsId" name="sendExamInsId" value="${examInsId }">
	    		<input type="hidden" id="sendSchoolCode" name="sendSchoolCode" value="${schoolCode }">
	    		<input type="hidden" id="sendClassId" name="sendClassId" value="${classId }">
	    		<input type="hidden" id="sendExamInsName" name="sendExamInsName" value="${examInsName }">
	    		<input type="hidden" id="sendSchoolName" name="sendSchoolName" value="${schoolName }">
	    		<input type="hidden" id="sendGrade" name="sendGrade" value="${grade }">
	    		<input type="hidden" id="sendClassName" name="sendClassName" value="${className }">
	    		<input type="hidden" id="sendCourseCode" name="sendCourseCode" value="${courseCode }">
	    		<input type="hidden" id="sendCourseName" name="sendCourseName" value="${courseName }">
				<input type="checkbox" id="sendAvgScore" name="sendTypes" value="2"  title="平均分">平均分&nbsp;&nbsp;
	    		</td>
	    		<td>
	    			<input type="checkbox" id="sendTopScore" name="sendTypes" value="3" title="班级最高分">班级最高分&nbsp;&nbsp;
	    		</td>
	    		<td>
	    			<input type="checkbox" id="sendClassRemark" name="sendTypes" title="班级评语">班级评语&nbsp;&nbsp;
	    		</td>
	    		<td colspan="1"></td>
			</tr>
			<tr height="32" id="score-tr">
				<td></td>
				<<td>
					<input type="checkbox" id="sendSingleFull" name="sendTypes" value="1" title="单科满分">单科满分&nbsp;&nbsp;
				</td>
				<td>
					<input type="checkbox" id="sendArtsScore" name="sendTypes" value="1" title="文综总分">文综总分&nbsp;&nbsp;
				</td>
				<td>
					<input type="checkbox" id="sendScienceScore" name="sendTypes" value="1" title="理综总分">理综总分&nbsp;&nbsp;
				</td>
				<td colspan="3"></td>
			</tr>
			<tr height="32">
				<td></td>
				<td>
					<input type="checkbox" id="sendClassOrder" name="sendTypes" value="1" title="班级排名">班级排名&nbsp;&nbsp;
				</td>
				<td colspan="3"></td>
			</tr>
			<tr height="32" id="order-tr">
				<td></td>
				<td>
					<input type="checkbox" id="sendSingleOrder" name="sendTypes" value="1" title="单科排名">单科排名&nbsp;&nbsp;
				</td>
				<td>
					<input type="checkbox" id="sendArtsOrder" name="sendTypes" value="1" title="文综排名">文综排名&nbsp;&nbsp;
				</td>
				<td>
					<input type="checkbox" id="sendScienceOrder" name="sendTypes" value="1" title="理综排名">理综排名&nbsp;&nbsp;
				</td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td>
					前<input class="easyui-numberspinner" id="sendClassOrderNum" mane="sendClassOrderNum" value="0" style="width: 60px">名班级名次
				</td>
				<td colspan="3"></td>
			</tr>
			<tr id="grade-tr" height="32">
				<td></td>
				<td>
					<input type="checkbox" id="sendGrdeOrder" name="sendTypes" value="1" title="年级排名">年级排名&nbsp;&nbsp;
				</td>
				<td>
					<input type="checkbox" id="sendSingleGradeOrder" name="sendTypes" value="1" title="单科年级排名">单科年级排名&nbsp;&nbsp;
				</td>
				<td>
					<input type="checkbox" id="sendArtsGradeOrder" name="sendTypes" value="1" title="文综年级排名">文综年级排名&nbsp;&nbsp;
				</td>
				<td>
					<input type="checkbox" id="sendScienceGradeOrder" name="sendTypes" value="1" title="理综年级排名">理综年级排名&nbsp;&nbsp;
				</td>
			</tr>
			<tr id="grade-tr-num">
				<td></td>
				<td>
					前<input class="easyui-numberspinner" id="sendGrdeOrderNum" mane="sendGrdeOrderNum" value="0"  style="width: 60px">名年级名次
				</td>
				<td colspan="3"></td>
			</tr>
		</table>
	</form>
</div>
<script type="text/javascript">
$(function(){
	var  visibleState = '${visibleState}';
	var examType = '${examType}';
	var science = '${science}';
	var arts = '${arts}';
	var classRemark = '${classRemark}'
	if(visibleState != '0'){
		$('#grade-tr').hide();
		$('#grade-tr-num').hide();
	}
	if(examType != '1'){
		$('#score-tr').hide();
		$('#order-tr').hide();
	}
	if(science != '1'){
		$('#sendScienceScore').attr("disabled",true);
		$('#sendScienceOrder').attr("disabled",true);
		$('#sendScienceGradeOrder').attr("disabled",true);
	}
	if(arts != '1'){
		$('#sendArtsScore').attr("disabled",true);
		$('#sendArtsOrder').attr("disabled",true);
		$('#sendArtsGradeOrder').attr("disabled",true);
	}
	if(classRemark != '1'){
		$('#sendClassRemark').attr("disabled",true);
	}
	
});
</script>
