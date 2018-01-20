var emptyData = [{"code":"-1", "name":" --- 空 --- ", "selected": true}];
var multiSelectRoot = {"code":"0", "name":" ---  请选择 --- ", "selected": true};
var initTreeGrid = false;
var _course_code = 0;

$(function() {
	selectSchoolYearCode();
});

function searchScoreIns(){
	$('#score-table').treegrid('reload');
}

function initScoreManageGrid(){
	
	initTreeGrid = true;
	
	$('#score-table').treegrid({
		url : 'scoreManage/page',
		idField : 'id',
		treeField : 'className',
		rownumbers : true,
		pagination : true,
		//singleSelect : true,
		//checkOnSelect : true,
		fitColumns : false,
		pageSize : 10,
		pageList : [ 10, 20, 30 ],
		toolbar : '#tb',
		onBeforeLoad : function(row, param) {
			if (!row) { // load top level rows
				param.id = 0; // set id=0, indicate to load new page rows
				param.examInsId = 0;
				param.classId = 0;
			}
			else{
				param.examInsId = row.examInsId; // set id=0, indicate to load new page rows
				param.id = row.classId; // set id=0, indicate to load new page rows
				param.classId = row.classId; // set id=0, indicate to load new page rows
				param.findCourese = true;
				param.sendState = row.sendState;
			}
			
			param.pageSize = param.rows;
			param.schoolYearCode = $('#school-year').val();
			param.schoolTermCode = $('#school-term').val();
			param.schoolCode = $('#school-code').val();
			param.stage = $('#school-stage').val();
			param.grade = $('#school-grade').val();
			param.classId = $('#school-class').val();
			
			var courseCode = $('#school-course').val();
			
			param.courseCode = _course_code;
			
			//console.log("param.courseCode = "+param.courseCode);
			
			param.examInsName = $('#school-exam-ins-name').val();
		},
		columns : [ [{
			field : 'className',
			title : '班级名称',
			halign : 'center',
			width : 100,
			align : 'left'
		}, {
			field : 'examInsName',
			title : '考次名称',
			halign : 'center',
			width : 150,
			align : 'left'
		}, {
			field : 'examTime',
			title : '考试时间',
			halign : 'center',
			width : 60,
			align : 'left'
		}, {
			field : 'typeName',
			title : '类型',
			halign : 'center',
			width : 60,
			align : 'left'
		}, {
			field : 'examType',
			title : '单科/多科',
			halign : 'center',
			width : 60,
			align : 'left',
			formatter : changeExamType
		}, {
			field : 'visibleState',
			title : '范围',
			halign : 'center',
			width : 60,
			align : 'left',
			formatter : changeVisibleState
		}, {
			field : 'courseName',
			title : '科目',
			halign : 'center',
			width : 50,
			align : 'left'
		}, {
			field : 'uploadState',
			title : '上传状态',
			halign : 'center',
			width : 60,
			align : 'left',
			formatter : changeUploadState
		}, {
			field : 'sendState',
			title : '发送状态',
			halign : 'center',
			width : 60,
			align : 'left',
			formatter : changeSendState
		}, {
			field : 'createUserName',
			title : '创建人',
			halign : 'center',
			width : 60,
			align : 'left'
		}, {
			field : 'createTime',
			title : '创建时间',
			halign : 'center',
			align : 'left',
			formatter : dateTimeFormatter
		}, {
			field : '_operate',
			title : '操作',
			halign : 'center',
			align : 'center',
			width : 370,
			formatter : scoreOperation
		}] ]
	});
	
}

function changeVisibleState(val, row){
	if(val == '0'){
		return '年级';
	}
	
	if(val == '1'){
		return '班级';
	}
}

function changeExamType(val, row){
	
	if(val == '0'){
		return '单科';
	}
	
	if(val == '1'){
		return '多科';
	}
}

function changeUploadState(val, row){
	if(val == '0'){
		return '未上传';
	}
	
	if(val == '1'){
		return '已上传';
	}
}

function changeSendState(val, row){
	if(row.dataState == '0'){
		if(val == '0'){
			return '未发送';
		}
		
		if(val == '1'){
			return '已发送';
		}
	}
	
	return "";
	
}

Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "  " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
};

/**
 * 格式化日期时间
 */

function dateTimeFormatter(value, row) {
    if (value == undefined) {
        return "";
    }
    
    var unixTimestamp = new Date( value ) ;
    commonTime = unixTimestamp.toLocaleString();
    
    return commonTime ;
}


function scoreOperation(val, row) {
	
	var buttons = '';
	
	//单科
	if(row.examType == '0'){
		//未上传
		if(row.uploadState == '0'){
			buttons += '<a name="editScore" class="easyui-linkbutton" style="color:green" onclick="openScoreInputWin(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\')">上传成绩</a>';
		}
		else{
			
			buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="viewInputScore" class="easyui-linkbutton" style="color:blue" onclick="viewInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\',\''+row.examType+'\',\''+row.visibleState+'\')">预览成绩</a>';
			
			if(row.sendState != '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="editInputScoreWin(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\')">修改成绩</a>';
				
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sumInputScore(\''+row.examInsId+'\',\''+row.classId+'\')">汇总成绩</a>';
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sendInputScoreWin(\''+row.schoolCode+'\',\''+row.examInsId+'\',\''+row.classId+'\',\''+row.visibleState+'\',\''+row.examType+'\',\''+row.examInsName+'\',\''+row.schoolName+'\',\''+row.grade+'\',\''+row.className+'\',\''+row.courseCode+'\',\''+row.courseName+'\')">发送成绩</a>';
				
			}else{
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sendStateScore" class="easyui-linkbutton" style="color:blue" onclick="sendStateScore(\''+row.examInsId+'\',\''+row.classId+'\')">查看发送状态</a>'
			}
		}

		if(row.sendState != '1'){
			buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="deleteInputScore" class="easyui-linkbutton" style="color:red" onclick="deleteInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\')">删除</a>';
		}
		
	}
	else{
		//成绩类型不能上传文件
		if(row.dataState != '1'){
			
			if(row.sendState != '1'){
				
				buttons += '<a href="#" name="editScore" class="easyui-linkbutton" style="color:green" onclick="openMultiScoreWin(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.className+'\',\''+row.courseCode+'\')">上传成绩</a>';
				
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sumInputScore(\''+row.examInsId+'\',\''+row.classId+'\')">汇总班级成绩</a>';
				
				if(row.visibleState == '0'){
					buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sumGradeInputScore(\''+row.examInsId+'\',\''+row.stage+'\',\''+row.grade+'\')">汇总年级排名</a>';	
				}
				
			}

			buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="viewInputScore" class="easyui-linkbutton" style="color:blue" onclick="viewInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\',\''+row.examType+'\',\''+row.visibleState+'\')">预览成绩</a>';
			
			if(row.sendState != '1' && row.uploadState != '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="deleteInputScore" class="easyui-linkbutton" style="color:red" onclick="deleteInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\')">删除</a>';
			}
			
			if(row.sendState != '1' && row.uploadState == '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sendInputScoreWin(\''+row.schoolCode+'\',\''+row.examInsId+'\',\''+row.classId+'\',\''+row.visibleState+'\',\''+row.examType+'\',\''+row.examInsName+'\',\''+row.schoolName+'\',\''+row.grade+'\',\''+row.className+'\',\''+row.courseCode+'\',\''+row.courseName+'\')">发送成绩</a>';
			}
			if(row.sendState == '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sendStateScore" class="easyui-linkbutton" style="color:blue" onclick="sendStateScore(\''+row.examInsId+'\',\''+row.classId+'\')">查看发送状态</a>'
			}
			
			
		}
		else{
			if(row.sendState != '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="editInputScoreWin(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\')">修改成绩</a>';
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="deleteInputScore" class="easyui-linkbutton" style="color:red" onclick="deleteInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\')">删除</a>';
			}
			if(row.sendState == '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sendStateScore" class="easyui-linkbutton" style="color:blue" onclick="sendStateScore(\''+row.examInsId+'\',\''+row.classId+'\')">查看发送状态</a>'
			}
		}
		
	}
	
	//buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="viewInputScore" class="easyui-linkbutton" style="color:blue" onclick="viewInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\',\''+row.examType+'\')">预览成绩</a>';
	
	//buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sumInputScore(\''+row.examInsId+'\',\''+row.classId+'\')">汇总成绩</a>';
	
	
	return buttons;
}

function sendStateScore(examInsId, classId){
	$('#view-score-sendState-win').window('open');
	$('#view-score-sendState-win').window('refresh', "toViewSendStateWin?examInsId="+examInsId+"&classId="+classId);
}

function openScoreRange(){
	$('#score-range-win').window('open');
	$('#score-range-win').window('refresh',"toFindScoreRange");
}
function saveScoreRange(){
	$('#range-rule-dg').datagrid('acceptChanges');
	var data = $('#range-rule-dg').datagrid('getData');
	if(data && data.rows && data.rows.length > 0){
		var ranges = data.rows;
		var name;
		var type;
		var rows = $('#range-rule-dg').datagrid('getRows');
		for(var i = 0;i<rows.length;i++){
			for(var j=i;j<rows.length;j++){
				if(rows[i]['scoreRangeStart'] == rows[j]['scoreRangeEnd']){
					$.messager.alert('提示','某分数段最低分和另一分数段最高分不能相同！','error');
					$('#range-rule-dg').datagrid('rejectChanges');
					alert(editIndex);
					return;
				}
			}
		}
		if($('#rangeRuleName').textbox('getValue') == '' && $('#rangeRules').attr('disabled') == 'disabled'){
			$.messager.show({
           	  	title:'提示',
           	  	msg: '新增分数段名称不能为空',
           	  	showType:'fade',
                  style:{
                      right:'',
                      bottom:''
                  }
           	  });
			return;
		}
		if($('#rangeRuleName').textbox('getValue') != null && $('#rangeRuleName').val().length>0){
			name=$('#rangeRuleName').val();
			type = 0;
		}else{
			name = $('#rangeRules').val();
			type = 1;
		}
		var input = {'ranges':ranges,'name':name,'type':type};
		$.ajax({
			url : "scoreManage/SaveScoreRangeRule",
			type: "POST",
	        contentType: "application/json",
	        dataType:"json",
	        async: false,
	        data:JSON.stringify(input),
			success : function(result) {
				
				//console.log(result);
				
				if('02'==result.code){
					//console.log("id = "+ id);
					$.messager.progress('close');
					$('#score-range-win').window('close');
	              } else {
	            	  $.messager.show({
	               	  	title:'提示',
	               	  	msg: '保存失败,请重试！',
	               	  	showType:'fade',
	                      style:{
	                          right:'',
	                          bottom:''
	                      }
	               	  });
	             }
			}
		});
	}else{
		$.messager.show({
       	  	title:'提示',
       	  	msg: '保存失败,不能录入空的分数段！',
       	  	showType:'fade',
              style:{
                  right:'',
                  bottom:''
              }
       	  });
	}
}


function selectSchoolCode(){
	
	$('#school-code').combobox({
		url : 'scoreManage/schools',
		method : 'get',
		valueField : 'schoolCode',
		textField : 'schoolName',
		panelHeight : 'auto',
		editable:false,
		onSelect: function( data ){
			
			var schoolCode = data.schoolCode;
			selectStageCombobox( schoolCode );
		}
	});
	
}


function selectSchoolYearCode(){
	$('#school-year').combobox({
		url : 'scoreManage/dicts?code=school-year',
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		onSelect: function( data ){
			selectSchoolTermCode();
		}
	});
}

function selectSchoolTermCode(){
	
	$('#school-term').combobox({
		url : 'scoreManage/dicts?code=school-term',
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		onSelect: function( data ){
			selectSchoolCode();
		}
	});
	
}

function selectStageCombobox( schoolCode ){

	$('#school-stage').combobox({
		url : 'scoreManage/stages?schoolCode='+schoolCode,
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		onLoadError: function(){
			//console.log(data);
			$('#school-stage').combobox('loadData', emptyData);
		},
		onSelect: function( data ){
			var stage = data.code;
			//console.log("stage = "+stage);
			selectGradeCombobox( schoolCode, stage );
		}
	});
}

function selectGradeCombobox( schoolCode, stage ){

	$('#school-grade').combobox({
		url : 'scoreManage/grades?schoolCode='+schoolCode+"&stage="+stage,
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		/*loadFilter:function(data){
			
			if(data == null || data.length == 0){
				data = emptyData;
			}
			
			if(data && data.length > 1){
				
				for(i=0; i < data.length; i++){
					data[i].selected = false;
				}
				
				data.splice(0,0,multiSelectRoot);//在数组0位置插入obj,不删除原来的元素  
			}
	        
	        return data;  
	    },*/
		onLoadError: function(){
			//console.log(data);
			$('#school-grade').combobox('loadData', emptyData);
		},
		onSelect: function( data ){
			var grade = data.code;
			selectClassCombobox( schoolCode, stage, grade );
			
		}
	});
}

function selectClassCombobox( schoolCode, stage, grade ){

	$('#school-class').combobox({
		url : 'scoreManage/classes?schoolCode='+schoolCode+"&stage="+stage+"&grade="+grade,
		method : 'get',
		valueField : 'id',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		/*loadFilter:function(data){
			
			if(data == null || data.length == 0){
				var emptyData = [{"id":"0", "name":" --- 空 --- ", "selected": true}];
				data = emptyData;
			}
			
			if(data && data.length > 1){
				
				for(i=0; i < data.length; i++){
					data[i].selected = false;
				}
				
				data.splice(0,0,multiSelectRoot);//在数组0位置插入obj,不删除原来的元素  
			}
	        
	        return data;  
	    },*/
		onLoadError: function(){
			//console.log(data);
			var emptyData = [{"id":"0", "name":" --- 空 --- ", "selected": true}];
			$('#school-class').combobox('loadData', emptyData);
		},
		onSelect: function( data ){
			var classId = data.id;
			//console.log("classId = "+classId);
			selectCourseCombobox( schoolCode, stage, grade, classId );
			
			//检查是否有创建多科权限
			changeMultiExamButton( classId );
		}
	});
}

function selectCourseCombobox( schoolCode, stage, grade, classId ){

	$('#school-course').combobox({
		url : 'scoreManage/courses?schoolCode='+schoolCode+"&stage="+stage+"&grade="+grade+"&classId="+classId,
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 400,
		editable:false,
		loadFilter:function(data){
			//console.log("error");
			//console.log(data);
			
			if(data == null || data.length == 0){
				data = emptyData;
			}
			
			if(data && data.length > 1){
				
				for(i=0; i < data.length; i++){
					data[i].selected = false;
				}
				
				data.splice(0,0,multiSelectRoot);//在数组0位置插入obj,不删除原来的元素  

			}
	        
	        return data;  
	    },
		onLoadError: function(){
			//console.log(data);
			//console.log('11111111');
			$('#school-course').combobox('loadData', emptyData);
		},
		onSelect: function( data ){
			//console.log("course = "+data.code);
			//按顺序初始话表格
			_course_code = data.code;
			
			//console.log("course = "+_course_code);
			
			if(initTreeGrid){
				$('#score-table').treegrid('reload');
			}
			else{
				initScoreManageGrid();
			}
			
		}
	});
}

function changeMultiExamButton( classId ){

	var stage = $("#school-stage").combobox('getValue');
	var grade = $("#school-grade").combobox('getValue');
	var schoolCode = $("#school-code").combobox('getValue');
	
	isBzr(schoolCode, stage, grade, classId);
	
	/*$.ajax({
		url : "scoreManage/isOnlyRenKe?schoolCode="+schoolCode+"&stage="+stage+"&grade="+grade+"&classId="+classId,
		//type: "POST",
        //contentType: "application/json",
        //dataType:"json",
        async: false,
        //data:JSON.stringify(data),
		success : function(result) {
			
			if(result == true){
				$("#multiExamBtn").hide();
			}
			else{
				$("#multiExamBtn").show();
			}
		}
	});*/
	
}

function isBzr(schoolCode, stage, grade, classId){
	
	$("#gradeVisibleState").hide();
	$("#gradeVisibleStateLabel").hide();
	
	$("#classVisibleState").hide();
	$("#classVisibleStateLabel").hide();
	
	$.ajax({
		url : "scoreManage/isBzr?schoolCode="+schoolCode+"&stage="+stage+"&grade="+grade+"&classId="+classId,
        async: false,
		success : function(result) {
			if(result == true){
				$("#multiExamBtn").show();
			}
			else{
				$("#multiExamBtn").hide();
				isCreateGrade(schoolCode, stage, grade);
			}
		}
	});
}

function isCreateGrade(schoolCode, stage, grade){
	$.ajax({
		url : "scoreManage/isCreateGrade?schoolCode="+schoolCode+"&stage="+stage+"&grade="+grade,
        async: false,
		success : function(result) {
			if(result == true){
				$("#multiExamBtn").show();
			}
			else{
				$("#multiExamBtn").hide();
			}
		}
	});
}

function openSingleScoreWin() {
	
	var stage = $("#school-stage").combobox('getValue');
	var grade = $("#school-grade").combobox('getValue');
	var classId = $("#school-class").combobox('getValue');
	var courseCode = $("#school-course").combobox('getValue');
	
	//console.log('stage = '+stage);
	
	if(stage == '0' || stage == '-1'){
		 $.messager.show({
    	  	title:'提示',
    	  	msg: '学部为空，无法新增单科成绩！',
    	  	showType:'fade',
            style:{
                right:'',
                bottom:''
            }
    	  });
		 
		 return;
	}
	
	if(grade == '0' || grade == '-1'){
		 $.messager.show({
     	  	title:'提示',
     	  	msg: '年级为空，无法新增单科成绩！',
     	  	showType:'fade',
            style:{
                right:'',
                bottom:''
            }
     	  });
		 
		 return;
	}
	
	if(classId == '0' || classId == '-1'){
		 $.messager.show({
    	  	title:'提示',
    	  	msg: '班级为空，无法新增单科成绩！',
    	  	showType:'fade',
            style:{
                right:'',
                bottom:''
            }
    	  });
		 
		 return;
	}
	
	//console.log('courseCode = '+courseCode);
	
	if(courseCode == '0' || courseCode == '-1'){
		 $.messager.show({
   	  	title:'提示',
   	  	msg: '科目为空，无法新增单科成绩！',
	   	 showType:'fade',
	     style:{
	         right:'',
	         bottom:''
	     }
   	  });
		 
		 return;
	}
	
    //var schoolYearName': $("#schoolYearCode").combobox('getText'),
	$('#multi-exam-win').empty();
	$('#single-score-first-win').empty();
	$('#multi-score-win').empty();
	
	$('#single-score-first-win').window('open');
	$('#single-score-first-win').window('refresh', 'toSingleScoreFirstWin');

}

function openMultiExamWin() {
	
	var stage = $("#school-stage").combobox('getValue');
	var grade = $("#school-grade").combobox('getValue');
	var classId = $("#school-class").combobox('getValue');
	var courseCode = $("#school-course").combobox('getValue');
	
	//console.log('stage = '+stage);
	
	if(stage == '0' || stage == '-1'){
		 $.messager.show({
    	  	title:'提示',
    	  	msg: '学部为空，无法新增多科考次！',
    	  	showType:'fade',
            style:{
                right:'',
                bottom:''
            }
    	  });
		 
		 return;
	}
	
	if(grade == '0' || grade == '-1'){
		 $.messager.show({
     	  	title:'提示',
     	  	msg: '年级为空，无法新增多科考次！',
     	  	showType:'fade',
            style:{
                right:'',
                bottom:''
            }
     	  });
		 
		 return;
	}
	
	$('#single-score-first-win').empty();
	$('#multi-score-win').empty();
	$('#multi-exam-win').empty();
	
	$('#multi-exam-win').window('open');
	
	
	$('#multi-exam-win').window('refresh', 'toMultiExamtWin');
	
}

function openMultiScoreWin( examInsId, classId, className, courseCode ){
	$('#single-score-first-win').empty();
	$('#multi-exam-win').empty();
	$('#multi-score-win').empty();
	
	var className = encodeURI(className);
	
	$('#multi-score-win').window('open');
	$('#multi-score-win').window('refresh', 'toMultiScoreWin?examInsId='+examInsId+"&classId="+classId+"&className="+className+"&courseCode="+courseCode);
}

function saveMultiExam(){
	
	$('#multi-exam-form').form('submit', {
		url: '',
		onSubmit: function( param ){
			var isValid = $(this).form('enableValidation').form('validate');
			//console.log(isValid);
			
			if (!isValid){
				$.messager.progress('close');	// hide progress bar while the form is invalid
			}
			
			if(isValid){
				
				var visibleState = $("input[name='visibleState']:checked").val();
				
				var data = {
						'schoolYearCode': $("#schoolYearCode").val(),
			            'schoolYearName': $("#schoolYearText").val(),
			            'schoolTermCode': $("#schoolTermCode").val(),
			            'schoolTermName': $("#schoolTermText").val(),
			            'schoolCode': $("#schoolCode").val(),
			            'schoolName': $("#schoolCodeText").val(),
			            'stage': $("#stage").val(),
			            'grade': $("#grade").val(),
			            'typeCode':  $("#typeCode").combobox('getValue'),
			            'typeName': $("#typeCode").combobox('getText'),
			            'gradeOrder': $("input[name='gradeOrder']:checked").val(),
			            'name': $("#examInsName").val(),
			            'examType': 1,
			            'examTime': $("#examYear").combobox('getValue') + $("#examMonth").combobox('getValue') + $("#examDay").combobox('getValue'),
			            'visibleState' : visibleState,
			            'classId':  $("#school-class").combobox('getValue'),
			            'className': $("#school-class").combobox('getText')
			     };
				
				if(visibleState == 0){
					$.messager.confirm('提示', '确定创建年级考次吗?', function(r){
				        if (r){
				        	$.ajax({
								url : "scoreManage/saveExamIns",
								type: "POST",
						        contentType: "application/json",
						        dataType:"json",
						        async: false,
						        data:JSON.stringify(data),
								success : function(result) {
									
									//console.log(result);
									
									if('02'==result.code){
										$('#score-table').treegrid('reload');
										var id = result.data;
										//console.log("id = "+ id);
										$.messager.progress('close');
										$('#multi-exam-win').window('close');
										
						              } else {
						            	// show message window on top center
						            	 
						            	  $.messager.show({
						            	  	title:'提示',
						            	  	msg: result.msg,
						            	  	showType:'show'
						            	  });
						             }
								}
							});
				        }
				    });
				}
				else{
					$.ajax({
						url : "scoreManage/saveExamIns",
						type: "POST",
				        contentType: "application/json",
				        dataType:"json",
				        async: false,
				        data:JSON.stringify(data),
						success : function(result) {
							
							//console.log(result);
							
							if('02'==result.code){
								$('#score-table').treegrid('reload');
								var id = result.data;
								//console.log("id = "+ id);
								$.messager.progress('close');
								$('#multi-exam-win').window('close');
								
				              } else {
				            	// show message window on top center
				            	  $.messager.show({
				            	  	title:'提示',
				            	  	msg: result.msg,
				            	  	showType:'show'
				            	  });
				             }
						}
					});
				}
				
				

				
			}
			
			return false;
		
		},
		success: function( data ){

		}
	});
	
}

function nextToScoreInputWin(){
	
	$('#single-score-first-form').form('submit', {
		url: '',
		onSubmit: function( param ){
			var isValid = $(this).form('enableValidation').form('validate');
			//console.log(isValid);
			
			if (!isValid){
				$.messager.progress('close');	// hide progress bar while the form is invalid
			}
			
			if(isValid){
				var data = {
			            'schoolYearCode': $("#schoolYearCode").val(),
			            'schoolYearName': $("#schoolYearText").val(),
			            'schoolTermCode': $("#schoolTermCode").val(),
			            'schoolTermName': $("#schoolTermText").val(),
			            'schoolCode': $("#schoolCode").val(),
			            'schoolName': $("#schoolCodeText").val(),
			            'stage': $("#stage").val(),
			            'grade': $("#grade").val(),
			            'classId': $("#classId").val(),
			            'className': $("#classIdText").val(),
			            'courseCode':  $("#courseCode").val(),
			            'courseName': $("#courseCodeText").val(),
			            'typeCode':  $("#typeCode").combobox('getValue'),
			            'typeName': $("#typeCode").combobox('getText'),
			            'examSeqCode':  $("#examSeqCode").val(),
			            'examSeqName': '第' + $("#examSeqCode").val() + '次',
			            'scoreMulti': $("input[name='scoreMulti']:checked").val(),
			            'scoreFull': $("#fullScore").val(),
			            'name': $("#examInsName").val(),
			            'examType': 0, 
			            'examTime': $("#examYear").combobox('getValue') + $("#examMonth").combobox('getValue') + $("#examDay").combobox('getValue')
			     };
				
				//console.log(data);
				
				$.ajax({
					url : "scoreManage/saveExamIns",
					type: "POST",
			        contentType: "application/json",
			        dataType:"json",
			        async: false,
			        data:JSON.stringify(data),
					success : function(result) {
						
						//console.log(result);
						
						if('02'==result.code){
							$('#score-table').treegrid('reload');
							var id = result.data;
							//console.log("id = "+ id);
							$.messager.progress('close');
							$('#single-score-first-win').window('close');
							
							openScoreInputWin( id );
							
			              } else {
			            	 
			            	// show message window on top center
			            	  $.messager.show({
			            	  	title:'提示',
			            	  	msg: result.msg,
			            	  	showType:'show'
			            	  });
			            	  
			             }
					}
				});
			}
			
			return false;
		
		},
		success: function( data ){

		}
	});
	
}

function nextMultiScoreWin(){
	
	var courseName =  $("#courseCode").combobox('getText');
	var className = $("input[name='classId']:checked").attr('text');
	
	$("#course_name_").val(courseName);
	$("#class_name_").val(className);
	
	//console.log(courseName);class_name_
	var data = $("#multi-score-form").serialize();
	//console.log(data)
	var scoreSection =  $("input[name='scoreSection']:checked").val();
	//console.log(className)
	$('#multi-score-win').window('close');
	$('#score-input-win').window('open');
	if(scoreSection == 1){
		$('#score-input-win').window('refresh', 'toScoreInputMultiWin?'+data);
	}else{
		$('#score-input-win').window('refresh', 'toScoreInputWin?'+data);
	}
	/*console.log(data);
	alert(data);*/
	
}

function editInputScoreWin( examInsId, classId, courseCode ){
	
	//console.log(examInsId + " - " + classId + " - " +)courseCode;
	$('#score-input-win').empty();
	$('#score-input-win').window('open');
	$('#score-input-win').window('refresh', 'toScoreInputWin?examType=-1&examInsId='+examInsId+'&classId='+classId+'&courseCode='+courseCode);
}

function openScoreInputWin( examInsId ){
	$('#score-input-win').empty();
	$('#score-input-win').window('open');
	$('#score-input-win').window('refresh', 'toScoreInputWin?examType=0&examInsId='+examInsId);
	
}


function viewInputScore( examInsId, classId, courseCode, dataState, examType, visibleState ){
	
	$('#view-score-input-win').window('open');
	$('#view-score-input-win').window('refresh', "toViewScoreInputWin?examInsId="+examInsId+"&classId="+classId+"&courseCode="+courseCode+"&dataState="+dataState+"&examType="+examType+"&visibleState="+visibleState);
	
}
function sendInputScoreWin( schoolCode, examInsId, classId, visibleState, examType, examInsName,schoolName,grade,className,courseCode,courseName){
	$('#send-score-input-win').window('open');
	$('#send-score-input-win').window('refresh', 'toSendScoreInputWin?schoolCode='+schoolCode+'&examInsId='+examInsId+'&classId='+classId+"&visibleState="+visibleState+'&examType='+examType+'&examInsName='+examInsName+'&schoolName='+schoolName+'&grade='+grade+'&className='+className+'&courseCode='+courseCode+'&courseName='+courseName);

}

function sendInputScore(){
	
	var sendExamInsId = $('#sendExamInsId').val();
	var sendSchoolCode = $('#sendSchoolCode').val();
	var sendClassId = $('#sendClassId').val();
	var sendExamInsName = $('#sendExamInsName').val();
	var sendSchoolName = $('#sendSchoolName').val();
	var sendGrade = $('#sendGrade').val();
	var sendClassName = $('#sendClassName').val();
	var sendCourseCode = $('#sendCourseCode').val();
	var sendCourseName = $('#sendCourseName').val();
	
	var sendScoreInfo = {
			"examInsId":sendExamInsId,
			"classId":sendClassId,
			"schoolCode":sendSchoolCode,
			"examInsName":sendExamInsName,
			"schoolName":sendSchoolName,
			"grade":sendGrade,
			"className":sendClassName,
			"courseCode":sendCourseCode,
			"courseName":sendCourseName,
	 		"sendAvgScore":false,
	 		"sendTopScore":false,
	 		"sendClassOrder":false,
	 		"sendClassOrderNum":0,
	 		"sendGrdeOrder":false,
	 		"sendGrdeOrderNum":0,
	 		"sendSingleFull":false,
	 		"sendArtsScore":false,
	 		"sendScienceScore":false,
	 		"sendSingleOrder":false,
	 		"sendArtsOrder":false,
	 		"sendScienceOrder":false,
	 		"sendSingleGradeOrder":false,
	 		"sendArtsGradeOrder":false,
	 		"sendScienceGradeOrder":false,
	 		"sendClassRemark":false
	 	};
	 
	 	$('[name=sendTypes]:checked').each(function(){
	 		var id = $(this).attr('id');
	 		sendScoreInfo[id] = true;
	 		
	 		if(id=="sendClassOrder"){
	 			sendScoreInfo["sendClassOrderNum"] = $("#sendClassOrderNum").val();
	 		}
	 		
	 		if(id=="sendGrdeOrder"){
	 			sendScoreInfo["sendGrdeOrderNum"] = $("#sendGrdeOrderNum").val();
	 		}
	 		//var type = $(this).val();
	 		//types[type] = true;
	 	});

    	//var ts = types['1'] + "," + types['2'] + "," +types['3'] ;
    	
    	$.messager.progress();
    	
    	$.ajax({
    		url : "scoreManage/sendScoreInput",
    		type: "POST",
	        contentType: "application/json",
	        dataType:"json",
	        async: false,
    		data:JSON.stringify(sendScoreInfo),
    		success : function(result) {
    			
    			if('02'==result.code){
    				$.messager.progress('close');
    				
    				$('#send-score-input-win').window('close');
    				$('#send-score-input-win').empty();
    				
    				$.messager.show({
		            	  	title:'提示',
		            	  	msg: '发送成功',
		            	  	showType:'show'
		            	  });
    				 
    				$('#score-table').treegrid('reload');
                  } else {
                	$.messager.progress('close');
                	 $.messager.show({
		            	  	title:'提示',
		            	  	msg: '发送失败',
		            	  	showType:'show'
		            	  });
                	 
                	 $('#score-table').treegrid('reload');
                 }
    		}
    	});
	
}

function sumGradeInputScore(examInsId, stage, grade){

	//examInsId, stage, grade 
	/*var row = $('#score-table').datagrid('getSelected');
	if (!row){
		$.messager.show({
    	  	title:'提示',
    	  	msg: '请选择需要统计的考次信息',
    	  	showType:'fade',
            style:{
                right:'',
                bottom:''
            }
    	  });
		return;
	}
	
	var visibleState = row.visibleState;
	var sendState = row.sendState;
	
	if(sendState == '1'){
		$.messager.show({
    	  	title:'提示',
    	  	msg: '已发送考次信息不能统计年级排',
    	  	showType:'fade',
            style:{
                right:'',
                bottom:''
            }
    	  });
		return;
	}
	
	if(visibleState != '0'){
		$.messager.show({
    	  	title:'提示',
    	  	msg: '非年级考试范围不同能统计年级排名',
    	  	showType:'fade',
            style:{
                right:'',
                bottom:''
            }
    	  });
		return;
	}
	
	var examInsId = row.examInsId; 
	var stage = row.stage;  
	var grade = row.grade;  */
	
	$.messager.confirm('提示', '请确认各班成绩是否上传并汇总完成?', function(r){
        if (r){
        	$.messager.progress();
        	
        	$.ajax({
        		url : "scoreManage/countGradeOrder?examInsId="+examInsId+"&stage="+stage+"&grade="+grade,
                async: false,
        		success : function(result) {
        			
        			if('02'==result.code){
        				$('#score-table').treegrid('reload');
        				$.messager.progress('close');
                      } else {
                    	$.messager.progress('close');
                     }
        		}
        	});
        }
    });
	
}

function sumInputScore( examInsId, classId ){
	$.messager.confirm("提示","已汇总完毕!<br>是否添加班级评语？",function(r){
		if(r){
			$('#score-input-classRemark-win').empty();
			$('#score-input-classRemark-win').window('open');
			$('#score-input-classRemark-win').window('refresh', 'toScoreRemarkPage?examInsId='+examInsId+"&classId="+classId);
		}else{
			$.messager.progress();
			$.ajax({
				url : "scoreManage/toSumClassScore?examInsId="+examInsId+"&classId="+classId+"&classRemark="+'',
		        async: false,
				success : function(result) {
					
					if('02'==result.code){
						$.messager.progress('close');
		              } else {
		            	$.messager.progress('close');
		             }
				}
			});
			$('#score-input-classRemark-win').window('close');
		 	$('#score-input-classRemark-win').empty();
		}
	});
	
}
function addClassRemark(){
	var remark = $('#viewScoreRemark').val();
	var examInsId=$('#remarkInsId').val();
	var classId=$('#remarkClassId').val();
	console.log(remark);
	if(remark=="undefined" || remark == null || remark==""){
		remark="";
	}
	/*var data=classRemark;
	console.log(data);
	if(classRemark == null || classRemark == '' || classRemark == 'null'){
		classRemark = '';
		 data = classRemark += remark;
	 }
	 else{
		 data = classRemark += "\n" + remark;
	 }*/
	$.messager.progress();
	$.ajax({
		url : "scoreManage/toSumClassScore?examInsId="+examInsId+"&classId="+classId+"&classRemark="+remark,
        async: false,
		success : function(result) {
			
			if('02'==result.code){
				$.messager.progress('close');
              } else {
            	$.messager.progress('close');
             }
		}
	});
	$('#score-input-classRemark-win').window('close');
 	$('#score-input-classRemark-win').empty();
}

function deleteInputScore( examInsId, classId, courseCode, dataState ){
	//console.log(examInsId+','+classId+','+courseCode+','+dataState);
	$.messager.confirm('提示', '确定删除该记录吗?', function(r){
        if (r){
        	$.ajax({
        		url : "scoreManage/deleteInputScore?examInsId="+examInsId+"&classId="+classId+"&courseCode="+courseCode+"&dataState="+dataState,
                async: false,
        		success : function(result) {
        			
        			if('02'==result.code){
        				$('#score-table').treegrid('reload');
        				
                      } else {
                    	 
                     }
        		}
        	});
        }
    });
	
}

function saveInputScore() {
	$.messager.progress({

　　　　　　　　title:'提示',
　　　　　　　　msg:'正在上传',
　　　　　　　　text:'努力中...'
　　　　});
	var scoreSection = $("#inputScoreSection").val();
	
	if(scoreSection == 1){
		var requestHeaders = resultHeaders;
		
		var classRemark = $("#classRemark").val()
		
		var scoreboards = [];
		var scoresingle = [];
		for(i = 0 ; i < courseMulti.length ; i++){
			var code = courseMulti[i].code;
			var courseName = courseMulti[i].courseName;
			var inputScoreAFull = "inputScoreAFull" + code;
			var inputScoreAStd = "inputScoreAStd" + code;
			var inputScoreBFull = "inputScoreBFull" + code;
			var inputScoreBStd = "inputScoreBStd" + code;
			
			scoreboards.push({  
				code : code,
				courseName:courseName,
				inputScoreAFull : $("#"+inputScoreAFull).val(),
				inputScoreAStd : $("#"+inputScoreAStd).val(),
				inputScoreBFull : $("#"+inputScoreBFull).val(),
				inputScoreBStd : $("#"+inputScoreBStd).val(),
			});
		}
		//console.log(courseSingle);
		for(i = 0 ; i < courseSingle.length ; i++){
			var code = courseSingle[i].code;
			var courseName = courseSingle[i].courseName;
			var inputScoreFull = "inputScoreFull" + code;
			scoresingle.push({
				code : code,
				courseName:courseName,
				inputScoreFull : $("#"+inputScoreFull).val()
			});
		}
		$('#score-input-multi-dg').datagrid('acceptChanges');
		var dataMulti = $('#score-input-multi-dg').datagrid('getData');
		var students = dataMulti.rows;
		for(i = 0 ; i < students.length ; i++){
			var stu = students[i];
			for(j = 0 ; j < scoreboards.length ; j++){
				var scb =scoreboards[j];
				var code = scb.code;
				var Acode = code + '-scoreA';
				var Bcode = code + '-scoreB';
				var scA =  Number(stu[Acode]);
				var sfcA =  Number(scb.inputScoreAFull);
				var scB =  Number(stu[Bcode]);
				var sfcB =  Number(scb.inputScoreBFull);
				if(scA > sfcA){
					 $.messager.show({
		            	  	title:'提示',
		            	  	msg: '学生'+stu.name+"的"+scb.courseName+"A卷成绩"+scA+"不能大于满分"+sfcA+",请重新录入.",
		            	  	showType:'fade',
		                    style:{
		                        right:'',
		                        bottom:''
		                    }
		            	  });
					 $.messager.progress('close');
					 return;
				}
				
				if(scB > sfcB){
					 $.messager.show({
		            	  	title:'提示',
		            	  	msg: '学生'+stu.name+"的"+scb.courseName+"B卷成绩"+scB+"不能大于满分"+sfcB+",请重新录入.",
		            	  	showType:'fade',
		                    style:{
		                        right:'',
		                        bottom:''
		                    }
		            	  });
					 $.messager.progress('close');
					 return;
				}
			}
			
			for(j = 0 ; j < scoresingle.length ; j++){
				var scs =scoresingle[j];
				var code = scs.code;
				var sc =  Number(stu[code]);
				var sfc =  Number(scs.inputScoreFull);
				if(sc > sfc){
					 $.messager.show({
		            	  	title:'提示',
		            	  	msg: '学生'+stu.name+"的"+scs.courseName+"成绩"+sc+"不能大于满分"+sfc+",请重新录入.",
		            	  	showType:'fade',
		                    style:{
		                        right:'',
		                        bottom:''
		                    }
		            	  });
					 $.messager.progress('close');
					 return;
				}
			}
		}
		if(dataMulti && dataMulti.rows && dataMulti.rows.length >0){
			
			var students = dataMulti.rows;
			var examInsId = $("#inputExamInsId").val();
			var scoreAFull = $("#inputScoreAFull").val();
			var scoreAStd = $("#inputScoreAStd").val();
			var scoreBFull = $("#inputScoreBFull").val();
			var scoreBStd = $("#inputScoreBStd").val();
			var courseCode = $("#inputCourseCode").val();
			var classId = $("#inputClassId").val();
			var courseName = $("#inputCourseName").val();
			var className = $("#inputClassName").val();
			var examType = $("#inputExamType").val();
			var scoreMulti = $("#inputScoreMulti").val();
			var fullScore = $("#inputFullScore").val();
			
			
			for(i=0 ; i < students.length ; i++){
				if(students[i].studentCode == null || students[i].studentCode == ''){
					 $.messager.show({
		            	  	title:'提示',
		            	  	msg: '学生'+students[i].name+"的编号不能为空",
		            	  	showType:'fade',
		                    style:{
		                        right:'',
		                        bottom:''
		                    }
		            	  });
					 return;
				}
				
			}
			
			var input = {
					'examInsId' : examInsId,
					'classId' : classId,
					'examType' : examType,
					'className' : className,
					'scoreMulti' : scoreMulti,
					'fullScore' : fullScore,
					'headers' : requestHeaders,
					'students' : students,
					'scoreboards' : scoreboards,
					'classRemark' : classRemark,
					'scoreSingle' : scoresingle
			};
			//console.log(input);
			
			$.ajax({
				url : "scoreManage/saveInputMultiScore",
				type: "POST",
		        contentType: "application/json",
		        dataType:"json",
		        async: true,
		        data:JSON.stringify(input),
				success : function(result) {
				 
					//console.log(result.code);
					if('02'==result.code){
						$('#score-table').treegrid('reload');
						var id = result.data;
						//console.log("id = "+ id);
						$.messager.progress('close');
						$('#score-input-win').window('close');
						
		              } else {
		            	  $.messager.progress('close');
		             }
				}
			});
		}
		
	}else{
		$('#score-input-dg').datagrid('acceptChanges');
		var data = $('#score-input-dg').datagrid('getData');
		//console.log(data);
		if(data && data.rows && data.rows.length >0){
		
		var students = data.rows;
		var examInsId = $("#inputExamInsId").val();
		var scoreAFull = $("#inputScoreAFull").val();
		var scoreAStd = $("#inputScoreAStd").val();
		var scoreBFull = $("#inputScoreBFull").val();
		var scoreBStd = $("#inputScoreBStd").val();
		var courseCode = $("#inputCourseCode").val();
		var classId = $("#inputClassId").val();
		var courseName = $("#inputCourseName").val();
		var className = $("#inputClassName").val();
		var examType = $("#inputExamType").val();
		var scoreMulti = $("#inputScoreMulti").val();
		var fullScore = $("#inputFullScore").val();
		//var classRemark=$('#singleClassRemark').textbox('getValue');
		
		//console.log("examType - " + examType);
		
		for(i=0 ; i < students.length ; i++){
			//console.log(students[i].studentCode+" = " +students[i].name);
			if(students[i].studentCode == null || students[i].studentCode == ''){
				 $.messager.show({
	            	  	title:'提示',
	            	  	msg: '学生'+students[i].name+"的编号不能为空",
	            	  	showType:'fade',
	                    style:{
	                        right:'',
	                        bottom:''
	                    }
	            	  });
				 return;
			}
			
		}
		
		var input = {
				'examInsId' : examInsId,
				'scoreAFull' : scoreAFull,
				'scoreAStd' : scoreAStd,
				'scoreBFull' : scoreBFull,
				'scoreBStd' : scoreBStd,
				'courseCode' : courseCode,
				'classId' : classId,
				'examType' : examType,
				'courseName' : courseName,
				'className' : className,
				'scoreMulti' : scoreMulti,
				'fullScore' : fullScore,
				'students' : students,
		};
		
		$.ajax({
			url : "scoreManage/saveInputScore",
			type: "POST",
	        contentType: "application/json",
	        dataType:"json",
	        async: false,
	        data:JSON.stringify(input),
			success : function(result) {
				
				//console.log(result);
				
				if('02'==result.code){
					$('#score-table').treegrid('reload');
					var id = result.data;
					//console.log("id = "+ id);
					$.messager.progress('close');
					$('#score-input-win').window('close');
					
	              } else {
	            	 
	             }
			}
		});
	}
	}
}
