package cn.com.wtrj.jx.web.portal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.dozer.DozerBeanMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.wtrj.jx.web.portal.common.Constant;
import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.request.base.PageSearchParam;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.PageInfo;
import cn.com.wtrj.jx.web.portal.controller.response.base.PageData;
import cn.com.wtrj.jx.web.portal.controller.response.hr.ArchivesTreeRet;
import cn.com.wtrj.jx.web.portal.controller.response.hr.EmployeeRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjDepartment;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjEmployee;
import cn.com.wtrj.jx.web.portal.model.mt.entities.MtEmployeeDto;
import cn.com.wtrj.jx.web.portal.service.DepartmentCrudService;
import cn.com.wtrj.jx.web.portal.service.EmployeeFileService;
import cn.com.wtrj.jx.web.portal.service.IEmployeeService;
import cn.com.wtrj.jx.web.portal.util.TreeUtil;

/**
 * 查询员工档案
 * 
 * @author sx
 *
 */

@Controller
@RequestMapping("/")
public class ArchivesController extends BaseController {

	private final static Logger logger = LoggerFactory.getLogger(ArchivesController.class);

	@Autowired
	private EmployeeFileService employeeFileService;

	@Autowired
	private DepartmentCrudService departmentCrudService;

	@Autowired
	private IEmployeeService employeeService;

	/**
	 * 反回页面
	 * 
	 * @return
	 */
	@RequestMapping("/archives")
	public String employee(Map<String, Object> model) {
		// 记录所选模块的Id
		model.put("id", MenuId.HR_ARCHIVES);
		this.doCommonSetting(model);
		return "hr/archives";
	}

	@ResponseBody
	@RequestMapping(value = "/searchArchives", method = RequestMethod.POST)
	public BaseRet<List<ArchivesTreeRet>> searchArchives() {
		logger.info("员工档案查询开始");
		BaseRet<List<ArchivesTreeRet>> ret = new BaseRet<List<ArchivesTreeRet>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			List<ArchivesTreeRet> treeList = new ArrayList<ArchivesTreeRet>();
			ArchivesTreeRet tree = new ArchivesTreeRet();

			List<WtrjDepartment> list = departmentCrudService.departmentQuery();
			treeList = TreeUtil.genDeptTree(list, "");

			treeList.add(tree);
			ret.setData(treeList);
		} catch (Exception e) {
			logger.error("员工档案查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		logger.info("员工档案查询结束");
		return ret;
	}

	/**
	 * 查询所有数据数据
	 */
	@ResponseBody
	@RequestMapping(value = "/employeeSelect", method = RequestMethod.POST)
	public BaseRet<PageInfo<List<WtrjEmployee>>> employeeSelect(int pageNo, int pageSize, String employeeNameStr) {
		logger.info("员工档案查询开始");
		BaseRet<PageInfo<List<WtrjEmployee>>> ret = new BaseRet<PageInfo<List<WtrjEmployee>>>();
		PageInfo<List<WtrjEmployee>> pageData = new PageInfo<List<WtrjEmployee>>();
		try {
			ret.setCode(Constant.RetCode.SUCCESS);
			// 初始化总条数
			int totalCount = 0;
			// 初始化总页数
			int count = 0;
			// 显示的游标,oracle起始行号
			int startRowNum = (pageNo - 1) * pageSize + 1;
			// 显示的游标,oracle结束行号
			int endRowNum = startRowNum + pageSize - 1;
			// 获取数据的总条数
			totalCount = conut(employeeNameStr);
			// 算出总页数
			count = totalCount % pageSize == 0 ? totalCount / pageSize : totalCount / pageSize + 1;
			// 取出后台数据
			List<WtrjEmployee> list = employeeFileService.employeeSelect(startRowNum, endRowNum, employeeNameStr);
			// 设置每页显示的数据
			pageData.setRecords(list);
			// 设置总条数
			pageData.setTotalCount(totalCount);
			// 设置总页数
			pageData.setCount(count);
			ret.setData(pageData);
		} catch (Exception e) {
			logger.error("员工档案查询异常！", e);
			ret.setCode(Constant.RetCode.ERROR);
		}
		logger.info("员工档案查询结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/searchEmployee")
	public PageData<List<EmployeeRet>> searchEmployee(PageSearchParam param) {
		logger.info("员工档案查询开始");

		PageData<List<EmployeeRet>> ret = new PageData<List<EmployeeRet>>();
		try {
			// 获取用户数量
			int total = employeeService.countEmployee(param.getSearch());
			ret.setTotal(total);

			// 获取用户明细
			List<EmployeeRet> employeeList = new ArrayList<EmployeeRet>();

			int end = param.getOffset() + param.getLimit();
			List<MtEmployeeDto> list = employeeService.searchEmployeeByPage(param.getOffset(), end, param.getSearch());

			if (list != null && list.size() > 0) {
				DozerBeanMapper dozer = new DozerBeanMapper();
				for (MtEmployeeDto dto : list) {
					EmployeeRet employee = new EmployeeRet();
					dozer.map(dto, employee);

					employeeList.add(employee);
				}
			}

			ret.setRows(employeeList);
		} catch (Exception e) {
			logger.error("员工档案查询异常！", e);
		}
		logger.info("员工查询结束");
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/searchEmployeeBySchoolCode")
	public PageData<List<EmployeeRet>> searchEmployee(PageSearchParam param, String schoolCode) {
		logger.info("指定学校员工档案查询开始");

		PageData<List<EmployeeRet>> ret = new PageData<List<EmployeeRet>>();
		try {
			// 获取用户数量
			int total = employeeService.countEmployee(schoolCode, param.getSearch());
			ret.setTotal(total);

			// 获取用户明细
			List<EmployeeRet> employeeList = new ArrayList<EmployeeRet>();

			int start = param.getOffset() + 1;
			int end = param.getOffset() + param.getLimit();
			List<MtEmployeeDto> list = employeeService.searchEmployeeByPage(schoolCode, start, end, param.getSearch());

			if (list != null && list.size() > 0) {
				DozerBeanMapper dozer = new DozerBeanMapper();
				for (MtEmployeeDto dto : list) {
					EmployeeRet employee = new EmployeeRet();
					dozer.map(dto, employee);

					employeeList.add(employee);
				}
			}

			ret.setRows(employeeList);
		} catch (Exception e) {
			logger.error("指定学校员工档案查询异常！", e);
		}
		logger.info("指定学校员工查询结束");
		return ret;
	}

	/**
	 * 查询数据总条数
	 * 
	 * @return
	 */
	public int conut(String employeeNameStr) {
		int totalCount = employeeFileService.countnum(employeeNameStr);
		return totalCount;
	}

}
