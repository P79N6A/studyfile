1. '管理员''登陆'系统,'停止mysql服务'或者'结束mysqld-nt进程'
2. '进入命令行',来'到mysql的安装目录'.假设安装目录为 d:\mysql\ , CMD进入命令行
3. '运行 d:\mysql\bin\mysqld-nt --skip-grant-tables 启动mysql,''关闭权限的检查'
4. '运行 d:\mysql\bin\mysqladmin -u root flush-privileges password "newpassword"' 重设root密码
5. '重新启动mysql服务'

//常规方案合理，送终审
if(1==veuneStatue||5==veuneStatue){
	VeVenueBean venue = new VeVenueBean();
	venue.setStatus(3);
	venue.setId(record.getVenueId());
	veVenueDao.updateVenueStatus(venue);
}