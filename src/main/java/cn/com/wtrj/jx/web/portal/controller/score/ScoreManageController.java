package cn.com.wtrj.jx.web.portal.controller.score;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.shiro.SecurityUtils;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.PreviewScoreRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.dao.WtrjScoreRangeRuleMapper;
import cn.com.wtrj.jx.web.portal.model.entities.Dict;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.Header;
//import cn.com.wtrj.jx.web.portal.model.entities.Header;
import cn.com.wtrj.jx.web.portal.model.entities.Job;
import cn.com.wtrj.jx.web.portal.model.entities.RangeRuleInput;
import cn.com.wtrj.jx.web.portal.model.entities.SearchInput;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherClass;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherCourse;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherRole;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptMsg;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreDetail;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreExamClass;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreExamIns;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreSingle;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreSum;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreUpload;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjScoreRangeRule;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjScoreRuleExt;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjSendState;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjStudent;
import cn.com.wtrj.jx.web.portal.service.ScoreManageService;
import cn.com.wtrj.jx.web.portal.service.ScoreNoticeService;
import cn.com.wtrj.jx.web.portal.service.ScoreUploadService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dto.ScoreInput;
import cn.com.wtrj.jx.web.portal.service.dto.ScoreMultiInput;
import cn.com.wtrj.jx.web.portal.service.dto.SendScore;
import cn.com.wtrj.jx.web.portal.service.dto.Sms;
import cn.com.wtrj.jx.web.portal.service.dto.Student;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/")
public class ScoreManageController extends BaseController {

	private Logger logger = Logger.getLogger(ScoreManageController.class);

	@Value("${upload.file.disk.base.path}")
	private String diskPath;

	@Value("${upload.file.relative.path}")
	private String relativePath;

	/**
	 * 短信发送开关
	 */
	@Value("${sms_send_flag}")
	private Boolean smsSendFlag;

	@Value("${sms_wx_send_api}")
	private String sendWxUrl;

	@Value("${sms_shortmessage_send_api}")
	private String sendShortMsgUrl;

	private String sendAppid;

	private String sendSecret;

	private Integer agentId;
	@Value("${score.fallback.url}")
	private String scoreFallbackUrl;
	@Value("${score.task.url}")
	private String scoreTaskUrl;
	@Value("${score.grade.fallback.url}")
	private String scoreGradeFallbackUrl;

	@Value("${send_to_appid_beicheng}")
	private String sendAppidBeicheng;
	@Value("${send_to_secret_beicheng}")
	private String sendSecretBeicheng;
	@Value("${send_to_agent_id_beicheng}")
	private Integer agentIdBeicheng;

	@Value("${send_to_appid_dazhou}")
	private String sendAppidDazhou;
	@Value("${send_to_secret_dazhou}")
	private String sendSecretDazhou;
	@Value("${send_to_agent_id_dazhou}")
	private Integer agentIdDazhou;

	@Value("${send_to_appid_jinjiang}")
	private String sendAppidJinjiang;
	@Value("${send_to_secret_jinjiang}")
	private String sendSecretJinjiang;
	@Value("${send_to_agent_id_jinjiang}")
	private Integer agentIdJinjiang;

	@Value("${send_to_appid_pixian}")
	private String sendAppidPixian;
	@Value("${send_to_secret_pixian}")
	private String sendSecretPixian;
	@Value("${send_to_agent_id_pixian}")
	private Integer agentIdPixian;

	@Value("${send_to_appid_chenghua}")
	private String sendAppidChenghua;
	@Value("${send_to_secret_chenghua}")
	private String sendSecretChenghua;
	@Value("${send_to_agent_id_chenghua}")
	private Integer agentIdChenghua;

	@Value("${send_to_appid_dujiangyan}")
	private String sendAppidDujiangyan;
	@Value("${send_to_secret_dujiangyan}")
	private String sendSecretDujiangyan;
	@Value("${send_to_agent_id_dujiangyan}")
	private Integer agentIdDujiangyan;

	@Autowired
	private ScoreManageService scoreManageService;

	@Autowired
	private IDictService dictService;

	@Autowired
	private ScoreUploadService scoreUploadService;

	@Autowired
	private ScoreNoticeService scoreNoticeService;

	
	@Autowired
	private WtrjScoreRangeRuleMapper rangeRuleMapper;
	
	
	@RequestMapping("/toScoreManagePage")
	public String toPage(Model model, Map<String, Object> params, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());
		params.put("id", MenuId.SCORE_NOTICE);
		doCommonSetting(params);

		return "score/score-page";
	}

	/**
	 * 成绩恢复
	 */
	@RequestMapping("/toScoreRecovery")
	public String toRecovery(Model model, Map<String, Object> params, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());
		params.put("id", MenuId.SCORE_RECOVERY);
		doCommonSetting(params);

		return "score/score-recovery";
	}

	@RequestMapping("/toScoreManageIframe")
	public String toScoreManageIframe(Model model, Map<String, Object> params, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());
		
		Map<String, List<TeacherRole>> allRoles = scoreManageService
				.findTeacherAllRoles(this.getCurrentUser().getTeacherId());

		SecurityUtils.getSubject().getSession().setAttribute(this.getCurrentUser().getTeacherId() + "-all-roles",
				allRoles);

		return "score/score-iframe";
	}

	@RequestMapping("/toScoreRecoveryIframe")
	public String toScoreRecoveryIframe(Model model, Map<String, Object> params, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());

		Map<String, List<TeacherRole>> allRoles = scoreManageService
				.findTeacherAllRoles(this.getCurrentUser().getTeacherId());

		SecurityUtils.getSubject().getSession().setAttribute(this.getCurrentUser().getTeacherId() + "-all-roles",
				allRoles);

		return "score/score-recovery-iframe";
	}

	@RequestMapping("/toSingleScoreFirstWin")
	public String toSingleScoreFirstWin(Model model, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());

		return "score/single-score-first-win";
	}

	@RequestMapping("/toSumScoreFirstWin")
	public String toSumScoreFirstWin(Model model, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());

		return "score/sum-score-first-win";
	}

	@RequestMapping("/toMultiExamtWin")
	public String toMultiExamtWin(Model model, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());

		return "score/multi-exam-win";
	}

	@RequestMapping("/toMultiScoreWin")
	public String toMultiScoreWin(Model model, HttpServletRequest request, int examInsId, int classId, String className,
			String courseCode) {
		model.addAttribute("ctx", request.getContextPath());
		WtrjRptScoreExamIns exam = scoreManageService.findExamInsById(examInsId);
		model.addAttribute("schoolCode", exam.getSchoolCode());
		model.addAttribute("stage", exam.getStage());
		model.addAttribute("grade", exam.getGrade());
		model.addAttribute("classId", classId);
		model.addAttribute("className", className);
		model.addAttribute("id", exam.getId());

		return "score/multi-score-win";
	}

	@RequestMapping("/toViewScoreInputWin")
	public String toViewScoreInputWin(Model model, ScoreInput input, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());
		model.addAttribute("input", input);

		/*
		 * if("0".equals(input.getExamType())){
		 * 
		 * } else{
		 * 
		 * if("0".equals(input.getDataState())){
		 * 
		 * } else{
		 * 
		 * }
		 * 
		 * }
		 */

		/*List<WtrjScoreRangeRule> rangeRules = rangeRuleMapper.selectAll();
		for (WtrjScoreRangeRule ranges : rangeRules) {
			ranges.setRange(ranges.getScoreRangeStart()+"-"+ranges.getScoreRangeEnd());
		}
		model.addAttribute("ranges",rangeRules);
		Double scienceScore = scoreManageService.findScienceScore(Integer.valueOf(input.getClassId()), Integer.valueOf(input.getExamInsId()));
		Double artsScore = scoreManageService.findArtsScore(Integer.valueOf(input.getClassId()), Integer.valueOf(input.getExamInsId()));
		int science = 0;
		int arts = 0;
		if(scienceScore != null && scienceScore > 0) {
			science = 1;
		}
		if(artsScore != null && artsScore > 0) {
			arts = 1;
		}
		model.addAttribute("arts", arts);
		model.addAttribute("science", science);
		List<DictItem> dictItems = scoreUploadService.findCourseCodeByClassIdAndInsId(String.valueOf(input.getClassId()), String.valueOf(input.getExamInsId()));
		JSONArray json = JSONArray.fromObject(dictItems); 
		model.addAttribute("courses", json);*/
		
		/*if("0".equals(input.getExamType())){
			
		}
		else{
			
			if("0".equals(input.getDataState())){
				
			}
			else{
				
			}
			
		}*/
		
		return "score/view-score-input-win";
	}

	
	/*@ResponseBody
	@RequestMapping("/scoreManage/scoreRangeCount")
	public List<Map<String, Object>> findScoreRangeCount(RangeRuleInput input){
		logger.info("分段统计查询开始");
		List<Map<String, Object>> rangeCounts = new ArrayList<Map<String,Object>>();
		List<WtrjScoreRangeRule> rangeRules = rangeRuleMapper.findScoreRangeRuleByName(input.getName());
		for (WtrjScoreRangeRule ranges : rangeRules) {
			Map<String, Object> count = new HashMap<String,Object>();
			count.put("ranges", ranges.getScoreRangeStart().intValue()+"-"+ranges.getScoreRangeEnd().intValue());
			count.put("sumCount", scoreNoticeService.findsumScoreRangeCount(input.getExamInsId(), input.getClassId(), ranges.getScoreRangeStart(), ranges.getScoreRangeEnd()));
			if(input.getArts() == 1) {
				count.put("artsCount", scoreNoticeService.findArtsScoreRangeCount(input.getExamInsId(), input.getClassId(), ranges.getScoreRangeStart(), ranges.getScoreRangeEnd()));
			}else {
				count.put("artsCount",0);
			}
			if(input.getScience() == 1) {
				count.put("scienceCount", scoreNoticeService.findScienceScoreRangeCount(input.getExamInsId(), input.getClassId(), ranges.getScoreRangeStart(), ranges.getScoreRangeEnd()));
			}else {
				count.put("scienceCount",0);
			}
			if(input.getCourses() != null && input.getCourses().size() > 0) {
				for (Map<String, Object> dItem : input.getCourses()) {
					count.put(dItem.get("code").toString(), scoreNoticeService.findCourseScoreRangeCount(String.valueOf(input.getExamInsId()), 
							String.valueOf(input.getClassId()), ranges.getScoreRangeStart(), ranges.getScoreRangeEnd(),dItem.get("code").toString()));
					
				}
			}
			rangeCounts.add(count);
		}
		return rangeCounts;
	}*/
	
	@RequestMapping("/toFindScoreRange")
	public String toFindScoreRange(Model model,HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());
		List<WtrjScoreRangeRule> rangeRules = rangeRuleMapper.selectAll();
		model.addAttribute("ranges",rangeRules);
		return "score/score-range-win";
	}
	
	@ResponseBody
	@RequestMapping("/scoreManage/ScoreRangeRuleByName")
	public List<WtrjScoreRangeRule> findScoreRuleByName(String name){
		List<WtrjScoreRangeRule> rangeRules = rangeRuleMapper.findScoreRangeRuleByName(name);
		return rangeRules;
	}
	@ResponseBody
	@RequestMapping("/scoreManage/SaveScoreRangeRule")
	public BaseRet<String> SaveScoreRangeRule(@RequestBody RangeRuleInput input){
		BaseRet<String> ret = new BaseRet<String>();
		try {
			List<WtrjScoreRangeRule> ranges = input.getRanges();
			for (int i = 0; i < ranges.size(); i++) {
				for (int j = i; j < ranges.size(); j++) {
					if(ranges.get(i).getScoreRangeStart() == ranges.get(j).getScoreRangeEnd()) {
						logger.error("存在最低分最高分相同！");
						throw new Exception();
					}
				}
			}
			//更新
			if("1".equals(input.getType())) {
				rangeRuleMapper.deleteByName(ranges.get(0).getName());
				for (WtrjScoreRangeRule range : ranges) {
					if(range.getId() == "") {
						range.setId(UUID.randomUUID().toString());
						range.setName(input.getName());
						range.setType("1");
					}
					rangeRuleMapper.insert(range);
				}
			}else {
				//新增
				for (WtrjScoreRangeRule range : ranges) {
					range.setId(UUID.randomUUID().toString());
					range.setType("1");
					range.setName(input.getName());
					rangeRuleMapper.insert(range);
				}
			}
			ret.setCode(Constant.RetCode.SUCCESS);
		} catch (Exception e) {
			logger.error("保存分数段规则失败！",e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping("/scoreManage/deleteScoreRangeRule")
	public BaseRet<String> deleteScoreRangeRule(@RequestBody RangeRuleInput input){
		BaseRet<String> ret = new BaseRet<String>();
		try {
			rangeRuleMapper.deleteByName(input.getName());
			ret.setCode(Constant.RetCode.SUCCESS);
		} catch (Exception e) {
			logger.error("删除分数段规则失败！",e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		return ret;
	}
	
	
	@ResponseBody
	@RequestMapping("/scoreManage/viewScoreInputData")
	public List<PreviewScoreRet> viewScoreInputData(int classId, int examInsId,int visibleState) {
		logger.info("学生成绩汇总预览查询 开始");
		List<PreviewScoreRet> rs = new ArrayList<PreviewScoreRet>();
		try {

			DozerBeanMapper mapper = new DozerBeanMapper();
			List<WtrjRptScoreDetail> details = null;
			List<WtrjRptScoreSum> dtos = scoreNoticeService.findScoreSum(String.valueOf(classId),
					String.valueOf(examInsId));

			details = scoreNoticeService.findScoreDetail(classId, examInsId);

			Map<String, String> scoreMap = new HashMap<String, String>();
			for (WtrjRptScoreDetail detail : details) {
				String ps = scoreMap.get(detail.getStudentName());
				if ("1".equals(detail.getScoreMulti())) {
					ps = (ps == null ? "" : ps + "<br/>") + "[" + detail.getCourseName() + ":" + detail.getScore() + ":"
							+ "A卷成绩:" + detail.getScoreA() + ":" + "B卷成绩:" + detail.getScoreB();
				} else {
					ps = (ps == null ? "" : ps + "<br/>") + "[" + detail.getCourseName() + ":" + detail.getScore();
				}
				List<WtrjRptScoreSingle> scoreSingles = scoreNoticeService.findScoreSingleByName(Integer.valueOf(examInsId), Integer.valueOf(classId), detail.getStudentName());
				for (WtrjRptScoreSingle single : scoreSingles) {
					if(single.getCourseName().equals(detail.getCourseName())) {
						logger.info(visibleState);
						ps+=",班级排名:"+single.getOrderClassNumber();
						if(visibleState == 0) {
							logger.info(visibleState);
							if(single.getOrderGradeNumber() != null) {
								ps+=",年级排名:"+single.getOrderGradeNumber();
							}
							logger.info(ps);
						}
					}
				}

				if (detail.getRemark() != null && !"".equals(detail.getRemark())
						&& !"null".equals(detail.getRemark())) {
					ps += " - " + detail.getRemark() + " ";
				}
				if(dtos != null && dtos.size()>0) {
					if(dtos.get(0).getClassRemark() != null && !"".equals(dtos.get(0).getClassRemark()) && !"null".equals(dtos.get(0).getClassRemark())) {
						ps+=" - 班级总评语:"+dtos.get(0).getClassRemark();
					}
				}
				

				ps += "]";

				// + detail.getRemark() != null ? " - " + detail.getRemark() :
				// ""
				scoreMap.put(detail.getStudentName(), ps);
			}

			for (WtrjRptScoreSum dto : dtos) {
				PreviewScoreRet r = new PreviewScoreRet();
				mapper.map(dto, r);
				r.setCourseScore(scoreMap.get(r.getName()));
				rs.add(r);
			}
			logger.debug("数据查询结果：" + dtos.size());
		} catch (Exception e) {
			logger.error("学生成绩汇总预览查询 异常", e);
		}

		logger.info("学生成绩汇总预览查询 结束");
		return rs;
	}

	@RequestMapping("/toViewSendStateWin")
	public String toViewSendStateWin(Model model, ScoreInput input, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());
		model.addAttribute("input", input);
		List<WtrjStudent> students = scoreManageService.findStudentsByClassId(input.getClassId());
		WtrjRptScoreExamClass examClass = scoreManageService.findExamClassByExamIdAndClassId(input.getExamInsId(),
				input.getClassId());
		// 查询微信发送记录
		List<WtrjRptMsg> wxMsgs = scoreNoticeService.selectMsgByMsgCode(examClass.getMsgCode(), 1);
		// 查询短信发送记录
		List<WtrjRptMsg> smsMsgs = scoreNoticeService.selectMsgByMsgCode(examClass.getMsgCode(), 2);
		Integer wxCount = wxMsgs.size();
		Integer smsCount = smsMsgs.size();
		int wxMsgSuccess = 0;
		int smsMsgSuccess = 0;
		int wxMsgFiled = 0;
		int smsMsgFiled = 0;
		int wxMsgSending = 0;
		int smsMsgSending = 0;
		for (WtrjRptMsg msg : wxMsgs) {
			if ("1".equals(msg.getSuccessFlag())) {
				wxMsgSuccess++;
			}
			if ("2".equals(msg.getSuccessFlag())) {
				wxMsgSending++;
			}
			if ("3".equals(msg.getSuccessFlag())) {
				wxMsgFiled++;
			}
		}
		for (WtrjRptMsg msg : smsMsgs) {
			if ("1".equals(msg.getSuccessFlag())) {
				smsMsgSuccess++;
			}
			if ("2".equals(msg.getSuccessFlag())) {
				smsMsgSending++;
			}
			if ("3".equals(msg.getSuccessFlag())) {
				smsMsgFiled++;
			}
		}
		model.addAttribute("wxCount", wxCount);
		model.addAttribute("wxMsgSuccess", wxMsgSuccess);
		model.addAttribute("wxMsgSending", wxMsgSending);
		model.addAttribute("wxMsgFiled", wxMsgFiled);
		model.addAttribute("smsCount", smsCount);
		model.addAttribute("smsMsgSuccess", smsMsgSuccess);
		model.addAttribute("smsMsgSending", smsMsgSending);
		model.addAttribute("smsMsgFiled", smsMsgFiled);
		return "score/view-score-sendstate-win";
	}

	@ResponseBody
	@RequestMapping("/scoreManage/viewScoreSendStateData")
	public List<WtrjSendState> viewScoreSendStateData(int classId, int examInsId, String type) {
		List<WtrjSendState> sendStates = new ArrayList<WtrjSendState>();
		try {
			logger.info("根据班级id查询学生开始！" + classId);
			List<WtrjStudent> students = scoreManageService.findStudentsByClassId(classId);
			logger.info("查询学生结束！" + students);
			logger.info("根据考试id和班级id查询发送记录！" + classId + " " + examInsId);
			WtrjRptScoreExamClass examClass = scoreManageService.findExamClassByExamIdAndClassId(examInsId, classId);
			logger.info("查询考次发送记录结束！" + examClass);
			logger.info("查询发送记录数据开始！" + examClass.getMsgCode());
			List<WtrjRptMsg> msgs = scoreNoticeService.selectMsgByMsgCode(examClass.getMsgCode(),
					Integer.valueOf(type));
			logger.info("查询发送记录数据结束" + msgs);
			for (WtrjRptMsg msg : msgs) {
				for (WtrjStudent student : students) {
					if (msg.getContent().contains(student.getName())) {
						WtrjSendState sendState = new WtrjSendState();
						sendState.setToUser(msg.getToUser());
						sendState.setSuccessFlag(msg.getSuccessFlag());
						sendState.setMsgType(msg.getMsgType());
						sendState.setContent(msg.getContent());
						sendState.setStuName(msg.getToUser() + "[" + student.getName() + "]");
						sendState.setId(msg.getId());
						sendStates.add(sendState);
						break;
					}
				}

			}
		} catch (Exception e) {
			logger.error("发送状态查询异常！", e);
		}
		return sendStates;
	}

	@RequestMapping("/toScoreInputMultiWin")
	public String toScoreInputMultiWin(Model model, ScoreInput input, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());

		WtrjRptScoreExamIns exam = scoreManageService.findExamInsById(input.getExamInsId());

		if ("1".equals(input.getExamType())) {
			model.addAttribute("examInsId", exam.getId());
			model.addAttribute("scoreMulti", input.getScoreMulti());
			model.addAttribute("scoreSection", input.getScoreSection());
			model.addAttribute("courseCode", input.getCourseCode());
			model.addAttribute("courseName", input.getCourseName());
			model.addAttribute("classId", input.getClassId());
			model.addAttribute("className", input.getClassName());
			model.addAttribute("fullScore", input.getFullScore());
			model.addAttribute("examInsName", exam.getName());
			model.addAttribute("examType", "1");
		} else if ("0".equals(input.getExamType())) {
			WtrjScoreRuleExt rule = scoreManageService.findScoreRule(exam.getId(), exam.getCourseCode(),
					exam.getClassId());

			model.addAttribute("examInsId", exam.getId());
			model.addAttribute("scoreMulti", rule.getScoreMulti());
			model.addAttribute("scoreSection", input.getScoreSection());
			model.addAttribute("courseCode", exam.getCourseCode());
			model.addAttribute("classId", exam.getClassId());
			model.addAttribute("examInsName", exam.getName());
			model.addAttribute("examType", "0");
		} else if ("-1".equals(input.getExamType())) {

			WtrjScoreRuleExt rule = scoreManageService.findScoreRule(input.getExamInsId(), input.getCourseCode(),
					input.getClassId());
			WtrjRptScoreUpload upload = scoreManageService.findUpload(input.getExamInsId(), input.getClassId(),
					input.getCourseCode());

			model.addAttribute("examInsId", input.getExamInsId());
			model.addAttribute("scoreMulti", rule.getScoreMulti());
			model.addAttribute("scoreSection", input.getScoreSection());
			model.addAttribute("rule", rule);
			model.addAttribute("courseCode", input.getCourseCode());
			model.addAttribute("courseName", upload.getCourseName());
			model.addAttribute("classId", input.getClassId());
			model.addAttribute("className", upload.getClassName());
			model.addAttribute("fullScore", rule.getScoreFull());
			model.addAttribute("examInsName", exam.getName());
			model.addAttribute("examType", "-1");
		}

		return "score/score-input-multi-win";
	}
	
	@RequestMapping("/toScoreInputWin")
	public String toScoreInputWin(Model model, ScoreInput input, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());

		WtrjRptScoreExamIns exam = scoreManageService.findExamInsById(input.getExamInsId());

		if ("1".equals(input.getExamType())) {
			model.addAttribute("examInsId", exam.getId());
			model.addAttribute("scoreMulti", input.getScoreMulti());
			//model.addAttribute("scoreSection", input.getScoreSection());
			model.addAttribute("courseCode", input.getCourseCode());
			model.addAttribute("courseName", input.getCourseName());
			model.addAttribute("classId", input.getClassId());
			model.addAttribute("className", input.getClassName());
			model.addAttribute("fullScore", input.getFullScore());
			model.addAttribute("examInsName", exam.getName());
			model.addAttribute("examType", "1");
		} else if ("0".equals(input.getExamType())) {
			WtrjScoreRuleExt rule = scoreManageService.findScoreRule(exam.getId(), exam.getCourseCode(),
					exam.getClassId());

			model.addAttribute("examInsId", exam.getId());
			model.addAttribute("scoreMulti", rule.getScoreMulti());
			//model.addAttribute("scoreSection", input.getScoreSection());
			model.addAttribute("courseCode", exam.getCourseCode());
			model.addAttribute("classId", exam.getClassId());
			model.addAttribute("examInsName", exam.getName());
			model.addAttribute("examType", "0");
		} else if ("-1".equals(input.getExamType())) {

			WtrjScoreRuleExt rule = scoreManageService.findScoreRule(input.getExamInsId(), input.getCourseCode(),
					input.getClassId());
			WtrjRptScoreUpload upload = scoreManageService.findUpload(input.getExamInsId(), input.getClassId(),
					input.getCourseCode());
			if(upload == null) {
				model.addAttribute("error", "1");
			}else {
				model.addAttribute("error", "0");
			}
			String classRemark = scoreUploadService.findClassRemarkByClassIdAndInsId(input.getExamInsId().toString(), String.valueOf(input.getClassId()));
			//model.addAttribute("singleClassRemark",classRemark);
			model.addAttribute("examInsId", input.getExamInsId());
			model.addAttribute("scoreMulti", rule.getScoreMulti());
			//model.addAttribute("scoreSection", input.getScoreSection());
			model.addAttribute("rule", rule);
			model.addAttribute("courseCode", input.getCourseCode());
			model.addAttribute("courseName", upload.getCourseName());
			model.addAttribute("classId", input.getClassId());
			model.addAttribute("className", upload.getClassName());
			model.addAttribute("fullScore", rule.getScoreFull());
			model.addAttribute("examInsName", exam.getName());
			model.addAttribute("examType", "-1");
			
		}

		return "score/score-input-win";
	}

	@ResponseBody
	@RequestMapping("/scoreManage/findStudentsByClassId")
	public PageData<List<WtrjStudent>> findStudentsByClassId(int classId, String examType, int examInsId,
			String courseCode) {

		PageData<List<WtrjStudent>> page = new PageData<List<WtrjStudent>>();

		List<WtrjStudent> students = Lists.newArrayList();

		if ("-1".equals(examType)) {
			List<WtrjRptScoreDetail> details = scoreManageService.findScoreDetails(examInsId, classId, courseCode);

			if (details != null && details.size() > 0) {
				WtrjStudent s = null;

				for (WtrjRptScoreDetail d : details) {
					s = new WtrjStudent(d.getId(), d.getStudentName(), d.getStudentCode(),
							d.getScore() != null ? d.getScore().doubleValue() : 0,
							d.getScoreA() != null ? d.getScoreA().doubleValue() : 0,
							d.getScoreB() != null ? d.getScoreB().doubleValue() : 0, d.getRemark());
					s.setStatus("否");
					students.add(s);
				}

			}
		} else {
			students = scoreManageService.findStudentsByClassId(classId);

			for (WtrjStudent s : students) {

				/*
				 * if(StringUtils.isBlank(s.getStudentCode())) {
				 * s.setStudentCode(String.valueOf(s.getRn())); }
				 */
				s.setStatus("否");
				// s.set
			}

		}

		students = sortWtrjStudents(students);

		page.setRows(students);
		page.setTotal(students.size());

		return page;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/page")
	public Object page(PageSearchParam param, SearchInput input) {

		input.setTeacherId(this.getCurrentUser().getTeacherId());

		if (input != null && input.getExamInsId() > 0 && input.getClassId() > 0 && input.isFindCourese()) {

			List<WtrjRptScoreUpload> uploads = scoreManageService.findUploadCourses(input.getExamInsId(),
					input.getClassId());

			List<WtrjRptScoreExamClass> examClasses = Lists.newArrayList();

			WtrjRptScoreExamClass examClass = null;

			if (uploads != null && uploads.size() > 0) {
				for (WtrjRptScoreUpload p : uploads) {

					examClass = new WtrjRptScoreExamClass(p.getId(), input.getExamInsId(), p.getExamInsName(),
							input.getClassId(), p.getCourseName(), p.getUploadUserId().toString(),
							p.getUploadUserName(), p.getUploadTime(), p.getCourseCode(), p.getCourseName(), "1",
							p.getId(), input.getSendState());

					examClasses.add(examClass);

				}
			}

			return examClasses;

		} else if (input != null) {

			PageData<List<WtrjRptScoreExamClass>> page = new PageData<List<WtrjRptScoreExamClass>>();
			int start = param.getStart();
			int end = param.getEnd();

			input.setStart(start);
			input.setEnd(end);

			int count = scoreManageService.findExamClassesCount(input);
			List<WtrjRptScoreExamClass> scores = scoreManageService.findExamClassesPage(input);
			scores = changeTreeStage(scores);
			page.setRows(scores);
			page.setTotal(count);

			return page;
		}

		return null;
	}

	/**
	 * 查询已删除的成绩
	 */
	@ResponseBody
	@RequestMapping("/scoreManage/recoveryPage")
	public Object recoveryPage(PageSearchParam param, SearchInput input) {

		input.setTeacherId(this.getCurrentUser().getTeacherId());

		if (input != null && input.getExamInsId() > 0 && input.getClassId() > 0 && input.isFindCourese()) {

			List<WtrjRptScoreUpload> uploads = scoreManageService.findRecoveryUploadCourses(input.getExamInsId(),
					input.getClassId());

			List<WtrjRptScoreExamClass> examClasses = Lists.newArrayList();

			WtrjRptScoreExamClass examClass = null;

			if (uploads != null && uploads.size() > 0) {
				for (WtrjRptScoreUpload p : uploads) {

					examClass = new WtrjRptScoreExamClass(p.getId(), input.getExamInsId(), p.getExamInsName(),
							input.getClassId(), p.getCourseName(), p.getUploadUserId().toString(),
							p.getUploadUserName(), p.getUploadTime(), p.getCourseCode(), p.getCourseName(), "1",
							p.getId(), input.getSendState());

					examClasses.add(examClass);

				}
			}

			return examClasses;

		} else if (input != null) {

			PageData<List<WtrjRptScoreExamClass>> page = new PageData<List<WtrjRptScoreExamClass>>();
			int start = param.getStart();
			int end = param.getEnd();

			input.setStart(start);
			input.setEnd(end);

			int count = scoreManageService.findRecoveryExamClassesCount(input);
			List<WtrjRptScoreExamClass> scores = scoreManageService.findRecoveryExamClassesPage(input);
			page.setRows(scores);
			page.setTotal(count);

			return page;
		}

		return null;
	}

	// treegrid是否展开设置
	private List<WtrjRptScoreExamClass> changeTreeStage(List<WtrjRptScoreExamClass> scores) {

		if (scores != null && scores.size() > 0) {
			for (WtrjRptScoreExamClass exam : scores) {
				// 多科考试可以展开
				if ("1".equals(exam.getExamType())) {
					exam.setState("closed");
				}
			}
		}

		return scores;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/schools")
	public List<TeacherPermission> findSchools() {
		List<TeacherPermission> schools = scoreManageService.findTeacherSchools(this.getCurrentUser().getTeacherId());

		if (schools != null && schools.size() > 0) {
			schools.get(0).setSelected(true);
		}

		return schools;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/dicts")
	public List<DictItem> findDictItems(String code) {
		List<DictItem> items = dictService.findDictItemsByCode(code);
		if (items != null && items.size() > 0) {
			items.get(0).setSelected(true);
		}
		return items;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/stages")
	public List<DictItem> findStageBySchoolCode(String schoolCode) {

		List<Integer> stages = scoreManageService.findTeacherStages(schoolCode, this.getCurrentUser().getTeacherId());

		List<DictItem> items = null;
		;

		if (stages != null && stages.size() > 0) {

			items = Lists.newArrayList();

			for (Integer stage : stages) {

				String code = stage.toString();
				String name = "小学";

				if (stage == 2) {
					name = "初中";
				}

				if (stage == 3) {
					name = "高中";
				}

				DictItem item = new DictItem(code, name);

				items.add(item);
			}

			items.get(0).setSelected(true);
		}

		return items;

	}

	private List<TeacherRole> findRoles(String schoolCode, int stage) {

		Object obj = SecurityUtils.getSubject().getSession()
				.getAttribute(this.getCurrentUser().getTeacherId() + "-all-roles");

		if (obj != null) {

			Map<String, List<TeacherRole>> allRoles = (Map<String, List<TeacherRole>>) obj;

			List<TeacherRole> roles = allRoles.get(schoolCode + "-" + stage);

			if (roles != null && roles.size() > 0) {
				roles.get(0).setSelected(true);
			}

			return roles;

		}

		return null;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/classes")
	public Collection<TeacherClass> findClasses(String schoolCode, int stage, int grade) {

		// 获取所有角色
		List<TeacherRole> roles = findRoles(schoolCode, stage);

		if (roles != null && roles.size() > 0) {

			boolean isAllClass = false;

			Set<TeacherClass> classes = Sets.newHashSet();

			boolean first = true;

			for (TeacherRole role : roles) {
				if (role.isAllClass()) {
					// 年级组长和备课组长，在他权限范围内的班级才能是全部
					if ("4".equals(role.getType()) || "5".equals(role.getType())) {

						List<Integer> grades = role.getGrades();

						if (grades != null && grades.size() > 0) {

							for (int g : grades) {

								if (g == grade) {
									isAllClass = true;
								}

							}

						}
					} else {
						isAllClass = true;
					}

				} else {
					/// classes.addAll(rol)
					if (role.getClasses() != null && role.getClasses().size() > 0) {

						List<TeacherClass> cls = role.getClasses().get(grade);

						if (first && cls != null && cls.size() > 0) {
							cls.get(0).setSelected(true);
							first = false;
							classes.addAll(cls);
						}

						if (cls != null && cls.size() > 0) {
							classes.addAll(cls);
						}

					}
				}
			}

			if (isAllClass) {
				// 查询所有年级
				return chanageTpClasses(findAllClasses(schoolCode, stage, grade));
			} else {
				// 查询权限内年级
				return classes;
			}

		}

		return null;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/courses")
	public Collection<TeacherCourse> findCourses(String schoolCode, int stage, int grade, int classId) {

		// 获取所有角色
		List<TeacherRole> roles = findRoles(schoolCode, stage);

		if (roles != null && roles.size() > 0) {

			boolean isAllCourse = false;

			Set<TeacherCourse> courses = Sets.newHashSet();

			for (TeacherRole role : roles) {
				if (role.isAllCourse()) {
					// 当班主任的班级才能查看全部课程
					if ("1".equals(role.getType())) {
						List<TeacherClass> cls = role.getClasses().get(grade);

						if (cls != null && cls.size() > 0) {
							for (TeacherClass c : cls) {
								if (c.getId() == classId) {
									isAllCourse = true;
								}
							}
						}

					} else if ("5".equals(role.getType())) {
						List<Integer> grades = role.getGrades();

						if (grades != null && grades.size() > 0) {
							for (Integer g : grades) {
								if (g == grade) {
									isAllCourse = true;
								}
							}
						}

					} else {
						isAllCourse = true;
					}

				} else {

					if (role.getCourses() != null && role.getCourses().size() > 0) {
						// 教研组长
						if (role.getCourses().get(schoolCode) != null) {

							List<TeacherCourse> list = role.getCourses().get(schoolCode);

							courses.addAll(list);
						}

						// 备课组长
						if (role.getCourses().get(String.valueOf(grade)) != null) {
							List<TeacherCourse> list = role.getCourses().get(String.valueOf(grade));
							courses.addAll(list);
						}

						// 任课教师
						if (role.getCourses().get(schoolCode + "-" + grade + "-" + String.valueOf(classId)) != null) {
							List<TeacherCourse> list = role.getCourses()
									.get(schoolCode + "-" + grade + "-" + String.valueOf(classId));
							courses.addAll(list);
						}

					}
				}
			}

			if (isAllCourse) {
				// 查询所有年级
				List<DictItem> dcourses = dictService.findDictItemsByCode(Constant.PlanType.subject);
				courses = Sets.newHashSet();
				TeacherCourse tc = null;
				for (int i = 0; i < dcourses.size(); i++) {
					tc = new TeacherCourse(dcourses.get(i).getCode(), dcourses.get(i).getName());
					if (i == 0) {
						tc.setSelected(true);
					}
					courses.add(tc);
				}
			} else {
				// 查询权限内年级

				if (courses != null && courses.size() > 0) {

					boolean first = true;

					for (TeacherCourse t : courses) {
						if (first) {
							t.setSelected(true);
							first = false;
						}
					}

				}

			}

			if (courses != null && courses.size() > 0) {
				List<DictItem> dcourses = dictService.findDictItemsByCode(Constant.PlanType.subject);
				List<TeacherCourse> list = Lists.newArrayList();

				for (DictItem d : dcourses) {

					for (TeacherCourse c : courses) {

						if (d.getCode().equals(c.getCode())) {
							list.add(c);
						}

					}

				}

				return list;
			}

			return courses;

		}

		return null;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/grades")
	public List<DictItem> findGrades(String schoolCode, int stage) {

		// 获取所有角色
		List<TeacherRole> roles = findRoles(schoolCode, stage);

		if (roles != null && roles.size() > 0) {

			boolean isAllGrade = false;
			Set<Integer> grades = Sets.newHashSet();

			for (TeacherRole role : roles) {
				// 判断是否可以获得所有年级角色
				if (role.isAllGrade()) {
					isAllGrade = true;
				} else {
					grades.addAll(role.getGrades());
				}
			}

			if (isAllGrade) {
				// 查询所有年级
				return findAllGrades(schoolCode, stage);
			} else {
				// 查询权限内年级
				return changeGrades(grades);
			}

		}

		return null;
	}

	private List<DictItem> findAllGrades(String schoolCode, int stage) {
		List<Integer> grades = scoreManageService.findAllGrades(schoolCode, stage);
		return changeGrades(grades);
	}

	private List<TeacherPermission> findAllClasses(String schoolCode, int stage, int grade) {
		List<TeacherPermission> classes = scoreManageService.findAllClasses(schoolCode, stage, grade);
		return classes;
	}

	private List<TeacherClass> chanageTpClasses(List<TeacherPermission> classes) {

		List<TeacherClass> clses = Lists.newArrayList();

		if (classes != null && classes.size() > 0) {
			for (TeacherPermission tp : classes) {
				clses.add(new TeacherClass(tp.getClassId(), tp.getClassName()));
			}

			clses.get(0).setSelected(true);

		}
		return clses;
	}

	private List<DictItem> changeGrades(Collection<Integer> grades) {

		List<DictItem> items = Lists.newArrayList();

		if (grades != null && grades.size() > 0) {
			for (Integer grade : grades) {

				String code = grade.toString();
				String name = grade + " 年级";

				DictItem item = new DictItem(code, name);

				items.add(item);
			}

			items.get(0).setSelected(true);
		}

		return items;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/saveExamIns")
	public BaseRet<Integer> saveExamIns(@RequestBody WtrjRptScoreExamIns examIns) {

		BaseRet<Integer> rt = new BaseRet<Integer>();
		rt.setCode(Constant.RetCode.SUCCESS);
		try {

			boolean bool = scoreManageService.validateExamIns(examIns);

			if (bool) {
				examIns.setCreateUserId(this.getCurrentUser().getTeacherId().toString());
				examIns.setCreateUserName(this.getCurrentUser().getTeacherName());
				scoreManageService.saveExamIns(examIns);
				rt.setData(examIns.getId());
			} else {
				rt.setCode(Constant.RetCode.ERROR);
				rt.setMsg("保存失败,考次重复");
			}

		} catch (Exception e) {
			logger.info("考次信息保存失败");
			logger.info(e.getMessage());
			rt.setCode(Constant.RetCode.ERROR);
			rt.setMsg("保存失败");
		}

		return rt;
	}

	/*
	 * @ResponseBody
	 * 
	 * @RequestMapping("/scoreManage/validateExamIns") public boolean
	 * validateExamIns(String examInsName){ try { boolean bool =
	 * scoreManageService.validateExamIns(examInsName); return bool; } catch
	 * (Exception e) { e.printStackTrace(); return false; }
	 * 
	 * }
	 */

	@ResponseBody
	@RequestMapping("/scoreManage/saveInputScore")
	public BaseRet<Integer> saveInputScore(@RequestBody ScoreInput input) {
		
		BaseRet<Integer> rt = new BaseRet<Integer>();
		rt.setCode(Constant.RetCode.SUCCESS);
		scoreManageService.saveStudentScores(input, this.getCurrentUser(),scoreFallbackUrl,scoreTaskUrl,0);
		
		return rt;
	}
	
	@ResponseBody
	@RequestMapping("/scoreManage/saveInputMultiScore")
	public BaseRet<Integer> saveInputMultiScore(@RequestBody ScoreMultiInput input) {
		logger.info(">>>>>>>>>>>>>>多科成绩上传>>>>>>>>>>>>>>");
		BaseRet<Integer> rt = new BaseRet<Integer>();
		try {
			rt.setCode(Constant.RetCode.SUCCESS);
			scoreManageService.saveStudentMultiScores(input, this.getCurrentUser(), scoreFallbackUrl,scoreTaskUrl);
		} catch (Exception e) {
			logger.info("多科成绩上传失败");
			logger.error(e.getMessage());
			rt.setCode(Constant.RetCode.ERROR);
			rt.setMsg("保存失败"+e.getMessage());
		}
		return rt;
	}
	
	@ResponseBody
	@RequestMapping("/scoreManage/deleteInputScore")
	public BaseRet<Integer> deleteInputScore(int examInsId, int classId, String courseCode, String dataState) {

		BaseRet<Integer> rt = new BaseRet<Integer>();
		rt.setCode(Constant.RetCode.SUCCESS);
		scoreManageService.deleteInputScore(examInsId, classId, courseCode, dataState,scoreFallbackUrl,scoreGradeFallbackUrl,scoreTaskUrl);

		return rt;
	}

	/**
	 * 恢复对应成绩
	 */
	@ResponseBody
	@RequestMapping("/scoreManage/recoveryScore")
	public BaseRet<Integer> recoveryScore(int examInsId, int classId, String courseCode, String dataState) {

		BaseRet<Integer> rt = new BaseRet<Integer>();
		rt.setCode(Constant.RetCode.SUCCESS);
		scoreManageService.recoveryScore(examInsId, classId, courseCode, dataState);

		return rt;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/toSumClassScore")
	public BaseRet<String> toSumClassScore(String classId, String examInsId,String classRemark) {

		BaseRet<String> rt = new BaseRet<String>();
		rt.setCode(Constant.RetCode.SUCCESS);
		if(classRemark == null) {
			classRemark="";
		}
		scoreManageService.sumStudentScores(examInsId, classId,scoreFallbackUrl,scoreTaskUrl,classRemark);

		return rt;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/countGradeOrder")
	public BaseRet<String> countGradeOrder(int stage, int grade, int examInsId) {

		BaseRet<String> rt = new BaseRet<String>();
		rt.setCode(Constant.RetCode.SUCCESS);

		//scoreManageService.countGradeOrder(stage, grade, examInsId);

		
		scoreManageService.countGradeOrderTask(stage, grade, examInsId,scoreGradeFallbackUrl,scoreTaskUrl);
		
		return rt;
	}

	/**
	 * 支持多上传，但是现在前台未选择文件后自动上传，相当每次只上传一个文件
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/scoreManage/scoreFileUpload")
	public BaseRet<PageData<List<WtrjStudent>>> filesUpload(HttpServletRequest request, int examInsId, int classId,
			String scoreMulti, String scoreSection) {
		logger.info("===========>scoreSection>>>>>>>>>>>>>>>>>" + scoreSection);
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		List<MultipartFile> files = multipartRequest.getFiles("scoreFile");
		BaseRet<PageData<List<WtrjStudent>>> rs = new BaseRet<PageData<List<WtrjStudent>>>();
		if (files != null && files.size() > 0) {
			
			MultipartFile file = files.get(0);

			int last = file.getOriginalFilename().lastIndexOf(".");

			if (last == -1) {
				rs.setCode(Constant.RetCode.ERROR);
				rs.setMsg("上传失败，上传文件必须为Excel类型");
				return rs;
			}

			String suffix = file.getOriginalFilename().substring(last);

			if (".xlsx".equals(suffix) || ".xls".equals(suffix)) {

				File tempFile = saveFile(file);
				// logger.info("file path : "+filePath);
				
				if (tempFile != null && tempFile.exists()) {
					
					Map<String, Object> scoresMap = null;
					List<Map<String, Object>> scoresMap1 = null;
					
						scoresMap = readExcel(tempFile, scoreMulti);
					
					if (scoresMap != null) {

						if (scoresMap.get("01") != null && !"".equals(scoresMap.get("01"))) {
							rs.setCode(Constant.RetCode.ERROR);
							rs.setMsg(String.valueOf(scoresMap.get("01")));
							return rs;
						} else {

							Object obj = scoresMap.get("scores");
							if (obj != null) {
								List<WtrjStudent> stus = (List<WtrjStudent>) obj;

								for (WtrjStudent s : stus) {

									/*
									 * if(StringUtils.isBlank(s.getStudentCode()
									 * )) {
									 * s.setStudentCode(String.valueOf(s.getRn()
									 * )); }
									 */
									s.setStatus("否");
								}

								PageData<List<WtrjStudent>> page = new PageData<List<WtrjStudent>>();
								page.setRows(stus);
								page.setTotal(stus.size());

								rs.setData(page);
							}
						}
					}
				}

				rs.setCode(Constant.RetCode.SUCCESS);
				rs.setMsg(file.getOriginalFilename());
			} else {
				rs.setCode(Constant.RetCode.ERROR);
				rs.setMsg("上传失败，上传文件必须为Excel类型");
			}

			return rs;
		}

		return null;
	}
	
	/**
	 * 多科成绩上传ajax
	 */
	@ResponseBody
	@RequestMapping("/scoreManage/scoreFileUploadMulti")
	public BaseRet<Map<String, Object>> filesUploadMulti(HttpServletRequest request, int examInsId, int classId,
			String scoreMulti, String scoreSection) {
		logger.info(">>>>>>>>>>多科成绩上传>>>>>>>>>>");
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		List<MultipartFile> files = multipartRequest.getFiles("scoreFile");
		BaseRet<Map<String, Object>> rs = new BaseRet<Map<String, Object>>();
		Map<String, Object> scoresMap =null;
		if (files != null && files.size() > 0) {
			
			MultipartFile file = files.get(0);

			int last = file.getOriginalFilename().lastIndexOf(".");

			if (last == -1) {
				rs.setCode(Constant.RetCode.ERROR);
				rs.setMsg("上传失败，上传文件必须为Excel类型");
				return rs;
			}

			String suffix = file.getOriginalFilename().substring(last);

			if (".xlsx".equals(suffix) || ".xls".equals(suffix)) {

				File tempFile = saveFile(file);
				// logger.info("file path : "+filePath);
				
				if (tempFile != null && tempFile.exists()) {
					 scoresMap = readSectionExcel(tempFile, scoreMulti);
					 if (scoresMap.containsKey("01")) {
						rs.setCode(Constant.RetCode.ERROR);
						rs.setMsg((String) scoresMap.get("01"));
						//rs.setMsg("上传失败，上传文件必须为Excel类型");
						return rs;
					}
					rs.setData(scoresMap);
				}
				rs.setCode(Constant.RetCode.SUCCESS);
				rs.setMsg(file.getOriginalFilename());
			} else {
				rs.setCode(Constant.RetCode.ERROR);
				rs.setMsg("上传失败，上传文件必须为Excel类型");
			}
			return rs;
		}
		return null;
	}
	
	/**
	 * 校验读取多科成绩
	 */
	private Map<String, Object>readSectionExcel(File file, String scoreMulti) {
		logger.info("===========开始读取分科成绩>>>>>>>>>>");
		Map<String, Object> msg = new HashMap<>();
		Map<String, Object> map = new HashMap<>();
		// File file = new File(filePath);
		if (file != null && file.exists()) {
			try {

				try {
					// 创建输入流
					InputStream stream = new FileInputStream(file);
					// 获取Excel文件对象
					Workbook rwb = Workbook.getWorkbook(stream);
					//获取所有学科的code
					List<DictItem> findDictItems = dictService.findDictItems();
					// 获取文件的指定工作表 默认的第一个
					Sheet sheet = rwb.getSheet(0);
					WtrjStudent s = null;
					List<List<WtrjStudent>> ss = new ArrayList<>();
					//校验数据用的数组
					List<String[]> list = new ArrayList<>();
					Cell cell = null;
					Cell cellA = null;
					Cell cellB = null;
					//表头的集合
					List<Header> headers = new ArrayList<>();
					//当前表头内容
					Header currentHeader = new Header();
					
					Header header = null;
					for (int i = 0; i < sheet.getRows(); i++) {
						// 创建一个数组 用来存储每一列的值
						String[] str = new String[sheet.getColumns()];
						// 列数
						s = new WtrjStudent();
						for (int j = 0; j < sheet.getColumns(); j++) {
							// 获取第i行，第j列的值
							cell = sheet.getCell(j, i);
							str[j] = cell.getContents().replaceAll("\\s*", "");
							//header的信息存入
							if (i==0) {
								if (j>1) {
									//如果当前科目和上一个相等
									if (str[j].equals(currentHeader.getCourseName())) {
										//取出上一个对象修改相关信息
										for (Header h : headers) {
											if (str[j].equals(h.getCourseName())) {
												h.setIsMulti("1");
												h.setScoreTitle(null);
												h.setScoreTitleA("A卷");
												h.setScoreTitleB("B卷");
												h.setEndIndex(j);
											}
										}
										continue;
									}else{
										//判断是否有不分卷科目录入两次的情况
										for (Header h : headers) {
											if (str[j].equals(h.getCourseName())) {
												msg = new HashMap<String, Object>();
												msg.put("01",str[j]+"科目重复");
												return msg;
											}
										}
										header = new Header();
										//获取科目的编号进行录入
										for (DictItem string : findDictItems) {
											if (str[j].equals(string.getName())) {
												header.setCode(string.getCode());
											}
										}
										header.setTitleName(str[j]);
										header.setCourseName(str[j]);
										header.setFromIndex(j);
										header.setEndIndex(j);
										header.setIsMulti("0");
										headers.add(header);
									}
								}else {
									if (j == 0) {
										header = new Header();
										header.setCode("studentCode");
										header.setTitleName(str[j]);
										header.setFromIndex(j);
										header.setEndIndex(j);
										headers.add(header);
									}else{
										header = new Header();
										header.setCode("name");
										header.setTitleName(str[j]);
										header.setFromIndex(j);
										header.setEndIndex(j);
										headers.add(header);
									}
								}
								currentHeader.setCourseName(str[j]);
							}
							if (i == 1 && j < 2) {
								if (org.apache.commons.lang.StringUtils.isNotEmpty(str[j])) {
									msg = new HashMap<String, Object>();
									msg.put("01", "请确认模板是否为多科模板!");
									return msg;
								}
							}
							if (i == 1 && j > 1) {
								Pattern pattern = Pattern.compile("[0-9]*.[0-9]*");
								Matcher isNum = pattern.matcher(str[j]);
								if (isNum.matches()) {
									msg = new HashMap<String, Object>();
									msg.put("01", "第二行不能填写数字,请按照模板填写!");
									return msg;
								}
							}
							if (i > 1 && j > 1) {
								Pattern pattern1 = Pattern.compile("[0-9]*.[0-9]*");
								Matcher isNum1 = pattern1.matcher(str[j]);
								if (!isNum1.matches()) {
									msg = new HashMap<String, Object>();
									msg.put("01","成绩输入有误!");
									return msg;
								}
							}
							if (i >= 2 && j == 0) {
								Pattern pattern = Pattern.compile("[0-9]*");
								Matcher isNum = pattern.matcher(str[j]);
								if (!isNum.matches()) {
									msg = new HashMap<String, Object>();
									msg.put("01", "学号必须是数字!");
									return msg;
								}
							}
						}
						// 把刚获取的列存入list
						list.add(str);
					}
					//读取学生相关信息
					for (int k = 2; k < sheet.getRows(); k++) {
						List<WtrjStudent> rowList = new ArrayList<>();
						for (Header h : headers) {
							if (h.getFromIndex() == 0) {
								cell = sheet.getCell(h.getFromIndex(),k);
								String sCell = cell.getContents().replaceAll("\\s*", "");
								s = new WtrjStudent();
								s.setStudentNo(sCell);
								rowList.add(s);
							}
							if (h.getFromIndex() == 1) {
								cell = sheet.getCell(h.getFromIndex(),k);
								String sCell = cell.getContents().replaceAll("\\s*", "");
								s = new WtrjStudent();
								s.setName(sCell);
								rowList.add(s);
							}
							if (h.getFromIndex() > 1) {
								if (h.getFromIndex() == h.getEndIndex()) {
									cell = sheet.getCell(h.getFromIndex(), k);
									String sCell = cell.getContents().replaceAll("\\s*", "");
									s = new WtrjStudent();
									s.setScore(Double.valueOf(sCell));
									rowList.add(s);
								} else {
									cellA = sheet.getCell(h.getFromIndex(), k);
									cellB = sheet.getCell(h.getEndIndex(), k);
									String sCellA = cellA.getContents().replaceAll("\\s*", "");
									String sCellB = cellB.getContents().replaceAll("\\s*", "");
									s = new WtrjStudent();
									s.setScoreA(Double.valueOf(sCellA));
									s.setScoreB(Double.valueOf(sCellB));
									rowList.add(s);
								}
							}
						}
						ss.add(rowList);
					}
					
					String[] str1 = (String[]) list.get(0);
					
					if (str1 != null && str1.length > 0) {
						for (int j = 1; j < str1.length - 1; j++) {
							if (str1[j].equals(str1[j + 1]) && str1[j - 1].equals(str1[j + 1]) ) {
								msg = new HashMap<String, Object>();
								msg.put("01", "成绩单标题解析错误!");
								return msg;
							} 
						}
					}else{
						msg = new HashMap<String, Object>();
						msg.put("01","表头不能为空!");
						return msg;
					}
					map.put("student", ss);
					map.put("header", headers);
				} catch (Exception e) {
					e.printStackTrace();
					msg = new HashMap<String, Object>();
					msg.put("01", "成绩单解析错误");
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return map;
	}

	private File saveFile(MultipartFile file) {
		// if (!file.isEmpty()) {
		try {
			StringBuffer fileName = new StringBuffer();
			String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			fileName.append(System.nanoTime()).append(RandomStringUtils.randomNumeric(4)).append(suffix);

			StringBuffer filePath = new StringBuffer(diskPath + relativePath);
			filePath.append(fileName);
			File path = new File(diskPath + relativePath);
			if (!path.exists()) {
				path.mkdirs();
			}
			File f = new File(filePath.toString());
			file.transferTo(f);
			return f;
		} catch (Exception e) {
			logger.error("文件上传错误," + e.getMessage());
		}
		// }
		return null;
	}

	private Map<String, Object> readExcel(File file, String scoreMulti) {
		Map<String, Object> msg = null;
		// File file = new File(filePath);
		if (file != null && file.exists()) {
			try {

				InputStream is;
				try {
					is = new FileInputStream(file);
					org.apache.poi.ss.usermodel.Workbook workbook = WorkbookFactory.create(is);
					// XSSFWorkbook xssfWorkbook = new XSSFWorkbook(is);
					// XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);

					org.apache.poi.ss.usermodel.Sheet hssfSheet = workbook.getSheetAt(0);

					if (hssfSheet != null) {

						// 获取当前工作薄的每一行
						// int row = xssfSheet.getLastRowNum();

						int row = hssfSheet.getLastRowNum();

						if (row >= 1) {

							List<WtrjStudent> ss = new ArrayList<WtrjStudent>();

							for (int rowNum = 1; rowNum <= row; rowNum++) {
								// XSSFRow xssfRow = xssfSheet.getRow(rowNum);
								Row xrow = hssfSheet.getRow(rowNum);
								if (xrow != null) {
									// 读取第一列数据 学生编号
									org.apache.poi.ss.usermodel.Cell studentCodeCell = xrow.getCell(0);
									// 读取第二列数据 学生姓名
									org.apache.poi.ss.usermodel.Cell studentNameCell = xrow.getCell(1);
									org.apache.poi.ss.usermodel.Cell scoreACell = xrow.getCell(2);
									org.apache.poi.ss.usermodel.Cell scoreBCell = xrow.getCell(3);
									//判断第四列数据是否存在
									org.apache.poi.ss.usermodel.Cell isData = xrow.getCell(4);
									if ( isData != null) {
										msg = new HashMap<String, Object>();
										msg.put("01", "请确认模板是否为单科模板!");
										return msg;
									}
									/*
									 * if("0".equals(scoreMulti)) { }
									 */
									String studentCode = null;
									String studentName = null;
									String scoreA = null;
									String scoreB = null;

									if (studentNameCell != null) {

										if (studentCodeCell != null) {

											if (studentCodeCell
													.getCellType() == org.apache.poi.ss.usermodel.Cell.CELL_TYPE_BOOLEAN) {
												studentCode = String.valueOf(studentCodeCell.getBooleanCellValue());
											} else if (studentCodeCell
													.getCellType() == org.apache.poi.ss.usermodel.Cell.CELL_TYPE_NUMERIC) {
												studentCode = String.valueOf(studentCodeCell.getNumericCellValue());
											} else {
												studentCode = String.valueOf(studentCodeCell.getStringCellValue());
											}

										} else {
											studentCode = "";
										}

										if (StringUtils.isNotBlank(studentCode)
												&& StringUtils.isNotBlank(studentCode.replaceAll("\\s*", ""))) {
											studentCode = studentCode.replaceAll("\\s*", "");
											if (!isDouble(studentCode)) {
												msg = new HashMap<String, Object>();
												msg.put("01", " 第一行必须为编号，数字格式(例如：1或01)");
												return msg;
											} else {
												studentCode = studentCode.split("\\.")[0];
											}
										}

										if (studentNameCell
												.getCellType() == org.apache.poi.ss.usermodel.Cell.CELL_TYPE_BOOLEAN) {
											studentName = String.valueOf(studentNameCell.getBooleanCellValue());
										} else if (studentNameCell
												.getCellType() == org.apache.poi.ss.usermodel.Cell.CELL_TYPE_NUMERIC) {
											studentName = String.valueOf(studentNameCell.getNumericCellValue());
										} else {
											studentName = String.valueOf(studentNameCell.getStringCellValue());
										}

										if (scoreACell != null) {

											if (scoreACell
													.getCellType() == org.apache.poi.ss.usermodel.Cell.CELL_TYPE_BOOLEAN) {
												scoreA = String.valueOf(scoreACell.getBooleanCellValue());
											} else if (scoreACell
													.getCellType() == org.apache.poi.ss.usermodel.Cell.CELL_TYPE_NUMERIC) {
												scoreA = String.valueOf(scoreACell.getNumericCellValue());
											} else {
												scoreA = String.valueOf(scoreACell.getStringCellValue());
											}

										} else {
											scoreA = "0.00";
										}

										if ("1".equals(scoreMulti)) {
											if (scoreBCell != null) {

												if (scoreBCell
														.getCellType() == org.apache.poi.ss.usermodel.Cell.CELL_TYPE_BOOLEAN) {
													scoreB = String.valueOf(scoreBCell.getBooleanCellValue());
												} else if (scoreBCell
														.getCellType() == org.apache.poi.ss.usermodel.Cell.CELL_TYPE_NUMERIC) {
													scoreB = String.valueOf(scoreBCell.getNumericCellValue());
												} else {
													scoreB = String.valueOf(scoreBCell.getStringCellValue());
												}

											} else {
												scoreB = "0.00";
											}
										}

									}

									if (StringUtils.isNotBlank(studentName)
											&& StringUtils.isNotBlank(studentName.replaceAll("\\s*", ""))) {
										WtrjStudent s = new WtrjStudent();
										// BeanUtils.copyProperties(upload, s);

										if (!isDouble(scoreA)) {
											scoreA = "0.00";
										}

										if ("1".equals(scoreMulti)) {
											if (!isDouble(scoreB)) {
												scoreB = "0.00";
											}
										}

										s.setStudentCode(studentCode);
										s.setName(studentName.replaceAll("\\s*", ""));

										if ("1".equals(scoreMulti)) {
											s.setScoreA(Double.valueOf(scoreA));
											s.setScoreB(Double.valueOf(scoreB));
										} else {
											s.setScore(Double.valueOf(scoreA));
										}

										ss.add(s);
									}

								}
							}

							if (ss != null && ss.size() > 0) {
								// saveStudentsScore(ss);
								msg = new HashMap<String, Object>();
								msg.put("scores", ss);
							} else {
								msg = new HashMap<String, Object>();
								msg.put("01", "成绩单没有内容上传");
								return msg;
							}

						} else {
							msg = new HashMap<String, Object>();
							msg.put("01", "成绩单没有内容");
							return msg;
						}

					} else {
						msg = new HashMap<String, Object>();
						msg.put("01", "成绩单没有内容");
						return msg;
					}

				} catch (Exception e) {
					e.printStackTrace();
					msg = new HashMap<String, Object>();
					msg.put("01", "成绩单解析错误");
				}

			} catch (Exception e) {
				e.printStackTrace();
			}

		}

		return msg;

	}

	private boolean isDouble(String str) {
		try {
			Double.parseDouble(str);
			return true;
		} catch (NumberFormatException ex) {
		}

		return false;
	}

	private boolean isInteger(String str) {
		try {
			Integer.parseInt(str);
			return true;
		} catch (NumberFormatException ex) {
		}

		return false;
	}

	@RequestMapping("/toSendScoreInputWin")
	public String toSendScoreInputWin(Model model, Map<String, Object> params, HttpServletRequest request,int schoolCode, String examInsId, String classId, String visibleState,
			String examType,String examInsName,String schoolName,int grade,String className,String courseCode,String courseName) {
		model.addAttribute("ctx", request.getContextPath());
		model.addAttribute("schoolCode", schoolCode);
		model.addAttribute("examInsId", examInsId);
		model.addAttribute("classId", classId);
		model.addAttribute("visibleState", visibleState);
		model.addAttribute("visibleState", visibleState);
		model.addAttribute("examType", examType);
		model.addAttribute("examInsName", examInsName);
		model.addAttribute("schoolName", schoolName);
		model.addAttribute("grade", grade);
		model.addAttribute("className", className);
		model.addAttribute("courseCode", courseCode);
		model.addAttribute("courseName", courseName);
		Double scienceScore = scoreManageService.findScienceScore(Integer.valueOf(classId), Integer.valueOf(examInsId));
		Double artsScore = scoreManageService.findArtsScore(Integer.valueOf(classId), Integer.valueOf(examInsId));
		String classRemark = scoreManageService.findClassRemark(Integer.valueOf(examInsId), Integer.valueOf(classId));
		int science = 0;
		int arts = 0;
		if(scienceScore != null && scienceScore > 0) {
			science = 1;
		}
		if(artsScore != null && artsScore > 0) {
			arts = 1;
		}
		if(classRemark != null && !"".equals(classRemark)) {
			model.addAttribute("classRemark", 1);
		}else {
			model.addAttribute("classRemark", 0);
		}
		model.addAttribute("arts", arts);
		model.addAttribute("science", science);
		return "score/send-score-select";
	}

	@ResponseBody
	@RequestMapping("/scoreManage/sendScoreInput")
	public BaseRet<String> sendScoreInput(@RequestBody SendScore sendScore) {

		BaseRet<String> rs = new BaseRet<String>();
		rs.setCode(Constant.RetCode.SUCCESS);
	
		try {
			//保存老师发送成绩时勾选的选项和考试信息
			//scoreManageService.saveScoresendopt(sendScore);
			if (sendScore.getSchoolCode() >= 1 && sendScore.getSchoolCode() <= 5) {
				sendAppid = this.sendAppidJinjiang;
				agentId = this.agentIdJinjiang;
				sendSecret = this.sendSecretJinjiang;
			} else if (sendScore.getSchoolCode() >= 6 && sendScore.getSchoolCode() <= 9) {
				sendAppid = this.sendAppidChenghua;
				agentId = this.agentIdChenghua;
				sendSecret = this.sendSecretChenghua;
			} else if (sendScore.getSchoolCode() >= 10 && sendScore.getSchoolCode() <= 13) {
				sendAppid = this.sendAppidPixian;
				agentId = this.agentIdPixian;
				sendSecret = this.sendSecretPixian;
			} else if (sendScore.getSchoolCode() >= 14 && sendScore.getSchoolCode() <= 17) {
				sendAppid = this.sendAppidBeicheng;
				agentId = this.agentIdBeicheng;
				sendSecret = this.sendSecretBeicheng;
			} else if (sendScore.getSchoolCode() >= 18 && sendScore.getSchoolCode() <= 21) {
				sendAppid = this.sendAppidDazhou;
				agentId = this.agentIdDazhou;
				sendSecret = this.sendSecretDazhou;
			} else if (sendScore.getSchoolCode() >= 22 && sendScore.getSchoolCode() <= 25) {
				sendAppid = this.sendAppidDujiangyan;
				agentId = this.agentIdDujiangyan;
				sendSecret = this.sendSecretDujiangyan;
			}

			String msgCode = UUID.randomUUID().toString();

			Sms sms = new Sms("0", sendAppid, sendSecret, agentId, msgCode);

			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			sms.setSendTeacherId(String.valueOf(user.getTeacherId()));
			sms.setSendTeacherName(user.getTeacherName());

			scoreNoticeService.sendScoreNoticeByApi(sms, sendScore, sendShortMsgUrl, sendWxUrl);

			ObjectMapper mapper = new ObjectMapper();
			String msg = mapper.writeValueAsString(sendScore);

			/*
			 * String strTypes[]=types.split(","); String
			 * sendCondition="{\"order\":"+strTypes[0]+",\"avg\":"+strTypes[1]+
			 * ",\"topScore\":"+strTypes[2]+"}";
			*/ 
			logger.info("send state : " + msg);
			// 更新发送状态
			scoreManageService.updateExamClassMsgCode(Integer.valueOf(sendScore.getExamInsId()),
					Integer.valueOf(sendScore.getClassId()), msgCode, "1", msg);
		} catch (Exception e) {
			logger.info(e.getMessage());
			rs.setCode(Constant.RetCode.ERROR);
		}

		return rs;
	}

	@RequestMapping("/toScoreRemarkPage")
	public String toScoreRemarkPage(Model model, Map<String, Object> params, HttpServletRequest request,String examInsId,String classId) {
		model.addAttribute("ctx", request.getContextPath());
		model.addAttribute("examInsId", examInsId);
		model.addAttribute("classId", classId);
		params.put("id", MenuId.SCORE_NOTICE);
		return "score/score-input-remark";
	}

	@ResponseBody
	@RequestMapping("/scoreManage/findScoreRemarkTypeByState")
	public List<Dict> findScoreRemarkTypeByState(String stateCode) {

		List<Dict> list = scoreManageService.findScoreRemarkTypeByState(stateCode);

		if (list != null && list.size() > 0) {
			list.get(0).setSelected(true);
		}

		return list;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/findScoreRemarkLevelByType")
	public List<Dict> findScoreRemarkLevelByType(String typeCode) {

		List<Dict> list = scoreManageService.findScoreRemarkLevelByType(typeCode);

		if (list != null && list.size() > 0) {
			list.get(0).setSelected(true);
		}

		return list;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/findScoreRemarkCommentByLevel")
	public BaseRet<PageData<List<Dict>>> findScoreRemarkCommentByLevel(String levelCode) {

		BaseRet<PageData<List<Dict>>> rs = new BaseRet<PageData<List<Dict>>>();
		rs.setCode(Constant.RetCode.SUCCESS);

		List<Dict> list = scoreManageService.findScoreRemarkCommentByLevel(levelCode);
		PageData<List<Dict>> page = new PageData<List<Dict>>();
		page.setRows(list);
		page.setTotal(list.size());
		rs.setData(page);
		return rs;

	}

	@RequestMapping(value = "/scoreManage/downloadScoreTemplate")
	public void downLoadStudents(HttpServletResponse response, String schoolCode, String grade, String classId,
			String scoreMulti, String scoreSection) {
		logger.info("=============scoreSection=>>>>>>>>>>>" + scoreSection);
		try {

			List<Student> sts = scoreUploadService.findStudents(classId, grade, schoolCode);
			response.setContentType("application/vnd.ms-excel;charset=utf-8");
			response.setHeader("Content-Disposition", "attachment;filename=" + classId + ".xls");
			// 创建工作薄
			OutputStream os = response.getOutputStream();
			WritableWorkbook workbook = Workbook.createWorkbook(os);
			// 创建新的一页
			WritableSheet sheet = workbook.createSheet("First Sheet", 0);
			// 创建要显示的内容,创建一个单元格，第一个参数为列坐标，第二个参数为行坐标，第三个参数为内容
			/*
			 * Label idCardNumber = new Label(0,0,"身份证号码");
			 * sheet.addCell(idCardNumber); Label sname = new Label(1,0,"学生姓名");
			 * sheet.addCell(sname); Label score = new Label(2,0,"分数");
			 */

			Label scode = new Label(0, 0, "学生编号 ");
			sheet.addCell(scode);
			Label sname = new Label(1, 0, "学生姓名");
			sheet.addCell(sname);

			if ("1".equals(scoreSection)) {
				if ("1".equals(scoreMulti)) {
					Label scoreMultiName = new Label(2, 0, "语文");
					sheet.addCell(scoreMultiName);
					Label scoreA = new Label(2, 1, "分数");
					sheet.addCell(scoreA);

					Label scoreMultiNameA = new Label(3, 0, "数学");
					Label scoreMultiNameB = new Label(4, 0, "数学");
					sheet.addCell(scoreMultiNameA);
					sheet.addCell(scoreMultiNameB);
					Label scoreC = new Label(3, 1, "A卷分数");
					sheet.addCell(scoreC);
					Label scoreD = new Label(4, 1, "B卷分数");
					sheet.addCell(scoreD);
				} else {
					Label scoreOneName = new Label(2, 0, "语文");
					sheet.addCell(scoreOneName);
					Label score = new Label(2, 1, "分数");
					sheet.addCell(score);

					Label scoreOneNameA = new Label(3, 0, "数学");
					sheet.addCell(scoreOneNameA);
					Label scoreA = new Label(3, 1, "分数");
					sheet.addCell(scoreA);
				}
			} else {
				if ("1".equals(scoreMulti)) {
					Label scoreA = new Label(2, 0, "A卷分数");
					sheet.addCell(scoreA);
					Label scoreB = new Label(3, 0, "B卷分数");
					sheet.addCell(scoreB);
				} else {
					Label score = new Label(2, 0, "分数");
					sheet.addCell(score);
				}
			}

			if (sts != null && sts.size() > 0) {

				sts = sortStudents(sts);
				if ("1".equals(scoreSection)) {
					int x = 1;
					for (int i = 0; i < sts.size(); i++) {
						Label studentCode = new Label(0, x + 1, sts.get(i).getStudentCode());
						sheet.addCell(studentCode);
						Label studentName = new Label(1, x + 1, sts.get(i).getName());
						sheet.addCell(studentName);
						x++;
					}
				} else {
					for (int i = 0; i < sts.size(); i++) {
						Label studentCode = new Label(0, i + 1, sts.get(i).getStudentCode());
						sheet.addCell(studentCode);
						Label studentName = new Label(1, i + 1, sts.get(i).getName());
						sheet.addCell(studentName);
					}
				}

			}

			workbook.write();
			workbook.close();
			os.flush();
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private List<WtrjStudent> sortWtrjStudents(List<WtrjStudent> stus) {

		if (stus.size() < 2) {
			return stus;
		}

		WtrjStudent[] stuArry = new WtrjStudent[stus.size()];

		for (int i = 0; i < stus.size(); i++) {
			stuArry[i] = stus.get(i);
			System.out.println(i + " : " + stus.get(i));
		}

		WtrjStudent temp = null;
		WtrjStudent stuj = null;
		WtrjStudent stuj1 = null;

		System.out.println(" -------------------------------------- ");

		for (int i = 0; i < stuArry.length - 1; i++) {

			for (int j = 0; j < stuArry.length - i - 1; j++) {

				stuj = stuArry[j];
				stuj1 = stuArry[j + 1];

				if (StringUtils.isNotBlank(stuj.getStudentCode()) && StringUtils.isNotBlank(stuj1.getStudentCode())
						&& !"null".equals(stuj.getStudentCode()) && !"null".equals(stuj1.getStudentCode())) {

					if (Integer.valueOf(stuj.getStudentCode()) > Integer.valueOf(stuj1.getStudentCode())) {
						temp = stuj;
						stuArry[j] = stuj1;
						stuArry[j + 1] = stuj;
					}

				}
			}

		}

		stus = Lists.newArrayList();

		for (int i = 0; i < stuArry.length; i++) {
			stus.add(stuArry[i]);
			System.out.println(i + " : " + stuArry[i]);
		}

		return stus;
	}

	private List<Student> sortStudents(List<Student> stus) {

		if (stus.size() < 2) {
			return stus;
		}

		Student[] stuArry = new Student[stus.size()];

		for (int i = 0; i < stus.size(); i++) {
			stuArry[i] = stus.get(i);
			System.out.println(i + " : " + stus.get(i));
		}

		Student temp = null;
		Student stuj = null;
		Student stuj1 = null;

		System.out.println(" -------------------------------------- ");

		for (int i = 0; i < stuArry.length - 1; i++) {

			for (int j = 0; j < stuArry.length - i - 1; j++) {

				stuj = stuArry[j];
				stuj1 = stuArry[j + 1];

				if (StringUtils.isNotBlank(stuj.getStudentCode()) && StringUtils.isNotBlank(stuj1.getStudentCode())
						&& !"null".equals(stuj.getStudentCode()) && !"null".equals(stuj1.getStudentCode())) {

					if (Integer.valueOf(stuj.getStudentCode()) > Integer.valueOf(stuj1.getStudentCode())) {
						temp = stuj;
						stuArry[j] = stuj1;
						stuArry[j + 1] = stuj;
					}

				}
			}

		}

		stus = Lists.newArrayList();

		for (int i = 0; i < stuArry.length; i++) {
			stus.add(stuArry[i]);
			// System.out.println(i+ " : " +stuArry[i]);
		}

		return stus;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/isOnlyRenKe")
	public boolean isOnlyRenKe(String schoolCode, int stage, int grade, int classId) {

		// 获取所有角色
		List<TeacherRole> roles = findRoles(schoolCode, stage);

		if (roles != null && roles.size() > 0) {

			for (TeacherRole role : roles) {
				// 学部领导，教研组长，备课组长,年级组长
				if (role.isAllGrade() || role.isAllClass()) {
					return false;
				}
				// 班主任或年级组长
				if (role.isAllCourse()) {
					return false;
				}
			}

		}

		return true;
	}

	// 查找班主任的班级
	@ResponseBody
	@RequestMapping("/scoreManage/isBzr")
	public boolean isBzr(String schoolCode, int stage, int grade, int classId) {

		// 获取所有角色
		List<TeacherRole> roles = findRoles(schoolCode, stage);

		if (roles != null && roles.size() > 0) {

			for (TeacherRole role : roles) {
				if ("1".equals(role.getType())) {
					List<TeacherClass> cls = role.getClasses().get(grade);

					if (cls != null && cls.size() > 0) {
						for (TeacherClass c : cls) {
							if (c.getId() == classId) {
								return true;
							}
						}
					}
				}
			}
		}

		return false;
	}

	@ResponseBody
	@RequestMapping("/scoreManage/isCreateGrade")
	public boolean isCreateGrade(String schoolCode, int stage, int grade) {

		// 获取所有角色
		List<TeacherRole> roles = findRoles(schoolCode, stage);

		if (roles != null && roles.size() > 0) {

			for (TeacherRole role : roles) {
				if (role.isAllGrade()) {
					return true;
				} else {
					if ("5".equals(role.getType())) {
						List<Integer> grades = role.getGrades();

						if (grades != null && grades.size() > 0) {
							for (Integer g : grades) {
								if (g == grade) {
									return true;
								}
							}
						}

					}
				}
			}
		}

		return false;
	}
	
	/**
	 * 班级汇总线程回调
	 * @param job
	 */
	@ResponseBody
	@RequestMapping("/scoreManage/scoreFallback")
	public int scoreSum(@RequestBody Job job) {
		try {
			JSONObject param = JSONObject.fromObject(job.getParams());
			logger.error(param);
			boolean bool = param.containsKey("classRemark");
				String classRemark = "";
				
				if(bool) {
					classRemark = param.getString("classRemark");
				}
				logger.error("执行回调时间："+new Date());
				scoreUploadService.sumScore(param.getString("classId"),param.getString("examInsId"),classRemark);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("执行回调时间："+new Date());
			logger.error("执行汇总方法报错：",e);
			return 500;
		}
		return 200;
	}
	/**
	 * 年级汇总线程回调
	 * @param job
	 */
	@ResponseBody
	@RequestMapping("/scoreManage/scoreGradeFallback")
	public boolean gradeScoreSum(@RequestBody Job job) {
		try {
			JSONObject param = JSONObject.fromObject(job.getParams());
			scoreManageService.countGradeOrder(param.getInt("stage"), param.getInt("grade"), param.getInt("examInsId"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return false;
		}
		return true;
	}
}
