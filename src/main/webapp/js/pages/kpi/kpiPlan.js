function initTable() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    var source = {
        url: "./searchKpiPlan",
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
            name: "code",
            type: "string"
        },
        {
            name: "kpiPlanYou",
            type: "int"
        },
        {
            name: "kpiPlanYouUb",
            type: "number"
        },
        {
            name: "kpiPlanYouLb",
            type: "number"
        },
        {
            name: "kpiPlanLiang",
            type: "int"
        },
        {
            name: "kpiPlanLiangUb",
            type: "number"
        },
        {
            name: "kpiPlanLiangLb",
            type: "number"
        },
        {
            name: "kpiPlanZhong",
            type: "int"
        },
        {
            name: "kpiPlanZhongUb",
            type: "number"
        },
        {
            name: "kpiPlanZhongLb",
            type: "number"
        },
        {
            name: "kpiPlanCha",
            type: "int"
        },
        {
            name: "kpiPlanChaUb",
            type: "number"
        },
        {
            name: "kpiPlanChaLb",
            type: "number"
        },
        {
            name: "remark",
            type: "string"
        },
        {
            name: "kpiInsName",
            type: "string"
        },
        {
            name: "groupPersons",
            type: "int"
        },
        {
            name: "groupType",
            type: "int"
        },
        {
            name: "groupTypeName",
            type: "string"
        },
        {
            name: "groupName",
            type: "string"
        }],
        //id: "id",
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#pjTable").jqxDataTable({
    	height : '100%',
		width : '100%',
    	theme : 'energyblue', localization: getLocalization(),
        source: dataAdapter,
        altRows: true,
        columnsResize: true,
        editable: true,
        filterable: false,
        groups: ['groupTypeName'],
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
        groupsRenderer: function(value, rowData, level) {
            var groupType = rowData.data["groupType"];
            var val = '';
            if (groupType === 1) {
                val = '<p><b><i>' + value + '（总分20分）' + '</i></b></p> ';
            } else {
                val = '<p><b><i>' + value + '（总分10分）' + '</i></b></p> ';
            }
            return val;
        },
        columns: [{
            text: '',
            dataField: 'groupTypeName',
            editable: false,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '';
            }
        },
        {
            text: '组',
            dataField: 'groupName',
            editable: false,
            width: 80,
            cellsAlign: 'left',
            align: "left"
        },
        {
            text: '总人数',
            dataField: 'groupPersons',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plYou',
            text: '人数',
            dataField: 'kpiPlanYou',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plYou',
            text: '评分上限',
            dataField: 'kpiPlanYouUb',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plYou',
            text: '评分下限',
            dataField: 'kpiPlanYouLb',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plLiang',
            text: '人数',
            dataField: 'kpiPlanLiang',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plLiang',
            text: '评分上限',
            dataField: 'kpiPlanLiangUb',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plLiang',
            text: '评分下限',
            dataField: 'kpiPlanLiangLb',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plZhong',
            text: '人数',
            dataField: 'kpiPlanZhong',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plZhong',
            text: '评分上限',
            dataField: 'kpiPlanZhongUb',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plZhong',
            text: '评分下限',
            dataField: 'kpiPlanZhongLb',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plCha',
            text: '人数',
            dataField: 'kpiPlanCha',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plCha',
            text: '评分上限',
            dataField: 'kpiPlanChaUb',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd'
        },
        {
            columngroup: 'plCha',
            text: '评分下限',
            dataField: 'kpiPlanChaLb',
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
            width: 100,
            cellsAlign: 'left',
            align: "left"
        }],
        columnGroups: [{
            text: '优',
            align: 'center',
            name: 'plYou'
        },
        {
            text: '良',
            align: 'center',
            name: 'plLiang'
        },
        {
            text: '中',
            align: 'center',
            name: 'plZhong'
        },
        {
            text: '差',
            align: 'center',
            name: 'plCha'
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
    for (var i = 0; i < pingjiaRows.length; i++) {
        var rowData = pingjiaRows[i];
        var item = "tr[data-key='" + rowData.uid + "']";
        // 类别
        var groupType = rowData['groupType'];
        // 人数
        var val1 = rowData['kpiPlanYou'];
        var val2 = rowData['kpiPlanLiang'];
        var val3 = rowData['kpiPlanZhong'];
        var val4 = rowData['kpiPlanCha'];
        var val = rowData['groupPersons'];
        if ((val1 + val2 + val3 + val4) != val) {
            layer.tips("各类型人数之和不等于总人数", $(item), {
                tips: [2, '#3595CC']
            });
            return false;
        }

        // 评分
        var lb1 = rowData['kpiPlanYouLb'];
        var lb2 = rowData['kpiPlanLiangLb'];
        var lb3 = rowData['kpiPlanZhongLb'];
        var lb4 = rowData['kpiPlanChaLb'];

        var ub1 = rowData['kpiPlanYouUb'];
        var ub2 = rowData['kpiPlanLiangUb'];
        var ub3 = rowData['kpiPlanZhongUb'];
        var ub4 = rowData['kpiPlanChaUb'];
        if (groupType == 1 && ub1 != 20) {
            layer.tips("教研组评最高分20分", $(item), {
                tips: [2, '#3595CC']
            });
            return false;
        }
        if (groupType == 2 && ub1 != 10) {
            layer.tips("年级组评最高分10分", $(item), {
                tips: [2, '#3595CC']
            });
            return false;
        }
        if (! (ub1 > lb1 && ub2 > lb2 && ub3 > lb3 && ub4 > lb4 && lb1 > ub2 && lb2 > ub3 && lb3 > ub4)) {
            layer.tips("各类型分值范围不正确", $(item), {
                tips: [2, '#3595CC']
            });
            return false;
        }

        // 提交数据构建
        var p = {};
        p["id"] = rowData['id'];
        p["kpiIns"] = rowData['kpiIns'];
        p["code"] = rowData['code'];
        p["kpiPlanYou"] = Number(rowData['kpiPlanYou']);
        p["kpiPlanYouUb"] = Number(rowData['kpiPlanYouUb']);
        p["kpiPlanYouLb"] = Number(rowData['kpiPlanYouLb']);
        p["kpiPlanLiang"] = Number(rowData['kpiPlanLiang']);
        p["kpiPlanLiangUb"] = Number(rowData['kpiPlanLiangUb']);
        p["kpiPlanLiangLb"] = Number(rowData['kpiPlanLiangLb']);
        p["kpiPlanZhong"] = Number(rowData['kpiPlanZhong']);
        p["kpiPlanZhongUb"] = Number(rowData['kpiPlanZhongUb']);
        p["kpiPlanZhongLb"] = Number(rowData['kpiPlanZhongLb']);
        p["kpiPlanCha"] = Number(rowData['kpiPlanCha']);
        p["kpiPlanChaUb"] = Number(rowData['kpiPlanChaUb']);
        p["kpiPlanChaLb"] = Number(rowData['kpiPlanChaLb']);
        p["remark"] = rowData['remark'];
        p["groupType"] = rowData['groupType'];
        param.push(p);
    }
    if (param.length == 0) {
        _msg("没有评价数据");
        return false;
    }
    // 提交后台
    _wait();
    $.ajax({
        url: "saveKpiPlan",
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