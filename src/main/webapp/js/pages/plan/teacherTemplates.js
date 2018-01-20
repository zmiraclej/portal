function initSelectData(data){
	data = $.parseJSON(data);
	var school = new Array();
	var stage = new Array();
	var grade = new Array();
	var course = new Array();
	$.each(data,function(k,v){
		var d = v;
		var param1 = {
				key:k,
				value:v[0].schoolName
		};
		school.push(param1);
		for(var i=0;i<d.length;i++){
			var di = d[i];
			if(di.stage&&di.stage!=='undefined'){
				var stageName = '';
				if(di.stage==1){
					stageName='小学';
				}else if(di.stage==2){
					stageName='中学';
				}else{
					stageName='高中';
				}
				
				var param2 = {
						key:di.stage,
						value:stageName
				};
				stage.push(param2);
			}
			if(di.grade){
				var param3 = {
						key:di.grade,
						value:di.grade+'年级'
				};
				grade.push(param3);
			}else{
				$('#grade_div').remove();
			}
			if(di.courseCode){
				var param4 = {
						key:di.courseCode,
						value:di.courseName
				};
				course.push(param4);
			}else{
				$('#course_div').remove();
			}
			
		}
	})
	for (var i = 0; i < school.length; i++) {
		var t = $('#_schoolCode option[value="'+school[i].key+'"]');
		if(t.length==0){
			$('#_schoolCode').append('<option value="'+school[i].key+'">'+school[i].value+'</option>');
		}
	}
	for (var i = 0; i < stage.length; i++) {
		var t = $('#_stage option[value="'+stage[i].key+'"]');
		if(t.length==0){
			$('#_stage').append('<option value="'+stage[i].key+'">'+stage[i].value+'</option>');
		}
	}
	for (var i = 0; i < grade.length; i++) {
		var t = $('#_grade option[value="'+grade[i].key+'"]');
		if(t.length==0){
			$('#_grade').append('<option value="'+grade[i].key+'">'+grade[i].value+'</option>');
		}
		}
	for (var i = 0; i < course.length; i++) {
		var t = $('#_course option[value="'+course[i].key+'"]');
		if(t.length==0){
			$('#_course').append('<option value="'+course[i].key+'">'+course[i].value+'</option>');
		}
	}
}
function getTParam(){
	return {
		pagination:"true",
		url:"pageTeacherTemplates",
		search:false,
		sidePagination:"server",
		height:500,
		striped:true,
		clickToSelect:true,
		singleSelect:true,
		toolbar:"#templatesToolbar",
		toolbarAlign:"right",
		queryParams: function queryParams(params){
			return { 
				limit : params.limit,
				offset : params.offset,
				sort : params.sort,
				order : params.order,
				type : $('#searchType').val() };
		},
		columns: [
			{
				field: 'id',
				sortable: false,
				editable: false,
				visible: false
			},{
				field: '',
				checkbox: true,
			},{
				field: 'year',
				title: '学年',
				sortable: false,
				align: 'center',
			},{
				field: 'termName',
				title: '学期',
				sortable: false,
				align: 'center',
			},{
				field: 'type',
				title: '类型',
				sortable: false,
				align: 'center',
				formatter:function(value, row, index){
					if(eduType.length>0){
						for(var i=0;i<eduType.length;i++){
							if(value==eduType[i].key){
								return eduType[i].value;
							}
						}
					}
					
				}
			},{
				field: 'schoolName',
				title: '学校名称',
				sortable: false,
				align: 'center',
			},{
				field: 'stage',
				title: '学校学部',
				sortable: false,
				align: 'center',
				formatter:function(value, row, index){
					if(value=='1'){
						return "小学";  
					}else if(value=='2'){
						return "初中";
					}else{
						return "高中";
					}
				}
			},{
				field: 'grade',
				title: '年级',
				sortable: false,
				align: 'center',
				formatter:function(value, row, index){
					if(value){
						return value+"年级";
					}else{
						return "-";
					}
				}
			},{
				field: 'courseName',
				title: '学科',
				sortable: false,
				align: 'center',
			},{
				field: 'createUserName',
				title: '创建人',
				sortable: false,
				align: 'center',
			},{
				field: 'status',
				title: '审核状态',
				sortable: false,
				align: 'center',
				formatter:function(value, row, index){
					if(value=='0'){
						return "已提交";
					}else if(value=='1'){
						return "已审核";
					}else if(value=='2'){
						return "已驳回";
					}else{
						return "未提交";
					}
				}
			},{
				field: 'socre',
				title: '评分',
				sortable: false,
				align: 'center',
			},{
				field: 'url',
				title: '下载',
				sortable: false,
				align: 'center',
				formatter:function(value, row, index){
					if(value){
						return "<a href='http://iportal.jxfls.com:8000/wtrj/plan/save/"+value+"' download='"+value+"'>"+value+"</a>";  
					}else{
						return "--";
					}
				}
			}
			],
	}
}
$('#templatesTable').bootstrapTable(getTParam());

//新增计划
$('#addTemplate').on('click',function(){
	//清空文件信息
	resetForm();
	var index = layer.open({
		type: 1,
		title: '新增计划',
		area: ['450px', '550px'],
		shadeClose: false, //点击遮罩关闭
		maxmin: false,
		content: $('#templateAddContent')
	});
});

//删除模板
$('#delTemplate').on('click',function(){
	var rows = $('#templatesTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("请选择一条记录");
		return false;
	}
	if(rows[0].status!="-1"){
		layer.alert('已提交的记录不能删除');
		return;
	}
	var id = rows[0].id;
	layer.msg('是否要删除选该记录？', {
		time: 15000, //15s后自动关闭
		area: ['300px', '100px'],
		btn: ['确  认', '取  消'],
		yes: function(){
			layer.closeAll();
			$.ajax({
				url: "deleteTeacherPlanTemplates",
				type: "GET",
				dataType:"json",
				data:{id:id},
				success: function(result) {
					if('02'==result.code){
						$('#templatesTable').bootstrapTable('refresh');
						layer.msg('删除成功', {
							time: 1000, //2s后自动关闭
							area: ['220px', '50px']
						});
					} else {
						layer.msg('删除失败', {
							time: 1000, //2s后自动关闭
							area: ['220px', '50px']
						});
					}
//					layer.closeAll();
				}
			});

		}
	,btn2: function(){
		layer.closeAll();
	}
	});

});

layui.use(['form','upload'], function(){
	
	var form = layui.form();

	//表单初始化
	form.render();
	//自定义验证规则
	form.verify({
		fileUrl: function(value){
			if(value.length < 1){
				return '请上传计划文件';
			}
		}
	});
	//文件上传初始化
	layui.upload({
		elem: '#fileExcel',
		url: 'planUpload/fileUpload',
		//exts: 'xlsx|xls|txt', //只允许上传excel
		accept: 'file',
		success: function(res){
			if(res.code=="0"){
				layer.msg(res.msg);
				$('#successFileShow').html(res.data[0]);
				$('#_url').val(res.data[1]);
			}else{
				layer.msg("计划上传失败");
				resetForm();
			}
		}
	});
	//submit事件绑定
	form.on('submit(formDemo)', function(data){
		var jsonParam = JSON.stringify(data.field);
		jsonParam = $.parseJSON(jsonParam);
		var termName = $("#_term").find("option:selected").text();
		var courseName = $("#_course").find("option:selected").text();
		var schoolName = $("#_schoolCode").find("option:selected").text();
		
		if(jsonParam.course == '-1'){
			layer.msg("课程不能为空");
			return;
		}
		
		if(jsonParam.type == '-1'){
			layer.msg("类型不能为空");
			return;
		}
		
		if(jsonParam.grade == '-1'){
			layer.msg("年级不能为空");
			return;
		}
		
		if(termName){
			jsonParam['termName'] = termName;
		}
		if(courseName){
			jsonParam['courseName'] = courseName;
		}
		if(schoolName){
			jsonParam['schoolName'] = schoolName;
		}
		jsonParam = JSON.stringify(jsonParam);
		$.ajax({
			type : "POST",
			url : "saveTeacherPlanTemplates",
			contentType: "application/json", 
			dataType : "json",
			data:jsonParam,
			success : function(data) {
				if(data.code=="02"){
					//清空文件信息
					resetForm();
					layer.closeAll();
					$('#templatesTable').bootstrapTable('refresh', getTParam());
					layer.alert(data.msg);
				}else{
					//清空文件信息
					resetForm();
					layer.alert(data.msg);
				}
			}
		});
		return false;
	});
	
	form.on('select(test)', function(data){
		findGrades(data.value);
		
		findRoles( data.value );
	});
	
	form.on('select(grade)', function(data){
		
		var schoolCode = $('#_schoolCode').val();
		var stage = $('#stage').val();
		findCourses(schoolCode, data.value, stage);
	});
	
	//submit事件绑定
	form.on('submit(formDemo2)', function(data){
		var jsonParam = JSON.stringify(data.field);
		jsonParam = $.parseJSON(jsonParam);
		var termName = $("#_term").find("option:selected").text();
		var courseName = $("#_course").find("option:selected").text();
		var schoolName = $("#_schoolCode").find("option:selected").text();
		
		if(jsonParam.course == '-1'){
			layer.msg("课程不能为空");
			return;
		}
		
		if(jsonParam.grade == '-1'){
			layer.msg("年级不能为空");
			return;
		}
		
		if(termName){
			jsonParam['termName'] = termName;
		}
		if(courseName){
			jsonParam['courseName'] = courseName;
		}
		if(schoolName){
			jsonParam['schoolName'] = schoolName;
		}
		jsonParam = JSON.stringify(jsonParam);
		$.ajax({
			type : "POST",
			url : "saveTeacherPlanTemplates",
			contentType: "application/json", 
			dataType : "json",
			data:jsonParam,
			success : function(data) {
				if(data.code=="02"){
					//清空文件信息
					resetForm();
					layer.closeAll();
					$('#templatesTable').bootstrapTable('refresh', getTParam());
					layer.alert(data.msg);
				}else{
					//清空文件信息
					resetForm();
					layer.alert(data.msg);
				}
			}
		});
		return false;
	});
	
	function findRoles( schoolCode ){
		
		$.ajax({
			type : "POST",
			url : "template/findRoles?schoolCode="+schoolCode,
			contentType: "application/json", 
			dataType : "json",
			success : function(data) {
				
				if(data!= null && data.length >0){
					//console.log(data);
					$('#_type').empty();
					
					var html = '';
					
					for(i=0; i<data.length; i++){
						html += '<option value="'+data[i].key+'">'+data[i].value+'</option>';
					}
					
					$('#_type').html( html );
					form.render('select', '_type');
				}
				else{
					var html = '<option value="-1">-- 空 --</option>';
					$('#_type').html( html );
					form.render('select', '_type');
				}
				
			}
		});
	}
	
	function findGrades( schoolCode ){
		
		$.ajax({
			type : "POST",
			url : "template/findGrades?schoolCode="+schoolCode,
			contentType: "application/json", 
			dataType : "json",
			success : function(data) {
				
				if(data!= null && data.length >0){
					//console.log(data);
					$('#_grade').empty();
					
					var stage = '1';
					var grade = "1";
					var html = '';
					
					for(i=0; i<data.length; i++){
						var stageText = "小学";
						if(data[i].stage == '2'){
							stageText = "初中";
						}
						if(data[i].stage == '3'){
							stageText = "高中";
						}
						
						html += '<option stage="'+data[i].stage+'" value="'+data[i].grade+'">'+stageText+' '+data[i].grade+'年级</option>';
						
						if(i==0){
							
							stage = data[i].stage;
							grade = data[i].grade;
						}
					}
					
					$('#_grade').html( html );
					form.render('select', '_grade');
					
					var text = '';
					if(stage == '1'){
						 text = '小学';
					}
					
					if(stage == '2'){
						 text = '初中';
					}
					
					if(stage == '3'){
						 text = '高中';
					}
					
					$('#stageText').empty();
					text += '<input id="stage" name="stage" type="hidden" value="'+stage+'">';
					$('#stageText').html( text );
					//$('#stage').val( stage );
					
					findCourses( schoolCode, grade , stage );
					
				}
				else{
					var html = '<option value="-1">-- 空 --</option>';
					$('#_grade').html( html );
					form.render('select', '_grade');
					
					$('#_course').html( html );
					form.render('select', '_course');
					
				}
				
			}
		});
		
	}
	
	function findCourses( schoolCode, grade , stage ){
		
		//console.log("ccc : " + schoolCode + " - " + grade + " - " +stage);
		
		if(schoolCode == undefined || grade == undefined || grade == undefined){
			$('#_course').empty();
			var html = '<option value="-1">-- 空 --</option>';
			$('#_course').html( html );
			form.render('select', '_course');
		}
		
		$.ajax({
			type : "POST",
			url : "template/findCourses?schoolCode="+schoolCode+"&grade="+grade+"&stage="+stage,
			contentType: "application/json", 
			dataType : "json",
			success : function(data) {
				
				//console.log("dddd : " + data);
				
				if(data!= null && data.length >0){
					//console.log(data);
					$('#_course').empty();
					
					var html = '';
					
					for(i=0; i<data.length; i++){
						html += '<option value="'+data[i].courseCode+'">'+data[i].courseName+'</option>';
					}
					
					$('#_course').html( html );
					form.render('select', '_course');
				}
				else{
					var html = '<option value="-1">-- 空 --</option>';
					$('#_course').html( html );
					form.render('select', '_course');
				}
				
			}
		});
		
	}
	
});
