$.ajax({
	type: "POST",
	url: "searchRoleMenu",
	dataType: "json",
	success: function(result) {
		$('#menusTree').treeview({
			data: result.data,
			showCheckbox: true,
			onNodeSelected: function(event, data) {
				// Your logic goes here
				console.log(data);
			}
		});
	}
});

$('#rolesTable').bootstrapTable({
	pagination: "true",
	url: "searchRoles",
	search: true,
	sidePagination: "server",
	height: 500,
	striped: true,
	clickToSelect: true,
	maintainSelected: true,
	singleSelect: true,
	toolbar: "#rolesToolbar",
	toolbarAlign: "right",
	columns: [{
			field: '',
			checkbox: true,
		},
		{
			field: 'id',
			title: '角色ID',
			sortable: false,
			editable: false,
			visible: true
		},
		{
			field: 'name',
			title: '角色名称',
			sortable: false,
			align: 'center',
			visible: true
		}
	],
	onClickRow: function(row, $element, field) {
		$.ajax({
			type: "POST",
			url: "searchRoleMenu",
			dataType: "json",
			data: { "roleId": row.id },
			success: function(result) {
				$('#menusTree').treeview({
					data: result.data,
					showCheckbox: true,
					onNodeChecked: nodeChecked,
					onNodeUnchecked: nodeUnchecked,
					onNodeSelected: function(event, data) {
						// Your logic goes here
						console.log(data);
					}
				});
			}
		});
		// NC公司权限
		$('#ncOrgTable').bootstrapTable("refresh", { url: 'searchRoleNcOrg', query: { "roleId": row.id } });
		// 学校权限
		$('#roleSchoolTable').bootstrapTable("refresh", { url: 'searchRoleSchool', query: { "roleId": row.id } });
		// 报表指标权限
		$('#roleReportTable').bootstrapTable("refresh", { url: 'searchRoleRptIndex', query: { "roleId": row.id } });
	},
});

$('#saveRoleChange').on('click', function() {
	var roles = $('#rolesTable').bootstrapTable("getAllSelections");
	if(roles.length == 0) {
		_msg("未选择角色");
		return false;
	}
	var roleId = roles[0].id;
	var roleName = roles[0].name;
	//菜单的数据
	var treeData = $('#menusTree').treeview("getChecked");
	//NC选中数据
	var orgRows = $('#ncOrgTable').bootstrapTable("getAllSelections");
	//SC选中数据
	var schoolRows = $('#roleSchoolTable').bootstrapTable("getAllSelections");
	//指标选中数据
	var reportRows = $('#roleReportTable').bootstrapTable("getAllSelections");

	layer.msg('是否要更新角色【' + roleName + '】的权限？', {
		time: 15000, //15s后自动关闭
		area: ['300px', '100px'],
		btn: ['确  认', '取  消'],
		yes: function() {
			//菜单权限参数
			var jsonParam = {};
			jsonParam['roleId'] = roles[0].id;
			var menus = [];
			for(var i = 0; i < treeData.length; i++) {
				menus.push(treeData[i].value);
			}
			jsonParam['menus'] = menus;
			$.ajax({
				url: "updateRoleMenus",
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(jsonParam),
				success: function(result) {
					if('02' == result.code) {
						$.ajax({
							type: "POST",
							url: "searchRoleMenu",
							dataType: "json",
							data: { "roleId": roleId },
							success: function(result) {
								$('#menusTree').treeview({
									data: result.data,
									showCheckbox: true,
									onNodeChecked: nodeChecked,
									onNodeUnchecked: nodeUnchecked,
									onNodeSelected: function(event, data) {
										console.log(data);
									}
								});
								layer.msg("更新成功");
							}
						});
					} else {
						layer.msg("菜单权限更新失败");
					}
				}
			});
			//NC数据更新
			var jsonOrgParam = {};
			var pOrg = [];
			for(var i = 0; i < orgRows.length; i++) {
				pOrg.push(orgRows[i].orgCode);
			}
			jsonOrgParam['roleId'] = roleId;
			jsonOrgParam['orgCodes'] = pOrg;
			$.ajax({
				url: "updateRoleNcOrg",
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(jsonOrgParam),
				success: function(result) {
					if('02' == result.code) {
						$('#ncOrgTable').bootstrapTable("refresh", { url: 'searchRoleNcOrg', query: { "roleId": roleId } });
						layer.msg("更新成功");
					} else {
						layer.msg("NC报表权限更新失败");
					}
				}
			});
			//学校数据更新
			var jsonSchParam = {};
			var pSch = [];
			for(var i = 0; i < schoolRows.length; i++) {
				pSch.push(schoolRows[i].schoolCode);
			}
			jsonSchParam['roleId'] = roleId;
			jsonSchParam['schoolCodes'] = pSch;
			$.ajax({
				url: "updateRoleSchoolRelationship",
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(jsonSchParam),
				success: function(result) {
					if('02' == result.code) {
						$('#roleSchoolTable').bootstrapTable("refresh", { url: 'searchRoleSchool', query: { "roleId": roleId } });
						layer.msg("更新成功");
					} else {
						layer.msg("招生报表权限更新失败");
					}
				}
			});

			//报表指标权限
			var jsonReportParam = {};
			var pRept = [];
			for(var i = 0; i < reportRows.length; i++) {
				var pReptObjcet = {
					id: reportRows[i].id,
					roleId: roleId,
					blIndexAuth: reportRows[i].blIndexAuth,
					own: reportRows[i].own,
				};
				pRept.push(pReptObjcet);
			}
			jsonReportParam['roleId'] = roleId;
			jsonReportParam['indexes'] = pRept;
			$.ajax({
				url: "saveRoleRptIndex",
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(jsonReportParam),
				success: function(result) {
					if('02' == result.code) {
						$('#roleReportTable').bootstrapTable("refresh", { url: 'searchRoleRptIndex', query: { "roleId": roleId } });
						layer.msg("更新成功");
					} else {
						layer.msg("报表指标权限更新 失败");
					}
				}
			});
		},
		btn2: function() {
			layer.closeAll();
		}
	});
});

$('#addRole').on('click', function() {
	var index = layer.open({
		type: 1,
		title: '新增角色',
		area: ['400px', '300px'],
		shadeClose: true,
		maxmin: false,
		content: $('#roleAddContent')
	});
});

$('#deleteRole').on('click', function() {
	var roles = $('#rolesTable').bootstrapTable("getAllSelections");
	if(roles.length == 0) {
		_msg("未选择角色");
		return false;
	}

	var roleId = roles[0].id;
	var roleName = roles[0].name;

	var jsonParam = {};

	jsonParam['roleId'] = roles[0].id;

	layer.msg('是否要删除角色【' + roleId + ':' + roleName + '】？', {
		time: 15000, //15s后自动关闭
		area: ['400px', '100px'],
		btn: ['确  认', '取  消'],
		yes: function() {
			layer.closeAll();
			$.ajax({
				url: "deleteRole",
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(jsonParam),
				success: function(result) {
					if('02' == result.code) {
						$('#rolesTable').bootstrapTable('refresh');
						layer.msg("角色【" + roleId + ':' + roleName + "】删除成功！");
					} else {
						layer.msg('角色删除失败', {
							time: 1000, //2s后自动关闭
							area: ['220px', '50px']
						});
					}
				}
			});

		},
		btn2: function() {
			layer.closeAll();
		}
	});
});

layui.use(['form'], function() {
	var form = layui.form();

	//自定义验证规则
	form.verify({
		roleId: function(value) {
			if(value.length < 1) {
				return '角色ID必须输入！';
			}
		},
		roleName: function(value) {
			if(value.length < 1) {
				return '角色名称必须输入！';
			}
		},
		content: function(value) {
			layedit.sync(editIndex);
		}
	});

	form.on('submit(saveRole)', function(data) {
		var jsonParam = JSON.stringify(data.field);
		$.ajax({
			type: "POST",
			url: "addRole",
			contentType: "application/json",
			dataType: "json",
			data: jsonParam,
			success: function(result) {
				if('02' == result.code) {
					$('#rolesTable').bootstrapTable('refresh');
					layer.msg("保存成功！");
				} else {
					layer.msg(result.msg);
				}

			}
		});
		return false;
	});

});

//*********************************************
// NC报表权限
//*********************************************
$('#ncOrgTable').bootstrapTable({
	pagination: false,
	url: "searchRoleNcOrg",
	search: false,
	sidePagination: "server",
	height: 300,
	striped: true,
	clickToSelect: true,
	singleSelect: false,
	columns: [{
			field: 'own',
			checkbox: true,
		},
		{
			field: 'orgName',
			title: '公司名称',
			sortable: false,
			align: 'center',
			visible: true
		},
		{
			field: 'segementCode',
			title: '板块编码',
			sortable: false,
			align: 'center',
			visible: false
		},
		{
			field: 'segementName',
			title: '板块名称',
			sortable: false,
			align: 'center',
			visible: true
		}
	],
});
//*********************************************
// 招生报表权限
//*********************************************
$('#roleSchoolTable').bootstrapTable({
	pagination: false,
	url: "searchRoleSchool",
	search: false,
	sidePagination: "server",
	height: 300,
	striped: true,
	clickToSelect: true,
	singleSelect: false,
	columns: [{
			field: 'own',
			checkbox: true,
		},
		{
			field: 'schoolName',
			title: '学校名称',
			sortable: false,
			align: 'center',
			visible: true
		},
	],
});
//*********************************************
//报表指标权限
//*********************************************
$('#roleReportTable').bootstrapTable({
	pagination: false,
	url: "searchRoleRptIndex",
	search: false,
	sidePagination: "server",
	height: 300,
	striped: true,
	clickToSelect: true,
	singleSelect: false,
	columns: [{
			field: 'own',
			checkbox: true,
		},
		{
			field: 'fullName',
			title: '指标',
			sortable: false,
			align: 'left',
			visible: true
		},
		{
			field: 'blIndexAuth',
			title: '指标分析权限',
			sortable: false,
			align: 'center',
			visible: true,
			formatter: setSelect,
			events: {
				'change .YesOrNo': function(e, value, row, index) {
					row.own = true;
					var valueSelected = $(this).children('option:selected').val();
					$('#roleReportTable').bootstrapTable('updateCell', {
						index: index,
						field: 'blIndexAuth',
						value: valueSelected
					})
				}
			}
		}
	],
});

//添加下拉框
function setSelect(value, row, index) {
	var strHtml = "";
	if(value == "0") {
		strHtml = "<select class='YesOrNo' style='width:100px'><option value='1' >是</option><option value='0' selected='selected'>否</option></select>";
	} else {
		strHtml = "<select class='YesOrNo' style='width:100px'><option value='1' selected='selected'>是</option><option value='0'>否</option></select>";
	}
	return strHtml;
};