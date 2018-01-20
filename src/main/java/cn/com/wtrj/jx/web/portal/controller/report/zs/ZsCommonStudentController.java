package cn.com.wtrj.jx.web.portal.controller.report.zs;

import java.util.ArrayList;
import java.util.List;

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

import cn.com.wtrj.jx.web.portal.common.Constant.RetCode;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.report.zs.dto.ZsScheduleBean;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.zs.ZsGradeRet;
import cn.com.wtrj.jx.web.portal.controller.response.zs.ZsSchoolRoleRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjSchoolInfo;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleSchoolDto;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleSchoolRelationshipService;
import cn.com.wtrj.jx.web.portal.util.HttpRequestUtil;

@Controller
public class ZsCommonStudentController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(ZsCommonStudentController.class);

	@Autowired
	IRoleSchoolRelationshipService roleSchoolService;
	
	@Autowired
	IWtrjSchoolInfoService schoolInfoService;
	

	/**
	 * 获取用户的学校权限
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/searchZsRoleSchoolInfo", method = RequestMethod.GET)
	public BaseRet<List<ZsSchoolRoleRet>> searchZsRoleSchoolInfo() {
		logger.info("获取用户的学校权限 开始");
		BaseRet<List<ZsSchoolRoleRet>> ret = new BaseRet<List<ZsSchoolRoleRet>>();
		
		try {
			ret.setCode(RetCode.SUCCESS);
			
			// 查询学校列表
			List<ZsSchoolRoleRet> schoolList = new ArrayList<ZsSchoolRoleRet>();
			
			List<MtRoleSchoolDto> dtos = roleSchoolService.searchRoleSchoolInfoByUserId(this.getCurrentUser().getId());
			if (dtos != null && dtos.size() > 0) {
				for (MtRoleSchoolDto dto : dtos) {
					ZsSchoolRoleRet school = new ZsSchoolRoleRet();
					school.setSchoolCode(dto.getSchoolCode());
					school.setSchoolName(dto.getNickName());
					
					schoolList.add(school);
				}
				
				if (dtos.size() > 1) {
					ZsSchoolRoleRet r = new ZsSchoolRoleRet();
					
					r.setSchoolCode("00");
					r.setSchoolName("全部");
					schoolList.add(0, r);
				}
			}
			
			ret.setData(schoolList);
			
		} catch (Exception e) {
			ret.setCode(RetCode.ERROR);
			ret.setMsg("查询失败");
			logger.error("异常中止!", e);
		}
		ret.setMsg("查询成功");
		logger.info("获取用户的学校权限 结束");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "/searchZsGradeInfo", method = RequestMethod.GET)
	public BaseRet<List<ZsGradeRet>> searchZsGradeInfo(String schoolCode) {
		logger.info("获取学校招生计划 开始");
		BaseRet<List<ZsGradeRet>> ret = new BaseRet<List<ZsGradeRet>>();
		
		try {
			ret.setCode(RetCode.SUCCESS);
			
			List<ZsGradeRet> grades = new ArrayList<ZsGradeRet>();
			
			if ("00".equals(schoolCode)) {
				ZsGradeRet g = new ZsGradeRet();
				g.setKey("初一");
				g.setValue("小升初");
				
				grades.add(g);
				
				g = new ZsGradeRet();
				g.setKey("高一");
				g.setValue("初升高");
				
				grades.add(g);
				
			}else if(schoolCode.startsWith("02")) {
				// 锦江校区初中部
				if ("0202".equals(schoolCode)) { 
					ZsGradeRet g = new ZsGradeRet();
					g.setKey("初一");
					g.setValue("小升初");
					
					grades.add(g);
				} else if("0203".equals(schoolCode)) {
					// 锦江校区高中部
					ZsGradeRet g = new ZsGradeRet();
					g.setKey("高一");
					g.setValue("初升高");
					
					grades.add(g);
				} else if("0204".equals(schoolCode)) {
					// 锦江校区国高部
					ZsGradeRet g = new ZsGradeRet();
					g = new ZsGradeRet();
					g.setKey("高一");
					g.setValue("初升高");
					
					grades.add(g);
				}
			} else {
				WtrjSchoolInfo info = schoolInfoService.searchSchoolBySchoolCode(schoolCode);
				
				// 按学校查询招生计划列表
				StringBuilder scheduleURL = new StringBuilder("http://112.74.183.42:8081/zs/schedule/search");
				scheduleURL.append("?schoolId=" + info.getZsSchoolId());
				
				JsonArray scheduleJsonArray = HttpRequestUtil.httpGetArray(scheduleURL.toString());
				
				boolean mapKeyExist1 = false;
				boolean mapKeyExist2 = false;
				for (JsonElement jsonElement : scheduleJsonArray) {
					Gson gson = new Gson();
					ZsScheduleBean bean = gson.fromJson(jsonElement, ZsScheduleBean.class);
					
					ZsGradeRet g = new ZsGradeRet();
					
					if ("初一".equals(bean.getZsGrade()) && !mapKeyExist1) {
						g.setKey("初一");
						g.setValue("小升初");
						
						mapKeyExist1 = true;
					} else if ("高一".equals(bean.getZsGrade()) && !mapKeyExist2) {
						g.setKey("高一");
						g.setValue("初升高");
						
						mapKeyExist2 = true;
					} else {
						continue;
					}
					
					grades.add(g);
				}
			}
			
			
			ret.setData(grades);
			
		} catch (Exception e) {
			ret.setCode(RetCode.ERROR);
			ret.setMsg("查询失败");
			logger.error("异常中止!", e);
		}
		ret.setMsg("查询成功");
		logger.info("获取学校招生计划 结束");
		return ret;
	}

}
