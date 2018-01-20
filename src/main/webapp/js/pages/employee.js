
//定义时间格式
var formatStr = "yyyy-MM-dd";
	
//向后台获取数据
function cutPage(pageNo,employeeNameStr){
	_wait();
	$.ajax({
		url: "./employeeSelect",
		data:{"pageNo":pageNo,
			"pageSize":pageSize,
			"employeeNameStr":employeeNameStr},
		type: "post",
	    dataType:"json",
	    success: function(result) {
	    	layer.closeAll();
	    	var tableStr = "";
	    	//出生日期
    		var birthday = "";
    		//毕业时间
    		var graduateTime = "";
	    	for(var i=0;i<result.data.records.length;i++){
	    		var table = result.data.records[i];
	    		birthday = formatDate(table.birthday,formatStr);//格式化时间
	    		graduateTime = formatDate(table.birthday,formatStr);
	    		//页面元素取值
	    		tableStr += "<tr>"+
					    		"<td>"+table.employeeNumber+"</td>"+
					    		"<td>"+table.name+"</td>"+
					    		"<td>"+table.englishName+"</td>"+
					    		"<td>"+table.sex+"</td>"+
					    		"<td>"+table.phone+"</td>"+
					    		"<td>"+table.registeredPermanentResidence+"</td>"+
					    		"<td>"+table.workingYears+"</td>"+
					    		"<td>"+table.nativePlace+"</td>"+
					    		"<td>"+table.nation+"</td>"+
					    		"<td>"+table.politicalStatus+"</td>"+
					    		"<td>"+table.maritalStatus+"</td>"+
					    		"<td>"+table.graduateSchool+"</td>"+
					    		"<td>"+graduateTime+"</td>"+
					    		"<td>"+table.major+"</td>"+
					    		"<td>"+table.degree+"</td>"+
					    		"<td>"+table.age+"</td>"+
					    		"<td>"+birthday+"</td>"+
					    		"<td>"+table.belongUnit+"</td>"+
					    	"</tr>"
	    	}
	    	//添加表中数据 
			$("#data").html(tableStr);
			//设置总页数
			pageCount = result.data.count;
			$("#pageCount").val(pageCount);
			//设置总条数
			totalCount = result.data.totalCount;
			$("#totalCount").val(totalCount);
			//设置翻页按钮
			SetPageInfo(pageCount,totalCount);
	    }
	});
}

//格式化时间的方法
function formatDate(date,format){
	var date = new Date(date).Format(format);
	return date;
}

