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

/*function changeChildrenElement(children) {
	console.log(children);
	for(var i = 0; i < children.length; i++) {
		if(children[i].children && children[i].children.length > 0) {
			children[i].orgName = "<span style='color:green;font-weight: bold;'>" + children[i].orgName + "</span>";
			children[i].teacher = "<span style='color:green;font-weight: bold;'>" + children[i].teacher + "</span>";
			children[i].topic = "<span style='color:green;font-weight: bold;'>" + children[i].topic + "</span>";
			children[i].paper = "<span style='color:green;font-weight: bold;'>" + children[i].paper + "</span>";
			children[i].repo = "<span style='color:green;font-weight: bold;'>" + children[i].repo + "</span>";

			changeChildrenElement(children[i].children);
		}
	}
}*/
$(document).ready(function() {
	var records = [{
		"orgCode": "00",
		"orgName": "集团",
		"teacher": "453",
		"topic": "1605",
		"paper": "2301",
		"repo": "568",
		children: [{
				"orgCode": "01",
				"orgName": "学历教育",
				"teacher": "365",
				"topic": "1205",
				"paper": "2301",
				"repo": "501",
				children: [{
						"orgName": "锦江高中",
						"teacher": "65",
						"topic": "1002",
						"paper": "2301",
						"repo": "101"
					},
					{
						"orgCode": "02",
						"orgName": "锦江初中",
						"teacher": "143",
						"topic": "805",
						"paper": "230",
						"repo": "205"
					},
					{
						"orgCode": "03",
						"orgName": "成华校区",
						"teacher": "65",
						"topic": "305",
						"paper": "2301",
						"repo": "201"
					},
					{
						"orgCode": "04",
						"orgName": "郫县分校",
						"teacher": "53",
						"topic": "401",
						"paper": "201",
						"repo": "69"
					},
					{
						"orgCode": "05",
						"orgName": "北城分校",
						"teacher": "63",
						"topic": "312",
						"paper": "2301",
						"repo": "84"
					},
					{
						"orgCode": "06",
						"orgName": "达州分校",
						"teacher": "83",
						"topic": "5",
						"paper": "230",
						"repo": "56"
					}
				]
			},
			{
				"orgCode": "02",
				"orgName": "学前教育",
				"teacher": "24",
				"topic": "1205",
				"paper": "2301",
				"repo": "36",
				children: [{
						"orgName": "锦江幼儿园",
						"teacher": "11",
						"topic": "1205",
						"paper": "2301",
						"repo": "22"
					},
					{
						"orgName": "郫县幼儿园",
						"teacher": "13",
						"topic": "1205",
						"paper": "2301",
						"repo": "14"
					}
				]
			},
			{
				"orgCode": "03",
				"orgName": "校外培训",
				"teacher": "35",
				"topic": "1205",
				"paper": "2301",
				"repo": "18",
				children: [{
						"orgName": "嘉祥九思",
						"teacher": "15",
						"topic": "1205",
						"paper": "2301",
						"repo": "7"
					},
					{
						"orgName": "万泽",
						"teacher": "20",
						"topic": "1205",
						"paper": "2301",
						"repo": "11"
					}
				]
			}
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
			fileName: "教学教研数据汇总"
		},
		columns: [{
				text: '板块及公司',
				dataField: 'orgName',
				width: 200,
				align: 'center',
				cellsAlign: 'left'
			},
			{
				text: '教师情况(人)',
				dataField: 'teacher',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsFormat:'n',
			},
			{
				text: '课题(个)',
				dataField: 'topic',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsFormat:'n',
			},
			{
				text: '论文(篇)',
				dataField: 'paper',
				width: 200,
				align: 'center',
				cellsAlign: 'center',
				cellsFormat:'n',
			},
			{
				text: '资源库(个)',
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