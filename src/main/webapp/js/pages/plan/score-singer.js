
function getTParam(){
	return {
		//pagination:"true",
		url:'pageScoreSinger',
		//search:false,
		//sidePagination:"server",
		height:500,
		striped:true,
		clickToSelect:true,
		singleSelect:true,
		toolbar:"#scoreNoticeToolbar",
		toolbarAlign:"right",
		queryParams: function queryParams(params){
			return {
				insId: $('#inses').val(),
				classId: $('#classes').val(),
				};
		},
		columns: [
			{	checkbox: true,
				class:"tablebody",
				align:"center",
				valign:"middle"
				
			},
			{
				field: 'id',
				sortable: false,
				editable: false,
				visible: false,
			}, 
			{
				field:"courseCode",
				visible:false
			},
			{
				field: 'examInsName',
				title: '考次',
				sortable: false,
				align: 'center',
			}, 
			{
				field: 'yearName',
				title: '学年',
				sortable: false,
				align: 'center',
			}, 
			{
				field: 'termName',
				title: '学期',
				sortable: false,
				align: 'center',
			},{
				field: 'typeName',
				title: '计划类型',
				sortable: false,
				align: 'center'
			},{
				field: 'schoolName',
				title: '学校名称',
				sortable: false,
				align: 'center',
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
				field: 'className',
				title: '班级',
				sortable: false,
				align: 'center'
			},{
				field: 'courseName',
				title: '学科',
				sortable: false,
				align: 'center',
			},{
				field: 'uploadUserName',
				title: '上传人',
				sortable: false,
				align: 'center',
			}
			,{
				field: 'uploadTimeStr',
				title: '上传时间',
				sortable: false,
				align: 'center',
			},{
				field: 'filePath',
				title: '附件下载',
				sortable: false,
				align: 'center',
				formatter:function(value, row, index){
					var fileServerPath = $('#fileServerPath').val();
					var relativePath = $('#relativePath').val();
					var url = fileServerPath + "/"  + relativePath + value;
					return "<a href='"+url+"'>"+value+"</a>";
				}
			}],
	}
}


$('#scoreNoticeTable').bootstrapTable(getTParam());

$('#inses').change(function(){
	$('#scoreNoticeTable').bootstrapTable('refresh', getTParam());
});

$('#classes').change(function(){
	$('#scoreNoticeTable').bootstrapTable('refresh', getTParam());
});

$('#sendScoreSingle').click(function(){
	
	var rows = $('#scoreNoticeTable').bootstrapTable("getSelections");
	if(rows.length==0){
		_msg("请选择一条记录");
		return false;
	}
	var insId = rows[0].examInsId;
	var classId = rows[0].classId;
	var courseCode = rows[0].courseCode;
	var mindex = layer.open({
		type: 1,
		title: '请确认是否发送成绩短信通知？',
		area: ['400px', '200px'],
		shadeClose: false, //点击遮罩关闭
		maxmin: false,
		content: $('#selectSendType').html(),
		 btn: ['确  认', '取  消'],
		 yes: function(){
			 var types = {
				 		"1":false,
				 		"2":false,
				 		"3":false
				 	};
			 $('[name=sendTypes]:checked').each(function(){
			 		var type = $(this).val();
			 		types[type] = true;
			 	});
			 var index = layer.load(1, {
		  		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		  		});
			 var ts = types['1'] + "," + types['2'] + "," +types['3'] ;
			 var url = 'sendScoreSingle?insId='+insId+'&classId='+classId+'&courseCode='+courseCode+"&types="+ts;
		  	
				  	$.ajax({
				  		url : url,
				  		success : function(result) {
				  			if('02'==result.code){
				                      layer.msg('成绩通知发送成功', {
				                             time: 1000, //2s后自动关闭
				                             area: ['220px', '50px']
				                           });
				                      
				                      layer.closeAll();
				                  } else {
				                      layer.msg('成绩通知发送失败', {
				                             time: 1000, //2s后自动关闭
				                             area: ['220px', '50px']
				                           });
				                      layer.closeAll();
				                  }
				  		}
				  	});
		    	
		      }
		      ,btn2: function(){
		        layer.closeAll();
		      }
	});
	
	
	/*var mindex = layer.msg('请确认是否发送成绩短信通知？', {
	    time: 15000, //15s后自动关闭
	    area: ['300px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	    	layer.close(mindex);
	    	
	    	var index = layer.load(1, {
	  		  shade: [0.1,'#fff'] //0.1透明度的白色背景
	  		});
	  	
			  	$.ajax({
			  		url : "sendScoreSum?insId="+insId+"&classId="+classId,
			  		success : function(result) {
			  			if('02'==result.code){
			                      layer.msg('成绩通知发送成功', {
			                             time: 1000, //2s后自动关闭
			                             area: ['220px', '50px']
			                           });
			                      
			                      layer.closeAll();
			                  } else {
			                      layer.msg('成绩通知发送失败', {
			                             time: 1000, //2s后自动关闭
			                             area: ['220px', '50px']
			                           });
			                      layer.closeAll();
			                  }
			  		}
			  	});
	    	
	      }
	      ,btn2: function(){
	        layer.closeAll();
	      }
	  });*/
	
	
});

$('#sumScore').click(function(){
	
	var insId = $('#inses').val();
	var classId = $('#classes').val();
	
	if(insId == null || insId == '' || insId== undefined){
		layer.msg("考次信息不能为空");
		return;
		
	}
	
	if(classId == null || classId == '' || classId== undefined){
		layer.msg("班级信息不能为空");
		return;
		
	}
	
	var index = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
	
	$.ajax({
		url : "toSumScore?insId="+insId+"&classId="+classId,
		success : function(result) {
			if('02'==result.code){
				layer.close(index);
				
                    layer.msg('成绩汇总计算成功', {
                           time: 5000, //2s后自动关闭
                           area: ['220px', '50px']
                         });
                    
                    //layer.closeAll();
                } else {
                	layer.close(index);
                    layer.msg('成绩汇总计算失败', {
                           time: 5000, //2s后自动关闭
                           area: ['220px', '50px']
                         });
                    //layer.closeAll();
                }
		}
	});
});

$('#delScoreBtn').click(function(){
	
	var rows = $('#templatesTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		_msg("请选择一条记录");
		return false;
	}
	var id = rows[0].id;
	layer.msg('是否要删除选该记录？', {
		time: 15000, //15s后自动关闭
		area: ['300px', '100px'],
		btn: ['确  认', '取  消'],
		yes: function(){
			layer.closeAll();
			$.ajax({
    			url : "deleteScoreUpload?id="+id,
    			success : function(result) {
    				if('02'==result.code){
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
   	                 }
    			}
    		});

		}
	,btn2: function(){
		layer.closeAll();
	}
	});

});

$('#uploadScoreBtn').click(function(){
	 
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '上传学生成绩'
        ,area: ['600px', '550px']
        ,maxmin: false
        ,content: 'toScoreUpload'
        ,btn: ['确认', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	var data = window["layui-layer-iframe" + index].callbackdata();
        	//console.log(data);
        	//检查是否已经提交过同样条件成绩单
        	//var upload = false;
        	
        	checkStudentScore( data );
        	//alert(upload);
        	//if(upload){
        	//	uploadStudentScore( data );
        	//}
        	
        }
        ,btn2: function(index, layero){
          layer.closeAll();
        }
        
      });
	
});


$('#previewScore').click(function(){
	
	var rows = $('#scoreNoticeTable').bootstrapTable("getSelections");
	if(rows.length==0){
		_msg("请选择一条记录");
		return false;
	}

	var insId = rows[0].examInsId;
	var classId = rows[0].classId;
	var courseCode = rows[0].courseCode;
	
	var url = 'toScoreSingerPreview?insId='+insId+'&classId='+classId+'&courseCode='+courseCode;
	//console.log(url);
	
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看学生成绩'
        ,area: ['800px', '550px']
        ,maxmin: false
        ,content: url
        
        ,btn: ['关闭'] // 只是为了演示
        ,yes: function(index, layero){
//        	var data = window["layui-layer-iframe" + index].callbackdata();
        	//console.log(data);
        	//检查是否已经提交过同样条件成绩单
        	//var upload = false;
        	//alert(upload);
        	//if(upload){
        	//	uploadStudentScore( data );
        	//}
        	
        }
        ,btn1: function(index, layero){
          layer.closeAll();
        }
        
      });
});

function checkStudentScore( data ){
	
	//console.log(data);
	
	$.ajax({
		url : "checkScoreUpload",
		type: "POST",
            contentType: "application/json",
            dataType:"json",
            async: false,
            data:JSON.stringify(data),
		success : function(result) {
			if('02'==result.code){
				//layer.closeAll();
				uploadStudentScore( data );
                } else {
                	
                	//询问框
            layer.confirm('该成绩单已经存在，是否覆盖？', {
                	  btn: ['覆盖','取消'] //按钮
                	}, function( index ){
                		layer.close( index );
                		
                		data['over'] = true;
                		
                		//console.log(data);
                		/*data.push({
            				'over': true
            			});
            			*/
            			uploadStudentScore( data );
                	}, function( index ){
                		//alert('取消');
                		layer.close( index );
                	});
                	
                	
                }
		}
	});
	
}

function uploadStudentScore( data ){
	
	var index = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
	
	$.ajax({
		url : "saveScoreUploadInfo",
		type: "POST",
          contentType: "application/json",
          dataType:"json",
          data:JSON.stringify(data),
		success : function(result) {
			if('02'==result.code){
				
             	 $('#templatesTable').bootstrapTable('refresh');
                  layer.msg('成绩单保存成功', {
                         time: 1000, //2s后自动关闭
                         area: ['220px', '50px']
                       });
                  layer.closeAll();
              } else {
                  layer.msg('成绩单保存失败', {
                         time: 1000, //2s后自动关闭
                         area: ['220px', '50px']
                       });
              }
		}
	});
	
}

$('#downLoadTemplateBtn').click(function(){
	layer.open({
        type: 2 //此处以iframe举例
        ,title: '选择下载学生信息'
        ,area: ['600px', '400px']
        ,maxmin: false
        ,content: 'toScoreDownLoad'
        ,btn: ['确认', '取消'] //只是为了演示
        ,yes: function(index, layero){
        	
        	var data = window["layui-layer-iframe" + index].callbackdata();
        	//console.log(data);
        	if(data){
        		var schoolCode = data.schoolCode;
        		var grade = data.grade;
        		var classId = data.classId;
        		window.open('downLoadStudents?schoolCode='+schoolCode+'&grade='+grade+'&classId='+classId);
        	}
        	layer.closeAll();
        }
        ,btn2: function(index, layero){
          layer.closeAll();
        }
        
      });
});

