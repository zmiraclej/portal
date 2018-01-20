package cn.com.wtrj.jx.web.portal.controller;

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

import cn.com.wtrj.jx.web.portal.common.Constant.MenuId;
import cn.com.wtrj.jx.web.portal.controller.base.BaseController;
import cn.com.wtrj.jx.web.portal.controller.response.BaseRet;
import cn.com.wtrj.jx.web.portal.controller.response.TreeGridRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjDepartment;
import cn.com.wtrj.jx.web.portal.service.DepartmentCrudService;
import cn.com.wtrj.jx.web.portal.util.TreeUtil;

@Controller
@RequestMapping("/")
public class DepartmentCrudController extends BaseController
{

    private final static Logger logger = LoggerFactory.getLogger(DepartmentCrudController.class);

    @Autowired
    private DepartmentCrudService departmentCrudService;

    private TreeUtil treeUtil;

    /**
     * 跳转管理员查询（queryFile.jsp）页面
     * 
     */
    @RequestMapping("/queryfile")
    public String queryFile(Map<String, Object> model, String id)
    {
        // 记录所选菜单模块ID（组织架构）
        model.put("id", MenuId.ORGANIZATION);
        this.doCommonSetting(model);
        return "queryFile";
    }

    /**
     * 查询部门所有数据
     * 
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/query", method = RequestMethod.POST)
    public BaseRet<List<TreeGridRet>> departmentQuery(HttpServletRequest request)
    {
        logger.info("部门查询开始");
        // 创建json数据
        BaseRet<List<TreeGridRet>> ret = new BaseRet<List<TreeGridRet>>();
        List<WtrjDepartment> list = departmentCrudService.departmentQuery();
//        List<TreeGridRet> treeRet = treeUtil.genDeptTree(list, "");
//        ret.setData(treeRet);
        logger.info("部门查询结束");
        return ret;
    }

    /**
     * 删除方法
     * 
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public BaseRet<String> departmentDelete(HttpServletRequest request)
    {
        logger.info("删除开始");
        BaseRet<String> ret = new BaseRet<String>();
        // 取出页面传来的codeID
        String req = request.getParameter("code");
        WtrjDepartment wdm = new WtrjDepartment();
        wdm.setCode(req);
        // 把codeId传入Serivce
        int numDelete = departmentCrudService.departmentDelete(wdm);
        if (numDelete == 0)
        {
            String message = "删除失败";
            ret.setData(message);
        }
        else
        {
            String message = "删除成功";
            ret.setData(message);
        }
        logger.info("删除结束");
        return ret;
    }

    /**
     * 添加方法
     * 
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public BaseRet<String> departmentAdd(String code, String name)
    {
        logger.info("添加开始");
        BaseRet<String> ret = new BaseRet<String>();
        WtrjDepartment wdm = new WtrjDepartment();
        wdm.setCode(code);
        wdm.setName(name);
        String codestr = departmentCrudService.departmentQueryCode(wdm);
        // 判断输入的code是否跟数据库的重复
        if (codestr != null && !codestr.isEmpty())
        {
            if (code.equals(codestr))
            {
                String message = "输入的部门编号重复，请重新输入";
                ret.setData(message);
                logger.info("添加失败");
                return ret;
            }
        }
        else
        {
            wdm.setLeaf("n");
            int numAdd = departmentCrudService.departmentAdd(wdm);
            // 判断是否添加成功
            if (numAdd == 0)
            {
                String message = "添加失败，请重新输入";
                ret.setData(message);
            }
            else
            {
                String message = "添加成功";
                ret.setData(message);
            }
        }
        logger.info("添加结束");
        return ret;
    }

    /**
     * 修改方法
     * 
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public BaseRet<String> departmentUpdate(String code, String name)
    {
        logger.info("修改开始");
        BaseRet<String> ret = new BaseRet<String>();
        WtrjDepartment wdm = new WtrjDepartment();
        wdm.setCode(code);
        wdm.setName(name);
        // 调取修改方法
        int numUpdate = departmentCrudService.departmentUpdate(wdm);
        if (numUpdate == 0)
        {
            String message = "修改失败";
            ret.setData(message);
        }
        else
        {
            String message = "修改成功";
            ret.setData(message);
        }
        logger.info("修改结束");
        return ret;
    }
}
