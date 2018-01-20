package cn.com.wtrj.jx.web.portal.controller.plan;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.common.base.Strings;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.common.Constant.RetCode;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.plan.FilePlanUploadCol.FileRet;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.Teacher;
import cn.com.wtrj.jx.web.portal.model.entities.TeacherPermission;
import cn.com.wtrj.jx.web.portal.model.entities.User;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreExamIns;
import cn.com.wtrj.jx.web.portal.model.entities.wtrjEdu.WtrjEduPlanTemplates;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtSchoolInfo;
import cn.com.wtrj.jx.web.portal.service.ScoreUploadService;
import cn.com.wtrj.jx.web.portal.service.TeacherService;
import cn.com.wtrj.jx.web.portal.service.common.ITeacherPermissionService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dto.Grade;
import cn.com.wtrj.jx.web.portal.service.dto.Role;
import cn.com.wtrj.jx.web.portal.service.dto.School;
import cn.com.wtrj.jx.web.portal.service.dto.SchoolClass;
import cn.com.wtrj.jx.web.portal.service.dto.Score;
import cn.com.wtrj.jx.web.portal.service.dto.ScoreExamInsDto;
import cn.com.wtrj.jx.web.portal.service.dto.Student;
import cn.com.wtrj.jx.web.portal.service.rptScoreExamIns.IRptScoreExamInsService;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

@Controller
@RequestMapping("/")
public class ScoreUploadController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(ScoreUploadController.class);
	
	@Value("${upload.file.disk.base.path}")
	private String diskPath;
	
	@Value("${upload.file.relative.path}")
	private String relativePath;
	
	@Autowired
	private IDictService dictService;
	
	@Autowired
	private TeacherService teacherService;
	
	@Autowired
	private ScoreUploadService scoreUploadService;
	
	@Autowired
	private IRptScoreExamInsService rptScoreExamInsService;
	
	@Autowired
	private ITeacherPermissionService tpService;
	
	// 跳转到模板设置界面
	@RequestMapping(value = "/toScoreUploadList")
	public String scoreList(HttpServletRequest request, Model model, Map<String, Object> m) {
		
		m.put("id", MenuId.SCORE_UPLOAD);
		
		doCommonSetting(m);
		return "plan/score-upload-list";
	}

	// 获取模板分页查询
		@RequestMapping(value = "/pageScores")
		@ResponseBody
		public PageData<List<Score>> pageScores(PageSearchParam param, String type,
				HttpServletRequest request, Model model) {
			
			
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			//Teacher t = teacherService.findTeacherByPhone(user.getPhone());
			
			if(user.getTeacherId() != null) {
				
				PageData<List<Score>> ret = new PageData<List<Score>>();
				int start = param.getOffset() + 1;
				int end = param.getOffset() + param.getLimit();
				
				List<Score> list = scoreUploadService.getScoreUploadByPage(start, end, user.getTeacherId());
				int count = scoreUploadService.countScoreUploaByPage(user.getTeacherId());
				ret.setRows(list);
				ret.setTotal(count);
				
				return ret;
			}

			return null;
		}
	
	@RequestMapping(value = "/toScoreUpload")
	public String toScoreUpload(HttpServletRequest request, Model model, Map<String, Object> m) {
		
		List<DictItem> years = dictService.findDictItemsByCode(Constant.PlanType.school_year);
		List<DictItem> terms = dictService.findDictItemsByCode(Constant.PlanType.school_term);
		List<DictItem> types = dictService.findDictItemsByCode("exam-type");
		List<DictItem> courses = dictService.findDictItemsByCode(Constant.PlanType.subject);
		
		model.addAttribute("years", years);
		model.addAttribute("terms", terms);
		model.addAttribute("types", types);
		model.addAttribute("courses", courses);
		
		String schoolCode = null;
		
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
						
						List<WtrjRptScoreExamIns>  exins = findExamIns(years.get(0).getCode(), terms.get(0).getCode(), schoolCode, grades.get(0), types.get(0).getCode()
								, String.valueOf(classes.get(0).getClassId()), courses.get(0).getCode());
						
						if(exins != null && exins.size() >0) {
							model.addAttribute("exinsRemark", exins.get(0).getRemark());
						}
						
						model.addAttribute("exins", exins);
						
					}
					
				}
			}
			
			
			/*List<Grade> grades = findGradesBySchoolCode(schoolCode);
			model.addAttribute("grades", grades);
			if(grades != null && grades.size() >0) {
				List<SchoolClass> classes = findClassesByGrade(grades.get(0).getGrade(), schoolCode);
				model.addAttribute("classes", classes);
			}*/
			
			/*List<TeacherPermission> grades = findGradesBySchoolCode(schoolCode);
			
			if(grades != null && grades.size()>0) {
				model.addAttribute("grades", grades);
				
				List<TeacherPermission> classes = findClassesByGrade(String.valueOf(grades.get(0).getGrade()),  grades.get(0).getStage(), schoolCode);
				
				if(classes != null && classes.size() >0) {
					model.addAttribute("classes", classes);
					
					List<DictItem> courses = findCourseByClassId(schoolCode, String.valueOf(grades.get(0).getGrade()),  grades.get(0).getStage(), String.valueOf(classes.get(0).getClassId()));
					model.addAttribute("courses", courses);
					
					if(courses != null && courses.size() >0) {
						List<WtrjRptScoreExamIns>  exins = findExamIns(years.get(0).getCode(), terms.get(0).getCode(), schoolCode, String.valueOf(grades.get(0).getGrade()), types.get(0).getCode()
								, String.valueOf(classes.get(0).getClassId()), courses.get(0).getCode());
						
						if(exins != null && exins.size() >0) {
							model.addAttribute("exinsRemark", exins.get(0).getRemark());
						}
						
						model.addAttribute("exins", exins);
					}
					
					
					
				}

			}*/
			
		}
		
		//rptScoreExamInsService.searchByItems(schoolYearCode, schoolTermCode, schoolCode, grade, typeCode, sequence)
		
		return "plan/score-upload";
	}
	
	@ResponseBody
	@RequestMapping(value = "/findScoreUploadExamIns")
	public List<WtrjRptScoreExamIns> findScoreUploadExamIns(String year, String term, String schoolCode, String grade, String typeCode, String classId, String courseCode){
		
		List<WtrjRptScoreExamIns>  seid = findExamIns(year, term, schoolCode, grade, typeCode, classId, courseCode);
		
		return seid;
	}
	
	// 跳转到模板设置界面
		@RequestMapping(value = "/toScoreDownLoad")
		public String toScoreDownLoad(HttpServletRequest request, Model model, Map<String, Object> m) {
			
			String schoolCode = null;
			
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			List<School> schools = teacherService.findUserSchools(user.getTeacherId());
			model.addAttribute("schools", schools);
			
			if(StringUtils.isBlank(schoolCode) && schools != null && schools.size() >0) {
				schoolCode = schools.get(0).getCode();
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
					}
				}
			}
			
			doCommonSetting(m);
			return "plan/score-download";
		}
		
		/*@ResponseBody
		@RequestMapping(value = "/score/upload/changeGradesBySchoolCode")
		public List<TeacherPermission> changeGradesBySchoolCode(String schoolCode){
			return findGradesBySchoolCode(schoolCode);
		}
		
		@ResponseBody
		@RequestMapping(value = "/score/upload/changeClassesByGrade")
		public List<TeacherPermission> changeClassesByGrade(String schoolCode, String stage, String grade){
			return findClassesByGrade(grade, stage, schoolCode);
		}
		
		@ResponseBody
		@RequestMapping(value = "/score/upload/changeCoursesByClassId")
		public List<DictItem> changeCoursesByClassId(String schoolCode, String grade, String stage, String classId) {
			return findCourseByClassId(schoolCode, grade, stage, classId);
		}*/
		
		/*private List<TeacherPermission> findGradesBySchoolCode(String schoolCode) {
			return tpService.findGrades(String.valueOf(this.getCurrentUser().getTeacherId()), schoolCode);
		}
		
		private List<TeacherPermission> findClassesByGrade(String grade, String stage, String schoolCode){
			return tpService.findClasses(String.valueOf(this.getCurrentUser().getTeacherId()),  schoolCode,  grade,  stage);
		}*/
		
		private List<DictItem> findCourseByClassId(String schoolCode, String grade, String stage, String classId) {
			
			List<DictItem> courses = null;
			
			List<Role> roles = teacherService.findTeacherRoleTypes(this.getCurrentUser().getTeacherId(), schoolCode);
			
			if(roles != null && roles.size() >0) {
				
				boolean rk = false;
				boolean bzr = false;
				
				for(Role r : roles) {
					//班主任
					if("5".equals(r.getId())) {
						
						bzr = r.getClasses().contains(classId);
						
						if(bzr) {
							break;
						}
					}

				}
				
				
				
				if(!bzr) {
					for(Role r : roles) {
						//任课老师
						if("1".equals(r.getId())) {
							rk = r.getClasses().contains(classId);
							break;
						}
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
		
		private List<WtrjRptScoreExamIns> findExamIns(String year, String term, String schoolCode, String grade, String typeCode, String classId, String courseCode){
			
			List<WtrjRptScoreExamIns> exins = null;
			
			List<Role> roles = teacherService.findTeacherRoleTypes(this.getCurrentUser().getTeacherId(), schoolCode);
			
			if(roles != null && roles.size() >0) {
				
				boolean rk = false;
				boolean bzr = false;
				String examType = null;
				
				for(Role r : roles) {
					//班主任
					if("5".equals(r.getId()) || "2".equals(r.getId()) || "3".equals(r.getId()) || "4".equals(r.getId()) || "6".equals(r.getId())) {
						bzr = true;
					}
					//任课老师
					if("1".equals(r.getId()) || "2".equals(r.getId()) || "3".equals(r.getId()) || "4".equals(r.getId()) || "6".equals(r.getId())) {
						rk = true;
					}
					
				}
				
				if(bzr && rk) {
					examType = "2";
				}
				
				if(bzr && !rk) {
					examType = "1";
				}
				
				if(!bzr && rk) {
					examType = "0";
				}
				
				if(StringUtils.isNotBlank(examType)) {
					exins = rptScoreExamInsService.searchByItems(year, term, schoolCode, grade, typeCode, classId, courseCode, String.valueOf(this.getCurrentUser().getId()), examType);
				}
			}
			
			return exins;
		}
		
		@RequestMapping(value = "/downLoadStudents")
		public void downLoadStudents(HttpServletResponse response, 
					String schoolCode,
					String grade,
					String classId) {
			
	        try {
	        	 
	        	List<Student> sts = scoreUploadService.findStudents(classId, grade, schoolCode);
	        	
	        	 response.setContentType("application/vnd.ms-excel;charset=utf-8");
	        	 response.setHeader("Content-Disposition", "attachment;filename="+grade+"-"+classId+".xls");
	        	
	        	//创建工作薄
	        	OutputStream os = response.getOutputStream();
				WritableWorkbook workbook = Workbook.createWorkbook(os);
				//创建新的一页
		        WritableSheet sheet = workbook.createSheet("First Sheet",0);
		        //创建要显示的内容,创建一个单元格，第一个参数为列坐标，第二个参数为行坐标，第三个参数为内容
		        /*Label idCardNumber = new Label(0,0,"身份证号码");
		        sheet.addCell(idCardNumber);
		        Label sname = new Label(1,0,"学生姓名");
		        sheet.addCell(sname);
		        Label score = new Label(2,0,"分数");*/
		        Label sname = new Label(0,0,"学生姓名");
		        sheet.addCell(sname);
		        Label score = new Label(1,0,"分数");
		        sheet.addCell(score);
		        
		        if(sts != null && sts.size() > 0) {
		        	
		        	for(int i = 0 ; i < sts.size() ; i++) {
		        		Label studentName = new Label(0, i+1, sts.get(i).getName());
		 		        sheet.addCell(studentName);
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
		
		@ResponseBody
		@RequestMapping("/saveScoreUploadInfo")
		public BaseRet<String> saveScoreUploadInfo(@RequestBody Score upload){
			BaseRet<String> rs = new BaseRet<String>();
			
			User user = (User) SecurityUtils.getSubject().getSession().getAttribute("portal-user");
			//Teacher t = teacherService.findTeacherByPhone(user.getPhone());
			
			if(user.getTeacherId() != null) {
				
				upload.setUploadUserId(user.getTeacherId());
				upload.setUploadUserName(user.getTeacherName());
				upload.setDiskPath(diskPath + relativePath + upload.getFilePath());
				//覆盖相同的历史数据
				if(upload.getOver() != null && upload.getOver()) {
					scoreUploadService.deleteStudentScore(upload);
					scoreUploadService.deleteScoreUploadFile(upload);
				}
				/*upload.setUploadUserId(t.getId());
				upload.setUploadUserName(t.getName());*/
				/*upload.setId(UUID.randomUUID().toString());*/
				upload.setUploadTime(new Date());
				
				//addStudentScore(upload);
				
				Map<String, Object> msg = readExcel(upload);
				
				if(msg != null && msg.containsKey("01")) {
					rs.setCode(Constant.RetCode.ERROR);
					rs.setMsg(msg.get("01").toString());
					return rs;
				}
				
				Object obj = msg.get("scores");
				
				if(obj != null) {
					try {
						List<Score> scores = (List<Score>)obj;
						scoreUploadService.saveScoreUploadInfo(upload, scores);
					}
					catch (Exception e) {
						e.printStackTrace();
						rs.setCode(Constant.RetCode.ERROR);
						rs.setMsg("成绩保存失败");
						return rs;
					}
					
				}

				rs.setCode(Constant.RetCode.SUCCESS);
			}
			
			return rs;
		}
		
		private Map<String, Object> readExcel(Score upload){
			Map<String, Object> msg = null;
			File file = new File(upload.getDiskPath());
			if(file != null && file.exists()) {
				try {
					
					InputStream is;
					try {
						is = new FileInputStream(file);
						org.apache.poi.ss.usermodel.Workbook workbook = WorkbookFactory.create(is); 
//						XSSFWorkbook xssfWorkbook = new XSSFWorkbook(is);
//						 XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);
						 
						org.apache.poi.ss.usermodel.Sheet hssfSheet = workbook.getSheetAt(0);
						
						 if (hssfSheet != null) {
							 
							// 获取当前工作薄的每一行
							// int row = xssfSheet.getLastRowNum();
							 
							 int row = hssfSheet.getLastRowNum();
							 
							 if(row >= 1) {
								 
								 List<Score> ss = new ArrayList<Score>();
								 
								 for (int rowNum = 1; rowNum <= row; rowNum++) {
					                //XSSFRow xssfRow = xssfSheet.getRow(rowNum);
									 Row xrow = hssfSheet.getRow(rowNum);
					                if (xrow != null) {
					                    org.apache.poi.ss.usermodel.Cell studentNameCell = xrow.getCell(0);
					                    //读取第一列数据
					                    org.apache.poi.ss.usermodel.Cell scoreCell = xrow.getCell(1);
					                    //读取第二列数据
					                   
					                    String studentName = null;
					                    String score = null;
					                    
					                    if(studentNameCell != null) {
					                    	
					                    	 if (studentNameCell.getCellType() ==  org.apache.poi.ss.usermodel.Cell.CELL_TYPE_BOOLEAN) {
					                    		 studentName = String.valueOf(studentNameCell.getBooleanCellValue());
					                         } else if (studentNameCell.getCellType() ==  org.apache.poi.ss.usermodel.Cell.CELL_TYPE_NUMERIC) {
					                        	 studentName = String.valueOf(studentNameCell.getNumericCellValue());
					                         } else {
					                        	 studentName = String.valueOf(studentNameCell.getStringCellValue());
					                         }
					                    	
					                    	if(scoreCell != null) {
					                    		
					                    		if (scoreCell.getCellType() ==  org.apache.poi.ss.usermodel.Cell.CELL_TYPE_BOOLEAN) {
					                    			score = String.valueOf(scoreCell.getBooleanCellValue());
						                         } else if (scoreCell.getCellType() ==  org.apache.poi.ss.usermodel.Cell.CELL_TYPE_NUMERIC) {
						                        	 score = String.valueOf(scoreCell.getNumericCellValue());
						                         } else {
						                        	 score = String.valueOf(scoreCell.getStringCellValue());
						                         }
					                    		
					                    	}
					                    	else {
					                    		score = "0.00";
					                    	}
					                    	
					                    }
					                    
					                    if(StringUtils.isNotBlank(studentName) && StringUtils.isNotBlank(studentName.replaceAll("\\s*", ""))) {
					                    	Score s = new Score();
					                    	BeanUtils.copyProperties(upload, s);
					            			
					            			if(!isDouble(score)) {
					            				score = "0.00";
					            			}
					            			
					            			//s.setIdCardNumber(idCardNumber);
						            		s.setStudentName(studentName.replaceAll("\\s*", ""));
						            		s.setScore(score);
						            		ss.add(s);
					            		}
					            		

					                }
					            }
								 
								 if(ss != null && ss.size() >0) {
									// saveStudentsScore(ss); 
									 msg = new HashMap<String, Object>();
									 msg.put("scores", ss);
								 }
								 else {
									 msg = new HashMap<String, Object>();
									msg.put("01", "成绩单没有内容上传");
									return msg;
								 }
								 
								 
							 }
							 else {
								 msg = new HashMap<String, Object>();
									msg.put("01", "成绩单没有内容");
									 return msg;
							 }
					            
							 
				         }
						 else {
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
			   try
			   {
			      Double.parseDouble(str);
			      return true;
			   }
			   catch(NumberFormatException ex){}
			   
			   return false;
			}
		
		@ResponseBody
		@RequestMapping(value = "/deleteScoreUpload")
		public BaseRet<String> deleteScoreUpload(String id){
			BaseRet<String> rt = new BaseRet<String>();
			rt.setCode(Constant.RetCode.SUCCESS);
			try {
				logger.info("删除成绩信息【开始】[id=" + id + "]");
				
				Score s = scoreUploadService.findById(id);
				
				logger.info(" ----- 删除成绩信息开始[remove examIns start] -----");
				scoreUploadService.deleteStudentScore(s);
				scoreUploadService.deleteScoreUpload(id);
				
				logger.info(" ----- 用户 [ " + getCurrentUser().getTeacherId() +","
						+getCurrentUser().getTeacherName() +"] 删除成绩信息 -----");
						
				logger.info(" ----- 删除成绩信息为  " + s.toString() +"  -----");
						
				logger.info(" ----- 删除成绩信息结束[remove examIns end] -----");
				
			} catch (Exception e) {
				logger.error("删除成绩信息异常中止！", e);
				rt.setCode(RetCode.ERROR);
				rt.setMsg("删除成绩信息异常中止");
			}
			logger.info("删除成绩信息【结束】");
			return rt;
		}
		
		
		
		@ResponseBody
		@RequestMapping(value = "/checkScoreUpload")
		public BaseRet<String> checkScoreUpload(@RequestBody Score upload){
			BaseRet<String> rt = new BaseRet<String>();
			rt.setCode(Constant.RetCode.SUCCESS);
			int checked = scoreUploadService.checkScoreUpload(upload);
			
			if(checked > 0) {
				rt.setCode(Constant.RetCode.ERROR);
				rt.setMsg("已经上传过此类型成绩单，是否需要上传覆盖!");
			}
			
			return rt;
		}
		
		
		private BaseRet<String> addStudentScore(Score upload) {
			
			
			
			File file = new File(diskPath + relativePath + upload.getFilePath());
			if(file != null && file.exists()) {
				/*InputStream is;
				try {
					is = new FileInputStream(file);
					XSSFWorkbook xssfWorkbook = new XSSFWorkbook(is);
					 XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);
					 
					 if (xssfSheet != null) {
						 
						// 获取当前工作薄的每一行
						 if(xssfSheet.getLastRowNum() > 1 && xssfSheet.getLeftCol() >= 2) {
							 for (int rowNum = 1; rowNum <= xssfSheet.getLastRowNum(); rowNum++) {
				                XSSFRow xssfRow = xssfSheet.getRow(rowNum);
				                if (xssfRow != null) {
				                    XSSFCell studentNameCell = xssfRow.getCell(0);
				                    //读取第一列数据
				                    XSSFCell scoreCell = xssfRow.getCell(1);
				                    //读取第二列数据
				                   
				                    String studentName = null;
				                    String score = null;
				                    
				                    if(studentNameCell != null && scoreCell != null) {
				                    	studentName = scoreCell.getStringCellValue();
				                    	score = scoreCell.getStringCellValue();
				                    }
				                    
				                    if(StringUtils.isNotBlank(studentName) && StringUtils.isNotBlank(score)) {
				                    	Score s = new Score();
				                    	BeanUtils.copyProperties(upload, s);
				                    
				                    	if(!isInteger(score)) {
				            				score = "-1";
				            			}
				            			
					            		s.setStudentName(studentName);
					            		s.setScore(score);
				                    	
				                    }

				                }
				            }
						 }
				            
						 
			         }
					 
				} catch (Exception e) {
					e.printStackTrace();
				}*/
				
				
				/*
				try {
					Workbook workbook = Workbook.getWorkbook(file);
					if(workbook != null && workbook.getSheets() != null && workbook.getSheets().length >0) {
						
						Sheet sheet = workbook.getSheet(0);
						
						BaseRet<String> br = validateStudentsInfo(upload, sheet);
			            
						if("02".equals(br.getCode())) {
							
							int rows = sheet.getRows();
				            int columns = sheet.getColumns();
							
							if(rows > 1 && columns >=3) {
								
								List<Score> ss = new ArrayList<Score>();
								
				            	for(int i = 1; i < rows; i++) {
				            		Score s = new Score();
				            		//logger.info( sheet.getCell(0, i).getContents() +" - " + sheet.getCell(1, i).getContents() +" - " + sheet.getCell(2, i).getContents());
				            		
				            		String idCardNumber = sheet.getCell(0, i).getContents();
				            		String studentName = sheet.getCell(1, i).getContents();
				            		String score = sheet.getCell(2, i).getContents();
				            		
				            		if(StringUtils.isNotBlank(idCardNumber) && StringUtils.isNotBlank(studentName)) {
				            			BeanUtils.copyProperties(upload, s);
				            			
				            			if(!isInteger(score)) {
				            				score = "-1";
				            			}
				            			
				            			s.setIdCardNumber(idCardNumber);
					            		s.setStudentName(studentName);
					            		s.setScore(score);
				            			
				            		}
				            		ss.add(s);
				            	}
				            	
				            	scoreUploadService.saveStudentsScore(ss);
				            	
				            	
				            }
							
							
						}
						else {
							return br;
						}
					}
					
				} catch (BiffException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}

			*/}
			
			
			return null;
			
		}
		
		private BaseRet<String> validateStudentsInfo(Score upload, Sheet sheet) {
			
			BaseRet<String> rs = new BaseRet<String>();
			rs.setCode(Constant.RetCode.SUCCESS);
			
			List<String> errorList = new ArrayList<String>();
			
			int rows = sheet.getRows();
            int columns = sheet.getColumns();
			
            if(rows > 1 && columns >=3) {
            	List<Student> sts = scoreUploadService.findStudents(upload.getClassId(), upload.getGrade(), upload.getSchoolCode());
            	
            	if(sts != null && sts.size() > 0) {
            		if(sts.size() != (rows-1)) {
            			rs.setCode(Constant.RetCode.ERROR);
            			rs.setMsg("上传学生数量与现有班级学生数量不一致，请核对");
            		}
            		
            		for(int i = 1; i < rows; i++) {
            			boolean had = false;
            			String idCardNumber = sheet.getCell(0, i).getContents();
            			String studentName = sheet.getCell(1, i).getContents();
            			
            			
            			if(StringUtils.isBlank(idCardNumber) || StringUtils.isBlank(studentName)) {
            				continue;
            			}
            			
            			for(Student s : sts) {
            				if(s.getIdCardNumber().equals(idCardNumber)) {
            					had = true;
            				}
            			}
            			
            			if(!had) {
            				errorList.add(sheet.getCell(1, i).getContents());
            			}
            		}
            		
            		if(errorList.size() > 0) {
            			//学生信息不存在
            			rs.setCode(Constant.RetCode.ERROR);
            			
            			StringBuilder msg = new StringBuilder("学生:");
            			
            			for(String s : errorList) {
            				msg.append(" ").append(s);
            			}
            			
            			msg.append(" 的身份证信息在系统中不存在，请核对信息");
            			
            			rs.setMsg(msg.toString());
            		}
					
				}
            	
            }
			
            return rs;
		}
		
		/**
		 * 支持多上传，但是现在前台未选择文件后自动上传，相当每次只上传一个文件
		 * 
		 * @param request
		 * @return
		 */
		@ResponseBody
		@RequestMapping("/scoreFileUpload")
		public BaseRet<String> filesUpload(HttpServletRequest request) {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			List<MultipartFile> files = multipartRequest.getFiles("files");
			BaseRet<String> rs = new BaseRet<String>();
			if (files != null && files.size() > 0) {
				
				MultipartFile file = files.get(0);
				
				int last = file.getOriginalFilename().lastIndexOf(".");
				
				if(last == -1) {
					rs.setCode(Constant.RetCode.ERROR);
					rs.setMsg("上传失败，上传文件必须为Excel类型");
					return rs;
				}
				
				String suffix = file.getOriginalFilename().substring(last);
				
				if(".xlsx".equals(suffix) || ".xls".equals(suffix)) {

					String filePath = saveFile(file);
					logger.info("file path : "+filePath);
					
					rs.setCode(Constant.RetCode.SUCCESS);
					rs.setData(filePath);
					rs.setMsg(file.getOriginalFilename());
				}
				else {
					rs.setCode(Constant.RetCode.ERROR);
					rs.setMsg("上传失败，上传文件必须为Excel类型");
				}
				
				
				return rs;
			}
			
			return null;
		}
		
		private String saveFile(MultipartFile file) {
//			if (!file.isEmpty()) {
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
					return fileName.toString();
				} catch (Exception e) {
					logger.error("文件上传错误," + e.getMessage());
				}
//			}
			return "";
		}
		
		 private boolean isInteger(String str) {
			 	if(StringUtils.isBlank(str)) {
			 		return false;
			 	}
		        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");  
		        return pattern.matcher(str).matches();  
		  }

}
