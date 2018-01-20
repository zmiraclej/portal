package cn.com.wtrj.jx.web.portal.common;

public class Constant {
	/**
	 * 页面request请求处理结果
	 * 
	 * @author wusm
	 *
	 */
	public static class RetCode {

		/**
		 * 页面request请求处理结果：01：发生异常
		 */
		public static String ERROR = "01";

		/**
		 * 页面request请求处理结果：02：成功
		 */
		public static String SUCCESS = "02";
	}

	/**
	 * 页面左侧菜单模块id
	 * 
	 * @author wuxudong
	 *
	 */
	public static class MenuId {
		/** 通信录管理 */
		public static final String ADDRESS_BOOK = "addressBook";

		/** 员工档案 */
		public static final String HR_ARCHIVES = "archives";

		/** 组织架构 */
		public static final String ORGANIZATION = "organization";

		/** 收支状况表 */
		public static final String INCOME_EXPENDITURE = "incomeExpenditure";

		/** 财务费用情况表 */
		public static final String FINANCIAL = "financial";

		/** 资产负债状况表 */
		public static final String BALANCE = "balanceSheet";

		/** 税务状况表 */
		public static final String TALLAGE = "tax";

		/** 资金报表 */
		public static final String FUND = "capital";

		/** 盈利情况表 */
		public static final String PROFIT = "profit";

		/** 薪酬构成表 */
		public static final String PAY = "pay";

		/** 预期目标 */
		public static final String YUQI_MUBIAO = "yuqiMubiao";

		/** 集团历年报名情况 */
		public static final String ENROLL_HISTORY = "enrollHistory";

		/** 录取情况明细表 */
		public static final String ENROLL_DETAIL = "enrollDetail";

		/** 招生类别统计 */
		public static final String STUDENT_TYPE = "studentType";

		/** 生源地统计 */
		public static final String SOURCE_PLACE = "sourcePlace";

		/** 新生毕业院校 */
		public static final String GRADUATED_FROM = "graduatedFrom";

		/** 成绩通知 */
		public static final String SCORE_NOTICE = "scoreNotice";

		/** 人员统计 */
		public static final String EDU_RENYUAN = "renyuanTongji";

		/** 均分统计 */
		public static final String SCORE_JUNFEN = "junfenTongji";

		/** 分段统计 */
		public static final String SCORE_FENDUAN = "fenduanTongji";

		/** 用户 */
		public static final String SETTING_USERS = "users";

		/** 教师 */
		public static final String SETTING_TEACHERS = "teachers";

		/** 教务计划模板 */
		public static final String PLAN_TEMPLATE = "planTemplate";

		/** 教师计划列表 */
		public static final String PLAN_LIST = "planList";

		/** 教务计划审批 */
		public static final String PLAN_APPROVAL = "planApproval";

		/** 成绩上传 */
		public static final String SCORE_UPLOAD = "scoreUpload";

		/** 考次创建 */
		public static final String EXAM_CREATE = "createExam";

		/** 综合素质测评 */
		public static final String MORAL = "moral";
		
		/** 评分标准 */
		//public static final String STANDARD = "standard";
		public static final String COUNTSTANDARD = "countStandard";
		
		/** 总分统计配置 **/
		public static final String COUNT = "countpage";
		
		/** 学生档案 **/
		public static final String STUDENTS = "students";
		
		/** 成绩恢复 **/
		public static final String SCORE_RECOVERY = "scoreRecovery";
		
		/** 走班汇总 **/
		public static final String ANSWER_COUNT = "answerCount";
		
		/** 家长通知 **/
		public static final String PARENT_NOTICE = "parent_notice";
		
	}

	public static class PlanType {
		/** 学年 **/
		public static String school_year = "school-year";
		/** 学期 **/
		public static String school_term = "school-term";
		/** 计划类型 **/
		public static String edu_play_type = "edu-play-type";
		/** 学科 **/
		public static String subject = "subject";
	}
	public static class Constants {

		/** 操作成功 **/
		public static final String SUCCESS = "success";
		/** 操作失败 **/
		public static final String FAILURE = "failure";

		/** TRUE **/
		public static final String TRUE = "1";
		/** FALSE **/
		public static final String FALSE = "0";
	}
	

	/**
	 * 通知公告类型
	 * @author wusm
	 *
	 */
	public static class NoticeType {
		/**
		 * 通知
		 */
		public static String NOTICE = "01";
		
		/**
		 * 公告
		 */
		public static String NOTICE_PUB = "02";
		
		public static String TEAHCER_NOTICE = "11";
	}
	
	
	public static class NoticeSelectKey {
		/** 科目选择KEY */
		public static final String COURSE_SELECT = "notice_couse_select";
		
		public static final String ROLE_SELECT = "notice_role_select";
		
	}
	

}
