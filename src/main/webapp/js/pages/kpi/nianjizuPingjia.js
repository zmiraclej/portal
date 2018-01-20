//Main画面初始化
function initTable() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    param["code"] = $("#nianjizuCode").val();
    var source = {
        url: "./searchPingjiaListNj",
        data: param,
        type: "POST",
        dataType: "json",
        root: 'rows',
        dataFields: [{
            name: "kpiInsId",
            type: "int"
        },
        {
            name: "code",
            type: "string"
        },
        {
            name: "name",
            type: "string"
        },
        {
            name: "employeeId",
            type: "int"
        },
        {
            name: "teacherName",
            type: "string"
        },
        {
            name: "employeeNo",
            type: "string"
        },
        {
            name: "score",
            type: "string"
        },
        {
            name: "kpiTime",
            type: "string"
        }],
        id: "employeeId",
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#pjTable").jqxDataTable({
    	theme : 'energyblue', localization: getLocalization(),
        source: dataAdapter,
        altRows: true,
        columnsResize: true,
        editable: true,
        sortable: true,
        filterable: false,
        editSettings: {
            saveOnPageChange: true,
            saveOnBlur: true,
            saveOnSelectionChange: true,
            cancelOnEsc: true,
            saveOnEnter: true,
            editSingleCell: true,
            editOnDoubleClick: true,
            editOnF2: true
        },
        columns: [{
            text: '年级组',
            dataField: 'name',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '姓名',
            dataField: 'teacherName',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '教师编号',
            dataField: 'employeeNo',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '总评分',
            dataField: 'score',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '评价日期',
            dataField: 'kpiTime',
            editable: false,
            width: 120,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '操作',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="edit()">评分</a>';
            }
        }]
    });
    $("#contenttablepjTable span:last").hide();
}
// Main画面表刷新
function refreshTable() {
    $("#ypTable").jqxDataTable('updateBoundData');
	$("#pjTable").jqxDataTable('updateBoundData');
}

// 编辑子画面
function edit() {
    var sel = $("#pjTable").jqxDataTable('getSelection')[0];
    //弹窗
    layer.open({
        type: 1,
        title: '评价',
        skin: 'layui-layer-molv',
        area: ['1000px', '600px'],
        shadeClose: false,
        maxmin: false,
        resize :false,
        content: $('#editLayer'),
    });
    //总评分
    layui.use(['jquery', 'form'],
    function() {
        $("#kpiScore").val(sel['score']);
        layui.form().render('select');
    });
    //评价树
    var param = {};
    param["employeeId"] = sel['employeeId'];
    param["kpiInsId"] = sel['kpiInsId'];
    var url = './searchPingjiaItemNj';
    makeTree(url, param);
}
// 保存
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
        url: "updatePingjiaNj",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(result) {
            if (result.code == '02') {
                refreshTable();
                layer.closeAll();
                _msg("操作成功");
            } else {
                layer.closeAll("loading");
                _alert("操作失败<BR>" + result.msg);
            }
        },
        error: function(result) {
            layer.closeAll();
            _alert("系统异常");
        }
    })
}

/** 预评分设定 */
// 指导评分人数表构建
function initYpTable() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    param["code"] = $("#nianjizuCode").val();
    param["type"] = 2;
    initYpTableCommon(param);
}
//保存前验证
function chkypOnSave() {
    var kpiScore = $('#kpiScore').val();
    var sum = getTotal($("#pjTreeGrid").jqxTreeGrid('getRows'), 0);
    if (kpiScore == '') {
        _msg("请记入总评分");
        return false;
    }
    if (kpiScore != sum) {
        _msg("单项评分之和(" + sum + "分)必须与总评分一致");
        return false;
    }
    return true;
}