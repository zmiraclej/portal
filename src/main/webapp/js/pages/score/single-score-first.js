$(function(){
	//默认选中当前年月
	 var date=new Date;
	 var year=date.getFullYear();
	 var month=date.getMonth()+1;
	 month =(month<10 ? "0"+month:month);
	 $("#examYear option").each(function(){
		 if($(this).text() == year.toString()){
			 $(this).attr("selected",true);
		 }
	 });
	 $("#examMonth option").each(function(){
		 if($(this).text() == month.toString()){
			 $(this).attr("selected",true);
		 }
	 });
	
	var schoolYearCode = $("#school-year").combobox('getValue');
	var schoolYearText = $("#school-year").combobox('getText');
	$('#schoolYearCode').val(schoolYearCode);
	$('#schoolYearText').val(schoolYearText);
	
	/*$('#schoolYearCode').combobox({
		url : 'scoreManage/dicts?code=school-year',
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		onSelect: function( data ){
		}
	});*/
	
	var schoolTermCode = $("#school-term").combobox('getValue');
	var schoolTermText = $("#school-term").combobox('getText');
	$('#schoolTermCode').val(schoolTermCode);
	$('#schoolTermText').val(schoolTermText);
	
	/*$('#school-term-div').custom_ajax_radio({
		name:'schoolTermCode',
		url:'scoreManage/dicts?code=school-term',
		valueField : 'code',
		textField : 'name',
		labelField : '学期',
		checkedField: 'selected',
		singleRow: 3,
		loadSuccess : function( data ){
		}
	});*/

	var schoolCode = $("#school-code").combobox('getValue');
	var schoolCodeText = $("#school-code").combobox('getText');
	$('#schoolCode').val(schoolCode);
	$('#schoolCodeText').val(schoolCodeText);
	
	var stage = $("#school-stage").combobox('getValue');
	var stageText = $("#school-stage").combobox('getText');
	$('#stage').val(stage);
	$('#stageText').val(stageText);
	
	var grade = $("#school-grade").combobox('getValue');
	var gradeText = $("#school-grade").combobox('getText');
	$('#grade').val(grade);
	$('#gradeText').val(gradeText);
	
	var classId = $("#school-class").combobox('getValue');
	var classIdText = $("#school-class").combobox('getText');
	$('#classId').val(classId);
	$('#classIdText').val(classIdText);
	
	var courseCode = $("#school-course").combobox('getValue');
	var courseCodeText = $("#school-course").combobox('getText');
	$('#courseCode').val(courseCode);
	$('#courseCodeText').val(courseCodeText);
	
	/*$('#school-code-div').custom_ajax_radio({
		name:'schoolCode',
		url:'scoreManage/schools',
		valueField : 'schoolCode',
		textField : 'schoolName',
		labelField : '学校',
		checkedField: 'selected',
		singleRow: 3,
		loadSuccess : function( data ){
			var schoolCode = $("input[name='schoolCode']:checked").val();
			singleSelectStageRadio( schoolCode );
			
		}
	});*/
	
	$('#typeCode').combobox({
		url:'scoreManage/dicts?code=exam-type',
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		onSelect: function( data ){
			
			var name = data.name;
			//console.log(name);
			
			createExamInsName( name );
		}
	});
	
	$('#examSeqCode').numberspinner({  
	    "onChange": function changePer(newValue,oldValue)  {  
	    	//console.log(newValue + ' - ' + oldValue);
	    	var typeName = $("#typeCode").combobox('getText');
			createExamInsName( typeName );
		}
	});  
	
	/*$('#examSeqCode').change(function(){
		var typeName = $("#typeCode").combobox('getText');
		createExamInsName( typeName );
	});*/
	
	/*$("input[name='schoolCode']").change(function(){
		var schoolCode = $("input[name='schoolCode']:checked").val();
		singleSelectStageRadio( schoolCode );
		
	});
	
	$("input[name='stage']").change(function(){
		var schoolCode = $("input[name='schoolCode']:checked").val();
		var stage = $("input[name='stage']:checked").val();
		singleSelectGradeRadio( schoolCode, stage );
		
	});
	
	$("input[name='grade']").change(function(){
		var schoolCode = $("input[name='schoolCode']:checked").val();
		var stage = $("input[name='stage']:checked").val();
		var grade = $("input[name='grade']:checked").val();
		singleSelectClassRadio( schoolCode, stage, grade );
		
	});
	
	$("input[name='classId']").change(function(){
		var schoolCode = $("input[name='schoolCode']:checked").val();
		var stage = $("input[name='stage']:checked").val();
		var grade = $("input[name='grade']:checked").val();
		var classId = $("input[name='classId']:checked").val();
		singleSelectCourseCombobox( schoolCode, stage, grade, classId );
		
	});*/
});

function createExamInsName( typeName ) {
	
	var courseCodeText = $("#school-course").combobox('getText');
	//var typeName = $("#typeCode").combobox('getText');
	
	if(typeName == null || typeName == ''){
		typeName = $("#typeCode").combobox('getText');
	}
	
	var examSeqName = '第' + $("#examSeqCode").val() + '次';
	var examInsName = courseCodeText + " " + examSeqName + " " + typeName;
	
	//console.log('sss = ' + typeName);
	//console.log('examInsName = ' + examInsName);
	
	 $('#examInsName').textbox('setValue', examInsName);
}

/*function singleSelectStageRadio( schoolCode ){

	$('#school-stage-div').custom_ajax_radio({
		name:'stage',
		url: 'scoreManage/stages?schoolCode='+schoolCode,
		valueField : 'code',
		textField : 'name',
		labelField : '学部',
		checkedField: 'selected',
		singleRow: 3,
		loadSuccess : function( data ){
			var stage = $("input[name='stage']:checked").val();
			singleSelectGradeRadio( schoolCode, stage );
		}
	});
	
}*/

/*function singleSelectGradeRadio( schoolCode, stage ){
	
	$('#school-grade-div').custom_ajax_radio({
		name:'grade',
		url: 'scoreManage/grades?schoolCode='+schoolCode+"&stage="+stage,
		valueField : 'code',
		textField : 'name',
		labelField : '年级',
		checkedField: 'selected',
		singleRow: 3,
		loadSuccess : function( data ){
			var grade = $("input[name='grade']:checked").val();
			singleSelectClassRadio( schoolCode, stage, grade );
		}
	});
	
}

function singleSelectClassRadio( schoolCode, stage, grade ){

	$('#school-class-div').custom_ajax_radio({
		name:'classId',
		url: 'scoreManage/classes?schoolCode='+schoolCode+"&stage="+stage+"&grade="+grade,
		valueField : 'id',
		textField : 'name',
		labelField : '班级',
		checkedField: 'selected',
		singleRow: 3,
		loadSuccess : function( data ){
			var classId = $("input[name='classId']:checked").val();
			singleSelectCourseCombobox( schoolCode, stage, grade, classId );
		}
	});
}

function singleSelectCourseCombobox( schoolCode, stage, grade, classId ){
	
	$('#courseCode').combobox({
		url : 'scoreManage/courses?schoolCode='+schoolCode+"&stage="+stage+"&grade="+grade+"&classId="+classId,
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		onLoadError: function(){
			$('#courseCode').combobox('loadData', data);
		},
		onSelect: function( data ){
		}
	});
	
}*/


