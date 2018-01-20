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
		url : 'scoreManage/recoveryPage',
		idField : 'id',
		treeField : 'className',
		rownumbers : true,
		pagination : true,
		//singleSelect : true,
		//checkOnSelect : true,
		fitColumns : true,
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
			align : 'left'
		}, {
			field : 'examInsName',
			title : '考次名称',
			halign : 'center',
			align : 'left'
		}, {
			field : 'examTime',
			title : '考试时间',
			halign : 'center',
			align : 'left'
		}, {
			field : 'typeName',
			title : '类型',
			halign : 'center',
			align : 'left'
		}, {
			field : 'examType',
			title : '单科/多科',
			halign : 'center',
			align : 'left',
			formatter : changeExamType
		}, {
			field : 'courseName',
			title : '科目',
			halign : 'center',
			align : 'left'
		}, {
			field : 'uploadState',
			title : '上传状态',
			halign : 'center',
			align : 'left',
			formatter : changeUploadState
		}, {
			field : 'sendState',
			title : '发送状态',
			halign : 'center',
			align : 'left',
			formatter : changeSendState
		}, {
			field : 'createUserName',
			title : '创建人',
			halign : 'center',
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
			width : 250,
			formatter : function(val,row){
				return '<a name="recoveryScore" class="easyui-linkbutton" style="color:green" onclick="recoveryScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\')">恢复</a>';
			}
		} ] ]
	});
	
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

function recoveryScore( examInsId, classId, courseCode, dataState ){
	//console.log(examInsId+','+classId+','+courseCode+','+dataState);
	$.messager.confirm('提示', '确定恢复该记录吗?', function(r){
        if (r){
        	$.ajax({
        		url : "scoreManage/recoveryScore?examInsId="+examInsId+"&classId="+classId+"&courseCode="+courseCode+"&dataState="+dataState,
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
			//changeMultiExamButton( classId );
		}
	});
}

function selectCourseCombobox( schoolCode, stage, grade, classId ){

	$('#school-course').combobox({
		url : 'scoreManage/courses?schoolCode='+schoolCode+"&stage="+stage+"&grade="+grade+"&classId="+classId,
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
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



function scoreOperation(val, row) {
	
	
	
	/*//单科
	if(row.examType == '0'){
		//未上传
		if(row.uploadState == '0'){
			buttons += '<a name="editScore" class="easyui-linkbutton" style="color:green" onclick="openScoreInputWin(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\')">上传成绩</a>';
		}
		else{
			
			buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="viewInputScore" class="easyui-linkbutton" style="color:blue" onclick="viewInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\',\''+row.examType+'\')">预览成绩</a>';
		
			if(row.sendState != '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="editInputScoreWin(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\')">修改成绩</a>';
				
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sumInputScore(\''+row.examInsId+'\',\''+row.classId+'\')">汇总成绩</a>';
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sendInputScoreWin(\''+row.schoolCode+'\',\''+row.examInsId+'\',\''+row.classId+'\')">发送成绩</a>';
				
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
				
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sumInputScore(\''+row.examInsId+'\',\''+row.classId+'\')">汇总成绩</a>';
			}

			buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="viewInputScore" class="easyui-linkbutton" style="color:blue" onclick="viewInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\',\''+row.examType+'\')">预览成绩</a>';
			
			if(row.sendState != '1' && row.uploadState != '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="deleteInputScore" class="easyui-linkbutton" style="color:red" onclick="deleteInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\')">删除</a>';
			}
			
			if(row.sendState != '1' && row.uploadState == '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sendInputScoreWin(\''+row.schoolCode+'\',\''+row.examInsId+'\',\''+row.classId+'\')">发送成绩</a>';
			}
			
			
		}
		else{
			if(row.sendState != '1'){
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="editInputScoreWin(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\')">修改成绩</a>';
				buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="deleteInputScore" class="easyui-linkbutton" style="color:red" onclick="deleteInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\')">删除</a>';
			}
		}
		
	}*/
	
	//buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="viewInputScore" class="easyui-linkbutton" style="color:blue" onclick="viewInputScore(\''+row.examInsId+'\',\''+row.classId+'\',\''+row.courseCode+'\',\''+row.dataState+'\',\''+row.examType+'\')">预览成绩</a>';
	
	//buttons += '&nbsp;&nbsp;&nbsp;&nbsp;<a name="sumInputScore" class="easyui-linkbutton" style="color:blue" onclick="sumInputScore(\''+row.examInsId+'\',\''+row.classId+'\')">汇总成绩</a>';
	
	
	/*return buttons;*/
}