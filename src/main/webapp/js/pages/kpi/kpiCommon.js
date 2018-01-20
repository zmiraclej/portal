function checkRequired(val, item) {
    if (val === null || val === '') {
    	_msg("该项未评分，默认最低分" + "<BR>项目编号：" + item);
        return false;
    }
    return true;
}

function checkNum(val, item) {
    var regx = /^[0-9]+[0-9]*]*$/; // 判断正整数
    if (val && !regx.test(val)) {
        _msg("评分请输入整数值" + "<BR>项目编号：" + item);
        return false;
    }
    return true;
}

function checkRange(val, item, maxVal, minVal) {
    if (val >= minVal && val <= maxVal) {
        return true;
    } else {
        _msg("评分范围错误（" + minVal + "~" + maxVal + "分）" + "<BR>项目编号：" + item);
        return false;
    }
}

function getTotal(pingjiaRows, val) {
    if (pingjiaRows) {
        for (var i = 0; i < pingjiaRows.length; i++) {
            var rowData = pingjiaRows[i];
            if (rowData['blLeaf']) {
                val = val + Number(rowData['itemScore']);
            } else {
                val = getTotal(rowData.children, val);
            }
        }
    }
    return val;
}

var rowNum = -1;
function checkRows(pingjiaRows, param, kpiScore) {
    var re = true;
    if (pingjiaRows) {
        for (var i = 0; i < pingjiaRows.length; i++) {
            rowNum++;
            var rowData = pingjiaRows[i];
            if (rowData['blLeaf']) {
                // 打分项目保存前验证
                if (rowData['itemType'] == '1') {
                    var item = rowData['itemCode'];
                    var val = rowData['itemScore'];
                    var maxVal = rowData['itemScoreMax'];
                    var minVal = rowData['itemScoreMin'];
                    if (!checkRequired(val, item)) {
                        val = minVal;
                        $("#pjTreeGrid").jqxTreeGrid('setCellValue', rowData.uid, 'itemScore', val.toString());
                        re = false;
                        rowNum = -1;
                        return false;
                    }
                    if (!checkNum(val, item)) {
                        re = false;
                        rowNum = -1;
                        return false;
                    }
                    if (!checkRange(val, item, maxVal, minVal)) {
                        re = false;
                        rowNum = -1;
                        return false;
                    }
                }

                // 提交数据构建
                var p = {};
                p["id"] = rowData["id"];
                p["kpiInsId"] = rowData["kpiInsId"];
                p["employeeId"] = rowData["employeeId"];
                p["itemCode"] = rowData["itemCode"];
                p["tmplCode"] = rowData["tmplCode"];
                p["itemScore"] = rowData["itemScore"];
                p["itemTxt"] = rowData["itemTxt"];
                p["remark"] = rowData["remark"];
                p["kpiScore"] = kpiScore;
                p["jiaoyanzuCode"] = $('#jiaoyanzuCode').val();
                p["nianjizuCode"] = $('#nianjizuCode').val();
                param.push(p);
            } else {
                re = checkRows(rowData.children, param, kpiScore);
                if (!re) return false;
            }
        }
    }
    return re;
}

function getJqxTreeSource(url, param) {
    var source = {
        url: url,
        data: param,
        type: "POST",
        dataType: "json",
        root: 'data',
        dataFields: [{
            name: "id",
            type: "int"
        },
        {
            name: "employeeId",
            type: "int"
        },
        {
            name: "kpiInsId",
            type: "int"
        },
        {
            name: "itemId",
            type: "int"
        },
        {
            name: "tmplCode",
            type: "string"
        },
        {
            name: "itemCode",
            type: "string"
        },
        {
            name: "itemName",
            type: "string"
        },
        {
            name: "itemScoreMax",
            type: "float"
        },
        {
            name: "itemScoreMin",
            type: "float"
        },
        {
            name: "itemStandard",
            type: "string"
        },
        {
            name: "itemScore",
            type: "float"
        },
        {
            name: "itemTxt",
            type: "string"
        },
        {
            name: "remark",
            type: "string"
        },
        {
            name: "kpiScore",
            type: "float"
        },
        {
            name: "itemType",
            type: "string"
        },
        {
            name: "jiaoyanzuCode",
            type: "string"
        },
        {
            name: "nianjizuCode",
            type: "string"
        },
        {
            name: 'expanded',
            type: 'bool'
        },
        {
            name: 'blLeaf',
            type: 'bool'
        },
        {
            name: 'children',
            type: 'array'
        }],
        hierarchy: {
            root: 'children'
        },
        id: "itemCode",
        cache: false
    };
    return source;
}

function getJqxTreeColumns() {
    var columns = [{
        text: '项目编号',
        dataField: 'itemCode',
        editable: false,
        width: 100,
        align: "center"
    },
    {
        text: '项目名称',
        dataField: 'itemName',
        editable: false,
        width: '25%',
        cellsAlign: 'left',
        align: "left"
    },
    {
        text: '评分标准',
        dataField: 'itemStandard',
        editable: false,
        width: '25%',
        cellsAlign: 'left',
        align: "left"
    },
    {
        text: '评分依据',
        dataField: 'itemTxt',
        editable: true,
        width: 150,
        cellsAlign: 'center',
        align: "center"
    },
    {
        text: '评分',
        dataField: 'itemScore',
        editable: true,
        width: 80,
        cellsAlign: 'center',
        align: "center",
        cellsformat: 'd'
    },
    {
        text: '备注',
        dataField: 'remark',
        editable: true,
        cellsAlign: 'center',
        align: "center"
    }];
    return columns;
}

function makeTree(url, param) {
    var source = getJqxTreeSource(url, param);
    var columns = getJqxTreeColumns();
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#pjTreeGrid").jqxTreeGrid({
        height: "100%",
        width: "100%",
        theme: 'energyblue', localization: getLocalization(),
        source: dataAdapter,
        altRows: true,
        columnsResize: true,
        editable: true,
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
        columns: columns,
    });
    $("#contenttablepjTreeGrid span:last").hide();
}

/**教师附件管理*/
//附件初始化
function initAttachTc(param, readonly) {
    var source = {
        url: "./searchKpiTcAttach",
        data: param,
        type: "POST",
        dataType: "json",
        root: 'data',
        dataFields: [{
            name: "id",
            type: "int"
        },
        {
            name: "attach",
            type: "string"
        }],
        id: "id",
        cache: false
    };
    var columns = [];
    columns.push({
        text: '文件',
        dataField: 'attach',
        editable: false,
        width: 300,
        cellsAlign: 'center',
        align: "center",
        cellsRenderer: function(row, column, value, rowData) {
            var id = rowData['id'];
            return '<a style="color:#3C8DBC;cursor: pointer;" onclick="downAttachTc(\'' + id + '\')">' + value + '</a>';
        }
    });
    if (!readonly) {
        columns.push({
            text: '',
            editable: false,
            width: 60,
            cellsAlign: 'left',
            align: "left",
            cellsRenderer: function(row, column, value, rowData) {
                var id = rowData['id'];
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="delAttachTc(\'' + id + '\')">删除</a>';
            }
        })
    }
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#attachGrid").jqxDataTable({
        theme: 'energyblue', localization: getLocalization(),
        source: dataAdapter,
        height: '200px',
        columns: columns,
    });
}
// 下载附件
function downAttachTc(id) {
    window.location.href = 'downKpiTcAttach' + "?attachId=" + encodeURIComponent(id);
}
// 删除附件
function delAttachTc(id) {
    $.ajax({
        url: "delKpiTcAttach",
        type: "POST",
        dataType: "json",
        data: {
            attachId: id
        },
        success: function(result) {
            if (result.code == '02') {
                initAttach();
                _msg("操作成功");
            } else {
                _alert("操作失败<BR>" + result.msg);
            }
        },
        error: function(result) {
            layer.closeAll();
            _alert("系统异常");
        }
    })
}

/** 指导评分人数表构建 */
function initYpTableCommon(param) {
    var source = {
        url: "./searchKpiPlanForPj",
        data: param,
        type: "POST",
        dataType: "json",
        root: 'data',
        dataFields: [{
            name: "no",
            type: "int"
        },
        {
            name: "type",
            type: "string"
        },
        {
            name: "range",
            type: "string"
        },
        {
            name: "psns",
            type: "int"
        },
        {
            name: "actPsns",
            type: "int"
        }],
        id: "no",
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#ypTable").jqxDataTable({
        theme: 'energyblue', localization: getLocalization(),
        source: dataAdapter,
        altRows: true,
        columnsResize: true,
        editable: true,
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
            text: '序号',
            dataField: 'no',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '类型',
            dataField: 'type',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '评分范围',
            dataField: 'range',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '预计人数',
            dataField: 'psns',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '实际人数',
            dataField: 'actPsns',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        }]
    });
    $("#contenttableypTable span:last").hide();
}