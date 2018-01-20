//弹出画面：表初始化
function initTable() {
    var param = getParam();
    var url = './searchKpiEmployee';
    var source = getSource(url, param);
    var dataAdapter = new $.jqx.dataAdapter(source);
    var columns = getColumns();
    columns.push({
        text: '操作',
        editable: false,
        width: 80,
        cellsAlign: 'center',
        align: "center",
        cellsRenderer: function(row, column, value, rowData) {
            return '<a style="color:#3C8DBC;cursor: pointer;" onclick="del()">删除</a>';
        }
    });
    $("#pjTable").jqxDataTable({
        height: '100%',
        theme: 'energyblue', localization: getLocalization(),
        source: dataAdapter,
        altRows: true,
        columnsResize: true,
        editable: false,
        sortable: true,
        filterable: false,
        columns: columns
    });
    $("#contenttablepjTable span:last").hide();
}
//Main画面表刷新
function refreshTable() {
    $("#pjTable").jqxDataTable('updateBoundData');
}
// 增加
function add() {
    var kpiInsId = $("#kpiInsId").val();
    if (kpiInsId == '') {
        _msg("请先选择考核活动");
        return false;
    }
    init();
}
// 删除人员
function del() {
    var sels = $("#pjTable").jqxDataTable('getSelection')[0];
    $.ajax({
        url: "deleteKpiEmployee",
        type: "POST",
        dataType: "json",
        data: {
            'kpiIns': sels.kpiIns,
            'employeeId': sels.employeeId
        },
        success: function(result) {
            if (result.code == '02') {
                refreshTable();
                _msg("操作成功");
            } else {
                _alert("操作失败<BR>" + result.msg);
            }
        },
        error: function(result) {
            _alert("系统异常");
        }
    });
};
//弹出画面：初始化
function init() {
    //弹窗
    layer.open({
        type: 1,
        title: '待参评人员',
        skin: 'layui-layer-molv',
        area: ['420px', '510px'],
        shadeClose: true,
        maxmin: false,
        resize: false,
        content: $('#editLayer'),
        btn: ['确定', '取消'],
        yes: function(index, layero) {
            doSave();
        }
    });
    // 加载数据
    initAddTable();
}
//弹出画面：保存
function doSave() {
    _wait();
    var param = [];
    var sels = $("#addTable").jqxDataTable('getSelection');
    if (sels) {
        for (var i = 0; i < sels.length; i++) {
            var sel = sels[i];
            var p = {};
            p["kpiIns"] = sel["kpiIns"];
            p["employeeId"] = sel["employeeId"];
            p["belongJiaoyanzuCode"] = sel["belongJiaoyanzuCode"];
            p["belongNianjizuCode"] = sel["belongNianjizuCode"];
            param.push(p);
        }
    } else {
        _msg("没有选择人员");
        return false;
    }
    // 提交后台
    $.ajax({
        url: "saveKpiEmployee",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(result) {
            if (result.code == '02') {
                layer.closeAll("loading");
                _msg("操作成功");
                refreshTable();
                refreshAddTable();
            } else {
                layer.closeAll("loading");
                _alert("操作失败<BR>" + result.msg);
            }
        },
        error: function(result) {
            layer.closeAll("loading");
            _alert("系统异常");
        }
    })
}
//弹出画面：表初始化
function initAddTable() {
    var param = getParam();
    var url = './searchKpiEmployeeForAdd';
    var source = getSource(url, param);
    var dataAdapter = new $.jqx.dataAdapter(source);
    var columns = getColumns();
    $("#addTable").jqxDataTable({
        height: '100%',
        width: '400px',
        theme: 'energyblue', localization: getLocalization(),
        source: dataAdapter,
        altRows: true,
        columnsResize: true,
        editable: false,
        sortable: true,
        filterable: false,
        columns: columns
    });
    $("#contenttableaddTable span:last").hide();
}
//弹出画面：表刷新
function refreshAddTable() {
    $("#addTable").jqxDataTable('updateBoundData');
}

function getParam() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    return param;
}
function getSource(url, param) {
    var source = {
        url: url,
        data: param,
        type: "POST",
        dataType: "json",
        root: 'data',
        dataFields: [{
            name: "kpiIns",
            type: "int"
        },
        {
            name: "employeeId",
            type: "int"
        },
        {
            name: "employeeNumber",
            type: "string"
        },
        {
            name: "employeeName",
            type: "string"
        },
        {
            name: "belongJiaoyanzuCode",
            type: "string"
        },
        {
            name: "jiaoyanzuName",
            type: "string"
        },
        {
            name: 'belongNianjizuCode',
            type: 'string'
        },
        {
            name: 'nianjizuName',
            type: 'string'
        }],
        id: "employeeId",
        cache: false
    };
    return source;
}
function getColumns() {
    var columns = [{
        text: '教师编号',
        dataField: 'employeeNumber',
        width: 80,
        cellsAlign: 'center',
        align: "center"
    },
    {
        text: '姓名',
        dataField: 'employeeName',
        width: 100,
        cellsAlign: 'center',
        align: "center"
    },
    {
        text: '教研组',
        dataField: 'jiaoyanzuName',
        width: 100,
        cellsAlign: 'center',
        align: "center"
    },
    {
        text: '年级组',
        dataField: 'nianjizuName',
        width: 100,
        cellsAlign: 'center',
        align: "center"
    }];
    return columns;
}