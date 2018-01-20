function getTParam(){
	return {
		pagination:"true",
		url:"pageVerifyPlans",
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
				type : $('#searchType').val(),
				schoolCode : $('#searchSchoolCode').val(),
				schoolYear : $('#searchSchoolYear').val(),
				schoolTerm : $('#searchSchoolTerm').val(),
				course: $('#searchCourse').val(),
				grade: $('#searchGrade').val(),
				status: $('#searchStatus').val(),
				teacherName: $('#searchTeacherName').val()
				};
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
				field: 'createDate',
				title: '创建时间',
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
					}
					else{
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

//审核计划
$('#verifyTemplate').on('click',function(){
	//清空评分件信息
	resetForm();
	var rows = $('#templatesTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		layer.alert('请选择一条记录');
		return;
	}
	if(rows[0].status=="-1"){
		layer.alert('未提交的不能审核');
		return;
	}
	if(rows[0].status!="0"){
		layer.alert('该条记录已审核');
		return;
	}
	var tId = rows[0].id
	//获取计划模板信息
	getTeacherTemplate(tId);
	var index = layer.open({
		type: 1,
		title: '审核计划',
		area: ['450px', '550px'],
		shadeClose: false, //点击遮罩关闭
		maxmin: false,
		content: $('#templateAddContent')
	});
	
});

layui.use(['form'], function(){
	
	var form = layui.form();
	form.render();
	var $ = layui.jquery;
	
	//表单初始化
	//submit事件绑定
	form.on('submit(formDemo)', function(data){
		var jsonParam = JSON.stringify(data.field);
		$.ajax({
			type : "POST",
			url : "verifyPlan",
			contentType: "application/json", 
			dataType : "json",
			data: jsonParam,
			success : function(data) {
				if(data.code=="02"){
					//清空评分信息
					resetForm();
					layer.closeAll();
					$('#templatesTable').bootstrapTable('refresh', getTParam());
					layer.alert(data.msg);
				}else{
					//清空评分信息
					resetForm();
					layer.alert(data.msg);
				}
			}
		});
		return false;
	});
});
