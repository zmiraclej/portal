package cn.com.wtrj.jx.web.portal.controller.report.score;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant.RetCode;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.score.ClassJunfenRet;
import cn.com.wtrj.jx.web.portal.controller.response.score.SchoolJunfenRet;
import cn.com.wtrj.jx.web.portal.controller.response.score.StudentScoreRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjRptScoreDetail;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjSchoolInfo;
import cn.com.wtrj.jx.web.portal.model.mt.entities.report.MtClassJunfenDto;
import cn.com.wtrj.jx.web.portal.model.mt.entities.report.MtSchoolJunfenDto;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.service.report.IReportScoreService;

/**
 * 成绩报表相关
 * 
 * @author wusm
 *
 */
@Controller
@RequestMapping("/")
public class JunfenController extends BaseController {
	private final static Logger logger = LoggerFactory.getLogger(JunfenController.class);

	@Autowired
	private IReportScoreService junfenService;

	@Autowired
	private IWtrjSchoolInfoService schoolService;

	@ResponseBody
	@RequestMapping(value = "/searchSchoolJunfen", method = RequestMethod.GET)
	public BaseRet<SchoolJunfenRet> searchSchoolJunfen(Integer examInsId) {
		logger.info("学校均分统计信息查询 开始");
		BaseRet<SchoolJunfenRet> ret = new BaseRet<SchoolJunfenRet>();
		if (examInsId != null) {

			try {// 拼接路径
				ret.setCode(RetCode.SUCCESS);
				List<MtSchoolJunfenDto> dtos = junfenService.searchSchoolJunfen(examInsId, this.getCurrentUser().getId());

				SchoolJunfenRet junfenData = new SchoolJunfenRet();

				List<String> schoolNames = new ArrayList<String>();
				List<String> subjectNames = new ArrayList<String>();

				// 以学校为单位整理成绩数据
				Map<String, List<MtSchoolJunfenDto>> schoolMap = new HashMap<String, List<MtSchoolJunfenDto>>();
				for (MtSchoolJunfenDto dto : dtos) {
					List<MtSchoolJunfenDto> sjList = schoolMap.get(dto.getSchoolCode());
					if (sjList == null) {
						sjList = new ArrayList<MtSchoolJunfenDto>();

						schoolNames.add(dto.getSchoolName());
					}

					sjList.add(dto);

					schoolMap.put(dto.getSchoolCode(), sjList);
				}

				// 以科目为基准整理成绩数据
				Map<String, List<Double>> subjectMap = new HashMap<String, List<Double>>();
				for (String key : schoolMap.keySet()) {

					List<MtSchoolJunfenDto> sjs = schoolMap.get(key);
					for (MtSchoolJunfenDto mtSchoolJunfenDto : sjs) {
						List<Double> scores = subjectMap.get(mtSchoolJunfenDto.getSubject());
						if (scores == null) {
							scores = new ArrayList<Double>();
							subjectMap.put(mtSchoolJunfenDto.getSubject(), scores);

							subjectNames.add(mtSchoolJunfenDto.getSubject());
						}

						scores.add(mtSchoolJunfenDto.getJunfen());
					}
				}

				junfenData.setSchoolNames(schoolNames);
				junfenData.setSubjects(subjectNames);
				junfenData.setSubjectJunfen(subjectMap);

				ret.setData(junfenData);
			} catch (Exception e) {
				ret.setCode(RetCode.ERROR);
				ret.setMsg("学校均分统计信息查询 失败");
				logger.error("学校均分统计信息查询 异常中止!", e);
			}
			logger.info("学校均分统计信息查询 结束");
			return ret;

		}

		return null;
	}

	@ResponseBody
	@RequestMapping(value = "/searchClassJunfen", method = RequestMethod.GET)
	public BaseRet<ClassJunfenRet> searchClassJunfen(@RequestParam(value = "examInsId") Integer examInsId,
			@RequestParam(value = "schoolName") String schoolName) {
		logger.info("班级均分统计信息查询 开始");
		BaseRet<ClassJunfenRet> ret = new BaseRet<ClassJunfenRet>();

		try {// 拼接路径
			ret.setCode(RetCode.SUCCESS);

			WtrjSchoolInfo school = schoolService.searchSchoolByNickName(schoolName);

			List<MtClassJunfenDto> dtos = junfenService.searchClassJunfen(school.getCode(), examInsId);

			ClassJunfenRet junfenData = new ClassJunfenRet();

			List<String> classNames = new ArrayList<String>();
			List<String> subjectNames = new ArrayList<String>();

			// 以学校为单位整理成绩数据
			Map<String, List<MtClassJunfenDto>> classMap = new HashMap<String, List<MtClassJunfenDto>>();
			for (MtClassJunfenDto dto : dtos) {
				List<MtClassJunfenDto> sjList = classMap.get(dto.getClassName());
				if (sjList == null) {
					sjList = new ArrayList<MtClassJunfenDto>();

					classNames.add(dto.getClassName());
				}

				sjList.add(dto);

				classMap.put(dto.getClassName(), sjList);
			}

			// 以科目为基准整理成绩数据
			Map<String, List<Double>> subjectMap = new HashMap<String, List<Double>>();
			for (String key : classMap.keySet()) {

				List<MtClassJunfenDto> sjs = classMap.get(key);
				for (MtClassJunfenDto mtSchoolJunfenDto : sjs) {
					List<Double> scores = subjectMap.get(mtSchoolJunfenDto.getSubject());
					if (scores == null) {
						scores = new ArrayList<Double>();
						subjectMap.put(mtSchoolJunfenDto.getSubject(), scores);

						subjectNames.add(mtSchoolJunfenDto.getSubject());
					}

					scores.add(mtSchoolJunfenDto.getJunfen());
				}
			}

			junfenData.setClassNames(classNames);
			junfenData.setSubjects(subjectNames);
			junfenData.setSubjectJunfen(subjectMap);

			ret.setData(junfenData);
		} catch (Exception e) {
			ret.setCode(RetCode.ERROR);
			ret.setMsg("班级均分统计信息查询 失败");
			logger.error("班级均分统计信息查询 异常中止!", e);
		}
		logger.info("班级均分统计信息查询 结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/searchSdentScores", method = RequestMethod.GET)
	public BaseRet<StudentScoreRet> searchSdentScores(@RequestParam(value = "examInsId") Integer examInsId,
			@RequestParam(value = "className") String className) {
		logger.info("班级学生统计信息查询 开始");
		BaseRet<StudentScoreRet> ret = new BaseRet<StudentScoreRet>();

		try {// 拼接路径
			ret.setCode(RetCode.SUCCESS);

			List<WtrjRptScoreDetail> dtos = junfenService.searchStudentScores(className, examInsId);

			StudentScoreRet junfenData = new StudentScoreRet();

			List<String> studentNames = new ArrayList<String>();
			List<String> subjectNames = new ArrayList<String>();

			// 以学生为单位整理成绩数据
			Map<String, List<WtrjRptScoreDetail>> studentMap = new HashMap<String, List<WtrjRptScoreDetail>>();
			for (WtrjRptScoreDetail dto : dtos) {
				List<WtrjRptScoreDetail> sjList = studentMap.get(dto.getStudentName());
				if (sjList == null) {
					sjList = new ArrayList<WtrjRptScoreDetail>();

					studentNames.add(dto.getStudentName());
				}

				sjList.add(dto);

				studentMap.put(dto.getStudentName(), sjList);
			}

			// 以科目为基准整理成绩数据
			Map<String, List<Double>> subjectMap = new HashMap<String, List<Double>>();
			for (String key : studentMap.keySet()) {

				List<WtrjRptScoreDetail> sjs = studentMap.get(key);
				for (WtrjRptScoreDetail detail : sjs) {
					List<Double> scores = subjectMap.get(detail.getSubject());
					if (scores == null) {
						scores = new ArrayList<Double>();
						subjectMap.put(detail.getSubject(), scores);

						subjectNames.add(detail.getSubject());
					}

					scores.add(detail.getScore() == null ? 0 : detail.getScore().doubleValue());
				}
			}

			junfenData.setStudentNames(studentNames);
			junfenData.setSubjects(subjectNames);
			junfenData.setSubjectScores(subjectMap);

			ret.setData(junfenData);
		} catch (Exception e) {
			ret.setCode(RetCode.ERROR);
			ret.setMsg("班级学生统计信息查询 失败");
			logger.error("班级学生统计信息查询 异常中止!", e);
		}
		logger.info("班级学生统计信息查询 结束");
		return ret;
	}
}
