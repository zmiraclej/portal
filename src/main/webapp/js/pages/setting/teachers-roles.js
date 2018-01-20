$('#teacherRolesTable').bootstrapTable({
		//pagination:"true",
	   url:"findTeacherRoles",
       //search:true,
       //sidePagination:"server",
       height:500,
	   striped:true,
	   clickToSelect:true,
	   singleSelect:true,
	   toolbar:"#teacherRolesToolbar",
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
	                title: '角色名称',
	                sortable: false,
	                align: 'center'
	            },
            {
                field: 'content',
                title: '内容',
                sortable: false,
                align: 'center'
            }/*,
            {
                title: '操作',
                sortable: false,
                align: 'center',
				formatter:function(value, row, index){
					var url = "";
					
					if(row.id != '0'){
						url = '<button class="layui-btn layui-btn-primary layui-btn-small" onClick="showRoleTables('+row.id+');">删除角色</button>'
					}
					
					return url;
				}
            }*/
        ],
		queryParams: function queryParams(params){
			return { 
				teacherId : $('#teacherId').val(),
				schoolCode : $('#school').val()
				};
		}
});

$('#school').change(function(){
	$('#teacherRolesTable').bootstrapTable('refresh');
});

$('#deleteTeacherRole').click(function(){
	
	var rows = $('#teacherRolesTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("未选择角色");
		return false;
	}
	var type = rows[0].id;
	
	if(type == '0'){
		 layer.msg('工作人员角色不能删除', {
                time: 1500, //2s后自动关闭
                area: ['220px', '50px']
              });
		 return;
	}
	
	var schoolCode = $('#school').val();
	var teacherId = $('#teacherId').val();
	
	deleteTeacherRole( type, schoolCode, teacherId );
	
});

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


$('#addTeacherRole').on('click',function(){
	selectRoleType();
});

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
            	
            	if(roleCode =='6' || roleCode == '8'){
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
		