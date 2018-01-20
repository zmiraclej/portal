function initTable() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    var source = {
        url: "./searchKpiInfo",
        data: param,
        type: "POST",
        dataType: "json",
        root: 'data',
        dataFields: [{
            name: "id",
            type: "int"
        },
        {
            name: "kpiIns",
            type: "int"
        },
        {
            name: "jiaoyanzuName",
            type: "string"
        },
        {
            name: "employeeId",
            type: "int"
        },
        {
            name: "employeeName",
            type: "string"
        },
        {
            name: "employeeNumber",
            type: "string"
        },
        {
            name: "jiaowuScoreAct",
            type: "float"
        },
        {
            name: "jiaoyanzuPingjiaScoreAct",
            type: "float"
        },
        {
            name: "nianjiPingjiaScoreAct",
            type: "float"
        },
        {
            name: "zipingScore",
            type: "float"
        },
        {
            name: "kpiScore",
            type: "float"
        },
        {
            name: "kpiScoreAct",
            type: "float"
        },
        {
            name: "jiaoxueScore",
            type: "float"
        },
        {
            name: "stuPingjiaScore",
            type: "float"
        },
        {
            name: "stuPingjiaScoreAct",
            type: "float"
        },
        {
            name: "totalScore",
            type: "float"
        },
        {
            name: "rank",
            type: "int"
        },
        ],
        id: "id",
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#pjTable").jqxDataTable({
        height: '100%',
        width: '100%',
        theme: 'energyblue', localization: getLocalization(),
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
            text: '考核排名',
            dataField: 'rank',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '教研组',
            dataField: 'jiaoyanzuName',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '姓名',
            dataField: 'employeeName',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '教师编号',
            dataField: 'employeeNumber',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            columngroup: 'insPj',
            text: '教务处评(60分)',
            dataField: 'jiaowuScoreAct',
            editable: false,
            width: 110,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="view(1)">' + value + '</a>';
            }
        },
        {
            columngroup: 'insPj',
            text: '备课组/教研组(20分)',
            dataField: 'jiaoyanzuPingjiaScoreAct',
            editable: false,
            width: 150,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="view(2)">' + value + '</a>';
            }
        },
        {
            columngroup: 'insPj',
            text: '年级组评(10分)',
            dataField: 'nianjiPingjiaScoreAct',
            editable: false,
            width: 110,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="view(3)">' + value + '</a>';
            }
        },
        {
            columngroup: 'insPj',
            text: '自评(10分)',
            dataField: 'zipingScore',
            editable: false,
            width: 110,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="view(4)">' + value + '</a>';
            }
        },
        {
            columngroup: 'insPj',
            text: '综合(100分)',
            dataField: 'kpiScore',
            editable: false,
            width: 110,
            cellsAlign: 'center',
            align: "center"
        },
        {
            columngroup: 'insPj',
            text: '70%',
            dataField: 'kpiScoreAct',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '教学成绩(20分)',
            dataField: 'jiaoxueScore',
            editable: true,
            width: 110,
            cellsAlign: 'center',
            align: "center"
        },
        {
            columngroup: 'StuPj',
            text: '得分',
            dataField: 'stuPingjiaScore',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            columngroup: 'StuPj',
            text: '10%按等级',
            dataField: 'stuPingjiaScoreAct',
            editable: false,
            width: 110,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '总分',
            dataField: 'totalScore',
            editable: false,
            //width: 80,
            cellsAlign: 'center',
            align: "center"
        }],
        columnGroups: [{
            text: '学校评议',
            align: 'center',
            name: 'insPj'
        },
        {
            text: '学生评议',
            align: 'center',
            name: 'StuPj'
        }]
    });
    $("#contenttablepjTable span:last").hide();
}
function refreshTable() {
    $("#pjTable").jqxDataTable('updateBoundData');
}

/** 保存评价 */
function doSave() {
    var param = [];
    var pingjiaRows = $("#pjTable").jqxDataTable('getRows');
    if(pingjiaRows==null){
    	_msg("未选择绩效考核评价");
    	return false;
    }
    for (var i = 0; i < pingjiaRows.length; i++) {
        var rowData = pingjiaRows[i];
        var item = '#row' + i + 'pjTable';
        // 教学成绩
        var val = rowData['jiaoxueScore'];
        maxVal = 20;
        minVal = 0;
        if (!checkNum(val, item)) {
            return false;
        }
        if (!checkRange(val, item, maxVal, minVal)) {
            return false;
        }

        // 学生评议
        val = rowData['stuPingjiaScore'];
        maxVal = 100;
        minVal = 0;
        if (!checkNum(val, item)) {
            return false;
        }
        if (!checkRange(val, item, maxVal, minVal)) {
            return false;
        }

        // 提交数据构建
        var p = {};
        p["id"] = rowData["id"];
        p["jiaoxueScore"] = rowData["jiaoxueScore"];
        p["stuPingjiaScore"] = rowData["stuPingjiaScore"];
        param.push(p);
    }
    if (param.length == 0) {
        _msg("没有评价数据");
        return false;
    }
    // 提交后台
    _wait();
    $.ajax({
        url: "saveKpiInfo",
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

/**模板下载*/
function down() {
    if ($('#kpiInsId').val() == '') {
        _msg("请先选择考核活动");
        return false;
    }
    window.location.href = 'downKpiInfoXls?kpiInsId=' + $('#kpiInsId').val();
}
/** 导入 */
function initUpload() {
    layui.use('upload',
    function() {
    	var upload = layui.upload;
    	var uploadInst=upload.render({
    		elem: '#uploadBtn',
            url: 'uploadKpiInfo',
            exts: 'xls|xlsx',
            before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                layer.load(); //上传loading
            },
            done: function(res, index, upload){
                layer.closeAll('loading'); //关闭loading
                if (res.code == '02') {
                    refreshTable();
                    _msg("操作成功");
                } else {
                    _alert("操作失败<BR>" + res.msg);
                }
            },
            error: function(index, upload){
            	layer.closeAll('loading'); //关闭loading
            	_alert("图片上传失败");
            }
        });
    });
}

/** 导出 */
function exp() {
    if ($('#kpiInsId').val() == '') {
        _msg("请先选择考核活动");
        return false;
    }
    window.location.href = 'exportKpiInfoXls?kpiInsId=' + $('#kpiInsId').val();
}

/** 查看评价详细 */
function view(type) {
    var sel = $("#pjTable").jqxDataTable('getSelection')[0];
    var title = sel['employeeName'];
    var width = '1000px';
    if (type == 1) {
        title = '教务处评：' + title;
    } else if (type == 2) {
        title = '教研组评：' + title;
    } else if (type == 3) {
        title = '年级组评：' + title;
    } else if (type == 4) {
        title = '自评：' + title;
        width = '1300px';
    }
    //弹窗
    layer.open({
        type: 1,
        title: title,
        skin: 'layui-layer-molv',
        area: [width, '600px'],
        shadeClose: true,
        maxmin: false,
        resize :false,
        content: $('#editLayer'),
    });
    //评价树
    var param = {};
    param["kpiInsId"] = sel['kpiIns'];
    param["employeeId"] = sel['employeeId'];
    param["type"] = type;
    var url = './searchKpiInfoDetails';
    makeTree(url, param);
    if (type == 4) {
        $("#attachGrid").show();
        initAttach();
    } else {
        $("#attachGrid").jqxDataTable('clear');
        $("#attachGrid").hide();
    }
}
function initAttach() {
    var param = {};
    var sel = $("#pjTable").jqxDataTable('getSelection')[0];
    param["kpiInsId"] = sel['kpiIns'];
    param["employeeId"] = sel['employeeId'];
    initAttachTc(param, true);
}