

// 定义的下钻函数
var drillDown6 = {

	getOption : function() {
		var option = null;	
		option = {
			title : {
				text : '柱状图',
				left : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : '{a}<br/>{b} : {c}'
			},
			legend : {
				left : 'left',
				data : [ '年数据' ]
			},
			xAxis : {
				axisLabel :{  
				    interval:0   //x轴坐标全部显示
				},
				type : 'category',
				name : 'x',
				splitLine : {
					show : false
				},
				data : []
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			yAxis : {
				type : 'log',
				name : 'y(单位：人民币)'
			},
			series : [ {
				name : '年数据',
				type : 'bar',
				data : []
			} ],
			label:{ 	//显示数据
				normal:{ 
				show: true, 
				
				position: 'top'} 
				}
		};

		return option;
	},
	
	


	//第一层初始化函数
	initChart : function(myChart, option) {
		var me =this;
		myChart.setOption(option);		
		// 第一层异步加载数据

		var a=[];	
		
			a[0]=["1601班", "1602班", "1603班", "1604班", "1605班", "1606班", "1607班", "1608班", "1609班", "1610班"];
			
			
			a[1]=["平均分","最高分","优秀率","及格率","低分率"];
			a[2]=[50, 60, 70, 80, 50, 70, 80, 90, 60, 60];
			a[3]=[80, 83, 86, 89, 92, 85, 98, 81, 94, 97];
			a[4]=[0.9, 0.8, 0.6, 0.4, 0.2, 0.60, 0.68, 0.76, 0.84, 0.92];
			a[5]=[0.7, 0.6, 0.5, 0.4, 0.4, 0.70, 0.88, 0.46, 0.34, 0.62];
			a[6]=[0.4, 0.4, 0.6, 0.78, 0.76, 0.56, 0.78, 0.54, 0.75, 0.34];
			a[7]="本部三率一分";
			
			
			var data=[];	//柱状图所有数据
			
			for (var i= 0; i < a[1].length; i++) {//循环加载柱状图数据
					data[i]={name:a[1][i],type:'line',data:a[2+i]};		
			}
		
			
			// 填入数据
			myChart.setOption({
				title : {
					text : a[7],
					left : 'center'
				},
				 legend: {
				
				        data:a[1]//柱子的名词
				    },
				xAxis : {
					data : a[0]//X轴的数据
				},
				 series : data//柱状图所有数据
			
			});
	
	
		
	},

};




// 加载dom6，并且返回按钮
var dom6 = document.getElementById("containerRecord"); // dom6加载容器
var myChart6 = echarts.init(dom6); // 初始化容器
var option6 = drillDown6.getOption();
drillDown6.initChart(myChart6, option6);

