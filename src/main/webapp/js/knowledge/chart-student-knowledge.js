$(function() {
	var base = $('html').data('base');
	var studentLogin = $('body').data('studentLogin');
	var imgPath = $('body').data('imgPath');
	require.config({
	    paths: {
	        echarts: base + 'js/lib'
	    }
	});
	require(['echarts', 'echarts/theme2/macarons', 'echarts/chart/radar', 'echarts/chart/line'], function (ec, theme) {
		var ecConfig = require('echarts/config');
        var studentId = $('body').data('studentId') + '';
        var examCode = $('body').data('examCode') + '';
        var examBatch = $('body').data('examBatch') + '';
        var data, temp, index, chart2Batchs = [];
        var batchMap = {};
        var $loader = $('#main');
        var chart1 = ec.init(document.getElementById('chart1'), theme); 
        var chart2 = ec.init(document.getElementById('chart2'), theme);
        $loader.openLoading({modal: true, text: '数据获取中，请稍候...', basePath: base});
    	$.myUtil.ajax({
    		url: base + 'chart/student/knowledge/data',
    		type: 'get',
    		data: {
    			studentId: studentId,
    			examCode: examCode,
    			examBatch: examBatch
    		},
    		dataType: 'json',
    		success: function(d) {
    			data = d;
    			temp = parseRadar(d.list);
    			parseBatchMap(d.batchs);
    			chart1.setOption(getOption());
    			index = 0;
				initChart2('k11');
				parseTable1('#errorKnowledge', data.errorList, 'errorQuestionMap', '失分题目');
				parseTable1('#knowledge', data.list, 'questionMap', '包含题目');
				$('#content').show();
    			$loader.closeLoading();
    		}
    	});
    	function parseBatchMap(batches) {
    		for (var i = 0; i < batches.length; i++) {
				batchMap[batches[i].code] = batches[i];
			}
    	}
    	function parseTable1(tableId, d, qMapName, qListName) {
    		if (studentLogin) {
    			var tr1 = '<tr><th rowspan="2">知识点</th><th rowspan="2">板块</th><th rowspan="2">' + qListName + '</th><th rowspan="2">满分</th><th rowspan="2">';
        		var tr2 = '<tr>';
        		tr1 += data.name + '</th>';
        		var uts = d[0].unitMap[data.batchCode];
        		for (var i = 0; i < uts.length; i++) {
    				tr1 += '<th colspan="3">' + uts[i].name + '</th>';
    				tr2 += '<th>均分</th><th>排名</th><th>领先%比</th>';
    			}
        		tr1 += '</tr>';
        		tr2 += '</tr>';
        		var body = '';
        		var desc1 = '', desc2 = '';
        		var bCode = data.batchCode;
        		var bCode2 = bCode.substring(0, bCode.length - 2);
        		var pCodeMap = {};
        		for (var i = 0; i < d.length; i++) {
        			if (!pCodeMap[d[i].pNo]) {
						desc1 += '<span>' + d[i].pNo + '：' + d[i].pName + '</span>';
						pCodeMap[d[i].pNo] = true;
					}
        			var k = d[i].no;
        			var kp = d[i].pNo;
        			desc2 += '<span>' + k + '：' + d[i].name + '</span>';
        			body += '<tr><td>' + k + '</td><td>' + kp + '</td><td>';
        			var qs = d[i][qMapName][bCode];
        			for (var j = 0; j < qs.length; j++) {
	    				var q = qs[j];
						body += '<a href="javascript:void(0)" data-code="' + q.questionCode + '" data-score="' + q.score + 
							'" data-point="' + q.questionPoint + '" data-batch-code="' + bCode2 + '" data-type="' + 
							q.questionType + '" data-answer="' + q.questionAnswer + '" title="点击查看图片">' + q.questionTitle + '</a> ';
					}
        			body += '</td><td>' + d[i].pointMap[bCode] + '</td><td>' + d[i].scoreMap[bCode] + '</td>';
        			uts = d[i].unitMap[bCode];
        			for (var j = 0; j < uts.length; j++) {
    					body += '<td>' + uts[j].score + '</td><td>' + uts[j].position + '/' + uts[j].count + '</td><td>' + uts[j].rank + '</td>';
    				}
        			body += '</tr>';
        		}
        		$(tableId + ' thead').html(tr1 + tr2);
        		$(tableId + ' tbody').html(body);
        		$(tableId + ' .l-desc').html('<div>' + desc1 + '</div><div>' + desc2 + '</div>');
			} else {
				var tr1 = '<tr><th rowspan="2">编号</th><th rowspan="2">知识点名称</th><th rowspan="2">所属板块</th>' +
					'<th rowspan="2">' + qListName + '</th><th rowspan="2">满分</th><th rowspan="2">';
	    		var tr2 = '<tr>';
	    		tr1 += data.name + '</th>';
	    		var uts = d[0].unitMap[data.batchCode];
	    		for (var i = 0; i < uts.length; i++) {
					tr1 += '<th colspan="3">' + uts[i].name + '</th>';
					tr2 += '<th>均分</th><th>排名</th><th>领先%比</th>';
				}
	    		tr1 += '</tr>';
	    		tr2 += '</tr>';
	    		var body = '';
	    		var bCode = data.batchCode;
	    		var bCode2 = bCode.substring(0, bCode.length - 2);
	    		for (var i = 0; i < d.length; i++) {
	    			body += '<tr><td>' + d[i].no + '</td><td>' + d[i].name + '</td><td>' + d[i].pName + '</td><td>';
	    			var qs = d[i][qMapName][bCode];
	    			for (var j = 0; j < qs.length; j++) {
	    				var q = qs[j];
						body += '<a href="javascript:void(0)" data-code="' + q.questionCode + '" data-score="' + q.score + 
						'" data-point="' + q.questionPoint + '" data-batch-code="' + bCode2 + '" data-type="' + 
						q.questionType + '" data-answer="' + q.questionAnswer + '" title="点击查看图片">' + q.questionTitle + '</a> ';
					}
	    			body += '</td><td>' + d[i].pointMap[bCode] + '</td><td>' + d[i].scoreMap[bCode] + '</td>';
	    			uts = d[i].unitMap[bCode];
	    			for (var j = 0; j < uts.length; j++) {
						body += '<td>' + uts[j].score + '</td><td>' + uts[j].position + '/' + uts[j].count + '</td><td>' + uts[j].rank + '</td>';
					}
	    			body += '</tr>';
	    		}
	    		$(tableId + ' thead').html(tr1 + tr2);
	    		$(tableId + ' tbody').html(body);
			}
    	}
    	function parseRadar(d) {
    		var legend = ['满分', data.name], series = [], polar = [], 
				selected = {};
			var units = d[0].unitMap[data.batchCode];
			for (var i = 0; i < units.length; i++) {
				legend.push(units[i].name);
			}
			var dataMap = {};
			for (var i = 0; i < legend.length; i++) {
				selected[legend[i]] = i < 3;
				dataMap[legend[i]] = [];
			}
			for (var i = 0; i < d.length; i++) {
				var val = fixed(d[i].pointMap[data.batchCode]);
				polar.push({
					text: d[i].no + '(' + val + ')',
					max: val
				});
				dataMap['满分'].push(d[i].pointMap[data.batchCode]);
				dataMap[data.name].push(d[i].scoreMap[data.batchCode] );
				var ust = d[i].unitMap[data.batchCode];
				for (var j = 0; j < ust.length; j++) {
					dataMap[ust[j].name].push(ust[j].score);
				}
			}
			for ( var k in dataMap) {
				series.push({
					name: k,
					value: dataMap[k]
				});
			}
			return {
				legend: legend,
				series: [{
					name: '',
					data: series
				}],
				polar: [polar],
				selected: selected
			};
    	}
        function getOption() {
        	return {
	            title : {
	                text: data.name + '-' + data.examName + '-知识点',
	                x: 'center'
	            },
	            tooltip : {
	                trigger: 'axis',
	                formatter: function (params,ticket,callback) {
	    	            var res = params[0][3];
	    	            for (var i = 0, l = params.length; i < l; i++) {
	    	                res += '<br/>' + params[i][1] + ' : ' + params[i][2];
	    	            }
	    	            res += '<br/>';
	    	            res += '单击查看历次数据';
	                	return res;
	            	}
	            },
	            toolbox: {
	                show : true,
	                feature : {
	                    mark : {show: false},
	                    dataView : {show: false, readOnly: false},
	                    magicType : {show: false, type: []},
	                    restore : {show: false},
	                    saveAsImage : {show: true}
	                },
	                orient: 'vertical',
	                y: 'top'
	            },
	            legend: {
	                data: temp.legend,
	                x: 'center',
	                y: 'bottom',
	                selected: temp.selected || {}
	            },
	            polar: function(data) {
	            	var rs = [];
	            	for (var i = 0; i < data.length; i++) {
						rs.push({
							indicator: data[i],
			            	radius: '65%',
			            	center: ['50%', '50%'],
			            	splitNumber: 10,
			            	splitArea : {
			                    show : false,
			                    areaStyle : {
			                        color: ['rgba(250,0,250,0.3)','rgba(0,200,200,0.3)']
			                    }
			                },
			                splitLine : {
			                    show : true,
			                    lineStyle : {
			                        width : 1,
			                        color : 'rgba(225,225,225,0.8)'
			                    }
			                }
						});
					}
	            	return rs;
	            }(temp.polar),
	            series: function(data) {
	            	var rs = [];
	            	for (var i = 0; i < data.length; i++) {
						rs.push({
							type: 'radar',
							polarIndex: i,
		                    data: data[i].data,
		                    symbolSize: 2
						})
					}
	            	return rs;
	            }(temp.series)
	        };
        }
        function getOption2(chartTitle) {
    		var legend = [data.name];
    		var legendMap = {};
    		var unitMapTemp = data.list[index].unitMap;
    		for ( var k in unitMapTemp) {
    			for (var i = 0; i < unitMapTemp[k].length; i++) {
					if (!legendMap[unitMapTemp[k][i].code]) {
						legend.push(unitMapTemp[k][i].name);
					}
					legendMap[unitMapTemp[k][i].code] = true;
				}
			}
        	chart2Batchs = [];
        	for (var i = 0; i < data.batchs.length; i++) {
				if (data.list[index].pointMap[data.batchs[i].code]) {
					chart2Batchs.push(data.batchs[i]);
				}
			}
        	return {
        	    title: {
        	        text: chartTitle + '历次数据',
        	        x: 'center'
        	    },
        	    tooltip: {
        	        trigger: 'axis'
        	    },
        	    legend: {
        	    	x: 'center',
	                y: 'bottom',
        	        data: legend,
    		        selected: (function(d) {
    		        	var rs = {};
    		        	for (var i = 0; i < d.length; i++) {
							rs[d[i]] = i < 2;
						}
    		        	return rs;
    		        })(legend)
        	    },
        	    toolbox: {
        	        show: true,
        	        feature: {
        	            mark: {show: true},
        	            dataView: {show: false, readOnly: false},
        	            magicType: {show: false, type: ['line']},
        	            restore: {show: false},
        	            saveAsImage: {show: true}
        	        },
        	        orient: 'vertical',
	                y: 'top'
        	    },
        	    calculable: false,
        	    xAxis: [
        	        {
        	            type: 'category',
        	            boundaryGap: true,
        	            data: (function() {
        	            	var rs = [];
        	            	for (var i = 0; i < chart2Batchs.length; i++) {
								rs.push('e' + (i+1))
							}
        	            	return rs;
        	            })() 
        	        }
        	    ],
        	    yAxis: [
        	        {
        	            type: 'value'
        	        }
        	    ],
        	    series: (function(d) {
        	    	var t = {}; 
		        	for (var k = 0; k < legend.length; k++) {
		        		t[legend[k]] = [];
					}
		        	for ( var k in d.scoreMap) {
						t[data.name].push(d.scoreMap[k]);
						var units = d.unitMap[k];
						for (var i = 0; i < units.length; i++) {
							t[units[i].name].push(units[i].score);
						}
						var len = t[data.name].length;
						for ( var n in t) {
							if (t[n].length < len) {
								t[n].push('-');
							}
						}
					}
        	    	var rs = [];
        	    	for ( var k in t) {
						rs.push({
	        	            name: k,
	        	            type: 'line',
	        	            smooth: true,
	        	            showAllSymbol: true,
	        	            data: t[k]
	        	        })
					}
        	    	return rs;
        	    })(data.list[index])
        	}
        }
        chart1.on(ecConfig.EVENT.CLICK, function(param) {
        	if (index != param.special) {
        		index = param.special;
        		chart2.clear();
        		initChart2(param.name.substr(0, param.name.indexOf('(')));
        	}
        });
        chart2.on(ecConfig.EVENT.CLICK, function(param) {
        	var url = '?studentId=' + data.stuId + '&examCode=' + chart2Batchs[param.dataIndex].code.substring(0, 14) + 
        		examCode.substring(examCode.length-2) + '&code=' + data.list[index].code + '&type=3';
        	if (studentLogin) {
        		location.href = base + 'ledi/question/img' + url;
			} else {
				window.open(base + 'question' + url);
			}
        });
        function initChart2(chartTitle) {
        	if (studentLogin) {
				var option = getOption2(chartTitle);
				chart2.setOption(option);
				var d = data.list[index];
				var um = [];
				var uct = {};
				for ( var k in d.unitMap) {
					for (var i = 0; i < d.unitMap[k].length; i++) {
						if (!uct[d.unitMap[k][i].code]) {
							um.push(d.unitMap[k][i]);
						}
						uct[d.unitMap[k][i].code] = d.unitMap[k][i];
					}
				}
				var tr1 = '<tr><th rowspan="2">编号</th><th rowspan="2">包含题目</th><th rowspan="2">满分</th><th rowspan="2">';
				var tr2 = '<tr>';
				tr1 += data.name + '</th>';
				var uts = data.list[0].unitMap[data.batchCode];
				for (var k = 0; k < um.length; k++) {
					tr1 += '<th colspan="3">' + um[k].name + '</th>';
					tr2 += '<th>均分</th><th>排名</th><th>领先%比</th>';
				}
				tr1 += '</tr>';
				tr2 += '</tr>';
				var body = '';
				var desc = '';
				var no = 1;
				for (var i = 0; i < chart2Batchs.length; i++) {
					var bCode = chart2Batchs[i].code;
					var e = 'e' + no++;
					desc += '<span>' + e + '：' + chart2Batchs[i].name + '</span>';
					body += '<tr><td>' + e + '</td><td>';
					var qs = d.questionMap[bCode];
	    			for (var j = 0; j < qs.length; j++) {
	    				var q = qs[j];
						body += '<a href="javascript:void(0)" data-code="' + q.questionCode + '" data-score="' + q.score + 
						'" data-point="' + q.questionPoint + '" data-batch-code="' + bCode.substring(0, 14) + '" data-type="' + 
						q.questionType + '" data-answer="' + q.questionAnswer + '" title="点击查看图片">' + q.questionTitle + '</a> ';
					}
					body += '</td><td>' + d.pointMap[bCode] + '</td><td>' + d.scoreMap[bCode] + '</td>';
					var uts = d.unitMap[bCode];
					var um2 = {};
					for (var j = 0; j < uts.length; j++) {
						um2[uts[j].code] = uts[j];
					}
					for (var k = 0; k < um.length; k++) {
						var ut = um2[um[k].code];
						if (ut) {
							body += '<td>' + ut.score + '</td><td>' + ut.position + '/' + ut.count + '</td><td>' + ut.rank + '</td>';
						} else {
							body += '<td>-</td><td>-/-</td><td>-</td>';
						}
					}
					body += '</tr>';
				}
				$('#history thead').html(tr1 + tr2);
				$('#history tbody').html(body);
				$('#history .l-desc').html(desc);
			} else {
				var option = getOption2(chartTitle);
				chart2.setOption(option);
				var d = data.list[index];
				var um = [];
				var uct = {};
				for ( var k in d.unitMap) {
					for (var i = 0; i < d.unitMap[k].length; i++) {
						if (!uct[d.unitMap[k][i].code]) {
							um.push(d.unitMap[k][i]);
						}
						uct[d.unitMap[k][i].code] = d.unitMap[k][i];
					}
				}
				var tr1 = '<tr><th rowspan="2">编号</th><th rowspan="2">考试名称</th><th rowspan="2">包含题目</th><th rowspan="2">满分</th><th rowspan="2">';
				var tr2 = '<tr>';
				tr1 += data.name + '</th>';
				var uts = data.list[0].unitMap[data.batchCode];
				for (var k = 0; k < um.length; k++) {
					tr1 += '<th colspan="3">' + um[k].name + '</th>';
					tr2 += '<th>均分</th><th>排名</th><th>领先%比</th>';
				}
				tr1 += '</tr>';
				tr2 += '</tr>';
				var body = '';
				var no = 1;
				for (var i = 0; i < chart2Batchs.length; i++) {
					var bCode = chart2Batchs[i].code;
					body += '<tr><td>e' + (no++) + '</td><td>' + chart2Batchs[i].name + '</td><td>';
					var qs = d.questionMap[bCode];
	    			for (var j = 0; j < qs.length; j++) {
	    				var q = qs[j];
						body += '<a href="javascript:void(0)" data-code="' + q.questionCode + '" data-score="' + q.score + 
						'" data-point="' + q.questionPoint + '" data-batch-code="' + bCode.substring(0, 14) + '" data-type="' + 
						q.questionType + '" data-answer="' + q.questionAnswer + '" title="点击查看图片">' + q.questionTitle + '</a> ';
					}
					body += '</td><td>' + d.pointMap[bCode] + '</td><td>' + d.scoreMap[bCode] + '</td>';
					var uts = d.unitMap[bCode];
					var um2 = {};
					for (var j = 0; j < uts.length; j++) {
						um2[uts[j].code] = uts[j];
					}
					for (var k = 0; k < um.length; k++) {
						var ut = um2[um[k].code];
						if (ut) {
							body += '<td>' + ut.score + '</td><td>' + ut.position + '/' + ut.count + '</td><td>' + ut.rank + '</td>';
						} else {
							body += '<td>-</td><td>-/-</td><td>-</td>';
						}
					}
					body += '</tr>';
				}
				$('#history thead').html(tr1 + tr2);
				$('#history tbody').html(body);
			}
        }
        function fixed(num) {
			if(typeof num === 'number') {
				return num.toFixed(1) * 1.0;
			} else {
				return num;
			}
		}
        $('body').on('click', '#img .fix-close', function() {
        	$('#img').hide();
        	$('body').css('overflow', 'auto');
        });
        $('body').on('click', 'td a', function() {
        	var $this = $(this);
        	var score = $this.data('score');
        	var point = $this.data('point');
        	var code = $this.data('code');
        	var bCode = $this.data('batchCode');
        	var type = $this.data('type');
        	var answer = $this.data('answer');
        	var title = $this.text();
        	$('#img .fix-title span').text('图片查看-' + title + '题（满分：' + point + '分，' + '得分：' + score + '分）');
        	var src = imgPath + '?examCode=' + bCode + examCode.substring(examCode.length-2) + '&title=' + code;
        	
        	var $left = $('#img .fix-left');
        	$left.openLoading({modal: false, basePath: base});
    		var img = new Image();
    		img.onload = function(e) { // 根据图片高度设定图片位置
    			$left.closeLoading();
    			$left.find('img').remove();
    			$left.append($(img));
    		}
    		img.src = src;

    		var $right = $('#img .fix-right');
    		$right.openLoading({modal: false, basePath: base});
    		var img2 = new Image();
    		img2.onload = function(e) { // 根据图片高度设定图片位置
    			$right.closeLoading();
    			$right.find('img').remove();
    			$right.append($(img2));
    		}
    		img2.src = src + '&examNo=' + batchMap[bCode + '00'].val;
        	
//        	$('#img .fix-left img').attr('src', src);
//        	$('#img .fix-right img').attr('src', src + '&examNo=' + batchMap[bCode + '00'].val);
        	if (type != '04' && answer) {
        		$('#img .fix-answer').show().text('正确答案：' + answer);
			} else {
				$('#img .fix-answer').hide();
			}
        	$('#img').show();
        	$('body').css('overflow', 'hidden');
        });
	})
});