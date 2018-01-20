<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div style="padding: 10px 60px 20px 60px">
	<form id="single-score-first-form" class="easyui-form" method="post" data-options="novalidate:true">
		<table cellpadding="5" style="width: 100%;">
			<tr>
				<td>
					<input class="easyui-textbox" id="schoolYearText" name="schoolYearText" data-options="label:'学年'" style="width:350px;" readonly="readonly">
					<input id="schoolYearCode" name="schoolYearCode" type="hidden">
				</td>
			</tr>
			<tr>
	    			<td>
	    				<input class="easyui-textbox" id="schoolTermText" name="schoolTermText" data-options="label:'学年'" style="width:350px;" readonly="readonly">
						<input id="schoolTermCode" name="schoolTermCode" type="hidden">
	    			</td>
			</tr>
			<tr>
	    			<td>
	    				<input class="easyui-textbox" id="schoolCodeText" name="schoolCodeText" data-options="label:'学校'" style="width:350px;" readonly="readonly">
						<input id="schoolCode" name="schoolCode" type="hidden">
	    			</td>
			</tr>
			
			<tr>
	    			<td>
	    				<input class="easyui-textbox" id="stageText" name="stageText" data-options="label:'学部'" style="width:350px;" readonly="readonly">
						<input id="stage" name="stage" type="hidden">
	    			</td>
			</tr>
			<tr>
	    			<td>
	    				<input class="easyui-textbox" id="gradeText" name="gradeText" data-options="label:'年级'" style="width:350px;" readonly="readonly">
						<input id="grade" name="grade" type="hidden">
	    			</td>
			</tr>
			<tr>
	    			<td>
	    				<input class="easyui-textbox" id="classIdText" name="classIdText" data-options="label:'班级'" style="width:350px;" readonly="readonly">
						<input id="classId" name="classId" type="hidden">
	    			</td>
			</tr>
			<tr>
	    			<td>
	    				<input class="easyui-textbox" id="courseCodeText" name="courseCodeText" data-options="label:'科目'" style="width:350px;" readonly="readonly">
						<input id="courseCode" name="courseCode" type="hidden">
	    			</td>
			</tr>
			<tr>
	    			<td>
	    				<input class="easyui-textbox" id="typeCode" name="typeCode" data-options="label:'类型'" style="width:350px;">
	    			</td>
			</tr>
			<tr>
	    			<td>
           				 <input class="easyui-numberspinner" id="examSeqCode" mane="examSeqCode" value="1" data-options="spinAlign:'horizontal',label:'次数',width:350">
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
	    			<td>
           				 <input type="text" id="fullScore" name="fullScore" class="easyui-numberbox" style="width:350px" value="100" data-options="required:true,label:'满分',min:0,max:1000"></input> 
	    			</td>
			</tr>
			<tr>
	    			<td>
           				 <input class="easyui-textbox" id="examInsName" name="examInsName" style="width:350px;" data-options="required:true,label:'名称'">
	    			</td>
			</tr>
			<tr>
	    			<td>
           				 <select class="easyui-combobox" id="examYear" name="examYear" label='时间' style="width:200px;" data-options="editable:false,panelHeight : 'auto'">
			                <option value="2017">2017</option>
			                <option value="2018">2018</option>
			                <option value="2019">2019</option>
			                <option value="2020">2020</option>
			            </select>
			             <select class="easyui-combobox" id="examMonth" name="examMonth" style="width:148px;" data-options="editable:false,panelHeight : 'auto'">
			                <option value="01">01</option>
							<option value="02">02</option>
							<option value="03">03</option>
							<option value="04">04</option>
							<option value="05">05</option>
							<option value="06">06</option>
							<option value="07">07</option>
							<option value="08">08</option>
							<option value="09">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
			            </select>
			            <!--<select class="easyui-combobox" id="examDay" name="examDay" style="width:96px;" data-options="editable:false">
			                <option value="01">01</option>
							<option value="02">02</option>
							<option value="03">03</option>
							<option value="04">04</option>
							<option value="05">05</option>
							<option value="06">06</option>
							<option value="07">07</option>
							<option value="08">08</option>
							<option value="09">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
							<option value="25">25</option>
							<option value="26">26</option>
							<option value="27">27</option>
							<option value="28">28</option>
							<option value="29">29</option>
							<option value="30">30</option>
							<option value="31">31</option>
			            </select>-->
	    			</td>
			</tr>
		</table>
	</form>
</div>

<script src="${ctx }/js/pages/score/custom.radio.js"></script>
<script src="${ctx }/js/pages/score/single-score-first.js"></script> 
