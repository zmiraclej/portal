//Main画面初始化
function initTable() {
    var param = {};
    var source = {
        url: "./searchKpiTemplate",
        data: param,
        type: "POST",
        dataType: "json",
        root: 'data',
        dataFields: [{
            name: "schoolCode",
            type: "string"
        },
        {
            name: "schoolName",
            type: "string"
        },
        {
            name: "tmplCode",
            type: "string"
        },
        {
            name: "tmplName",
            type: "string"
        },
        {
            name: "tmplType",
            type: "string"
        },
        {
            name: "tmplTypeName",
            type: "string"
        },
        {
            name: "tmplYear",
            type: "string"
        },
        {
            name: "tmplSeq",
            type: "int"
        }],
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
            text: '学校',
            dataField: 'schoolName',
            editable: false,
            width: 300,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '年度',
            dataField: 'tmplYear',
            editable: false,
            width: 60,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '序号',
            dataField: 'tmplSeq',
            editable: false,
            width: 60,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '模板编号',
            dataField: 'tmplCode',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '模板名称',
            dataField: 'tmplName',
            editable: false,
            width: 200,
            cellsAlign: 'left',
            align: "left"
        },
        {
            text: '模板类型',
            dataField: 'tmplTypeName',
            editable: false,
            width: 100,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '操作',
            editable: false,
            width: 200,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="edit()">修改</a>&nbsp;&nbsp;<a style="color:#3C8DBC;cursor: pointer;" onclick="del()">删除</a>&nbsp;&nbsp;<a style="color:#3C8DBC;cursor: pointer;" onclick="editItem()">修改项目</a>';
            }
        }]
    });
    $("#contenttablepjTable span:last").hide();
}
// Main画面表刷新
function refreshTable() {
    $("#pjTable").jqxDataTable('updateBoundData');
}
// 页面加载
$(document).ready(function() {
    initUpload();
    initTable();
});
//导入模板下载
function down() {
    window.location.href = 'downKpiTemplateXls';
}
// 导入模板
function initUpload() {
    layui.use('upload',
    function() {
    	var upload = layui.upload;
    	var uploadInst=upload.render({
    		elem: '#uploadBtn',
            url: 'uploadKpiTemplate',
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
// 修改模板
function edit() {
    var row = $("#pjTable").jqxDataTable('getSelection')[0];
    layer.open({
        type: 1,
        title: '模板管理',
        maxmin: true,
        shadeClose: false,
        scrollbar:false,
        area: ['500px', '350px'],
        content: $('#addForm'),
    });

    layui.use(['form', 'layedit', 'laydate'],
    function() {
        var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;

        // 创建一个编辑器
        var editIndex = layedit.build('editor');

        // 表单初始化
        $("#reset").click();
        $("#tmplCode").val(row.tmplCode);
        $("#tmplName").val(row.tmplName);
        $("#tmplType").val(row.tmplType);

        // 监听提交
        form.on('submit(submit1)',
        function(data) {
            _wait();
            $.ajax({
                url: "updateKpiTemplate",
                type: "POST",
                dataType: "json",
                //必需设定，后台@RequestBody会根据它做数据反序列化
                contentType: "application/json",
                data: JSON.stringify(data.field),
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
            });
            return false;
        });
    });
}
// 删除模板
function del() {
    var row = $("#pjTable").jqxDataTable('getSelection')[0];
    layer.msg('是否要删除选中模板？', {
	    time: 15000, //15s后自动关闭
	    area: ['300px', '100px'],
	    btn: ['确  认', '取  消'],
	    yes: function(){
	         layer.closeAll();
	         $.ajax({
	             url: "deleteKpiTemplate",
	             type: "POST",
	             dataType: "json",
	             data: {
	                 'tmplCode': row.tmplCode
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

	      }
	      ,btn2: function(){
	        layer.closeAll();
	      }
	  });
};

//修改模板项目
function editItem() {
    var index = layer.open({
        type: 1,
        title: '模板项目管理',
        skin: 'layui-layer-molv',
        area: ['1100px', '80%'],
        shadeClose: true,
        maxmin: true,
        content: $('#editLayer'),
        btn: ['确定', '取消'],
        yes: function(index, layero) {
            saveItem();
        }
    });
    initItemTree();
}
//子画面初始化
function initItemTree() {
    var row = $("#pjTable").jqxDataTable('getSelection')[0];
    var param = {};
    param["tmplCode"] = row.tmplCode;
    var source = {
        url: 'searchKpiTemplateItem',
        data: param,
        type: "POST",
        dataType: "json",
        root: 'data',
        dataFields: [{
            name: "id",
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
            name: "blLeaf",
            type: "bool"
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
            name: "itemType",
            type: "string"
        },
        {
            name: "remark",
            type: "string"
        },
        {
            name: 'expanded',
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
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#pjTreeGrid").jqxTreeGrid({
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
            text: '项目编号',
            dataField: 'itemCode',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '项目名称',
            dataField: 'itemName',
            editable: true,
            width: 300,
            cellsAlign: 'left',
            align: "left"
        },
        {
            text: '评分标准',
            dataField: 'itemStandard',
            editable: true,
            width: 300,
            cellsAlign: 'left',
            align: "left"
        },
        {
            text: '项目类型',
            dataField: 'itemType',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value) {
                if (value == '1') {
                    return "评分";
                } else {
                    return "描述";
                }
            },
            validation: function(cell, val) {
                if (val != 1 && val != 2) {
                    return {
                        message: "项目类型错误<BR>评分：1<BR>描述：2",
                        result: false
                    };
                }
                return true;
            }
        },
        {
            text: '该项最低分',
            dataField: 'itemScoreMin',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd',
        },
        {
            text: '该项最高分',
            dataField: 'itemScoreMax',
            editable: true,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsformat: 'd',
        },
        {
            text: '操作',
            editable: false,
            width: 80,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="delItem()">删除</a>';
            }
        }]
    });
    $("#contenttablepjTreeGrid span:last").hide();
}
//子画面刷新
function refreshTree() {
    $("#pjTreeGrid").jqxTreeGrid('updateBoundData');
}
//删除模板项目
function delItem() {
    var row = $("#pjTreeGrid").jqxTreeGrid('getSelection')[0];
    var pingjiaRows = $("#pjTreeGrid").jqxTreeGrid('getRows');
    $.ajax({
        url: "deleteKpiTemplateItem",
        type: "POST",
        dataType: "json",
        data: {
            'id': row.id
        },
        success: function(result) {
            if (result.code == '02') {
                _msg("操作成功");
                if (pingjiaRows.length > 1) {
                    refreshTree();
                } else {
                    layer.closeAll();
                    refreshTable();
                }
            } else {
                _alert("操作失败<BR>" + result.msg);
            }
        },
        error: function(result) {
            _alert("系统异常");
        }
    });
};
//保存模板项目
function saveItem() {
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
        _msg("没有数据");
        return false;
    }
    // 提交后台
    $.ajax({
        url: "updateKpiTemplateItem",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(result) {
            if (result.code == '02') {
                refreshTree();
                layer.closeAll("loading");
                _msg("操作成功");
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
//数据验证
function checkRows(pingjiaRows, param) {
    var re = true;
    if (pingjiaRows) {
        for (var i = 0; i < pingjiaRows.length; i++) {
            var rowData = pingjiaRows[i];
            if (rowData['blLeaf']) {
                var item = rowData['itemCode'];
                var itemType = rowData['itemType'];
                var minVal = rowData['itemScoreMin'];
                var maxVal = rowData['itemScoreMax'];
                if (itemType == '1') {
                    if (maxVal < minVal) {
                        re = false;
                        _msg("该项最高分不能小于该项最低分" + "<BR>项目编号：" + item);
                        return false;
                    }
                }
                // 提交数据构建
                var p = {};
                p["id"] = rowData["id"];
                p["tmplCode"] = rowData["tmplCode"];
                p["itemCode"] = rowData["itemCode"];
                p["itemName"] = rowData["itemName"];
                p["itemType"] = rowData["itemType"];
                p["itemScoreMin"] = rowData["itemScoreMin"];
                p["itemScoreMax"] = rowData["itemScoreMax"];
                p["itemStandard"] = rowData["itemStandard"];
                p["remark"] = rowData["remark"];
                param.push(p);
            } else {
                re = checkRows(rowData.children, param);
                if (!re) return false;
            }
        }
    }
    return re;
}