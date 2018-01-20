$.ajaxSetup({  
    async : false  
});
var searchRole=$('#_role').val();
var searchClassId = $('#_class').val();

function getTParam(){
	searchClassId = $('#_class').val();
	console.log(searchRole);
	console.log(searchClassId);
	return {
		pagination:"true",
		url:"searchIns",
		//search:true,
		pagination:true,
		sidePagination:"server",
		height:550,
		striped:true,
		clickToSelect:true,
		singleSelect:true,
		toolbar:"#insToolbar",
		toolbarAlign:"right",
		pageSize:10,
		pageList:[5,10,20],
		//queryParamsType:'limit',
		queryParams: function queryParams(params){
			return { 
				limit : params.limit,
				offset : params.offset,
				search : params.search,
				sort : params.sort,
				order : params.order,
				schoolCode : $('#_school').val(),
				role : searchRole,
				classId : searchClassId };
		}, 
		columns: [
			{
				field: 'id',
				sortable: false,
				editable: false,
				visible: false
			},{
				field: '',
				checkbox: true,
			},{
				field: 'stuName',
				title: '学生姓名',
				sortable: false,
				align: 'center',
				width : '20%',
				cellStyle: 'formatTableUnit',
			},{
				field: 'recType',
				title: '实例类型',
				sortable: false,
				align: 'center',
				formatter:function(value,row,index){
					if(value=="01"){
						return "学生记录";
					}
					if(value=="02"){
						return "老师记录";
					}
				}
			},{
				field: 'stdName',
				title: '评分名称',
				sortable: false,
				align: 'center',
			},{
				field: 'schoolName',
				title: '学校',
				sortable: false,
				align: 'center',
			},{
				field: 'className',
				title: '班级',
				sortable: false,
				align: 'center',
			},{
				field: 'courseName',
				title: '学科',
				sortable: false,
				align: 'center',
			},{
				field: 'recDateText',
				title: '记录日期',
				sortable: false,
				align: 'center',
			},{
				field: 'actScore',
				title: '得分',
				sortable: false,
				align: 'center',
			},{
				field: 'authResult',
				title: '状态',
				sortable: false,
				align: 'center',
				formatter:function(value,row,index){
					if(value=="01"){
						return "直接确认";
					}
					if(value=="02"){
						return "修改确认";
					}
					if(value=="03"){
						return "纪录作废";
					}
					if(value==null){
						return "未审核";
					}
				}
			}
			],
	}
}

$('#insTable').bootstrapTable(getTParam());





$('#reviewIns').on('click',function(){
	var rows = $('#insTable').bootstrapTable("getAllSelections");
	if(rows.length==0){
		layer.alert('请选择一条记录');
		return;
	}
	var insId = rows[0].id
	var index = layer.open({
		type: 1,
		title: '教师审核',
		area: ['750px', '550px'],
		shadeClose: false,
		maxmin: false,
		content: $('#reviewInsContent')
	});
	resetForm2();
	getIns(insId,0);
});

$('#viewIns').on('click',function(){
	var rows = $('#insTable').bootstrapTable("getSelections");
	if(rows.length==0){
		layer.alert('请选择一条记录');
		return;
	}
	var insId = rows[0].id;
	console.log(insId);
	var index = layer.open({
		type: 1,
		title: '实例详情',
		area: ['650px', '550px'],
		shadeClose: false,
		maxmin: false,
		content: $('#viewInsContent')
	});
	getIns(insId,1);
});

$('#addIns').on('click',function(){

	var index = layer.open({
		type: 1,
		title: '教师补录',
		area: ['750px', '550px'],
		shadeClose: false,
		maxmin: false,
		content: $('#insAddContent')
	});

});
layui.use('form', function(){
	var form = layui.form();
	form.render();
	 //自定义验证规则
	  form.verify({
		stdCode: function(value){
	      if(value.length < 1){
	        return '请选择评分标准';
	      }
	    }
	    ,studentId: [ /^\+?[1-9]\d*$/, '请选择学生姓名']
	    ,content:function(value){
	    	if(value.length > 255){
		        return '实例内容最大为255个字符';
		      }
	    	if(value.length == 0){
	    		return '请填写实例内容';
	    	}
	    },alterContent:function(value){
	    	if(value.length > 255){
		        return '实例修改内容最大为255个字符';
		      }
	    },authContent:function(value){
	    	if(value.length > 255){
		        return '教师评价内容最大为255个字符';
		      }
	    },actScore: [ /^\+?[0-9][0-9]*$/, '请输入正整数']
	  });
	  
	 /* $('#submit-btn').click(function(){
		  alert("点击了$$$");
	  });*/

	  form.on('submit(formDemo)', function(data){
		  console.log(data);
		  var jsonParam = JSON.stringify(data.field);
		    $.ajax({
		    	type : "POST",
		    	url : "saveIns",
		    	contentType: "application/json", 
		    	dataType : "text",
		    	data:jsonParam,
		    	success : function(result) {
		    		if(result=='创建成功'){
		    			layer.closeAll();
		    			//reset信息
		    			resetForm();
		    			$('#insTable').bootstrapTable(  
	    		              "refresh",  
	    		              {  
	    		                  url:"searchIns"
	    		              }  
		    		      ); 
		    		}
		    	}
		    });
		    return false;
	  });
	  
	  form.on('submit(formDemo1)', function(data){
		  var min = parseInt($('#minScore').val());
		  var max = parseInt($('#maxScore').val());
		  var score = parseInt($('#_actScore').val());
		  var jsonParam = JSON.stringify(data.field);
		  var flag = false;
		  if($("#_authResult").val() != '03'){
			  if(score < min || score > max){
				  layer.open({
					  title: '提示'
					  ,content: '请输入正确的分数'
					}); 
				  return false;
			  }else{
				    $.ajax({
				    	type : "POST",
				    	url : "updateIns",
				    	contentType: "application/json", 
				    	dataType : "text",
				    	data:jsonParam,
				    	success : function(result) {
				    		if(result=='审核成功'){
				    			layer.closeAll();
				    			$('#insTable').bootstrapTable(  
			    		              "refresh",  
			    		              {  
			    		                  url:"searchIns"
			    		              }  
				    		      ); 
				    			resetForm2();
				    		}
				    	}
				    });
				    return false;
				  }
		  }else{
			  $.ajax({
			    	type : "POST",
			    	url : "updateIns",
			    	contentType: "application/json", 
			    	dataType : "text",
			    	data:jsonParam,
			    	success : function(result) {
			    		if(result=='审核成功'){
			    			layer.closeAll();
			    			$('#insTable').bootstrapTable(  
		    		              "refresh",  
		    		              {  
		    		                  url:"searchIns"
		    		              }  
			    		      ); 
			    			resetForm2();
			    		}
			    	}
			    });
			    return false;
		  }
		  
	  });
	  
	  form.on('submit(formDemo2)', function(data){
		  layer.closeAll();
		  return false;
	  });
	  
	  
	  form.on('select(stu_school)',function(data){
		  findTeacherRolesAdd();
	  })
	  form.on('select(stu_role)',function(data){
		  findTeacherClasssAdd();
		  if($("#_stu_role").find("option:selected").text() == "任课教师"){
			  $("#courseBox").show();
		  }else{
			  $("#courseBox").hide();
		  }
	  })
	  form.on('select(stu_class)',function(data){
		  var searchName = $('#searchName').val();
		  	findStudents(searchName);
	  })
	  /*form.on('select(stu_school)',function(data){
		  
	  })*/
	//补录界面下拉框联动
	  /*$('#_stu_school').on('change', function(){
	  	findTeacherRolesAdd();
	  });*/

	  /*$('#_stu_role').on('change', function(){
	  	//判断是否为任课老师
	  	if($('#_stu_role').val()=='1'){
	  		$('#courseBox').show();
	  	}else{
	  		$('#courseBox').hide();
	  	}
	  	findTeacherClasssAdd();
	  });*/

	  /*$('#_stu_class').on('change',function(){
	  	var searchName = $('#searchName').val();
	  	findStudents(searchName);
	  });*/
	  
	  window.findStudents = function(searchName) {
		  form.render();
	  	//清空
	  	$("#stuName").empty();
	  	var schoolCode = $("#_stu_school").val();
	  	var classId = $("#_stu_class").val();
	  	$.get("findStudentsByTidByName", {
	  		"searchName" : searchName, "schoolCode" : schoolCode, "classId" : classId
	  	}, function(data) {
	  		//console.log(data);
	  		if(data.length>0){
	  			$.each(data, function(index, element) {
	  				$("#stuName").append(
	  						"<option value="+element.id+">" + element.name + '['+element.className+']'
	  								+ "</option>")
	  			})	
	  		}else{
	  			$("#stuName").append(
	  					"<option value='0'>没有搜索结果</option>")
	  		}
	  		/*var form = layui.form();*/
	  		form.render();
	  	});
	  }


	  function findTeacherRolesAdd(){
	  	
	  	var schoolCode = $("#_stu_school").val();
	  	//console.log(schoolCode);
	  	$.get("ins/findTeacherRoles", {
	  		"schoolCode" : schoolCode
	  	}, function(data) {
	  		$("#_stu_role").empty();
	  		if(data.length>0){
	  			var i = 0;
	  			$.each(data, function(index, element) {
	  				/*console.log(element.name);*/
	  				if(element.name == "任课教师" && i==0){
	  					$("#courseBox").show();
	  				}
	  				if(element.name != "任课教师" && i==0){
	  					$("#courseBox").hide();
	  				}
	  				$("#_stu_role").append(
	  						"<option value="+element.id+">" + element.name 
	  								+ "</option>")
	  				i=i+1;
	  			})	
	  		}else{
	  			$("#courseBox").hide();
	  			$("#_stu_role").append(
	  					"<option value='0'>没有搜索结果</option>")
	  		}
	  		/*var form = layui.form();*/
	  		form.render();
	  	});
	  	findTeacherClasssAdd();
	  	
	  }

	  function findTeacherClasssAdd(){
	  	var schoolCode = $("#_stu_school").val();
	  	var role = $("#_stu_role").val();
	  	
	  	$.get("ins/findTeacherClasss", {
	  		"schoolCode" : schoolCode, "role" : role
	  	}, function(data) {
	  		$("#_stu_class").empty();
	  		if(data.length>0){
	  			
	  			$.each(data, function(index, element) {
	  				$("#_stu_class").append(
	  						"<option value="+element.classId+">" + element.className 
	  								+ "</option>")
	  			})	
	  		}else{
	  			$("#_stu_class").append(
	  					"<option value='0'>没有搜索结果</option>")
	  		}
	  		/*var form = layui.form();*/
	  		form.render();
	  		var searchName = $('#searchName').val();
	  		findStudents(searchName);
	  	});
	  }
	  
});

//学生名字查找
$('#searchName').on('input',function(){
	  var searchName = $('#searchName').val();
	  findStudents(searchName);
});


$('#_school').on('change', function(){
	findTeacherRoles();
});

$('#_role').on('change', function(){
	findTeacherClasss();
});

$('#_class').on('change', function(){
	
	 $('#insTable').bootstrapTable('refresh',getTParam());
});


function findTeacherRoles(){
	
	var schoolCode = $("#_school").val();
	
	$.get("ins/findTeacherRoles", {
		"schoolCode" : schoolCode
	}, function(data) {
		$("#_role").empty();
		if(data.length>0){
			$.each(data, function(index, element) {
				$("#_role").append(
						"<option value="+element.id+">" + element.name 
								+ "</option>")
			});
			searchRole = data[0].id;
		}else{
			searchRole='0';
			$("#_role").append(
					"<option value='0'>没有搜索结果</option>")
		}
		/*var form = layui.form();
		form.render();*/
	});
	findTeacherClasss();
}

function findTeacherClasss(){
	var schoolCode = $("#_school").val();
	var role = $("#_role").val();
	
	$.get("ins/findTeacherClasss", {
		"schoolCode" : schoolCode, "role" : role
	}, function(data) {
		$("#_class").empty();
		if(data.length>0){
			$.each(data, function(index, element) {
				$("#_class").append(
						"<option value="+element.classId+">" + element.className 
								+ "</option>")
			})	
			searchClassId=data[0].classId;
			searchRole=role;
		}else{
			searchClassId='0';
			$("#_class").append(
					"<option value='0'>没有搜索结果</option>")
		}
		/*var form = layui.form();
		form.render();*/
		
		 $('#insTable').bootstrapTable('refresh',getTParam());
	});
}

/*function findStudents(searchName) {
		//清空
		$("#stuName").empty();
		var schoolCode = $("#_stu_school").val();
		$.get("findStudentsByTidByName", {
			"searchName" : searchName, "schoolCode" : schoolCode
		}, function(data) {
			//console.log(data);
			if(data.length>0){
				$.each(data, function(index, element) {
					$("#stuName").append(
							"<option value="+element.id+">" + element.name + '['+element.className+']'
									+ "</option>")
				})	
			}else{
				$("#stuName").append(
						"<option value='0'>没有搜索结果</option>")
			}
			var form = layui.form();
			form.render();
		});
	}*/

/*function findStuGrades(){
	var schoolCode = $("#_stu_school").val();
	var dy = $("#dy").val();
	
	var url = "template/findGrades";
	
	if(dy == "1"){
		url = "changeGradesBySchoolCode";
	}
	
	 $.ajax({
	    	type : "POST",
	    	url : url + "?schoolCode="+schoolCode,
	    	success : function(result) {
	    		//console.log(result);
	    		var html = "";
	    		
	    		if(result != null && result.length > 0 ){
	    			for(i=0;i<result.length;i++){
	    				html += '<option value="'+result[i].grade+'">'+result[i].grade+' 年级</option>';
	    			}
	    			
	    			$('#_stu_grade').empty();
	    			$('#_stu_grade').html(html);
	    			//form.render('select', '_stu_grade');
	    			//form.render();
	    		
	    		}
	    		
	    	}
	    });
	
}*/
$(function(){
	//判断是否为任课老师
	if($("#_stu_role").val()=='1'){
		$('#courseBox').show();
	}
	$('#submit-btn').click(function() {
		var className = $("#_stu_class").find("option:selected").text();
		var schoolName = $("#_stu_school").find("option:selected").text();
		var courseName = $('#_stu_course').find("option:selected").text();
		$("#schoolName").val(schoolName);
		$("#courseName").val(courseName);
		$("#className").val(className);
		if($('#_stu_role').val() != 1){
			$('#_stu_course').val(null);
			$("#courseName").val(null);
		}
	});
});

