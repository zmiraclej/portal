$.ajax({
	type : "POST",
	url : "searchTeachers",
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

$('#teachersTable').bootstrapTable({
       pagination:"true",
       url:"searchTeachers",
       search:true,
       sidePagination:"server",
       height:650,
	   striped:true,
	   clickToSelect:true,
	   singleSelect:true,
	   toolbar:"#teachersToolbar",
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
	                field: 'jobNumber',
	                title: '员工号',
	                sortable: false,
	                align: 'center'
	            },
            {
                field: 'name',
                title: '姓名',
                sortable: false,
                align: 'center'
            }, 
            {
                field: 'sex',
                title: '性别',
                sortable: false,
                align: 'center',
				formatter:function(value, row, index){
					if(value == '1'){
						return "男";
					}
					
					if(value == '0'){
						return "女";
					}
					
					return "-"
					
				}
            },
            {
                field: 'phone',
                title: '手机号',
                sortable: false,
                align: 'center',
            },
            {
                field: 'loginUserName',
                title: '关联登录账号',
                sortable: false,
                align: 'center',
            },
            {
                field: 'loginUserPhone',
                title: '关联登录手机号',
                sortable: false,
                align: 'center',
            }
            ,
            {
                field: 'wxAccount',
                title: '关联微信账号',
                sortable: false,
                align: 'center',
            },
            {
                field: 'wxMobile',
                title: '微信手机号',
                sortable: false,
                align: 'center',
            }
            ,
            {
                title: '操作',
                sortable: false,
                align: 'center',
				formatter:function(value, row, index){
					
					var url = '<button class="layui-btn layui-btn-primary layui-btn-small" onClick="showEditTables('+row.id+');">编辑</button>';
					url += '&nbsp;&nbsp; <button class="layui-btn layui-btn-primary layui-btn-small" onClick="showRoleTables('+row.id+');">编辑角色</button>';
					url += '&nbsp;&nbsp; <button class="layui-btn layui-btn-primary layui-btn-small" onClick="synWxAccount('+row.id+');">微信同步</button>';
					return url;
				}
            }
        ],
        onClickRow: function (row, $element, field) { 
           // $('#rolesTable').bootstrapTable('refresh',{'query':{'userId':row.id}});
        },
        queryParams: function queryParams(params){
			return { 
				limit : params.limit,
				offset : params.offset,
				sort : params.sort,
				order : params.order,
				search : params.search };
		}
});

function showRoleTables( teacherId ){
	
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '教师角色管理'
        ,area: ['1000px', '800px']
        ,maxmin: false
        ,content: 'toFindTeacherRoles?teacherId='+teacherId
        ,btn: ['关闭'] //只是为了演示
        ,yes: function(index, layero){
        	layer.closeAll();
        }
      });
	
}



function selectSchool( teacherId ){

	layer.open({
        type: 2 //此处以iframe举例
        ,title: '选择学校'
        ,area: ['390px', '260px']
        ,maxmin: false
        ,content: 'findSelectionSchools?teacherId='+teacherId
        ,btn: ['确认', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	//当点击‘确定’按钮的时候，获取弹出层返回的值
            var selectedSchool = window["layui-layer-iframe" + index].callbackdata();
            //打印返回的值，看是否有我们想返回的值。
            if(selectedSchool){
            	layer.closeAll();
            	//console.log(selectedSchool);
            	var schoolCode = selectedSchool['schoolCode'];
            	var schoolName = selectedSchool['schoolName'];
            	//alert(selectedSchool['schoolCode']);
            	editSchoolPermission( teacherId, schoolCode, schoolName);
            }
        	
        }
        ,btn2: function(index, layero){
          layer.closeAll();
        }
        
      });
	
}

function editSchoolPermission(teacherId, schoolCode, schoolName){
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '编辑信息'
        ,area: ['700px', '650px']
        ,maxmin: false
        ,content: 'toSchoolsPermission?teacherId='+teacherId+'&schoolCode='+schoolCode
        ,btn: ['确认', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	//当点击‘确定’按钮的时候，获取弹出层返回的值
            //var selectedSchool = window["layui-layer-iframe" + index].callbackdata();
            //打印返回的值，看是否有我们想返回的值。
           
        	
        }
        ,btn2: function(index, layero){
          layer.closeAll();
        }
        
      });
}


$('#addTeacher').on('click',function(){
	
	var index = layer.open({
 		  type: 1,
 		  title: '新增教师',
 		  area: ['450px', '450px'],
 		  shadeClose: false, //点击遮罩关闭
 		  maxmin: false,
 		  content: $('#teacherAddContent')
		});
});


function showEditTables( teacherId ){
	
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '编辑教师信息'
        ,area: ['600px', '400px']
        ,maxmin: false
        ,content: 'toEditTeacher?teacherId='+teacherId
        ,btn: ['保存', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	//当点击‘确定’按钮的时候，获取弹出层返回的值
            var selectedSchool = window["layui-layer-iframe" + index].callbackdata();
            //打印返回的值，看是否有我们想返回的值。
            if(selectedSchool){
            	//console.log(selectedSchool);
            	//layer.closeAll();
            	//console.log(selectedSchool);
            	//var schoolCode = selectedSchool['schoolCode'];
            	//var schoolName = selectedSchool['schoolName'];
            	//alert(selectedSchool['schoolCode']);
            	//editSchoolPermission( teacherId, schoolCode, schoolName);
            	
            	$.ajax({
    		    	type : "POST",
    		    	url : "saveEditTeacher",
    		    	contentType: "application/json", 
	   	             dataType:"json",
	   	             data:JSON.stringify(selectedSchool),
    		    	success : function(result) {
    		    		if('02' == result.code){
    		    			$('#teachersTable').bootstrapTable('refresh');
    		    			layer.msg("保存成功！");
    		    			layer.close(index);
    		    		} else {
    		    			layer.msg(result.msg);
    		    		}
    		    		 
    		    	}
    		    });
            	
            }
        	
        }
        ,btn2: function(index, layero){
          layer.closeAll();
        }
        
      });
	
}

function synWxAccount( teacherId ){
	layer.confirm('是否同步微信账户信息？', {
		  btn: ['是','否'] //按钮
		}, function(){
			layer.load();
			$.ajax({
		    	type : "POST",
		    	url : "synWxAccount",
		    	contentType: "application/json", 
   	             dataType:"json",
   	             data:JSON.stringify(teacherId),
		    	success : function(result) {
		    		layer.closeAll('loading');
		    		if('02' == result.code){
		    			$('#teachersTable').bootstrapTable('refresh');
		    			layer.msg("同步微信账户成功！");
		    			
		    		} else {
		    			layer.msg(result.msg);
		    		}
		    		
		    		
		    		 
		    	}
		    });
		}, function(){
			 layer.closeAll();
		});
}

$('#editUser').on('click',function(){
	var rows = $('#usersTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("未选择用户");
		return false;
	}
	var userId = rows[0].id;
	var userName = rows[0].name;
	var tel = rows[0].tel;
	var password = rows[0].password;
	
	$.ajax({
		type : "POST",
		url : "findSchools",
		async :false,
		dataType : "json",
		success : function(result) {
			var html = '';
			if(result!= null && result.length > 0){
				for(i=0;i<result.length;i++){
					
					$("[name=schools.code]").each(function(){
						if($(this).attr('value') == result.code){
							$(this).attr('checked', 'checked');
						}
					});
					
				}
				
			}
		}
	});
	
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

$('#quitBind').on('click',function(){
	layer.closeAll();
	
});

layui.use(['form'], function(){
	  var form = layui.form();
	  
	  //自定义验证规则
	  form.verify({
	    name: function(value){
	      if(value.length < 1){
	        return '用户名必须输入！';
	      }
	    }
	    ,phone: function(value){
		      if(value.length < 1){
			        return '手机号必须输入！';
			      }
			    }
		,jobNumber: function(value){
		      if(value.length < 1){
			        return '员工号必须输入！';
			      }
			    }
	    ,content: function(value){
	      layedit.sync(editIndex);
	    }
	  });
	  
	  form.on('submit(formDemo)', function(data){
		   
		    
		    var schools = new Array();
		    
		    $("[name=schoolCode]:checked").each(function(item, index){
		    	schools.push({
		    		'code':$(this).attr('value'),
		    		'name':$(this).attr('title'),
		    	});
			});
		    //console.log(schools);
		    if(schools.length == 0){
		    	layer.msg('至少选择一个学校', {
                    time: 1500, //2s后自动关闭
                    area: ['220px', '50px']
                  });
		    	return;
		    }
		    
		    /* //console.log(jsonParam);
		    jsonParam.schools = schools;*/
		    data.field["schools"] = schools;
		    var jsonParam = JSON.stringify(data.field);
		   // console.log(jsonParam);
		    $.ajax({
		    	type : "POST",
		    	url : "saveNewTeacher",
		    	contentType: "application/json", 
		    	dataType : "json",
		    	data:jsonParam,
		    	success : function(result) {
		    		if('02' == result.code){
		    			$('#teacherTable').bootstrapTable('refresh');
		    			layer.msg("保存成功！");
		    			layer.closeAll();
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





		