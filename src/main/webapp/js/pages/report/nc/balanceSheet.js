var indexFinanceFee=0;		//每一层的标识，第一层为1，第2层为2
var xkeyFinanceFee;			//点击图形所在的x轴的键的名称
var seriesNameFinanceFee;	//点击柱子的名称
var monthFinanceFee;		//月份

var segementName;
var orgName;


var orgNum = 0;
var segementNum = 0;

// 定义的下钻函数
var drillDownFinanceFee = {
	
	
	//第三层初始化
	initChart3 : function(myChart) { 	//按校区查询资产负债表信息
		indexFinanceFee = 3;					// 第三层标识
		echarts.dispose(domFinanceFee);			// 销毁dom
		myChart = echarts.init(domFinanceFee);
		myChart.setOption(getBarOption(), true);		//重新加载option

		var a=[];	
		a[0]=[];
		a[1]=["资产数","负债数"];
		a[2]=[];
		a[3]=[];
		a[4]=[];
		a[5]=$("#financeFeeYear  option:selected").val()+"年"+monthFinanceFee+"月"+xkeyFinanceFee+"板块公司资产负债表";
	
		$.ajax({ // 按板块获取资产负债表数据
			type : "GET",
			url : "/jx-web-portal/BalanceSheet/searchBalanceSheetInfoBySchool",
			dataType : "json",
			data : {
				projectInfo:segementName,yearInfo:$("#financeFeeYear  option:selected").val(),monthInfo:monthFinanceFee
			},
			success : function(result) {
				if ("02" == result.code){
					for (var i = 0; i < result.data.length; i++) {//循环赋值
						a[0][i]=result.data[i].school;
						a[2][i]=result.data[i].asset;
						a[3][i]=result.data[i].debt;

					}
				
					var data=[];	//柱状图所有数据
					
					for (var i= 0; i < a[1].length; i++) {//循环加载柱状图数据
							data[i]={name:a[1][i],type:'bar',data:a[2+i]};		
					}
					
			
					// 填入数据
					myChart.setOption({
						color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
						 legend: {
							 orient: 'horizontal',
						      align:'left',
						      left:'10',
						      itemGap:5,
						      data:a[1]//柱子的名词
						    },
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
						grid:{
							left : '6%',
							right : '7%',
							bottom : '12%',
							containLabel : true
						},
						xAxis : {
							axisLabel :{  
							    interval:0 ,  //x轴坐标全部显示
							    rotate:20 
							},
							name : '公司',
							data : a[0]//X轴的数据
						},
						 series : data//柱状图所有数据
					});			
				} else if ("01" == result.code) {
					
				}	
			}
		});
	},
	
	//第二层初始化
	initChart2 : function(myChart) {
		indexFinanceFee = 2;						//第二层标识
		var me =this;
		echarts.dispose(domFinanceFee);				//销毁dom
		myChart = echarts.init(domFinanceFee);		//初始化dom
		myChart.setOption(getBarOption(), true);			//重新加载option

			var a=[];	
			a[0]=[];
			a[1]=["资产数","负债数"];
			a[2]=[];
			a[3]=[];
			a[4]=[];
			for (var i = 0; i < a[2].length; i++) {
				a[4][i]=(a[3][i]/a[2][i]).toFixed(2);
			}
			a[5]=$("#financeFeeYear  option:selected").val()+"年"+monthFinanceFee+"月资产负债报表";
			$.ajax({ // 按板块获取资产负债表数据
				type : "GET",
				url : "/jx-web-portal/BalanceSheet/searchBalanceSheetInfoByProject",
				dataType : "json",
				data : {
					yearInfo:$("#financeFeeYear  option:selected").val(),monthInfo:monthFinanceFee
				},
				success : function(result) {
					if ("02" == result.code){
						for (var i = 0; i < result.data.length; i++) {	//循环赋值
							a[0][i]=result.data[i].project;
							a[2][i]=result.data[i].asset;
							a[3][i]=result.data[i].debt;
							a[4][i]=(a[3][i]/ a[2][i]).toFixed(2);
						}
					
						var data=[];									//柱状图所有数据
						
						for (var i= 0; i < a[1].length; i++) {			//循环加载柱状图数据
								data[i]={name:a[1][i],type:'bar',data:a[2+i]};		
						}
						
						// 填入数据
						myChart.setOption({
							title : {
								text : a[5],
								left : 'center'
									
							},
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
							      itemGap:2,
							      data:a[1]								//图例，柱子的名称
							    },
							    grid:{
									top:'90'
								},
							xAxis : {
								name : '板块',
								data : a[0]								//X轴的数据
							},
							yAxis : [{
								type : 'value',
								name : '单位:万元',
								 axisLabel: {
						                formatter: '{value}'
						            }
							},
							],
							 series : data								//柱状图所有数据
						
						});

						// 第三层钻取
						myChart.on('click', function(object) {			
							segementName = object.name;
							me.initChart3(myChart);
							$('#return-buttonFinanceFee').show();
						});			
					}else if ("01" == result.code) {
						
					}	
				}
			});
	},


	//第一层初始化函数
	initChart : function(myChart) {
		var me =this;
		myChart.setOption(getBarOption());		
		
		$.ajax({//第一层异步加载数据 动态添加年份
			type : "GET",
			url : "/jx-web-portal/BalanceSheet/searchBalanceSheetAllYears",
			dataType : "json",
			success : function(result) {
				if ("02" == result.code){
					$("#financeFeeYear").empty();						//清空下拉菜单节点
					for (var i = 0; i < result.data.length; i++) { 
						var $opt = $("<option value=" + result.data[i]
								+ ">" + result.data[i] + "</option>");	//添加年份节点
						$("#financeFeeYear").append($opt);
					}
					
					var a=[];	
					
					a[0]=[];
					a[1]=["资产数","负债数"];
					a[2]=[];
					a[3]=[];
					a[4]=[];
					a[5]=$("#financeFeeYear  option:selected").val()+"集团年度资产 /负债情况";
	
					$.ajax({ 											//后台获取年份数据
						type : "GET",
						url : "/jx-web-portal/BalanceSheet/searchBalanceSheetInfoByYear",					
						dataType : "json",
						data : {
							yearInfo : $("#financeFeeYear  option:selected").val()
						},
						success : function(result) {
							if ("02" == result.code){
								for (var i = 0; i < result.data.length; i++) { //循环加载每月的收入支出
									a[0][i] = result.data[i].month;					
									a[2][i] = result.data[i].asset;
									a[3][i] = result.data[i].debt;								
								}	
								
								for (var i = 0; i < a[2].length; i++) {
									a[4][i]=(a[3][i]/ a[2][i]).toFixed(2);
								}
								
								
								var data=[];								//柱状图所有数据
								
								for (var i= 0; i < a[1].length; i++) {		//循环加载柱状图数据
										data[i]={name:a[1][i],type:'bar',data:a[2+i]};		
								}
//								data[2].type='line'; 						//资产负债率为线型
//								data[2].yAxisIndex=1;						//资产负债率的Y轴坐标
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
										top:'90'
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
		
		myChart.on('click', function(object) {
			seriesNameFinanceFee = object.seriesName;						//点击柱子的名称
			xkeyFinanceFee=object.name;
			monthFinanceFee=xkeyFinanceFee;
			
			if (segementNum == 1 && orgNum > 1) {
				me.initChart3(myChart)
			} else if (segementNum > 1){
				me.initChart2(myChart)
			} else {
				return;
			}
			
			$('#return-buttonFinanceFee').show();
			
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


$('#return-buttonFinanceFee').on('click', function() { 						//返回按钮加载事件，重新初始化
	if (indexFinanceFee ==1) {												//第一层返回无响应
		return;	
	}
	
	echarts.dispose(domFinanceFee);											//返回必须销毁销毁dom
	 myChartFinanceFee = echarts.init(domFinanceFee); 						//初始化容器
  	if (indexFinanceFee ==3) {	
		//第三层返回第二层
		if(segementNum == 1){
			$('#return-buttonFinanceFee').hide();
			drillDownFinanceFee.initChart(myChartFinanceFee)	//初始化第一层
		} else {
			$('#return-buttonFinanceFee').show();
			drillDownFinanceFee.initChart2(myChartFinanceFee)	//初始化第二层
		}
		
	} else if (indexFinanceFee==2) {												//第二层返回第一层
		$('#return-buttonFinanceFee').hide();
		drillDownFinanceFee.initChart(myChartFinanceFee)	//初始化第一层
	}

});


$("#financeFeeYear").change(function(){  									//年份条件选择
	 echarts.dispose(domFinanceFee);											//返回必须销毁销毁dom
	 myChartFinanceFee = echarts.init(domFinanceFee); 						//初始化容器
	
	 drillDownFinanceFee.initChart(myChartFinanceFee, getOption());
});



//自适应窗口大小
//window.onresize = myChartFinanceFee.resize;
$(window).resize(function(){
	myChartFinanceFee.resize();
});
