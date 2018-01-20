$.ajax({
	type : "POST",
	url : "searchUsers",
	dataType : "json",
	
	success : function(result) {
		$('#tree').treeview({data: result.data,
			 onNodeSelected: function(event, data) {
				    // Your logic goes here
				 console.log(data);
			 }
		});
	}
});

$('#usersTable').bootstrapTable({
       pagination:"true",
       url:"searchUsers",
       search:true,
       sidePagination:"server",
       height:500,
	   striped:true,
	   clickToSelect:true,
	   singleSelect:true,
	   toolbar:"#usersToolbar",
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
                title: '用户名',
                sortable: false,
                align: 'center',
            }, 
            {
                field: 'password',
                title: '密码',
                sortable: false,
                align: 'center',
                formatter:function(value, row, index){
                	return '........';
                }
            },
            /*{
                field: 'employeeNumber',
                title: '员工号',
                sortable: false,
                align: 'center',
            },{
                field: 'employeeName',
                title: '员工姓名',
                sortable: false,
                align: 'center',
            },*/
            {
                field: 'mobile',
                title: '手机号',
                sortable: false,
                align: 'center',
            }
        ],
        onClickRow: function (row, $element, field) { 
            $('#rolesTable').bootstrapTable('refresh',{'query':{'userId':row.id}});
        },
});


$('#rolesTable').bootstrapTable({
	pagination:"true",
    url:"searchUserRoles",
    search:true,
    sidePagination:"server",
    height:500,
    striped:true,
    clickToSelect:true,
    singleSelect:false,
    toolbar:"#rolesToolbar",
    toolbarAlign:"right",
    columns: [
		     {
		         field: 'id',
		         sortable: false,
		         editable: false,
		         visible: false
		     }, 
            {
                field: 'name',
                title: '角色名称',
                sortable: false,
                align: 'center',
            }, 
            {
                field: 'own',
                title: '',
                width:100,
                sortable: false,
                align: 'center',
                checkbox:true
            }
        ],
        onPageChange:function(number,size){
        	var rows = $('#usersTable').bootstrapTable("getAllSelections");
        	$('#rolesTable').bootstrapTable('refresh',{'query':{'userId':rows[0].id}});
        }
});

$('#addUser').on('click',function(){
	var index = layer.open({
 		  type: 1,
 		  title: '新增用户',
 		  area: ['450px', '350px'],
 		  shadeClose: false, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#userAddContent')
		});
});

$('#editUser').on('click',function(){
	var rows = $('#usersTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("未选择用户");
		return false;
	}
	var userId = rows[0].id;
	var userName = rows[0].name;
	var tel = rows[0].mobile;
	var password = rows[0].password;
	
	$('#editUserId').val(userId);
	$('#editUserName').val(userName);
	$('#editTel').val(tel);
	$('#editPassword').val(password);
	$('#editPasswordConfirm').val(password);
	
	var index = layer.open({
 		  type: 1,
 		  title: '编辑用户',
 		  area: ['450px', '350px'],
 		  shadeClose: true, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#userEditContent')
		});
});

//编辑框取消按钮
$("#cancel").on('click',function(){
	layer.closeAll();
});

// 删除用户
$('#deleteUser').on('click',function(){
	var rows = $('#usersTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("未选择用户");
		return false;
	}
	var userId = rows[0].id;
	var userName = rows[0].name;
	var param = {'userId':userId};
	layer.msg('是否要删除选中用户【' + userName + '】？', {
	    time: 15000, //15s后自动关闭
	    area: ['300px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "deleteUser",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(param),
	             success: function(result) {
	                 console.log();
	                 if('02'==result.code){
	                	 $('#usersTable').bootstrapTable('refresh');
	                     layer.msg('用户删除成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     layer.msg('用户删除失败', {
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
//    toolbar:"#employeeBindToolbar",
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

$('#bindEmployee').on('click',function(){
	var rows = $('#usersTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("未选择用户");
		return false;
	}
	var userId = rows[0].id;
	var userName = rows[0].name;
	var employeeName = rows[0].employeeName;
	console.log(employeeName);
	if(employeeName != null && employeeName != ''){
		$('#bindingEmployee').html("已绑定员工："+ employeeName);
	} else {
		$('#bindingEmployee').html("暂未绑定员工");
	}
	
	$('#employeeBindTable').bootstrapTable('refresh',{'query':{'url':'searchEmployee'}});
	layer.open({
 		  type: 1,
 		  title: '员工绑定',
 		  area: ['700px', '600px'],
 		  shadeClose: true, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#bindEmployeeContent')
		});
	
});

// 绑定员工
$('#updBindEmployee').on('click',function(){
	var userRows = $('#usersTable').bootstrapTable("getAllSelections");
	if(userRows.length==0){
		_msg("未选择用户");
		return false;
	}
	var userId = userRows[0].id;
	var userName = userRows[0].name;
	
	var rows = $('#employeeBindTable').bootstrapTable("getAllSelections");
	var employeeId = rows[0].id;
	var employeeName = rows[0].name;
	
	var param = {};
	param['userId'] = userId;
	param['employeeId'] = employeeId;
	
	layer.msg('是否要将员工【' + employeeName + '】绑定到用户【'+userName+'】？', {
	    time: 15000, //15s后自动关闭
	    area: ['400px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "updBindEmployee",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(param),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#usersTable').bootstrapTable('refresh');
	                     layer.msg('用户绑定员工成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     layer.msg('用户绑定员工失败', {
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

// 解除绑定
$('#deleteBindEmployee').on('click',function(){
	var userRows = $('#usersTable').bootstrapTable("getAllSelections");
	if(userRows.length==0){
		_msg("未选择用户");
		return false;
	}
	var userId = userRows[0].id;
	var userName = userRows[0].name;
	var employeeName = userRows[0].employeeName;
	
	var param = {};
	param['userId'] = userId;
	
	layer.msg('是否要将用户【'+userName+'】的员工绑定解除？', {
	    time: 15000, //15s后自动关闭
	    area: ['400px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "deleteBindEmployee",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(param),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#usersTable').bootstrapTable('refresh');
	                     layer.msg('用户解除绑定员工成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     layer.msg('用户解除绑定员工失败', {
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


$('#quitBind').on('click',function(){
	layer.closeAll();
	
});

layui.use(['form'], function(){
	  var form = layui.form();
	  
	  //自定义验证规则
	  form.verify({
	    userName: function(value){
	      if(value.length < 1){
	        return '用户名必须输入！';
	      }
	    }
	    ,tel: function(value){
		      if(value.length < 1){
			        return '手机号必须输入！';
			      }
			    }
		,pass: [/(.+){3,12}$/, '密码必须3到12位，且不能出现空格']
	    ,confirmPass:function(value){
	    	if($('#newPwd').val() !=$('#newPwdConfirm').val()){
	    		return '密码与确认密码必须保持一致！';
	    	}
	    }
	    ,content: function(value){
	      layedit.sync(editIndex);
	    }
	  });
	  
	  form.on('submit(formDemo)', function(data){
		    var jsonParam = JSON.stringify(data.field);
		    $.ajax({
		    	type : "POST",
		    	url : "saveNewUser",
		    	contentType: "application/json", 
		    	dataType : "json",
		    	data:jsonParam,
		    	success : function(result) {
		    		if('02' == result.code){
		    			$('#usersTable').bootstrapTable('refresh');
		    			layer.msg("保存成功！");
		    		} else {
		    			layer.msg(result.msg);
		    		}
		    		 
		    	}
		    });
		    return false;
		  });
	  
	  form.on('submit(editUser)', function(data){
		  var formData = data.field;
		  if(formData.password==formData.passwordVtype){
			  var jsonParam = JSON.stringify(formData);
			    $.ajax({
			    	type : "POST",
			    	url : "updateUser",
			    	contentType: "application/json", 
			    	dataType : "json",
			    	data:jsonParam,
			    	success : function(result) {
			    		if('02' == result.code){
			    			$('#usersTable').bootstrapTable('refresh');
			    			layer.msg("保存成功！");
			    		} else {
			    			layer.msg(result.msg);
			    		}
			    	}
			    });
		  }else{
			  layer.msg("输入的密码不一致");
			  return false;
		  }
		  });
	  
	});


$('#updateUserRoles').on('click',function(){
	var users = $('#usersTable').bootstrapTable("getAllSelections");
	if(users.length==0){
		_msg("未选择用户");
		return false;
	}
	
	var userId = users[0].id;
	var userName = users[0].name;
	
	var rows = $('#rolesTable').bootstrapTable("getAllSelections");
	var jsonParam = {};
	jsonParam['userId'] = userId;
	
	var roles = [];
	for (var i = 0 ; i <rows.length; i ++) {
		roles.push(rows[i].id);
	}
	
	jsonParam['roles'] = roles;
	
	layer.msg('是否要更新用户【' + userName + '】的角色信息？', {
	    time: 15000, //15s后自动关闭
	    area: ['300px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "updateUserRoles",
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(jsonParam),
	             success: function(result) {
	                 if('02'==result.code){
	                	 $('#rolesTable').bootstrapTable('refresh',{'query':{'userId':userId}});
	                     layer.msg('用户角色更新成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     layer.msg('用户删除失败', {
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




		