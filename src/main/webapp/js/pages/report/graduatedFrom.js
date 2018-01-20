
// 定义的下钻函数
var drillDownEnrol2 = {

	getOption : function() {
		var option = null;	
		option = {
			title : {
				text : '柱状图',
				left : 'center'
			},
			//设置饼图的颜色显示，会按照顺序依次去取颜色
			color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
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
			yAxis : [{
				type : 'log',
				name : 'y(单位：人数)',
				 axisLabel: {
		                formatter: '{value} 人'
		            }
			}
		
			],
			series : [ {
				name : [],
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
		a[0]=["成都外国语学校","石室外国语学校","成都市泡桐树小学","成都市龙江路小学","成都师范附属小学","成都市实验小学","成都市树德小学",
		      "成都师范银都小学","四川大学附属实验小学","四川师范大学附属实验学校"];
		a[1]=[123,80,110,55,32,95,150,25,60,77];
		a[2]="新生毕业院校";
		
		
		option.series[0].type = 'pie';//设置类型为饼图
		option.title.text = a[2];//设置标题
		option.tooltip.formatter= '{b} : {c} ({d}%)';
		option.legend.orient='vertical';//图例竖直放
		option.legend.show = false;// 隐藏图例
		option.label.normal.formatter='{b} : {c} ({d}%)' ;//图显示数据
		
	
	
	
	
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


// 加载DOM，并且返回按钮
var domEnrol2 = document.getElementById("containerEnrol2"); // dom加载容器
var myChartEnrol2 = echarts.init(domEnrol2); // 初始化容器
var optionEnrol2 = drillDownEnrol2.getOption();
drillDownEnrol2.initChart(myChartEnrol2, optionEnrol2);


//自适应窗口大小
window.onresize = myChartEnrol2.resize;

