var index4;// 每一层的标识，第一层为1，第2层为2
var xkey4;//点击图形所在的键

// 定义的下钻函数
var drillDown4 = {

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
	

	
	//第二层初始化
	initChart2 : function(myChart, option) {
		index4 = 2;// 第二层标识
		var me =this;
		echarts.dispose(dom4);// 销毁dom4
		myChart = echarts.init(dom4);//初始化demo
		
	
	
		var a=[];	
		a[0]=["成华校区", "郫县校区", "达州校区", "成都7中国际高中部", "北城分校"];
		a[1]=[2000, 500, 600, 2500, 900];
		a[2]=xkey4+"年集团录取人数分布";
	
		
		
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


	//第一层初始化函数
	initChart : function(myChart, option) {
		var me =this;
		myChart.setOption(option);		
		// 第一层异步加载数据

		var a=[];	
		
			a[0]=["2013", "2014", "2015", "2016", "2017"];
			a[1]=["报名人数","录取人数","录取率"];
			a[2]=[320, 330, 340, 350,400];
			a[3]=[20, 33, 46, 59, 72];
			a[4]=[];
			for (var i = 0; i < a[2].length; i++) {
				a[4][i]=a[3][i]/a[2][i];
			}
			a[5]="集团历年招生录取情况";
			
			
			var data=[];	//柱状图所有数据
			
			for (var i= 0; i < a[1].length; i++) {//循环加载柱状图数据
					data[i]={name:a[1][i],type:'bar',data:a[2+i]};		
			}
			data[2].type='line';
			
			// 填入数据
			myChart.setOption({
				title : {
					text : a[5],
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
			//第二层钻取点击事件
			myChart.on('click', function(object) {
				
				xkey4=object.name;
				me.initChart2(myChart, option)
				
			});
			
	
		
	},

};




// 加载dom4，并且返回按钮
var dom4 = document.getElementById("containerApply"); // dom4加载容器
var myChart4 = echarts.init(dom4); // 初始化容器
var option4 = drillDown4.getOption();
drillDown4.initChart(myChart4, option4);
$('#return-buttonApply').on('click', function() { // 返回按钮加载事件，重新初始化
	echarts.dispose(dom4);// 返回必须销毁销毁dom4
	 myChart4 = echarts.init(dom4); // 初始化容器
	 option4 = drillDown4.getOption();
	

		drillDown4.initChart(myChart4,option4)//初始化第一层
	

});
