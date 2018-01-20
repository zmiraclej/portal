

// 定义的下钻函数
var drillDown9 = {

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
				data : [ ]
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
		a[0]=["四川省成都市", "四川省资阳市", "四川省郫县","重庆市", "山东", "河北","北京","河南", "其他"];
		a[1]=[4000,1000,800,200,100,100,100,100];
		a[2]="集团学生地区/生源";
	
			option.series[0].type = 'pie';
			option.title.text = a[2];
			option.tooltip.formatter= '{a}<br/>{b} : {c} ({d}%)';
			option.legend.orient='vertical';//竖直放
			option.label.normal.formatter='{b} : {c} ({d}%)' ;//柱状图显示数据
			
			
		var data=[];	//饼状图所有数据
		var legendData=[];
		for (var i= 0; i < a[0].length; i++) {
					data[i]={value:a[1][i],name:a[0][i]};
					legendData[i]=a[0][i];
		}		    
		  option.series[0].data=data;//所有数据
		  option.legend.data=legendData;//数据名称，必须和 option.series[0].data中name属性相同
		
		  option.xAxis = null;
			option.grid = null;
			option.yAxis = null;
			
			
			
			myChart.setOption(option, true);
	
	
		
	},

};




// 加载dom6，并且返回按钮
var dom9 = document.getElementById("containerSourceOfStudents"); // dom6加载容器
var myChart9 = echarts.init(dom9); // 初始化容器
var option9 = drillDown9.getOption();
drillDown9.initChart(myChart9, option9);

