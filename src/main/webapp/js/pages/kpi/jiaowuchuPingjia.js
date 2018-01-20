var modify = [];
function setModify(cell) {
    var p = {};
    p["kpiInsId"] = $('#kpiInsId').val();
    p["employeeId"] = cell.row;

    var arr = cell.datafield.split(':');
    var ds = [];
    var d = {};
    if (arr[0] == 'itemTxt') {
        d["itemCode"] = arr[1];
        d["itemTxt"] = cell.value;
        ds.push(d);
    } else if (arr[0] == 'itemScore') {
        d["itemCode"] = arr[1];
        d["itemScore"] = cell.value;
        ds.push(d);
    }
    p["ds"] = ds;
    modify.push(p);
}
function getCols(items, dataFields, columns, columnGroups, columngroupname) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item['blLeaf']) {
            var dataFiled;
            var column;
            if (item['itemType'] == '1') {
                var fieldName = "itemScore:" + item.itemCode + ":" + item.itemScoreMin + ":" + item.itemScoreMax;
                dataFiled = {
                    name: fieldName,
                    type: "float"
                };
                if (columngroupname != null && columngroupname != '') {
                    column = {
                        columngroup: columngroupname,
                        text: item.itemName,
                        dataField: fieldName,
                        editable: true,
                        width: 60,
                        cellsAlign: 'center',
                        align: "center",
                        cellsformat: 'd',
                        validation: function(cell, val) {
                            var arr = cell.datafield.split(':');
                            var minVal = Number(arr[2]);
                            var maxVal = Number(arr[3]);
                            if (! (val >= minVal && val <= maxVal)) {
                                return {
                                    message: "评分范围错误（" + minVal + "~" + maxVal + "分）",
                                    result: false
                                };
                            }
                            setModify(cell);
                            return true;
                        }
                    };
                } else {
                    column = {
                        text: item.itemName,
                        dataField: fieldName,
                        editable: true,
                        width: 60,
                        cellsAlign: 'center',
                        align: "center",
                        cellsformat: 'd',
                        validation: function(cell, val) {
                            var arr = cell.datafield.split(':');
                            var minVal = Number(arr[2]);
                            var maxVal = Number(arr[3]);
                            if (! (val >= minVal && val <= maxVal)) {
                                return {
                                    message: "评分范围错误（" + minVal + "~" + maxVal + "分）",
                                    result: false
                                };
                            }
                            setModify(cell);
                            return true;
                        }
                    };
                }
            } else {
                var filedName = "itemTxt:" + item.itemCode;
                dataFiled = {
                    name: filedName,
                    type: "string"
                };
                if (columngroupname != null && columngroupname != '') {
                    column = {
                        columngroup: columngroupname,
                        text: item.itemName,
                        dataField: filedName,
                        editable: true,
                        width: 40,
                        cellsAlign: 'center',
                        align: "center",
                        validation: function(cell, val) {
                            setModify(cell);
                            return true;
                        }
                    };
                } else {
                    column = {
                        text: item.itemName,
                        dataField: filedName,
                        editable: true,
                        width: 40,
                        cellsAlign: 'center',
                        align: "center",
                        validation: function(cell, val) {
                            setModify(cell);
                            return true;
                        }
                    };
                }
            }
            dataFields.push(dataFiled);
            columns.push(column);
        } else {
            columngroupname = 'columngroup-' + item.itemCode;
            var columngroup = {
                text: item.itemName,
                align: 'center',
                name: columngroupname
            };
            columnGroups.push(columngroup);
        }
    }
}
function getDatas(items, p) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item['blLeaf']) {
            if (item['itemType'] == '1') {
                var fieldName = "itemScore:" + item.itemCode + ":" + item.itemScoreMin + ":" + item.itemScoreMax;
                p[fieldName] = item.itemScore;
            } else {
                var fieldName = "itemTxt:" + item.itemCode;
                p[fieldName] = item.itemTxt;
            }
        }
    }
}
// Main画面初始化
function initTable() {
    var param = {};
    param["kpiInsId"] = $('#kpiInsId').val();
    var url = './searchPingjiaItemJw';
    _wait();
    $.ajax({
        url: './searchPingjiaListJwNew',
        type: "POST",
        dataType: "json",
        data: param,
        success: function(res) {
            var recs = res.data;
            if (recs) {
                var items = recs[0].items;
                var dataFields = [{
                    name: "kpiInsId",
                    type: "int"
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
                    type: "float"
                }];
                var columns = [{
                    text: '学科',
                    dataField: 'name',
                    editable: false,
                    width: 60,
                    cellsAlign: 'center',
                    align: "center"
                },
                {
                    text: '姓名',
                    dataField: 'teacherName',
                    editable: false,
                    width: 60,
                    cellsAlign: 'center',
                    align: "center"
                },
                {
                    text: '教师编号',
                    dataField: 'employeeNo',
                    editable: false,
                    width: 60,
                    cellsAlign: 'center',
                    align: "center"
                },
                {
                    text: '总分',
                    dataField: 'score',
                    editable: false,
                    width: 60,
                    cellsAlign: 'center',
                    align: "center"
                }];
                var columnGroups = [];
                getCols(items, dataFields, columns, columnGroups, null);

                var data = [];
                for (var i = 0; i < recs.length; i++) {
                    var rec = recs[i];
                    var em = rec.p;
                    items = rec.items;
                    var p = {};
                    p["kpiInsId"] = em["kpiIns"];
                    p["name"] = em["name"];
                    p["employeeId"] = em["employeeId"];
                    p["teacherName"] = em["teacherName"];
                    p["employeeNo"] = em["employeeNo"];
                    p["score"] = em["score"];
                    getDatas(items, p);
                    data.push(p);
                }
                var source = {
                    dataType: "json",
                    dataFields: dataFields,
                    id: "employeeId",
                    localData: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#pjTable").jqxDataTable({
                	height : '100%',
                	width : '100%',
            		theme : 'energyblue', localization: getLocalization(),
                    source: dataAdapter,
                    altRows: true,
                    columnsResize: true,
                    columnsHeight: 100,
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
                    columns: columns,
                    columnGroups: columnGroups
                });
                $("#contenttablepjTable span:last").hide();
                layer.closeAll();
            }
        }
    });
}
//Main画面表刷新
function refreshTable() {
    $("#pjTable").remove();
    $("#mainTable").append("<div id='pjTable'></div>");
    initTable();
}
// 保存
function doSave() {
    _wait();
    if (modify.length == 0) {
        layer.closeAll();
        _msg("没有未保存的数据");
        return false;
    }
    // 提交后台
    $.ajax({
        url: "updatePingjiaJwNew",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(modify),
        success: function(result) {
            if (result.code == '02') {
                layer.closeAll();
                _msg("操作成功");
                refreshTable();
                modify = [];
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
    window.location.href = 'downKpiJwXls?kpiInsId=' + $('#kpiInsId').val();
}
/** 导入 */
function initUpload() {
    layui.use('upload',
    function() {
    	var upload = layui.upload;
    	var uploadInst=upload.render({
        	elem: '#uploadBtn',
            url: 'uploadKpiJw?kpiInsId=' + $('#kpiInsId').val(),
            exts: 'xls|xlsx',
            before: function() {
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
            }
        });
    });
}