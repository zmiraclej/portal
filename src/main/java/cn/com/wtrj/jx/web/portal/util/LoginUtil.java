package cn.com.wtrj.jx.web.portal.util;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;

public class LoginUtil {

	//获取HR登录tiket
	public static String getHrLoginTekit(String hrSqlUrl,String hrSqlUsername,String hrSqlUserpwd,String username) throws Exception {
		String hrLoginTekit = "";
		String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		try{
			Class.forName(driverName);
			Connection dbConn = DriverManager.getConnection(hrSqlUrl, hrSqlUsername, hrSqlUserpwd);
			CallableStatement c = dbConn.prepareCall("{call SOALogin(?,?)}");
			c.setString(1,username);
			c.registerOutParameter("KeyStr", java.sql.Types.VARCHAR);
			c.execute();
			hrLoginTekit = c.getString("KeyStr");
			System.out.println(c.getString("KeyStr"));
			dbConn.close();
		}catch(Exception e){
			e.printStackTrace();
		}
		return hrLoginTekit;
	}
}
