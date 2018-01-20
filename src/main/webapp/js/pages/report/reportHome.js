var msg1 = '指标初始化失败';
var type_nc = 1;
var type_zs = 2;
var type_score = 3;
var type_edu = 4;
var type_edu = 5;
//数据源
var data_nc = [];
var data_zs = [];
var data_score = [];
var data_edu = [];
var data_man = [];

// 初始化
$(function() {
	//动态显示指定指标
	$.ajax({
		type: "GET",
		url: "./report/searchRptIndex",
		dataType: "json",
		data: {},
		success: function(result) {
			if("02" == result.code) {
				for(var k = 1; k <= 5; k++) {
					var data = [];
					var pre = '';
					//取得数据源
					if(k == 1) {
						data_nc = result.data.nc;
						data = result.data.nc;
						pre = 'nc';
					} else if(k == 2) {
						data_zs = result.data.zs;
						data = result.data.zs;
						pre = 'zs';
					} else if(k == 3) {
						data_score = result.data.score;
						data = result.data.score;
						pre = 'score';
					} else if(k == 4) {
						data_edu = result.data.edu;
						data = result.data.edu;
						pre = 'edu';
					} else if(k == 5) {
						data_man = result.data.man;
						data = result.data.man;
						pre = 'man';
					}
					//设定指标
					for(var i = 0; i < data.length; i++) {
						var d = data[i];
						var idx = i + 1;
						var div_id = pre + idx;
						var div_id_name = div_id + '_name';
						var div_id_text = div_id + '_text';
						setWarnLevel($('#' + div_id), d.warnLevel);
						$('#' + div_id).show();
						$('#' + div_id_name).html(d.name);
						$('#' + div_id_text).html(d.txtTop);
					}
				}
			} else {
				_msg(msg1);
			}
		},
		error: function(result) {
			_msg(msg1);
		}
	})
})

//打开分析窗口
function showIndexAnalysis(elem) {
	var div_id = right(elem.id, elem.id.length - 9);
	var flg = left(div_id, div_id.length - 1);
	var idx = right(div_id, 1) - 1;
	var userIndexId = 0;
	var data = [];
	if(flg == 'nc') {
		data = data_nc;
	} else if(flg == 'zs') {
		data = data_zs;
	} else if(flg == 'score') {
		data = data_score;
	} else if(flg == 'edu') {
		data = data_edu;
	} else if(flg == 'man') {
		data = data_man;
	}
	if(data.length > 0) {
		$("#userIndexId").val(data[idx].userIndexId);
		$("#calcPop").val(data[idx].calcPop);
		$("#txtPop").val(data[idx].txtPop);
		if(data[idx].blIndexAuth == '1') {
			$('#result').attr("disabled", false);
			$("#submit").show();
		} else {
			$('#result').attr("disabled", true);
			$("#submit").hide();
		}
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			area: ['550px', '280px'],
			content: $("#indexAnalysis")
		});
		initForm();
	}
}

/** 弹出画面初始化 */
var $form;
var form;
layui.use(['jquery', 'form', 'layedit'],
	function() {
		form = layui.form;
		layer = layui.layer;
		$form = $('#dataForm');
		// 监听提交
		form.on('submit(submit1)',
			function(data) {
				$.ajax({
					url: "./report/saveRptIndexAnalysis",
					type: "POST",
					dataType: "json",
					// 必需设定，后台@RequestBody会根据它做数据反序列化
					contentType: "application/json",
					data: JSON.stringify(data.field),
					success: function(result) {
						if(result.code == '02') {
							_msg("操作成功");
						} else {
							_alert("操作失败<BR>" + result.msg);
						}
					},
					error: function(result) {
						_alert("系统异常");
					}
				});
				return false;
			});
	});
// 加载数据
function initForm() {
	var userIndexId = $("#userIndexId").val();
	$.ajax({
		url: "./report/searchRptIndexAnalysisOnLast",
		type: "GET",
		dataType: "json",
		data: {
			'userIndexId': userIndexId
		},
		success: function(result) {
			var data = result.data;
			if(data) {
				$("#id").val(data.id);
				$("#result").val(data.result);
				$("#employeeName").val(data.employeeName);
				$("#createTime").val(data.createTimeStr);
			} else {
				$("#id").val('');
				$("#result").val('');
				$("#employeeName").val('');
				$("#createTime").val('');
			}
		},
		error: function(result) {
			layer.closeAll();
			_alert("操作失败<BR>" + result.msg);
		}
	});
}

/*
 * 点击指标跳转到报表
 */
function forwardToReport(elem) {
	var flg = left(elem.id, elem.id.length - 1);
	if(flg == 'nc') {
		if(elem.id=="nc1" ||elem.id=="nc1"){
			window.location.href = "rptNc01";
		}
		if(elem.id=="nc3" ||elem.id=="nc5"||elem.id=="nc6"||elem.id=="nc7"){
			window.location.href = "analysis";
		}
		if(elem.id=="nc4"){
			window.location.href = "rptNc04";
		}
	} else if(flg == 'zs') {
		window.location.href = "rptZs04";
	} else if(flg == 'score') {
		window.location.href = "rptScore03";
	} else if(flg == 'edu') {
		window.location.href = "rptEdu01";
	} else if(flg == 'man') {
	}
}

/*
 * 根据指标异常状况改变边框色值
 */
function setWarnLevel(div, warnLevel) {
	if(warnLevel == -1) {
		//异常
		div.css('border-color', '#de3106');

	} else if(warnLevel == 1) {
		//优良
		div.css('border-color', '#56B63B');
	} else {
		//正常
		div.css('border-color', '#919191');
	}
}