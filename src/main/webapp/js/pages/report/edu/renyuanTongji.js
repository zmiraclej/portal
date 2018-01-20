
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
		    calculable : true,
		    legend: {
		        data:['学生', '老师'],
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
		        },
		        {
		            name: '老师',
		            type: 'bar',
		            barMaxWidth:60,
		            data: score_data.jiaoshi
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
		        data:['教师','学生'],
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
		            data : ['2013-2014学年上学期', '2013-2014学年下学期','2014-2015学年上学期', '2014-2015学年下学期','2015-2016学年上学期', '2015-2016学年下学期','2016-2017学年上学期', '2016-2017学年下学期'],
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
		            name: '教师',
		            type: 'line',
		            barMaxWidth:60,
		            data: [226,227,224,221,220,229,228]
		        },
		        {
		            name: '学生',
		            type: 'line',
		            barMaxWidth:60,
		            data: [1826,1827,1824,1821,1820,1829,1828]
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
    	
    	echarts.dispose(dom);			// 销毁dom
		myChart = echarts.init(dom);
	  	myChart.setOption(getSeconChart());
	  	$('#returnBtn').show();
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
