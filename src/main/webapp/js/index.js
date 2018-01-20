
//集团年度总收支状况分析

	var indexIncomeEx = 0;				//每一层的标识，第一层为1，第2层为2
	var xkey;							//点击图形所在的键
	var seriesName;						//点击柱子的名称
	var month;							//月份

	
	var resizeIncomeExpenseMapContainer = function () {
		console.log($('#container'));
	    $('#container').css("width",$('#groupIncomeExpenditure').clientWidth+'px');
	    $('#container').css("height",$('#groupIncomeExpenditure').clientHeight+'px');
	};
	
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
						/*myChart.on('click', function(object) {
							segementName = object.name;
							me.initChart3(myChart)
							$('#return-button-incomeExpend').show();
							myChart.setOption(option, true);
						});	*/
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
								year : $("#incomeExpenditureYear  option:selected").val(),
								parentCode:"",
								childCode:"",
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
//			                                right:'1',
											left:20,
											data : a[1]
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
			/*myChart.on('click', function(object) {
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
				
				$('#return-button-incomeExpend').show();

			});*/
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
					$('#return-button-incomeExpend').hide();
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

	$('#return-button-incomeExpend').on('click', function() { 					 //返回按钮加载事件，重新初始化
		if (indexIncomeEx == 1) {									 //第一层返回按钮无响应
			return;
		}
		echarts.dispose(dom);										 //返回必须销毁销毁dom
		myChartIncome = echarts.init(dom); 							 //初始化容器
		if (indexIncomeEx == 3) {									 //第三层返回第二层
			
			if(segementNum == 1){
				$('#return-button-incomeExpend').hide();
				drillDown.initChart(myChartIncome)	//初始化第一层
			} else {
				drillDown.initChart2(myChartIncome)	//初始化第二层
				$('#return-button-incomeExpend').show();
			}
		} else if (indexIncomeEx == 2) {									 //第二层返回第一层
			$('#return-button-incomeExpend').hide();
			drillDown.initChart(myChartIncome)      //初始化第一层
		}
	});


	$("#incomeExpenditureYear").change(function(){                   //年份条件选择
		echarts.dispose(dom);										 //返回必须销毁销毁dom
		myChartIncome = echarts.init(dom); 							 //初始化容器
		option = drilldownIncomeEx.getOption();
		drilldownIncomeEx.initChart4(myChartIncome, option);
	});





	
	
	


	//集团年度盈利分析
	
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
				$("#incomeExpenditureYear").empty();// 清空下拉菜单节点
				for (var i = 0; i < years.length; i++) {
					var $opt = $("<option value=" + years[i] + ">" + years[i]
							+ "</option>");// 添加年份节点
					$("#incomeExpenditureYear").append($opt);

				}
			} else if ("01" == result.code) {

			}
		}
	});

	$('#incomeExpenditureYear').bind('change', function() { // 点击年份单击事件，重新初始化
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
				      data:['净盈利','毛利']						//图例，柱子的名称
				    },
			    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
			    toolbox: {
			        show : true,
			        right:40,
			        feature : {
//			            dataView : {show: true, readOnly: false},
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
					right : '6%',
					bottom : '60',
					containLabel : true
				},
			    series : [
			        {
			            name:"净利润",
			            type:'bar',
			            data:yData,
			        }
			    ]
			};

		return option;
	}

	//板块数据选项
	function getOrgOption(xData,yData) {

		var option = {
//			    title : {
//			        text: '某地区蒸发量和降水量',
//			        subtext: '纯属虚构'
//			    },
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
//			            dataView : {show: true, readOnly: false},
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
					right : '6%',
					bottom : '60',
					containLabel : true
				},
			    series : [
			        {
			            name:"净利润",
			            type:'bar',
			            data:yData,
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

			var yearNow = $('#incomeExpenditureYear option:selected') .val();//选中的值

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
//							legendData[i] = a[0][i];
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

			var yearNow = $('#incomeExpenditureYear option:selected') .val();//选中的值

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
//							legendData[i] = a[0][i];
						}
						// option.series[0].data中name属性相同

						myChart.setOption(getProjectOption(respProfit.nameList, respProfit.valueList), true);
						profit1_index2 = 2;// 第二层标识
						// 第三层钻取
						/*myChart.on('click', function(object) {
							$('#returnBtn').show();
							segementName = object.name;
							me.initChart3(myChart)
						});*/
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
					year : profit1_yearAll,
					parentCode:"",
					childCode:"",
				},
				success : function(result) {
					if ("02" == result.code) {
						var respProfit = result.data;
						// 赋值
						var a = [];
						a[0] = respProfit.nameList;
						a[1] = [ "净利","毛利"];
						a[2] = respProfit.valueList;
						a[3] = respProfit.year + "年集团净利情况表";
						a[4] =respProfit.maoliList;
						// 填入数据
						myChart.setOption({
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
						            mark : {show: true},
						            magicType: {show: true, type: ['line', 'bar']},
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
							},
							grid : {
								left : '3%',
								right : '6%',
								bottom : '3%',
								containLabel : true
							},
							/*series : data*/
						// 柱状图所有数据
							series: [{
									name:'净利',
									type: 'bar',
									data:a[2],
							    	},{
							    	name:'毛利',
								    type: 'bar',
								    data:a[4],
								    }]

						});
						profit1_index2 = 1;// 第一层标识
						// 第二层钻取点击事件
						/*myChart.on('click', function(object) {
							profit1_xkey2 = object.name;// 点击柱子的x轴
							
							if (segementNum == 1 && orgNum > 1) {
								me.initChart3(myChart);
							} else if(orgNum > 1) {
								me.initChart2(myChart);
							} else {
								return;
							}
							$('#return-buttonGainFeeReport1').show();
						});*/
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
					$('#return-buttonGainFeeReport1').hide();
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


	$('#return-buttonGainFeeReport1').on('click', function() { // 返回按钮加载事件，重新初始化

		if (profit1_index2 == 1) {// 第一层无操作
			return;
		}
		echarts.dispose(profit1_dom2);// 返回必须销毁销毁dom
		profit1_myChart2 = echarts.init(profit1_dom2); // 初始化容器

		if (profit1_index2 == 3) {// 第三层返回第二层
			if(segementNum == 1){
				$('#return-buttonGainFeeReport1').hide();
				profit1_drilldown2.initChart(profit1_myChart2)// 初始化第二层
			} else {
				profit1_drilldown2.initChart2(profit1_myChart2)// 初始化第二层
			}
			
		} else if (profit1_index2 == 2) {// 第二层返回第一层
			$('#return-buttonGainFeeReport1').hide();
			profit1_drilldown2.initChart(profit1_myChart2)// 初始化第一层
		}

	});

	//自适应窗口大小
	window.onresize = profit1_myChart2.resize;
	
	
	
	
	
	//集团现金分析

	var indexCapital=0;				//每一层的标识，第一层为1，第2层为2
	var xkeyCapital;				//点击图形所在的x轴的所在键
	var type;						//资金种类
	var project;
	// 定义的下钻函数
	var drillDownCapital = {
		//第一层初始化函数
		initChart : function(myChart) {
			
			var me =this;
			
			var a=[];		
			a[0]=[];
			a[1]=[];
			a[2]="集团资金情况";
			
			// 第一层异步加载数据
			$.ajax({ // 按资金种类获取资金报表数据
				type : "GET",
				url : "/jx-web-portal/Capital/searchCapitalInfoByType",
				dataType : "json",
				data:{
					year : $("#incomeExpenditureYear  option:selected").val(),
					parentCode:"",
					childCode:"",
				},
				success : function(result) {		
					if ("02" == result.code){
						
						var option = getPieOption();
						option.series[0].type = 'pie';
//						option.title.text = a[2];
						option.tooltip.formatter= '{a}<br/>{b} : {c}万元 ({d}%)';
						option.legend.orient='vertical';//竖直放
						option.label.normal.formatter='{b} : {c}万元 ({d}%)' ;//图显示数据

						for (var i = 0; i < result.data.length; i++) {//循环赋值
							a[0][i]=result.data[i].type;
							a[1][i]=result.data[i].money;
						}
						
					
						var data=[];	//饼状图所有数据
						var legendData=[];
						for (var i= 0; i < a[0].length; i++) {
									data[i]={value:a[1][i],name:a[0][i]};
									legendData[i]=a[0][i];
						}		  
						
							
							option.series[0].data=data;//所有数据
							option.legend.data=null;
							option.xAxis = null;		
							option.yAxis = null;
								
							myChart.setOption(option, true);
							indexCapital=1; //第一层标识为1
					}else if ("01" == result.code) {
						
					}
		
				}
			});
		},

	};

	// 加载DOM
	var domCapital = document.getElementById("containerCapital"); 	// dom加载容器
	var myChartCapital = echarts.init(domCapital); 					//初始化容器

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
					$('#return-buttonCapital').hide();
					$('#chartTitle').html(orgName+" - 资金分析");
				} else if(segementNum == 1){
					$('#chartTitle').html(segementName+"板块 - 资金分析");
				} else {
					$('#chartTitle').html("集团 - 资金分析");
				}
				
				drillDownCapital.initChart(myChartCapital);
			}
		}
	});

	
	//集团实际上交税费分析

	$.ajax({ //  第一层异步加载数据，动态添加年份
		type : "GET",
		url : "/jx-web-portal/Tax/searchTaxAllYears",
		dataType : "json",
		success : function(result) {
			if ("02" == result.code){
				$("#taxYear").empty();								// 清空下拉菜单节点
				for (var i = 0; i < result.data.length; i++) { 
					var $opt = $("<option value=" + result.data[i]
							+ ">" + result.data[i] + "</option>");	// 添加年份节点
					$("#incomeExpenditureYear").append($opt);
				}
				
			}else if ("01" == result.code) {
			}
		}
	});	

	// 定义的下钻函数
	var drillDownTax = {
		initChart : function(myChart) {
			var me =this;
			myChart.setOption(getBarOption());		
			$.ajax({ 	// 获取年份数据
				type : "GET",
				url : "/jx-web-portal/Tax/searchTaxInfoByYear",					
				dataType : "json",
				data : {
					yearInfo : $("#incomeExpenditureYear  option:selected").val()
				},
				success : function(result) {
					if ("02" == result.code){
						var a=[];	
						a[0]=[];
						a[1]=["税"];
						a[2]=[];
						a[3]=$("#incomeExpenditureYear  option:selected").val()+"年集团纳税情况";
						
						for (var i = 0; i < result.data.length; i++) { 	//循环加载每月的收入支出
							a[0][i] = result.data[i].month;					
							a[2][i] = result.data[i].tax;								
						}	
						var data=[];									//柱状图所有数据			
						for (var i= 0; i < a[1].length; i++) {			//循环加载柱状图数据
								data[i]={
										name:a[1][i],
										type:'bar',
										barMaxWidth: 50,
										data:a[2+i]
								};		
						};
						
						myChart.setOption({
							legend: {
								   left : 10,
									data:a[1]	//柱子的名称
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

							xAxis : {
								data : a[0]		//X轴的数据
							},
							series : data		//柱状图所有数据
						
						});
					}
				},
			});
		},
		
	};
	// 加载DOM
	var domTax = document.getElementById("containerTax");	// dom加载容器
	var myChartTax = echarts.init(domTax);					// 初始化容器

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
					$('#chartTitle').html(orgName+" - 实际上交税费分析");
				} else if(segementNum == 1){
					$('#chartTitle').html(segementName+"板块 - 实际上交税费分析");
				} else {
					$('#chartTitle').html("集团 - 实际上交税费分析");
				}
				
				drillDownTax.initChart(myChartTax);
			}
		}
	});
	//自适应窗口大小
	window.onresize = myChartTax.resize;

	
	
	
	
	
//资产负债表  balanceSheet	
	// 定义的下钻函数
	var drillDownFinanceFee = {
		initChart : function(myChart) {
			var me =this;
			myChart.setOption(getBarOption());		
			$.ajax({//第一层异步加载数据 动态添加年份
				type : "GET",
				url : "/jx-web-portal/BalanceSheet/searchBalanceSheetAllYears",
				dataType : "json",
				success : function(result) {
					if ("02" == result.code){
						$("#incomeExpenditureYear").empty();						//清空下拉菜单节点
						for (var i = 0; i < result.data.length; i++) { 
							var $opt = $("<option value=" + result.data[i]
									+ ">" + result.data[i] + "</option>");	//添加年份节点
							$("#incomeExpenditureYear").append($opt);
						}
						var a=[];							
						a[0]=[];
						a[1]=["资产数","负债数"];
						a[2]=[];
						a[3]=[];
						a[4]=[];
						a[5]=$("#incomeExpenditureYear  option:selected").val()+"集团年度资产 /负债情况";		
						$.ajax({ 											//后台获取年份数据
							type : "GET",
							url : "/jx-web-portal/BalanceSheet/searchBalanceSheetInfoByYear",					
							dataType : "json",
							data : {
								year : $("#incomeExpenditureYear  option:selected").val(),
								parentCode:"",
								childCode:"",
							},
							success : function(result) {
								if ("02" == result.code){
									a[0]=result.data.monthArr;
									a[2]=result.data.assetArr;
									a[3]=result.data.debtArr;	
									
									for (var i = 0; i < a[2].length; i++) {
										a[4][i]=(a[3][i]/ a[2][i]).toFixed(2);
									}									
									var data=[];
									for (var i= 0; i < a[1].length; i++) {		//循环加载柱状图数据
											data[i]={name:a[1][i],type:'bar',data:a[2+i]};		
									}
									// 填入数据
									myChart.setOption({
										toolbox: {
										    show : true,
										    right : 40,
										    feature : {
										        mark : {show: true},
										        magicType: {show: true, type: ['line', 'bar']},
										        restore : {show: true},
										        saveAsImage : {show: true}
										    }
										},
										color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
										 legend: {
											  orient: 'horizontal',
										      align:'left',
										      left:'10',
										      itemGap:5,
										      data:a[1]//柱子的名词
										    },
										grid:{
												top:'27%'	
										},
										xAxis : {
											axisLabel: {
								                formatter: '{value}'
								            },
											data : a[0]//X轴的数据
										},
										yAxis : [{
											type : 'value',
											name : '单位:万元',
											 axisLine: {
										            show:true
										        },
										        axisTick: {
										            show: true
										        },
											 axisLabel: {
									                formatter: '{value}'
									            }
										},
										],
										 series : data								//柱状图所有数据
									
									});
									indexFinanceFee=1;	
								}else if ("01" == result.code) {
									
								}	
							}
						});	
					}else if ("01" == result.code) {
						
					}
				}
			});	
		},
		
	};
	var domFinanceFee = document.getElementById("containerFinanceFee"); 		//dom加载容器
	var myChartFinanceFee = echarts.init(domFinanceFee); 						//初始化容器


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
					$('#chartTitle').html(orgName+" - 年度资产/负债分析");
				} else if(segementNum == 1){
					$('#chartTitle').html(segementName+"板块 - 年度资产/负债分析");
				} else {
					$('#chartTitle').html("集团 - 年度资产/负债分析");
				}
				
				//加载DOM，并且返回按钮
				drillDownFinanceFee.initChart(myChartFinanceFee);
			}
		}
	});

	$("#incomeExpenditureYear").change(function(){  									//年份条件选择
		 echarts.dispose(domFinanceFee);											//返回必须销毁销毁dom
		 myChartFinanceFee = echarts.init(domFinanceFee); 						//初始化容器
		
		 drillDownFinanceFee.initChart(myChartFinanceFee, getOption());
	});


	window.onresize = function () {
	    //重置容器高宽
		resizeIncomeExpenseMapContainer();
	    myChartIncome.resize();
	};
	
	
$('#sidebarToggleBtn').on("click",function(){
	resizeIncomeExpenseMapContainer();
    myChartIncome.resize();
});






