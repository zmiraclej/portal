package cn.com.wtrj.jx.web.portal.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import cn.com.wtrj.jx.web.portal.controller.response.TreeGridRet;
import cn.com.wtrj.jx.web.portal.controller.response.hr.ArchivesTreeRet;
import cn.com.wtrj.jx.web.portal.model.entities.WtrjDepartment;

public class TreeUtil {
	
	/**
	 * 获取组织架构树形列表
	 * 
	 * @param depts
	 * @param parentCode
	 * @return
	 */
	public static List<ArchivesTreeRet> genDeptTree(List<WtrjDepartment> depts, String parentCode){
		List<ArchivesTreeRet> treeGrid = new ArrayList<ArchivesTreeRet>();
		int level = 0;
		if (StringUtils.isEmpty(parentCode)) {
			level = 1;
		} else {
			level = parentCode.length() + 2;
		}
		
		Comparator<ArchivesTreeRet> comparator = new Comparator<ArchivesTreeRet>() {

			@Override
			public int compare(ArchivesTreeRet o1, ArchivesTreeRet o2) {
				return o1.getValue().compareTo(o2.getValue());
			}
			
		};
		
		for (int i = depts.size() -1; i >= 0; i--) {
			// 部门编码
			String deptCode = String.valueOf(depts.get(i).getCode());
			// 字符串匹配判断，找到匹配的数据抽取指定级别的tree
			if (level == deptCode.length() && (StringUtils.isNotEmpty(parentCode) && deptCode.startsWith(parentCode) || StringUtils.isEmpty(parentCode))) {
				
				ArchivesTreeRet grid = new ArchivesTreeRet();
				grid.setValue(deptCode);
			    grid.setText(String.valueOf(depts.get(i).getName()));	
//			    grid.setLeaf(depts.get(i).getLeaf());
			    
				treeGrid.add(grid);
				
				depts.remove(depts.get(i));
			}
		}
		Collections.sort(treeGrid, comparator);
		
		for (ArchivesTreeRet treeGridRet : treeGrid) {
			List<ArchivesTreeRet> subTreeGrid = genDeptTree(depts, treeGridRet.getValue());
			
			if (subTreeGrid != null) {
				Collections.sort(subTreeGrid, comparator);
			}
			
			treeGridRet.setNodes(subTreeGrid);
		}
		
		return treeGrid.size() == 0 ? null:treeGrid;
	}
	
}
