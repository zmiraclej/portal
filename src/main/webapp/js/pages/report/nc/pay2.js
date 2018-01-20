var pay_index2;// 每一层的标识，第一层为1，第2层为2
var pay_xkey2;// 点击柱状图形所在的键（点第一层）
var pay_xkey3;// 点击饼图形所在的键（点第二层）
var payYearAll = null;// 某一年，全局变量

$.ajax({ // 动态添加年份
	type : "POST",
	url : "./pay/searchYers",
	dataType : "json",
	success : function(result) {
		if ("02" == result.code) {
			var years = result.data;
			$("#payYearReport2").empty();// 清空下拉菜单节点
			for (var i = 0; i < years.length; i++) {
				var $opt = $("<option value=" + years[i] + ">" + years[i]
						+ "</option>");// 添加年份节点
				$("#payYearReport2").append($opt);
			}
		} else if ("01" == result.code) {

		}
	}
});

$('#payYearReport2').bind('change', function() { // 点击年份单击事件，重新初始化
	var yearNow = $(this) .val();//选中的值
	payYearAll = yearNow;
	echarts.dispose(pay_dom2);// 返回必须销毁销毁dom
	pay_myChart2 = echarts.init(pay_dom2); // 初始化容器
	pay_option2 = pay_drilldown2.getOption();
	pay_drilldown2.initChart(pay_myChart2, pay_option2);

});
// 定义的下钻函数
var pay_drilldown2 = {

	// 第三层初始化
	initChart3 : function(myChart) {
		echarts.dispose(pay_dom2);// 销毁dom
		myChart = echarts.init(pay_dom2);

		var yearNow = $('#payYearReport2 option:selected') .val();//选中的值

		var orgName = pay_xkey3;
		// 发起异步请求
		$.ajax({
			type : "POST",
			url : "./pay/searchPayBySomeOrgName",
			dataType : "json",
			data : {
				"year" : yearNow,
				"orgNickName" : orgNickName
			},
			success : function(result) {
				if ("02" == result.code) {
					var resppay = result.data;

					var a = [];
					a[0] = resppay.nameList;
					a[1] = resppay.valueList;
					a[2] = yearNow + "年" + orgName + "薪酬构成分布";

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
//						legendData[i] = a[0][i];
					}
					option.series[0].data = data;// 所有数据
					option.series[0].name = orgName + '薪酬构成数据(万元)';// 所有数据
					option.legend.data = legendData;// 数据名称，必须和
					// option.series[0].data中name属性相同

					option.xAxis = null;
					option.grid = null;
					option.yAxis = null;

					myChart.setOption(option, true);
					pay_index2 = 3;// 第三层标识

				} else if ("01" == result.code) {

				}
			}
		});

	},

	// 第二层初始化
	initChart2 : function(myChart) {
		var me = this;
		echarts.dispose(pay_dom2);// 销毁dom
		myChart = echarts.init(pay_dom2);// 初始化demo

		var yearNow = $('#payYearReport2 option:selected') .val();//选中的值
		var project = pay_xkey2;
		// 发起异步请求
		$.ajax({
			type : "POST",
			url : "./pay/searchPayBySomeProject",
			dataType : "json",
			data : {
				"year" : yearNow,
				"project" : segementName
			},
			success : function(result) {
				if ("02" == result.code) {
					var resppay = result.data;

					var a = [];
					a[0] = resppay.nameList;
					a[1] = resppay.valueList;
					a[2] = yearNow + "年各校区薪酬构成分布";

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
//						legendData[i] = a[0][i];
					}
					option.series[0].data = data;// 所有数据
					option.series[0].name = project + '板块薪酬构成数据(万元)';// 所有数据
					// option.legend.data=legendData;
					// 数据名称，必须和
					// option.series[0].data中name属性相同

					myChart.setOption(option, true);
					pay_index2 = 2;// 第二层标识
					// 第三层钻取
					myChart.on('click', function(object) {
						$('#returnBtn1').show();
						
						orgNickName = object.name;

						me.initChart3(myChart)

					});

				} else if ("01" == result.code) {

				}
			}
		});

	},

	// 第一层初始化函数
	initChart : function(myChart) {
		pay_index2 = 1;// 第一层标识
		var me = this;

		// 第一层异步加载数据
		$.ajax({
			type : "GET",
			url : "./pay/searchPayGroupByProject",
			dataType : "json",
			data : {
				"year" : payYearAll
			},
			success : function(result) {
				if ("02" == result.code) {

					var resppay = result.data;
					// 赋值

					var a = [];

					a[0] = resppay.nameList;
					a[1] = resppay.valueList;
					a[2] = resppay.year + "年集团板块薪酬构成分布";

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
					pay_index2 = 1;// 第一层标识
					// 第二层钻取点击事件
					myChart.on('click', function(object) {
						$('#returnBtn1').show();
						
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
var pay_dom2 = document.getElementById("containerPayReport2"); // dom加载容器
var pay_myChart2 = echarts.init(pay_dom2); // 初始化容器

$.ajax({
	type : "GET",
	url : "/jx-web-portal/searchNcOrgOfUser",					
	dataType : "json",
	success : function(result) {
		if ("02" == result.code){
			orgNum = result.data.orgNum;
			segementNum = result.data.segementNum;
			
			orgName = result.data.orgName;
			segementName = result.data.segementName;
			if(segementNum > 1){
				$('#chartTitle1').html("集团 - 板块薪酬构成分析");
				
				$('#segementChart').show();
				pay_myChart2 = echarts.init(pay_dom2);
				pay_drilldown2.initChart(pay_myChart2);
			} else if (orgNum > 1) {
				$('#chartTitle1').html(segementName+ "板块 - 各公司薪酬构成分析");
				
				$('#segementChart').show();
				pay_myChart2 = echarts.init(pay_dom2);
				pay_drilldown2.initChart2(pay_myChart2);
			} 
			
		}
	}
});


$('#returnBtn1').on('click', function() { // 返回按钮加载事件，重新初始化
	if (pay_index2 == 1) {// 第一层无操作

		return;
	}
	echarts.dispose(pay_dom2);// 返回必须销毁销毁dom
	pay_myChart2 = echarts.init(pay_dom2); // 初始化容器

	if (pay_index2 == 3) {// 第三层返回第二层
		if (segementNum == 1) {
			$('#returnBtn1').hide();
			
		} 
		pay_drilldown2.initChart2(pay_myChart2)// 初始化第二层
	}
	if (pay_index2 == 2) {// 第二层返回第一层
		$('#returnBtn1').hide();
		
		pay_drilldown2.initChart(pay_myChart2)// 初始化第一层
	}

});

// 自适应窗口大小
$(window).resize(function(){
	
	pay_myChart1.resize();
	pay_myChart2.resize();
});


