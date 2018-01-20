
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
			}
			if(di.courseCode&&di.courseCode!=='undefined'){
				var param4 = {
						key:di.courseCode,
						value:di.courseName
				};
				course.push(param4);
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
		url:"pageTemplates",
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
			}, 
			{
				field: '',
				checkbox: true,
			}, 
			{
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
				title: '计划类型',
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

//新增模板
$('#addTemplate').on('click',function(){
	//清空文件信息
	resetForm();
	var index = layer.open({
		type: 1,
		title: '新增模板',
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
	var id = rows[0].id;
	layer.msg('是否要删除选该记录？', {
		time: 15000, //15s后自动关闭
		area: ['300px', '100px'],
		btn: ['确  认', '取  消'],
		yes: function(){
			layer.closeAll();
			$.ajax({
				url: "deletePlanTemplates",
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
	var $ = layui.jquery;
	
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
				layer.msg("模板上传失败");
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
			url : "savePlanTemplates",
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
});
