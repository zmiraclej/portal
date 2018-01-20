var financial_index2;// 每一层的标识，第一层为1，第2层为2
var financial_xkey2;// 点击柱状图形所在的键（点第一层）
var financial_xkey3;// 点击饼图形所在的键（点第二层）
var financialyearAll = null;// 某一年，全局变量

var segementName;
var orgName;
var orgNickName;


var orgNum = 0;
var segementNum = 0;

$.ajax({ // 动态添加年份
	type : "POST",
	url : "./financial/searchYers",
	dataType : "json",
	success : function(result) {
		if ("02" == result.code) {
			var years = result.data;
			$("#financialYearReport2").empty();// 清空下拉菜单节点
			for (var i = 0; i < years.length; i++) {
				var $opt = $("<option value=" + years[i] + ">" + years[i]
						+ "</option>");// 添加年份节点
				$("#financialYearReport2").append($opt);
			}
		} else if ("01" == result.code) {

		}
	}
});

$('#financialYearReport2').bind('change', function() { // 点击年份单击事件，重新初始化
	var yearNow = $(this) .val();//选中的值
	financialyearAll = yearNow;
	echarts.dispose(financial_dom2);// 返回必须销毁销毁dom
	financial_myChart2 = echarts.init(financial_dom2); // 初始化容器
	financial_option2 = financial_drilldown2.getOption();
	financial_drilldown2.initChart(financial_myChart2, financial_option2);

});


// 定义的下钻函数
var financial_drilldown2 = {

	// 第三层初始化
	initChart3 : function(myChart) {
		echarts.dispose(financial_dom2);// 销毁dom
		myChart = echarts.init(financial_dom2);

		var yearNow = $('#financialYearReport2 option:selected').val();//选中的值

		var p = {};
		p['year'] = yearNow;
		p['orgNickName'] = orgNickName;

		// 发起异步请求
		$.ajax({
			type : "POST",
			url : "./financial/searchFinancialBySomeOrgName",
			dataType : "json",
			contentType: "application/json",
			data : JSON.stringify(p),
			success : function(result) {
				if ("02" == result.code) {
					var respFinancial = result.data;
					var a = [];
					a[0] = respFinancial.nameList;
					a[1] = respFinancial.valueList;
					a[2] = yearNow + "年" + orgName + "财务费用分布";
					
					var option = getPieOption();
					
					option.series[0].type = 'pie';
					option.series[0].name = orgName + '公司财务数据(万元)';
					option.tooltip.formatter = '{a}<br/>{b} : {c} ({d}%)';
					option.legend.orient = 'vertical';// 竖直放
					option.label.normal.formatter = '{b} : {c} ({d}%)';// 柱状图显示数据

					var data = []; // 饼状图所有数据
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
//						legendData[i] = a[0][i];
					}
					option.series[0].data = data;// 所有数据
					option.legend.data = legendData;// 数据名称，必须和
					// option.series[0].data中name属性相同

					myChart.setOption(option, true);
					financial_index2 = 3;// 第三层标识

				} else if ("01" == result.code) {

				}
			}
		});

	},

	// 第二层初始化
	initChart2 : function(myChart, option) {
		var me = this;
		echarts.dispose(financial_dom2);// 销毁dom
		myChart = echarts.init(financial_dom2);// 初始化demo

		var yearNow = $('#financialYearReport2 option:selected') .val();//选中的值
		var project = segementName;
		
		// 发起异步请求
		$.ajax({
			type : "POST",
			url : "./financial/searchFinancialBySomeProject",
			dataType : "json",
			data : {
				"year" : yearNow,
				"project" : project
			},
			success : function(result) {
				if ("02" == result.code) {
					var respFinancial = result.data;

					var a = [];
					a[0] = respFinancial.nameList;
					a[1] = respFinancial.valueList;
					a[2] = yearNow + "年各公司财务费用分布";

					var option = getPieOption();
					option.series[0].type = 'pie';
					option.series[0].name = project + '板块财务数据(万元)';
					option.tooltip.formatter = '{a}<br/>{b} : {c} ({d}%)';
					option.legend.orient = 'vertical';// 竖直放
					option.label.normal.formatter = '{b} : {c} ({d}%)';// 柱状图显示数据

					var data = []; // 饼状图所有数据
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
//						legendData[i] = a[0][i];
					}
					option.series[0].data = data;// 所有数据
					// option.legend.data=legendData;
					// 数据名称，必须和
					// option.series[0].data中name属性相同

					option.xAxis = null;
					option.grid = null;
					option.yAxis = null;
					myChart.setOption(option, true);
					financial_index2 = 2;// 第二层标识
					// 第三层钻取
					myChart.on('click', function(object) {
						$('#return-buttonFinancialReport2').show();
						
						orgNickName = object.name;

						me.initChart3(myChart, option)

					});

				} else if ("01" == result.code) {

				}
			}
		});

	},

	// 第一层初始化函数
	initChart : function(myChart) {
		var me = this;
		// 第一层异步加载数据

		$.ajax({
			type : "GET",
			url : "./financial/serchFinancialGroupByProject",
			dataType : "json",
			data : {
				"year" : financialyearAll
			},
			success : function(result) {
				if ("02" == result.code) {
					var respFinancial = result.data;
					// 赋值

					var a = [];

					a[0] = respFinancial.nameList;
					a[1] = respFinancial.valueList;
					a[2] = respFinancial.year + "年集团板块财务费用分布";

					var option = getPieOption();
					option.series[0].type = 'pie';
					option.tooltip.formatter = '{a}<br/>{b} : {c} ({d}%)';
					option.legend.orient = 'vertical';// 竖直放
					option.label.normal.formatter = '{b} : {c} ({d}%)';// 柱状图显示数据

					var data = []; // 饼状图所有数据
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
					}
					option.series[0].data = data;// 所有数据

					option.xAxis = null;
					option.grid = null;
					option.yAxis = null;

					myChart.setOption(option, true);
					financial_index2 = 1;// 第一层标识
					// 第二层钻取点击事件
					myChart.on('click', function(object) {
						$('#return-buttonFinancialReport2').show();
						segementName = object.name;
						me.initChart2(myChart, option);
					});
				} else if ("01" == result.code) {

				}
			}
		});

	},
};

// 加载DOM，并且返回按钮
var financial_dom2 = document.getElementById("containerFinancialReport2"); // dom加载容器
var financial_myChart2 = echarts.init(financial_dom2); // 初始化容器

$.ajax({
	type : "GET",
	url : "/jx-web-portal/searchNcOrgOfUser",					
	dataType : "json",
	success : function(result) {
		if ("02" == result.code){
			orgNum = result.data.orgNum;
			segementNum = result.data.segementNum;
			
			orgName = result.data.orgName;
			orgNickName = result.data.orgNickName;
			segementName = result.data.segementName;
			
			if(segementNum > 1){
				$('#chartTitle1').html("集团 - 板块期间费用分析");
				
				$('#segementChart').show();
				financial_myChart2 = echarts.init(financial_dom2); 
				financial_drilldown2.initChart(financial_myChart2);
			} else if (orgNum > 1) {
				$('#chartTitle1').html(segementName+ "板块 - 各公司薪酬构成分析");
				
				$('#segementChart').show();
				financial_myChart2 = echarts.init(financial_dom2); 
				financial_drilldown2.initChart2(financial_myChart2);
			} 
		}
	}
});



$('#return-buttonFinancialReport2').on('click', function() { // 返回按钮加载事件，重新初始化
	if (financial_index2 == 1) {// 第一层无操作

		return;
	}
	echarts.dispose(financial_dom2);// 返回必须销毁销毁dom
	financial_myChart2 = echarts.init(financial_dom2); // 初始化容器

	if (financial_index2 == 3 && orgNum > 1) {// 第三层返回第二层
		if (segementNum == 1){
			$('#return-buttonFinancialReport2').hide();
		}
		
		financial_drilldown2.initChart2(financial_myChart2, getOption())// 初始化第二层
	} else if (financial_index2 == 2 && segementNum > 1) {// 第二层返回第一层
		$('#return-buttonFinancialReport2').hide();
		// 初始化第一层
		financial_drilldown2.initChart(financial_myChart2);
	}

});

//自适应窗口大小
$(window).resize(function(){
	
	financial_myChart1.resize();
	financial_myChart2.resize();
});