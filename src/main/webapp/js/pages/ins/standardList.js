function getTParam(){
	return {
		pagination:"true",
		url:"searchstandard",
		//search:true,
		sidePagination:"server",
		height:500,
		striped:true,
		clickToSelect:true,
		singleSelect:true,
		toolbar:"#insToolbar",
		toolbarAlign:"right",
		queryParams: function queryParams(params){
			return { 
				limit : params.limit,
				offset : params.offset,
				search : params.search,
				sort : params.sort,
				order : params.order };
		}, 
		columns: [
			{
				field: '',
				checkbox: true,
			},{
				field: 'code',
				title: '编号',
				editable: false,
				sortable: true,
				align: 'center',
			},{
				field: 'name',
				title: '名称',
				sortable: false,
				align: 'center',
				width : '20%',
				
			},{
				field: 'baseScore',
				title: '基准分',
				sortable: false,
				align: 'center',
			},{
				field: 'type',
				title: '加减分（最低-最高）',
				sortable: false,
				align: 'center',
				formatter:function(value,row,index){
					if(value=="01"){
						return "+("+row.insScoreMin+"~"+row.insScoreMax+")";
					}
					if(value=="02"){
						return "-("+row.insScoreMin+"~"+row.insScoreMax+")";
					}
				}
			},{
				field: 'blDelFlg',
				title: '是否可用',
				sortable: false,
				align: 'center',
				formatter:function(value,row,index){
					if(value==0){
						return "可用";
					}
					if(value==1){
						return "不可用";
					}
				}
			}
			],
	}
}

$('#standardTable').bootstrapTable(getTParam());





//删除操作
$('#deleteStandard').click(function(){
	
	var rows = $('#standardTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("请选择一条记录");
		return false;
	}
	var code = rows[0].code;
	layer.msg('是否要删除选该记录？', {
		time: 15000, //15s后自动关闭
		area: ['300px', '100px'],
		btn: ['确  认', '取  消'],
		yes: function(){
			layer.closeAll();
			$.ajax({
    			url : "deleteFlag?code="+code,
    			success : function(result) {
    				if('02'==result.code){
   	                	 $('#standardTable').bootstrapTable('refresh');
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
    			}
    		});

		}
	,btn2: function(){
		layer.closeAll();
	}
	});

});





//查看详情

$('#reviewStandard').on('click',function(){
	var rows = $('#standardTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		layer.alert('请选择一条记录');
		return;
	}
	var standardId = rows[0].code;
	var index = layer.open({
		type: 1,
		title: '详情',
		area: ['650px', '550px'],
		shadeClose: false,
		maxmin: false,
		content: $('#tatilContent')
	});
	getIns(standardId,1);
});

//编辑
$('#editStandard').on('click',function(){
	var rows = $('#standardTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		layer.alert('请选择一条记录');
		return;
	}
	var standardId = rows[0].code;
	var index = layer.open({
		type: 1,
		title: '编辑页面',
		area: ['650px', '550px'],
		shadeClose: false,
		maxmin: false,
		content: $('#editContent')
	});
	
	resetEdit();
	getIns(standardId,2);
	
});












$('#addStandard').on('click',function(){

	var index = layer.open({
		type: 1,
		title: '添加界面',
		area: ['750px', '550px'],
		shadeClose: false,
		maxmin: false,
		content: $('#addContent')
	});

});





