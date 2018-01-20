//招生类型，默认为"全部"
var scheduleType="全部";


//初始加载数据（条件查询）
$(function(){
	searchRecords();
})


//根据招生类型动态加载招生计划
//$("#school").change(function(){
//	//为了避免网络原因造成的级联下拉框更新失败，在校区变化提交后台之前先将招生列表清空。
//	$("#schedule").html("<option value='-1'>全部</option>");
//	schoolId=parseInt($("#school").val());
//	//按学校ID查询招生列表
//	$.get("searchSchedule","scheduleType="+scheduleType,function(result){
//		//alert(JSON.stringify(result));
//		var data=result.data;
//		var $options="<option value='-1'>全部</option>";
//		for(var i=0;i<data.length;i++){
//			var obj=data[i];
//			$options+="<option value='"+obj.scheduleId+"'>"+obj.scheduleName+"</option>";
//		}
//		$("#schedule").html($options);
//	},"json")
//})

//招生类型变化事件，重新赋值招生类型
$("#schedule").change(function(){
	scheduleType=$("#schedule").val();
})


//按条件查询数据(传入招生类型(初一/高一，与数据库中字段一致，直接使用)，起始日期，结束日期)
function searchRecords(){
	//获取起始日期
	var beginDate=$("#beginDate").val();
	//获取结束日期
	var endDate=$("#endDate").val();
	//layer自带功能，页面查询等待效果。
	_wait();
	$.get("searchEnrollDetailByItem",
			"scheduleType="+scheduleType+"&beginDate="+beginDate+"&endDate="+endDate,
			function(result){
			//清除页面layer效果
			layer.closeAll();
//			alert(JSON.stringify(result))
			var str="";
			var data=result.data;
			var rowNum=1;
			for(var i=0;i<data.length;i++){
				var obj=data[i];
				//跳过空的招生计划
				if(obj.scheduleName==null||obj.scheduleName=="null"||obj.baomingNum==0){
				continue;
				}
				str+="<tr><td>"+rowNum+"</td><td>"+obj.schoolName+"</td><td>"+obj.scheduleName
				+"</td><td>"+obj.baomingNum+"</td><td>"+obj.auditNum+"</td><td>"
				+obj.ceshiNum+"</td><td>"+obj.luquNum+"</td><td>"+obj.payNum+"</td><td>"
				+"<a href='studentTypeInit?schoolId="+obj.schoolId+"&scheduleId="+obj.scheduleId
				+"&beginDate="+beginDate+"&endDate="+endDate
				+"' class='btn btn-primary'>查看招生类别</a>"+"</td></tr>";
				rowNum++;
			}
	 //添加表中数据
	$("#data").html(str);
},"json")
}
