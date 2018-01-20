var indexTax=0;		//每一层的标识，第一层为1，第2层为2
var xkeyTax;		//点击图形所在的x轴的键
var seriesNameTax;	//点击柱子的名称
var monthTax;		//月份

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
				$("#taxYear").append($opt);
			}
			
		}else if ("01" == result.code) {
		}
	}
});	

// 定义的下钻函数
var drillDownTax = {
	//第三层初始化
	initChart3 : function(myChart) { //按校区分布税务表
		indexTax = 3;						// 第三层标识
		echarts.dispose(domTax);			// 销毁dom
		myChart = echarts.init(domTax);		//初始化demo
		
		var a=[];		
		a[0]=[];
		a[1]=["税"];
		a[2]=[];
		a[3]=$("#taxYear  option:selected").val()+"年"+monthTax+"月"+xkeyTax+"板块各校区纳税分布";
		
			$.ajax({ 						// 按校区获取税务表数据
				type : "GET",
				url : "/jx-web-portal/Tax/searchTaxInfoBySchool",
				dataType : "json",
				data : {
					projectInfo:segementName,
					yearInfo:$("#taxYear  option:selected").val(),
					monthInfo:monthTax
				},
				success : function(result) {	
					if ("02" == result.code){
						
						var option = getPieOption();
						option.series[0].type = 'pie';
						option.grid.top="20%";
						option.tooltip.formatter= '{a}<br/>{b} : {c}万元 ({d}%)';
						option.legend.orient='vertical';					//竖直放
						option.label.normal.formatter='{b} : {c}万元 ({d}%)' ;//图显示数据
		
						for (var i = 0; i < result.data.length; i++) {		//循环赋值
							a[0][i]=result.data[i].school;
							a[2][i]=result.data[i].tax;
						}
						
					
						var data=[];								//饼状图所有数据
						var legendData=[];
						for (var i= 0; i < a[0].length; i++) {
									data[i]={value:a[2][i],name:a[0][i]};
									legendData[i]=a[0][i];
						}		  
						option.series[0].center=['50%', '55%']; //圆心坐标
						option.series[0].data=data;				//所有数据
						option.legend.data=null;
						option.xAxis = null;					
						option.yAxis = null;
						myChart.setOption(option, true);		
					}else if ("01" == result.code) {
						
					}	
				}
			});

	},
	
	//第二层初始化
	initChart2 : function(myChart) {
		indexTax = 2;					// 第二层标识
		var me =this;
		echarts.dispose(domTax);		// 销毁dom
		myChart = echarts.init(domTax);	//初始化demo
		
		var a=[];		
		a[0]=[];
		a[1]=["税"];
		a[2]=[];
		a[3]=$("#taxYear  option:selected").val()+"年"+monthTax+"月集团纳税情况";
		
			$.ajax({ 					// 按板块获取税务表数据
				type : "GET",
				url : "/jx-web-portal/Tax/searchTaxInfoByProject",
				dataType : "json",
				data : {
					yearInfo:$("#taxYear  option:selected").val(),monthInfo:monthTax
				},
				success : function(result) {			
					if ("02" == result.code){
						
						var option = getPieOption();
						option.series[0].type = 'pie';
						option.tooltip.formatter= '{a}<br/>{b} : {c}万元 ({d}%)';	
						option.label.normal.formatter='{b} : {c}万元 ({d}%)' ;//图显示数据

						for (var i = 0; i < result.data.length; i++) {		//循环赋值
							a[0][i]=result.data[i].project;
							a[2][i]=result.data[i].tax;
						}
						
						var data=[];										//饼状图所有数据
						var legendData=[];
						for (var i= 0; i < a[0].length; i++) {
									data[i]={value:a[2][i],name:a[0][i]};
									legendData[i]=a[0][i];
						}		  
						
						
							option.series[0].data=data;						//所有数据
							option.legend.data=null;
							option.xAxis = null;
							option.yAxis = null;
							myChart.setOption(option, true);

						// 第三层钻取
						myChart.on('click', function(object) {	
							$('#returnBtn').show();
							
							segementName=object.name;
							
							me.initChart3(myChart, option)
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

		$.ajax({ 	// 获取年份数据
			type : "GET",
			url : "/jx-web-portal/Tax/searchTaxInfoByYear",					
			dataType : "json",
			data : {
				yearInfo : $("#taxYear  option:selected").val()
			},
			success : function(result) {
				if ("02" == result.code){
					var a=[];	
					a[0]=[];
					a[1]=["税"];
					a[2]=[];
					a[3]=$("#taxYear  option:selected").val()+"年集团纳税情况";
					
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
					
					// 填入数据
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
					indexTax =1;				//第一层标识
					//第二层钻取点击事件
					myChart.on('click', function(object) {
						seriesNameTax = object.seriesName;		// 点击柱子得到的柱子名称
						xkeyTax=object.name;
						monthTax=xkeyTax;
						
						if (segementNum == 1 && orgNum > 1) {
							me.initChart3(myChart)
						} else if (segementNum > 1){
							me.initChart2(myChart)
						} else {
							return;
						}
						

						$('#returnBtn').show();
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

$('#returnBtn').on('click', function() { 		// 返回按钮加载事件，重新初始化
	if(indexTax ==1){									//第一层返回按钮无响应
		return;
	}
	echarts.dispose(domTax);							// 返回必须销毁销毁dom
	myChartTax = echarts.init(domTax); 				// 初始化容器

	if (indexTax ==3) {									// 第三层返回第二层
		if (segementNum == 1) {
			$('#returnBtn').hide();
			drillDownTax.initChart(myChartTax)	//初始化第二层
		} else {
			drillDownTax.initChart2(myChartTax)	//初始化第二层
		}
		
	} else if (indexTax==2) {									//第二层返回第一层
		$('#returnBtn').hide();
		drillDownTax.initChart(myChartTax)	//初始化第一层
	}

});

	$("#taxYear").change(function(){  						//年份条件选择
		echarts.dispose(domTax);							// 返回必须销毁销毁dom
		 myChartTax = echarts.init(domTax); 				// 初始化容器
		 optionTax = drillDownTax.getOption();
		
		drillDownTax.initChart4(myChartTax, optionTax);
	});


//自适应窗口大小
//window.onresize = myChartTax.resize;
	$(window).resize(function(){
		myChartTax.resize();
	});