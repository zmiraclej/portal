package cn.com.wtrj.jx.web.portal.util;

import java.math.BigDecimal;

public class BigDecimalUtil {

	/**
	 * 自动判断应该获取的小数位数，，小于10000的取四位，其余的取两位
	 * 
	 * @param val
	 * @return
	 */
	public static double autoGet(BigDecimal val) {
		// 定义一个变量装compareTo（查询值与10000比较）的结果-1小于、1大于、0等于
		int temp = val.compareTo(new BigDecimal(10000));
		if (temp == -1) {// 查询的值小于10000
			// 取小数点后4位
			return val.divide(new BigDecimal(10000), 4, BigDecimal.ROUND_HALF_EVEN).doubleValue();
		} else {// 查询的值不小于10000
			// 取小数点后2位
			return val.divide(new BigDecimal(10000), 2, BigDecimal.ROUND_HALF_EVEN).doubleValue();
		}
	}

	/**
	 * 与10000比较，小于10000，保留4位，大于等于10000，保留两位
	 * 
	 * @param val
	 * @return
	 */
	public static BigDecimal getBigDecimalVal(BigDecimal val) {
		// 定义一个变量装compareTo（查询值与10000比较）的结果-1小于、1大于、0等于
		int temp = val.compareTo(new BigDecimal(10000));
		if (temp == -1) {// 查询的值小于10000
			return val.divide(BigDecimal.valueOf(10000), 4, BigDecimal.ROUND_DOWN); // 取小数点后4位
		} else { // 查询的值不小于10000
			return val.divide(BigDecimal.valueOf(10000), 2, BigDecimal.ROUND_DOWN); // 取小数点后2位
		}
	}

	/**
	 * Null返回0
	 * 
	 * @param val
	 * @return
	 */
	public static BigDecimal getVal(BigDecimal val) {
		if (val == null) {
			return BigDecimal.ZERO;
		} else {
			return val;
		}
	}
	
	/**
	 * 考虑正负数
	 * 正数与10000比较，小于10000，保留4位，大于等于10000，保留两位
	 * 负数与-10000比较，小于-10000，保留两位，大于-10000，保留四位
	 * @param val
	 * @return
	 */
	public static BigDecimal getZFBigDecimalVal(BigDecimal val) {
		// 定义一个变量装compareTo（查询值与10000比较）的结果-1小于、1大于、0等于
		Integer bjType=val.compareTo(BigDecimal.ZERO);
		//定义返回参数
		BigDecimal returnVal = BigDecimal.ZERO;
		if(bjType==-1){
			int temp = val.compareTo(new BigDecimal(-10000));
			if (temp == -1) {// 查询的值小于-10000
				returnVal= val.divide(BigDecimal.valueOf(10000), 2, BigDecimal.ROUND_DOWN); // 取小数点后4位
			} else { // 查询的值不小于-10000
				returnVal= val.divide(BigDecimal.valueOf(10000), 4, BigDecimal.ROUND_DOWN); // 取小数点后2位
			}
		}
		if(bjType==1){
			int temp = val.compareTo(new BigDecimal(10000));
			if (temp == -1) {// 查询的值小于10000
				returnVal= val.divide(BigDecimal.valueOf(10000), 4, BigDecimal.ROUND_DOWN); // 取小数点后4位
			} else { // 查询的值不小于10000
				returnVal= val.divide(BigDecimal.valueOf(10000), 2, BigDecimal.ROUND_DOWN); // 取小数点后2位
			}
		}
		return returnVal;
	}
}
