//Main画面初始化
function initTable() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    var source = {
        url: "./searchPingjiaListJw",
        data: param,
        type: "POST",
        dataType: "json",
        root: 'rows',
        dataFields: [{
            name: "employeeId",
            type: "int"
        },
        {
            name: "kpiInsId",
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
            text: '评分',
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
                var employeeId = rowData['employeeId'];
                var kpiInsId = rowData['kpiInsId'];
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="edit(\'' + employeeId + '\',\'' + kpiInsId + '\')">评分</a>';
            }
        }]
    });
    $("#contenttablepjTable span:last").hide();
}
// Main画面表刷新
function refreshTable() {
    $("#pjTable").jqxDataTable('updateBoundData');
}

// 编辑子画面
function edit(employeeId, kpiInsId) {
    var param = {};
    param["employeeId"] = employeeId;
    param["kpiInsId"] = kpiInsId;
    initTree(param);
};
// 子画面初始化
function initTree(param) {
    var index = layer.open({
        type: 1,
        title: '评价',
        skin: 'layui-layer-molv',
        area: ['70%', '80%'],
        shadeClose: true,
        maxmin: true,
        content: $('#editLayer'),
        btn: ['确定', '取消'],
        yes: function(index, layero) {
            doSave();
        }
    });

    var url = './searchPingjiaItemJw';
    makeTree(url, param);
}
// 保存
function doSave() {
    _wait();
    var param = [];
    var pingjiaRows = $("#pjTreeGrid").jqxTreeGrid('getRows');
    var re = checkRows(pingjiaRows, param);
    if (re == false) {
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
        url: "updatePingjiaJw",
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