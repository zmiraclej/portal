//学校数据
var navdatas = [];
//版块名称及编码（未使用）
var parentIndex = -1; //代表所有板块
var parentName = "";
var parentCode = "";
// 下级名称及编码（学校）
var childIndex = -1; //代表所有学校
var childName = "学校汇总";
var childCode = "";
// 定义报表编码和名称
var reportCode = "";
var reportName = $("#reportName").val();
// 查询条件
// 查询条件
var year = new Date().getFullYear(); // 获取当前年份
var startDate = ''; // 开始时间
var endDate = ''; // 结束时间
var compareToCode = '';
//定义图表加载接口
var url = "";
var echartType = 1; //1:柱状图；2：饼状图
// 定义图
// 加载DOM
var dom = document.getElementById("container"); // dom加载容器
var myChart = echarts.init(dom); // 初始化容器
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
				//选择学校
				childIndex = elem.context.lastChild.name;
				if(childIndex == -1) {
					childCode = "";
					childName = "学校汇总";
				} else {
					childCode = navdatas[childIndex].code;
					childName = navdatas[childIndex].name;
				}

				// 面包屑导航
				setBread();

				//操作栏：和...比较
				var proHtml = '<option value="-9">默认</option>';
				proHtml += '<option value="-1">上年同比</option>';
				if(childIndex > -1) {
					if(navdatas.length > 1) {
						proHtml += '<option value="seperate" disabled>————————</option>';
						proHtml += '<option value="-2">所有学校横向比较</option>';
					}
					for(var i = 0; i < navdatas.length; i++) {
						if(i != childIndex) {
							proHtml += '<option value="' + navdatas[i].code + '">和' + navdatas[i].nickName + '比较</option>';
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

// 初始化加载版块导航
function initNav() {
	$.ajax({
		type: "GET",
		url: "./searchRoleSchoolByUser",
		dataType: "json",
		data: {},
		success: function(result) {
			if("02" == result.code) {
				navdatas = result.data;
				var content = '';
				var conChild = '<dd><a href="#" name="-1">学校汇总</a></dd>';
				for(y = 0; y < navdatas.length; y++) {
					conChild += '<dd><a href="#" name="' + y + '">' + navdatas[y].nickName + '</a></dd>'
				}
				content = content + '<li class="layui-nav-item"><a href="javascript:;" style="color:#7b6a6a">学校</a>' + '<dl class="layui-nav-child layui-anim layui-anim-upbit">' + conChild + '</dl></li>';
			}
			$("#bankuai").html(content);
			element.init();
		},
		error: function(result) {
			_msg("加载失败");
		}
	});
}

// 默认初始进入画面
function onReady() {
	setBread();
	reportLoginMenu();
}

//面包屑导航
function setBread() {
	var bread = '<i style=" background-size: auto 90%; height: 100%;"></i>';
	bread += '<span>当前查看：</span><li><a href="#">招生数据分析</a> <span class="divider"></span></li>';
	bread += '</span><li><a href="#">' + childName + '</a> <span class="divider"></span></li>' + '</span>';
	$("#caozuoBreadCrunb").empty();
	$("#caozuoBreadCrunb").append(bread);
}

// 报表加载函数
function reportLoginMenu() {
	if(reportName == "师生数量统计" || reportName == "") {
		echartType = 1;
		url = "./report/hr/searchShishengBidui";
	}
	if(reportName == "教师数量统计") {
		echartType = 1;
		url = "";
		searchEdu2();
	}
	if(reportName == "学生数据统计") {
		echartType = 1;
		url = "";
		searchEdu3();
	}
	if(reportName == "学生考勤情况") {
		echartType = 1;
		url = "./report/hr/searchKaoqinData";
	}
	if(url != "") {
		var data = {
			schoolCode: childCode,
			startDate: startDate,
			endDate: endDate,
		};
		searchEchartData(url, echartType, data, getTitle());
	}
}

/**
 * 获取图表标题
 */
function getTitle() {
	return childName + '-' + reportName;
}