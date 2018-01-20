
$('#scorePreviewTable').bootstrapTable({
	method: 'get',  
	 url: "searchPreviewScore",
	//search:true,
	height:400,
	striped:true,
	clickToSelect:true,
	singleSelect:true,
	queryParams:getPreviewQueryParam(),
	idField: "idCard",
	columns: [
	        {
	            field: 'id',
	            sortable: false,
	            editable: false,
	            visible: false
	        },
           {
               field: 'name',
               title: '学生姓名',
               sortable: false,
               editable: false,
               align: 'center'
           }, 
        {
               field: 'sumNumber',
               title: '成绩合计',
               sortable: false,
               align: 'center'
           }, 
           {
               field: 'averageNumber',
               title: '平均分',
               sortable: false,
               align: 'center'
           }, 
           {
               field: 'orderNumber',
               title: '排名',
               sortable: false,
               align: 'center'
           }, 
           {
               field: 'classTopScore',
               title: '班级最高分',
               sortable: false,
               align: 'center'
           },
           {
        	   field: 'courseScore',
        	   title:'各科成绩',
        	   sortable:false,
        	   align:'center'
           }
       ]
});

function getPreviewQueryParam(params){
	var insId = $('#insId').val();
	var classId = $('#classId').val();
	
	var queryParams = {};
	queryParams["insId"] = insId;
	queryParams["classId"] = classId;
	console.log(queryParams);
    return queryParams;
}