$.ajax({
	type : "POST",
	url : "searchStudents",
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


$('#studentsTable').bootstrapTable({
       pagination:"true",
       url:"searchStudents",
       search:true,
       sidePagination:"server",
       height:650,
	   striped:true,
	   clickToSelect:true,
	   singleSelect:true,
	   toolbar:"#studentsToolbar",
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
	                field: 'studentNo',
	                title: '学生编号',
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
            }
            ,
            {
                field: 'idCardNumber',
                title: '身份证号',
                sortable: false,
                align: 'center',
            }
            ,
            {
                field: 'schoolName',
                title: '学校',
                sortable: false,
                align: 'center',
            }
            ,
            {
                field: 'gradeStage',
                title: '学部',
                sortable: false,
                align: 'center',
                formatter:function(value, row, index){
					if(value == '1'){
						return "小学";
					}
					
					if(value == '2'){
						return "初中";
					}
					
					if(value == '3'){
						return "高中";
					}
					
					return "-"
					
				}
            }
            ,
            {
                field: 'cardNo',
                title: '一卡通卡号',
                sortable: false,
                align: 'center',
            }
            ,
            {
                field: 'cardColor',
                title: '一卡通颜色',
                sortable: false,
                align: 'center',
            }
            ,
            {
                title: '操作',
                sortable: false,
                align: 'center',
				formatter:function(value, row, index){
					var url = '<button class="layui-btn layui-btn-primary layui-btn-small" onClick="showEditTables('+row.id+');">档案编辑</button>';
					url += '&nbsp;&nbsp; <button class="layui-btn layui-btn-primary layui-btn-small" onClick="showParentsTables('+row.id+');">关联家长</button>';
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


$('#addStudent').on('click',function(){
	$('#frmStudentAdd')[0].reset();
	
	var index = layer.open({
		  type: 1,
		  title: '新增学生档案',
		  area: ['800px', '600px'],//area: ['450px', '450px'],
		  shadeClose: false, //点击遮罩关闭
		  maxmin: false,
		  content: $('#studentAddContent'),
		  success:function(layero, index){
//			  console.info(index);
//			  console.info(layero);
			  //初始化级联
			  //cascadeClass();
			  
		  }
	});
	
});

//编辑学生
function showEditTables( studentId ){
	
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '编辑学生信息'
        ,area: ['800px', '600px']
        ,maxmin: false
        ,content: 'toEditStudent?studentId='+studentId
        ,btn: ['保存', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	//当点击‘确定’按钮的时候，获取弹出层返回的值
            var selectedSchool = window["layui-layer-iframe" + index].callbackdata();
            //打印返回的值，看是否有我们想返回的值。
            if(selectedSchool){
            	//layer.closeAll();
            	//console.log(selectedSchool);
            	//var schoolCode = selectedSchool['schoolCode'];
            	//var schoolName = selectedSchool['schoolName'];
            	//alert(selectedSchool['schoolCode']);
            	//editSchoolPermission( teacherId, schoolCode, schoolName);
            	
            	$.ajax({
    		    	type : "POST",
    		    	url : "saveEditStudent",
    		    	contentType: "application/json", 
	   	            dataType:"json",
	   	            data:JSON.stringify(selectedSchool),
    		    	success : function(result) {
    		    		if('02' == result.code){
    		    			$('#studentsTable').bootstrapTable('refresh');
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

//删除学生
$('#deletestudent').on('click',function(){
	var rows = $('#studentsTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("未选择学生");
		return false;
	}
	var studentId = rows[0].id;
	var studentName = rows[0].name;
	var param = {'id':studentId};
	layer.msg('是否要删除选中学生【' + studentName + '】？', {
	    time: 15000, //15s后自动关闭
	    area: ['300px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "deleteStudent?studentId=" + studentId,
	             type: "POST",
	             contentType: "application/json",
	             dataType:"json",
	             data:JSON.stringify(param),
	             success: function(result) {
	                 console.log();
	                 if('02'==result.code){
	                	 $('#studentsTable').bootstrapTable('refresh');
	                     layer.msg('学生删除成功', {
	                            time: 1000, //2s后自动关闭
	                            area: ['220px', '50px']
	                          });
	                 } else {
	                     layer.msg('学生删除失败', {
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


//关联家长
function showParentsTables(studentId){
	
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '关联家长'
        ,area: ['800px', '600px']
        ,maxmin: false
        ,content: 'toFindStudentsParents?studentId='+studentId
        ,btn: ['关闭'] //只是为了演示
        ,yes: function(index, layero){
        	layer.closeAll();
        }
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
	  
		/*//文件上传初始化
		layui.upload({
			elem: '#fileExcel',
			url: 'photoFileUpload',
			//exts: 'xlsx|xls', //只允许上传excel
			accept: 'file',
			success: function(res){
				if(res.code=="02"){
					layer.msg("上传成功");
					$('#successFileShow').html(res.msg);
					$('#filePath').val(res.data);
				}else{
					layer.msg("模板上传失败");
					$('#successFileShow').html(res.msg);
					$('#filePath').val('');
				}
			}
		});*/
  
	  //自定义验证规则
	  form.verify({
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
	  	/*
	    
	 
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
	  
	  
	  form.on('submit(formDemo)', function(data){
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
		    $.ajax({
		    	type : "POST",
		    	url : "saveNewStudent",
		    	contentType: "application/json", 
		    	dataType : "json",
		    	data:jsonParam,
		    	success : function(result) {
		    		if('02' == result.code){
		    			$('#studentTable').bootstrapTable('refresh');
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
	  
	  //级联
	  $.ajax({
	        type: "POST",
	        url: "student/cascadeschools",
	        data: {},
	        dataType: "json",
	        cache: false,
	        success: function(a) {
//	        	console.info(a);
	            var length = a.length;
	            $('#schoolCode').html('<option value="-1">请选择校区学部</option>');
	            for (var i = 0; i < length; i++) {
	                $('#schoolCode').append('<option value="' + a[i].code + '">' + a[i].name + '</option>');
	            };
	            form.render('select'); //刷新select选择框渲染
	        }
	    });
	  
	  //选择学部时
	  form.on('select(schoolCode)', function(data){
//		  console.info(data);
		  //拿到学段cureentSchoolCode和年级gradeNo
		  $.ajax({
		        type: "POST",
		        url: "student/cascadestages?schoolCode=" + data.value,
		        /*
		        data: {
		        	'schoolCode':data.value
		        },
		        */
		        //contentType: "application/json", 
		        dataType: "json",
		        cache: false,
		        success: function(result) {
//		        	console.info(result);
		            var length = result.length;
		            $('#cureentSchoolCode').html('<option value="-1">请选择学段</option>');
		            
		            $('#gradeNo').html('<option value="-1">请选择年级</option>');
		            $('#classId').html('<option value="-1">请选择班级</option>');
		            $('#classNo').val('-1');
		            
		            for (var i = 0; i < length; i++) {
		                $('#cureentSchoolCode').append('<option value="' + result[i].code + '">' + result[i].name + '</option>');
		            };
		            form.render('select'); //刷新select选择框渲染
		        }
		    });
	  });
	  
	//选择学段
	  form.on('select(cureentSchoolCode)', function(data){
//		  console.info(data);
//		  console.info($('#schoolCode').val());
		  
		  $.ajax({
		        type: "POST",
		        url: "student/cascadegrades",
		        data: {
		        	'schoolCode':$('#schoolCode').val(),
		        	'stage':data.value
		        },
		        dataType: "json",
		        cache: false,
		        error: function(a, b, c) {},
		        success: function(a) {
		        	console.info(a);
		            var length = a.length;
		            $('#gradeNo').html('<option value="-1">请选择年级</option>');
		            $('#classId').html('<option value="-1">请选择班级</option>');
		            $('#classNo').val('-1');
		            
		            for (var i = 0; i < length; i++) {
		                $('#gradeNo').append('<option value="' + a[i] + '">' + a[i] + '年级</option>');
		            };
		            form.render('select'); //刷新select选择框渲染
		        }
		    });
	  });
	  
	  //选择年级
	  form.on('select(gradeNo)',function(data){
//		  console.info(data);
//		  console.info("cureentSchoolCode:" + $('#cureentSchoolCode').val());
//		  console.info("schoolCode:" + $('#schoolCode').val());
		  
		  $.ajax({
		        type: "POST",
		        url: "student/cascadeclasses",
		        data: {
		        	'schoolCode':$('#schoolCode').val(),
		        	'stage':$('#cureentSchoolCode').val(),
		        	'grade':data.value
		        },
		        dataType: "json",
		        cache: false,
		        error: function(a, b, c) {},
		        success: function(a) {
//		        	console.info(a);
		            var length = a.length;
		            $('#classId').html('<option value="-1">请选择班级</option>');
		            $('#classNo').val('-1');
		            for (var i = 0; i < length; i++) {
		                $('#classId').append('<option value="' + a[i].id + '">' + a[i].classNo + '</option>');
		            };
		            form.render('select'); //刷新select选择框渲染
		        }
		    });
	  });
	  
	  //选择班级
	  form.on('select(classId)',function(data){
		  //修改隐藏域的值classNo
		  $('#classNo').val($('#classId').find("option:selected").text());
	  });
	  
	  
	});





		