var studentData = {
	    "student": [
			45,
			46,
			43,
			42,
			44,
			44,
			46,
			47,
			42,
			48,
			49,
			50,
			48,
			49,
			50
		],
	    "delta": [               
	    ],
	    "names": [
			"本部1701班",
			"本部1702班",
			"本部1703班",
			"本部1704班",
			"本部1705班",
			"本部1706班",
			"本部1707班",
			"本部1708班",
			"本部1709班",
			"本部1710班",
			"本部1711班",
			"本部1712班",
			"本部1713班",
			"本部1714班",
			"本部1715班"
	     ]
	};

function getTopOption(score_data){
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
		    label : { // 显示数据
				normal : {
					show : true,

					position : 'top'
				}
			},
		    calculable : true,
		    legend: {
		        data:['学生'],
		        itemGap: 5
		    },
		    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    grid: {
		        top: '12%',
		        left: '1%',
		        right: '1%',
		        bottom: 80,
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type : 'category',
		            data : score_data.names,
		            axisLabel :{ 
		                interval:0 ,  //x轴坐标全部显示
		                rotate:30
		            },

		        }
		    ],
		    yAxis: [
		        {
		            type : 'value',
		            name : '人员数目',
		        }
		    ],
		    series : [
		        {
		            name: '学生',
		            type: 'bar',
		            barMaxWidth:60,
		            data: score_data.xuesheng
		        }
		    ]
		};
	
	return option
}

function getSeconChart(){
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
		        data:['学生'],
		        itemGap: 5
		    },
		    label : { // 显示数据
				normal : {
					show : true,

					position : 'top'
				}
			},
		    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    grid: {
		        top: '12%',
		        left: '1%',
		        right: '1%',
		        bottom: 80,
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type : 'category',
		            data :studentData.names,
		            axisLabel :{ 
		                interval:0 ,  //x轴坐标全部显示
		                rotate:30
		            },

		        }
		    ],
		    yAxis: [
		        {
		            type : 'value',
		            name : '学生数',
		        }
		    ],
		    series : [
		        {
		            name: '学生',
		            type: 'bar',
		            barMaxWidth:60,
		            data: studentData.student,
		        }
		    ]
		};
	
	return option
}

var dom = document.getElementById("renyuanTongjiChart");
var myChart = echarts.init(dom);
var app = {};
myChart.showLoading();

$.get('js/pages/report/edu/data/reyuanTongji.json', function (shoolData) {
    myChart.hideLoading();
    myChart.setOption(getTopOption(shoolData));
    myChart.on('click', function(object) {
    	seriesNameCapital = object.seriesName;			//点击柱子的名称
    	xkeyCapital=object.name;
    	type=xkeyCapital;
    	
    	 layer.open({
    		  type: 1,
    		  title: '学生数据分析维度调整',
    		  area: ['650px', '260px'],
    		  shadeClose: true, //点击遮罩关闭
    		  maxmin: false,
    		  content: $('#hrefOption')
    		});
    });
});

layui.use(['form'], function(){
	  var form = layui.form();

	  form.on('submit(demo1)', function(data){
		  	layer.closeAll();
		  	echarts.dispose(dom);			// 销毁dom
			myChart = echarts.init(dom);
		  	myChart.setOption(getSeconChart());
		  	$('#returnBtn').show();
	        return false;
	      });

	});

$('#returnBtn').on('click',function(){
	echarts.dispose(dom);			// 销毁dom
	myChart = echarts.init(dom);
  	$('#returnBtn').hide();
  	$.get('js/pages/report/edu/data/reyuanTongji.json', function (shoolData) {
  	    myChart.hideLoading();
  	    myChart.setOption(getTopOption(shoolData));
  	    
  	    myChart.on('click', function(object) {
  	    	seriesNameCapital = object.seriesName;			//点击柱子的名称
  	    	xkeyCapital=object.name;
  	    	type=xkeyCapital;
  	    	
  	    	echarts.dispose(dom);			// 销毁dom
  			myChart = echarts.init(dom);
  		  	myChart.setOption(getSeconChart());
  		  	$('#returnBtn').show();
  	    });
  	});
});
