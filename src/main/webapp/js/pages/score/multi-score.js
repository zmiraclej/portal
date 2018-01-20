$(function(){
	
	var multiSchoolCode = $('#schoolCode').val();
	var multiStage = $('#stage').val();
	var multiGrade = $('#grade').val();
	var multiClassId = $('#classId').val();
	
	multiSelectCourseCombobox( multiSchoolCode, multiStage, multiGrade, multiClassId );
	
});

function multiSelectCourseCombobox( schoolCode, stage, grade, classId ){
	
	$('#courseCode').combobox({
		url : 'scoreManage/courses?schoolCode='+schoolCode+"&stage="+stage+"&grade="+grade+"&classId="+classId,
		method : 'get',
		valueField : 'code',
		textField : 'name',
		panelHeight : 400,
		editable:false,
		onLoadError: function(){
			$('#courseCode').combobox('loadData', data);
		},
		onSelect: function( data ){
		}
	});
	
}

$(function() {
    $("input[name='scoreSection']").click(function() {
    	var s = $("input[name='scoreSection']:checked").val();
    	if(s==1){
    		$("#666").hide();
    		$("#777").hide();
    	}else{
    		$("#666").show();
    		$("#777").show();
    	}
    	//alert(s);
    });
})
