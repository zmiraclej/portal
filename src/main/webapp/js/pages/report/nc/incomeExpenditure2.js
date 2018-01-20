var indexIncomeEx2 = 0;			//每一层的标识，第一层为1，第2层为2
var xkey2;						//点击图形所在的键
var seriesName2;				//点击柱子的名称
var project2;					//板块
var month2;

// 定义的下钻函数
var drilldownIncomeEx2 = {
	// 第三层初始化
	initChart3 : function(myChart) {
		indexIncomeEx2 = 3;					//第三层标识
		echarts.dispose(dom2);				//销毁dom
		myChart = echarts.init(dom2);
		
		var a = [];
		a[0] = [];
		a[1] = [ 17, 14, 11, 8, 5 ];
		a[2] = "校区收入状况图";

		$.ajax({ 							//第三层按校区分布后台ajax传数据
			type : "GET",
			url : "/jx-web-portal/IncomeExpenditure/searchInfoBySchool2",
			dataType : "json",
			data : {
				projectInfo:segementName,yearInfo:$("#incomeExpenditureYear2  option:selected").val(),monthInfo:month2
			},
			success : function(result) {
				if ("02" == result.code){
					for (var i = 0; i < result.data.length; i++) {				
						a[0][i] = result.data[i].school;
						if (seriesName2 == "收入") {		
							a[1][i] = result.data[i].income;
							a[2] = $("#incomeExpenditureYear2  option:selected").val()+"年"+month2+"月"+project2 + "板块各校区收入情况";
						} else if (seriesName2 == "支出") {
							a[1][i] = result.data[i].expenditure;
							a[2] = $("#incomeExpenditureYear2  option:selected").val()+"年"+month2+"月"+project2 + "板块各校区支出情况";
						}	
					}
					var option = getPieOption();
					option.series[0].type = 'pie';
//					option.title.text = a[2];
					option.tooltip.formatter = '{c}万元 ({d}%)';
					option.legend.orient = 'horizontal';						//图例竖直放
					option.label.normal.formatter = '{b} : {c}万元 ({d}%)';	//柱状图显示数据

					var data = []; 											//图形所有数据
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
						legendData[i] = a[0][i];
					}
					option.series[0].data = data;
					option.legend.data =null;
					option.xAxis = null;
					option.grid = null;
					option.yAxis = null;
					myChart.setOption(option, true);	
				}else if ("01" == result.code) {
					
				}
			}
		})
	},

	
	// 第二层初始化
	initChart2 : function(myChart) {
		indexIncomeEx2 = 2;				//第二层标识
		var me = this;
		echarts.dispose(dom2);			//销毁dom
		myChart = echarts.init(dom2);	//初始化dom
		var a = [];
		a[0] = [ 2016, 2017, 2018 ];
		a[1] = [ "收入", "支出" ];
		a[2] = [ 320, 330, 340 ];
		a[3] = [ 20, 33, 46 ];
		a[4] = $("#incomeExpenditureYear2  option:selected").val()+"年"+project2+"板块收入/支出情况";
		
		$.ajax({ 
		type : "GET",
		url : "/jx-web-portal/IncomeExpenditure/searchInfoByYearAndProject2",					
		dataType : "json",
		data : {
			yearInfo : $("#incomeExpenditureYear2  option:selected").val(),
			projectInfo:segementName
		},
		success : function(result) {	
			if ("02" == result.code){
				for (var i = 0; i < result.data.length; i++) { 	//循环加载每月的收入支出
					a[0][i] = result.data[i].month;					
					a[2][i] = result.data[i].income;
					a[3][i] = result.data[i].expenditure;				
				}				
	
				var data = []; 									//柱状图所有数据
				for (var i = 0; i < a[1].length; i++) {			//循环加载柱状图数据
					data[i] = {
						name : a[1][i],
						type : 'bar',
						data : a[2 + i]
					};
				}			
			
				// 填入数据
				myChart.setOption({
					color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
					tooltip : {
						trigger : 'item',
						formatter : '{c}'
					},
					legend : {
					      orient: 'horizontal',
					      align:'right',
					      left:'10',
						data : a[1]
					},
					
					 toolbox: {
					        show : true,
					        right:80,
					        feature : {
					            mark : {show: true},
					            magicType: {show: true, type: ['line', 'bar']},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    
					grid:{
						left:80
					},
					xAxis : {
						axisLabel : {
							interval : 0
						},
						type : 'category',
						name : '月份',
						splitLine : {
							show : false
						},
						  axisLabel: {
				                formatter: '{value}'
				            },
						data : a[0]
					},
					
					yAxis : {
						type : 'value',
						name : '单位:万元',
				            axisLabel: {
				                formatter: '{value}'
				            }

					},
					series : data,
					label : { 
						normal : {
							formatter:'{c}',
							show : true,
							position : 'top'
						}
					}
				});
						
				// 第三层钻取
				myChart.on('click', function(object) {
					xkey2 = object.name;
					month2=xkey2;
					seriesName2 = object.seriesName;  //点击柱子的名称
					
					$('#return-button2').show();
					me.initChart3(myChart)
				});
			}else if ("01" == result.code) {
				
			}	
		}
	});
	},

	// 第一层初始化函数（按板块）
	initChart : function(myChart) {	
	
		var me = this;
		$.ajax({
			type : "GET",
			url : "/jx-web-portal/IncomeExpenditure/searchInfoByProject2",
			dataType : "json",
			data : {
				yearInfo:$("#incomeExpenditureYear2  option:selected").val()
			},
			success : function(result) {
				if ("02" == result.code){	
					var a = [];
					a[0] = [];
					a[1] = [ 17, 14, 11 ];
					a[2] = "";
					for (var i = 0; i < result.data.length; i++) {
						a[0][i] = result.data[i].project;	
						if ($("#incomeExpenditureSelect2").val() == "收入") {		
							a[1][i] = result.data[i].income;
							a[2] = $("#incomeExpenditureYear2  option:selected").val()+"年集团板块收入情况";
						} else if ($("#incomeExpenditureSelect2").val() == "支出") {
							a[1][i] = result.data[i].expenditure;
							a[2] = $("#incomeExpenditureYear2  option:selected").val()+"年集团板块支出情况";
						}	
					}
				   
					var option = getPieOption();
					option.series[0].type = 'pie';
//					option.title.text =a[2];
					option.tooltip.formatter = '{c}万元 ({d}%)';
					option.legend.orient = 'vertical';						//图例竖直放
					option.label.normal.formatter = '{b} : {c}万元 ({d}%)';	//柱状图显示数据

					var data = []; 										
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
						legendData[i] = a[0][i];
					}
					option.series[0].data = data;// 所有数据
					option.legend.data = null;
					option.xAxis = null;
					option.grid = null;
					option.yAxis = null;
					myChart.setOption(option, true);
					indexIncomeEx2=1;	
				}else if ("01" == result.code) {
					
				}
			}
		});
		

		// 第二层钻取点击事件
		myChart.on('click', function(object) {
			seriesName2 = object.seriesName2;		//点击柱子的名称
			segementName = object.name;					//点击柱子的x轴的名称
			
			$('#return-button2').show();
			me.initChart2(myChart);
		});
	},
	
};

// 加载DOM
var dom2 = document.getElementById("container2");                          //dom加载容器
var myChartIncome2 = echarts.init(dom2); 								   //初始化容器
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
				$('#return-button2').hide();
				$('#chartTitle').html(orgName+" - 总收支分析");
			} else if(segementNum == 1){
				$('#chartTitle').html(segementName+"板块 - 总收支分析");
			} else {
				$('#chartTitle').html("集团 - 总收支分析");
			}
			
			$.ajax({ 													 //第一层异步加载数据，后台动态添加年份
				type : "GET",
				url : "/jx-web-portal/IncomeExpenditure/searchAllYears",
				dataType : "json",
				success : function(result) {
					if ("02" == result.code){	
		
						if(segementNum > 1){
							$("#incomeExpenditureYear2").empty();            //清空下拉菜单节点
							for (var i = 0; i < result.data.length; i++) {
								var $opt = $("<option value=" + result.data[i]
										+ ">" + result.data[i] + "</option>");//添加年份节点
								$("#incomeExpenditureYear2").append($opt);
							}
							
							$('#chartTitle1').html("集团 - 板块总收支分析");
							$('#segementChart').show();
							
							myChartIncome2 = echarts.init(dom2); 
							drilldownIncomeEx2.initChart(myChartIncome2);
							
						} 
					}else if ("01" == result.code) {
						
					}
				}
			});
			
		}
	}
});

$('#return-button2').on('click', function() { 							   //返回按钮加载事件，重新初始化
	if (indexIncomeEx2 == 1) {											   //第一层返回按钮无响应
		return;
	}

	echarts.dispose(dom2);												   //返回必须销毁销毁dom
	myChartIncome2 = echarts.init(dom2);  								   //初始化容器

	if (indexIncomeEx2 == 3 && orgNum > 1) {// 第三层返回第二层
		if (segementNum == 1){
			$('#return-button2').hide();
		}
		
		drilldownIncomeEx2.initChart2(myChartIncome2);// 初始化第二层
	} else if (indexIncomeEx2 == 2 && segementNum > 1) {// 第二层返回第一层
		$('#return-button2').hide();
		drilldownIncomeEx2.initChart(myChartIncome2);// 初始化第一层
	}
});




$("#incomeExpenditureYear2").change(function(){                  		   //年份条件选择
	echarts.dispose(dom2);												   //返回必须销毁销毁dom
	myChartIncome2 = echarts.init(dom2);  								   //初始化容器
	drilldownIncomeEx2.initChart4(myChartIncome2);	
});



$("#incomeExpenditureSelect2").change(function(){                  		   //收入支出条件选择
	echarts.dispose(dom2);												   //返回必须销毁销毁dom
	myChartIncome2 = echarts.init(dom2);  								   //初始化容器
	drilldownIncomeEx2.initChart(myChartIncome2);	
});


$(window).resize(function(){                                               //自适应窗口大小
	myChartIncome.resize();
	myChartIncome2.resize();
});



