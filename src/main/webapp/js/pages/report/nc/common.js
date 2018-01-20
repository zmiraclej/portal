var segementName;
var orgName;
var orgNum = 0;
var segementNum = 0;
var orgNickName;

function getPieOption() {
	option = {
		title: {
			text: '',
			subtext: '',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		color: ['#87cefa', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		legend: {
			orient: 'vertical',
			left: 'left',
			data: []
		},
		series: [{
			name: '',
			type: 'pie',
			radius: '65%',
			center: ['50%', '50%'],
			data: [],

		}],
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		label: { // 显示数据
			normal: {
				show: true,
				position: 'top'
			}
		}

	};

	return option;
};

function getBarOption() {
	var option = null;
	option = {
		title: {
			text: '',
			left: 'center',
			textStyle: {
				fontSize: 15
			}
		},
		color: ['#87cefa', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		tooltip: {
			trigger: 'item',
			formatter: '{a}<br/>{b} : {c}'
		},
		legend: {
			left: 'left',
			data: []
		},
		xAxis: {
			axisLabel: {
				interval: 0,
				rotate: 50
			},
			type: 'category',
			name: '月份',
			splitLine: {
				show: false
			},
			axisLabel: {
				formatter: '{value}'
			},
			data: []
		},
		grid: {
			left: '3%',
			right: '6%',
			bottom: '3%',
			containLabel: true
		},
		yAxis: {
			type: 'value',
			name: '单位:万元',
			axisLabel: {
				formatter: '{value}'
			}
		},
		series: [{
			name: '',
			type: 'bar',
			center: ['50%', '55%'],
			data: []
		}],
		label: { // 显示数据
			normal: {
				show: true,
				position: 'top'
			}
		}
	};

	return option;
};