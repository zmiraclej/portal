//定义初始年月
var date=new Date;
var year=date.getFullYear(); 
var month=date.getMonth()+1;
month=month>9?month:'0'+month;

//定义查询条件
var startDate = '';
var endDate = '';

//构建table
function createTableDate() {
	$.ajax({
		url: "searchAnalysisData",
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		data: {
			startDate: startDate,
			endDate: endDate,
		},
		success: function(result) {
			if('02' == result.code) {
				var records = result.data;

				var source = {
					dataType: "json",
					dataFields: [{
							name: 'orgCode',
							type: 'string',
							align: 'center'
						},
						{
							name: 'orgName',
							type: 'string',
							align: 'center'
						},
						{
							name: 'asset',
							type: 'string',
							align: 'center'
						},
						{
							name: 'debt',
							type: 'number',
							align: 'center'
						},
						{
							name: 'income',
							type: 'number',
							align: 'center'
						},
						{
							name: 'expenditure',
							type: 'number',
							align: 'center'
						},
						{
							name: 'financial',
							type: 'number',
							align: 'center'
						},
						{
							name: 'grossProfit',
							type: 'number',
							align: 'center'
						},
						{
							name: 'netProfit',
							type: 'number',
							align: 'center'
						},
						{
							name: 'capital',
							type: 'number',
							align: 'center'
						},
						{
							name: 'jinlilv',
							type: 'string',
							align: 'center'
						},
						{
							name: 'maolilv',
							type: 'string',
							align: 'center'
						},
						{
							name: 'renjun',
							type: 'string',
							align: 'center'
						},
						{
							name: 'shijun',
							type: 'string',
							align: 'center'
						},
						{
							name: 'xuejun',
							type: 'string',
							align: 'center'
						},
						{
							name: 'children',
							type: 'array',
							align: 'center'
						},
						{
							name: 'expanded',
							type: 'bool',
							align: 'center'
						}
					],
					hierarchy: {
						root: 'children'
					},
					id: 'orgName',
					localData: records
				};

				var dataAdapter = new $.jqx.dataAdapter(source, {
					beforeLoadComplete: function(records) {
						/*changeChildrenElement(records);*/
						return records;
					}
				});

				var columns = [{
						text: '板块及公司',
						dataField: 'orgName',
						width: 200,
						align: 'center',
						cellsAlign: 'left'
					},
					{
						text: '总收入(万元)',
						dataField: 'income',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '总支出(万元)',
						dataField: 'expenditure',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '资产(万元)',
						dataField: 'asset',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '负债(万元)',
						dataField: 'debt',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '期间费用(万元)',
						dataField: 'financial',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '净利润(万元)',
						dataField: 'netProfit',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '毛利润(万元)',
						dataField: 'grossProfit',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '资金(万元)',
						dataField: 'capital',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '净利率(%)',
						dataField: 'jinlilv',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsFormat: "p"
					},
					{
						text: '毛利率(%)',
						dataField: 'maolilv',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsFormat: "p"
					},
					{
						text: '人均净利润(万元)',
						dataField: 'renjun',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '师均净利润(万元)',
						dataField: 'shijun',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					},
					{
						text: '生均净利润(万元)',
						dataField: 'xuejun',
						width: 150,
						align: 'center',
						cellsAlign: 'center',
						cellsRenderer: function (row, column, value, rowData){
							var useValue=FormatValue(value);
							return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
						}
					}
				];
				$("#treeGrid").jqxTreeGrid({
					height: '100%',
					width: '100%',
					theme: 'energyblue',
					localization: getLocalization(),
					source: dataAdapter,
					columnsResize: true,
					editable: false,
					filterable: false,
					exportSettings: {
						fileName: "经营业绩汇总表"
					},
					columns: columns
				});
				$("#treeGrid").jqxTreeGrid('expandAll');
			} else {
				layer.msg('数据获取失败', {
					time: 1000,
				});
			}
		}
	});
}
//画面初始化
$(document).ready(function() {
	createTableDate();
});

layui.use(['jquery', 'form', 'layedit', 'laydate', 'element'],
		function() {
			//年月范围
			//页面初始化时laydate初始值不显示，暂时赋值处理
			$("#rangedate").val(year+'-'+month+' ~ '+year+'-'+month)
			var laydate = layui.laydate;
			laydate.render({
				elem: '#rangedate',
				type: 'month',
				range: '~',
				value:year+'-'+month+' ~ '+year+'-'+month,
				done: function(value, date, edate) {
					if(value == '') {
						startDate = '';
						endDate = '';
					} else {
						var rg = value.split('~');
						startDate = rg[0].trim() + '-01';
						endDate = rg[1].trim() + '-01';
					}
					createTableDate();
				}
			});
		});


//导出  
$("#excelExport").click(function() {
	$("#treeGrid").jqxTreeGrid('exportData', 'xls');
});
