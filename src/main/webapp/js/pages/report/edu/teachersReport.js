var data = {
	    "yanjiusheng": [
			88,
			85,
			72,
			69,
			49,
			32,
			30
	    ],
	    
	    "benke": [
			89,
			44,
			52,
			66,
			53,
			72,
			43
	    ],
	    "zhuanke": [
			19,
			14,
			12,
			6,
			13,
			12,
			3
	    ],
	    
	    "delta": [               
	    ],
	    "names": [
	    	"外国语学校小学(锦江校区)",
			"成都嘉祥外国语学校",
			"成都七中嘉祥外国语学校",
			"成都嘉祥国际学校（国际高中）",
			"北城校区",
			"成华校区",
			"达州校区"
	     ]
	};

function getTopOption(data){
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
		        data:['研究生', '本科', '专科'],
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
		            data : data.names,
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
		            name: '研究生',
		            type: 'bar',
		            barMaxWidth:60,
		            data: data.yanjiusheng
		        },
		        {
		            name: '本科',
		            type: 'bar',
		            barMaxWidth:60,
		            data: data.benke
		        },
		        {
		            name: '专科',
		            type: 'bar',
		            barMaxWidth:60,
		            data: data.zhuanke
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
		        data:['科目'],
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
		            data : ['语文', '数学', '英语', '物理', '化学', '美术', '体育'],
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
		            name: '科目',
		            type: 'bar',
		            barMaxWidth:60,
		            data: [26,27,24,21,20,9,8]
		        }
		    ]
		};
	
	return option
}

var dom = document.getElementById("renyuanTongjiChart");
var myChart = echarts.init(dom);
var app = {};
myChart.showLoading();

myChart.hideLoading();
myChart.setOption(getTopOption(data));

myChart.on('click', function(object) {
	seriesNameCapital = object.seriesName;			//点击柱子的名称
	xkeyCapital=object.name;
	type=xkeyCapital;
	
	 layer.open({
		  type: 1,
		  title: '教师情况分析纬度调整',
		  area: ['650px', '260px'],
		  shadeClose: true, //点击遮罩关闭
		  maxmin: false,
		  content: $('#hrefOption')
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
  	myChart.setOption(getTopOption(data));
  	$('#returnBtn').hide();
  	myChart.on('click', function(object) {
  		seriesNameCapital = object.seriesName;			//点击柱子的名称
  		xkeyCapital=object.name;
  		type=xkeyCapital;
  		
  		 layer.open({
  			  type: 1,
  			  title: '教师情况分析维度调整',
  			  area: ['650px', '260px'],
  			  shadeClose: true, //点击遮罩关闭
  			  maxmin: false,
  			  content: $('#hrefOption')
  			});
  	});
});