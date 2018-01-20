/*function changeChildrenElement(children){
	for (var i = 0; i < children.length; i++) {
		if (children[i].children && children[i].children.length > 0) {
			children[i].orgName="<span style='color:green;font-weight: bold;'>" + children[i].orgName + "</span>";
			children[i].teacher="<span style='color:green;font-weight: bold;'>" + children[i].teacher + "</span>";
			children[i].topic="<span style='color:green;font-weight: bold;'>" + children[i].topic + "</span>";
			children[i].paper="<span style='color:green;font-weight: bold;'>" + children[i].paper + "</span>";
			children[i].repo="<span style='color:green;font-weight: bold;'>" + children[i].repo + "</span>";
		
			changeChildrenElement(children[i].children);
		}
	}
} */
$(document).ready(function() {
	var records = [{
		"orgCode": "00",
		"orgName": "集团",
		"teacher": "1853",
		"topic": "1605",
		"paper": "2301",
		"repo": "568",
		children: [{
				"orgCode": "01",
				"orgName": "学历教育",
				"teacher": "1365",
				"topic": "1205",
				"paper": "301",
				"repo": "201",
				children: [{
						"orgName": "锦江高中",
						"teacher": "65",
						"topic": "1002",
						"paper": "223",
						"repo": "214"
					},
					{
						"orgCode": "02",
						"orgName": "锦江初中",
						"teacher": "23",
						"topic": "805",
						"paper": "120",
						"repo": "201"
					},
					{
						"orgCode": "03",
						"orgName": "成华校区",
						"teacher": "55",
						"topic": "305",
						"paper": "91",
						"repo": "125"
					},
					{
						"orgCode": "04",
						"orgName": "郫县分校",
						"teacher": "653",
						"topic": "401",
						"paper": "87",
						"repo": "89"
					},
					{
						"orgCode": "05",
						"orgName": "北城分校",
						"teacher": "653",
						"topic": "312",
						"paper": "101",
						"repo": "69"
					},
					{
						"orgCode": "06",
						"orgName": "达州分校",
						"teacher": "653",
						"topic": "159",
						"paper": "96",
						"repo": "87"
					}
				]
			},
			{
				"orgCode": "02",
				"orgName": "校外培训",
				"teacher": "123",
				"topic": "1205",
				"paper": "2301",
				"repo": "57",
				children: [{
						"orgName": "锦江幼儿园",
						"teacher": "65",
						"topic": "1205",
						"paper": "2301",
						"repo": "32"
					},
					{
						"orgName": "郫县幼儿园",
						"teacher": "65",
						"topic": "1205",
						"paper": "2301",
						"repo": "25"
					}
				]
			},
			{
				"orgCode": "03",
				"orgName": "学前教育",
				"teacher": "186",
				"topic": "186",
				"paper": "31",
				"repo": "52",
				children: [{
						"orgName": "嘉祥九思",
						"teacher": "96",
						"topic": "96",
						"paper": "21",
						"repo": "31"
					},
					{
						"orgName": "万泽",
						"teacher": "90",
						"topic": "90",
						"paper": "10",
						"repo": "21"
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
				name: 'teacher',
				type: 'string'
			},
			{
				name: 'topic',
				type: 'string'
			},
			{
				name: 'paper',
				type: 'string'
			},
			{
				name: 'repo',
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
			fileName: "学生学习汇总"
		},
		columns: [{
				text: '板块及公司',
				dataField: 'orgName',
				width: 200,
				align: 'center',
				cellsAlign: 'left'
			},
			{
				text: '学生人数',
				dataField: 'teacher',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsFormat:'n',
			},
			{
				text: '升学状况',
				dataField: 'topic',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsFormat:'n',
			},
			{
				text: '获奖情况',
				dataField: 'paper',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsFormat:'n',
			},
			{
				text: '创新实践活动',
				dataField: 'repo',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsFormat:'n',
			}
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