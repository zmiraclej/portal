
var selectedClass;

function getPersonRadarOption(studentName,subjectName, subjectValue,selectedClass){
	var option = {
		    title: {
		        text: studentName+'-'+subjectName+'('+subjectValue+')',
		        left : 'center',
		        top : 20
		    },
		    tooltip: {},
		    legend: {
		    	bottom:1,
		        data: ['满分', studentName,selectedClass,'七中嘉祥外语','锦江区','第一圈层','成都市'],
		        selected:{'满分':false, studentName:true, selectedClass:true, '锦江区':false, '第一圈层':false, '成都市':false}
		    },
		    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    radar: {
		        // shape: 'circle',
		        indicator: [
		           { name: 'k11', max: 25},
		           { name: 'k21', max: 30},
		           { name: 'k31', max: 70},
		           { name: 'k32', max: 25},
		           { name: 'k41', max: 50},
		           { name: 'k51', max: 100}
		        ],
		        radius:'60%',
		    },
		    series: [{
		        name: studentName+'-'+subjectName+'('+subjectValue+')',
		        type: 'radar',
		        // areaStyle: {normal: {}},
		        data : [
		            {
		                value : [25, 30, 70, 25, 50, 100],
		                name : '满分'
		            },
		            {
		                value : [21, 15, 50, 20, 40, 85],
		                name : studentName
		            },
		            {
		                value : [16, 18, 46, 19, 43, 79],
		                name : selectedClass
		            },
		            {
		                value : [21, 20, 50, 18, 42, 76],
		                name : '七中嘉祥外语'
		            },
		            {
		                value : [21, 16, 49, 20, 40, 70],
		                name : '第一圈层'
		            },
		            {
		                value : [19, 10, 46, 18, 39, 60],
		                name : '成都市'
		            },
		        ]
		    }]
		};
	
	return option;
}

function getSecondOption(){
  var option = {
		    title : {
		        text: 'k11历次数据',
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	bottom:1,
		        data:[studentName,selectedClass,'七中嘉祥外语','锦江区','第一圈层','成都市'],
		        selected:{studentName:true, selectedClass:true,'七中嘉祥外语':false, '锦江区':false, '第一圈层':false, '成都市':false}
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            //dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['e1','e2','e3','e4','e5']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		                formatter: '{value}'
		            }
		        }
		    ],
		    series : [
		    	 {
		    		 name : studentName,
		             type:'line',
		             smooth: true,
		             data:[14.5,	15.5,	14,	9,	15],
		         },
		    	 {
		    		 name : selectedClass,
		             type:'line',
		             smooth: true,
		             data: [18.7,	21.3,	21.2,	18.7,	17.8],
		         },
		         {
		        	 name : '七中嘉祥外语',
		             type:'line',
		             smooth: true,
		             data: [17.9,	13.5,	6.7,	13.5,	27],
		         },
		         {
		        	 name : '第一圈层',
		             type:'line',
		             smooth: true,
		             data: [20,	22.8,	21.7,	20.9,	19.9],
		         },
		         {
		        	 name : '锦江区',
		             type:'line',
		             smooth: true,
		             data:  [14.6,	16.4,	14.8,	13.7,	13.7],
		         },
		         {
		        	 name : '成都市',
		             type:'line',
		             smooth: true,
		             data:  [12.5,	13.3,	11.4,	11.5,	11.6],
		         }
		        
		    ]
		};
  
  return option;
}

var dom = document.getElementById("chart1");
var myChart = echarts.init(dom);
myChart.hideLoading();

var studentName = $('#studentName').val();
var subjectName = $('#subjectName').val();
var subjectValue = $('#subjectValue').val();
var selectedClass = $('#selectedClass').val();

myChart.setOption(getPersonRadarOption(studentName,subjectName,subjectValue,selectedClass));

var dom2 = document.getElementById("chart2");
var chart2 = echarts.init(dom2);
chart2.hideLoading();
chart2.setOption(getSecondOption());
