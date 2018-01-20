package cn.com.wtrj.jx.web.portal.controller.report.zs;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;

import cn.com.wtrj.jx.web.portal.common.Constant.RetCode;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.report.zs.dto.ZsScheduleBean;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.ScheduleRet;
import cn.com.wtrj.jx.web.portal.controller.response.zs.ZsGradeRet;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleSchoolRelationshipService;
import cn.com.wtrj.jx.web.portal.util.GSONUtils;
import cn.com.wtrj.jx.web.portal.util.HttpRequestUtil;

@Controller
public class RecruitStudentController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(RecruitStudentController.class);

	@Autowired
	IRoleSchoolRelationshipService roleSchoolService;
	

	/**
	 * 按学校查询招生计划列表
	 * 
	 * @param schoolId
	 *            学校id
	 * @return 数据封装后的实体
	 */
	@ResponseBody
	@RequestMapping(value = "/searchScheduleBySchool", method = RequestMethod.GET)
	public BaseRet<List<ScheduleRet>> searchSchedule(int schoolId) {
		logger.info("按学校查询招生计划开始[schoolId=" + schoolId + "]");
		BaseRet<List<ScheduleRet>> ret = new BaseRet<List<ScheduleRet>>();
		ret.setCode(RetCode.SUCCESS);
		try {// 拼接路径
			String url = GSONUtils.getStandardURL("http://112.74.183.42:8081/zs/schedule/search", schoolId, -1, "全部",
					null, null, null);
			// 调用接口获取数据JSON数组
			JsonArray scheduleJsonArray = HttpRequestUtil.httpGetArray(url);
			// 把JSON数组转化为指定泛型的List
			List<ScheduleRet> scheduleList = GSONUtils.toList(String.valueOf(scheduleJsonArray),
					new TypeToken<List<ScheduleRet>>() {
					}.getType());
			ret.setData(scheduleList);
		} catch (Exception e) {
			ret.setCode(RetCode.ERROR);
			ret.setMsg("查询失败");
			logger.error("异常中止!", e);
		}
		ret.setMsg("查询成功");
		logger.info("按学校查询招生计划结束");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "/searchZsGradeBySchoolId", method = RequestMethod.GET)
	public BaseRet<List<ZsGradeRet>> searchZsGradeBySchoolId(int schoolId) {
		logger.info("按学校查询招生计划开始[schoolId=" + schoolId + "]");
		BaseRet<List<ZsGradeRet>> ret = new BaseRet<List<ZsGradeRet>>();
		ret.setCode(RetCode.SUCCESS);
		try {// 拼接路径
			StringBuilder scheduleURL = new StringBuilder("http://112.74.183.42:8081/zs/schedule/search");
			if (schoolId != -1) {
				scheduleURL.append("?schoolId=" + schoolId);
			}
			JsonArray scheduleJsonArray = HttpRequestUtil.httpGetArray(scheduleURL.toString());
			
			List<ZsGradeRet> zsGrades = new ArrayList<ZsGradeRet>();
			
			boolean mapKeyExist1 = false;
			boolean mapKeyExist2 = false;
			for (JsonElement jsonElement : scheduleJsonArray) {
				Gson gson = new Gson();
				ZsScheduleBean bean = gson.fromJson(jsonElement, ZsScheduleBean.class);
				
				ZsGradeRet grade = new ZsGradeRet();
				
				if ("初一".equals(bean.getZsGrade()) && !mapKeyExist1) {
					grade.setKey("初一");
					grade.setValue("小升初");
					
					mapKeyExist1 = true;
				} else if ("高一".equals(bean.getZsGrade()) && !mapKeyExist2) {
					grade.setKey("高一");
					grade.setValue("初升高");
					
					mapKeyExist2 = true;
				} else {
					continue;
				}
				
				zsGrades.add(grade);
			}
			
			ret.setData(zsGrades);
		} catch (Exception e) {
			ret.setCode(RetCode.ERROR);
			ret.setMsg("查询失败");
			logger.error("异常中止!", e);
		}
		ret.setMsg("查询成功");
		logger.info("按学校查询招生计划结束");
		return ret;
	}

	/**
	 * 新生毕业院校初始化
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "graduatedFrom")
	public String graduatedFromInit(Map<String, Object> model,HttpServletRequest request) {
		logger.info("新生毕业院校初始化开始");
		List<String> yearList = new ArrayList<String>();
		yearList.add("2017");
		request.setAttribute("yearList", yearList);
		
		logger.info("新生毕业院校初始化结束");
		return "report/zs/graduatedFrom";
	}
}
