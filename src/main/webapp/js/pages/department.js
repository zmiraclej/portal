
function codeNum(arr){
	for(var i = 0;i<arr.length;i++){
		   if(isArray(arr[i]["children"])){
			   $("#treeGrid").jqxTreeGrid('expandRow', arr[i]['code']); 
			   codeNum(arr[i]["children"]);   
		   }else{
			   $("#treeGrid").jqxTreeGrid('expandRow', arr[i]['code']); 
		   }
	   }
}

function isArray(obj){
    return Object.prototype.toString.call(obj) == "[object Array]";
}

$(function(){
	$("#popupWindow").hide();
	$(document).ready(function () {
	_wait();
   	 $.ajax({
            url: "./query",
            type: "POST",
            dataType:"json",
            success: function(result) {
            	layer.closeAll();
           	 	//后台获取的数据
            	var data=result.data;
            	var source =
               {
                   dataType: "json",
                   dataFields: [
                        { name: "name", type: "string" },
                        { name: "code", type: "string" },
                        { name: "children", type: "array" }
                   ],
                   hierarchy:
                   {
                       root: 'children'
                   },
                   id:"code",
                   localData: data
               };
            	//把后台获取的数据处理一下
            	 var dataAdapter = new $.jqx.dataAdapter(source);
            	 //用jqgrid画表格
	               $("#treeGrid").jqxTreeGrid({
	               	   source: dataAdapter,
	                   altRows: true,
	                   columnsResize: true,
	                   ready: function () {
	                	   codeNum(data);
	                   },
	      	            columns: [
	      	            	{ text: '部门编号', dataField: 'code', width: 230 , align: "center"},
	      	          		{ text: '部门名称', dataField: 'name', width: 200 , cellsAlign: 'center', align: "center"},
	      	          		{ text: '操作', width: 250 , cellsAlign: 'center', align: "center", 
	      	          			columnType: 'none', editable: false, sortable: false, dataField: null, 
	      	          			cellsRenderer: function (row) {
	      	          				var row1 = $("#treeGrid").jqxTreeGrid("getRow",row);
	      	          				$("#treeGrid").jqxTreeGrid('expandRow', row1); 
	      	          				var name = row1.name;
	                           return "<div class='btn_div' onclick=\"departmentDelete('"+row+"')\"><i class='fa fa-trash'></i></div>" +
	                           		"<div class='btn_div' onclick=\"departmentUpdate('"+row+"','"+name+"')\"><i class='fa fa-edit'></i></div>" +
	                           		"<div class='btn_div' onclick=\"departmentAddShow('"+row+"')\"><i class='fa fa-plus'></i></div>";
	                        }
	      	          		}
	      	            ],
	      	        });
               $("#contenttreeGrid span:last").hide();
            }
        })
   });
	
});



/*----------------删除方法开始----------------*/
function departmentDelete(row){
	 var url = "./delete?code="+row;
	del_data(url);
}
/*----------------删除方法结束----------------*/


/*----------------添加方法开始----------------*/

//监听方法
$("#addCode").bind(function(){
	$("#addCode").foucs();
	if(event.keyCode == "8" && str){
		
	}
	
})

//添加部门数据
function departmentAddShow(row){
	//拼接以后缀“-”
	var suffix = "-";
	//给部门编号的文本框加编号值
	var str = row + suffix
	$("#addCode").val(str);
	layer.open({
		  type: 1,
		  shade: false,
		  area: ['360px', '210px'], //宽高
		  title: "添加部门", //显示标题
		  content: $('#popupWindow'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
		  cancel: function(){
		  }
	});
	$("#addSave").click(function(){
		var code = $("#addCode").val();
		var name = $("#addName").val();
		if(code != "" && name != ""){
			_wait();
			$.ajax({
				url: "./add?code="+code+"&"+"name="+name,
				type: "GET",
	            dataType:"json",
	            success: function(result) {
	            	layer.closeAll();
	            	if(result.data == "添加失败，请重新输入"){
	            		layer.msg(result.data, {
	                        icon: 2,
	                        time: 1980
	                    });
	            		return false;
	            	}else if(result.data == "输入的部门编号重复，请重新输入"){
	            		layer.msg(result.data, {
	                        icon: 2,
	                        time: 1980
	                    });
	            		return false;
	            	}
	            	else{
	            		layer.msg(result.data, {
	                        icon: 1,
	                        time: 1000
	                    }, function(index) {
	                        window.parent.location.reload();
	                    });	
	            	}
	            }
			});
		}else{
			testCodeData(code);
			testNameData(name);
		}
	});
	$("#Cancel").click(function(){
		$("#popupWindow").hide();
	});
}

//检验输入code数据是否有效
function testCodeData(code){
	if(code == ""){
		
		console.log(code);
		layer.msg("部门编号不能为空！", {
            icon: 2,
            time: 1500
        });
		return false;
	}
}
//检验输入name数据是否有效
function testNameData(name){
	if(name == ""){
		
		layer.msg("部门名称不能为空！", {
            icon: 2,
            time: 1500
        });
		return false;
	}
}

/*----------------添加方法结束----------------*/

/*----------------修改方法开始----------------*/
function departmentUpdate(row,name){
	$("#code").val(row);
	$("#code").attr("disabled","disabled");
	$("#name").val(name);
	layer.open({
		  type: 1,
		  shade: false,
		  area: ['360px', '210px'], //宽高
		  title: "修改部门", //显示标题
		  content: $('#popupUpdate'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
		  cancel: function(){
		  }
	});
	$("#Save").click(function(){
		var code = $("#code").val();
		var name = $("#name").val();
		if(name != ""){
			$("#nameValue").text('');
			_wait();
			$.ajax({
				url: "./update",
				data:{"code":code,"name":name},
				type: "post",
	            dataType:"json",
	            success: function(result) {
	            	layer.closeAll();
	            	if(result.data == "修改失败"){
	            		layer.msg(result.data, {
	                        icon: 2,
	                        time: 1980
	                    });
	            		return false;
	            	}else{
	            		layer.msg(result.data, {
	                        icon: 1,
	                        time: 1000
	                    }, function(index) {
	                        window.parent.location.reload();
	                    });	
	            	}
	            }
			});
		}else{
			
			layer.msg("部门名称不能为空！", {
                icon: 2,
                time: 1500
            })
		}
	});
}



/*----------------修改方法结束----------------*/


