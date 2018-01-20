//均分统计
function searchScore1() {
	echarts.dispose(dom); //销毁dom
	myChart = echarts.init(dom); //初始化dom
	$.get('js/pages/report/score/data/junfenTongji.json', function(data) {
		chartsTable_demo = true;
		makeEcharts(data, myChart);
	});
}

//分段统计
function searchScore2() {
	echarts.dispose(dom); //销毁dom
	myChart = echarts.init(dom); //初始化dom
	$.get('js/pages/report/score/data/fenduanTongji.json', function(data) {
		chartsTable_demo = true;
		makeEcharts(data, myChart);
	});
}