var indexIncomeEx = 0;				//每一层的标识，第一层为1，第2层为2
var xkey;							//点击图形所在的键
var seriesName;						//点击柱子的名称
var month;							//月份

// 定义的下钻函数
var drillDown = {
	
	// 第三层初始化
	initChart3 : function(myChart) {
		indexIncomeEx = 3;							//第三层标识
		echarts.dispose(dom);						//销毁dom
		myChart = echarts.init(dom);

		var a = [];
		a[0] = [];
		a[1] = [ 17, 14, 11, 8, 5 ];
		a[2] = "校区收入状况图";

		$.ajax({ 									//第三层后台获取数据
			type : "GET",
			url : "/jx-web-portal/IncomeExpenditure/searchInfoBySchool",
			dataType : "json",
			data : {
				projectInfo:segementName,yearInfo:$("#incomeExpenditureYear  option:selected").val(),monthInfo:month
			},
			success : function(result) {
				
				if ("02" == result.code){
					for (var i = 0; i < result.data.length; i++) {
						a[0][i] = result.data[i].school;
						if (seriesName == "收入") {		
							a[1][i] = result.data[i].income;
							a[2] =$("#incomeExpenditureYear  option:selected").val()+"年"+month+"月"+xkey + "板块各校区收入情况";
						} else if (seriesName == "支出") {
							a[1][i] = result.data[i].expenditure;
							a[2] =$("#incomeExpenditureYear  option:selected").val()+"年"+month+"月"+xkey + "板块各校区支出情况";
						}	
					}
					
					var option = getPieOption();
					option.series[0].type = 'pie';
					option.tooltip.formatter = '{a}<br/>{b} : {c}万元 ({d}%)';
					option.legend.orient = 'vertical';						//图例竖直放
					option.label.normal.formatter = '{b} : {c}万元 ({d}%)';	//柱状图显示数据
		
					var data = []; 											//饼状图所有数据
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
						legendData[i] = a[0][i];
					}
					option.series[0].data = data;
					myChart.setOption(option, true);	
				}else if ("01" == result.code) {
					
				}
			}
		})
	},

	
	// 第二层初始化
	initChart2 : function(myChart) {
		indexIncomeEx = 2;						//第二层标识
		var me = this;
		echarts.dispose(dom);					//销毁dom
		myChart = echarts.init(dom);			//初始化dom
	
		var a = [];
		
		a[0]= [];
		if (seriesName == "收入") {
			a[1] = [ 100, 300, 600 ];
			a[2] = xkey + "月集团板块收入情况";
		} else if (seriesName == "支出") {
			a[1] = [ 120, 230, 350 ];
			a[2] = xkey + "月集团板块支出情况";
		}
		
		
		$.ajax({								 //按板块获取后台数据
			type : "GET",
			url : "/jx-web-portal/IncomeExpenditure/searchInfoByProject",
			dataType : "json",
			data : {
				yearInfo:$("#incomeExpenditureYear  option:selected").val(),monthInfo:month
			},
			success : function(result) {	
				if ("02" == result.code){
					for (var i = 0; i < result.data.length; i++) {
						a[0][i] = result.data[i].project;
						if (seriesName == "收入") {		
							a[1][i] = result.data[i].income;
							a[2] = $("#incomeExpenditureYear  option:selected").val()+"年"+month + "月集团板块收入情况";
						} else if (seriesName == "支出") {
							a[1][i] = result.data[i].expenditure;
							a[2] = $("#incomeExpenditureYear  option:selected").val()+"年"+month + "月集团板块支出情况";
						}	
					}
					
					var option = getPieOption();
					option.series[0].type = 'pie';
					option.tooltip.formatter = '{a}<br/>{b} : {c}万元 ({d}%)';
					option.legend.orient = 'vertical';						//图例竖直放
					option.label.normal.formatter = '{b} : {c}万元 ({d}%)';	//柱状图显示数据

					var data = []; 											//饼状图所有数据
					var legendData = [];
					for (var i = 0; i < a[0].length; i++) {
						data[i] = {
							value : a[1][i],
							name : a[0][i]
						};
						legendData[i] = a[0][i];
					}
					option.series[0].data = data;
					
					myChart.setOption(option, true);	
					// 第三层钻取
					myChart.on('click', function(object) {
						segementName = object.name;
						me.initChart3(myChart)
						$('#return-button').show();
						myChart.setOption(option, true);
					});	
				}else if ("01" == result.code) {
					
				}	
			}
		});
	},

	// 第一层初始化函数
	initChart : function(myChart) {		
		var me = this;
		myChart.setOption(getBarOption());
		$.ajax({ 														//第一层异步加载数据， 动态添加年份
			type : "GET",
			url : "/jx-web-portal/IncomeExpenditure/searchAllYears",
			dataType : "json",
			success : function(result) {
				
				if ("02" == result.code){	
					$("#incomeExpenditureYear").empty();						//清空下拉菜单节点
					for (var i = 0; i < result.data.length; i++) { 
						var $opt = $("<option value=" + result.data[i]
								+ ">" + result.data[i] + "</option>");			//添加年份节点
						$("#incomeExpenditureYear").append($opt);
					}
					var a = [];
					a[0] = [ "2016/01", "2016/02", "2016/03" ];
					a[1] = [ "收入", "支出" ];
					a[2] = [ 320, 330, 340 ];
					a[3] = [ 20, 33, 46 ];
					a[4] = $("#incomeExpenditureYear  option:selected").val()+"年集团收入/支出情况";

					$.ajax({ 													//获取某年的年份数据
						type : "GET",
						url : "/jx-web-portal/IncomeExpenditure/searchInfoByYear",					
						dataType : "json",
						data : {
							yearInfo : $("#incomeExpenditureYear  option:selected").val()
						},
						success : function(result) {	
							if ("02" == result.code){
								
								var shouruList = result.data.shouruList;
								var zhichuList = result.data.zhichuList;
								var names = result.data.names;
								
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
									legend : {
										orient: 'horizontal',
										align:'left',
//		                                right:'1',
										left:20,
										data : a[1]
									},
									/*grid : {
										
										left : '3%',
										right : '6%',
										bottom : '20%',
										containLabel : false
									},*/
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
									xAxis : {
										data : names
						
									},
									 yAxis : [
									        {
									            type : 'value'
									        }
									    ],
									   
									series :[{
										 name:'收入',
								            type:'bar',
								            data:shouruList
									},{
										 name:'支出',
								            type:'bar',
								            data:zhichuList
									}]
								});
								indexIncomeEx=1;	
								
							}else if ("01" == result.code) {
								
							}
						}
			
					});
		
				}else if ("01" == result.code) {
					
				}
				
			}
		});

		// 第二层钻取点击事件
		myChart.on('click', function(object) {
			seriesName = object.seriesName;	//点击柱子的名称
			xkey = object.name;
			month=xkey;
			
			if (segementNum == 1 && orgNum > 1) {
				me.initChart3(myChart)
			} else if (segementNum > 1){
				me.initChart2(myChart)
			} else {
				return;
			}
			
			$('#return-button').show();

		});
	},
};

//加载DOM
var dom = document.getElementById("container"); 				 //dom加载容器
var myChartIncome = echarts.init(dom); 							 //初始化容器

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
				$('#return-button').hide();
				$('#chartTitle').html(orgName+" - 总收支分析");
			} else if(segementNum == 1){
				$('#chartTitle').html(segementName+"板块 - 总收支分析");
			} else {
				$('#chartTitle').html("集团 - 总收支分析");
			}
			
			//加载DOM，并且返回按钮
			drillDown.initChart(myChartIncome);
		}
	}
});

$('#return-button').on('click', function() { 					 //返回按钮加载事件，重新初始化
	if (indexIncomeEx == 1) {									 //第一层返回按钮无响应
		return;
	}
	echarts.dispose(dom);										 //返回必须销毁销毁dom
	myChartIncome = echarts.init(dom); 							 //初始化容器
	if (indexIncomeEx == 3) {									 //第三层返回第二层
		
		if(segementNum == 1){
			$('#return-button').hide();
			drillDown.initChart(myChartIncome)	//初始化第一层
		} else {
			drillDown.initChart2(myChartIncome)	//初始化第二层
			$('#return-button').show();
		}
	} else if (indexIncomeEx == 2) {									 //第二层返回第一层
		$('#return-button').hide();
		drillDown.initChart(myChartIncome)      //初始化第一层
	}
});


$("#incomeExpenditureYear").change(function(){                   //年份条件选择
	echarts.dispose(dom);										 //返回必须销毁销毁dom
	myChartIncome = echarts.init(dom); 							 //初始化容器
	option = drilldownIncomeEx.getOption();
	drilldownIncomeEx.initChart4(myChartIncome, option);
});

