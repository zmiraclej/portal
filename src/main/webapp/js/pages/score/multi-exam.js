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

	var schoolTermCode = $("#school-term").combobox('getValue');
	var schoolTermText = $("#school-term").combobox('getText');
	$('#schoolTermCode').val(schoolTermCode);
	$('#schoolTermText').val(schoolTermText);

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
	var classText = $("#school-class").combobox('getText');
	
	
	
	/*$('#schoolYearCode').combobox({
		url : 'scoreManage/dicts?code=school-year',
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 'auto',
		editable:false,
		onSelect: function( data ){
		}
	});
	
	$('#school-term-div').custom_ajax_radio({
		name:'schoolTermCode',
		url:'scoreManage/dicts?code=school-term',
		valueField : 'code',
		textField : 'name',
		labelField : '学期',
		checkedField: 'selected',
		singleRow: 3,
		loadSuccess : function( data ){
		}
	});

	
	
	$('#school-code-div').custom_ajax_radio({
		name:'schoolCode',
		url:'scoreManage/schools',
		valueField : 'schoolCode',
		textField : 'schoolName',
		labelField : '学校',
		checkedField: 'selected',
		singleRow: 3,
		loadSuccess : function( data ){
			var schoolCode = $("input[name='schoolCode']:checked").val();
			selectStageRadio( schoolCode )
			
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
			 $('#examInsName').textbox('setValue', name);
		}
	});

	//确认发布范围
	isBzrForCreateExam(schoolCode, stage, grade, classId);
	
	$("input[name='visibleState']").change(function(){
		var val = $("input[name='visibleState']:checked").val();
		if(val == 0){
			$("#classVisibleStateNameLabel").text('');
		}
		else{
			$("#classVisibleStateNameLabel").text( $("#school-class").combobox('getText') );
		}
		
	});
	
	/*$("input[name='schoolCode']").change(function(){
		var schoolCode = $("input[name='schoolCode']:checked").val();
		selectStageRadio( schoolCode );
		
	});
	
	$("input[name='stage']").change(function(){
		var schoolCode = $("input[name='schoolCode']:checked").val();
		var stage = $("input[name='stage']:checked").val();
		selectGradeRadio( schoolCode, stage );
		
	});*/
	
});

function isBzrForCreateExam(schoolCode, stage, grade, classId){
	
	$("#gradeVisibleState").hide();
	$("#gradeVisibleStateLabel").hide();
	
	$("#classVisibleState").hide();
	$("#classVisibleStateLabel").hide();
	
	$.ajax({
		url : "scoreManage/isBzr?schoolCode="+schoolCode+"&stage="+stage+"&grade="+grade+"&classId="+classId,
        async: false,
		success : function(result) {
			if(result == true){
				
				$("#gradeVisibleState").show();
				$("#gradeVisibleStateLabel").show();
				$("#classVisibleState").show();
				$("#classVisibleStateLabel").show();
				$("#classVisibleState").attr('checked','checked');
				
				var className = $("#school-class").combobox('getText');
				
				//console.log('className = ' + className);
				
				$("#classVisibleStateNameLabel").text( className );
			}
			else{
				$("#classVisibleState").hide();
				$("#classVisibleStateLabel").hide();
				$("#classVisibleStateNameLabel").text('');
				isCreateGradeForCreateExam(schoolCode, stage, grade);
			}
		}
	});
}

function isCreateGradeForCreateExam(schoolCode, stage, grade){
	$.ajax({
		url : "scoreManage/isCreateGrade?schoolCode="+schoolCode+"&stage="+stage+"&grade="+grade,
        async: false,
		success : function(result) {
			if(result == true){
				$("#gradeVisibleState").show();
				$("#gradeVisibleStateLabel").show();
				$("#gradeVisibleState").attr('checked','checked');
			}
			else{
				$("#gradeVisibleState").hide();
				$("#gradeVisibleStateLabel").hide();
				$("#gradeVisibleState").attr('checked','');
			}
		}
	});
}

/*function selectStageRadio( schoolCode ){

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
			selectGradeRadio( schoolCode, stage );
		}
	});
	
}

function selectGradeRadio( schoolCode, stage ){
	
	$('#school-grade-div').custom_ajax_radio({
		name:'grade',
		url: 'scoreManage/grades?schoolCode='+schoolCode+"&stage="+stage,
		valueField : 'code',
		textField : 'name',
		labelField : '年级',
		checkedField: 'selected',
		singleRow: 3,
		loadSuccess : function( data ){
		}
	});
	
}*/

