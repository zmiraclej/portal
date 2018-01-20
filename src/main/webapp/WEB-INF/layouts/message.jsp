<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${not empty errorMsg}">
	<div id="alertMessage" class="Metronic-alerts alert alert-warning fade in col-sm-12" style="opacity:0.6;">
		<i class="fa-lg fa fa-warning"></i>${errorMsg}
		<span id="alertMessageSpan">3</span>秒后关闭。
	</div>
</c:if>

<c:if test="${not empty successMsg}">
	<div id="alertMessage" class="Metronic-alerts alert alert-success fade in" style="opacity:0.6;">
		<i class="fa-lg fa fa-success"></i>${successMsg}
		<span id="alertMessageSpan">3</span>秒后关闭。
	</div>
</c:if>
<c:if test="${not empty successMsg ||  not empty errorMsg}">
	<script>
	var i = 3;
	var timer1 = setInterval(function () {
	    i--;
	    $('#alertMessage #alertMessageSpan').html(i);
	    if (i == 0) {
	        clearInterval(timer1);
	        $('#alertMessage').hide();
	    };
	}, 1000);
	</script>
</c:if>

