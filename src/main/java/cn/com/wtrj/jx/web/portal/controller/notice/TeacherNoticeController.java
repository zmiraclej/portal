package cn.com.wtrj.jx.web.portal.controller.notice;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.dozer.DozerBeanMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.portal.common.controller.response.base.BaseRet;
import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.bean.NoticeGradeSelectParam;
import cn.com.wtrj.jx.web.portal.controller.bean.TreeClassInfo;
import cn.com.wtrj.jx.web.portal.controller.bean.TreeGradeInfo;
import cn.com.wtrj.jx.web.portal.controller.request.ClassTreeNode;
import cn.com.wtrj.jx.web.portal.controller.request.notice.NoticeClassSelectParam;
import cn.com.wtrj.jx.web.portal.controller.request.notice.NoticeCourseSelectParam;
import cn.com.wtrj.jx.web.portal.controller.request.notice.NoticeRoleSelectParam;
import cn.com.wtrj.jx.web.portal.controller.request.notice.TeacherSelectParam;
import cn.com.wtrj.jx.web.portal.controller.response.TeacherNoticeGroup;
import cn.com.wtrj.jx.web.portal.controller.response.TeacherNoticeGroupMember;
import cn.com.wtrj.jx.web.portal.model.entities.DictItem;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjEcomPermission;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjEcomTeacherNoticeGroup;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtTeacherNoticeGroup;
import cn.com.wtrj.jx.web.portal.service.ITeacherNoticeGroupService;
import cn.com.wtrj.jx.web.portal.service.dict.IDictService;
import cn.com.wtrj.jx.web.portal.service.dto.notice.AdminTeacher;
import cn.com.wtrj.jx.web.portal.service.dto.notice.EcomPermisson;
import cn.com.wtrj.jx.web.portal.service.dto.notice.NoticeClassKey;
import cn.com.wtrj.jx.web.portal.service.dto.notice.NoticeGradeKey;
import cn.com.wtrj.jx.web.portal.service.dto.notice.NoticeTeacherKey;
import cn.com.wtrj.jx.web.portal.service.dto.notice.TeacherBaseInfo;
import cn.com.wtrj.jx.web.portal.service.notice.IEcomPermissionService;
import cn.com.wtrj.jx.web.portal.util.NamesGenerationUtil;

@Controller
@RequestMapping("/")
public class TeacherNoticeController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(TeacherNoticeController.class);

	@Autowired
	IEcomPermissionService teacherAuthService;

	@Autowired
	private IDictService dictService;

	@Autowired
	IEcomPermissionService permissionService;

	@Autowired
	ITeacherNoticeGroupService groupService;

	@RequestMapping("/toTeacherNotice")
	public String index(HttpServletRequest request, Map<String, Object> p, Model model) {
		logger.info("跳转到教师通知页面 开始");

		try {
			this.doCommonSetting(p);

			p.put("id", "teacherNotice");
			model.addAttribute("ctx", request.getContextPath());

			// 课程设置
			List<DictItem> dis = dictService.findDictItemsByCode("subject");
			p.put("courses", dis);

			clearSelectStatus();
		} catch (Exception e) {
			logger.error("跳转到教师通知页面 异常", e);
		}

		logger.info("跳转到教师通知页面 结束");
		return "notice/teacherNotice";
	}

	private void clearSelectStatus() {
		EcomPermisson p = this.getTeacherPermission();
		p.setClassSelected(null);
		p.setGradeSelected(null);
		super.saveTeacherPermission(p);
	}

	@RequestMapping("/teacherNotice/searchClassTree")
	@ResponseBody
	public BaseRet<List<ClassTreeNode>> searchTree(@RequestParam(value = "pid") String pid) {
		logger.info("班级选择树结构数据查询 开始");

		BaseRet<List<ClassTreeNode>> ret = new BaseRet<List<ClassTreeNode>>();
		try {
			List<ClassTreeNode> nodes = new ArrayList<ClassTreeNode>();
			EcomPermisson permisson = this.getTeacherPermission();

			Map<String, List<TreeGradeInfo>> map = new HashMap<String, List<TreeGradeInfo>>();

			List<NoticeGradeKey> dtos = permisson.getOwnedGrades();
			for (NoticeGradeKey dto : dtos) {
				List<TreeGradeInfo> arry = map.get(dto.getSchoolCode());
				if (arry == null) {
					arry = new ArrayList<TreeGradeInfo>();
					map.put(dto.getSchoolCode(), arry);
				}
				TreeGradeInfo gi = new TreeGradeInfo();
				gi.setSchoolCode(dto.getSchoolCode());
				gi.setStage(dto.getStage());
				gi.setGrade(dto.getGrade());
				gi.setDispayName(NamesGenerationUtil.genGradeName(dto.getStage(), dto.getGrade()));
				gi.setGradeKeyNo(dto.getSchoolCode() + "_" + dto.getStage() + "_" + dto.getGrade());

				arry.add(gi);

				// 排序处理
				Comparator<TreeGradeInfo> ct = new Comparator<TreeGradeInfo>() {

					@Override
					public int compare(TreeGradeInfo o1, TreeGradeInfo o2) {
						if (o1.getGrade() < o2.getGrade()) {
							return -1;
						} else if (o1.getGrade() > o2.getGrade()) {
							return 1;
						}
						return 0;
					}
				};

				Collections.sort(arry, ct);
			}

			// ------------------做成页面显示用返回值----------------------------------
			for (String key : map.keySet()) {
				ClassTreeNode info = new ClassTreeNode();
				info.setId("S" + key);
				info.setName(teacherAuthService.getSchoolNameByCode(key));
				info.setIsParent(true);
				nodes.add(info);
				List<TreeGradeInfo> ts = map.get(key);
				for (TreeGradeInfo treeGradeInfo : ts) {
					ClassTreeNode subNode = new ClassTreeNode();
					subNode.setId("G" + treeGradeInfo.getGradeKeyNo());
					subNode.setName(
							NamesGenerationUtil.genGradeName(treeGradeInfo.getStage(), treeGradeInfo.getGrade()));
					subNode.setpId(info.getId());
					subNode.setIsParent(true);
					nodes.add(subNode);
				}
			}

			List<NoticeClassKey> classDtos = permisson.getOwnedClasses();
			List<TreeClassInfo> classInfos = new ArrayList<TreeClassInfo>();
			for (NoticeClassKey dto : classDtos) {
				TreeClassInfo gi = new TreeClassInfo();
				gi.setSchoolCode(dto.getSchoolCode());
				gi.setStage(dto.getStage());
				gi.setGrade(dto.getGrade());
				gi.setDispayName(dto.getClassName());
				gi.setClassNo(dto.getClassNo());

				gi.setGradeNo(dto.getSchoolCode() + "_" + dto.getStage() + "_" + dto.getGrade());
				gi.setClassKeyNo(
						dto.getSchoolCode() + "_" + dto.getStage() + "_" + dto.getGrade() + "_" + dto.getClassNo());

				classInfos.add(gi);

			}

			// 排序处理
			Comparator<TreeClassInfo> ct = new Comparator<TreeClassInfo>() {

				@Override
				public int compare(TreeClassInfo o1, TreeClassInfo o2) {
					if (o1.getClassNo() < o2.getClassNo()) {
						return -1;
					} else if (o1.getClassNo() > o2.getClassNo()) {
						return 1;
					}
					return 0;
				}
			};

			Collections.sort(classInfos, ct);

			for (TreeClassInfo treeClassInfo : classInfos) {
				ClassTreeNode subNode = new ClassTreeNode();
				subNode.setpId("G" + treeClassInfo.getGradeNo());
				subNode.setId("C" + treeClassInfo.getClassKeyNo());
				subNode.setName(treeClassInfo.getDispayName());
				subNode.setIsParent(true);
				nodes.add(subNode);
			}

			List<NoticeTeacherKey> teacherDtos = permisson.getOwnedTeachers();
			for (NoticeTeacherKey dto : teacherDtos) {

				ClassTreeNode subNode = new ClassTreeNode();
				subNode.setpId("C" + dto.getSchoolCode() + "_" + dto.getStage() + "_" + dto.getGrade() + "_"
						+ dto.getClassNo());
				subNode.setId("P" + dto.getTeacherKeyNo());
				subNode.setName(dto.getTeacherName() + " -- " + dto.getTeacherPhone());
				subNode.setIsParent(false);
				nodes.add(subNode);

			}
			ret.setData(nodes);
		} catch (Exception e) {
			logger.error("班级选择树结构数据查询 异常", e);
		}

		logger.info("班级选择树结构数据查询 结束");
		return ret;
	}

	@RequestMapping(value = "/teacherNotice/saveTeacherGradeSelect", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveTeacherGradeSelect(@RequestBody List<NoticeGradeSelectParam> grades) {
		logger.info("保存通知年级选择 开始！");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			EcomPermisson p = this.getTeacherPermission();
			Map<String, Boolean> map = p.getGradeSelected();
			if (map == null) {
				map = new HashMap<String, Boolean>();
			}
			for (NoticeGradeSelectParam sp : grades) {
				map.put(sp.getGradeKeyNo(), sp.getSelected());
			}

			p.setGradeSelected(map);

			// ------------更新班级状态------------------------
			List<NoticeClassKey> classKeys = p.getOwnedClasses();
			Map<String, Boolean> classSelectedMap = p.getClassSelected();
			if (classSelectedMap == null) {
				classSelectedMap = new HashMap<String, Boolean>();
			}

			for (NoticeGradeSelectParam grade : grades) {
				String[] keys = grade.getGradeKeyNo().split("_");

				for (NoticeClassKey noticeClassKey : classKeys) {
					if (keys.length > 2 && noticeClassKey.getSchoolCode().equals(keys[0])
							&& noticeClassKey.getStage() == Integer.valueOf(keys[1]).intValue()
							&& noticeClassKey.getGrade() == Integer.valueOf(keys[2]).intValue()) {
						classSelectedMap.put(noticeClassKey.getClassKeyNo(), grade.getSelected());
					}
				}
			}
			p.setClassSelected(classSelectedMap);

			refreshTeacherSelectStatus(p);

			super.saveTeacherPermission(p);

			ret.setData("");
		} catch (Exception e) {
			logger.error("保存通知年级选择 异常！", e);

			ret.setCode(Constant.RetCode.ERROR);
		}

		logger.info("保存通知年级选择 结束！");
		return ret;
	}

	/**
	 * 保存教师选择数据
	 * 
	 * @param teachers
	 * @return
	 */
	@RequestMapping(value = "/teacherNotice/saveTeacherSelect", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveTeacherSelect(@RequestBody List<TeacherSelectParam> teachers) {
		logger.info("保存教师选择 开始！");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			EcomPermisson p = this.getTeacherPermission();
			Map<String, Boolean> map = p.getTeacherSelected();
			if (map == null) {
				map = new HashMap<String, Boolean>();
			}

			for (TeacherSelectParam sp : teachers) {
				map.put(sp.getTeacherKeyNo(), sp.getSelected());
				for (NoticeTeacherKey key : p.getOwnedTeachers()) {
					if (key.getTeacherKeyNo().equals(sp.getTeacherKeyNo())) {
						Integer teacherId = key.getTeacherId();
						if (p.getTeacherSelectedMap() != null) {
							Map<Integer, Boolean> teacherMap = p.getTeacherSelectedMap();
							teacherMap.put(teacherId, sp.getSelected());

							p.setTeacherSelectedMap(teacherMap);
						}
					}
				}
			}

			p.setTeacherSelected(map);

			super.saveTeacherPermission(p);

			ret.setData("");
		} catch (Exception e) {
			logger.error("保存教师选择 异常！", e);

			ret.setCode(Constant.RetCode.ERROR);
		}

		logger.info("保存教师选择 结束！");
		return ret;
	}

	@RequestMapping(value = "/teacherNotice/saveTeacherCourseSelect", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveTeacherCourseSelect(@RequestBody List<NoticeCourseSelectParam> courses) {
		logger.info("保存通知科目选择 开始！");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			EcomPermisson p = this.getTeacherPermission();

			// -------------------获取科目选择状态---------------------
			Object obj = SecurityUtils.getSubject().getSession().getAttribute(Constant.NoticeSelectKey.COURSE_SELECT);
			Map<String, Boolean> courseMap = null;
			if (obj == null) {
				courseMap = new HashMap<String, Boolean>();
			} else {
				courseMap = (Map<String, Boolean>) obj;
			}

			for (NoticeCourseSelectParam param : courses) {
				courseMap.put(param.getCourseCode(), param.getSelected());
			}

			// ------------科目选择------------------------
			SecurityUtils.getSubject().getSession().setAttribute(Constant.NoticeSelectKey.COURSE_SELECT, courseMap);

			refreshTeacherSelectStatus(p);

			super.saveTeacherPermission(p);

			ret.setData("");
		} catch (Exception e) {
			logger.error("保存通知科目选择 异常！", e);

			ret.setCode(Constant.RetCode.ERROR);
		}

		logger.info("保存通知科目选择 结束！");
		return ret;
	}

	@RequestMapping(value = "/teacherNotice/saveTeacherRoleSelect", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveTeacherRoleSelect(@RequestBody List<NoticeRoleSelectParam> roles) {
		logger.info("保存通知角色选择 开始！");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			EcomPermisson p = this.getTeacherPermission();

			// -------------------获取角色选择状态---------------------
			Object obj = SecurityUtils.getSubject().getSession().getAttribute(Constant.NoticeSelectKey.ROLE_SELECT);
			Map<String, Boolean> roleMap = null;
			if (obj == null) {
				roleMap = new HashMap<String, Boolean>();
			} else {
				roleMap = (Map<String, Boolean>) obj;
			}

			for (NoticeRoleSelectParam param : roles) {
				roleMap.put(param.getRole(), param.getSelected());
			}

			// ------------角色选择------------------------
			SecurityUtils.getSubject().getSession().setAttribute(Constant.NoticeSelectKey.ROLE_SELECT, roleMap);

			refreshTeacherSelectStatus(p);

			super.saveTeacherPermission(p);

			ret.setData("");
		} catch (Exception e) {
			logger.error("保存通知角色选择 异常！", e);

			ret.setCode(Constant.RetCode.ERROR);
		}

		logger.info("保存通知角色选择 结束！");
		return ret;
	}

	@RequestMapping(value = "/teacherNotice/saveTeacherClassSelect", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveTeacherClassSelect(@RequestBody List<NoticeClassSelectParam> grades) {
		logger.info("保存教师班级选择 开始！" + grades);

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			EcomPermisson p = this.getTeacherPermission();
			Map<String, Boolean> map = p.getClassSelected();
			if (map == null) {
				map = new HashMap<String, Boolean>();
			}
			for (NoticeClassSelectParam sp : grades) {
				map.put(sp.getClassKeyNo(), sp.getSelected());
			}

			p.setClassSelected(map);

			// ------------更新班级状态------------------------
			List<NoticeClassKey> classKeys = p.getOwnedClasses();
			Map<String, Boolean> classSelectedMap = p.getClassSelected();
			if (classSelectedMap == null) {
				classSelectedMap = new HashMap<String, Boolean>();
			}

			for (NoticeClassSelectParam grade : grades) {
				String[] keys = grade.getClassKeyNo().split("_");

				for (NoticeClassKey noticeClassKey : classKeys) {
					if (keys.length > 3 && noticeClassKey.getSchoolCode().equals(keys[0])
							&& noticeClassKey.getStage() == Integer.valueOf(keys[1]).intValue()
							&& noticeClassKey.getGrade() == Integer.valueOf(keys[2]).intValue()
							&& noticeClassKey.getClassNo() == Integer.valueOf(keys[3]).intValue()) {
						classSelectedMap.put(noticeClassKey.getClassKeyNo(), grade.getSelected());
					}
				}
			}
			p.setClassSelected(classSelectedMap);

			refreshTeacherSelectStatus(p);

			super.saveTeacherPermission(p);

			ret.setData("");
		} catch (Exception e) {
			logger.error("保存教师班级选择 异常！", e);

			ret.setCode(Constant.RetCode.ERROR);
		}

		logger.info("保存教师班级选择 结束！");
		return ret;
	}

	@RequestMapping(value = "/teacherNotice/searchSelectedInfo")
	@ResponseBody
	public BaseRet<Map<String, Object>> searchSelectedInfo() {
		logger.info("查询选择数据");
		BaseRet<Map<String, Object>> rs = new BaseRet<Map<String, Object>>();

		try {
			rs.setCode(Constant.RetCode.SUCCESS);
			EcomPermisson permisson = this.getTeacherPermission();

			int selected = 0;

			List<String> teachers = new ArrayList<String>();

			Map<Integer, Boolean> teacherSelectStatus = permisson.getTeacherSelectedMap();
			Map<Integer, TeacherBaseInfo> baseMap = permisson.getOwnedTeachersBaseInfo();
			for (Integer key : teacherSelectStatus.keySet()) {
				if (teacherSelectStatus.get(key)) {
					selected++;
					teachers.add(baseMap.get(key).getTeacherName());
				}
			}

			Map<String, Object> ret = new HashMap<String, Object>();
			ret.put("total", teacherSelectStatus == null ? 0 : teacherSelectStatus.size());
			ret.put("selected", selected);
			ret.put("selectedTeachers", teachers);

			rs.setData(ret);
		} catch (Exception e) {
			logger.error("查询教师选择数据 失败");
			rs.setCode(Constant.RetCode.ERROR);
		}

		return rs;
	}

	/**
	 * 更新状态
	 * 
	 * @param p
	 *            EcomPermisson
	 */
	private void refreshTeacherSelectStatus(EcomPermisson p) {

		List<NoticeTeacherKey> teachers = p.getOwnedTeachers();
		List<AdminTeacher> adminTeachers = p.getOwnedAdminTeachers();

		// ---------------------------学校权限---------------------------------------
		List<String> schoolCodes = p.getOwnedSchools();

		// -----------------------年级选择状态-----------------------------------------
		List<String[]> selectedGrades = new ArrayList<String[]>();
		List<String[]> allGrades = new ArrayList<String[]>();
		Map<String, Boolean> gradeSelectedMap = p.getGradeSelected();
		if (gradeSelectedMap != null) {
			for (String key : gradeSelectedMap.keySet()) {
				if (gradeSelectedMap.get(key)) {
					selectedGrades.add(key.split("_"));
				}
			}
		}
		// TODO
		// for (NoticeTeacherKey strings : p.getOwnedGrades()) {
		//
		// }

		// -----------------班级关联教师（教师）选择状态---------------------
		Map<String, Boolean> teacherSelectedMap = p.getTeacherSelected();
		if (teacherSelectedMap == null) {
			teacherSelectedMap = new HashMap<String, Boolean>();
		}
		Map<Integer, Boolean> teacherSelectStatusMap = p.getTeacherSelectedMap();

		// 科目选择状态
		Object courseStore = SecurityUtils.getSubject().getSession()
				.getAttribute(Constant.NoticeSelectKey.COURSE_SELECT);
		List<String> selectedCourses = new ArrayList<String>();
		if (courseStore != null) {
			Map<String, Boolean> courseMap = (Map<String, Boolean>) courseStore;
			for (String key : courseMap.keySet()) {
				if (courseMap.get(key)) {
					selectedCourses.add(key);
				}
			}
		}

		// 角色选择状态
		Object roleStore = SecurityUtils.getSubject().getSession().getAttribute(Constant.NoticeSelectKey.ROLE_SELECT);
		List<String> selectedRoles = new ArrayList<String>();
		if (roleStore != null) {
			Map<String, Boolean> roleMap = (Map<String, Boolean>) roleStore;
			for (String key : roleMap.keySet()) {
				if (roleMap.get(key)) {
					selectedRoles.add(key);
				}
			}
		}
		// 班级选中状态
		Map<String, Boolean> selectedClassesStore = p.getClassSelected();
		List<String> selectedClasses = new ArrayList<String>();
		if (selectedClassesStore != null) {
			for (String key : selectedClassesStore.keySet()) {
				if (selectedClassesStore.get(key)) {
					selectedClasses.add(key);
				}
			}
		}

		if (selectedCourses.size() == 0 && selectedClasses.size() == 0 && selectedRoles.size() == 0) {
			for (String key : teacherSelectedMap.keySet()) {
				teacherSelectedMap.put(key, Boolean.FALSE);
			}
			for (Integer key : teacherSelectStatusMap.keySet()) {
				teacherSelectStatusMap.put(key, Boolean.FALSE);
			}
			p.setTeacherSelected(teacherSelectedMap);
			p.setTeacherSelectedMap(teacherSelectStatusMap);
		}

		// ----------------------------------班级关联教师过滤--------------------------------------------------------
		Set<Integer> teacherIds = new HashSet<Integer>();
		for (NoticeTeacherKey noticeTeacherKey : teachers) {
			teacherSelectedMap.put(noticeTeacherKey.getTeacherKeyNo(), false);
			teacherSelectStatusMap.put(noticeTeacherKey.getTeacherId(), false);
		}

		for (NoticeTeacherKey noticeTeacherKey : teachers) {
			Integer teacherId = noticeTeacherKey.getTeacherId();

			if (selectedClasses.size() > 0) {
				for (String classKeyNo : selectedClasses) {
					String[] keys = classKeyNo.split("_");

					if (keys.length > 3 && noticeTeacherKey.getSchoolCode().equals(keys[0])
							&& noticeTeacherKey.getStage() == Integer.valueOf(keys[1]).intValue()
							&& noticeTeacherKey.getGrade() == Integer.valueOf(keys[2]).intValue()
							&& noticeTeacherKey.getClassNo() == Integer.valueOf(keys[3]).intValue()) {
						teacherIds.add(teacherId);

						teacherSelectedMap.put(noticeTeacherKey.getTeacherKeyNo(), true);
						teacherSelectStatusMap.put(noticeTeacherKey.getTeacherId(), true);
					}
				}
			} else {
				teacherIds.add(teacherId);
			}
		}
		if (adminTeachers != null) {
			for (AdminTeacher t : adminTeachers) {
				teacherIds.add(t.getTeacherId());
			}
		}

		// 在班级选定的基础上进一步筛选
		// 以角色为基础
		if (selectedRoles.size() > 0) {
			// 任课老师,备课组长
			List<String> courseAndGradeRoles = new ArrayList<String>();
			// 教研组长
			List<String> courseRoles = new ArrayList<String>();
			// 班主任,年级组长
			List<String> gradeRoles = new ArrayList<String>();

			// 科目年级无关人员
			List<String> otherRoles = new ArrayList<String>();

			for (String role : selectedRoles) {
				switch (role) {
				case "1": // 班主任
					gradeRoles.add(role);
					break;
				case "2": // 课任老师
					courseAndGradeRoles.add(role);
					break;
				case "3": // 生辅老师
					gradeRoles.add(role);
					break;
				case "4": // 备课组长
					courseAndGradeRoles.add(role);
					break;
				case "5": // 年级组长
					gradeRoles.add(role);
					break;
				case "6": // 教研组长
					courseRoles.add(role);
					break;
				case "7": // 德育老师
					otherRoles.add(role);
					break;
				case "99": // 其他（行政）
					otherRoles.add(role);
					break;
				case "101": // 学部领导
					otherRoles.add(role);
					break;

				default:
					break;
				}

			}

			List<Integer> includeTeachers = new ArrayList<Integer>();
			// 任课老师,备课组长
			if (courseAndGradeRoles.size() > 0) {
				if (selectedGrades.size() == 0) {
					List<WtrjEcomPermission> ps = permissionService.searchTeacherByCourseAndRole(
							new ArrayList<Integer>(teacherIds), selectedCourses, null, courseAndGradeRoles);
					for (WtrjEcomPermission tp : ps) {
						includeTeachers.add(tp.getTeacherId());
					}
				}
				for (String[] gs : selectedGrades) {
					List<WtrjEcomPermission> ps = permissionService.searchTeacherByCourseAndRole(
							new ArrayList<Integer>(teacherIds), selectedCourses, gs, courseAndGradeRoles);
					for (WtrjEcomPermission tp : ps) {
						includeTeachers.add(tp.getTeacherId());
					}
				}

			}

			// 教研组长
			if (courseRoles.size() > 0) {
				List<WtrjEcomPermission> ps = permissionService.searchTeacherByCourseAndRole(
						new ArrayList<Integer>(teacherIds), selectedCourses, null, courseRoles);
				for (WtrjEcomPermission tp : ps) {
					includeTeachers.add(tp.getTeacherId());
				}
			}

			// 班主任,年级组长
			if (gradeRoles.size() > 0) {
				if (selectedGrades.size() == 0) {
					List<WtrjEcomPermission> ps = permissionService
							.searchTeacherByCourseAndRole(new ArrayList<Integer>(teacherIds), null, null, gradeRoles);
					for (WtrjEcomPermission tp : ps) {
						includeTeachers.add(tp.getTeacherId());
					}
				}
				for (String[] gs : selectedGrades) {
					List<WtrjEcomPermission> ps = permissionService
							.searchTeacherByCourseAndRole(new ArrayList<Integer>(teacherIds), null, gs, gradeRoles);
					for (WtrjEcomPermission tp : ps) {
						includeTeachers.add(tp.getTeacherId());
					}
				}
			}

			// 其他人员
			if (otherRoles.size() > 0) {
				List<WtrjEcomPermission> ps = permissionService
						.searchTeacherForStageRoles(new ArrayList<Integer>(teacherIds), schoolCodes, otherRoles);
				for (WtrjEcomPermission tp : ps) {
					includeTeachers.add(tp.getTeacherId());
				}
			}

			for (NoticeTeacherKey noticeTeacherKey : teachers) {
				Boolean selected = false;

				Integer teacherId = noticeTeacherKey.getTeacherId();
				if (includeTeachers.contains(teacherId)) {
					selected = true;
				} else {
					selected = false;
				}

				teacherSelectedMap.put(noticeTeacherKey.getTeacherKeyNo(), selected);
				teacherSelectStatusMap.put(noticeTeacherKey.getTeacherId(), selected);
			}
			for (Integer teacherId : teacherSelectStatusMap.keySet()) {
				Boolean selected = false;

				if (includeTeachers.contains(teacherId)) {
					selected = true;
				} else {
					selected = false;
				}
				teacherSelectStatusMap.put(teacherId, selected);
			}
		}

		p.setTeacherSelected(teacherSelectedMap);
		p.setTeacherSelectedMap(teacherSelectStatusMap);

	}

	@RequestMapping(value = "/teacherNotice/saveNoticeGroup", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<Map<String, Object>> saveNoticeGroup(String name, String remark) {
		logger.info("创建自定义分组 开始");
		BaseRet<Map<String, Object>> rs = new BaseRet<Map<String, Object>>();

		try {
			rs.setCode(Constant.RetCode.SUCCESS);

			List<WtrjEcomTeacherNoticeGroup> records = new ArrayList<WtrjEcomTeacherNoticeGroup>();

			EcomPermisson permisson = this.getTeacherPermission();

			Map<Integer, Boolean> teacherSelectStatus = permisson.getTeacherSelectedMap();
			Map<Integer, TeacherBaseInfo> baseMap = permisson.getOwnedTeachersBaseInfo();
			String groupCode = UUID.randomUUID().toString();
			Date createTime = Calendar.getInstance().getTime();
			for (Integer key : teacherSelectStatus.keySet()) {
				if (teacherSelectStatus.get(key)) {
					WtrjEcomTeacherNoticeGroup record = new WtrjEcomTeacherNoticeGroup();
					record.setId(UUID.randomUUID().toString());
					record.setBelongTeacherId(this.getCurrentUser().getTeacherId());
					record.setGroupName(name);
					record.setRemark(remark);
					record.setFlag("1");
					record.setCreateTime(createTime);
					record.setUpdateTime(createTime);
					record.setGroupCode(groupCode);

					TeacherBaseInfo teacher = baseMap.get(key);
					record.setMemberName(teacher.getTeacherName());
					record.setMemberTeacherId(teacher.getTeacherId());
					record.setMemberMobile(teacher.getMobile());
					records.add(record);
				}
			}

			groupService.saveGroupList(records);

		} catch (Exception e) {
			logger.error("创建自定义分组数据 失败", e);
			rs.setCode(Constant.RetCode.ERROR);
		}

		logger.info("创建自定义分组数据 结束");
		return rs;
	}

	@RequestMapping(value = "/teacherNotice/searchNoticeGroup", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<TeacherNoticeGroup>> searchNoticeGroup() {
		logger.info("查询自定义分组 开始");
		BaseRet<List<TeacherNoticeGroup>> rs = new BaseRet<List<TeacherNoticeGroup>>();

		try {
			rs.setCode(Constant.RetCode.SUCCESS);
			List<TeacherNoticeGroup> records = getCurrentUserGroups();
			rs.setData(records);

		} catch (Exception e) {
			logger.error("查询自定义分组数据 失败", e);
			rs.setCode(Constant.RetCode.ERROR);
		}

		logger.info("查询自定义分组数据 结束");
		return rs;
	}

	@RequestMapping(value = "/teacherNotice/searchGroupMembers", method = RequestMethod.GET)
	@ResponseBody
	public BaseRet<List<TeacherNoticeGroupMember>> searchGroupMembers(
			@RequestParam(value = "groupCode") String groupCode) {
		logger.info("查询自定义分组成员 开始");
		BaseRet<List<TeacherNoticeGroupMember>> rs = new BaseRet<List<TeacherNoticeGroupMember>>();

		try {
			rs.setCode(Constant.RetCode.SUCCESS);

			List<TeacherNoticeGroupMember> records = getCurrentGroupMembers(groupCode);
			rs.setData(records);

		} catch (Exception e) {
			logger.error("查询自定义分组成员 失败", e);
			rs.setCode(Constant.RetCode.ERROR);
		}

		logger.info("查询自定义分组成员 结束");
		return rs;
	}

	/**
	 * 根据分组删除group
	 * 
	 * @param groupCode
	 *            group code
	 * @return
	 */
	@RequestMapping(value = "/teacherNotice/deleteGroup", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<List<TeacherNoticeGroup>> deleteGroup(@RequestParam(value = "groupCode") String groupCode) {
		logger.info("删除自定义分组成员 开始");
		BaseRet<List<TeacherNoticeGroup>> rs = new BaseRet<>();

		try {
			groupService.deleteGroupByGroupBode(groupCode);

			rs.setCode(Constant.RetCode.SUCCESS);
			List<TeacherNoticeGroup> records = getCurrentUserGroups();
			rs.setData(records);

		} catch (Exception e) {
			logger.error("删除自定义分组成员 失败", e);
			rs.setCode(Constant.RetCode.ERROR);
		}

		logger.info("删除自定义分组成员 结束");
		return rs;
	}

	/**
	 * 删除分组中的一个成员
	 * 
	 * @param groupCode
	 *            分组代码
	 * @param memberTeacherId
	 *            成员老师ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/teacherNotice/deleteGroupMember", method = RequestMethod.POST)
	public BaseRet<List<TeacherNoticeGroupMember>> deleteGroupMember(String groupCode, String memberTeacherId) {
		logger.info("删除分组成员开始");

		BaseRet<List<TeacherNoticeGroupMember>> ret = new BaseRet<>();
		try {
			groupService.delMemberByGroupCode(groupCode, Integer.parseInt(memberTeacherId));

			ret.setCode(Constant.RetCode.SUCCESS);
			List<TeacherNoticeGroupMember> records = getCurrentGroupMembers(groupCode);
			ret.setData(records);
		} catch (Exception e) {
			logger.error("删除自定义分组成员 失败", e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		logger.info("删除分组成员结束");
		return ret;
	}

	private List<TeacherNoticeGroup> getCurrentUserGroups() {

		List<TeacherNoticeGroup> records = new ArrayList<TeacherNoticeGroup>();

		List<MtTeacherNoticeGroup> recs = groupService.searchByTeacherId(this.getCurrentUser().getTeacherId());
		if (recs != null) {
			DozerBeanMapper mapper = new DozerBeanMapper();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			for (MtTeacherNoticeGroup group : recs) {
				TeacherNoticeGroup tng = new TeacherNoticeGroup();
				mapper.map(group, tng);
				tng.setCreateTime(sdf.format(group.getCreateTime()));
				records.add(tng);
			}
		}
		return records;
	}

	private List<TeacherNoticeGroupMember> getCurrentGroupMembers(String groupCode) {
		List<TeacherNoticeGroupMember> records = new ArrayList<>();

		List<WtrjEcomTeacherNoticeGroup> recs = groupService.searchByGroupBode(groupCode);
		if (recs != null) {
			for (WtrjEcomTeacherNoticeGroup group : recs) {
				TeacherNoticeGroupMember member = new TeacherNoticeGroupMember();
				member.setMobile(group.getMemberMobile());
				member.setName(group.getMemberName());
				member.setTeacherId(group.getMemberTeacherId());
				records.add(member);
			}
		}
		return records;
	}
}
