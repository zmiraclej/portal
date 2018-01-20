//生源地分析（演示）
function searchZs4() {
	echarts.dispose(dom); //销毁dom
	myChart = echarts.init(dom); //初始化dom
	$.get('js/pages/report/zs/data/shengyuanData.json',
		function(data) {
			chartsTable_demo = true;
			makeEcharts(data, myChart);
		});
}