package cn.com.wtrj.jx.web.portal.controller.answer;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.model.entities.WcsQuestItem;
import cn.com.wtrj.jx.web.portal.service.WcsQuestAnswerService;
import cn.com.wtrj.jx.web.portal.service.WcsQuestItemService;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import net.sf.json.JSONArray;
import oracle.net.aso.a;

@Controller
@RequestMapping("/")
public class AnswerCountManageController extends BaseController{
	private Logger logger = Logger.getLogger(AnswerCountManageController.class);
	public String[] wcsClassNos = {"1","2","3","4","5","6","7","8","9"};
	@Autowired
	private WcsQuestItemService questItemService;
	
	@Autowired
	private WcsQuestAnswerService questAnswerService;
	
	
	@RequestMapping("/toAnswerCount")
	public String toAnswerCount(Model model, Map<String, Object> params, HttpServletRequest request) {
		model.addAttribute("ctx", request.getContextPath());
		params.put("id", MenuId.ANSWER_COUNT);
		doCommonSetting(params);
		List<Map<String, String>> wcsClassNo = new ArrayList<Map<String,String>>();
		for (int i = 0; i < 9; i++) {
			Map<String, String> wcsNo = new HashMap<String,String>();
			wcsNo.put("wcsClassNo", "wcsClassNo"+(i+1));
			wcsNo.put("wcsClassName", (i+1)+"班");
			wcsClassNo.add(wcsNo);
		}
		JSONArray json = JSONArray.fromObject(wcsClassNo); 
		model.addAttribute("wcsClassNo", json);
		return "answer/answer-page";
	}
	
	@ResponseBody
	@RequestMapping("/answerCount/findCount")
	public List<Map<String, String>> findAnswerCount(){
		List<WcsQuestItem> questItems = questItemService.findAllItemCode();
		List<Map<String, String>> counts = new ArrayList<Map<String,String>>();
		for (int i = 0;i<questItems.size();i++) {
			Map<String, String> map = new HashMap<String,String>();
			//map.put("courseCode", questItems.get(i).getSubject3Code());
			map.put("courseName", questItems.get(i).getSubject3Name());
			Integer sumCount = 0;
			for (int no = 1;no<12;no++) {
				Integer num = null;
					num = questAnswerService.findAnswerCountByCodeAndWcsClassNo(String.valueOf(no), questItems.get(i).getSubject3Code(),1);
				if(num != null) {
					map.put("wcsClassNo"+String.valueOf(no), num.toString());
				}else {
					map.put("wcsClassNo"+String.valueOf(no), "0");
				}
				sumCount = sumCount+num;
			}
			map.put("sumCount", sumCount.toString());
			counts.add(map);
		}
		logger.info(counts);
		return counts;
	}
	
	@ResponseBody
	@RequestMapping("/answerCount/findItemCount")
	public List<Map<String, String>> findItemCount(){
		List<WcsQuestItem> itemLists = questItemService.findAllItem();
		List<Map<String, String>> counts = new ArrayList<Map<String,String>>();
		for(int i = 0;i<itemLists.size();i++) {
			Map<String, String> map = new HashMap<String,String>();
			map.put("id", itemLists.get(i).getId());
			map.put("subject1_name", itemLists.get(i).getSubject1Name());
			map.put("subject2_name", itemLists.get(i).getSubject2Name());
			map.put("subject3_name", itemLists.get(i).getSubject3Name());
			Integer sumCount = 0;
			for (int no = 1;no<12;no++) {
				Integer num = null;
					num = questAnswerService.findAnswerCountByItemIdAndClassNo(String.valueOf(no), itemLists.get(i).getId(),1);
				if(num != null) {
					map.put("wcsClassNo"+String.valueOf(no), num.toString());
				}else {
					map.put("wcsClassNo"+String.valueOf(no), "0");
				}
				sumCount = sumCount+num;
			}
			map.put("sumItemCount", sumCount.toString());
			counts.add(map);
		}
		return counts;
	}
	
	@ResponseBody
	@RequestMapping("/answerCount/findCountByGrade")
	public List<Map<String, String>> findAnswerCountByGrade(){
		List<WcsQuestItem> questItems = questItemService.findAllItemCode();
		List<Map<String, String>> counts = new ArrayList<Map<String,String>>();
		for (int i = 0;i<questItems.size();i++) {
			Map<String, String> map = new HashMap<String,String>();
			//map.put("courseCode", questItems.get(i).getSubject3Code());
			map.put("courseName", questItems.get(i).getSubject3Name());
			Integer sumCount = 0;
			for (String no : wcsClassNos) {
				Integer num = null;
					num = questAnswerService.findAnswerCountByCodeAndWcsClassNo(no, questItems.get(i).getSubject3Code(),2);
				if(num != null) {
					map.put("wcsClassNo"+Integer.valueOf(no), num.toString());
				}else {
					map.put("wcsClassNo"+Integer.valueOf(no), "0");
				}
				sumCount = sumCount+num;
			}
			map.put("sumCount", sumCount.toString());
			counts.add(map);
		}
		logger.info(counts);
		return counts;
	}
	
	@ResponseBody
	@RequestMapping("/answerCount/findItemCountByGrade")
	public List<Map<String, String>> findItemCountByGrade(){
		List<WcsQuestItem> itemLists = questItemService.findAllItem();
		List<Map<String, String>> counts = new ArrayList<Map<String,String>>();
		for(int i = 0;i<itemLists.size();i++) {
			Map<String, String> map = new HashMap<String,String>();
			map.put("id", itemLists.get(i).getId());
			map.put("subject1_name", itemLists.get(i).getSubject1Name());
			map.put("subject2_name", itemLists.get(i).getSubject2Name());
			map.put("subject3_name", itemLists.get(i).getSubject3Name());
			Integer sumCount = 0;
			for (String no : wcsClassNos) {
				Integer num = null;
					num = questAnswerService.findAnswerCountByItemIdAndClassNo(no, itemLists.get(i).getId(),2);
				if(num != null) {
					map.put("wcsClassNo"+Integer.valueOf(no), num.toString());
				}else {
					map.put("wcsClassNo"+Integer.valueOf(no), "0");
				}
				sumCount = sumCount+num;
			}
			map.put("sumItemCount", sumCount.toString());
			counts.add(map);
		}
		return counts;
	}
	
	@RequestMapping("/answerCount/downLoadCount")
	public void downLoadCount(String grade,String type,HttpServletResponse response) {
		logger.info("=========================开始创建报表模板========================");
		try {
			String title = "";
			if("1".equals(grade) && "code".equals(type)){
				title="高中一年级各科目走班汇总";
			}
			if("1".equals(grade) && "item".equals(type)){
				title="高中一年级各组合走班汇总";
			}
			if("2".equals(grade) && "code".equals(type)){
				title="高中二年级各科目走班汇总";
			}
			if("2".equals(grade) && "item".equals(type)){
				title="高中二年级各组合走班汇总";
			}
		response.setContentType("application/vnd.ms-excel;charset=utf-8");
		response.setHeader("Content-Disposition", "attachment;filename=" + new String(title.getBytes( "gb2312" ), "ISO8859-1" ) + ".xls");
			// 创建工作薄
			OutputStream os = response.getOutputStream();
			WritableWorkbook workbook = Workbook.createWorkbook(os);
			// 创建新的一页
			WritableSheet sheet = workbook.createSheet("First Sheet", 0);
			//判断类型
			if("code".equals(type)) {
				type="code";
				//各科目
				if("1".equals(grade)) {
					Label course = new Label(0, 0, "科目");
					sheet.addCell(course);
					for (int i = 0; i < 12; i++) {
						Label classNo = new Label(i+1, 0, (i+1)+"班");
						sheet.addCell(classNo);
					}
					Label sumCount = new Label(12, 0, "合计");
					sheet.addCell(sumCount);
				} else {
					Label course = new Label(0, 0, "科目");
					sheet.addCell(course);
					for (int i = 0; i < 10; i++) {
						Label classNo = new Label(i+1, 0, (i+1)+"班");
						sheet.addCell(classNo);
					}
					Label sumCount = new Label(10, 0, "合计");
					sheet.addCell(sumCount);
				}
				
			}else {
				//各组合
				if ("1".equals(grade)) {
					Label id = new Label(0, 0, "编号");
					sheet.addCell(id);
					Label sub1 = new Label(1, 0, "科目一");
					sheet.addCell(sub1);
					Label sub2 = new Label(2, 0, "科目二");
					sheet.addCell(sub2);
					Label sub3 = new Label(3, 0, "科目三");
					sheet.addCell(sub3);
					int y = 0;
					for (int i = 3; i < 14; i++) {
						Label classNo = new Label(i+1, 0, (y+1)+"班");
						sheet.addCell(classNo);
						y++;
					}
					Label sumCount = new Label(15, 0, "合计");
					sheet.addCell(sumCount);
				} else {
					Label id = new Label(0, 0, "编号");
					sheet.addCell(id);
					Label sub1 = new Label(1, 0, "科目一");
					sheet.addCell(sub1);
					Label sub2 = new Label(2, 0, "科目二");
					sheet.addCell(sub2);
					Label sub3 = new Label(3, 0, "科目三");
					sheet.addCell(sub3);
					int y = 0;
					for (int i = 3; i < 12; i++) {
						Label classNo = new Label(i+1, 0, (y+1)+"班");
						sheet.addCell(classNo);
						y++;
					}
					Label sumCount = new Label(13, 0, "合计");
					sheet.addCell(sumCount);
				}
			}
			
			if("code".equals(type)) {
				List<Map<String, String>> counts = null;
				if("1".equals(grade)) {
					counts = findAnswerCount();
				}else {
					counts = findAnswerCountByGrade();
				}
				int index = 1;
				for (Map<String, String> input : counts) {
					Label course = new Label(0, index, input.get("courseName"));
					sheet.addCell(course);
					for (int i = 0; i < input.size()-2; i++) {
						Label count = new Label(i+1, index, input.get("wcsClassNo"+(i+1)));
						sheet.addCell(count);
					}
					Label sumCount = new Label(input.size()-1, index, input.get("sumCount"));
					sheet.addCell(sumCount);
					index++;
				}
			}else {
				List<Map<String, String>> counts = null;
				if("1".equals(grade)) {
					counts = findItemCount();
				}else {
					counts = findItemCountByGrade();
				}
				int index = 1;
				for (Map<String, String> input : counts) {
					Label id = new Label(0, index, input.get("id"));
					sheet.addCell(id);
					Label sub1 = new Label(1, index, input.get("subject1_name"));
					sheet.addCell(sub1);
					Label sub2 = new Label(2, index, input.get("subject2_name"));
					sheet.addCell(sub2);
					Label sub3 = new Label(3, index, input.get("subject3_name"));
					sheet.addCell(sub3);
					for (int i = 0; i < input.size()-5; i++) {
						Label count = new Label(i+4, index, input.get("wcsClassNo"+(i+1)));
						sheet.addCell(count);
					}
					Label sumCount = new Label(input.size()-1, index, input.get("sumItemCount"));
					sheet.addCell(sumCount);
					index++;
				}
			}
			logger.info(sheet);
			
			workbook.write();
			workbook.close();
			os.flush();
			os.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
