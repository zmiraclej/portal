//Main画面初始化
function initTree() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    var url = './searchPingjiaItemTc';
    makeTree(url, param);
    $('#pjTreeGrid').on('bindingComplete',
    function(event) {
        var pingjiaRows = $("#pjTreeGrid").jqxTreeGrid('getRows');
        if (pingjiaRows && pingjiaRows.length > 0) {
            layui.use(['jquery', 'form'],
            function() {
                $('#kpiScore').val(pingjiaRows[pingjiaRows.length - 1].kpiScore);
                layui.form().render('select');
            });
        }
    })
}
// Main画面表刷新
function refreshTree() {
    $("#pjTreeGrid").jqxTreeGrid('updateBoundData');
}
// 保存评价
function doSave() {
    _wait();
    var param = [];
    var kpiScore = Number($('#kpiScore').val());
    var pingjiaRows = $("#pjTreeGrid").jqxTreeGrid('getRows');
    var re = checkRows(pingjiaRows, param, kpiScore);
    if (re == false) {
        layer.closeAll("loading");
        return false;
    }
    if (!chkypOnSave()) {
        layer.closeAll("loading");
        return false;
    }
    if (param.length == 0) {
        layer.closeAll("loading");
        _msg("没有评价数据");
        return false;
    }
    // 提交后台
    $.ajax({
        url: "updatePingjiaTc",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(result) {
            if (result.code == '02') {
                layer.closeAll();
                _msg("操作成功");
            } else {
                layer.closeAll();
                _alert("操作失败<BR>" + result.msg);
            }
        },
        error: function(result) {
            layer.closeAll();
            _alert("系统异常");
        }
    })
}

// 打开附件面板
function upFile() {
    if (!chkOnUpload()) {
        return false;
    }
    layer.open({
        type: 1,
        title: '附件上传',
        area: ['400px', '300px'],
        shadeClose: true,
        maxmin: true,
        content: $('#attach'),
    });
    layui.use('upload',
    function() {
    	var upload = layui.upload;
    	var uploadInst=upload.render({
    		elem: '#uploadBtn',
            url: 'uploadKpiTcAttach?kpiInsId=' + $('#kpiInsId').val(),
            before: function() {
            	layer.load(); //上传loading
            },
            done: function(res, index, upload){
                layer.closeAll('loading'); //关闭loading
                if (res.code == '02') {
                    initAttach();
                    _msg("操作成功");
                } else {
                    layer.closeAll();
                    _alert("操作失败<BR>" + res.msg);
                }
            },
            error: function(index, upload){
            	layer.closeAll('loading'); //关闭loading
            	_alert("附件上传失败<BR>" + res.msg);
            }
        });
    });
    // 附件加载
    initAttach();
}
function initAttach() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    initAttachTc(param, false);
}

//保存前验证
function chkypOnSave() {
    if ($('#kpiInsId').val() == '') {
        _msg("请先选择考核活动");
        return false;
    }
    var kpiScore = $('#kpiScore').val();
    var sum = getTotal($("#pjTreeGrid").jqxTreeGrid('getRows'), 0);
    if (kpiScore == '') {
        _msg("请记入总评分");
        return false;
    }
    if (kpiScore % 5 != 0) {
        _msg("总评分必须为5分一个档位，如：95、90等");
        return false;
    }
    if (kpiScore != sum) {
        _msg("单项评分之和(" + sum + "分)必须与总评分一致");
        return false;
    }
    return true;
}
// 上传前验证
function chkOnUpload() {
    if ($('#kpiInsId').val() == '') {
        _msg("请先选择考核活动");
        return false;
    }
    return true;
}
/** 导出 */
function exp() {
	if ($('#kpiInsId').val() == '') {
		_msg("请先选择考核活动");
		return false;
	}
	window.location.href = 'exportKpiTcXls?kpiInsId=' + $('#kpiInsId').val();
}