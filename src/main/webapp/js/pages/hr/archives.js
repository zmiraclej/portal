$.ajax({
	type : "POST",
	url : "searchArchives",
	dataType : "json",
	
	success : function(result) {
		$('#tree').treeview({data: result.data,
			 onNodeSelected: function(event, data) {
				    // Your logic goes here
				 console.log(data);
			 }
		});
	}
});

$('#employeeTable').bootstrapTable({
    columns: [
		     {
		         field: 'employeeId',
		         sortable: false,
		         editable: false,
		         visible: false
		     }, 
            {
                field: 'employeeName',
                title: '员工姓名',
                sortable: true,
                align: 'center',
            }, {
                field: 'employeeNo',
                title: '员工号',
                sortable: true,
                align: 'center',
            },{
                field: 'sex',
                title: '性别',
                sortable: true,
                align: 'center',
            },{
                field: 'mobile',
                title: '手机号',
                sortable: true,
                align: 'center',
            }
        ]
});



		