//Main画面初始化
function initTable() {
    var param = {};
    param["schoolCode"] = $("#schools").val();
    var source = {
        url: "./searchKpiIns",
        data: param,
        type: "POST",
        dataType: "json",
        root: 'data',
        dataFields: [{
            name: "id",
            type: "int"
        },
        {
            name: "kpiSchool",
            type: "string"
        },
        {
            name: "schoolName",
            type: "string"
        },
        {
            name: "name",
            type: "string"
        },
        {
            name: "year",
            type: "int"
        },
        {
            name: "seq",
            type: "int"
        },
        {
            name: 'startTimeStr',
            type: 'string'
        },
        {
            name: 'endTimeStr',
            type: 'string'
        },
        {
            name: 'zipingTmplCode',
            type: 'string'
        },
        {
            name: 'jiaoyanzuTmplCode',
            type: 'string'
        },
        {
            name: 'nianjizuTmplCode',
            type: 'string'
        },
        {
            name: 'jiaowuTmplCode',
            type: 'string'
        },
        {
            name: 'zipingTmplName',
            type: 'string'
        },
        {
            name: 'jiaoyanzuTmplName',
            type: 'string'
        },
        {
            name: 'nianjizuTmplName',
            type: 'string'
        },
        {
            name: 'jiaowuTmplName',
            type: 'string'
        }],
        id: "id",
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
            text: '绩效考核活动',
            dataField: 'name',
            editable: false,
            width: 200,
            cellsAlign: 'left',
            align: "left"
        },
        {
            text: '年度',
            dataField: 'year',
            editable: false,
            width: 60,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '序号',
            dataField: 'seq',
            editable: false,
            width: 60,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '开始日期',
            dataField: 'startTimeStr',
            editable: false,
            width: 100,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '结束日期',
            dataField: 'endTimeStr',
            editable: false,
            width: 100,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '教师自评模板',
            dataField: 'zipingTmplName',
            width: 150,
            editable: false,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '教研组评价模板',
            dataField: 'jiaoyanzuTmplName',
            width: 150,
            editable: false,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '年级组评价模板',
            dataField: 'nianjizuTmplName',
            width: 150,
            editable: false,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '教务处评价模板',
            dataField: 'jiaowuTmplName',
            width: 150,
            editable: false,
            cellsAlign: 'center',
            align: "center"
        },
        {
            text: '操作',
            editable: false,
            minWidth: 80,
            cellsAlign: 'center',
            align: "center",
            cellsRenderer: function(row, column, value, rowData) {
                return '<a style="color:#3C8DBC;cursor: pointer;" onclick="edit()">修改</a>&nbsp;&nbsp;<a style="color:#3C8DBC;cursor: pointer;" onclick="del()">删除</a>';
            }
        }]
    });
    $("#contenttablepjTable span:last").hide();
}
//Main画面表刷新
function refreshTable() {
	initTable();
}
//修改
function edit() {
    var row = $("#pjTable").jqxDataTable('getSelection')[0];
    init(row);
}
//删除
function del() {
    _wait();
    var row = $("#pjTable").jqxDataTable('getSelection')[0];
    $.ajax({
        url: "deleteKpiIns",
        type: "POST",
        dataType: "json",
        data: {
            'id': row.id
        },
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
};
//增加
function add() {
    if ($('#schools').val() == '') {
        _msg("请先选择学校");
        return false;
    }
    init(null);
}

/** 弹出画面初始化 */
function init(row) {
    layer.open({
        type: 1,
        title: '考核活动管理',
        maxmin: true,
        shadeClose: false,
        area: ['650px', '450px'],
        content: $('#addForm'),
    });

    var $form;
    var form;

    layui.use(['jquery', 'form', 'layedit', 'laydate'],
    function() {
        form = layui.form(),
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
        $form = $('#addForm');
        //自定义验证规则  
        form.verify({
            year: [/[0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}/, '请输入4位年度！']
        });
        // 监听提交
        form.on('submit(submit1)',
        function(data) {
            _wait();
            $.ajax({
                url: "saveKpiIns",
                type: "POST",
                dataType: "json",
                // 必需设定，后台@RequestBody会根据它做数据反序列化
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
    // 加载数据
    var code = $("#schools").val();
    $.ajax({
        url: "searchKpiTemplatesByType",
        type: "POST",
        dataType: "json",
        data: {
            'schoolCode': code
        },
        success: function(result) {
            if (result.data) {
                // 初始化教师自评模板
                proHtml = '<option value="">必选</option>';
                data = result.data.teacher;
                for (var i = 0; i < data.length; i++) {
                    proHtml += '<option value="' + data[i].tmplCode + '">' + data[i].tmplName + '</option>';
                }
                $form.find('select[name=zipingTmplCode]').html(proHtml);
                form.render();
                // 初始化教研组评价模板
                proHtml = '<option value="">必选</option>';
                data = result.data.jiaoyanzu;
                for (var i = 0; i < data.length; i++) {
                    proHtml += '<option value="' + data[i].tmplCode + '">' + data[i].tmplName + '</option>';
                }
                $form.find('select[name=jiaoyanzuTmplCode]').html(proHtml);
                form.render();
                // 初始化年级组评价模板
                proHtml = '<option value="">必选</option>';
                data = result.data.nianjizu;
                for (var i = 0; i < data.length; i++) {
                    proHtml += '<option value="' + data[i].tmplCode + '">' + data[i].tmplName + '</option>';
                }
                $form.find('select[name=nianjizuTmplCode]').html(proHtml);
                form.render();
                // 初始化教务处评价模板
                proHtml = '<option value="">必选</option>';
                data = result.data.jiaowu;
                for (var i = 0; i < data.length; i++) {
                    proHtml += '<option value="' + data[i].tmplCode + '">' + data[i].tmplName + '</option>';
                }
                $form.find('select[name=jiaowuTmplCode]').html(proHtml);
                form.render();

                // 表单初始化
                $("#reset").click();
                if (row) {
                    $("#id").val(row.id);
                    $("#kpiSchool").val(row.kpiSchool);
                    $("#name").val(row.name);
                    $("#year").val(row.year);
                    $("#startTime").val(row.startTimeStr);
                    $("#endTime").val(row.endTimeStr);
                    $("#zipingTmplCode").val(row.zipingTmplCode);
                    $("#jiaoyanzuTmplCode").val(row.jiaoyanzuTmplCode);
                    $("#nianjizuTmplCode").val(row.nianjizuTmplCode);
                    $("#jiaowuTmplCode").val(row.jiaowuTmplCode);
                } else {
                	$("#id").val('');
                    $("#kpiSchool").val($('#schools').val());
                }
            }
        },
        error: function(result) {
            layer.closeAll();
            _alert("操作失败<BR>" + result.msg);
        }
    });
}