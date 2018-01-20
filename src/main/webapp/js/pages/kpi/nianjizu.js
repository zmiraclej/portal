layui.use('form', function(){
	  var form = layui.form(); //只有执行了这一步，部分表单元素才会修饰成功
	  
	  form.on('submit(saveNewNianjizu)', function(data){
		    var jsonParam = JSON.stringify(data.field);
		    $.ajax({
		    	type : "POST",
		    	url : "addNianjizu",
		    	contentType: "application/json", 
		    	dataType : "json",
		    	data:jsonParam,
		    	success : function(result) {
		    		if('02' == result.code){
		    			$('#nianjizuTable').bootstrapTable('refresh');
		    			_msg("保存成功！");
		    		} else {
		    			_msg(result.msg);
		    		}
		    		 
		    	}
		    });
		    return false;
		  });
	  
	  form.on('submit(editNianjizu)', function(data){
		    var jsonParam = {};
		    jsonParam['nianjizuCode'] = data.field['nianjizuCode'];
		    jsonParam['nianjizuName'] = data.field['nianjizuName'];
		    
		    layer.msg('是否要修改年级组信息？', {
			    time: 15000, //15s后自动关闭
			    area: ['400px', '100px'],
			    btn: ['确  认', '取  消'],
			    yes: function(){
			         $.ajax({
			             url: "updNianjizu",
			             type: "POST",
			             contentType: "application/json",
			             dataType:"json",
			             data:JSON.stringify(jsonParam),
			             success: function(result) {
			                 if('02'==result.code){
			                	 $('#nianjizuTable').bootstrapTable('refresh');
			                     _msg('修改年级组信息成功', {
			                            time: 1000, //2s后自动关闭
			                            area: ['220px', '50px']
			                          });
			                 } else {
			                     _msg('修改年级组信息失败', {
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
		   return false;
	  });
});  


$.ajax({
     url: "searchSchoolInfo",
     type: "POST",
     contentType: "application/json",
     dataType:"json",
     success: function(result) {
         if('02'==result.code){
        	 $("#addSchoolSelect").empty();
        	 var content="";
        	 var values = result.data;
        	 for(var i = 0; i < values.length; i ++){
        		 content+='<option value='+values[i].schoolCode+'>'+values[i].schoolName+'</option>';
        		/* $("#addSchoolSelect").append("<option  value=" + values[i].schoolCode + ">" + values[i].schoolName + "</option>");*/
        	 }
        	 $("#addSchoolSelect").html(content);
         } else {
         }
     }
 });

$('#nianjizuTable').bootstrapTable({
    pagination:"true",
    url:"searchNianjizu",
    search:true,
    sidePagination:"server",
    height:500,
	   striped:true,
	   clickToSelect:true,
	   singleSelect:true,
	   toolbar:"#nianjizuToolbar",
	   toolbarAlign:"right",
	   columns: [
		    
		     {
		         field: 'schoolCode',
		         sortable: false,
		         editable: false,
		         visible: false
		     }, 
		     {
		         field: '',
		         checkbox: true,
		     }, 
         {
             field: 'schoolName',
             title: '学校名',
             sortable: false,
             align: 'center',
         }, 
         {
	         field: 'nianjizuCode',
	         title: '年级组编码',
	         sortable: false,
	         align: 'center',
	     }, 
         {
        	 field: 'nianjizuName',
             title: '年级组名',
             sortable: false,
             align: 'center',
         },
         {
             field: 'employeeName',
             title: '年级组长',
             sortable: false,
             align: 'center',
         },{
             field: 'memberNum',
             title: '组员数量',
             sortable: false,
             align: 'center',
         }
     ],
     onClickRow: function (row, $element, field) { 
         $('#nianjizuMemberTable').bootstrapTable('refresh',{'query':{'nianjizuCode':row.nianjizuCode}});
     },
});

$('#nianjizuMemberTable').bootstrapTable({
	pagination:"true",
	url:"searchNianjizuMembers",
	search:true,
    sidePagination:"server",
    height:500,
    striped:true,
    clickToSelect:true,
    singleSelect:false,
    toolbar:"#nianjizuMemberToolbar",
    toolbarAlign:"right",
    queryParams:"getMemberQueryParam",
    columns: [
		     {
		         field: 'employeeId',
		         sortable: false,
		         editable: false,
		         visible: false
		     }, 
		     {
		         field: '',
		         checkbox: true,
		     }, 
            {
                field: 'employeeNumber',
                title: '员工号',
                sortable: false,
                align: 'center'
            }, {
                field: 'employeeName',
                title: '员工姓名',
                sortable: false,
                align: 'center'
            }, {
                field: 'sex',
                title: '性别',
                sortable: false,
                align: 'center',
            }
        ],
});

// 年级组成员查询参数设置
function getMemberQueryParam(params) {
	var rows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	if(rows.length== 1){
		params['nianjizuCode'] = rows[0].nianjizuCode;
	}
	return params;
}

// 年级组成员新增参数设置
function getMemberBindQueryParam(params) {
	var rows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	if(rows.length== 1){
		params['schoolCode'] = rows[0].schoolCode;
	}
	return params;
}


// 年级组成员新增选择
$('#memberBindTable').bootstrapTable({
	pagination:"true",
	url:"searchEmployeeBySchoolCode",
	search:true,
    sidePagination:"server",
    height:400,
    striped:true,
    clickToSelect:true,
    singleSelect:false,
    toolbarAlign:"right",
    queryParams:"getMemberBindQueryParam",
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
                field: 'employeeNumber',
                title: '员工号',
                sortable: false,
                align: 'center'
            }, {
                field: 'name',
                title: '员工姓名',
                sortable: false,
                align: 'center'
            }, {
                field: 'sex',
                title: '性别',
                sortable: false,
                align: 'center',
            }
        ],
});

// 添加年级组成员
$('#addNianjizuMemberBtn').on('click',function(){
	var rows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择年级组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var nianjizuName = rows[0].nianjizuName;
	
	$('#memberBindTable').bootstrapTable('refresh',{'query':{'schoolCode':schoolCode}});
	var index = layer.open({
 		  type: 1,
 		  title: '新增年级组成员',
 		  area: ['700px', '500px'],
 		  shadeClose: false, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#bindNianjizuMemberContent')
		});
});

// 保存年级组新增成员
$('#addBindNianjizuMemberBtn').on('click',function(){
	var rows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择年级组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var nianjizuName = rows[0].nianjizuName;
	var nianjizuCode = rows[0].nianjizuCode;
	
	var memberRows = $('#memberBindTable').bootstrapTable("getAllSelections");
	if( memberRows.length == 0){
		_msg('暂未选择新增成员', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	
	var jsonParam = {};
	jsonParam['nianjizuCode'] = nianjizuCode;
	
	var p = [];
	for (var i = 0; i < memberRows.length; i ++) {
		p.push(memberRows[i].id);
	}
	
	jsonParam['members'] = p;
	
	layer.msg('是否要将员工【' + memberRows[0].name + '】等【'+memberRows.length+'】人添加到年级组【'+nianjizuName+'】？', {
	    time: 15000, //15s后自动关闭
	    area: ['400px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "addBindNianjizuMember",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(jsonParam),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#nianjizuMemberTable').bootstrapTable('refresh',{'query':{'nianjizuCode':nianjizuCode}});
	                     _msg('年级组成员新增成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     _msg('年级组成员新增失败', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 }
//	                         layer.closeAll();
	             }
	         });

	      }
	      ,btn2: function(){
	        layer.closeAll();
	      }
	  });
});

// 取消新增组员
$('#quitBindMemberBtn').on('click',function(){
	layer.closeAll();
});

//取消绑定年级组
$('#quitBind').on('click',function(){
	layer.closeAll();
});


// 删除年级组成员
$('#deleteNianjizuMemberBtn').on('click',function(){
	var rows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择年级组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var nianjizuName = rows[0].nianjizuName;
	var nianjizuCode = rows[0].nianjizuCode;
	
	var memberRows = $('#nianjizuMemberTable').bootstrapTable("getAllSelections");
	if( memberRows.length == 0){
		_msg('请选择成员', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	
	var jsonParam = {};
	jsonParam['nianjizuCode'] = nianjizuCode;
	
	var p = [];
	for (var i = 0; i < memberRows.length; i ++) {
		p.push(memberRows[i].employeeId);
	}
	
	jsonParam['members'] = p;
	
	layer.msg('是否要将成员【' + memberRows[0].employeeName + '】等【'+memberRows.length+'】人从年级组【'+nianjizuName+'】删除？', {
	    time: 15000, //15s后自动关闭
	    area: ['400px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "deleteNianjiazuMember",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(jsonParam),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#nianjizuMemberTable').bootstrapTable('refresh',{'query':{'nianjizuCode':nianjizuCode}});
	                     _msg('年级组成员删除成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     _msg('年级组成员删除失败', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 }
//	                         layer.closeAll();
	             }
	         });

	      }
	      ,btn2: function(){
	        layer.closeAll();
	      }
	  });
});

$('#employeeBindTable').bootstrapTable({
	pagination:"true",
	url:"searchEmployee",
	search:true,
    sidePagination:"server",
    height:400,
    striped:true,
    clickToSelect:true,
    singleSelect:true,
//    toolbar:"#",
    toolbarAlign:"right",
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
                field: 'name',
                title: '员工姓名',
                sortable: false,
                align: 'center'
            }, {
                field: 'employeeNumber',
                title: '员工号',
                sortable: false,
                align: 'center'
            },{
                field: 'sex',
                title: '性别',
                sortable: false,
                align: 'center',
            },{
                field: 'phone',
                title: '手机号',
                sortable: false,
                align: 'center',
            }
        ],
		onClickRow: function (row, $element, field) {
		    $('#bindingEmployee').html("当前选中用户："+row.name);
		},
});

// 新增年级组
$('#addNianjizuBtn').on('click',function(){
	
	var index = layer.open({
 		  type: 1,
 		  title: '新增年级组',
 		  area: ['500px', '300px'],
 		  shadeClose: false, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#addForm')
		});
});

// 编辑年级组
$('#editNianjizuBtn').on('click',function(){
	var rows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择年级组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var nianjizuCode = rows[0].nianjizuCode;
	var nianjizuName = rows[0].nianjizuName;
	
	$("#editSchoolName").val(rows[0].schoolName);
	
	$('#editCode').val(nianjizuCode);
	$('#editName').val(nianjizuName);
	
	var index = layer.open({
 		  type: 1,
 		  title: '编辑年级组',
 		  area: ['500px', '300px'],
 		  shadeClose: false, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#editForm')
		});
});

// 退出年级组编辑
$('#quitEditBtn').on('click',function(){
	layer.closeAll();
});


// 删除年级组
$('#deleteNianjizuBtn').on('click',function(){
	var rows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择年级组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var nianjizuName = rows[0].nianjizuName;
	var nianjizuCode = rows[0].nianjizuCode;
	
	var jsonParam = {};
	jsonParam['nianjizuCode'] = nianjizuCode;
	
	layer.msg('是否要将年级组【'+nianjizuName+'】删除？', {
	    time: 15000, //15s后自动关闭
	    area: ['400px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "deleteNianjiazu",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(jsonParam),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#nianjizuTable').bootstrapTable('refresh');
	                	 $('#nianjizuMemberTable').bootstrapTable('refresh');
	                     _msg('年级组删除成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     _msg('年级组删除失败', {
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
	  
$('#bindNianjizuzhang').on('click',function(){
	var rows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	if(rows.length>0){
		var userName = rows[0].nianjizuName;
		var employeeName = rows[0].employeeName;
		if(employeeName != null && employeeName != ''){
			$('#bindingNianjizuzhang').html("已设置年级组长："+ employeeName);
		} else {
			$('#bindingNianjizuzhang').html("暂未设置年级组长");
		}
		
		$('#employeeBindTable').bootstrapTable('refresh',{'query':{'url':'searchEmployee'}});
		layer.open({
	 		  type: 1,
	 		  title: '设置年级组长',
	 		  area: ['700px', '600px'],
	 		  shadeClose: true, //点击遮罩关闭
	 		  maxmin: false,
	 		  content: $('#bindNianjizuzhangContent')
			});
	}else{
		_msg("未选择年级组");
	}
});

//绑定年级组长
$('#updBindNianjizuzhang').on('click',function(){
	var nianjizuRows = $('#nianjizuTable').bootstrapTable("getAllSelections");
	var nianjizuCode = nianjizuRows[0].nianjizuCode;
	var nianjizuName = nianjizuRows[0].nianjizuName;
	
	var rows = $('#employeeBindTable').bootstrapTable("getAllSelections");
	if(rows.length>0){
		var employeeId = rows[0].id;
		var employeeName = rows[0].name;
		
		var param = {};
		param['nianjizuCode'] = nianjizuCode;
		param['employeeId'] = employeeId;
		
		layer.msg('是否要将员工【' + employeeName + '】设为年级组【'+nianjizuName+'】组长？', {
		    time: 15000, //15s后自动关闭
		    area: ['400px', '100px'],
		    btn: ['确  认', '取  消'],
		    yes: function(){
		         layer.closeAll();
		         $.ajax({
		             url: "updBindNianjizuZhang",
		             type: "POST",
		             contentType: "application/json",
		             dataType:"json",
		             data:JSON.stringify(param),
		             success: function(result) {
		                 if('02'==result.code){
		                	 $('#nianjizuTable').bootstrapTable('refresh');
		                     _msg('用户绑定员工成功', {
		                            time: 1000, //2s后自动关闭
		                            area: ['220px', '50px']
		                          });
		                 } else {
		                     _msg('用户绑定员工失败', {
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
	}else{
		_msg("未选择人员")
	}
});