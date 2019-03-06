package com.xgd.report.mail;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

import static com.xgd.report.XConstants.*;

public class MailUtil {
	private String fromAddress; // 发件人地址
	private String user; // 用户名
	private String pwd; // 密码
	private Properties props; // 邮件服务器相关属性 
	
	
	public MailUtil() {
		super();
	}


	public MailUtil(String user, String pwd,String fromAddress,Properties props) {
		this.user = user;
		this.pwd = pwd;
		this.props = props;
		this.fromAddress=fromAddress;
	}

	
	public void sendMail(String subject,String body,InternetAddress[] toAddress){
		send(subject,body,toAddress,null,null);
	}
	/**
	 * 
	 * @param subject 标题
	 * @param body 内容
	 * @param toAddress 收件地址集合
	 * @param affixUrl 附件地址
	 * @param affixName 附件名
	 */
	public void sendMail(String subject,String body,InternetAddress[] toAddress,String affixUrl,String affixName){
		send(subject,body,toAddress,affixUrl,affixName);
	}

	/**
	 * 批量发送邮箱
	 * @param subject 
	 * @param body
	 * @param affixUrl
	 * @param affixName
	 * @param toAddress
	 */
	private void send(String subject,String body,InternetAddress[] toAddress,String affixUrl,String affixName){
		try{
             Session session = Session.getDefaultInstance(props);
             Transport  transport = session.getTransport("smtp");
             transport.connect(user,pwd);
             MimeMessage msg = new MimeMessage(session);
             msg.setSentDate(new Date());
             //发件人邮箱
             msg.setFrom(new InternetAddress(fromAddress));
             //收件人地址
             msg.setRecipients(Message.RecipientType.TO, toAddress);
             //邮件主题
             msg.setSubject(subject, Charset.forName("UTF-8").name());

             // 向multipart对象中添加邮件的各个部分内容，包括文本内容和附件
             Multipart multipart = new MimeMultipart();         
             //设置邮件的文本内容-------------------------
             BodyPart contentPart = new MimeBodyPart();
             //邮件内容
             contentPart.setContent(body,"text/html;charset=UTF-8");
             multipart.addBodyPart(contentPart);
          
             if(affixUrl!=null){
	             //添加附件-----------------------------------
	             BodyPart messageBodyPart= new MimeBodyPart();
	             DataSource source = new FileDataSource(affixUrl);
	             //添加附件的内容
	             messageBodyPart.setDataHandler(new DataHandler(source));
	             //添加附件的标题
	             messageBodyPart.setFileName(MimeUtility.encodeText(affixName));
	             multipart.addBodyPart(messageBodyPart);
             }
             //将multipart对象放到message中
             msg.setContent(multipart);
             //保存邮件
             msg.saveChanges();
             transport.sendMessage(msg, msg.getAllRecipients());
             transport.close();
		}catch(MessagingException e){
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取定时配置配置文件
	 * @return
	 */
	public Properties getProp(){
		InputStream in = MailUtil.class.getClassLoader().getResourceAsStream(EMAIL_FILE);
		Properties props = new Properties();
		try {
			props.load(in);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return props;
	}
	
	public String getFromAddress() {
		return fromAddress;
	}

	public void setFromAddress(String fromAddress) {
		this.fromAddress = fromAddress;
	}


	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public Properties getProps() {
		return props;
	}

	public void setProps(Properties props) {
		this.props = props;
	}
	
}
