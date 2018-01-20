//初始值学校全部（-1）
//招生类别全部（值为全部）
var schoolId=-1;
var scheduleId=-1;

function refreshGrade(schoolCode, query){

	$.ajax({
		type : "GET",
		url : "searchZsGradeInfo?schoolCode="+schoolCode,
		dataType : "json",
		success : function(result) {
			if ("02" == result.code) {
				var grades = result.data;
				$("#zsGrade").empty();// 清空下拉菜单节点
				for (var i = 0; i < grades.length; i++) {
					var $opt = $("<option value=" + grades[i].key + ">" + grades[i].value
							+ "</option>");// 添加年份节点
					$("#zsGrade").append($opt);
				}
				
				if(query){
					var param = {};
					param['schoolCode'] = $('#school').val();
					param['zsGrade'] = $('#zsGrade').val();
					param['beginDate'] = $('#beginDate').val();
					param['endDate'] = $('#endDate').val();
					console.log(param);
					
					$.ajax({
				        url: "searchStudentTypeInfo",
				        type: "POST",
				        contentType: "application/json",
				        dataType:"json",
				        data:JSON.stringify(param),
				        success: function(result) {
				            if('02'==result.code){
				            	refreshChart(myChartEnrol2, result.data);
				            } 
				        }
				    });
				}
			} else if ("01" == result.code) {

			}
		}
	});

}

$.ajax({ // 动态添加学校
	type : "GET",
	url : "searchZsRoleSchoolInfo",
	dataType : "json",
	success : function(result) {
		if ("02" == result.code) {
			var schools = result.data;
			$("#school").empty();// 清空下拉菜单节点
			for (var i = 0; i < schools.length; i++) {
				var $opt = $("<option value=" + schools[i].schoolCode + ">" + schools[i].schoolName
						+ "</option>");// 添加年份节点
				$("#school").append($opt);
			}
			
			if($("#school").val() != null){
				refreshGrade($("#school").val(),true);
			}
		} else if ("01" == result.code) {

		}
	}
});

//根据学校加载招生计划
$("#school").change(function(){
	
	refreshGrade($("#school").val(),false);
})

function getOption() {
		var option = null;	
		option = {
			title : {
				left : 'center'
			},
			//设置饼图的颜色显示，会按照顺序依次去取颜色
			 color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
			tooltip : {
				trigger : 'item',
				formatter : '{a}<br/>{b} : {c}'
			},
			legend : {
				left : 'left',
				data : [ '年数据' ]
			},
			xAxis : {
				axisLabel :{  
				    interval:0   //x轴坐标全部显示
				},
				type : 'category',
				name : 'x',
				splitLine : {
					show : false
				},
				
				data : []
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			yAxis : [{
				type : 'log',
				name : 'y(单位：人数)',
				 axisLabel: {
		                formatter: '{value} 人'
		            }
			}
		
			],
			series : [ {
				name : '年数据',
				type : 'bar',
				data : []
			} ],
			label:{ 	//显示数据
				normal:{ 
				show: true, 
				
				position: 'top'} 
				}
		};

		return option;
	};
// 定义的下钻函数
var drillDownEnrol2 = {

	getOption : function() {
		var option = null;	
		option = {
			title : {
				text : '柱状图',
				left : 'center'
			},
			//设置饼图的颜色显示，会按照顺序依次去取颜色
			color : ['#87cefa', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
			tooltip : {
				trigger : 'item',
				formatter : '{a}<br/>{b} : {c}'
			},
			legend : {
				left : 'left',
				data : [ '年数据' ]
			},
			xAxis : {
				axisLabel :{  
				    interval:0   //x轴坐标全部显示
				},
				type : 'category',
				name : 'x',
				splitLine : {
					show : false
				},
				
				data : []
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			yAxis : [{
				type : 'log',
				name : 'y(单位：人数)',
				 axisLabel: {
		                formatter: '{value} 人'
		            }
			}
		
			],
			series : [ {
				//name表示鼠标移到对应区域时显示的名称（例如：年数据）
				name : [],
				type : 'bar',
				data : []
			} ],
			label:{ 	//显示数据
				normal:{ 
				show: true, 
				
				position: 'top'} 
				}
		};

		return option;
	},
	
	//第一层初始化函数
	initChart : function(myChart, option) {
		

		var me =this;
		myChart.setOption(option);		
		// 第一层异步加载数据
		
		var a=[];		
		a[0]=["统招生","本校直升","外地生","跨校直升","万泽","九思推优","教职工子女"];
		a[1]=[218,627,5,115,75,107,7];
		a[2]="校区招生类别";
		
		
		option.series[0].type = 'pie';//设置类型为饼图
		option.title.text = a[2];//设置标题
		option.tooltip.formatter= '{b} : {c} ({d}%)';
		option.legend.orient='vertical';//图例竖直放
		option.legend.show = false;// 隐藏图例
		option.label.normal.formatter='{b} : {c} ({d}%)' ;//图显示数据
		
	
	
	
	
		var data=[];	//饼状图所有数据
		var legendData=[];
		for (var i= 0; i < a[0].length; i++) {
					data[i]={value:a[1][i],name:a[0][i]};
					legendData[i]=a[0][i];
		}		  
		
		
			option.series[0].data=data;//所有数据
			option.legend.data=legendData;//数据名称，必须和 option.series[0].data中name属性相同
		  
			option.xAxis = null;
			option.grid = null;
			option.yAxis = null;
				
			myChart.setOption(option, true);
	},
	

};

function refreshChart(myChart,data){
	var option = getOption();
	
	myChart.setOption(option);		
	// 第一层异步加载数据
	
	option.series[0].type = 'pie';//设置类型为饼图
	option.series[0].radius = [0,'60%'];
//	option.title.text = a[2];//设置标题
	//设置提示框的内容。{a}表示系列名，即option.series.name,此处不需要，已去掉
	option.tooltip.formatter= '{b} : {c} ({d}%)';
	option.legend.orient='vertical';//图例竖直放
	option.legend.show = false;// 隐藏图例
	option.label.normal.formatter = function(params){
	       return params.name + '\n' + params.value + '人'+ '\n' + params.percent+"%)";
	};//显示数据

	
	
	option.series[0].data=data;//所有数据
  
	option.xAxis = null;
	option.grid = null;
	option.yAxis = null;
		
	myChart.setOption(option, true);
};
// 加载DOM，并且返回按钮
var domEnrol2 = document.getElementById("containerEnrol2"); // dom加载容器
var myChartEnrol2 = echarts.init(domEnrol2); // 初始化容器


//自适应窗口大小
window.onresize = myChartEnrol2.resize;

