<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
		<link rel="stylesheet" href="${ctx}/css/pages/pageCommon.css" type="text/css" />
	</head>

	<body>
		<!-- 权限1登录 -->
		<aside class="main-sidebar">
			<!-- sidebar: style can be found in sidebar.less -->
			<section class="sidebar">
				<!-- Sidebar user panel -->
				<!-- /.search form -->
				<!-- sidebar menu: : style can be found in sidebar.less -->
				<ul class="sidebar-menu">
					<c:if test="${menuDis.index}">
						<li class="sign">
							<a href="index" id="index"> <i class="fa fa-th"></i> <span>首页</span> <span class="pull-right-container"> <small
						class="label pull-right bg-green"></small>	</span>
							</a>
						</li>
					</c:if>

					<!-- ============= 报表 start ============= -->
					<c:if test="${menuDis.report}">
						<li class="treeview sign">
							<a href="#" id=''> <i style="background: url(img/report1.png) no-repeat; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span>大数据分析</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
							</a>
							<ul class="treeview-menu">
							<c:if test="${menuDis.reportHome}">
								<li class="sign">
									<a href="reportHome" id="reportHome"> <i style="background: url(img/fenxi.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i> 大数据分析总视图
									</a>
								</li>
								</c:if>
								<!-- ============= 财务数据分析 start ============= -->
								<c:if test="${menuDis.rptNc}">
									<li class="sign">
										<a href="#"> <i style="background: url(img/caiwu.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span>财务数据分析</span>
											<span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
										</a>
										<ul class="treeview-menu">
											<c:if test="${menuDis.rptNc01}">
												<li class="sign">
													<a href="rptNc01" id="rptNc01"> <i class="fa fa-circle-o"></i> 总收支数据分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptNc02}">
												<li class="sign">
													<a href="rptNc02" id="rptNc02"> <i class="fa fa-circle-o"></i> 期间费用分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptNc03}">
												<li class="sign">
													<a href="rptNc03" id="rptNc03"> <i class="fa fa-circle-o"></i> 资金分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptNc04}">
												<li class="sign">
													<a href="rptNc04" id="rptNc04"> <i class="fa fa-circle-o"></i> 盈利分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptNc05}">
												<li class="sign">
													<a href="rptNc05" id="rptNc05"> <i class="fa fa-circle-o"></i> 薪酬构成分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptNc06}">
												<li class="sign">
													<a href="rptNc06" id="rptNc06"> <i class="fa fa-circle-o"></i> 资产负债分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptNc07}">
												<li class="sign">
													<a href="rptNc07" id="rptNc07"> <i class="fa fa-circle-o"></i> 税务状况分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptNc08}">
												<li class="sign">
													<a href="rptNc08" id="rptNc08"> <i class="fa fa-circle-o"></i> 预期目标分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.analysis}">
												<li class="sign">
													<a href="analysis" id="analysis"> <i class="fa fa-circle-o"></i> 经营业绩汇总
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.profitAnalysis}">
												<li class="sign">
													<a href="profitAnalysis" id="profitAnalysis"> <i class="fa fa-circle-o"></i> 盈利能力汇总
													</a>
												</li>
											</c:if>
										</ul>
									</li>
								</c:if>

								<!-- ============= 学生学习 start ============= -->
								<c:if test="${menuDis.rptZs}">
									<li class="sign">
										<a href="#"> <i style="background: url(img/grade.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span>学生学习</span>
											<span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
										</a>
										<ul class="treeview-menu">
											<%-- <c:if test="${menuDis.rptZs01}">
												<li class="sign">
													<a href="rptZs01" id="rptZs01"> <i class="fa fa-circle-o"></i> 历年报名数据分析
													</a>
												</li>
											</c:if> --%>
											<c:if test="${menuDis.rptZs02}">
												<li class="sign">
													<a href="rptZs02" id="rptZs02"> <i class="fa fa-circle-o"></i> 录取数据分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptZs03}">
												<li class="sign">
													<a href="rptZs03" id="rptZs03"> <i class="fa fa-circle-o"></i> 招生类别分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptZs04}">
												<li class="sign">
													<a href="rptZs04" id="rptZs04"> <i class="fa fa-circle-o"></i> 招生情况分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptZs05}">
												<li class="sign">
													<a href="rptZs05" id="rptZs05"> <i class="fa fa-circle-o"></i> 生源地分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptScore01}">
												<li class="sign">
													<a href="rptScore01" id="rptScore01"> <i class="fa fa-circle-o"></i> 均分统计
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptScore02}">
												<li class="sign">
													<a href="rptScore02" id="rptScore02"> <i class="fa fa-circle-o"></i> 分段统计
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptScore03}">
												<li class="sign">
													<a href="rptScore03" id="rptScore03"> <i class="fa fa-circle-o"></i> 学生成绩分析
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.studentAnalysis}">
												<li class="sign">
													<a href="studentAnalysis" id="studentAnalysis"> <i class="fa fa-circle-o"></i> 学生学习汇总
													</a>
												</li>
											</c:if>
										</ul>
									</li>
								</c:if>

								<!-- ============= 教学教研 start ============= -->
								<c:if test="${menuDis.rptEdu}">
									<li class="sign">
										<a href="#"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span>教学教研</span>
											<span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
										</a>
										<ul class="treeview-menu">
											<c:if test="${menuDis.rptEdu01}">
												<li class="sign">
													<a href="rptEdu01" id="rptEdu01"> <i class="fa fa-circle-o"></i> 师生数量统计
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptEdu02}">
												<li class="sign">
													<a href="rptEdu02" id="rptEdu02"> <i class="fa fa-circle-o"></i> 教师数量统计
													</a>
												</li>
											</c:if>
											<c:if test="${menuDis.rptEdu03}">
												<li class="sign">
													<a href="rptEdu03" id="rptEdu03"> <i class="fa fa-circle-o"></i> 学生数据统计
													</a>
												</li>
											</c:if>
											<%-- <c:if test="${menuDis.rptEdu04}">
												<li class="sign">
													<a href="rptEdu04" id="rptEdu04"> <i class="fa fa-circle-o"></i> 学生考勤情况
													</a>
												</li>
											</c:if> --%>
											<c:if test="${menuDis.eduAnalysis}">
												<li class="sign">
													<a href="eduAnalysis" id="eduAnalysis"> <i class="fa fa-circle-o"></i> 教学教研数据汇总
													</a>
												</li>
											</c:if> 
										</ul>
									</li>
								</c:if>
							</ul>
						</li>
					</c:if>
					<!-- ============= 报表 end ============= -->

					<!-- =============绩效考核 ============= -->
					<c:if test="${menuDis.kpi}">
						<li class="treeview sign">
							<a href="#"> <i style="background: url(img/kpi.png) no-repeat; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span>绩效考核</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i>	</span>
							</a>
							<ul class="treeview-menu">
								<c:if test="${menuDis.kpiSetting}">
									<li class="sign">
										<a href="#"> <i style="background: url(img/kpiSetting.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>考核管理</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
										</a>
										<ul class="treeview-menu">
											<c:if test="${menuDis.nianjizuSetting}">
												<li class="sign">
													<a href="toNianjizu" id="nianjizu"><i class="fa fa-circle-o"></i>年级组设定</a>
												</li>
											</c:if>
											<c:if test="${menuDis.jiaoyanzuSetting}">
												<li class="sign">
													<a href="toJiaoyanzu" id="jiaoyanzu"><i class="fa fa-circle-o"></i>教研组设定</a>
												</li>
											</c:if>
											<c:if test="${menuDis.templateSetting}">
												<li class="sign">
													<a href="toKpiTemplate" id="kpiTemplate"><i class="fa fa-circle-o"></i>考核模板管理</a>
												</li>
											</c:if>
										</ul>
									</li>
								</c:if>

								<c:if test="${menuDis.kpiStart}">
									<li class="sign">
										<a href="#"> <i style="background: url(img/faqi.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span>考核发起</span>
											<span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
										</a>
										<ul class="treeview-menu">
											<c:if test="${menuDis.kpiIns}">
												<li class="sign">
													<a href="toKpiIns" id="kpiIns"><i class="fa fa-circle-o"></i> 考核活动</a>
												</li>
											</c:if>
											<c:if test="${menuDis.kpiEmployee}">
												<li class="sign">
													<a href="toKpiEmployee" id="kpiEmployee"><i class="fa fa-circle-o"></i> 参评人员设定</a>
												</li>
											</c:if>
											<c:if test="${menuDis.yupingfen}">
												<li class="sign">
													<a href="toKpiPlan" id="kpiPlan"><i class="fa fa-circle-o"></i> 预评分设定</a>
												</li>
											</c:if>
										</ul>
									</li>
								</c:if>
								<c:if test="${menuDis.teacherSelfPingjia}">
									<li class="sign">
										<a href="toTeacherSelfPingjia" id="teacherSelfPingjia"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>员工自评</span>
										</a>
									</li>
								</c:if>
								<c:if test="${menuDis.jiaoyanzuPingjia}">
									<li class="sign">
										<a href="toPingjiaListJy" id="jiaoyanzuPingjia"> <i style="background: url(img/jiaoyan.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>教研组考核</span>
										</a>
									</li>
								</c:if>
								<c:if test="${menuDis.nianjizuPingjia}">
									<li class="sign">
										<a href="toPingjiaListNj" id="nianjizuPingjia"> <i style="background: url(img/grade.png) no-repeat; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span>年级组考核</span>
										</a>
									</li>
								</c:if>
								<c:if test="${menuDis.jiaowuchuPingjia}">
									<li class="sign">
										<a href="toPingjiaListJw" id="jiaowuchuPingjia"> <i style="background: url(img/jiaowu.png) no-repeat; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span> 教务处考核</span>
										</a>
									</li>
								</c:if>
								<c:if test="${menuDis.kpiInfo}">
									<li class="sign">
										<a href="toKpiInfo" id="kpiInfo"> <i style="background: url(img/huizong.png) no-repeat; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span> 绩效考核总评</span>
										</a>
									</li>
								</c:if>
							</ul>
						</li>
					</c:if>
					<!-- =============绩效考核 end ============= -->

					<!-- =============教务管理 start ============= -->
					<c:if test="${menuDis.eduPlan}">
						<li class="treeview sign">
							<a href="#"> <i style="background: url(img/kpi.png) no-repeat; background-size: auto 100%; height: 100%; padding-left: 30px"></i> <span>教务管理</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
							</a>
							<ul class="treeview-menu">
								<c:if test="${menuDis.planTemplate}">
									<li class="sign">
										<a href="toPlanTemplates" id="planTemplate"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>模板下载</span>
										</a>
									</li>
								</c:if> 
								<c:if test="${menuDis.planList}">
									<li class="sign">
										<a href="toTeacherPlanTemplates" id="planList"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>教师填报</span>
										</a>
									</li>
								</c:if>
								<c:if test="${menuDis.planApproval}">
									<li class="sign">
										<a href="toVerifyPlans" id="planApproval"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>教务审核</span>
										</a>
									</li>
								</c:if>
								<c:if test="${menuDis.scoreNotice}">
									<li class="sign">
										<a href="toScoreManagePage" id="scoreManage"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>成绩管理</span>
										</a>
									</li>
								</c:if>
								<%-- <c:if test="${menuDis.scoreRecovery}">
									<li class="sign">
										<a href="toScoreRecovery" id="scoreRecovery"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>成绩恢复</span>
										</a>
									</li>
								</c:if> --%>
								<c:if test="${menuDis.answerCount }">
									<li class="sign">
										<a href="toAnswerCount" id="answerCount"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>走班汇总</span>
										</a>
									</li>
								</c:if>

								<%--<c:if test="${menuDis.parenteNotice }">
									<li class="sign">
										<a href="toParenteNotice" id="notice"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>家长通知</span>
										</a>
									</li>
								</c:if>--%>
								<%-- <c:if test="${menuDis.scoreUpload}">
									<li class="sign">
										<a href="toScoreUploadList" id="scoreUpload"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>成绩上传</span>
										</a>
									</li>
								</c:if>
								
								<c:if test="${menuDis.singleSend}">
									<li class="sign">
										<a href="toScoreOnlyOne" id="scoreOnlyOne"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>单科成绩发布</span>
										</a>
									</li>
								</c:if>
								
								<c:if test="${menuDis.scoreNotice}">
									<li class="sign">
										<a href="toScoreNotice" id="scoreNotice"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>汇总成绩发布</span>
										</a>
									</li>
								</c:if>
							   <c:if test="${menuDis.createExam}">
									<li class="sign">
										<a href="toCreateExamIns" id="createExam"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
											<span>创建考次</span>
										</a>
									</li>
							    </c:if> --%>
								<li class="sign">
									<a href="toTeacherNotice" id="teacherNotice"> <i style="background: url(img/teacher.png) no-repeat; background-position: left center; background-size: auto 100%; height: 100%; padding-left: 30px"></i>
										<span>通知分组</span>
									</a>
								</li>
							</ul>
						</li>
					</c:if>
					<!-- =============教务管理 end ============= -->
					<c:if test="${menuDis.moral}">
					<li class="treeview sign">
						<a href="#"> <i style="background: url(img/user.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 30px"></i> <span>综合素质评价</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
						</a>
						<ul class="treeview-menu">
							<li class="sign">
								<a href="moral" id="moral"><i class="fa fa-circle-o"></i>活动审核
								</a>
							</li>
							<c:if test="${menuDis.countStandard}">
								<li class="sign"><a href="countStandard" id="countStandard"><i class="fa fa-circle-o"></i>评分标准</a></li>
							</c:if>
							<c:if test="${menuDis.count}">
								<li class="sign"><a href="countpage" id="countpage"><i class="fa fa-circle-o"></i>总分统计设置</a></li>
							</c:if>
							
						</ul>
					</li>
					</c:if>
					<!-- =============人力资源 start ============= -->
					<c:if test="${menuDis.hr}">
						<li class="treeview sign">
							<a href="#"> <i style="background: url(img/dangan.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 30px"></i> <span>人力资源</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
							</a>
							<c:if test="${menuDis.archives}">
								<ul class="treeview-menu">
									<li class="sign">
										<a href="archives" id="archives"><i class="fa fa-circle-o"></i>员工档案</a>
									</li>
								</ul>
							</c:if>
						</li>
					</c:if>
					<!-- =============人力资源 end ============= -->
					<!-- ============= 基础设定 start ============= -->
					<c:if test="${menuDis.setting}">
						<li class="treeview sign">
							<a href="#"> <i style="background: url(img/setting2.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 30px"></i> <span>基础设定</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
							</a>
							<ul class="treeview-menu">
								<c:if test="${menuDis.users}">
									<li class="sign">
										<a href="users" id="users"><i class="fa fa-circle-o"></i>用户管理</a>
									</li>
								</c:if>
								<c:if test="${menuDis.roles}">
									<li class="sign">
										<a href="roles" id="roles"><i class="fa fa-circle-o"></i>角色管理</a>
									</li>
								</c:if>
							    <c:if test="${menuDis.teachers}">
									<li class="sign">
										<a href="teachers" id="teachers"><i class="fa fa-circle-o"></i>教师管理</a>
									</li>
								</c:if>
								<c:if test="${menuDis.students }">
								<li class="sign">
									<a href="student-list" id="students"><i class="fa fa-circle-o"></i>学生档案</a>
								</li>
								</c:if>
							</ul>
						</li>
					</c:if>
					<!-- ============= 基础设定 end ============= -->

					<li class="treeview sign">
						<a href="#"> <i style="background: url(img/user.png) no-repeat; background-size: auto 90%; height: 100%; padding-left: 30px"></i> <span>个人信息</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i>	</span>
						</a>
						<ul class="treeview-menu">
							<li class="sign">
								<a href="pwd" id="pwd"> <span style="margin-left: 30px">密码修改</span>
								</a>
							</li>
							<li class="sign">
								<a href="toPersonalTeacherRole" id="teacherRole"> <span style="margin-left: 30px">角色配置</span>
								</a>
							</li>
							<!-- <li><a href="#"><i class="fa fa-circle-o"></i> 工资条查看</a></li> -->
						</ul>
					</li>
				</ul>
			</section>
			<!-- /.sidebar -->
		</aside>
	</body>
	<script src="${ctx}/js/plugins/jQuery/jquery-3.2.1.min.js"></script>
	<script>
		var idcss = "${id}";
		//alert(idcss)
		//获取被点击的目标元素
		var obj = $("#" + idcss);
		//找到被点击的元素的所有包含class="sign"的祖先元素
		obj.parents(".sign").addClass("active");
	</script>

</html>