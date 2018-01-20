package cn.com.wtrj.jx.web.portal.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import cn.com.wtrj.jx.web.portal.controller.response.setting.RoleMenuTreeRet;
import cn.com.wtrj.jx.web.portal.model.mt.entities.setting.MtRoleMenusDto;

public class RoleMenuTreeUtil {
	
	/**
	 * 获取组织架构树形列表
	 * 
	 * @param depts
	 * @param parentCode
	 * @return
	 */
	public static List<RoleMenuTreeRet> genDeptTree(List<MtRoleMenusDto> depts, String parentCode){
		List<RoleMenuTreeRet> treeGrid = new ArrayList<RoleMenuTreeRet>();
		int level = 0;
		if (StringUtils.isEmpty(parentCode)) {
			level = 1;
		} else {
			level = parentCode.split("-").length + 1;
		}
		
		Comparator<RoleMenuTreeRet> comparator = new Comparator<RoleMenuTreeRet>() {

			@Override
			public int compare(RoleMenuTreeRet o1, RoleMenuTreeRet o2) {
				return o1.getValue().compareTo(o2.getValue());
			}
			
		};
		
		for (int i = depts.size() -1; i >= 0; i--) {
			// 菜单编码
			String deptCode = String.valueOf(depts.get(i).getMenuCode());
			// 字符串匹配判断，找到匹配的数据抽取指定级别的tree
			if (level == deptCode.split("-").length && (StringUtils.isNotEmpty(parentCode) && deptCode.startsWith(parentCode) || StringUtils.isEmpty(parentCode))) {
				
				RoleMenuTreeRet grid = new RoleMenuTreeRet();
				grid.setValue(deptCode);
			    grid.setText(String.valueOf(depts.get(i).getMenuName()));	
			    grid.setOwn(depts.get(i).getRoleId() == null?false:true);
//			    grid.setLeaf(depts.get(i).getLeaf());
			    Map<String,Boolean> state = new HashMap<String,Boolean>();
			    state.put("checked",depts.get(i).getRoleId() == null?false:true);
			    grid.setState(state);
			    
				treeGrid.add(grid);
				
				depts.remove(depts.get(i));
			}
		}
		Collections.sort(treeGrid, comparator);
		
		for (RoleMenuTreeRet treeGridRet : treeGrid) {
			List<RoleMenuTreeRet> subTreeGrid = genDeptTree(depts, treeGridRet.getValue());
			
			if (subTreeGrid != null) {
				Collections.sort(subTreeGrid, comparator);
			}
			
			treeGridRet.setNodes(subTreeGrid);
		}
		
		return treeGrid.size() == 0 ? null:treeGrid;
	}
	
}
