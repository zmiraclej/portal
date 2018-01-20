package cn.com.wtrj.jx.web.portal.controller.report.zs;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonArray;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.report.zs.dto.ZsStudentPlaceBean;
import cn.com.wtrj.jx.web.portal.controller.request.zs.ZsStudentPlaceQueryParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.SourcePlaceInfo;
import cn.com.wtrj.jx.web.portal.controller.response.SourcePlaceRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjSchoolInfo;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleSchoolDto;
import cn.com.wtrj.jx.web.portal.service.IWtrjSchoolInfoService;
import cn.com.wtrj.jx.web.portal.service.setting.IRoleSchoolRelationshipService;
import cn.com.wtrj.jx.web.portal.util.GSONUtils;
import cn.com.wtrj.jx.web.portal.util.HttpRequestUtil;

/**
 * 招生-生源地
 * @author wusm
 *
 */
@Controller
public class ZsStudentPlaceController extends BaseController {
	private final static Logger logger = LoggerFactory.getLogger(ZsHistoryController.class);
	
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
	 * 生源地统计初始化数据
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/sourcePlaceInit")
	public String sourcePlaceInit(Map<String, Object> model) {
		logger.info("生源地统计初始化数据开始");
		try {
			// 查询学校列表
			MtRoleSchoolDto roleSchool = getUserOwnSchool();
			if (roleSchool != null) {
				model.put("schoolName", roleSchool.getNickName());
			} else {
				model.put("schoolName", "集团");
				
			}
			
			List<String> yearList = new ArrayList<String>();
			yearList.add("2017");
			model.put("yearList", yearList);
			
			model.put("id", MenuId.SOURCE_PLACE);
			
			this.doCommonSetting(model);
			
		} catch (Exception e) {
			logger.error("异常中止!", e);
		}
		
		logger.info("生源地统计初始化数据结束");
		return "report/zs/sourcePlace";
	}

	/**
	 * 生源地统计数据查询
	 * 
	 * @param schoolId
	 *            学校ID
	 * @param scheduleType
	 *            招生类型
	 * @param year
	 *            年份
	 * @return 生源地统计数据记录	
	 */
	@RequestMapping(value = "/sourcePlaceSearch", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<List<SourcePlaceRet>> sourcePlaceSearch(@RequestBody ZsStudentPlaceQueryParam param) {
		logger.info("按学校、招生类别、年份查询生源地开始");
		BaseRet<List<SourcePlaceRet>> ret = new BaseRet<List<SourcePlaceRet>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			
			String url = "http://"+serverIp+":8081/zs/city?";
			
			StringBuilder sb = new StringBuilder();
			sb.append(url);
			
			// 锦江校区初中部
			if ("0202".equals(param.getSchoolCode())) { 
				sb.append("scheduleId="+jxChuzhongScheduleId);
				
			} else if ("0203".equals(param.getSchoolCode())) {
				// 锦江校区高中部
				sb.append("scheduleId="+jxGaozhongScheduleId);
				
			} else if ("0204".equals(param.getSchoolCode())) {
				// 锦江校区国高部
				sb.append("scheduleId="+jxGuogaoScheduleId);
				
			} else if (!"00".equals(param.getSchoolCode())) {
				
				WtrjSchoolInfo info = schoolInfoService.searchSchoolBySchoolCode(param.getSchoolCode());
				
				sb.append("schoolId="+info.getZsSchoolId());
				sb.append("&zsGrade="+param.getZsGrade());
			} else {
				sb.append("zsGrade="+param.getZsGrade());
			}
		
			
			JsonArray recordsArray = HttpRequestUtil.httpGetArray(sb.toString());
			
			List<SourcePlaceInfo> SourcePlaceInfoList = new ArrayList<SourcePlaceInfo>();
			List<SourcePlaceRet> records = new ArrayList<SourcePlaceRet>();
			// 存放城市名称列表（不可重复）
			Set<String> cityFullNames = new HashSet<String>();
			
			for (int i = 0; i < recordsArray.size(); i++) {
				
				Gson gson = new Gson(); 
				ZsStudentPlaceBean bean = gson.fromJson(recordsArray.get(i), ZsStudentPlaceBean.class);
				
				SourcePlaceInfo sourcePlace = new SourcePlaceInfo();
				
				// 省名
				sourcePlace.setProvice(bean.getProvice());
				// 城市名
				sourcePlace.setCity(bean.getCity());
				// 录取人数
				sourcePlace.setLuquNum(bean.getLuquNum()==null?0:bean.getLuquNum());
				// 学校名
				sourcePlace.setSchoolName(bean.getSchoolName());
				// 招生计划名
				sourcePlace.setScheduleName(bean.getScheduleName());
				// 招生类别
				sourcePlace.setZsGrade(bean.getZsGrade());
				// 学校ID
				sourcePlace.setSchoolId(bean.getSchoolId());
				// 招生计划ID
				sourcePlace.setScheduleId(bean.getScheduleId());
				String province = sourcePlace.getProvice();
				if ("北京市".equals(province) || "上海市".equals(province) || "天津市".equals(province) || "重庆市".equals(province)) {
					// 直辖市直接以省级名称完整名称
					sourcePlace.setFullName(province);
				} else {
					// 非直辖市以省名+市名作为完整名称
					sourcePlace.setFullName(province + sourcePlace.getCity());
				}
				if (sourcePlace.getProvice() != null && !"null".equals(sourcePlace.getProvice())) {
					SourcePlaceInfoList.add(sourcePlace);
					// 把不重复且有效的完整名称列表存放起来
					cityFullNames.add(sourcePlace.getFullName());
				}
			}
			// 按地区统计录取人数
			for (String str : cityFullNames) {
				SourcePlaceRet record = new SourcePlaceRet();
				// 设置地区名
				record.setFullName(str);
				for (int i = 0; i < SourcePlaceInfoList.size(); i++) {
					SourcePlaceInfo sourcePlace = SourcePlaceInfoList.get(i);
					// 地区名匹配成功，累计录取人数
					if (str.equals(sourcePlace.getFullName())) {
						record.setLuquNum(record.getLuquNum() + sourcePlace.getLuquNum());
					}
				}
				records.add(record);
			}
			
			// 默认取人数最多的前十个地区（不足10则全取）
			ret.setData(GSONUtils.sort(records));
		} catch (Exception e) {
			logger.error("生源地查询异常！",e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		logger.info("按学校、招生类别、年份查询生源地结束");
		
		return ret;
	}
}
