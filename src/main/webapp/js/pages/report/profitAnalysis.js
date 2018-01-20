function onTeacherClick() {
	var index = layer.open({
		type: 1,
		title: '教师情况分析',
		area: ['650px', '260px'],
		shadeClose: true, //点击遮罩关闭
		maxmin: false,
		content: $('#hrefOption')
	});

}

/*function changeChildrenElement(children){
	for (var i = 0; i < children.length; i++) {
		if (children[i].children && children[i].children.length > 0) {	         
			
			children[i].orgName="<span style='color:green;font-weight: bold;'>" + children[i].orgName + "</span>";
			children[i].shishengbi="<span style='color:green;font-weight: bold;'>" + children[i].shishengbi + "</span>";
			children[i].xuexiaoShiyonglv="<span style='color:green;font-weight: bold;'>" + children[i].xuexiaoShiyonglv + "</span>";
			children[i].reliChengbenbi="<span style='color:green;font-weight: bold;'>" + children[i].reliChengbenbi + "</span>";
			children[i].shijunLirun="<span style='color:green;font-weight: bold;'>" + children[i].shijunLirun + "</span>";
			children[i].shengjunLirun="<span style='color:green;font-weight: bold;'>" + children[i].shengjunLirun + "</span>";
			children[i].danweiMianjiLirun="<span style='color:green;font-weight: bold;'>" + children[i].danweiMianjiLirun + "</span>";
			children[i].danweiZichanLirun="<span style='color:green;font-weight: bold;'>" + children[i].danweiZichanLirun + "</span>";
		
			changeChildrenElement(children[i].children);
		}
	}
} */
$(document).ready(function() {
	var records = [{
		"orgCode": "00",
		"orgName": "集团",
		"shishengbi": "7:1",
		"xuexiaoShiyonglv": "75%",
		"reliChengbenbi": "55%",
		"shijunLirun": "12",
		"shengjunLirun": "5",
		"danweiMianjiLirun": "3.6",
		"danweiZichanLirun": "2.4",
		children: [{
				"orgCode": "01",
				"orgName": "学历教育",
				"shishengbi": "8.1:1",
				"xuexiaoShiyonglv": "85%",
				"reliChengbenbi": "65%",
				"shijunLirun": "11",
				"shengjunLirun": "6",
				"danweiMianjiLirun": "3.7",
				"danweiZichanLirun": "2.6",
				children: [{
						"orgName": "锦江高中",
						"shishengbi": "7:1",
						"xuexiaoShiyonglv": "75%",
						"reliChengbenbi": "55%",
						"shijunLirun": "12",
						"shengjunLirun": "5",
						"danweiMianjiLirun": "3.6",
						"danweiZichanLirun": "2.4"
					},
					{
						"orgCode": "02",
						"orgName": "锦江初中",
						"shishengbi": "6.3:1",
						"xuexiaoShiyonglv": "75%",
						"reliChengbenbi": "55%",
						"shijunLirun": "12",
						"shengjunLirun": "5",
						"danweiMianjiLirun": "3.8",
						"danweiZichanLirun": "2.4"
					},
					{
						"orgCode": "03",
						"orgName": "成华校区",
						"shishengbi": "7.2:1",
						"xuexiaoShiyonglv": "65%",
						"reliChengbenbi": "65%",
						"shijunLirun": "11",
						"shengjunLirun": "4.2",
						"danweiMianjiLirun": "3.6",
						"danweiZichanLirun": "2.1"
					},
					{
						"orgCode": "04",
						"orgName": "郫县分校",
						"shishengbi": "6.5:1",
						"xuexiaoShiyonglv": "71%",
						"reliChengbenbi": "73%",
						"shijunLirun": "10",
						"shengjunLirun": "6.7",
						"danweiMianjiLirun": "2.1",
						"danweiZichanLirun": "2.3"
					},
					{
						"orgCode": "05",
						"orgName": "北城分校",
						"shishengbi": "5.9:1",
						"xuexiaoShiyonglv": "75%",
						"reliChengbenbi": "54%",
						"shijunLirun": "11.5",
						"shengjunLirun": "5.2",
						"danweiMianjiLirun": "3.3",
						"danweiZichanLirun": "1.4"
					},
					{
						"orgCode": "06",
						"orgName": "达州分校",
						"shishengbi": "7.5:1",
						"xuexiaoShiyonglv": "52%",
						"reliChengbenbi": "63%",
						"shijunLirun": "12.2",
						"shengjunLirun": "5.9",
						"danweiMianjiLirun": "3.4",
						"danweiZichanLirun": "3.4"
					}
				]
			},
			{
				"orgCode": "02",
				"orgName": "校外培训",
				"shishengbi": "5.2:1",
				"xuexiaoShiyonglv": "73%",
				"reliChengbenbi": "55%",
				"shijunLirun": "12",
				"shengjunLirun": "6.1",
				"danweiMianjiLirun": "3.6",
				"danweiZichanLirun": "4.2",
				children: [{
						"orgName": "锦江幼儿园",
						"shishengbi": "5.1:1",
						"xuexiaoShiyonglv": "71%",
						"reliChengbenbi": "55%",
						"shijunLirun": "12",
						"shengjunLirun": "5.5",
						"danweiMianjiLirun": "3.5",
						"danweiZichanLirun": "5.4"
					},
					{
						"orgName": "郫县幼儿园",
						"shishengbi": "5.6:1",
						"xuexiaoShiyonglv": "76%",
						"reliChengbenbi": "55%",
						"shijunLirun": "12",
						"shengjunLirun": "7.2",
						"danweiMianjiLirun": "2.7",
						"danweiZichanLirun": "4.1"
					}
				]
			},
			{
				"orgCode": "03",
				"orgName": "学前教育",
				"shishengbi": "4:1",
				"xuexiaoShiyonglv": "65%",
				"reliChengbenbi": "55%",
				"shijunLirun": "12",
				"shengjunLirun": "5",
				"danweiMianjiLirun": "4.6",
				"danweiZichanLirun": "3.7",
				children: [{
						"orgName": "嘉祥九思",
						"shishengbi": "3.5:1",
						"xuexiaoShiyonglv": "66%",
						"reliChengbenbi": "55%",
						"shijunLirun": "12",
						"shengjunLirun": "5",
						"danweiMianjiLirun": "3.2",
						"danweiZichanLirun": "4.5"
					},
					{
						"orgName": "万泽",
						"shishengbi": "4.5:1",
						"xuexiaoShiyonglv": "64%",
						"reliChengbenbi": "55%",
						"shijunLirun": "12",
						"shengjunLirun": "5",
						"danweiMianjiLirun": "7.6",
						"danweiZichanLirun": "2.4"
					}
				]
			},
		]
	}];
	console.log(records);
	//// prepare the data
	var source = {
		dataType: "json",
		dataFields: [{
				name: 'orgName',
				type: 'string'
			},
			{
				name: 'shishengbi',
				type: 'string'
			},
			{
				name: 'xuexiaoShiyonglv',
				type: 'string'
			},
			{
				name: 'reliChengbenbi',
				type: 'string'
			},
			{
				name: 'shijunLirun',
				type: 'string'
			},
			{
				name: 'shengjunLirun',
				type: 'string'
			},
			{
				name: 'danweiMianjiLirun',
				type: 'string'
			},
			{
				name: 'danweiZichanLirun',
				type: 'string'
			},
			{
				name: 'children',
				type: 'array'
			},
			{
				name: 'expanded',
				type: 'bool'
			}
		],
		hierarchy: {
			root: 'children'
		},
		id: 'orgName',
		localData: records
	};
	//   var dataAdapter = new $.jqx.dataAdapter(source);
	var dataAdapter = new $.jqx.dataAdapter(source, {
		beforeLoadComplete: function(records) {
			/*changeChildrenElement(records);*/
			return records;
		}
	});
	// create Tree Grid
	$("#treeGrid").jqxTreeGrid({
		height: '100%',
		width: '100%',
		theme: 'energyblue',
		localization: getLocalization(),
		source: dataAdapter,
		//altRows: true,
		columnsResize: true,
		editable: false,
		/*sortable: true,*/
		filterable: false,
		exportSettings: {
			fileName: "盈利能力汇总"
		},
		columns: [{
				text: '板块及公司',
				dataField: 'orgName',
				width: 200,
				align: 'center',
				cellsAlign: 'left'
			},
			{
				text: '师生比',
				dataField: 'shishengbi',
				width: 200,
				align: 'center',
				cellsAlign: 'center'
			},
			{
				text: '学校使用率',
				dataField: 'xuexiaoShiyonglv',
				width: 200,
				align: 'center',
				cellsAlign: 'center'
			},
			{
				text: '人力成本占总费用比',
				dataField: 'reliChengbenbi',
				width: 200,
				align: 'center',
				cellsAlign: 'center'
			},
			{
				text: '师均利润(万元/人)',
				dataField: 'shijunLirun',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsRenderer: function (row, column, value, rowData){
					var useValue=FormatValue(value);
					return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
				}
			},
			{
				text: '生均利润(万元/人)',
				dataField: 'shengjunLirun',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsRenderer: function (row, column, value, rowData){
					var useValue=FormatValue(value);
					return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
				}
			},
			{
				text: '单位面积利润(亿元/亩)',
				dataField: 'danweiMianjiLirun',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsRenderer: function (row, column, value, rowData){
					var useValue=FormatValue(value);
					return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
				}
			},
			{
				text: '单位资产利润(亿元/亿元)',
				dataField: 'danweiZichanLirun',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsRenderer: function (row, column, value, rowData){
					var useValue=FormatValue(value);
					return '<div style="width: 100%; height: 100%;">'+useValue+'</div>';
				}
			},
		]
	});
	$("#treeGrid").jqxTreeGrid('expandAll');

});

layui.use(['form'], function() {
	var form = layui.form();

	form.on('submit(demo1)', function(data) {
		layer.closeAll();
		window.location.href = "/jx-web-portal/teachersReport";
		return false;
	});

});

//导出  
$("#excelExport").click(function() {
	$("#treeGrid").jqxTreeGrid('exportData', 'xls');
});