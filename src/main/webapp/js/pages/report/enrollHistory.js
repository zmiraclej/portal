var year=$("#year").val();//年份信息

$("#year").change(function(){
	year=$("#year").val();
})

function getOption(legendData,data){
	var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow',
		            label: {
		                show: true
		            }
		        }
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            //dataView : {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    legend: {
				 orient:'horizontal',//设置图例的排列方式，默认为水平排列，这里设置为竖直排列
				 left:10,
				 itemGap:5,//设置图例之间的间距
			     data:legendData//柱子的名词
			    },
		    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    grid: {
		        top: '12%',
		        left: '1%',
		        right: '1%',
		        containLabel: true
		    },
		    dataZoom: [
		        {
		            show: true,
		            start: 1,
		            end: 20,
		            xAxisIndex: [0]
		        },
		        {
		            type: 'inside',
		            start: 94,
		            end: 100
		        },
		    ],
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
			yAxis : [{
				type : 'value',
				name : 'y(单位：人数)',
				 axisLabel: {
		                formatter: '{value} 人'
		            }
				}
			],
			label:{ 	//显示数据
				normal:{ 
				show: true, 
				
				position: 'top'} 
				},
		    series : []
		};
	
	return option
}

function getSimpleOption(legendData,data){
	var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow',
		            label: {
		                show: true
		            }
		        }
		    },
		    calculable : true,
		    legend: {
				 orient:'horizontal',//设置图例的排列方式，默认为水平排列，这里设置为竖直排列
				 left:10,
				 itemGap:5,//设置图例之间的间距
			     data:legendData//柱子的名词
			    },
		    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    grid: {
		        top: '12%',
		        left: '1%',
		        right: '1%',
		        containLabel: true
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
			yAxis : [{
				type : 'value',
				name : 'y(单位：人数)',
				 axisLabel: {
		                formatter: '{value} 人'
		            }
				}
			],
			label:{ 	//显示数据
				normal:{ 
				show: true, 
				
				position: 'top'} 
				},
		    series : []
		};
	
	return option
}

// 定义的下钻函数
var drillDownEnrol = {

	//第一层初始化函数
	initChart : function(myChart) {
		
		var me =this;
				
		// 第一层异步加载数据
		var a=[];	
		
		//横坐标 计划名称
		a[0]=[];
		//图例
		a[1]=["报名人数","审核通过人数","参测人数","录取人数","缴费人数"];
		//指定计划的报名人数
		a[2]=[];
		//指定计划的审核通过人数
		a[3]=[];
		//指定计划的参测人数
		a[4]=[];
		//指定计划的录取人数
		a[5]=[];
		//标题
		a[6]=[];
		//标题
		a[7]="集团历年报名情况";
		$.get("searchEnrollHistoryByItem","year="+year,
				function(result){
			var dataObj=result.data;
//			alert(JSON.stringify(result));
			var option;
			if ('02' == result.code) {
				var rotateVal = 0;
				if (result.data.length > 1) {
					rotateVal = 0;
					option = getOption();
				} else {
					option = getSimpleOption();
				}
				
				for(var i=0;i<dataObj.length;i++){
					var obj=dataObj[i];
					a[0][i]=obj.scheduleName;
					a[2][i]=obj.baomingNum;
					a[3][i]=obj.auditNum;
					a[4][i]=obj.ceshiNum;
					a[5][i]=obj.luquNum;
					a[6][i]=obj.payNum;
				}
				//ajax异步请求，注意加载数据放在success方法中
				var data=[];	//柱状图所有数据	
				for (var i= 0; i < a[1].length; i++) {//循环加载柱状图数据
								data[i]={name:a[1][i],type:'bar',data:a[2+i]};		
						}
				myChart.setOption(option);
				// 填入数据
				myChart.setOption({
					//定义柱状图的颜色
					color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
					 legend: {
						 orient:'horizontal',//设置图例的排列方式，默认为水平排列，这里设置为竖直排列
						 left:10,
						 itemGap:5,//设置图例之间的间距
					     data:a[1]//柱子的名词
					    },
					
					grid:{
						top:70,//设置图形区域到顶部的距离，解决标题和图形相互重叠的问题
						bottom:100//设置图形区域到底部的距离，解决底部横坐标旋转后高度过高显示不全的问题
					},
					xAxis : {
						axisLabel: {
						
							    interval:0 ,  //x轴坐标全部显示
							    rotate:rotateVal ,  //横坐标旋转角度，解决横坐标文字过长相互重叠的问题
							
			                formatter: '{value}'
			            },
						data : a[0]//X轴的数据
					},
					 series : data//柱状图所有数据	
				});
			}
		},"json")
	
	},
};


// 加载DOM，并且返回按钮
var domEnrol = document.getElementById("containerEnrol"); // dom加载容器
var myChartEnrol = echarts.init(domEnrol); // 初始化容器
drillDownEnrol.initChart(myChartEnrol);

