//板块及公司数据
var navdatas = [];
//板块名称及编码
var parentIndex = -1; //代表所有板块
var parentName = "所有板块";
var parentCode = "";
// 下级名称及编码
var childIndex = -1; //代表所有公司
var childName = "板块汇总";
var childCode = "";
//定义报表编码和名称
var reportCode = "";
var reportName = $("#reportName").val();
//查询条件
var year = new Date().getFullYear(); // 获取当前年份
var startDate = '';
var endDate = '';
var compareToCode = '';
//定义图表加载接口
var url = "";
var echartType = 1; //1:柱状图；2：饼状图
//定义图
//加载DOM
var dom = document.getElementById("container"); //dom加载容器
var myChart = echarts.init(dom); //初始化容器
//LayUI
var element; // 定义layui导航
var form;
layui.use(['jquery', 'form', 'layedit', 'laydate', 'element'],
	function() {
		//年月范围
		var laydate = layui.laydate;
		laydate.render({
			elem: '#rangedate',
			type: 'month',
			range: '~',
			done: function(value, date, edate) {
				if(value == '') {
					startDate = '';
					endDate = '';
				} else {
					var rg = value.split('~');
					startDate = rg[0].trim() + '-01';
					endDate = rg[1].trim() + '-01';
				}
				reportLoginMenu();
			}
		});
		// Form
		form = layui.form;
		//选择报表
		form.on('select(reportType)', function(data) {
			reportCode = data.value;
			reportName = $(this).children('option:selected').context.innerText;
			reportLoginMenu();
		});
		//选择对比条件
		form.on('select(compare)', function(data) {
			compareToCode = data.value;
			reportLoginMenu();
		});

		// 导航的hover效果、二级菜单等功能，需要依赖element模块 
		element = layui.element;
		// 导航加载
		initNav();
		// 导航监听
		element.on('nav(demo)',
			function(elem) {
				//选择板块&公司
				elemId = elem.offsetParent().offsetParent()[0].children[0].id;
				parentIndex = Number(elemId);
				if(elemId == '' || parentIndex == -1) {
					// 板块名称及编码
					parentCode = "";
					parentName = "所有板块";
					// 下级名称及编码
					childIndex = -1
					childCode = "";
					childName = "";
				} else {
					// 板块名称及编码
					parentCode = navdatas[parentIndex].code;
					parentName = navdatas[parentIndex].name;
					// 下级名称及编码
					childIndex = elem.context.lastChild.name;
					if(childIndex == -1) {
						childCode = "";
						childName = "板块汇总";
					} else {
						childCode = navdatas[parentIndex].orgs[childIndex].code;
						childName = navdatas[parentIndex].orgs[childIndex].nickName;
					}
				}

				// 面包屑导航
				setBread();

				//操作栏：和...比较
				var proHtml = '<option value="-9">默认</option>';
				proHtml += '<option value="-1">上年同比</option>';
				if(childIndex > -1) {
					var orgs = navdatas[parentIndex].orgs;
					if(orgs.length > 1) {
						proHtml += '<option value="seperate" disabled>————————</option>';
						proHtml += '<option value="-2">所有单位横向比较</option>';
					}
					for(var i = 0; i < orgs.length; i++) {
						if(i != childIndex) {
							proHtml += '<option value="' + orgs[i].code + '">和' + orgs[i].nickName + '比较</option>';
						}
					}
				}
				$('#compare').html(proHtml);
				form.render();

				//生成图表
				reportLoginMenu();
			});

		//默认初始进入画面
		onReady();
	});

// 初始化加载板块导航
function initNav() {
	$.ajax({
		type: "GET",
		url: "./searchRoleOrgByUser",
		dataType: "json",
		data: {},
		success: function(result) {
			if("02" == result.code) {
				navdatas = result.data;
				var content = '<li class="layui-nav-item"><a href="#" id="-1" style="padding:0px; color:#7b6a6a;">所有板块</a></li>';
				for(i = 0; i < navdatas.length; i++) {
					if(navdatas[i].orgs.length > 0) {
						var conChild = '<dd><a href="#" name="-1">板块汇总</a></dd>';
						for(y = 0; y < navdatas[i].orgs.length; y++) {
							conChild += '<dd><a href="#" name="' + y + '">' + navdatas[i].orgs[y].nickName + '</a></dd>'
						}
					}
					content = content + '<li class="layui-nav-item"><a id="' + i + '" href="javascript:;" style="color:#7b6a6a">' + navdatas[i].name + '</a>' +
						'<dl class="layui-nav-child">' + conChild + '</dl></li>';
				}
				$("#bankuai").html(content);
				element.init();
			}
		},
		error: function(result) {
			_msg("加载失败");
		}
	})
}

// 默认初始进入画面是总收入支出表
function onReady() {
	setBread();
	reportLoginMenu();
}

//面包屑导航
function setBread() {
	var bread = '<i style=" background-size: auto 90%; height: 100%;"></i>';
	bread = bread + '<span>当前查看：</span><li><a href="#" style="margin-left:7px">财务数据分析</a> <span class="divider"></span></li>';
	if(parentCode == '') {
		bread = bread + '</span><li><a href="#">所有板块</a> <span class="divider"></span></li>' + '</span>';
	} else {
		bread = bread + '</span><li><a href="#">' + parentName + '</a> <span class="divider"></span></li>';
		bread = bread + '</span><li><a href="#">' + childName + '</a> <span class="divider"></span></li>';
	}
	$("#caozuoBreadCrunb").empty();
	$("#caozuoBreadCrunb").append(bread);
}

// 报表加载函数
function reportLoginMenu() {
	$("#container").empty();
	$("#containerTable").empty();
	if(reportName == "总收支数据分析" || reportName == "") {
		url = "./report/nc/searchInfoByYear";
		echartType = 1;
	}
	if(reportName == "期间费用分析") {
		echartType = 2;
		url = "./report/nc/serchFinancialOneMonth";
	}
	if(reportName == "资金分析") {
		url = "./report/nc/searchCapitalInfoByType";
		echartType = 2;
	}
	if(reportName == "盈利分析") {
		echartType = 1;
		url = "./report/nc/searchProfitOneYear";
	}
	if(reportName == "薪酬构成分析") {
		echartType = 2;
		url = "./report/nc/searchPayOneMonth";
	}
	if(reportName == "资产负债分析") {
		echartType = 1;
		url = "./report/nc/searchBalanceSheetInfoByYear";
	}
	if(reportName == "税务状况分析") {
		echartType = 1;
		url = "./report/nc/searchTaxInfoBySchool";
	}
	if(reportName == "预期目标分析") {
		echartType = 1;
		url = "";
		searchYuqiMubiao();
	}
	//是否显示同比<临时>
	if(echartType == 1) {
		$('#compareContent').show();
	} else {
		$('#compareContent').hide();
	}
	if(url != "") {
		var data = getData();
		searchEchartData(url, echartType, data, getTitle());
	}
}

/**
 * 获取图表标题
 */
function getTitle() {
	if(parentCode == '') {
		return parentName + '-' + reportName;
	} else {
		return parentName + '-' + childName + '-' + reportName;
	}
}

/**
 * 获取查询参数
 */
function getData() {
	//对比方式
	compareToCode = $('#compare')[0].value;
	//公司编码（可多个，#连接）
	var cChildCode = childCode;
	var cCompareToCode = '';
	if(compareToCode == '-9') {
		//默认
		cCompareToCode = '';
	} else if(compareToCode == '-1') {
		//上年同比
		cCompareToCode = compareToCode;
	} else if(compareToCode == '-2') {
		//单位横向比较
		for(i = 1; i < navdatas.length; i++) {
			if(i != childIndex) {
				cChildCode += '#';
				cChildCode += navdatas[parentIndex].orgs[i].code;
			}
		}
		cCompareToCode = '';
	} else {
		//和其他单位比较
		cChildCode += '#';
		cChildCode += compareToCode;
		cCompareToCode = '';
	}
	//查询参数
	var data = {
		year: year,
		parentCode: parentCode,
		childCode: cChildCode,
		startDate: startDate,
		endDate: endDate,
		compareToCode: cCompareToCode,
	};
	return data;
}