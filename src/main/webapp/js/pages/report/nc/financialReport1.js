var financialindex2;// 每一层的标识，第一层为1，第2层为2
var financialxkey2;// 点击柱状图形所在的键（点第一层）
var financialxkey3;// 点击饼图形所在的键（点第二层）
var financial_yearAll = null;// 某一年，全局变量

$.ajax({ // 动态添加年份
	type : "POST",
	url : "./financial/searchYers",
	dataType : "json",
	success : function(result) {
		if ("02" == result.code) {
			var years = result.data;
			$("#financialYearReport1").empty();// 清空下拉菜单节点
			for (var i = 0; i < years.length; i++) {
				var $opt = $("<option value=" + years[i] + ">" + years[i]
						+ "</option>");// 添加年份节点
				$("#financialYearReport1").append($opt);
			}
		} else if ("01" == result.code) {

		}
	}
});

$('#financialYearReport1').bind('change', function() { // 点击年份单击事件，重新初始化
	var yearNow = $(this).val();// 选中的值
	financial_yearAll = yearNow;
	echarts.dispose(financial_dom1);// 返回必须销毁销毁dom
	financial_myChart1 = echarts.init(financial_dom1); // 初始化容器
	financial_option1 = financial_drilldown1.getOption();
	financial_drilldown1.initChart(financial_myChart1, financial_option1);

});

function getOption() {
	var option = null;
	option = {
		tooltip : {
			trigger : 'item',
			formatter : '{a}<br/>{b} : {c}',
		},
		legend : {
			left : 'left',
			data : []
		},
		color : [ '#87cefa', '#61a0a8', '#d48265', '#91c7ae', '#749f83',
				'#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3' ],
		xAxis : {
			axisLabel : {
				interval : 0
			// x轴坐标全部显示
			},
			type : 'category',
			name : '月份',
			splitLine : {
				show : false
			},
			axisLabel : {
				formatter : '{value} 月'
			},
			data : []
		},
		grid : {
			left : '3%',
			right : '4%',
			bottom : '3%',
		
			containLabel : false
		},
		yAxis : {
			type : 'log',
			name : 'y(单位：万元)',
				 axisLabel: {
						formatter: '{value} '
					}
		},
		series : [ {
			name : '年数据',
			type : 'bar',
			data : [],
			center: ['50%', '50%'],
			radius:'65%',
			 label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            }
			/*label: {
                normal: {
                    textStyle: {                  
                        fontSize:1
                    }
                }
            }*/
		} ],
		label : { // 显示数据
			normal : {
				show : true,

				position : 'top'
			}
		}
	};

	return option;
};

// 定义的下钻函数
var financial_drilldown1 = {

	// 第二层初始化
	initChart2 : function(myChart, option) {
		var me = this;
		echarts.dispose(financial_dom1);// 销毁dom
		myChart = echarts.init(financial_dom1);// 初始化demo

		var yearNow = $('#financialYearReport1 option:selected').val();// 选中的值
		var monthParam = financialxkey2.replace(yearNow + "/", "");
		// 发起异步请求
		$.ajax({
			type : "POST",
			url : "./financial/serchFinancialOneMonth",
			dataType : "json",
			data : {
				"year" : yearNow,
				"month" : monthParam
			},
			success : function(result) {
				if ("02" == result.code) {
					var respFinancial = result.data;

					var a = [];
					a[0] = respFinancial.nameList;
					a[1] = respFinancial.valueList;
					a[2] = financialxkey2 + "月集团财务费用分布";

					option.series[0].type = 'pie';
					option.series[0].name = '集团月财务数据(万元)';
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
						// legendData[i] = a[0][i];
					}
					option.series[0].data = data;// 所有数据
					option.legend.data = legendData;// 数据名称，必须和
					// option.series[0].data中name属性相同

					option.xAxis = null;
					option.grid = null;
					option.yAxis = null;
					myChart.setOption(option, true);
					financialindex2 = 2;// 第二层标识

				} else if ("01" == result.code) {

				}
			}
		});

	},

	// 第一层初始化函数
	initChart : function(myChart, option) {
		var me = this;
		myChart.setOption(option);
		// 第一层异步加载数据
		var monthArr = [];// 月
		var abscissa = [];// 横坐标
		var netProfitArr = [];// 费用

		$.ajax({
			type : "GET",
			url : "./financial/serchFinancialOneYear",
			dataType : "json",
			data : {
				"year" : financial_yearAll
			},
			success : function(result) {
				if ("02" == result.code) {
					var respProfit = result.data;
					// 赋值
					var a = [];
					a[0] = respProfit.nameList;
					a[1] = [ "费用" ];
					a[2] = respProfit.valueList;
					a[3] = respProfit.year + "年集团财务费用情况";
					var data = []; // 柱状图所有数据

					for (var i = 0; i < a[1].length; i++) {// 循环加载柱状图数据
						data[i] = {
							name : a[1][i],
							type : 'bar',
							data : a[2 + i],
							barWidth:'50%'
						};
					}
					// 填入数据
					myChart.setOption({
						grid:{
							top:60,
							bottom:80,
							left:60,
							right:60
						},
						 toolbox: {
						        show : true,
						        right:40,
						        feature : {
						            mark : {show: true},
						            magicType: {show: true, type: ['line', 'bar']},
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						legend : {
							left:20,
							data : a[1]
						// 柱子的名词
						},
						xAxis : {
							data : a[0]
						// X轴的数据
						},
						yAxis : {
							type : 'value',
							name : '单位:万元',
				            axisLabel: {
				                formatter: '{value}'
				            }

						},
						series :data
					// 柱状图所有数据

					});
					financialindex2 = 1;// 第一层标识
					// 第二层钻取点击事件
					myChart.on('click', function(object) {
						$('#return-buttonFinancialReport1').show();
						
						financialxkey2 = object.name;// 点击柱子的x轴

						me.initChart2(myChart, option)
					});
				} else if ("01" == result.code) {

				}
			}
		});

	},
};


//加载DOM，并且返回按钮
var financial_dom1 = document.getElementById("containerFinancialReport1"); // dom加载容器
var financial_myChart1 = echarts.init(financial_dom1); // 初始化容器

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
				$('#return-buttonFinancialReport1').hide();
				$('#chartTitle').html(orgName+" - 期间费用分析");
			} else if(segementNum == 1){
				$('#chartTitle').html(segementName+"板块 - 期间费用分析");
			} else {
				$('#chartTitle').html("集团 - 期间费用分析");
			}
			
			//加载DOM，并且返回按钮
			financial_drilldown1.initChart(financial_myChart1, getOption());
		}
	}
});


financial_drilldown1.initChart(financial_myChart1, getOption());

$('#return-buttonFinancialReport1').on('click', function() { // 返回按钮加载事件，重新初始化
	if (financialindex2 == 1) {// 第一层无操作
		return;
	}
	$('#return-buttonFinancialReport1').hide();
	echarts.dispose(financial_dom1);// 返回必须销毁销毁dom
	financial_myChart1 = echarts.init(financial_dom1); // 初始化容器

	financial_drilldown1.initChart(financial_myChart1, getOption())// 初始化第一层

});
