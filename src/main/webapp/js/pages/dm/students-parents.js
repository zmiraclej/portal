$('#studentParentsTable').bootstrapTable({
		//pagination:"true",
	   url:"findStudentParents",
       //search:true,
       //sidePagination:"server",
       height:500,
	   striped:true,
	   clickToSelect:true,
	   singleSelect:true,
	   toolbar:"#studentParentsToolbar",
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
	                title: '家长姓名',
	                sortable: false,
	                align: 'center'
	            },
            {
                field: 'sex',
                title: '性别',
                sortable: false,
                align: 'center'
            },
            {
                field: 'phone',
                title: '手机',
                sortable: false,
                align: 'center'
            },
            {
                field: 'wxAccount',
                title: 'WxAccount',
                sortable: false,
                align: 'center'
            },
            {
                field: 'wxMobile',
                title: 'WxMobile',
                sortable: false,
                align: 'center'
            },
            {
                title: '操作',
                sortable: false,
                align: 'center',
				formatter:function(value, row, index){
					var url = "";
					
					if(row.id != '0'){
						//url = '<button class="layui-btn layui-btn-primary layui-btn-small" onClick="showRoleTables('+row.id+');">删除角色</button>'
						url = '<button class="layui-btn layui-btn-primary layui-btn-small" onClick="unlockParent('+row.id+');">解除绑定关系</button>'
						url += '<button class="layui-btn layui-btn-primary layui-btn-small" onClick="synParentsWx('+row.id+');">同步微信号</button>'
					}
					
					return url;
				}
            }
        ],
		queryParams: function queryParams(params){
			return { 
				studentId : $('#studentId').val()/*,
				schoolCode : $('#school').val()*/
				};
		}
});

function synParentsWx(parentId){
	var d ={
			"id":parentId
	};

	$.ajax({
		url : "parentSynWxAccount?studentId=" + $('#studentId').val(),
		type: "POST",
            contentType: "application/json",
            dataType:"json",
            data:JSON.stringify(d),
            success : function(result) {
			if('02'==result.code){
               	 $('#studentParentsTable').bootstrapTable('refresh');
                    layer.msg('同步微信成功', {
                           time: 1000, //2s后自动关闭
                           area: ['220px', '50px']
                         });
                    
                    //layer.close(index);
                    
                } else {
                    layer.msg('同步微信失败：' + result.msg, {
                           time: 2000, //3s后自动关闭
                           area: ['300px', '100px']
                         });
                }
		}
	});
}

function unlockParent(parentId){
	//alert(parentId);
	var d ={
			"id":parentId
	};
	if(confirm('确认要解除与此家长的绑定关系？')){
		$.ajax({
			url : "unlockParent?studentId=" + $('#studentId').val() + "&parentId=" + parentId,
			type: "POST",
	            contentType: "application/json",
	            dataType:"json",
	            data:JSON.stringify(d),
	            success : function(result) {
				if('02'==result.code){
	               	 $('#studentParentsTable').bootstrapTable('refresh');
	                    layer.msg('成功解除绑定', {
	                           time: 1000, //2s后自动关闭
	                           area: ['220px', '50px']
	                         });
	                    
	                    //layer.close(index);
	                    
	                } else {
	                    layer.msg('解除绑定失败', {
	                           time: 2000, //3s后自动关闭
	                           area: ['300px', '100px']
	                         });
	                }
			}
		});
	}
	
}

/*
$('#school').change(function(){
	$('#teacherRolesTable').bootstrapTable('refresh');
});
*/

$('#deleteStudentParents').click(function(){
	
	var rows = $('#studentParentsTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("未选择家长");
		return false;
	}
	/*
	var type = rows[0].id;
	
	
	if(type == '0'){
		 layer.msg('工作人员角色不能删除', {
                time: 1500, //2s后自动关闭
                area: ['220px', '50px']
              });
		 return;
	}
	*/
	
	//var schoolCode = $('#school').val();
	//var teacherId = $('#teacherId').val();
	var studentId = $('#studentId').val();
	
	//deleteTeacherRole( type, schoolCode, teacherId );
	var parentId = rows[0].id;
	deleteStudentParents(parentId,studentId);
	
});

function deleteStudentParents(parentId,studentId){
	var sindex = layer.msg('是否要删除选该家长记录？', {
				time: 15000, //15s后自动关闭
				area: ['300px', '100px'],
				btn: ['确  认', '取  消'],
				yes: function(){
					
					var dindex = layer.load(1, {
						  shade: [0.1,'#fff'] //0.1透明度的白色背景
						});
					
					layer.close(sindex);
					$.ajax({
		    			url : "deleteStudentParents?parentId="+parentId+"&studentId="+studentId,
		    			success : function(result) {
		    				
		    				if("02"==result.code){
		    					$('#studentParentsTable').bootstrapTable('refresh');
			    				layer.close(dindex);
		    				} else{
		    					layer.msg(result.msg, {
	   	                            time: 1000, //2s后自动关闭
	   	                            area: ['220px', '50px']
	   	                          });
		    				}
		    				
		    				/*if('02'==result.code){
		   	                	 $('#templatesTable').bootstrapTable('refresh');
		   	                     layer.msg('成绩单保存成功', {
		   	                            time: 1000, //2s后自动关闭
		   	                            area: ['220px', '50px']
		   	                          });
		   	                 } else {
		   	                     layer.msg('成绩单保存失败', {
		   	                            time: 1000, //2s后自动关闭
		   	                            area: ['220px', '50px']
		   	                          });
		   	                 }*/
		    			}
		    		});
		
				}
				,btn2: function(){
					layer.close(sindex);
				}
			});
}


function deleteTeacherRole( type, schoolCode, teacherId ){
	var sindex = layer.msg('是否要删除选该角色记录？', {
				time: 15000, //15s后自动关闭
				area: ['300px', '100px'],
				btn: ['确  认', '取  消'],
				yes: function(){
					
					var dindex = layer.load(1, {
						  shade: [0.1,'#fff'] //0.1透明度的白色背景
						});
					
					layer.close(sindex);
					$.ajax({
		    			url : "deleteTeacherRole?type="+type+"&schoolCode="+schoolCode+"&teacherId="+teacherId,
		    			success : function(result) {
		    				
		    				$('#teacherRolesTable').bootstrapTable('refresh');
		    				layer.close(dindex);
		    				/*if('02'==result.code){
		   	                	 $('#templatesTable').bootstrapTable('refresh');
		   	                     layer.msg('成绩单保存成功', {
		   	                            time: 1000, //2s后自动关闭
		   	                            area: ['220px', '50px']
		   	                          });
		   	                 } else {
		   	                     layer.msg('成绩单保存失败', {
		   	                            time: 1000, //2s后自动关闭
		   	                            area: ['220px', '50px']
		   	                          });
		   	                 }*/
		    			}
		    		});
		
				}
				,btn2: function(){
					layer.close(sindex);
				}
			});
}


$('#addStudentParents').on('click',function(){
	//selectRoleType();
	
		$('#frmParentsAdd')[0].reset();
		
		var index = layer.open({
			  type: 1,
			  title: '新增家长信息',
			  area: ['400px', '300px'],//area: ['450px', '450px'],
			  shadeClose: false, //点击遮罩关闭
			  maxmin: false,
			  content: $('#parentsAddContent'),
			  success:function(layero, index){
				  
			  }
		});
});

//点击编辑
$('#editStudentParents').on('click',function(){
	//selectRoleType();
		var rows = $('#studentParentsTable').bootstrapTable("getAllSelections");
		if(rows.length==0){
			_msg("未选择家长");
			return false;
		}
		var parentId = rows[0].id;
		$('#frmParentsEdit')[0].reset();
		
		var index = layer.open({
			  type: 1,
			  title: '修改家长信息',
			  area: ['400px', '300px'],//area: ['450px', '450px'],
			  shadeClose: false, //点击遮罩关闭
			  maxmin: false,
			  content: $('#parentsEditContent'),
			  success:function(layero, index){
				  //获取家长信息
				  $.ajax({
	           			url : "student/getParentInfo?parentId=" + parentId,
	           			type: "POST",
	       	            contentType: "application/json",
	       	            dataType:"json",
	       	            //data:JSON.stringify(selectedData),
	           			success : function(result) {
		           			var frm = $('#frmParentsEdit');
		   				    $(frm).find('input[name=id]').val(result.id);
		   				    $(frm).find('input[name=name]').val(result.name);
		   				    $(frm).find('input[name=sex]').val(result.sex);
		   				    $(frm).find('input[name=phone]').val(result.phone);
	           				
	           			}
	           		});
				 
				  
				  //success
			  }
		});
});

//

function showRoleInfos( roleType ){
	
	var teacherId = $('#teacherId').val()
	var schoolCode = $('#school').val();
	
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '显示角色权限信息'
        ,area: ['700px', '500px']
        ,maxmin: false
        ,content: 'findTeacherRoleInfos?roleType='+roleType+'&schoolCode='+schoolCode+'&teacherId='+teacherId
        ,btn: ['确认', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	layer.close(index);
        }
        ,btn2: function(index, layero){
        	layer.close(index);
        }
        
      });
}

function selectRoleType(){
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '选择角色类型'
        ,area: ['400px', '300px']
        ,maxmin: false
        ,content: 'toSelectTeacherRole'
        ,btn: ['确认', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	//alert('aaa');
        	//当点击‘确定’按钮的时候，获取弹出层返回的值
            var selectedRole = window["layui-layer-iframe" + index].callbackdata();
            //打印返回的值，看是否有我们想返回的值。
            if(selectedRole){
            	layer.closeAll();
            	//console.log(selectedSchool);
            	var roleCode = selectedRole['roleCode'];
            	var roleName = selectedRole['roleName'];
            	//alert(selectedSchool['schoolCode']);
            	//editSchoolPermission( teacherId, schoolCode, schoolName);
            	var teacherId = $('#teacherId').val()
            	var schoolCode = $('#school').val()
            	var schoolName = $('#school').find("option:selected").text();
            	var stage = $('#school').find("option:selected").attr("stage");
            	//console.log(selectedRole);
            	
            	if(roleCode =='6'){
            		 var selectedData = {};
                     	
                     	selectedData['schoolCode'] = schoolCode;
                     	selectedData['schoolName'] = schoolName;
                     	selectedData['stage'] = stage;
                     	selectedData['roleType'] = roleCode;
                     	selectedData['teacherId'] = teacherId;
                     	
                     	 $.ajax({
                     			url : "saveTeacherRole",
                     			type: "POST",
         	       	             contentType: "application/json",
         	       	             dataType:"json",
         	       	             data:JSON.stringify(selectedData),
                     			success : function(result) {
                     				if('02'==result.code){
         	       	                	 $('#teacherRolesTable').bootstrapTable('refresh');
         	       	                     layer.msg('角色添加成功', {
         	       	                            time: 1000, //2s后自动关闭
         	       	                            area: ['220px', '50px']
         	       	                          });
         	       	                     
         	       	                     layer.close(index);
         	       	                     
         	       	                 } else {
         	       	                     layer.msg('角色添加失败', {
         	       	                            time: 1000, //2s后自动关闭
         	       	                            area: ['220px', '50px']
         	       	                          });
         	       	                 }
                     			}
                     		});
                     	 
                     
            	}
            	else{
            		addRoleInfo( teacherId, roleCode, roleName, schoolCode, schoolName, '' );
            	}
            	
            	
            }
        	
        }
        ,btn2: function(index, layero){
          layer.closeAll();
        }
        
      });
}

function addRoleInfo( teacherId, roleCode, roleName, schoolCode, schoolName, stage ){
	
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '选择角色权限信息'
        ,area: ['700px', '500px']
        ,maxmin: false
        ,content: 'toAddTeacherRole?roleCode='+roleCode+'&schoolCode='+schoolCode
        ,btn: ['确认', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	//alert('aaa');
        	//当点击‘确定’按钮的时候，获取弹出层返回的值
            var selectedData = window["layui-layer-iframe" + index].callbackdata();
            //打印返回的值，看是否有我们想返回的值。
            //console.log(selectedData);
            if(selectedData){
            	
            	selectedData['schoolCode'] = schoolCode;
            	selectedData['schoolName'] = schoolName;
            	//selectedData['stage'] = stage;
            	selectedData['roleType'] = roleCode;
            	selectedData['teacherId'] = teacherId;
            	
            	 $.ajax({
            			url : "saveTeacherRole",
            			type: "POST",
	       	             contentType: "application/json",
	       	             dataType:"json",
	       	             data:JSON.stringify(selectedData),
            			success : function(result) {
            				if('02'==result.code){
	       	                	 $('#teacherRolesTable').bootstrapTable('refresh');
	       	                     layer.msg('角色添加成功', {
	       	                            time: 1000, //2s后自动关闭
	       	                            area: ['220px', '50px']
	       	                          });
	       	                     
	       	                     layer.close(index);
	       	                     
	       	                 } else {
	       	                     layer.msg('角色添加失败', {
	       	                            time: 1000, //2s后自动关闭
	       	                            area: ['220px', '50px']
	       	                          });
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




layui.use(['form'], function(){
	  var form = layui.form();
	 
	  //自定义验证规则
	  form.verify({
		  phone: function(value){
		      if(value.length < 1){
			        return '手机号必须输入！';
			  }
		      
		      if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(value))){ 
		          return '不是完整的11位手机号或者正确的手机号前七位'; 
		      } 
		  }
		  /*
	    name: function(value){
	      if(value.length < 1){
	        return '姓名必须输入！';
	      }
	    } 
	  	,studentNo:function(value){
	  		 if(value.length < 1){
		        return '学籍号必须输入！';
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
	    }*/
	  });
	  
	  
	  form.on('submit(frmParentsAdd)', function(data){
		  	/*
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
		    */
		    /* //console.log(jsonParam);
		    jsonParam.schools = schools;*/
		    //data.field["schools"] = schools;
		    var jsonParam = JSON.stringify(data.field);
		   // console.log(jsonParam);
		    var saveFun = function(jsonParam,flag){
		    	$.ajax({
			    	type : "POST",
			    	url : "saveNewParents?studentId=" + $('#studentId').val() + "&flag="+flag,
			    	contentType: "application/json", 
			    	dataType : "json",
			    	data:jsonParam,
			    	success : function(result) {
			    		if('02' == result.code){
			    			$('#studentParentsTable').bootstrapTable('refresh');
			    			layer.msg("保存成功！");
			    			layer.closeAll();
			    		}else if('-99' == result.code){
			    			//该手机号的父母未绑定任何学生，提示是否绑定
			    			if(confirm(result.msg)){
			    				saveFun(jsonParam,1);
			    			}
			    		} else if('-100' == result.code){
			    			var tip = "该手机号已经存在且绑定以下学生：\r\n" + result.msg + '\r\n是否继续与当前学生绑定？';
			    			if(confirm(tip)){
			    				saveFun(jsonParam,1);
			    			}
			    		} else if('-101' == result.code){
			    			layer.msg("该手机号已经绑定当前学生，不能再次绑定！");
			    		} else {
			    			layer.msg(result.msg);
			    		}
			    		 
			    	}
			    });
		    };
		    saveFun(jsonParam,0);
		    
		    
		    return false;
		  });
	    
	  form.on('submit(frmParentsEdit)', function(data){
		  	/*
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
		    */
		    /* //console.log(jsonParam);
		    jsonParam.schools = schools;*/
		    //data.field["schools"] = schools;
		    var jsonParam = JSON.stringify(data.field);
		    //alert(jsonParam);
		   // console.log(jsonParam);
		    var saveFun = function(jsonParam,flag){
		    	$.ajax({
			    	type : "POST",
			    	url : "saveEditParents?studentId=" + $('#studentId').val() + "&flag="+flag,
			    	contentType: "application/json", 
			    	dataType : "json",
			    	data:jsonParam,
			    	success : function(result) {
			    		if('02' == result.code){
			    			$('#studentParentsTable').bootstrapTable('refresh');
			    			layer.msg("保存成功！");
			    			layer.closeAll();
			    		} else if('-100' == result.code){
			    			//layer.msg("该手机号已经存在且绑定以下学生：\r\n" + result.msg);
			    			/*var tip = "该手机号已经存在且绑定以下学生：\r\n" + result.msg + '\r\n是否继续与当前学生绑定？';
			    			if(confirm(tip)){
			    				saveFun(jsonParam,1);
			    			}*/
			    			if(confirm(result.msg)){
			    				saveFun(jsonParam,-100);
			    			}
			    		} else if('-110' == result.code){
			    			if(confirm(result.msg)){
			    				saveFun(jsonParam,-110);
			    			}
			    		}else if('-120' == result.code){
			    			if(confirm(result.msg)){
			    				saveFun(jsonParam,-120);
			    			}
			    		} else if('-101' == result.code){
			    			layer.msg("该手机号已经绑定当前学生，不能再次绑定！");
			    		} else {
			    			layer.msg(result.msg);
			    		}
			    		 
			    	}
			    });
		    };
		    saveFun(jsonParam,0);
		    
		    
		    return false;
		  });
	  
	  //
	});
		