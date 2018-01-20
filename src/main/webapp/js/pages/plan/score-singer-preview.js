
//单个成绩预览
$('#scorePreviewTable').bootstrapTable({
	method: 'get',  
	 url: "searchSingerPreviewScore",
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
               field: 'studentName',
               title: '学生姓名',
               sortable: false,
               editable: false,
               align: 'center'
           }, {
               field: 'courseName',
               title: '科目',
               sortable: false,
               align: 'center'
           },
        {
               field: 'score',
               title: '成绩',
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
               field: 'classTopScore',
               title: '最高分',
               sortable: false,
               align: 'center'
           }, 
           {
        	   field: 'fullScore',
        	   title:'满分',
        	   sortable:false,
        	   align:'center'
           },
           {
               field: 'orderNumber',
               title: '排名',
               sortable: false,
               align: 'center'
           }
       ]
});

function getPreviewQueryParam(params){
	var insId = $('#insId').val();
	var classId = $('#classId').val();
	var courseCode = $('#courseCode').val();
	var queryParams = {};
	queryParams["insId"] = insId;
	queryParams["classId"] = classId;
	queryParams["courseCode"] = courseCode;
	console.log(queryParams);
    return queryParams;
}