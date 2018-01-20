package cn.com.wtrj.jx.web.portal.controller.notice;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.base.Strings;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.ClassTreeNode;
import cn.com.wtrj.jx.web.portal.controller.request.TreeClassInfo;
import cn.com.wtrj.jx.web.portal.controller.request.TreeGradeInfo;
import cn.com.wtrj.jx.web.portal.controller.request.notice.NoticeAddParam;
import cn.com.wtrj.jx.web.portal.controller.request.notice.NoticeClassSelectParam;
import cn.com.wtrj.jx.web.portal.controller.request.notice.NoticeGradeSelectParam;
import cn.com.wtrj.jx.web.portal.controller.request.notice.ParentSelectParam;
import cn.com.wtrj.jx.web.portal.controller.request.notice.Sms;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.notice.Notice;
import cn.com.wtrj.jx.web.portal.controller.response.notice.ParentNotice;
import cn.com.wtrj.jx.web.portal.controller.response.notice.ParentNoticeStatus;
import cn.com.wtrj.jx.web.portal.job.SmsJob;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjEcomNotice;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtParentNoticeSendStatus;
import cn.com.wtrj.jx.web.portal.service.dto.notice.EcomPermisson;
import cn.com.wtrj.jx.web.portal.service.dto.notice.NoticeClassKey;
import cn.com.wtrj.jx.web.portal.service.dto.notice.NoticeGradeKey;
import cn.com.wtrj.jx.web.portal.service.dto.notice.NoticeParentKey;
import cn.com.wtrj.jx.web.portal.service.impl.SmsService;
import cn.com.wtrj.jx.web.portal.service.notice.IEcomNoticeService;
import cn.com.wtrj.jx.web.portal.service.notice.IEcomPermissionService;
import cn.com.wtrj.jx.web.portal.util.NamesGenerationUtil;
import me.chanjar.weixin.common.exception.WxErrorException;
import oracle.net.aso.o;


@Controller
@RequestMapping("/")
public class NoticeController extends BaseController {
	private static Logger logger = Logger.getLogger(NoticeController.class);
	
	private static final String PARENT_AUTH = "parentAuth";

	@Autowired
	IEcomNoticeService noticeService;

	@Autowired
	IEcomPermissionService parentAuthService;

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

	@Value("${notice_default_pic_url}")
	private String noticeDefaultPic;
	
	@Autowired
	private SmsService smsService;
	
	@Value("${sms_shortmessage_send_api}")
	private String sendShortMsgUrl;
	
	
	@Value("${sms_wx_send_api}")
	private String sendWxUrl;
	
	/**
	 * 短信发送开关
	 */
	@Value("${sms_send_flag}")
	private Boolean smsSendFlag;

	
	/**
	 * 线程池的管理工具 调度型线程池
	 */
	private final static ScheduledExecutorService msScheduler = Executors.newScheduledThreadPool(10);
	/**
	 * 家长通知
	 */
	@RequestMapping("/toParenteNotice")
	public String toParenteNotice(Model model, Map<String, Object> params, HttpServletRequest request) {
		logger.info("跳转到家长通知页面 开始");
		try {
			model.addAttribute("ctx", request.getContextPath());
			params.put("id", MenuId.PARENT_NOTICE);
			doCommonSetting(params);
			clearSelectStatus();
		} catch (Exception e) {
			logger.error(e.toString());
			logger.info("跳转到家长通知页面错误");
		}
		logger.info("跳转到家长通知页面结束");
		return "notice/index";
	}
	
	private void clearSelectStatus() {
		EcomPermisson p = this.getTeacherPermission();
		p.setClassSelected(null);
		p.setGradeSelected(null);
		super.saveTeacherPermission(p);
	}

	
	/**
	 *树形结构
	 * @param pid
	 * @return
	 */
	
	@RequestMapping("/parentNotice/searchClassTree")
	@ResponseBody
	public BaseRet<List<ClassTreeNode>> searchTree(@RequestParam(value="pid") String pid) {
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
				info.setName(parentAuthService.getSchoolNameByCode(key));
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
				gi.setClassKeyNo(dto.getSchoolCode() + "_" + dto.getStage() + "_" + dto.getGrade() + "_"
						+ dto.getClassNo());

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

			List<NoticeParentKey> teacherDtos = permisson.getOwnedParents();
			for (NoticeParentKey dto : teacherDtos) {

				ClassTreeNode subNode = new ClassTreeNode();
				subNode.setpId("C" + dto.getSchoolCode() + "_" + dto.getStage() + "_" + dto.getGrade() + "_"
						+ dto.getClassNo());
				subNode.setId("P" + dto.getParentKeyNo());
				subNode.setName(dto.getStudentName() + " --家长-"+ dto.getParentName() + "-" + dto.getParentPhone());
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

	@RequestMapping(value = "/parentNotice/saveParentGradeSelect", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveParentGradeSelect(@RequestBody List<NoticeGradeSelectParam> grades) {
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
	 * 保存家长选择数据
	 * 
	 * @param teachers
	 * @return
	 */
	@RequestMapping(value = "/parentNotice/saveParentSelect", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveParentSelect(@RequestBody List<ParentSelectParam> parents) {
		logger.info("保存家长选择 开始！");

		BaseRet<String> ret = new BaseRet<String>();
		try {

			ret.setCode(Constant.RetCode.SUCCESS);
			EcomPermisson p = this.getTeacherPermission();
			//EcomPermisson p = this.getParentAuth();
			Map<String, Boolean> map = p.getParentSelected();
			if (map == null) {
				map = new HashMap<String, Boolean>();
			}
			for (ParentSelectParam sp : parents) {
				map.put(sp.getParentKeyNo(), sp.getSelected());
			}
			p.setParentSelected(map);
			
			//refreshTeacherSelectStatus(p);
			
			super.saveTeacherPermission(p);
			
			

			ret.setData("");
		} catch (Exception e) {
			logger.error("保存家长选择 异常！", e);

			ret.setCode(Constant.RetCode.ERROR);
		}

		logger.info("保存家长选择 结束！");
		return ret;
	}
	

	@RequestMapping(value = "/parentNotice/saveParentClassSelect", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveParentClassSelect(@RequestBody List<NoticeClassSelectParam> grades) {
		logger.info("保存班级选择 开始！" + grades);

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
			
			// ------------更新家长状态------------------------
			List<NoticeParentKey> parentKeys = p.getOwnedParents();
			Map<String, Boolean> parentSelectedMap = p.getClassSelected();
			if (parentSelectedMap == null) {
				parentSelectedMap = new HashMap<String, Boolean>();
			}

			for (NoticeClassSelectParam classInfo : grades) {
				String[] keys = classInfo.getClassKeyNo().split("_");

				for (NoticeParentKey noticeParentKey : parentKeys) {
					if (keys.length > 3 && noticeParentKey.getSchoolCode().equals(keys[0])
							&& noticeParentKey.getStage() == Integer.valueOf(keys[1])
							&& noticeParentKey.getGrade() == Integer.valueOf(keys[2])
							&& noticeParentKey.getClassNo() == Integer.valueOf(keys[3])) {
						parentSelectedMap.put(noticeParentKey.getParentKeyNo(), classInfo.getSelected());
					}

				}
			}
			p.setParentSelected(parentSelectedMap);
			//refreshTeacherSelectStatus(p);
			
			super.saveTeacherPermission(p);

			ret.setData("");
		} catch (Exception e) {
			logger.error("保存班级选择 异常！", e);

			ret.setCode(Constant.RetCode.ERROR);
		}

		logger.info("保存班级选择 结束！");
		return ret;
	}
	
	@RequestMapping(value = "/parentNotice/searchSelectedInfo")
	@ResponseBody
	public BaseRet<Map<String, Object>> searchSelectedInfo() {
		logger.info("查询选择数据");
		BaseRet<Map<String, Object>> rs = new BaseRet<Map<String, Object>>();

		try {
			rs.setCode(Constant.RetCode.SUCCESS);
			EcomPermisson permisson = this.getTeacherPermission();

			int selected = 0;

			List<String> parents = new ArrayList<String>();

			Map<String, Boolean> ps = permisson.getParentSelected();

			List<NoticeParentKey> npks = permisson.getOwnedParents();
			if (npks != null && ps != null) {
				for (NoticeParentKey key : npks) {
					if (ps.get(key.getParentKeyNo()) == null ? false : ps.get(key.getParentKeyNo())) {
						selected++;
						parents.add(key.getStudentName()+ "_家长-" + key.getParentName());
					}
				}
			}
			Map<String, Object> ret = new HashMap<String, Object>();
			ret.put("total", npks == null ? 0 : npks.size());
			ret.put("selected", selected);
			ret.put("selectedParents", parents);

			rs.setData(ret);
		} catch (Exception e) {
			logger.error("查询教师选择数据 失败");
			rs.setCode(Constant.RetCode.ERROR);
		}

		return rs;
	}
	
	@RequestMapping("/toPratentNoticeIframe")
	public String toPratentNoticeIframe(Model models,Map<String, Object> model, HttpServletRequest request) {
		logger.info("跳转到家长通知页面 读取");
		try {
			models.addAttribute("ctx", request.getContextPath());
			//查询通知信息装入集合中
			List<WtrjEcomNotice> notices = noticeService.searhNoticeByTeacherId(this.getCurrentUser().getTeacherId());
			//创建月份相关的通知map
			Map<String, List<Notice>> map = new HashMap<String, List<Notice>>();
			//循环获取集合内容和时间
			for (WtrjEcomNotice record : notices) {
				Calendar publishTime = Calendar.getInstance();
				publishTime.setTime(record.getPulishTime());
				Integer month = publishTime.get(Calendar.MONTH) + 1;
				Integer day = publishTime.get(Calendar.DAY_OF_MONTH);
				Integer hour = publishTime.get(Calendar.HOUR_OF_DAY);
				Integer minute = publishTime.get(Calendar.MINUTE);

				List<Notice> pn = map.get(String.valueOf(month));
				if (pn == null) {
					pn = new ArrayList<Notice>();//获取不到内容则新建通知集合
				}

				Notice p = new Notice();//新建通知对象
				p.setTitle(record.getTitle());//添加通知标题
				p.setPublishTime(month + "月" + day + "日 " + hour + ":" + minute);//添加通知时间
				p.setNoticeNo(record.getNoticeNo());//添加通知编号

				pn.add(p);//将同值对象添加到通知集合当中

				map.put(String.valueOf(month), pn);//添加通知集合到map当中,key为月份
			}
			
			List<ParentNotice> pnList = new ArrayList<ParentNotice>();//创建每个月的通知集合
			//遍历map添加
			for (String key : map.keySet()) {
				ParentNotice pn = new ParentNotice();
				pn.setMonth(Integer.valueOf(key));
				pn.setNotices(map.get(key));

				pnList.add(pn);
			}
			//比较器比较
			Comparator<ParentNotice> pnt = new Comparator<ParentNotice>() {

				@Override
				public int compare(ParentNotice o1, ParentNotice o2) {
					if (o1.getMonth() < o2.getMonth()) {
						return 1;
					}
					if (o1.getMonth() > o2.getMonth()) {
						return -1;
					}
					return 0;
				}
			};
			//排序
			Collections.sort(pnList, pnt);
			//添加到model
			model.put("array", pnList);
			
			Object auth = SecurityUtils.getSubject().getSession().getAttribute(PARENT_AUTH);
			int selectedNum = 0;
			if (auth != null) {
				EcomPermisson per = (EcomPermisson) auth;
				Map<String, Boolean> map1 = per.getParentSelected();
				if (map1 != null) {
					for (String key : map1.keySet()) {
						if (map1.get(key) == null ? false : map1.get(key)) {
							selectedNum = selectedNum + 1;
						}
					}
				}
			}

			model.put("selectedNum", selectedNum);

			Object obj = SecurityUtils.getSubject().getSession().getAttribute("tempNoticeInfo");
			if (obj != null) {
				model.put("tempNoticeInfo", obj);
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			logger.info("跳转到家长通知页面 读取错误");
		}
		return "notice/parentNotice-iframe";
	}
	
	
	/**
	 * 家长通知详情查询
	 */
	@RequestMapping("/detail/{noticeNo}")
	public String toEcomNoticeDetail(@PathVariable("noticeNo") String noticeNo, Map<String, Object> model) {
		logger.info("跳转到通知明细页面 开始");
		//根据消息编号查询信息
		WtrjEcomNotice dto = noticeService.searchNoticeDetailByNoticeNo(noticeNo);
		model.put("title", dto.getTitle());
		model.put("content", dto.getContent());
		
		Map<String, ParentNoticeStatus> statusMap = new HashMap<String, ParentNoticeStatus>();
		List<MtParentNoticeSendStatus> shortMsgs = noticeService.searchParentNoticeSendStatus(noticeNo);
		if (shortMsgs != null) {
			for (MtParentNoticeSendStatus sm : shortMsgs) {
				ParentNoticeStatus status = statusMap.get(sm.getMobile());
				if (status == null) {
					status = new ParentNoticeStatus();
					status.setStudentName(sm.getStudentName());
					status.setParentName(sm.getParentName());
					status.setMobile(sm.getMobile());
					status.setShortMsgStatus("未发送");
					status.setWxStatus("未发送");
				}

				String state = sm.getStatus();
				if ("2".equals(sm.getMsgType())) {
					switch (state) {
					case "2":
						status.setShortMsgStatus("发送中");
						break;
					case "3":
						status.setShortMsgStatus("失败");
						break;
					case "1":
						status.setShortMsgStatus("成功");
						break;

					default:
						status.setShortMsgStatus("未发送");
						break;
					}
				} else {
					switch (state) {
					case "2":
						status.setWxStatus("发送中");
						break;
					case "3":
						status.setWxStatus("失败");
						break;
					case "1":
						status.setWxStatus("成功");
						break;

					default:
						status.setWxStatus("未发送");
						break;
					}
				}

				statusMap.put(sm.getMobile(), status);
			}
		}

		List<ParentNoticeStatus> ns = new ArrayList<ParentNoticeStatus>();
		for (String key : statusMap.keySet()) {
			ns.add(statusMap.get(key));
		}

		model.put("sendDetails", ns);

		logger.info("跳转到通知明细页面 结束");
		return "notice/noticeDetail";
	}
	
	private void sendWx(String uid, String content, Map<String, List<String>> mobiles) throws WxErrorException {

		for (String key : mobiles.keySet()) {

			String sendAppid = "";
			Integer agentId = null;
			String sendSecret = "";

			Integer schoolCode = Integer.valueOf(key);
			if (schoolCode >= 1 && schoolCode <= 5) {
				sendAppid = this.sendAppidJinjiang;
				agentId = this.agentIdJinjiang;
				sendSecret = this.sendSecretJinjiang;
			} else if (schoolCode >= 6 && schoolCode <= 9) {
				sendAppid = this.sendAppidChenghua;
				agentId = this.agentIdChenghua;
				sendSecret = this.sendSecretChenghua;
			} else if (schoolCode >= 10 && schoolCode <= 13) {
				sendAppid = this.sendAppidPixian;
				agentId = this.agentIdPixian;
				sendSecret = this.sendSecretPixian;
			} else if (schoolCode >= 14 && schoolCode <= 17) {
				sendAppid = this.sendAppidBeicheng;
				agentId = this.agentIdBeicheng;
				sendSecret = this.sendSecretBeicheng;
			} else if (schoolCode >= 18 && schoolCode <= 21) {
				sendAppid = this.sendAppidDazhou;
				agentId = this.agentIdDazhou;
				sendSecret = this.sendSecretDazhou;
			} else if (schoolCode >= 22 && schoolCode <= 25) {
			}

			msScheduler.schedule(new cn.com.wtrj.jx.web.portal.controller.request.notice.WxJob(sendWxUrl, "1", sendAppid, sendSecret, agentId, content, uid, smsService,
					mobiles.get(key)), 1, TimeUnit.SECONDS);
		}

	}
	
	private void sendSms(String content, String msgCode, List<String> mobiles) {

		if (Strings.isNullOrEmpty(content))
			return;

		if (mobiles == null || mobiles.size() == 0)
			return;

		Sms sms = new Sms(sendShortMsgUrl, "2", "0", content, msgCode, mobiles);

		// 异步执行短信任务
		msScheduler.schedule(new SmsJob(sms, smsService), 1, TimeUnit.SECONDS);

	}

	@RequestMapping(value = "/saveNotice", method = RequestMethod.POST)
	@ResponseBody
	public BaseRet<String> saveNotice(@RequestBody NoticeAddParam param) {
		logger.info("保存通知 开始！");

		BaseRet<String> ret = new BaseRet<String>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);

			String content = editContent(param.getContent());

			WtrjEcomNotice record = new WtrjEcomNotice();
			record.setTitle(param.getTitle());
			record.setContent(content);
			record.setPulishTime(Calendar.getInstance().getTime());
			record.setTeacherId(this.getCurrentUser().getTeacherId());
			// 通知公告类型
			record.setType(Constant.NoticeType.NOTICE);
			// 通知单号
			UUID uid = UUID.randomUUID();
			record.setNoticeNo(uid.toString());
			
			noticeService.saveNotice(record);

			Object obj = SecurityUtils.getSubject().getSession().getAttribute("wtrj_portal_teacher_auth");
			if (obj != null) {
				EcomPermisson permisson = (EcomPermisson) obj;
				Map<String, List<String>> ps = this.getSelectedParentFromPermisson(permisson);

				// 微信通知
				sendWx(uid.toString(), param.getContent(), ps);

				// 发送短信,判断是否开启短信发送
				if (smsSendFlag && param.isSendMessageFlg()) {
					for (String key : ps.keySet()) {
						sendSms(record.getContent(), uid.toString(), ps.get(key));
					}
				}
			}
			ret.setData("");
			
			EcomPermisson p = this.getTeacherPermission();
			Map<String, Boolean> parentSelected = p.getParentSelected();
			Map<String, Boolean> classSelected = p.getClassSelected();
			if (parentSelected != null ) {
				parentSelected.clear();
			}
			if (classSelected != null ) {
				classSelected.clear();
			}
			p.setClassSelected(classSelected);
			p.setParentSelected(parentSelected);
			super.saveTeacherPermission(p);
		} catch (Exception e) {
			logger.error("保存通知 异常！", e);

			ret.setCode(Constant.RetCode.ERROR);
		}

		logger.info("保存通知 结束！");
		return ret;
	}

	private String editContent(String content) {
		StringBuilder sb = new StringBuilder();
		sb.append("【维睿教育社区】");
		sb.append(content);

		return sb.toString();
	}

	/**
	 * 获取选中家长，发送通知用
	 * 
	 * @param permisson EcomPermisson
	 * @return Map<String, List<String>>
	 */
	private Map<String, List<String>> getSelectedParentFromPermisson(EcomPermisson permisson) {
		Map<String, List<String>> map = new HashMap<String, List<String>>();

		Map<String, Boolean> ps = permisson.getParentSelected();

		List<NoticeParentKey> npks = permisson.getOwnedParents();
		if (npks != null && ps != null) {
			for (NoticeParentKey key : npks) {
				String keyNo = key.getParentKeyNo();
				if (ps.get(key.getParentKeyNo()) == null ? false : ps.get(key.getParentKeyNo())) {
					String schoolCode = key.getSchoolCode();
					List<String> parents = map.get(schoolCode);
					if (parents == null) {
						parents = new ArrayList<>();
					}

					parents.add(key.getParentPhone());
					map.put(schoolCode, parents);
				}
			}
		}
		return map;
	}
	
}
