var payindex2;// 每一层的标识，第一层为1，第2层为2
var payxkey2;// 点击柱状图形所在的键（点第一层）
var payxkey3;// 点击饼图形所在的键（点第二层）
var pay_yearAll = null;// 某一年，全局变量

$.ajax({ // 动态添加年份
	type : "POST",
	url : "./pay/searchYers",
	dataType : "json",
	success : function(result) {
		if ("02" == result.code) {
			var years = result.data;
			$("#payYearReport1").empty();// 清空下拉菜单节点
			for (var i = 0; i < years.length; i++) {
				var $opt = $("<option value=" + years[i] + ">" + years[i]
						+ "</option>");// 添加年份节点
				$("#payYearReport1").append($opt);
			}
		} else if ("01" == result.code) {

		}
	}
});

$('#payYearReport1').bind('change', function() { // 点击年份单击事件，重新初始化
	var yearNow = $(this) .val();//选中的值
	pay_yearAll = yearNow;
	echarts.dispose(pay_dom1);// 返回必须销毁销毁dom
	pay_myChart1 = echarts.init(pay_dom1); // 初始化容器
	pay_option1 = pay_drilldown1.getOption();
	pay_drilldown1.initChart(pay_myChart1, pay_option1);

});
// 定义的下钻函数
var pay_drilldown1 = {

	// 第二层初始化
	initChart2 : function(myChart) {
		var me = this;
		echarts.dispose(pay_dom1);// 销毁dom
		myChart = echarts.init(pay_dom1);// 初始化demo

		var yearNow = $('#payYearReport1 option:selected') .val();//选中的值
		var monthParam = payxkey2.replace(yearNow + "/", "");
		// 发起异步请求
		$.ajax({
			type : "POST",
			url : "./pay/searchPayOneMonth",
			dataType : "json",
			data : {
				"year" : yearNow,
				"month" : monthParam
			},
			success : function(result) {
				if ("02" == result.code) {
					var resppay = result.data;

					var a = [];
					a[0] = resppay.nameList;
					a[1] = resppay.valueList;
					a[2] = payxkey2 + "月集团薪酬构成分布";

					var option = getPieOption();
					option.series[0].type = 'pie';
					option.series[0].name = payxkey2 + '月集团薪酬构成数据(万元)';
//					option.title.text = a[2];
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

					option.xAxis = null;
					option.grid = null;
					option.yAxis = null;
					myChart.setOption(option, true);
					payindex2 = 2;// 第二层标识

				} else if ("01" == result.code) {

				}
			}
		});

	},

	// 第一层初始化函数
	initChart : function(myChart) {
		var me = this;
		myChart.setOption(getBarOption());
		// 第一层异步加载数据
		var monthArr = [];// 月
		var abscissa = [];// 横坐标
		var netProfitArr = [];// 费用

		$.ajax({
			type : "GET",
			url : "./pay/searchPayOneYear",
			dataType : "json",
			data : {
				"year" : pay_yearAll
			},
			success : function(result) {
				if ("02" == result.code) {
					var respProfit = result.data;
					// 赋值
					var a = [];
					a[0] = respProfit.nameList;
					a[1] = [ "薪酬" ];
					a[2] = respProfit.valueList;
					a[3] = respProfit.year + "年集团薪酬构成情况";
					var data = []; // 柱状图所有数据

					for (var i = 0; i < a[1].length; i++) {// 循环加载柱状图数据
						data[i] = {
							name : a[1][i],
							type : 'bar',
							barMaxWidth: 50,
							data : a[2 + i]
						};
					}
					// 填入数据
					myChart.setOption({
						legend : {
							left: 10,
							data : a[1]
						// 柱子的名词
						},
						toolbox: {
						    show : true,
						    right: 40,
						    feature : {
						        mark : {show: true},
						        magicType: {show: true, type: ['line', 'bar']},
						        restore : {show: true},
						        saveAsImage : {show: true}
						    }
						},
						xAxis : {
							data : a[0]
						// X轴的数据
						},
						yAxis : {
							type : 'value',
							name : '单位：万元',
							 axisLabel: {
									formatter: '{value} '
								}
						},
						series : data
					// 柱状图所有数据

					});
					payindex2 = 1;// 第一层标识
					// 第二层钻取点击事件
					myChart.on('click', function(object) {
						$('#returnBtn').show();
						
						payxkey2 = object.name;// 点击柱子的x轴
						
						me.initChart2(myChart)
					});
				} else if ("01" == result.code) {

				}
			}
		});

	},
};

// 加载DOM，并且返回按钮
var pay_dom1 = document.getElementById("containerPayReport1"); // dom加载容器
var pay_myChart1 = echarts.init(pay_dom1); // 初始化容器

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
			if(orgNum == 1){
				$('#chartTitle').html(orgName+" - 薪资构成分析");
			} else if(segementNum == 1){
				$('#chartTitle').html(segementName+"板块 - 薪资构成分析");
			} else {
				$('#chartTitle').html("集团 - 薪资构成分析");
			}
			
			//加载DOM，并且返回按钮
			pay_drilldown1.initChart(pay_myChart1);
		}
	}
});

$('#returnBtn').on('click', function() { // 返回按钮加载事件，重新初始化
	if (payindex2 == 1) {// 第一层无操作

		return;
	}
	$('#returnBtn').hide();
	echarts.dispose(pay_dom1);// 返回必须销毁销毁dom
	pay_myChart1 = echarts.init(pay_dom1); // 初始化容器
	
	pay_drilldown1.initChart(pay_myChart1)// 初始化第一层

});

