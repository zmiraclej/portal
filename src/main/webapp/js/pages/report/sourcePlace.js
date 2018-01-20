// 加载DOM，并且返回按钮
var domSourcePlace = document.getElementById("containerSourcePlace"); // dom加载容器
var myChartSourcePlace = echarts.init(domSourcePlace); // 初始化容器

function refreshGrade(schoolCode, query){

	$.ajax({
		type : "GET",
		url : "searchZsGradeInfo?schoolCode="+schoolCode,
		dataType : "json",
		success : function(result) {
			if ("02" == result.code) {
				var grades = result.data;
				$("#zsGrade").empty();// 清空下拉菜单节点
				for (var i = 0; i < grades.length; i++) {
					var $opt = $("<option value=" + grades[i].key + ">" + grades[i].value
							+ "</option>");// 添加年份节点
					$("#zsGrade").append($opt);
				}
				
				if(query){
					
					var optionSourcePlace = drillDownSourcePlace.getOption();
					drillDownSourcePlace.initChart(myChartSourcePlace, optionSourcePlace);
				}
			} else if ("01" == result.code) {

			}
		}
	});

}

$.ajax({ // 动态添加学校
	type : "GET",
	url : "searchZsRoleSchoolInfo",
	dataType : "json",
	success : function(result) {
		if ("02" == result.code) {
			var schools = result.data;
			$("#school").empty();// 清空下拉菜单节点
			for (var i = 0; i < schools.length; i++) {
				var $opt = $("<option value='" + schools[i].schoolCode + "'>" + schools[i].schoolName
						+ "</option>");// 添加年份节点
				$("#school").append($opt);
			}
			
			if($("#school").val() != null){
				refreshGrade($("#school").val(), true);
			}
		} else if ("01" == result.code) {

		}
	}
});

//根据学校加载招生计划
$("#school").change(function(){
	
	refreshGrade($("#school").val(), false);
})


// 定义的下钻函数
var drillDownSourcePlace = {

	getOption : function() {
		var option = null;
		option = {
			title : {
//				text : '生源地统计TOP10',
				left : 'center'
			},
			// 设置饼图的颜色显示，会按照顺序依次去取颜色
			 color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
			tooltip : {
				trigger : 'item',
				formatter : '{a}<br/>{b} : {c}'
			},
			legend : {
				left : 'left',
				data : [ '年数据' ]
			},
			grid : {
				top:'100px',
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			series : [ {
				name : '年数据',
				type : 'pie',
				data : []
			} ],
			label : { // 显示数据
				normal : {
					show : true,

					position : 'top'
				}
			}
		};

		return option;
	},

	// 第一层初始化函数
	initChart : function(myChart, option) {

		var me = this;
		
		myChart.setOption(option);
		// 第一层异步加载数据
		
		var a = [];
		//生源地
		a[0] = [];
		//录取人数
		a[1] = [];
		//标题
		a[2] = "生源地统计TOP10";
		
		
		var schoolCode = $('#school').val();// 选中校区的值
		var zsGrade = $('#zsGrade').val();// 选中招生类别的值
		var year = $('#year').val();// 选中年份的值
		
		var param = {};
		param['schoolCode'] = schoolCode;
		param['zsGrade'] = zsGrade;
		param['year'] = year;
		console.log(param);
 		$.ajax({
			type : "POST",
			url : "sourcePlaceSearch",
			contentType: "application/json",
			dataType : "json",
			data:JSON.stringify(param),
			success : function(result) {
				var data=result.data;
				for(var i=0;i<data.length;i++){
					a[0][i]=data[i].fullName;
					a[1][i]=data[i].luquNum;
				}
				
				option.series[0].type = 'pie';// 设置类型为饼图
				option.series[0].radius = [0,'45%'];
//				option.title.text = a[2];// 设置标题
				//设置提示框的内容。{a}表示系列名，即option.series.name,此处不需要，已去掉
				option.tooltip.formatter = '{b} : {c} ({d}%)';
				option.legend.orient = 'vertical';// 图例竖直放
				option.legend.show = false;// 隐藏图例
				option.label.normal.formatter = function(params){
				       return params.name + '\n' + params.value + '人'+ '\n' + params.percent+"%)";
				};//显示数据
				
				var data = []; // 饼状图所有数据
				var legendData = [];
				for (var i = 0; i < a[0].length; i++) {
					data[i] = {
						value : a[1][i],
						name : a[0][i]
					};
					legendData[i] = a[0][i];
				}

				option.series[0].data = data;// 所有数据
				option.legend.data = legendData;// 数据名称，必须和
												// option.series[0].data中name属性相同

				option.xAxis = null;
				option.grid = null;
				option.yAxis = null;

				myChart.setOption(option, true);
//				layer.closeAll();
			}
		});
	},

};

$("#btn").click(function(){
	var domSourcePlace = document.getElementById("containerSourcePlace"); // dom加载容器
	var myChartSourcePlace = echarts.init(domSourcePlace); // 初始化容器
	var optionSourcePlace = drillDownSourcePlace.getOption();
	drillDownSourcePlace.initChart(myChartSourcePlace, optionSourcePlace);
})
