
function initSelectData(data){
	data = $.parseJSON(data);
	var school = new Array();
	var stage = new Array();
	var grade = new Array();
	var course = new Array();
	$.each(data,function(k,v){
		var d = v;
		var param1 = {
				key:k,
				value:v[0].schoolName
		};
		school.push(param1);
		for(var i=0;i<d.length;i++){
			var di = d[i];
			if(di.stage&&di.stage!=='undefined'){
				var stageName = '';
				if(di.stage==1){
					stageName='小学';
				}else if(di.stage==2){
					stageName='中学';
				}else{
					stageName='高中';
				}
				
				var param2 = {
						key:di.stage,
						value:stageName
				};
				stage.push(param2);
			}
			if(di.grade){
				var param3 = {
						key:di.grade,
						value:di.grade+'年级'
				};
				grade.push(param3);
			}
			if(di.courseCode&&di.courseCode!=='undefined'){
				var param4 = {
						key:di.courseCode,
						value:di.courseName
				};
				course.push(param4);
			}
			
		}
	})
	for (var i = 0; i < school.length; i++) {
		var t = $('#_schoolCode option[value="'+school[i].key+'"]');
		if(t.length==0){
			$('#_schoolCode').append('<option value="'+school[i].key+'">'+school[i].value+'</option>');
		}
	}
	for (var i = 0; i < stage.length; i++) {
		var t = $('#_stage option[value="'+stage[i].key+'"]');
		if(t.length==0){
			$('#_stage').append('<option value="'+stage[i].key+'">'+stage[i].value+'</option>');
		}
	}
	for (var i = 0; i < grade.length; i++) {
		var t = $('#_grade option[value="'+grade[i].key+'"]');
		if(t.length==0){
			$('#_grade').append('<option value="'+grade[i].key+'">'+grade[i].value+'</option>');
		}
		}
	for (var i = 0; i < course.length; i++) {
		var t = $('#_course option[value="'+course[i].key+'"]');
		if(t.length==0){
			$('#_course').append('<option value="'+course[i].key+'">'+course[i].value+'</option>');
		}
	}
}


function getTParam(){
	return {
		pagination:"true",
		url:"pageScores",
		search:false,
		sidePagination:"server",
		height:500,
		striped:true,
		clickToSelect:true,
		singleSelect:true,
		toolbar:"#templatesToolbar",
		toolbarAlign:"right",
		queryParams: function queryParams(params){
			return { 
				limit : params.limit,
				offset : params.offset,
				sort : params.sort,
				order : params.order };
		},
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
			}/*,{
				field: 'url',
				title: '下载',
				sortable: false,
				align: 'center',
				formatter:function(value, row, index){
					if(value){
						return "<a href='http://iportal.jxfls.com:8000/wtrj/plan/save/"+value+"' download='"+value+"'>"+value+"</a>";  
					}else{
						return "--";
					}
				}
			}*/
			],
	}
}
$('#templatesTable').bootstrapTable(getTParam());

$('#deleteScoreBtn').click(function(){
	
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
   	                     layer.msg('成绩单删除成功', {
   	                            time: 1000, //2s后自动关闭
   	                            area: ['220px', '50px']
   	                          });
   	                 } else {
   	                     layer.msg('成绩单删除失败', {
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
        ,area: ['800px', '600px']
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
            	  var msg = '成绩单保存失败,'+result.msg;
                  layer.msg(msg, {
                         time: 5000, //2s后自动关闭
                         area: ['500px', '200px']
                       });
                  layer.close(index);
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

