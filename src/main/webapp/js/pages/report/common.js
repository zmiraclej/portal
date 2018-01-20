/**
 * 201708：报表改版
 * BAI
 */

//全局变量、可外部改变
var chartsTable_Summary = true; //是否要合计行
var chartsTable_demo = false; //是否演示数据

/*
 * 	设置年份下拉
 */
window.onload = function() {
	var myDate = new Date();
	var startYear = 2016; // 起始年份
	var endYear = myDate.getFullYear(); // 结束年份
	var obj = $('#reportYear')
	obj.empty();
	for(var i = endYear; i >= startYear; i--) {
		obj.append("<option value='" + i + "'>" + i + "</option>");
	}
}

/*
 * 创建图表数据视图时数值格式化
 * 没有小数位的不做小数处理
 * 有小数位，小于1万元保留四位小数
 * 有小数位，大于等于1万元保留两位小数
 * 使用千分符
 */
function FormatValue(num) {
	if(String(num).indexOf(".") > 0) {
		return outputmoney(num);
	} else {
		return outputmoneyInt(num);
	}
}

//##################################//
/*
 * 金额格式化：使数字1111111变成11,111,111.00，保留两位小数。
 */
function outputmoneyInt(number) {
	number = String(number).replace(/\,/g, "");
	if(isNaN(number) || number == "") return "";
	if(number * 1 < 1) {
		number = Math.round(number * 10000) / 10000;
	} else {
		number = Math.round(number * 100) / 100;
	}
	if(number < 0)
		return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '');
	else
		return outputdollars(Math.floor(number - 0) + '');
}

function outputmoney(number) {
	number = String(number).replace(/\,/g, "");
	if(isNaN(number) || number == "") return "";
	if(number * 1 < 1) {
		number = Math.round(number * 10000) / 10000;
	} else {
		number = Math.round(number * 100) / 100;
	}
	if(number < 0)
		return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
	else
		return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}
//格式化小数点前
function outputdollars(number) {
	if(number.length <= 3)
		return(number == '' ? '0' : number);
	else {
		var mod = number.length % 3;
		var output = (mod == 0 ? '' : (number.substring(0, mod)));
		for(i = 0; i < Math.floor(number.length / 3); i++) {
			if((mod == 0) && (i == 0))
				output += number.substring(mod + 3 * i, mod + 3 * i + 3);
			else
				output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return(output);
	}
}
//格式化小数点后
function outputcents(amount) {
	if(amount < 1) {
		amount = Math.round(((amount) - Math.floor(amount)) * 10000);
		if(amount < 10) {
			return '.000' + amount;
		} else if(amount < 100) {
			return '.00' + amount;
		} else if(amount < 1000) {
			return '.0' + amount;
		} else {
			return '.' + amount;
		}
	} else {
		amount = Math.round(((amount) - Math.floor(amount)) * 100);
		return(amount < 10 ? '.0' + amount : '.' + amount);
	}
}

/**
 * 根据接口及类型，渲染Echart图表共通
 *
 * @param string url 数据接口
 * @param int echartType  图表类型 1：柱状图、2：饼状图
 * @param object data 数据参数
 * @param object title 图表标题
 * 
 */
//图标数据加载
function searchEchartData(url, echartType, data, title) {
	echarts.dispose(dom); //销毁dom
	myChart = echarts.init(dom); //初始化dom
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		data: data,
		success: function(result) {
			if("02" == result.code) {
				// 图表数据
				if(result.data != null) {
					result.data.title = title;
					if(echartType == 1) {
						makeEcharts(result.data, myChart);
					}
					if(echartType == 2) {
						makeEchartsPie(result.data, myChart);
					}
				}
			}
		}
	});
}

/**
 * 根据后台数据构建图表&数据视图（柱状图）
 *
 * @param {Object} items 后台返回数据
 * @param {Object} myChart  图表对象
 */
function makeEcharts(data, myChart) {
	var legendData = [];
	var xAxisData = [];
	var seriesData = [];
	var title = data.title;
	var xAxisName = data.xAxisName;
	var yAxisName = data.seriesName; //y轴1
	var yAxisSecName = data.seriesSecName; //y轴2
	var items = data.items;
	//定义Y轴内容
	var yAxjs;
	if(items.length > 0 && items[0].seriesSec.length > 0) {
		yAxjs = [{
			type: 'value',
			name: yAxisName,
			axisLabel: {
				formatter: '{value}'
			}
		}, {
			type: 'value',
			name: yAxisSecName,
			axisLabel: {
				formatter: '{value}%'
			}
		}]
	} else {
		yAxjs = {
			type: 'value',
			name: yAxisName,
			axisLabel: {
				formatter: '{value}'
			}
		}
	}
	//解析数据
	var sData = [];
	var scnt = 0;
	var scntSec = 0;
	if(items.length > 0) {
		//y轴1
		scnt = items[0].series.length;
		for(var k = 0; k < scnt; k++) {
			sData[k] = [];
		}
		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			xAxisData[i] = item.xAxis;
			for(var k = 0; k < scnt; k++) {
				legendData[k] = item.series[k].name;
				sData[k].push(item.series[k].value);
			}
		}
		for(var k = 0; k < scnt; k++) {
			seriesData[k] = {
				type: 'bar',
				name: legendData[k],
				data: sData[k]
			};
		}
		//y轴2
		scntSec = items[0].seriesSec.length;
		for(var k = scnt; k < scnt + scntSec; k++) {
			sData[k] = [];
		}
		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			for(var k = scnt; k < scnt + scntSec; k++) {
				legendData[k] = item.seriesSec[k - scnt].name;
				sData[k].push(item.seriesSec[k - scnt].value);
			}
		}
		for(var k = scnt; k < scnt + scntSec; k++) {
			seriesData[k] = {
				type: 'bar',
				name: legendData[k],
				yAxisIndex: 1,
				data: sData[k]
			};
		}
	}
	// 图表视图
	var option = getOption(legendData, xAxisData, seriesData, xAxisName, yAxisName, yAxjs, title);
	myChart.setOption(option);
	// 数据视图
	eChartsToTable(option);
}

/**
 * 根据后台数据构建图表&数据视图（饼图）
 *
 * @param {Object} items 后台返回数据
 * @param {Object} myChart  图表对象
 */
function makeEchartsPie(data, myChart) {
	var legendData = [];
	var seriesData = [];
	var title = data.title;
	var seriesName = data.seriesName;
	var items = data.items;
	if(items.length > 0) {
		var series = items[0].series;
		for(var k = 0; k < series.length; k++) {
			legendData[k] = series[k].name;
			seriesData[k] = {
				name: series[k].name,
				value: series[k].value
			};
		}
	}
	// 图表视图
	sort(seriesData);
	var option = getOptionPie(legendData, seriesName, mergePieData(seriesData), title);
	myChart.setOption(option, true);
	// 数据视图
	pieChartsToTable(option, seriesData);
}

/*
 * 饼图数据按照值从高到低排序
 */
function sort(seriesData) {
	seriesData.sort(function(a, b) {
		return b.value - a.value
	});
}

/*
 * 计算百分比：小数点后两位百分比
 */
function Percentage(num, total) {
	return(Math.round(num / total * 10000) / 100.00 + "%");
}

/**
 * 创建图表数据视图（柱状图）
 */
function eChartsToTable(option) {
	var axisData = option.xAxis.data;
	var series = option.series;
	var hejiData = [];

	var table = '<table class="layui-table" lay-even="" lay-skin="row"><tbody><thead><tr>';
	//标题行
	table += '<th>' + option.xAxis.name + '</th>';
	for(var j = 0, s = series.length; j < s; j++) {
		var unit = '';
		if(series[j].type = 'bar') {
			//首先判断是否是比率
			if(series[j].name.lastIndexOf("率")==series[j].name.length-1){
				unit="%";
			}else{
				if(!Array.isArray(option.yAxis)){
					unit = option.yAxis.name;
				}else{
					unit = option.yAxis[0].name;
				}
			}
		}
		table += '<th>' + series[j].name + '（' + unit + '）' + '</th>';
		hejiData.push(0);
	}
	table += '</tr></thead>';
	//数据行
	for(var i = 0, l = axisData.length; i < l; i++) {
		table += '<tr>';
		table += '<td>' + axisData[i] + '</td>';
		for(var j = 0, s = series.length; j < s; j++) {
			table += '<td>' + FormatValue(series[j].data[i]) + '</td>';
			hejiData[j] = hejiData[j] + series[j].data[i];
		}
		table += '</tr>';
	}
	//合计行
	if(chartsTable_Summary) {
		var hejiLine = '<tr><td><strong>合计</strong></td>';
		for(var s = 0; s < series.length; s++) {
			var sum = hejiData[s];
			hejiLine += '<td><strong>' + FormatValue(sum) + '</strong></td>';
		}
		hejiLine += '</tr>';
		table += hejiLine + '</tbody></table>';
	}
	$("#containerTable").html(table + '</tbody></table>');
}

/**
 * 创建图表数据视图（饼图）
 */
function pieChartsToTable(option, data, xAxisName) {
	var series = option.series[0];

	//定义合计值
	var hejiData = 0;
	if(!xAxisName || xAxisName == '') {
		xAxisName = '类别';
	}
	var table = '<table class="layui-table" lay-even="" lay-skin="row"><tbody><thead><tr>';
	//标题行
	table += '<th>' + xAxisName + '</th>';
	table += '<th>' + series.name + '</th>';
	table += '</tr></thead>';
	//数据行
	for(var i = 0, l = data.length; i < l; i++) {
		hejiData += data[i].value;
	}
	for(var i = 0, l = data.length; i < l; i++) {
		table += '<tr>';
		table += '<td>' + data[i].name + '</td>';
		table += '<td>' + FormatValue(data[i].value) + '（' + Percentage(data[i].value, hejiData) + '）' + '</td>';
		table += '</tr>';
	}
	//合计行
	if(chartsTable_Summary) {
		var sum = hejiData;
		var hejiLine = '<tr><td><strong>合计</strong></td><td><strong>' + FormatValue(sum) + '</strong></td></tr>';
		table += hejiLine + '</tbody></table>';
	}
	$("#containerTable").html(table + '</tbody></table>');
}

/**
 * 饼图：项目多于10个时，占比小于5%的项目合并为其他
 */
function mergePieData(data) {
	if(data != null && data.length > 10) {
		var dataNew = [];
		var dataMerge = [];
		//计算合计值
		var summary = 0;
		for(var i = 0, l = data.length; i < l; i++) {
			summary += data[i].value;
		}
		//项目处理
		for(var i = 0, l = data.length; i < l; i++) {
			var d = data[i];
			var o = { name: d.name, value: d.value };
			if(i < 10) {
				dataNew.push(o);
			} else if(d.name == '其他') {
				dataMerge.push(o);
			} else if(d.value / summary < 0.05) {
				dataMerge.push(o);
			} else {
				dataNew.push(o);
			}
		}
		//项目合并
		var mergeValue = 0;
		for(var i = 0, l = dataMerge.length; i < l; i++) {
			mergeValue = Number((mergeValue + dataMerge[i].value).toFixed(4));
		}
		var o = { name: '其他', value: mergeValue };
		dataNew.push(o);
		return dataNew;
	} else {
		return data;
	}
}

/**
 * 201508：报表改版（柱状图）
 */
function getOption(legendData, xAxisData, seriesData, xAxisName, yAxisName, yAxjs, title) {
	var xNameGap = 10;
	if(isArray(yAxjs)) {
		//多Y轴
		xNameGap = 30;
	}
	var graphic = [];
	if(chartsTable_demo) {
		graphic = [{
			type: 'image',
			id: 'logo',
			right: 20,
			top: 20,
			z: -10,
			bounding: 'raw',
			origin: [75, 75],
			style: {
				image: 'images/Watermark.png',
				width: 150,
				height: 150,
				opacity: 0.4
			}
		}];
	}
	var option = {
		color: ['#87cefa', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		title: {
			text: title,
			subtext: '',
			x: 'center'
		},
		tooltip: {
			trigger: 'axis', //按横坐标
			axisPointer: {
				type: 'shadow',
				label: {
					show: true
				}
			}
		},
		legend: {
			data: legendData,
			top: 40,
		},
		toolbox: {
			show: true,
			right: 80,
			feature: {
				mark: {
					show: true
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		grid: {
			top: 130, //设置图形区域到顶部的距离，解决标题和图形相互重叠的问题
			bottom: 100, //设置图形区域到底部的距离，解决底部横坐标旋转后高度过高显示不全的问题
			left: 80
		},
		graphic: graphic,
		dataZoom: [{
				type: 'slider',
				show: true,
				xAxisIndex: [0],
				start: 0,
				end: 50,
			},
			{
				type: 'inside',
				xAxisIndex: [0],
				start: 0,
				end: 50
			},
		],
		xAxis: {
			axisLabel: {
				interval: 0,
				rotate: 30
			},
			type: 'category',
			name: xAxisName,
			nameGap: xNameGap,
			splitLine: {
				show: false
			},
			axisLabel: {
				formatter: '{value}'
			},
			data: xAxisData
		},
		yAxis: yAxjs,
		series: seriesData,
		/*		label: {
					normal: {
						formatter: '{c}',
						show: true,
						position: 'top'
					}
				}*/
	};
	return option;
}

/**
 * 201508：报表改版（饼图）
 */
function getOptionPie(legendData, seriesName, seriesData, title) {
	option = {
		title: {
			text: title,
			subtext: '',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a}<br/>{b} : {c} ({d}%)'
		},
		color: ['#87cefa', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		legend: {
			selectedMode: false,
			orient: 'vertical',
			left: 'left',
			data: legendData
		},
		series: [{
			name: seriesName,
			type: 'pie',
			radius: '65%',
			center: ['50%', '50%'],
			data: seriesData
		}],
		label: { // 显示数据
			normal: {
				show: true,
				position: 'top',
				formatter: '{b} : {c} ({d}%)',
			}
		}
	};
	return option;
};