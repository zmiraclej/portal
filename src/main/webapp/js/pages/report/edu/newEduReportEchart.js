//教师数量统计
function getEdu2Data() {
	var data = {
		"title": "所有学校-教师数量统计",
		"xAxisName": "学校",
		"seriesName": "人数",
		"seriesSecName": null,
		"items": [{
			"xAxis": "锦江高中",
			"series": [{
				"name": "研究生",
				"value": 30
			}, {
				"name": "本科",
				"value": 20
			}, {
				"name": "专科",
				"value": 10
			}],
			"seriesSec": []
		}, {
			"xAxis": "锦江初中",
			"series": [{
				"name": "研究生",
				"value": 30
			}, {
				"name": "本科",
				"value": 20
			}, {
				"name": "专科",
				"value": 10
			}],
			"seriesSec": []
		}, {
			"xAxis": "成华校区",
			"series": [{
				"name": "研究生",
				"value": 30
			}, {
				"name": "本科",
				"value": 20
			}, {
				"name": "专科",
				"value": 10
			}],
			"seriesSec": []
		}, {
			"xAxis": "郫县分校",
			"series": [{
				"name": "研究生",
				"value": 30
			}, {
				"name": "本科",
				"value": 20
			}, {
				"name": "专科",
				"value": 10
			}],
			"seriesSec": []
		}, {
			"xAxis": "北城分校",
			"series": [{
				"name": "研究生",
				"value": 30
			}, {
				"name": "本科",
				"value": 20
			}, {
				"name": "专科",
				"value": 10
			}],
			"seriesSec": []
		}, {
			"xAxis": "达州校区",
			"series": [{
				"name": "研究生",
				"value": 30
			}, {
				"name": "本科",
				"value": 20
			}, {
				"name": "专科",
				"value": 10
			}],
			"seriesSec": []
		}, {
			"xAxis": "锦江幼儿园",
			"series": [{
				"name": "研究生",
				"value": 30
			}, {
				"name": "本科",
				"value": 20
			}, {
				"name": "专科",
				"value": 10
			}],
			"seriesSec": []
		}, {
			"xAxis": "郫县幼儿园",
			"series": [{
				"name": "研究生",
				"value": 30
			}, {
				"name": "本科",
				"value": 20
			}, {
				"name": "专科",
				"value": 10
			}],
			"seriesSec": []
		}]
	};
	return data;
}

function searchEdu2() {
	echarts.dispose(dom); //销毁dom
	myChart = echarts.init(dom); //初始化dom
	var data = getEdu2Data();
	chartsTable_demo = true;
	makeEcharts(data, myChart);
}

//学生数据统计
function getEdu3Data() {
	var data = {
		"title": "所有学校-学生数据统计",
		"xAxisName": "班级",
		"seriesName": "人数",
		"seriesSecName": null,
		"items": [{
			"xAxis": "本部1701班",
			"series": [{
				"name": "男生",
				"value": 30
			}, {
				"name": "女生",
				"value": 20
			}],
			"seriesSec": []
		}, {
			"xAxis": "本部1702班",
			"series": [{
				"name": "男生",
				"value": 30
			}, {
				"name": "女生",
				"value": 20
			}],
			"seriesSec": []
		}, {
			"xAxis": "本部1703班",
			"series": [{
				"name": "男生",
				"value": 30
			}, {
				"name": "女生",
				"value": 20
			}],
			"seriesSec": []
		}, {
			"xAxis": "北城1701班",
			"series": [{
				"name": "男生",
				"value": 30
			}, {
				"name": "女生",
				"value": 20
			}],
			"seriesSec": []
		}, {
			"xAxis": "北城1702班",
			"series": [{
				"name": "男生",
				"value": 30
			}, {
				"name": "女生",
				"value": 20
			}],
			"seriesSec": []
		}, {
			"xAxis": "成华1701班",
			"series": [{
				"name": "男生",
				"value": 30
			}, {
				"name": "女生",
				"value": 20
			}],
			"seriesSec": []
		}, {
			"xAxis": "成华1702班",
			"series": [{
				"name": "男生",
				"value": 30
			}, {
				"name": "女生",
				"value": 20
			}],
			"seriesSec": []
		}, {
			"xAxis": "达州1701班",
			"series": [{
				"name": "男生",
				"value": 30
			}, {
				"name": "女生",
				"value": 20
			}],
			"seriesSec": []
		}]
	};
	return data;
}

function searchEdu3() {
	echarts.dispose(dom); //销毁dom
	myChart = echarts.init(dom); //初始化dom
	var data = getEdu3Data();
	chartsTable_demo = true;
	makeEcharts(data, myChart);
}