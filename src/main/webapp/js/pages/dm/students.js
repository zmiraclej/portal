var yw = $('#yw').val();

/*$.ajax({
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
});*/

function getTParam() {
	return{
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
			     },{
			    	 	field: 'studentCode',
		                title: '学号',
		                sortable: false,
		                align: 'center'
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
	                field: 'payStatus',
	                title: '缴费状态',
	                sortable: false,
	                align: 'center',
	                formatter:function(value, row, index){
	                	if(value == null || value=="0"){
	                		return '<span style="color:red">未缴费</span>';
	                	}
	                	if(value == "1"){
	                		return '已缴费';
	                	}
	                }
	            }
	            ,
	            {
	                title: '操作',
	                sortable: false,
	                align: 'center',
					formatter:function(value, row, index){
						var url = '<button class="layui-btn layui-btn-primary layui-btn-small" onClick="showEditTables('+row.id+');">档案编辑</button>';
						url += '&nbsp;&nbsp; <button class="layui-btn layui-btn-primary layui-btn-small" onClick="showEditPhoto('+row.id+');">关联照片</button>';
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
					search : params.search,
					schoolCode:$('#school').val(),
					  stage:$('#stages').val(),
					  grade:$('#grades').val(),
					  classId:$('#classes').val()};
			}
	}
}
$('#studentsTable').bootstrapTable(getTParam());





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
        ,content: 'toEditStudent?studentId='+studentId+'&yw='+yw
        ,btn: ['保存', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	//当点击‘确定’按钮的时候，获取弹出层返回的值
            var selectedSchool = window["layui-layer-iframe" + index].callbackdata();
            //非空验证
            if(selectedSchool['name'] == ''){
            	layer.msg('学生姓名不能为空');
            	return false;
            }
            if(selectedSchool['studentNo'] == ''){
            	layer.msg('学籍号不能为空');
            	return false;
            }
            if(selectedSchool['idCardNumber'] == ''){
            	layer.msg('身份证不能为空');
            	return false;
            }
            if(selectedSchool['schoolCode'] == '-1'){
            	layer.msg('学校不能为空');
            	return false;
            }
            if(selectedSchool['cureentSchoolCode'] == '-1'){
            	layer.msg('学部不能为空');
            	return false;
            }
            if(selectedSchool['gradeNo'] == '-1'){
            	layer.msg('年级不能为空');
            	return false;
            }
            if(selectedSchool['classId'] == '-1'){
            	layer.msg('班级不能为空');
            	return false;
            }
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

//编辑照片
function showEditPhoto(studentId){
	
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '编辑学生照片'
        ,area: ['800px', '600px']
        ,maxmin: false
        ,content: 'toEditStudentPhoto?studentId='+studentId
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
    		    	url : "saveEditStudentPhoto",
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

$("#school").on('change',function(){
	//console.log(yw);
	seachStages();
});
$("#stages").on('change',function(){
	  seachGrades();
});
$("#grades").on('change',function(){
	  seachClass();
});
$("#classes").on('change',function(){
	$('#studentsTable').bootstrapTable('refresh',getTParam());
});

function seachStages(){
	var toUrl;
	var schoolCode=$('#school').val();
	var yw = $('#yw').val();
	
	  if(yw == 'true'){
		  toUrl = "yw/AllStage?schoolCode="+schoolCode;
	  }else{
		  toUrl = "student/cascadestages?schoolCode=" + schoolCode;
	  }
	  
	  //console.log(schoolCode);
	  $.ajax({
		  	async:false,
	        type: "POST",
	        url: toUrl,
	        /*
	        data: {
	        	'schoolCode':data.value
	        },
	        */
	        //contentType: "application/json", 
	        dataType: "json",
	        cache: false,
	        success: function(result) {
	        	$('#stages').empty();
	        	//console.log(result);
	            var length = result.length;
	            if(result[0] != null){
	            	if(yw == 'true'){
	            		$('#stages').append('<option value="0">全部</option>');
	            	}
	            	for (var i = 0; i < length; i++) {
	            		if(yw == 'true'){
	            			$('#stages').append('<option value="' + result[i].code + '">' + result[i].name + '</option>');
	            		}else{
	            			var name;
			            	if(result[i].stage == 1){
			            		name="小学"
			            	}else
			            	if(result[i].stage == 2){
			            		name="初中"
			            	}else{
			            		name="高中"
			            	}
			            	$('#stages').append('<option value="' + result[i].stage + '">' + name + '</option>');
	            		}
		            };
	            }else{
	            	$('#stages').append('<option value="-1">' + "--无学部信息--"+ '</option>');
	            }
	      	  seachGrades();
	        }
	    });
	  
}

function seachGrades(){
	var toUrl;
	var yw = $('#yw').val();
	
	  if(yw == 'true'){
		  toUrl = "yw/AllGrade";
	  }else{
		  toUrl = "student/cascadegrades";
	  }
	var schoolCode = $('#school').val();
	var stage = $('#stages').val();
	//console.log(schoolCode+" "+stage);
	  $.ajax({
		   async:false,
	        type: "POST",
	        url: toUrl,
	        data: {
	        	'schoolCode':schoolCode,
	        	'stage':stage
	        },
	        dataType: "json",
	        cache: false,
	        error: function(a) {},
	        success: function(a) {
	        	 $('#grades').empty();
	        	//console.log(a[0]);
	            var length = a.length;
	            if(a[0] != null){
	            	if(yw == 'true'){
	            		$('#grades').append('<option value="0">全部</option>');
	            	}
	            	for (var i = 0; i < length; i++) {
	            			$('#grades').append('<option value="' + a[i] + '">' + a[i] + '年级</option>');
		            };
	            	
	            }else{
	            	$('#grades').append('<option value="-1">' + "--无年级信息--"+ '</option>');
	            }
	      	  seachClass();
	        }
	    });
	  
}

function seachClass(){
	var toUrl;
	var yw = $('#yw').val();
	  if(yw == 'true'){
		  toUrl = "yw/AllClasses";
	  }else{
		  toUrl = "student/cascadeclasses";
	  }
	var schoolCode = $('#school').val();
	var stage = $('#stages').val();
	var grade = $('#grades').val();
	  //console.log($('#classes').val());
	  $.ajax({
		  	asnyc:false,
	        type: "POST",
	        url: toUrl,
	        data: {
	        	'schoolCode':schoolCode,
	        	'stage':stage,
	        	'grade':grade
	        },
	        dataType: "json",
	        cache: false,
	        error: function(a) {},
	        success: function(a) {
	        	$('#classes').empty();
	        	//console.log(a);
	            var length = a.length;
	            //var gradeName = $('#gradeNo').find('option:selected').text();
	            if(a[0] != null){
	            	if(yw == 'true'){
	            		$('#classes').append('<option value="0">全部</option>');
	            	}
	            	for (var i = 0; i < length; i++) {
	            		if(yw == 'true'){
	            			$('#classes').append('<option value="' + a[i].id + '">' + a[i].className+ '</option>');
	            		}else{
	            			$('#classes').append('<option value="' + a[i].classId + '">' + a[i].className+ '</option>');
	            		}
		            };
	            	
	            }else{
	            	$('#classes').append('<option value="-1">' + "--无班级信息--"+ '</option>');
	            }
	            $('#studentsTable').bootstrapTable('refresh',getTParam());
	        }
	    });
	  
}


layui.use(['form'], function(){
	  var form = layui.form();
	  
	  //自定义验证规则
	  /*form.verify({
	    name: function(value){
	      if(value.length < 1){
	        return '姓名必须输入！';
	      }
	    } 
	  	,studentNo:function(value){
	  		if(value.length < 1){
		       return '学籍号必须输入！';
		    }
	  		var re = /^[0-9a-zA-Z]*$/g;
	  		if(false == re.test(value)){
	  			return '学籍号必须是数字或字母';
	  		}
		 }*/
	  	form.verify({
			  name:function(value){
				  if(value.length==0){
					  return "请填写学生姓名";
				  }
				  if(value.length<2){
					  return "学生姓名不完整";
				  }
			  },
			  studentNo:function(value){
				  if(value.length==0){
					  return "请填写学生学籍号";
				  }
			  },
			  idCardNumber:function(value){
				  if(value.length==0){
					  return "请填写学生身份证号";
				  }
				  if(value.length > 0 && value.length < 18){
					  return "学生身份证号不完整";
				  }
			  }/*,
			  studentCode:function(value){
				  if(value.length==0){
					  return "请填写学生学号";
				  }
			  }*/
		  });
	  	
	  	
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
		    
		    if($('#schoolCode').val() == '-1'){
		    	layer.msg('请选择学校');
		    	return false;
		    }
		    if($('#cureentSchoolCode').val() == '-1'){
		    	layer.msg('请选择学部');
		    	return false;
		    }
		    if($('#gradeNo').val() == '-1'){
		    	layer.msg('请选择年级');
		    	return false;
		    }
		    if($('#classId').val() == '-1'){
		    	layer.msg('请选择班级');
		    	return false;
		    }
		   // console.log(jsonParam);
		    $.ajax({
		    	type : "POST",
		    	url : "saveNewStudent",
		    	contentType: "application/json", 
		    	dataType : "json",
		    	data:jsonParam,
		    	success : function(result) {
		    		if('02' == result.code){
		    			$('#studentsTable').bootstrapTable('refresh');
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
	  
	  
	  
	  	var yw = $('#yw').val();
	    var schoolUrl;
		var stageUrl;
		var gradeUrl;
		var classUrl;
		if(yw == 'true'){
			schoolUrl="yw/AllSchool";
			stageUrl ="yw/AllStage?schoolCode=";
			gradeUrl ="yw/AllGrade";
			classUrl="yw/AllClasses";
		}else{
			schoolUrl="student/cascadeschools";
			stageUrl ="student/cascadestages?schoolCode=";
			gradeUrl ="student/cascadegrades";
			classUrl="student/cascadeclasses";
		}
	  //级联
	  $.ajax({
	        type: "POST",
	        url: schoolUrl,
	        data: {},
	        dataType: "json",
	        cache: false,
	        success: function(a) {
//	        	console.info(a);
	            var length = a.length;
	            $('#schoolCode').html('<option value="-1">请选择校区学部</option>');
	            var yw = $('#yw').val();
	            for (var i = 0; i < length; i++) {
	            	if(yw == 'true'){
	            		$('#schoolCode').append('<option value="' + a[i].code + '">' + a[i].name + '</option>');
	            	}else{
	            		$('#schoolCode').append('<option value="' + a[i].schoolCode + '">' + a[i].schoolName + '</option>');
	            	}
	                
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
		        url: stageUrl + data.value,
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
		            var yw = $('#yw').val();
		            for (var i = 0; i < length; i++) {
		            if(yw == 'true'){
		            	$('#cureentSchoolCode').append('<option value="' + result[i].code + '">' + result[i].name + '</option>');
		            }else{
		            	var name;
		            	if(result[i].stage == 1){
		            		name="小学"
		            	}else
		            	if(result[i].stage == 2){
		            		name="初中"
		            	}else{
		            		name="高中"
		            	}
		                $('#cureentSchoolCode').append('<option value="' + result[i].stage + '">' + name + '</option>');
		            }
		            	
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
		        url: gradeUrl,
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
		        url: classUrl,
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
		            var gradeName = $('#gradeNo').find('option:selected').text();
		            var yw = $('#yw').val();
		            for (var i = 0; i < length; i++) {
		            	if(yw == 'true'){
		            		$('#classId').append('<option value="' + a[i].id + '">' + a[i].classNo + '</option>');
		            	}else{
		            		$('#classId').append('<option value="' + a[i].classId + '">' + a[i].classNo+ '</option>');
		            	}
		                
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





		