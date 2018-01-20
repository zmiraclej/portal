package cn.com.wtrj.jx.web.portal.controller.plan;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.common.Constant.RetCode;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.ExamInsRet;
import cn.com.wtrj.jx.web.portal.controller.response.GradeInfo;
import cn.com.wtrj.jx.web.portal.controller.response.StageInfo;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreExamIns;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolGradeService;
import cn.com.wtrj.jx.web.portal.service.TeacherService;
import cn.com.wtrj.jx.web.portal.service.common.ITeacherPermissionService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dictItem.IDictItemService;
import cn.com.wtrj.jx.web.portal.service.dto.Role;
import cn.com.wtrj.jx.web.portal.service.dto.School;
import cn.com.wtrj.jx.web.portal.service.dto.SchoolClass;
import cn.com.wtrj.jx.web.portal.service.rptScoreExamIns.IRptScoreExamInsService;

@Controller
@RequestMapping("/")
public class ScoreExamInsController extends BaseController {
	private Logger logger = Logger.getLogger(ScoreExamInsController.class);
	@Autowired
	private IRptScoreExamInsService emamService;
	@Autowired
	private IWtrjSchoolGradeService schoolGradeService;

	@Autowired
	private IDictService dictService;
	@Autowired
	private IDictItemService dictItemService;
	
	@Autowired
	private TeacherService teacherService;
	
	@Autowired
	private ITeacherPermissionService tpService;
	
	private static final String DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";

	// 跳转至考次创建页面(加载学年，学期，考试类别，考试序号)
	@RequestMapping("toCreateExamIns")
	public String toCreateExamIns(Map<String, Object> model, HttpServletRequest request) {
		logger.info("跳转至考次管理页面");
		model.put("id", MenuId.EXAM_CREATE);
		this.doCommonSetting(model);
		return "plan/score-examins-list";
	}
	
	// 跳转至考次创建页面(加载学年，学期，考试类别，考试序号)
	@RequestMapping("toAddExamIns")
	public String toAddExamIns(Map<String, Object> model, HttpServletRequest request, Model params) {
		logger.info("跳转至考次创建页面");
		model.put("id", MenuId.EXAM_CREATE);
		
		List<DictItem> years = dictService.findDictItemsByCode(Constant.PlanType.school_year);
		List<DictItem> terms = dictService.findDictItemsByCode(Constant.PlanType.school_term);
		List<DictItem> types = dictService.findDictItemsByCode("exam-type");
		List<DictItem> courses = dictService.findDictItemsByCode(Constant.PlanType.subject);
		
		params.addAttribute("years", years);
		params.addAttribute("terms", terms);
		params.addAttribute("types", types);
		params.addAttribute("courses", courses);
		
		String schoolCode = null;
		//查询教师学校信息
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		List<School> usList = teacherService.findUserSchools(user.getTeacherId());
		
		if(usList != null && usList.size() > 0) {
			schoolCode = usList.get(0).getCode();
			params.addAttribute("schools", usList);
		}
		
		if(StringUtils.isNotBlank(schoolCode)) {
			params.addAttribute("schoolCode", schoolCode);
			
			//查询教师学部信息
			List<String> stages = findStagesBySchoolCode(schoolCode);
			
			if(stages != null && stages.size() >0) {
				
				params.addAttribute("stages", stages);
				
				String stage = stages.get(0);
				
				List<String> grades = findGradesByStage(schoolCode, stage);
				
				if(grades != null && grades.size() >0) {
					
					params.addAttribute("grades", grades);
					
					String grade = grades.get(0);
					
					List<SchoolClass> classes = findClassesByGrade(schoolCode, stage, grade);
					
					params.addAttribute("classes", classes);
				}
			}

		}
		
		return "plan/score-examins-add";
	}

	@RequestMapping("/searchExamInsList")
	@ResponseBody
	public Map<String,Object> searchExamInsList(@RequestBody PageSearchParam param) {
		logger.info("考次信息列表分页查询 开始");
		Map<String,Object> rets = new HashMap<String,Object>();
		try {
			
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			
			Integer start = param.getOffset();
			Integer end = param.getOffset() + param.getLimit();
			Integer cnt = emamService.countExamIns(user.getId(), param.getSearch());
			rets.put("total", cnt);
			
			List<WtrjRptScoreExamIns> dtos = emamService.searchExamInsByPage(start, end, user.getId(), param.getSearch());
			
			logger.debug("数据查询结果："+dtos.size());
			
			DozerBeanMapper mapper = new DozerBeanMapper();
			List<ExamInsRet> rs = new ArrayList<ExamInsRet>();
			SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN);
			for (WtrjRptScoreExamIns dto : dtos) {
				ExamInsRet r = new ExamInsRet();
				mapper.map(dto, r);
				r.setCreateTime(sdf.format(dto.getCreateTime()));
				rs.add(r);
			}
			
			rets.put("rows", rs);
		} catch (Exception e) {
			logger.error("考次信息列表分页查询", e);
		}
		
		logger.info("考次信息列表分页查询 结束");
		return rets;
	}
	
	/**
	 * 加载学校列表
	 * 
	 * @return
	 */
	@RequestMapping("/searchStagesBySchoolCodes")
	@ResponseBody
	public Object searchStagesBySchool(String schoolCodes) {
		logger.info("【按学校查询学部列表】[school_codes=" + schoolCodes + "]");
		String codestr = schoolCodes;
		List<Integer> codes = new ArrayList<>();
		String[] codeArr = schoolCodes.split(",");
		for (String str : codeArr) {
			codes.add(Integer.parseInt(str));
		}
		List<Integer> stageNoList = schoolGradeService.searchStageBySchoolCode(codes);
		List<StageInfo> stageList = new ArrayList<>();
		for (Integer stageNo : stageNoList) {
			StageInfo info = new StageInfo(stageNo);
			switch (stageNo) {
			case 1:
				info.setStageName("小学");
				break;
			case 2:
				info.setStageName("初中");
				break;
			case 3:
				info.setStageName("高中");
				break;
			}
			stageList.add(info);
		}
		logger.info("【查询结束】" + stageList);
		return stageList;
	}

	/**
	 * 按学部查询年级号
	 * 
	 * @param stage
	 *            学部
	 * @return
	 */
	@RequestMapping("/searchGrades")
	@ResponseBody
	public Object searchGrades(int stage, String schoolCodes) {
		logger.info("【按学校和学部查询年级列表】[school_Codes=" + schoolCodes + ", stage=" + stage + "]");
		String codestr = schoolCodes;
		List<Integer> codes = new ArrayList<>();
		String[] codeArr = schoolCodes.split(",");
		for (String str : codeArr) {
			codes.add(Integer.parseInt(str));
		}
		List<Integer> gradeNoList = schoolGradeService.searchGradeByStage(stage, codes);
		logger.info(gradeNoList);
		List<GradeInfo> gradelist = new ArrayList<>();
		for (Integer gradeNo : gradeNoList) {
			GradeInfo info = new GradeInfo(gradeNo);
			switch (gradeNo) {
			case 1:
				info.setGradeName("一年级");
				break;
			case 2:
				info.setGradeName("二年级");
				break;
			case 3:
				info.setGradeName("三年级");
				break;
			case 4:
				info.setGradeName("四年级");
				break;
			case 5:
				info.setGradeName("五年级");
				break;
			case 6:
				info.setGradeName("六年级");
				break;
			}
			gradelist.add(info);
		}
		logger.info("【查询成功】" + gradelist);
		return gradelist;
	}

	@RequestMapping(value = "createExamIns", method = RequestMethod.POST)
	@ResponseBody
	/*public BaseRet addExamIns(String schoolCode, Integer stage, Integer grade,
			String schoolYear, String term, String type, String seq, String examYear, String examMonth,
			String examName) {*/
	public BaseRet addExamIns(@RequestBody WtrjRptScoreExamIns exam) {
		logger.info("创建考次【开始】");
		BaseRet ret = new BaseRet<>();
		ret.setCode(RetCode.SUCCESS);
		try {
			List<Integer> codes = new ArrayList<>();
			/*String[] codeArr = schoolCodes.split(",");
			for (String str : codeArr) {
				codes.add(Integer.parseInt(str));
			}*/
			//WtrjRptScoreExamIns exam = new WtrjRptScoreExamIns();
			// schoolCode
//			String schoolCode = schoolGradeService.findSchoolCodeBySchoolCodesAndStage(codes, stage);
//			exam.setSchoolCode(schoolCode);
			exam.setCreateTime(new Date());
			exam.setUpdateTime(new Date());
			exam.setCreateUserId(String.valueOf(getCurrentUser().getId()));
			exam.setCreateUserName(getUserName());
			/*if (!"-1".equals(exam.getExamSeqCode())) {
				String seqName = dictItemService.findByCode(exam.getExamSeqCode()).getName();
				exam.setExamSeqName(seqName);
			} */
			//Integer examTime = Integer.parseInt(examYear + examMonth);
//			exam.setExamTime(examTime);
//			exam.setGrade(String.valueOf(grade));
//			exam.setName(examName);
//			exam.setStage(String.valueOf(stage));
//			exam.setTypeCode(type);
			String typeName = dictItemService.findByCode(exam.getTypeCode()).getName();
			exam.setTypeName(typeName);
//			exam.setSchoolTermCode(term);
			String termName = dictItemService.findByCode(exam.getSchoolTermCode()).getName();
			exam.setSchoolTermName(termName);
//			exam.setSchoolYearCode(schoolYear);
			String schoolYearName = dictItemService.findByCode(exam.getSchoolYearCode()).getName();
			exam.setSchoolYearName(schoolYearName);
//			System.out.println(exam);
			
			/*List<WtrjRptScoreExamIns> records = emamService.searchInsByItems(exam.getSchoolYearCode(), exam.getSchoolTermCode(),
					exam.getSchoolCode(),
					exam.getGrade(), exam.getTypeCode(), exam.getClassId(), exam.getCourseCode(), exam.getExamSeqCode(), String.valueOf(getCurrentUser().getId()), exam.getExamType());*/
			
			/*if (records != null && records.size() > 0) {
				ret.setCode(RetCode.ERROR);
				ret.setMsg("已存在的考次，请勿重复创建！");
				logger.error("考次已存在，创建失败");
				return ret;
			}*/
			emamService.add(exam);
			logger.info("向库中新增考次完成");
		} catch (Exception e) {
			logger.error("考次创建异常中止！", e);
			ret.setCode(RetCode.ERROR);
			ret.setMsg("考次创建异常中止");
		}
		logger.info("考次创建【结束】");
		return ret;
	}

	@RequestMapping(value = "deleteExamIns")
	@ResponseBody
	public BaseRet deleteExamIns(int id) {
		logger.info("删除考次【开始】[id=" + id + "]");
		BaseRet ret = new BaseRet<>();
		ret.setCode(RetCode.SUCCESS);
		try {
			
			logger.info(" ----- 删除考次信息开始[remove examIns start] -----");
			
			WtrjRptScoreExamIns examIns = emamService.findById(id);
			emamService.deleteById(id);
			
			logger.info(" ----- 用户 [ " + getCurrentUser().getTeacherId() +","
			+getCurrentUser().getTeacherName() +"] 删除考次信息 -----");
			
			logger.info(" ----- 删除考次信息为  " + examIns.toString() +"  -----");
			
			logger.info(" ----- 删除考次信息结束[remove examIns end] -----");
			
		} catch (Exception e) {
			logger.error("删除考次异常中止！", e);
			ret.setCode(RetCode.ERROR);
			ret.setMsg("删除考次异常中止");
		}
		logger.info("删除考次【结束】");
		return ret;
	}

	@RequestMapping(value = "getExamInfos", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet getExamInfos() {
		/*logger.info("查询考次【开始】");
		BaseRet ret = new BaseRet<>();
		ret.setCode(RetCode.SUCCESS);
		List<ScoreExamInsDto> records = emamService.searchByItems(null, null, null, null, null, null);
		ret.setData(records);*/
		BaseRet ret = new BaseRet<>();
		logger.info("查询考次【结束】");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping("/exam/changeStagesBySchoolCode")
	public List<String> changeStagesBySchoolCode(String schoolCode) {
		return findStagesBySchoolCode(schoolCode);
	}
	
	@ResponseBody
	@RequestMapping("/exam/changeGradesByStage")
	private List<String> changeGradesByStage(String schoolCode, String stage) {
		return findGradesByStage(schoolCode, stage);
	}
	
	@ResponseBody
	@RequestMapping("/exam/changeClassesByGrade")
	private List<SchoolClass> changeClassesByGrade(String grade, String stage, String schoolCode){
		return findClassesByGrade(schoolCode, stage, grade);
	}
	
	private List<String> findStagesBySchoolCode(String schoolCode) {
		return teacherService.findTeacherStages(schoolCode);
	}

	private List<String> findGradesByStage(String schoolCode, String stage) {
		return teacherService.findTeacherGrades(schoolCode, stage);
	}
	
	private List<SchoolClass> findClassesByGrade(String schoolCode, String stage, String grade){
		return teacherService.findTeacherClasses(schoolCode, stage, grade);
	}
	
	/*private List<TeacherPermission> findClassesByGrade(String grade, String stage, String schoolCode){
		return tpService.findClasses(String.valueOf(this.getCurrentUser().getTeacherId()),  schoolCode,  grade,  stage);
	}*/
	
	/*private List<DictItem> findCourseByClassId(String schoolCode, String grade, String stage, String classId) {
		
		List<DictItem> courses = null;
		
		List<Role> roles = teacherService.findTeacherRoleTypes(this.getCurrentUser().getTeacherId(), schoolCode);
		
		if(roles != null && roles.size() >0) {
			
			boolean rk = false;
			boolean bzr = false;
		
			
			for(Role r : roles) {
				//班主任
				if("5".equals(r.getId())) {
					bzr = true;
				}
				//任课老师
				if("1".equals(r.getId())) {
					rk = true;
				}
				
			}
			
			//班主任显示全部课程
			if(bzr) {
				courses = dictService.findDictItemsByCode(Constant.PlanType.subject);
			}
			
			//只是任课教师显示权限内课程
			if(!bzr && rk) {
				List<TeacherPermission> tpCourses = tpService.findCoursesByClassId(String.valueOf(this.getCurrentUser().getTeacherId()), 
						schoolCode, grade,  stage, classId);
				
				if(tpCourses != null && tpCourses.size() >0) {
					
					courses = new ArrayList<DictItem>();
					
					DictItem di = null;
					
					for(TeacherPermission tp : tpCourses) {
						di = new DictItem(tp.getCourseCode(), tp.getCourseName());
						courses.add(di);
					}
					
				}
			}
			
		}
		
		return courses;
	}*/

}
