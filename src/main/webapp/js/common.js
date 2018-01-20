/**
 * Created by yufeng on 2016/10/12.
 */
//弹出加载层
function _wait() {
	layer.load(2, {
		shade: [0.5, '#393D49']
	});
}

//消息层
function _msg(msg) {
	layer.msg(msg, {
		icon: 0,
	})
}

//提示层
function _alert(msg) {
	layer.alert(msg, {
		icon: 2,
		shadeClose: true
	})
}

/* 弹出层 */
/*
 * 参数解释： title 标题 url 请求的url id 需要操作的数据id w 弹出层宽度（缺省调默认值） h 弹出层高度（缺省调默认值）
 */
function layer_show(title, url, w, h) {
	if(title == null || title == '') {
		title = false;
	};
	if(url == null || url == '') {
		url = "404.html";
	};
	if(w == null || w == '') {
		w = 800;
	};
	if(h == null || h == '') {
		h = ($(window).height() - 50);
	};
	layer.open({
		type: 2,
		area: [w + 'px', h + 'px'],
		fix: false,
		//不固定
		maxmin: true,
		shade: 0.4,
		title: title,
		content: url
	});
}

$('#reset').click(function() {
	layer.msg('是否确定重置？', {
		time: 0,
		//不自动关闭
		btn: ['确定', '取消'],
		yes: function(index) {
			layer.close(index);
			$(':text').val("");
		}
	});
})

function del_data(url) {
	layer.msg('是否确定删除？', {
		time: 0,
		//不自动关闭
		btn: ['确定', '取消'],
		yes: function(index) {
			layer.close(index);
			_wait();
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'json',
				success: function(e) {
					layer.closeAll();
					if(e.data == "删除成功") {
						//layer.alert(e.msg, {icon:1},function(index){window.location.href='';});
						layer.msg(e.data, {
								icon: 1,
								time: 1000
							},
							function(index) {
								window.parent.location.reload();
							});
					} else {
						layer.msg(e.data, {
							icon: 2,
							time: 1500
						});
						return false;
					}
				},
				error: function(e) {
					console.log(e);
					layer.closeAll();
					layer.msg("修改失败", {
						icon: 2,
						time: 1980
					});
					return false;
				}
			});
		}
	});
}

function isArray(obj) {
	return Object.prototype.toString.call(obj) == "[object Array]";
}

function left(mainStr, lngLen) {
	if(lngLen > 0) { return mainStr.substring(0, lngLen) } else { return null }
}

function right(mainStr, lngLen) {
	if(mainStr.length - lngLen >= 0 && mainStr.length >= 0 && mainStr.length - lngLen <= mainStr.length) {
		return mainStr.substring(mainStr.length - lngLen, mainStr.length)
	} else { return null }
}