<%@tag pageEncoding="UTF-8"%>
<%@ attribute name="page" type="cn.com.wtrj.jx.web.portal.controller.response.base.PageData" required="true"%>
<%@ attribute name="paginationSize" type="java.lang.Integer" required="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
int current = page.getPageNo();
int begin = Math.max(1, current - paginationSize/2);
int end = Math.min(begin + (paginationSize - 1), (int)page.getTotalPages());

request.setAttribute("current", current);
request.setAttribute("begin", begin);
request.setAttribute("end", end);
%>

<div class="row">
	<div class="col-sm-5" style="padding-top:30px;">
		<div class="dataTables_info" aria-live="polite">
			<%-- 显示<%=page.getFirst() %>到<%=page.getMax() %>条， --%>共<%=page.getTotalCount() %>条记录
		</div>
	</div>
	<div class="col-sm-7">
		<div class="dataTables_paginate paging_simple_numbers pull-right">
		<ul class="pagination" >
		<% if (page.isHasPre()){%>
			<li class="paginate_button previous">
	       		<a href="?page=1">
	       			<!-- <i class="fa fa-angle-double-left"></i> -->
	       			首页
	       		</a>
	       	</li>
	        <li class="paginate_button previous">
	        	<a href="?page=${current-1}">
	        		<i class="fa fa-angle-left"></i>
	        	</a>
	        </li>
		<%}else{%>
			<li class="paginate_button previous disabled">
	        	<a href="#">
	        		<!-- <i class="fa fa-angle-double-left"></i> -->
	        		首页
	        	</a>
	        </li>
	         <li class="paginate_button previous disabled">
	         	<a href="#">
	         		<i class="fa fa-angle-left"></i>
	         	</a>
	         </li>
		<%} %>
			
		<c:forEach var="i" begin="${begin}" end="${end}">
	           <c:choose>
	               <c:when test="${i == current}">
	                   <li class="paginate_button active"><a href="?page=${i}">${i}</a></li>
	               </c:when>
	               <c:otherwise>
	                   <li class="paginate_button"><a href="?page=${i}">${i}</a></li>
	               </c:otherwise>
	           </c:choose>
	       </c:forEach>
			
		<% if (page.isHasNext()){%>
	          	<li class="paginate_button next">
	              	<a href="?page=${current+1}">
	              		<i class="fa fa-angle-right"></i>
	              	</a>
	            </li>
	            <li class="paginate_button next">
					<a href="?page=${page.totalPages}">
						<!-- <i class="fa fa-angle-double-right"></i> -->尾页
					</a>
				</li>
		<%}else{%>
				<li class="paginate_button next disabled">
					<a href="#">
						<i class="fa fa-angle-right"></i>
					</a>
				</li>
				<li class="paginate_button next disabled">
					<a href="#">
						<!-- <i class="fa fa-angle-double-right"></i> -->尾页
					</a>
				</li>
		<%} %>
	        
		</ul>
		</div>
	</div>
</div>
