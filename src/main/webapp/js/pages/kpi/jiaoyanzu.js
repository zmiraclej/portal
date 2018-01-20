$.ajax({
     url: "searchSchoolInfo",
     type: "POST",
     contentType: "application/json",
     dataType:"json",
     success: function(result) {
         if('02'==result.code){
        	 $("#addSchoolSelect").empty();
        	 
        	 var values = result.data;
        	 for(var i = 0; i < values.length; i ++){
        		 $("#addSchoolSelect").append("<option  value=" + values[i].schoolCode + ">" + values[i].schoolName + "</option>");
        	 }
        	 
         } else {
         }
     }
 });

$('#jiaoyanzuTable').bootstrapTable({
    pagination:"true",
    url:"searchJiaoyanzu",
    search:true,
    sidePagination:"server",
    height:500,
	   striped:true,
	   clickToSelect:true,
	   singleSelect:true,
	   toolbar:"#jiaoyanzuToolbar",
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
	         field: 'jiaoyanzuCode',
	         title: '教研组编码',
	         sortable: false,
	         align: 'center',
	     }, 
         {
        	 field: 'jiaoyanzuName',
             title: '教研组名',
             sortable: false,
             align: 'center',
         },
         {
             field: 'employeeName',
             title: '教研组长',
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
         $('#jiaoyanzuMemberTable').bootstrapTable('refresh',{'query':{'jiaoyanzuCode':row.jiaoyanzuCode}});
     },
});

$('#jiaoyanzuMemberTable').bootstrapTable({
	pagination:"true",
	url:"searchJiaoyanzuMembers",
	search:true,
    sidePagination:"server",
    height:500,
    striped:true,
    clickToSelect:true,
    singleSelect:false,
    toolbar:"#jiaoyanzuMemberToolbar",
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

//教研组成员查询参数设置
function getMemberQueryParam(params) {
	var rows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	if(rows.length== 1){
		params['jiaoyanzuCode'] = rows[0].jiaoyanzuCode;
	}
	return params;
}

// 教研组成员新增参数设置
function getMemberBindQueryParam(params) {
	var rows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	if(rows.length== 1){
		params['schoolCode'] = rows[0].schoolCode;
	}
	return params;
}

// 教研组成员新增选择
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

// 添加教研组成员
$('#addjiaoyanzuMemberBtn').on('click',function(){
	var rows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择教研组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var jiaoyanzuName = rows[0].jiaoyanzuName;
	
	$('#memberBindTable').bootstrapTable('refresh',{'query':{'schoolCode':schoolCode}});
	var index = layer.open({
 		  type: 1,
 		  title: '新增教研组成员',
 		  area: ['700px', '500px'],
 		  shadeClose: false, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#bindjiaoyanzuMemberContent')
		});
});

// 保存教研组新增成员
$('#addBindjiaoyanzuMemberBtn').on('click',function(){
	var rows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择教研组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var jiaoyanzuName = rows[0].jiaoyanzuName;
	var jiaoyanzuCode = rows[0].jiaoyanzuCode;
	
	var memberRows = $('#memberBindTable').bootstrapTable("getAllSelections");
	if( memberRows.length == 0){
		_msg('暂未选择新增成员', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	
	var jsonParam = {};
	jsonParam['jiaoyanzuCode'] = jiaoyanzuCode;
	
	var p = [];
	for (var i = 0; i < memberRows.length; i ++) {
		p.push(memberRows[i].id);
	}
	
	jsonParam['members'] = p;
	
	layer.msg('是否要将员工【' + memberRows[0].name + '】等【'+memberRows.length+'】人添加到教研组【'+jiaoyanzuName+'】？', {
	    time: 15000, //15s后自动关闭
	    area: ['400px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "addBindJiaoyanzuMember",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(jsonParam),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#jiaoyanzuMemberTable').bootstrapTable('refresh',{'query':{'jiaoyanzuCode':jiaoyanzuCode}});
	                     _msg('教研组成员新增成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     _msg('教研组成员新增失败', {
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

//取消绑定教研组
$('#quitBind').on('click',function(){
	layer.closeAll();
});
// 删除教研组成员
$('#deletejiaoyanzuMemberBtn').on('click',function(){
	var rows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择教研组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var jiaoyanzuName = rows[0].jiaoyanzuName;
	var jiaoyanzuCode = rows[0].jiaoyanzuCode;
	
	var memberRows = $('#jiaoyanzuMemberTable').bootstrapTable("getAllSelections");
	if( memberRows.length == 0){
		_msg('请选择成员', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	
	var jsonParam = {};
	jsonParam['jiaoyanzuCode'] = jiaoyanzuCode;
	
	var p = [];
	for (var i = 0; i < memberRows.length; i ++) {
		p.push(memberRows[i].employeeId);
	}
	
	jsonParam['members'] = p;
	
	layer.msg('是否要将成员【' + memberRows[0].employeeName + '】等【'+memberRows.length+'】人从教研组【'+jiaoyanzuName+'】删除？', {
	    time: 15000, //15s后自动关闭
	    area: ['400px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "deleteJiaoyanzuMember",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(jsonParam),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#jiaoyanzuMemberTable').bootstrapTable('refresh',{'query':{'jiaoyanzuCode':jiaoyanzuCode}});
	                     _msg('教研组成员删除成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     _msg('教研组成员删除失败', {
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

// 新增教研组
$('#addjiaoyanzuBtn').on('click',function(){
	
	var index = layer.open({
 		  type: 1,
 		  title: '新增教研组',
 		  area: ['600px', '450px'],
 		  shadeClose: false, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#addForm')
		});
});

// 编辑教研组
$('#editjiaoyanzuBtn').on('click',function(){
	var rows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择教研组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var jiaoyanzuCode = rows[0].jiaoyanzuCode;
	var jiaoyanzuName = rows[0].jiaoyanzuName;
	
	$("#editSchoolName").val(rows[0].schoolName);
	$('#editCode').val(jiaoyanzuCode);
	$('#editName').val(jiaoyanzuName);
	
	var index = layer.open({
 		  type: 1,
 		  title: '编辑教研组',
 		  area: ['500px', '450px'],
 		  shadeClose: false, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#editForm')
		});
});

// 退出教研组编辑
$('#quitEditBtn').on('click',function(){
	layer.closeAll();
});


// 删除教研组
$('#deletejiaoyanzuBtn').on('click',function(){
	var rows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	if( rows.length == 0){
		_msg('请选择教研组', {
            time: 1000, //2s后自动关闭
            area: ['220px', '50px']
          });
		return;
	}
	// 获取学校编码
	var schoolCode = rows[0].schoolCode;
	var jiaoyanzuName = rows[0].jiaoyanzuName;
	var jiaoyanzuCode = rows[0].jiaoyanzuCode;
	
	var jsonParam = {};
	jsonParam['jiaoyanzuCode'] = jiaoyanzuCode;
	
	layer.msg('是否要将教研组【'+jiaoyanzuName+'】删除？', {
	    time: 15000, //15s后自动关闭
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "deleteJiaoyanzu",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(jsonParam),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#jiaoyanzuTable').bootstrapTable('refresh');
	                	 $('#jiaoyanzuMemberTable').bootstrapTable('refresh');
	                     _msg('教研组删除成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     _msg('教研组删除失败', {
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

layui.use('form', function(){
	  var form = layui.form(); //只有执行了这一步，部分表单元素才会修饰成功
	  
	  form.on('submit(saveNewJiaoyanzu)', function(data){
		    var jsonParam = JSON.stringify(data.field);
		    $.ajax({
		    	type : "POST",
		    	url : "addJiaoyanzu",
		    	contentType: "application/json", 
		    	dataType : "json",
		    	data:jsonParam,
		    	success : function(result) {
		    		if('02' == result.code){
		    			$('#jiaoyanzuTable').bootstrapTable('refresh');
		    			_msg("保存成功！");
		    		} else {
		    			_msg(result.msg);
		    		}
		    		 
		    	}
		    });
		    return false;
		  });
	  
	  form.on('submit(editJiaoyanzu)', function(data){
		    var jsonParam = {};
		    jsonParam['jiaoyanzuCode'] = data.field['jiaoyanzuCode'];
		    jsonParam['jiaoyanzuName'] = data.field['jiaoyanzuName'];
		    
		    layer.msg('是否要修改教研组信息？', {
			    time: 15000, //15s后自动关闭
			    area: ['400px', '100px'],
			    btn: ['确  认', '取  消'],
			    yes: function(){
			         $.ajax({
			             url: "updJiaoyanzu",
			             type: "POST",
			             contentType: "application/json",
			             dataType:"json",
			             data:JSON.stringify(jsonParam),
			             success: function(result) {
			                 if('02'==result.code){
			                	 $('#jiaoyanzuTable').bootstrapTable('refresh');
			                     _msg('修改教研组信息成功', {
			                            time: 1000, //2s后自动关闭
			                            area: ['220px', '50px']
			                          });
			                 } else {
			                     _msg('修改教研组信息失败', {
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
	  
$('#bindjiaoyanzuzhang').on('click',function(){
	var rows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	if(rows.length>0){
		var userName = rows[0].jiaoyanzuName;
		var employeeName = rows[0].employeeName;
		if(employeeName != null && employeeName != ''){
			$('#bindingjiaoyanzuzhang').html("已设置教研组长："+ employeeName);
		} else {
			$('#bindingjiaoyanzuzhang').html("暂未设置教研组长");
		}
		
		$('#employeeBindTable').bootstrapTable('refresh',{'query':{'url':'searchEmployee'}});
		layer.open({
	 		  type: 1,
	 		  title: '设置教研组长',
	 		  area: ['700px', '600px'],
	 		  shadeClose: true, //点击遮罩关闭
	 		  maxmin: false,
	 		  content: $('#bindjiaoyanzuzhangContent')
			});
	}else{
		_msg("未选择教研组");
	}
});

//绑定教研组长
$('#updBindjiaoyanzuzhang').on('click',function(){
	var jiaoyanzuRows = $('#jiaoyanzuTable').bootstrapTable("getAllSelections");
	var jiaoyanzuCode = jiaoyanzuRows[0].jiaoyanzuCode;
	var jiaoyanzuName = jiaoyanzuRows[0].jiaoyanzuName;
	
	var rows = $('#employeeBindTable').bootstrapTable("getAllSelections");
	if(rows.length>0){
		var employeeId = rows[0].id;
		var employeeName = rows[0].name;
		
		var param = {};
		param['jiaoyanzuCode'] = jiaoyanzuCode;
		param['employeeId'] = employeeId;
		layer.msg('是否要将员工【' + employeeName + '】设为教研组【'+jiaoyanzuName+'】组长？', {
			  time: 15000 //不自动关闭
			  ,btn: ['确  认', '取  消']
			  ,yes: function(index){
			    layer.closeAll();
			    $.ajax({
		             url: "updJiaoyanzuzhang",
		             type: "POST",
		             contentType: "application/json",
		             dataType:"json",
		             data:JSON.stringify(param),
		             success: function(result) {
		                 if('02'==result.code){
		                	 $('#jiaoyanzuTable').bootstrapTable('refresh');
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
			  },
			  btn2: function(){
			        layer.closeAll();
			      }
			});
	}else{
		_msg("未选择人员");
	}
	
});