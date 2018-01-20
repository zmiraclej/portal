//预期目标（演示）
function searchYuqiMubiao() {
	echarts.dispose(dom); //销毁dom
	myChart = echarts.init(dom); //初始化dom
	$.get('js/pages/report/nc/data/yuqiMubiao.json',
		function(data) {
			chartsTable_demo = true;
			makeEcharts(data, myChart);
		});
}