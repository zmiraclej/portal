var indexCapital=0;				//每一层的标识，第一层为1，第2层为2
var xkeyCapital;				//点击图形所在的x轴的所在键
var type;						//资金种类
var project;
// 定义的下钻函数
var drillDownCapital = {
	//第三层初始化
	initChart3 : function(myChart) { //按校区分布资金状况报表

		var me=this;
		indexCapital = 3;// 第三层标识
		echarts.dispose(domCapital);// 销毁dom
		myChart = echarts.init(domCapital);//初始化demo
		
		var a=[];		
		a[0]=[];
		a[1]=[];
		a[2]=xkeyCapital+"板块各公司"+type+"分布";
	
			$.ajax({ // 按校区获取资金报表数据
				type : "GET",
				url : "/jx-web-portal/Capital/searchCapitalInfoBySchool",
				dataType : "json",
				data : {
					project:segementName,type:type
				},
				success : function(result) {	
					if ("02" == result.code){
						
						var option = getPieOption();
						option.series[0].type = 'pie';
						option.tooltip.formatter= '{a}<br/>{b} : {c}万元 ({d}%)';
						option.legend.orient='vertical';//竖直放
						option.label.normal.formatter='{b} : {c}万元 ({d}%)' ;//图显示数据
		
						for (var i = 0; i < result.data.length; i++) {//循环赋值
							a[0][i]=result.data[i].school;
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
							option.grid = null;
							option.yAxis = null;
							
							myChart.setOption(option, true);	
				
					}else if ("01" == result.code) {
						
					}		
				}
			});

	},
	
	//第二层初始化
	initChart2 : function(myChart) {
		indexCapital = 2;// 第二层标识
		var me =this;
		echarts.dispose(domCapital);// 销毁dom
		myChart = echarts.init(domCapital);//初始化demo
		
		var a=[];		
		a[0]=[];
		a[1]=[];
		a[2]="集团板块"+xkeyCapital+"分布";
		
		
			$.ajax({ // 按板块获取资金报表数据
				type : "GET",
				url : "/jx-web-portal/Capital/searchCapitalInfoByProject",
				dataType : "json",
				data : {
					typeInfo:type
				},
				success : function(result) {	
					if ("02" == result.code){
						
						var option = getPieOption();
						
						option.series[0].type = 'pie';
//						option.title.text = a[2];
						option.tooltip.formatter= '{a}<br/>{b} : {c}万元 ({d}%)';
						option.legend.orient='vertical';//竖直放
						option.label.normal.formatter='{b} : {c}万元 ({d}%)' ;//显示数据

						for (var i = 0; i < result.data.length; i++) {//循环赋值
							a[0][i]=result.data[i].project;
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
							option.grid = null;
							option.yAxis = null;
							
							myChart.setOption(option, true);

						// 第三层钻取
						myChart.on('click', function(object) {					
							xkeyCapital=object.name;
							segementName=xkeyCapital;
							me.initChart3(myChart, option)
							myChart.setOption(option, true);

						});
								
					}else if ("01" == result.code) {
						
					}	
				}
				
				
				
				
			});
			

	},


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
			success : function(result) {		
				if ("02" == result.code){
					
					var option = getPieOption();
					option.series[0].type = 'pie';
//					option.title.text = a[2];
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
			//第二层钻取点击事件
			myChart.on('click', function(object) {
				seriesNameCapital = object.seriesName;			//点击柱子的名称
				xkeyCapital=object.name;
				type=xkeyCapital;
				
				if (segementNum == 1 && orgNum > 1) {
					me.initChart3(myChart)
				} else if (segementNum > 1){
					me.initChart2(myChart)
				} else {
					return;
				}
				
				$('#return-buttonCapital').show();
				
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

$('#return-buttonCapital').on('click', function() { 			// 返回按钮加载事件，重新初始化
	if (indexCapital ==1) { 									//第一层返回无响应
		return;
	}
	echarts.dispose(domCapital);								//返回必须销毁dom
	 myChartCapital = echarts.init(domCapital);					 //初始化容器
	
	if (indexCapital==2) {										//第二层返回第一层
		$('#return-buttonCapital').hide();
		drillDownCapital.initChart(myChartCapital); //初始化第一层
		
	} else if (indexCapital ==3) {										//第三层返回第二层
		if (segementNum == 1){
			$('#return-buttonCapital').hide();
			// 返回第一层
			drillDownCapital.initChart(myChartCapital);
		} else {
			drillDownCapital.initChart2(myChartCapital); //初始化第二层
		}
	}

});

//自适应窗口大小
//window.onresize = myChartCapital.resize;
$(window).resize(function(){
	myChartCapital.resize();
});