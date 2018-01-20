package cn.com.wtrj.jx.web.portal.controller.plan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.common.Constant.RetCode;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.PreviewScoreRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreDetail;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreSum;
import cn.com.wtrj.jx.web.portal.service.ScoreNoticeService;
import cn.com.wtrj.jx.web.portal.service.ScoreUploadService;
import cn.com.wtrj.jx.web.portal.service.TeacherService;
import cn.com.wtrj.jx.web.portal.service.dto.Role;
import cn.com.wtrj.jx.web.portal.service.dto.School;
import cn.com.wtrj.jx.web.portal.service.dto.SchoolClass;
import cn.com.wtrj.jx.web.portal.service.dto.Score;
import cn.com.wtrj.jx.web.portal.service.dto.Sms;
import cn.com.wtrj.jx.web.portal.service.dto.UserPermission;

@Controller
@RequestMapping("/")
public class ScoreNoticeController extends BaseController {
	
	private Logger logger = Logger.getLogger(ScoreNoticeController.class);
	
    private final static ScheduledExecutorService msScheduler = Executors.newScheduledThreadPool(10); 

	@Value("${file_server_path}")
	private String fileServerPath;

	@Value("${upload.file.relative.path}")
	private String relativePath;
	
	@Value("${sms_shortmessage_send_api}")
	private String sm_send_api;
	
	@Value("${sms_wx_send_api}")
	private String wx_send_api;
	
	// ▼▼UPD NO20171001--发送方式修改 20171005 wusm
	//	/**
	//	 * 短信发送代理商地址
	//	 */
	//	@Value("${sms_url}")
	//	private String smsUrl;
	//
	//	/**
	//	 * 短信发送类型 0：通知短信，4：验证码短信，5：营销短信
	//	 */
	//	@Value("${sms_type}")
	//	private String smsType;
	//
	//	/**
	//	 * 短信客户id
	//	 */
	//	@Value("${sms_client_id}")
	//	private String smsClientId;
	//
	//	/**
	//	 * 短信客户密码
	//	 */
	//	@Value("${sms_password}")
	//	private String smsPassword;
	//
		/**
		 * 短信发送开关
		 */
		@Value("${sms_send_flag}")
		private Boolean smsSendFlag;
	//
	//	/**
	//	 * 短信发送阈值
	//	 */
	//	private Integer smsSendCount;
	
	@Value("${sms_wx_send_api}")
	private String sendWxUrl;
	
	@Value("${sms_shortmessage_send_api}")
	private String sendShortMsgUrl;
	//▲▲UPD NO20171001
	
	private String sendAppid;
	
	private String sendSecret;
	
	private Integer agentId;
	
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
	private ScoreNoticeService scoreNoticeService;

	@Autowired
	private ScoreUploadService scoreUploadService;
	
	@Autowired
	private TeacherService teacherService;

	// 跳转到成绩通知界面
	@RequestMapping(value = "/toScoreNotice")
	public String toScoreNotice(HttpServletRequest request, Model model, Map<String, Object> m) {
		
		String schoolCode = null;
		//查询教师学校信息
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		List<School> usList = teacherService.findUserSchools(user.getTeacherId());
		
		if(usList != null && usList.size() > 0) {
			schoolCode = usList.get(0).getCode();
			model.addAttribute("schools", usList);
		}
		
		if(StringUtils.isNotBlank(schoolCode)) {
			model.addAttribute("schoolCode", schoolCode);
			
			//查询教师学部信息
			List<String> stages = findStagesBySchoolCode(schoolCode);
			
			if(stages != null && stages.size() >0) {
				
				model.addAttribute("stages", stages);
				
				String stage = stages.get(0);
				
				List<String> grades = findGradesByStage(schoolCode, stage);
				
				if(grades != null && grades.size() >0) {
					
					model.addAttribute("grades", grades);
					
					String grade = grades.get(0);
					
					List<SchoolClass> classes = findClassesByGrade(schoolCode, stage, grade);
					
					model.addAttribute("classes", classes);
					
					if(classes != null && classes.size() >0) {
						List<Role> roles = teacherService.findTeacherRoleTypes(user.getTeacherId(), schoolCode);
						
						List<Score> ss = null;
						
						if(roles != null && roles.size() >0) {
							
							boolean bzr = false;
							boolean full = false;
							
							Role role = null;
							
							for(Role r : roles) {
								//班主任以上权限
								if("2".equals(r.getId()) || "3".equals(r.getId()) || "4".equals(r.getId()) || "6".equals(r.getId())) {
									full = true;
								}
								
								//班主任
								if("5".equals(r.getId())) {
									bzr = true;
									role = r;
								}
							}
							
							if(full) {
								ss = scoreUploadService.findScoreMultiInsByClassId(classes.get(0).getClassId());
							}
							else if(bzr && role != null && role.getClasses() != null && role.getClasses().size() >0) {
								if(role.getClasses().contains(classes.get(0).getClassId())) {
									ss = scoreUploadService.findScoreMultiInsByClassId(classes.get(0).getClassId());
								}
							}
						}
					}
				}
			}

		}
		model.addAttribute("fileServerPath", fileServerPath);
		model.addAttribute("relativePath", relativePath);
		m.put("id", MenuId.SCORE_NOTICE);

		doCommonSetting(m);

		return "plan/score-notice";
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
	
	//跳转到单科成绩界面
	@RequestMapping(value = "/toScoreOnlyOne")
	public String toScoreOnlyOne(HttpServletRequest request, Model model, Map<String, Object> m) {
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");

		List<TeacherPermission> classes = scoreNoticeService.findRkTeacherClasses(user.getTeacherId());
		model.addAttribute("classes", classes);
		model.addAttribute("fileServerPath", fileServerPath);
		model.addAttribute("relativePath", relativePath);
		

		/*if (classes != null && classes.size() > 0) {
//			TeacherPermission tp = classes.get(0);
//			List<Score> ss = scoreUploadService.findScoreUploadInsByClassId(String.valueOf(tp.getClassId()));
			List<String> classIds = new ArrayList<String>();
			for (TeacherPermission p : classes) {
				classIds.add(String.valueOf(p.getClassId()));
			}
			List<Score> ss = scoreUploadService.findScoreUploadInsByClassIdList(classIds);
			
			model.addAttribute("inses", ss);
		}*/

		//m.put("id", MenuId.SCORE_NOTICE);

		doCommonSetting(m);

		return "plan/score-onlyOne";
	}
	
	@RequestMapping("/notice/findExamInsByClassId")
	@ResponseBody
	public List<Score> findExamInsByClassId(String schoolCode, String classId) {
		
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		
		List<Role> roles = teacherService.findTeacherRoleTypes(user.getTeacherId(), schoolCode);
		
		List<Score> ss = null;
		
		if(roles != null && roles.size() >0) {
			
			boolean bzr = false;
			boolean full = false;
			
			Role role = null;
			
			for(Role r : roles) {
				//班主任以上权限
				if("2".equals(r.getId()) || "3".equals(r.getId()) || "4".equals(r.getId()) || "6".equals(r.getId())) {
					full = true;
				}
				
				//班主任
				if("5".equals(r.getId())) {
					bzr = true;
					role = r;
				}
			}
			
			if(full) {
				ss = scoreUploadService.findScoreMultiInsByClassId(classId);
			}
			else if(bzr && role != null && role.getClasses() != null && role.getClasses().size() >0) {
				if(role.getClasses().contains(classId)) {
					ss = scoreUploadService.findScoreMultiInsByClassId(classId);
				}
			}
			
		}
		
		
		return ss;
	}
	
	// 跳转到成绩预览界面
	@RequestMapping(value = "/toScoreNoticePreview")
	public String toScoreNoticePreview(HttpServletRequest request, Model model, Map<String, Object> m, @RequestParam(value="insId")String insId, @RequestParam(value="classId")String classId) {
		m.put("insId", insId);
		m.put("classId", classId);
		return "plan/score-notice-preview";
	}
	//跳转到单科成绩预览界面
	@RequestMapping(value = "/toScoreSingerPreview")
	public String toScoreSingerPreview(HttpServletRequest request, Model model, Map<String, Object> m, @RequestParam(value="insId")String insId, @RequestParam(value="classId")String classId,
			@RequestParam(value="courseCode")String courseCode) {
		m.put("insId", insId);
		m.put("classId", classId);
		m.put("courseCode", courseCode);
		return "plan/score-singer-preview";
	}
	
	@RequestMapping("/searchPreviewScore")
	@ResponseBody
	public List<PreviewScoreRet> searchPreviewScore(@RequestParam(value="insId") String insId, @RequestParam(value="classId") String classId) {
		logger.info("学生成绩汇总预览查询 开始");
		List<PreviewScoreRet> rs = new ArrayList<PreviewScoreRet>();
		try {
			
			DozerBeanMapper mapper = new DozerBeanMapper();
			List<WtrjRptScoreDetail> details = null;
			List<WtrjRptScoreSum> dtos = scoreNoticeService.findScoreSum(classId, insId);
			
				details = scoreNoticeService.findScoreDetail(Integer.valueOf(classId), Integer.valueOf(insId));
			
			
			Map<String, String> scoreMap = new HashMap<String, String>();
			for (WtrjRptScoreDetail detail : details) {
				String ps = scoreMap.get(detail.getStudentName());
				
				ps = (ps==null?"":ps) + "[" + detail.getCourseName() + ":" + detail.getScore()+"]";
				
				scoreMap.put(detail.getStudentName(), ps);
			}
			
			for (WtrjRptScoreSum dto : dtos) {
				PreviewScoreRet r = new PreviewScoreRet();
				mapper.map(dto, r);
				r.setCourseScore(scoreMap.get(r.getName()));
				
				rs.add(r);
			}
			logger.debug("数据查询结果："+dtos.size());
		} catch (Exception e) {
			logger.error("学生成绩汇总预览查询 异常", e);
		}
		
		logger.info("学生成绩汇总预览查询 结束");
		return rs;
	}
	@RequestMapping("/searchSingerPreviewScore")
	@ResponseBody
	public List<Score> searchSingerPreviewScore(@RequestParam(value="insId")String insId,@RequestParam(value="classId")String classId,@RequestParam(value="courseCode")String courseCode){
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		Score score = new Score();
		score.setClassId(classId);
		score.setCourseCode(courseCode);
		score.setExamInsId(insId);
		score.setTeacherId(user.getTeacherId().toString());
		List<Score> scores = scoreUploadService.findSingleCourse(score);
		//查询最高分
		Integer avgScore = scoreUploadService.findClassAvgScore(score);
		//查询平均分
		Integer topScore = scoreUploadService.findClassTopScore(score);
		//为每个学生添加最高分和平均分
		if(scores != null && scores.size() > 0) {
			for(int i = 0; i < scores.size(); i++) {
				scores.get(i).setAverageNumber(avgScore);
				scores.get(i).setClassTopScore(topScore);
			}
		}
		
		return scores;
		
	}
	

	// 获取模板分页查询
	@RequestMapping(value = "/pageScoreNotice")
	@ResponseBody
	public PageData<List<Score>> pageScoreNotice(PageSearchParam param, String insId, String classId, HttpServletRequest request,
			Model model) {
		List<Score> ss = null;
		
		PageData<List<Score>> ret = new PageData<List<Score>>();
		int start = param.getOffset() + 1;
		int end = param.getOffset() + param.getLimit();
		
		
			ss = scoreUploadService.findScoreUploadInfosByClassAndIns(start, end, classId, insId);
		
			int count = scoreUploadService.findScoreUploadCountByClassAndIns(classId, insId);
			
			ret.setRows(ss);
			ret.setTotal(count);
			
		return ret;
	}
	@RequestMapping(value = "/pageScoreSinger")
	@ResponseBody
	public List<Score> pageScoreSinger(PageSearchParam param, String insId, String classId, HttpServletRequest request,
			Model model) {
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		String teacherId = user.getTeacherId().toString();
		List<Score> ss = scoreUploadService.findScoreUploadInfosByClass(classId,teacherId);
		
		return ss;
	}

	@RequestMapping(value = "/sendScoreSingle")
	@ResponseBody
	public BaseRet<String> sendScoreSingle(@RequestParam(value="insId")String insId,@RequestParam(value="classId")String classId,@RequestParam(value="courseCode")String courseCode,@RequestParam(value="types")String types, HttpServletRequest request,
			Model model) {
		BaseRet<String> rs = new BaseRet<String>();
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
		
		Score score = new Score();
		score.setExamInsId(insId);
		score.setClassId(classId);
		score.setCourseCode(courseCode);
		score.setTeacherId(String.valueOf(user.getTeacherId()));
		//平均分
		Integer avgScore = scoreUploadService.findClassAvgScore(score);
		//最高分
		Integer topScore = scoreUploadService.findClassTopScore(score);
		
		if(score != null) {
			try {
				String sc = scoreNoticeService.searchSchoolCodeByExamInsId(Integer.valueOf(insId));
				Integer schoolCode = Integer.valueOf(sc);
				if (schoolCode >=1 && schoolCode <=5) {
					sendAppid = this.sendAppidJinjiang;
					agentId = this.agentIdJinjiang;
					sendSecret = this.sendSecretJinjiang;
				} else if (schoolCode >=6 && schoolCode <=9) {
					sendAppid = this.sendAppidChenghua;
					agentId = this.agentIdChenghua;
					sendSecret = this.sendSecretChenghua;
				} else if (schoolCode >=10 && schoolCode <=13) {
					sendAppid = this.sendAppidPixian;
					agentId = this.agentIdPixian;
					sendSecret = this.sendSecretPixian;
				} else if (schoolCode >=14 && schoolCode <=17) {
					sendAppid = this.sendAppidBeicheng;
					agentId = this.agentIdBeicheng;
					sendSecret = this.sendSecretBeicheng;
				} else if (schoolCode >=18 && schoolCode <=21) {
					sendAppid = this.sendAppidDazhou;
					agentId = this.agentIdDazhou;
					sendSecret = this.sendSecretDazhou;
				} else if (schoolCode >=22 && schoolCode <=25) {
					sendAppid = this.sendAppidDujiangyan;
					agentId = this.agentIdDujiangyan;
					sendSecret = this.sendSecretDujiangyan;
				}
				
				Sms sms = new Sms("0",sendAppid, sendSecret, agentId,"");
				
				score.setTeacherId(String.valueOf(user.getTeacherId()));
				score.setTeacherName(user.getTeacherName());
				score.setAverageNumber(avgScore);
				score.setClassTopScore(topScore);
				sms.setSendTeacherId(String.valueOf(user.getTeacherId()));
				sms.setSendTeacherName(user.getTeacherName());
				scoreNoticeService.sendScoreSingle(sms, score,types);
				
				// ▼▼DEL NO20171001--发送方式修改 20171005 wusm
				//				List<Score> scores = scoreUploadService.findSingleCourse(score);
				//
				//				//为每个学生添加最高分和平均分
				//				if(scores != null && scores.size() > 0) {
				//					for(int i = 0; i < scores.size(); i++) {
				//						scores.get(i).setAverageNumber(avgScore);
				//						scores.get(i).setClassTopScore(topScore);
				//					}
				//				}
				//				
				//				if(scores != null && scores.size() >0) {
				//					
				//					List<Map<String, String>> list = new ArrayList<>();
				//					boolean order = false;
				//					boolean avg = false;
				//					boolean top = false;
				//					
				//					if(StringUtils.isNotBlank(types)) {
				//						String [] ts = types.split(",");
				//						order = Boolean.valueOf(ts[0]);
				//						avg = Boolean.valueOf(ts[1]);
				//						top = Boolean.valueOf(ts[2]);
				//					}
				//					for(Score s : scores) {
				//						
				//						List<String> phones = scoreNoticeService.findParentPhoneByStudentNameAndClassId(s.getStudentName(), s.getClassId());
				//						
				//						if(phones != null && phones.size() > 0) {
				//							
				//							for(String phone : phones) {
				//								Map<String, String> map =  new HashMap<String, String>();
				//								
				//								StringBuilder sb = new StringBuilder();
				////								sb.append("【维睿教育社区】 ").append(s.getStudentName()).append("在 [ ").append(s.getExamInsName()).append(" ] ").append(s.getCourseName());
				////								sb.append(" 成绩为: ").append(s.getScore()).append(", 满分为: ").append(s.getFullScore());
				//								sb.append("【维睿教育社区】 ").append(s.getStudentName()).append("在 [ ");
				////								sb.append(s.getExamInsName())
				//								sb.append(s.getClassName()).append(" ").append(s.getTypeName());
				//								sb.append(" ] 考试中，").append(s.getCourseName());
				//								sb.append(" 成绩为: ").append(s.getScore()).append(", 满分为: ").append(s.getFullScore());
				//								//黄文静在【5月月考】成绩总分：435，语文：104，数学：134，英语：140，物理：57，班级最高分：435
				//								if(order) {
				//									sb.append("，班级排名：").append(s.getOrderNumber());
				//								}
				//								
				//								if(avg) {
				//									sb.append("，班级平均分：").append(s.getAverageNumber());
				//								}
				//								
				//								if(top) {
				//									sb.append("，班级最高分：").append(s.getClassTopScore());
				//								}
				//								//sb.append("，班级最高分：").append(s.getClassTopScore());
				//								
				//								//map.put("title", "考试成绩通知");
				//								map.put("content", sb.toString());
				//								map.put("toUser", phone);
				//								
				//								list.add(map);
				//							}
				//							
				//						}
				//						
				//						
				//					}
				//					
				//					
				//					String sc = scoreNoticeService.searchSchoolCodeByExamInsId(Integer.valueOf(insId));
				//					Integer schoolCode = Integer.valueOf(sc);
				//					if (schoolCode >=1 && schoolCode <=5) {
				//						sendAppid = this.sendAppidJinjiang;
				//						agentId = this.agentIdJinjiang;
				//						sendSecret = this.sendSecretJinjiang;
				//					} else if (schoolCode >=6 && schoolCode <=9) {
				//						sendAppid = this.sendAppidChenghua;
				//						agentId = this.agentIdChenghua;
				//						sendSecret = this.sendSecretChenghua;
				//					} else if (schoolCode >=10 && schoolCode <=13) {
				//						sendAppid = this.sendAppidPixian;
				//						agentId = this.agentIdPixian;
				//						sendSecret = this.sendSecretPixian;
				//					} else if (schoolCode >=14 && schoolCode <=17) {
				//						sendAppid = this.sendAppidBeicheng;
				//						agentId = this.agentIdBeicheng;
				//						sendSecret = this.sendSecretBeicheng;
				//					} else if (schoolCode >=18 && schoolCode <=21) {
				//						sendAppid = this.sendAppidDazhou;
				//						agentId = this.agentIdDazhou;
				//						sendSecret = this.sendSecretDazhou;
				//					} else if (schoolCode >=22 && schoolCode <=25) {
				//						sendAppid = this.sendAppidDujiangyan;
				//						agentId = this.agentIdDujiangyan;
				//						sendSecret = this.sendSecretDujiangyan;
				//					}
				//					
				//					sendWx(sendAppid, sendSecret, agentId, list);
				//
				//					logger.info("  -- sms --  单科成绩成绩["+scores.get(0).getExamInsName()+"]发送通知,发送人: " + scores.get(0).getTeacherName());
				//					
				//				}
			    //▲▲DEL NO20171001--发送方式修改	
				rs.setCode(Constant.RetCode.SUCCESS);
			}
			catch (Exception e) {
				logger.info(e.getMessage());
				
				rs.setCode(Constant.RetCode.ERROR);
			}
		}
		
		return rs;
	}
	
	@RequestMapping(value = "/sendScoreSum")
	@ResponseBody
	public BaseRet<String> sendScoreSum(String insId, String classId, String types, HttpServletRequest request,
			Model model) {
		BaseRet<String> rs = new BaseRet<String>();
		
		try {
			String sc = scoreNoticeService.searchSchoolCodeByExamInsId(Integer.valueOf(insId));
			Integer schoolCode = Integer.valueOf(sc);
			if (schoolCode >=1 && schoolCode <=5) {
				sendAppid = this.sendAppidJinjiang;
				agentId = this.agentIdJinjiang;
				sendSecret = this.sendSecretJinjiang;
			} else if (schoolCode >=6 && schoolCode <=9) {
				sendAppid = this.sendAppidChenghua;
				agentId = this.agentIdChenghua;
				sendSecret = this.sendSecretChenghua;
			} else if (schoolCode >=10 && schoolCode <=13) {
				sendAppid = this.sendAppidPixian;
				agentId = this.agentIdPixian;
				sendSecret = this.sendSecretPixian;
			} else if (schoolCode >=14 && schoolCode <=17) {
				sendAppid = this.sendAppidBeicheng;
				agentId = this.agentIdBeicheng;
				sendSecret = this.sendSecretBeicheng;
			} else if (schoolCode >=18 && schoolCode <=21) {
				sendAppid = this.sendAppidDazhou;
				agentId = this.agentIdDazhou;
				sendSecret = this.sendSecretDazhou;
			} else if (schoolCode >=22 && schoolCode <=25) {
				sendAppid = this.sendAppidDujiangyan;
				agentId = this.agentIdDujiangyan;
				sendSecret = this.sendSecretDujiangyan;
			}
			
			Sms sms = new Sms("0", sendAppid, sendSecret, agentId, "");
			
			
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			sms.setSendTeacherId(String.valueOf(user.getTeacherId()));
			sms.setSendTeacherName(user.getTeacherName());
			//▼▼UPD NO20171001--发送方式修改 20171005 wusm
			// scoreNoticeService.sendScoreSumSmsByClassAndExamIns(sms, classId, insId, types);
			//scoreNoticeService.sendScoreNoticeByApi(sms, classId, insId, types, sendShortMsgUrl, sendWxUrl);
			//▲▲UPD NO20171001
			
			// ▼▼DEL NO20171001--发送方式修改 20171005 wusm
			//			List<Score> scores = scoreNoticeService.findScoreSumByClassAndExamIns(classId, insId);
			//			
			//	        if(scores != null && scores.size() >0) {
			//				
			//				List<Map<String, String>> list = new ArrayList<>();
			//				
			//				boolean order = false;
			//				boolean avg = false;
			//				boolean top = false;
			//				
			//				if(StringUtils.isNotBlank(types)) {
			//					String [] ts = types.split(",");
			//					order = Boolean.valueOf(ts[0]);
			//					avg = Boolean.valueOf(ts[1]);
			//					top = Boolean.valueOf(ts[2]);
			//				}
			//				
			//				for(Score s : scores) {
			//					
			//					Map<String, String> map = new HashMap<String, String>();
			//					
			//					List<Score> ssList = scoreNoticeService.findStudentDetailScore(s.getClassId(), s.getExamInsId(), s.getName());
			//					
			//					StringBuilder sb = new StringBuilder();
			////					sb.append("【维睿教育社区】 ").append(s.getName()).append("在【").append(s.getExamInsName()).append("】成绩总分：").append(s.getSumNumber());
			////					sb.append("，").append("考试满分为：").append(s.getFullScore());
			//					sb.append("【维睿教育社区】 ").append(s.getName()).append("在 [ ");
			//					//sb.append(s.getExamInsName());
			//					sb.append(s.getClassName()).append(" ").append(s.getTypeName());
			//					sb.append(" ] 考试中， 成绩总分：").append(s.getSumNumber());
			//					sb.append("，").append("考试满分为：").append(s.getFullScore());
			//					//黄文静在【5月月考】成绩总分：435，语文：104，数学：134，英语：140，物理：57，班级最高分：435
			//					for(Score ss : ssList) {
			//						sb.append("，").append(ss.getCourseName()).append("：").append(ss.getScore());
			//					}
			//					
			//					if(order) {
			//						sb.append("，班级排名：").append(s.getOrderNumber());
			//					}
			//					
			//					if(avg) {
			//						sb.append("，班级平均分：").append(s.getAverageNumber());
			//					}
			//					
			//					if(top) {
			//						sb.append("，班级最高分：").append(s.getClassTopScore());
			//					}
			//					
			//					//sb.append("，班级最高分：").append(s.getClassTopScore());
			//					
			//					//map.put("title", "考试成绩通知");
			//					map.put("content", sb.toString());
			//					map.put("toUser", s.getParentPhone());
			//					
			//					list.add(map);
			//				}
			//				
			//				sendWx(sendAppid, sendSecret, agentId, list);
			//				
			//			}
            //▲▲DEL NO20171001--发送方式修改
			
			rs.setCode(Constant.RetCode.SUCCESS);
		} catch (Exception e) {
			logger.error("成绩通知异常",e);
			rs.setCode(Constant.RetCode.ERROR);
		}
		
		return rs;
	} 
	// ▼▼DEL NO20171001--发送方式修改 20171005 wusm
	//    private void sendWx(String sendAppId, String sendSecret, Integer agentId, List<Map<String, String>> list) {
	//    	Gson gson = new GsonBuilder().create();
	//    	
	//    	Map<String,Object> param = new HashMap<String, Object>();
	//		param.put("sendAppId", sendAppId);
	//		param.put("sendSecret", sendSecret);
	//		param.put("agentId", agentId);
	//		param.put("textMessages", list);
	//		
	//		JsonObject  jsonObject = new JsonObject();
	//		jsonObject.addProperty("sendAppid", sendAppId);
	//		jsonObject.addProperty("sendSecret", sendSecret);
	//		jsonObject.addProperty("agentId", agentId);
	//		
	//		JsonArray array = new JsonArray();
	//		for (Map<String, String> map : list) {
	//			array.add(gson.toJsonTree(map));
	//		}
	//		jsonObject.add("textMessages", array);
	//		
	//		// 微信通知
	//		JsonObject result = HttpRequestUtils.httpPost(wx_send_api, jsonObject);
	//		String errorcode = String.valueOf(result.get("errorcode"));
	//		String errormsg = String.valueOf(result.get("errormsg"));
	//		if (!"0".equals(String.valueOf(result.get("errorcode")))) {
	//			logger.error("调用微信接口失败！[errorcode:"+errorcode+"] [errormsg:"+errormsg+"]");
	//		}
	//	}
    //▲▲DEL NO20171001--发送方式修改
	
	//统计总分
	@RequestMapping(value = "/toSumScore")
	@ResponseBody
	public BaseRet<String> toSumScore(String insId, String classId, Model model) {
		
		BaseRet<String> rs = new BaseRet<String>();
		rs.setCode(Constant.RetCode.SUCCESS);
		
		try {
			scoreUploadService.sumScore(classId, insId,null);
		}
		catch (Exception e) {
			logger.info(e.getMessage());
			rs.setCode(Constant.RetCode.ERROR);
		}
		
		return rs;
	}

}
