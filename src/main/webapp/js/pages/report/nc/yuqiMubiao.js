
function getFirstOption(score_data){
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
		        data:['预期收入', '实际收入', '预期毛利润', '实际毛利润','预期净利润','实际净利润'],
		        itemGap: 5
		    },
		    color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    grid: {
		        top: '12%',
		        left: '1%',
		        right: '1%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type : 'category',
		            data : score_data.names
		        }
		    ],
		    yAxis: [
		        {
		            type : 'value',
		            name : '单位：万元',
//		            axisLabel: {
//		                formatter: function (a) {
//		                    a = +a;
//		                    return isFinite(a)
//		                        ? echarts.format.addCommas(+a / 1000)
//		                        : '';
//		                }
//		            }
		        }
		    ],
		    dataZoom: [
		        {
		            show: true,
		            start: 1,
		            end: 50,
		            xAxisIndex: [0]
		        },
		        {
		            type: 'inside',
		            start: 94,
		            end: 100
		        },
//		        {
//		            show: true,
//		            yAxisIndex: [0],
//		            filterMode: 'empty',
//		            width: 30,
//		            height: '80%',
//		            showDataShadow: false,
//		            left: '93%'
//		        }
		    ],
		    series : [
		        {
		            name: '预期收入',
		            type: 'bar',
		            barMaxWidth:60,
		            data: score_data.yuqiXiaoshoue
		        },
		        {
		            name: '预期毛利润',
		            type: 'bar',
		            barMaxWidth:60,
		            data: score_data.yuqiMaoli
		        },
		        {
		            name:'预期净利润',
		            type: 'bar',
		            barMaxWidth:60,
		             data: score_data.yuqiJingli
		        },
		        {
		            name: '实际收入',
		            type: 'bar',
		            barMaxWidth:60,
		            data: score_data.shijiXiaoshoue
		        },
		        {
		            name: '实际毛利润',
		            type: 'bar',
		            barMaxWidth:60,
		            data: score_data.shijiMaoli
		        },
		        {
		            name: '实际净利润',
		            type: 'bar',
		            barMaxWidth:60,
		            data: score_data.shijiJingli
		        }
		    ]
		};
	
	return option
}


var dom = document.getElementById("lirunYuqiChart");
var myChart = echarts.init(dom);
var app = {};
myChart.showLoading();


$.get('js/pages/report/nc/data/yuqiMubiao.json', function (shoolData) {
    myChart.hideLoading();
    myChart.setOption(getFirstOption(shoolData));
});
