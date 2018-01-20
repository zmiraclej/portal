package cn.com.wtrj.jx.web.portal.controller.count;

/**
 * 静态变量
 * 
 * @author hoxing
 *
 */
public class Constants {

	/** 操作成功 **/
	public static final String SUCCESS = "success";
	/** 操作失败 **/
	public static final String FAILURE = "failure";

	/** TRUE **/
	public static final String TRUE = "1";
	/** FALSE **/
	public static final String FALSE = "0";

	/**
	 * 学生评分实例
	 */
	public class MoralIns {
		/** 未修改直接确认 **/
		public static final String DIRECTLY_CONFIRM = "01";
		/** 修改确认 **/
		public static final String MODIFY_CONFIRM = "02";
		/** 作废此条记录 **/
		public static final String CANCLE = "03";
		/** 教师新增记录 **/
		public static final String NEWLY_ADD = "04";
		/** 学生记录 **/
		public static final String RECORD_STUDENT = "01";
		/** 老师记录 **/
		public static final String RECORD_TEACHER = "02";
	}

	/**
	 * 评分标准
	 */
	public class MoralStandard {
		/** 加分 **/
		public static final String SCORE_ADD = "01";
		/** 减分 **/
		public static final String SCORE_SUB = "02";
		/** 评分间隔-不限 **/
		public static final String CYCLE = "01";
		/** 评分间隔-每月一次 **/
		public static final String CYCLE_ONE_MONTH = "02";
		/** 评分间隔-期末一次 **/
		public static final String CYCLE_ONE_FINALTERM = "03";
		/** 评分间隔-期末期中各一次 **/
		public static final String CYCLE_TWICETERM = "04";

		/** 班主任 **/
		public static final String TEACHER_BZR = "01";
		/** 任课老师 **/
		public static final String TEACHER_RKLS = "02";
		/** 生辅老师 **/
		public static final String TEACHER_SFLS = "03";
		/** 德育老师 **/
		public static final String TEACHER_DEYLS = "04";
	}

}