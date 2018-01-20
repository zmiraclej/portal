package cn.com.wtrj.jx.web.portal.controller.report.zs;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleSchoolDto;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleSchoolRelationshipService;

@Controller
public class ZsStudentTypeController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(ZsStudentTypeController.class);

	@Autowired
	IRoleSchoolRelationshipService roleSchoolService;

	@Autowired
	IWtrjSchoolInfoService schoolInfoService;

	@Value("${jinjiang.schedule.chuzhong}")
	String jxChuzhongScheduleId;

	@Value("${jinjiang.schedule.gaozhong}")
	String jxGaozhongScheduleId;

	@Value("${jinjiang.schedule.guogao}")
	String jxGuogaoScheduleId;

	@Value("${server.esb.ip}")
	String serverIp;

	/**
	 * 招生类别统计初始化(加载全部学校列表，默认选中点击的学校和招生计划)
	 * 
	 * @param request
	 * @param schoolId
	 *            选中的学校ID
	 * @param scheduleId
	 *            选中的招生计划ID
	 * @return
	 */
	@RequestMapping(value = "/studentTypeInit")
	public String studentSourceInit(Map<String, Object> model, HttpServletRequest request, Integer schoolId, Integer scheduleId, String beginDate,
			String endDate) {
		logger.info("招生类别统计初始化开始");
		try {
			// 直接点击菜单跳转，设置ID为-1（全部）
			if (schoolId == null || "".equals(schoolId)) {
				schoolId = -1;
			} // 直接点击菜单跳转，设置ID为-1（全部）
			if (scheduleId == null || "".equals(scheduleId)) {
				scheduleId = -1;
			}
			logger.info("招生类别统计初始化开始[schoolId=" + schoolId + ",scheduleId=" + scheduleId + "]");
			// 查询学校列表

			List<MtRoleSchoolDto> dtos = roleSchoolService.searchRoleSchoolInfoByUserId(this.getCurrentUser().getId());
			if (dtos != null && dtos.size() == 1) {
				model.put("schoolName", dtos.get(0).getNickName());

			} else if (dtos != null && dtos.size() > 1) {
				model.put("schoolName", "集团");
			}

			// 如果直接点击菜单跳转未传入日期，需重新设置默认值，如果传入，则设置
			if (beginDate == null || "".equals(beginDate)) {
				// 设置默认起始日期为三个月前
				Calendar cal = Calendar.getInstance();
				cal.add(Calendar.MONTH, -3);
				beginDate = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
				request.setAttribute("beginDate", beginDate);
			}
			// 封装点击时起始日期（用于设置默认选中值）
			request.setAttribute("beginDate", beginDate);
			if (endDate == null || "".equals(endDate)) {
				endDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
			}
			// 封装点击时所选的结束日期（用于设置默认选中值）
			request.setAttribute("endDate", endDate);

			request.setAttribute("id", MenuId.STUDENT_TYPE);

			this.doCommonSetting(model);

		} catch (Exception e) {
			logger.error("异常中止！", e);
		}
		logger.info("招生类别统计初始化结束");
		return "report/zs/studentType";
	}
}
