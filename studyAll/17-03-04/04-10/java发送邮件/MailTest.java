package com.xgd.report.mail;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

import javax.mail.internet.InternetAddress;

public class MailTest {
	
	public static void main(String[] args) {

		try {
			Properties props = new MailUtil().getProp();
			Set<String> emails = new HashSet<String>();
			// 邮件地址，多个邮件地址用;分开
			String emailString = props.getProperty("mail.smtp.address");
			String[] emailArray = emailString.split(";");
			for (int i = 0; i < emailArray.length; i++) {
				emails.add(emailArray[i]);
			}
	
			if (emails == null || emails.size() == 0) {
				System.out.println("----Send email:0");
			} else {
				System.out.println("----Send email:" + emails.toString());
				InternetAddress[] toAddress = new InternetAddress[emails.size()];
				int i = 0;
				for (String mail : emails) {
					InternetAddress toaddre = new InternetAddress();
					toaddre.setAddress(mail);
					toAddress[i] = toaddre;
					i++;
				}
				SimpleDateFormat sdf_time = new SimpleDateFormat("yyyyMMddHH:mm");
				
				MailUtil mailobj = new MailUtil(props.getProperty("mail.smtp.username"),props.getProperty("mail.smtp.password"),props.getProperty("mail.smtp.from"), props);
				String PATH = MailTest.class.getClassLoader().getResource("report.xlsx").toURI().getPath();
				mailobj.sendMail(props.getProperty("mail.smtp.describe"), "报表引擎，请查阅附件", toAddress, PATH,"报表引擎列表_" + sdf_time.format(new Date()) + ".xlsx");
				
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		System.out.println("over");
	
	}
}
