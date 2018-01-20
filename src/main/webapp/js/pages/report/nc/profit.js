var profit1_index2;// 每一层的标识，第一层为1，第2层为2
var profit1_xkey2;// 点击柱状图形所在的键（点第一层）
var profit1_xkey3;// 点击饼图形所在的键（点第二层）
var profit1_yearAll = null;// 某一年，全局变量

$.ajax({ // 动态添加年份
	type : "POST",
	url : "./profit/searchYers",
	dataType : "json",
	success : function(result) {

		if ("02" == result.code) {
			var years = result.data;
			$("#groupGainFeeYearReport1").empty();// 清空下拉菜单节点
			for (var i = 0; i < years.length; i++) {
				var $opt = $("<option value=" + years[i] + ">" + years[i]
						+ "</option>");// 添加年份节点
				$("#groupGainFeeYearReport1").append($opt);

			}
		} else if ("01" == result.code) {

		}
	}
});

$('#groupGainFeeYearReport1').bind('change', function() { // 点击年份单击事件，重新初始化
	var yearNow = $(this) .val();//选中的值
	profit1_yearAll = yearNow;
	echarts.dispose(profit1_dom2);// 返回必须销毁销毁dom
	profit1_myChart2 = echarts.init(profit1_dom2); // 初始化容器
	profit1_option2 = profit1_drilldown2.getOption();
	profit1_drilldown2.initChart(profit1_myChart2, profit1_option2);

});

//板块数据选项
function getProjectOption(xData,yData) {

	var option = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
				 orient: 'horizontal',
			      align:'left',
			      left:'10',
			      itemGap:2,
			      data:['净盈利']						//图例，柱子的名称
			    },
		    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    toolbox: {
		        show : true,
		        right:40,
		        feature : {
		            //dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : {
		    	name : '板块',
		    	axisLabel :{  
		    		interval:0 ,  //x轴坐标全部显示
		    		rotate:50 
		    	},
		    	data : xData								//X轴的数据
		    },
		    yAxis : {
				type : 'value',
				name : '资金(万元)',
				 axisLabel: {
		                formatter: '{value}'
		            }
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '60',
				containLabel : true
			},
		    series : [
		        {
		            name:"净利润",
		            type:'bar',
		            barMaxWidth:40,
		            data:yData,
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
		        }
		    ]
		};

	return option;
}

//板块数据选项
function getOrgOption(xData,yData) {

	var option = {
//		    title : {
//		        text: '某地区蒸发量和降水量',
//		        subtext: '纯属虚构'
//		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
				 orient: 'horizontal',
			      align:'left',
			      left:'10',
			      itemGap:2,
			      data:['净盈利']						//图例，柱子的名称
			    },
		    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    toolbox: {
		        show : true,
		        right:40,
		        feature : {
		            //dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : {
		    	name : '公司',
		    	axisLabel :{  
		    		interval:0 ,  //x轴坐标全部显示
		    		rotate:50 
		    	},
		    	data : xData								//X轴的数据
		    },
		    yAxis : {
				type : 'value',
				name : '资金(万元)',
				 axisLabel: {
		                formatter: '{value}'
		            }
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '60',
				containLabel : true
			},
		    series : [
		        {
		            name:"净利润",
		            type:'bar',
		            barMaxWidth:40,
		            data:yData,
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
		        }
		    ]
		};

	return option;
}

// 定义的下钻函数
var profit1_drilldown2 = {

	// 第三层初始化
	initChart3 : function(myChart) {
		echarts.dispose(profit1_dom2);// 销毁dom
		myChart = echarts.init(profit1_dom2);

		var yearNow = $('#groupGainFeeYearReport1 option:selected') .val();//选中的值

		var schoolArr = 0;// 校区名称（校区固定为5个）
		var schoolMoney = 0;// 每个校区的纯收益（校区固定为5个）

		// 发起异步请求
		$.ajax({
			type : "POST",
			url : "./profit/searchProfitByMonthAndProject",
			dataType : "json",
			data : {
				"year" : yearNow,
				"month" : profit1_xkey2,
				"project" : segementName
			},
			success : function(result) {
				if ("02" == result.code) {
					var respProfit = result.data;

					// 赋值
					var a = [];
					a[0] = respProfit.nameList;
					a[1] = respProfit.valueList;
					a[2] = "公司净利状况图";

					var data = []; // 饼状图所有数据
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
//						legendData[i] = a[0][i];
					}
					myChart.setOption(getOrgOption(respProfit.nameList,respProfit.valueList), true);
					profit1_index2 = 3;// 第三层标识

				} else if ("01" == result.code) {

				}
			}
		});

	},

	// 第二层初始化
	initChart2 : function(myChart) {
		var me = this;
		echarts.dispose(profit1_dom2);// 销毁dom
		myChart = echarts.init(profit1_dom2);// 初始化demo

		var yearNow = $('#groupGainFeeYearReport1 option:selected') .val();//选中的值

		var edu = 0;// 教育板块
		var server = 0;// 服务板块
		var land = 0;// 房地产板块
		// 发起异步请求
		$.ajax({
			type : "POST",
			url : "./profit/searchProfitByMonth",
			dataType : "json",
			data : {
				"year" : yearNow,
				"month" : profit1_xkey2
			},
			success : function(result) {
				if ("02" == result.code) {
					var respProfit = result.data;
					var a = [];
					a[0] = respProfit.nameList;
					a[1] = respProfit.valueList;
					a[2] = profit1_xkey2 + "月集团板块净利情况";

					var data = []; // 饼状图所有数据
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
//						legendData[i] = a[0][i];
					}
					// option.series[0].data中name属性相同

					myChart.setOption(getProjectOption(respProfit.nameList, respProfit.valueList), true);
					profit1_index2 = 2;// 第二层标识
					// 第三层钻取
					myChart.on('click', function(object) {
						$('#returnBtn').show();
						segementName = object.name;
						me.initChart3(myChart)
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
		myChart.setOption(getBarOption());	
		var monthArr = [];// 月
		var abscissa = [];// 横坐标
		var netProfitArr = [];// 净利

		$.ajax({
			type : "GET",
			url : "./profit/searchProfitOneYear",
			dataType : "json",
			data : {
				"year" : profit1_yearAll
			},
			success : function(result) {
				if ("02" == result.code) {
					var respProfit = result.data;
					// 赋值
					var a = [];
					a[0] = respProfit.nameList;
					a[1] = [ "净利" ];
					a[2] = respProfit.valueList;
					a[3] = respProfit.year + "年集团净利情况表";
					var data = []; // 柱状图所有数据

					for (var i = 0; i < a[1].length; i++) {// 循环加载柱状图数据
						data[i] = {
							name : a[1][i],
							type : 'bar',
							barMaxWidth :50,
							data : a[2 + i]
						};
					}
					// 填入数据
					myChart.setOption({
						 tooltip : {
						        trigger: 'axis'
						    },
						legend : {
							left:20,
							data : a[1]
						// 柱子的名词
						},
						color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
						 toolbox: {
						        show : true,
						        right:40,
						        feature : {
						            //dataView : {show: true, readOnly: false},
						            magicType : {show: true, type: ['line', 'bar']},
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						xAxis : {
							name : '月份',
							data : a[0]
						// X轴的数据
						},
						yAxis : {
							type : 'value',
							name : '单位：万元',
							 axisLabel: {
					                formatter: '{value}'
					            }	
								
						},
						grid : {
							left : '3%',
							right : '4%',
							bottom : '60',
							containLabel : true
						},
						series : data
					// 柱状图所有数据

					});
					profit1_index2 = 1;// 第一层标识
					// 第二层钻取点击事件
					myChart.on('click', function(object) {
						profit1_xkey2 = object.name;// 点击柱子的x轴
						
						if (segementNum == 1 && orgNum > 1) {
							me.initChart3(myChart);
						} else if(orgNum > 1) {
							me.initChart2(myChart);
						} else {
							return;
						}
						$('#returnBtn').show();
					});
				} else if ("01" == result.code) {

				}
			}
		});

	},
};

// 加载DOM，并且返回按钮
var profit1_dom2 = document.getElementById("containerGainFeeReport1"); // dom加载容器
var profit1_myChart2 = echarts.init(profit1_dom2); // 初始化容器

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
				$('#returnBtn').hide();
				$('#chartTitle').html(orgName+" - 年度盈利分析");
			} else if(segementNum == 1){
				$('#chartTitle').html(segementName+"板块 - 年度盈利分析");
			} else {
				$('#chartTitle').html("集团 - 年度盈利分析");
			}
			
			profit1_drilldown2.initChart(profit1_myChart2);
		}
	}
});


$('#returnBtn').on('click', function() { // 返回按钮加载事件，重新初始化

	if (profit1_index2 == 1) {// 第一层无操作
		return;
	}
	echarts.dispose(profit1_dom2);// 返回必须销毁销毁dom
	profit1_myChart2 = echarts.init(profit1_dom2); // 初始化容器

	if (profit1_index2 == 3) {// 第三层返回第二层
		if(segementNum == 1){
			$('#returnBtn').hide();
			profit1_drilldown2.initChart(profit1_myChart2)// 初始化第二层
		} else {
			profit1_drilldown2.initChart2(profit1_myChart2)// 初始化第二层
		}
		
	} else if (profit1_index2 == 2) {// 第二层返回第一层
		$('#returnBtn').hide();
		profit1_drilldown2.initChart(profit1_myChart2)// 初始化第一层
	}

});

//自适应窗口大小
//window.onresize = profit1_myChart2.resize;
$(window).resize(function(){
	profit1_myChart2.resize();
});
