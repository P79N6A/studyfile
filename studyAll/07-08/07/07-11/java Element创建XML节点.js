此类是用来'构建xml'中'节点'的。方法举例：
// 构建 XML Document 报文
private String createLoginXML(String serialNo, String reqTime, String userID, String userPWD){
	String retStr = null;
	Document reqData = null;
	try{
		DocumentBuilderFactory docFac = DocumentBuilderFactory.newInstance();// 创建xml实例
		DocumentBuilder docB = docFac.newDocumentBuilder();
		reqData = docB.newDocument();
		// 设置 XML 文件版本为 1.0
		reqData.setXmlVersion("1.0");
		// 创建节点node
		Node n_root = reqData.createElement("BCCBEBankData"); 
		Node n_opReq = reqData.createElement("opReq");
		Node n_opName = reqData.createElement("opName");
		n_opName.appendChild(reqData.createTextNode("CebankUserLogonOp"));
		Node n_serialNo = reqData.createElement("serialNo");
		n_serialNo.appendChild(reqData.createTextNode(serialNo));
		Node n_reqTime = reqData.createElement("reqTime");
		n_reqTime.appendChild(reqData.createTextNode("20110323"));
		Node n_ReqParam = reqData.createElement("ReqParam");
		Node n_userID = reqData.createElement("userID");
		n_userID.appendChild(reqData.createTextNode(userID));
		Node n_userPWD = reqData.createElement("userPWD");
		n_userPWD.appendChild(reqData.createTextNode(userPWD));
		
		// 连接节点
		reqData.appendChild(n_root);
		
		n_opReq.appendChild(n_opName);
		n_opReq.appendChild(n_serialNo);
		n_opReq.appendChild(n_reqTime);
		
		n_ReqParam.appendChild(n_userID);
		n_ReqParam.appendChild(n_userPWD);
		
		n_root.appendChild(n_opReq);
		n_opReq.appendChild(n_ReqParam);
		
		retStr = XMLDoc2Str(reqData);
		retStr = retStr.replace(" standalone=\"no\"", "");
		
		System.out.println(retStr);
		
	}catch(Exception ex){
		ex.printStackTrace();
		System.out.println("创建 <登录 XML 报文> 失败");
		return null;
	}
// 返回报文
	return retStr;
}
通过xml工程获取xml创建器，通过创建群创建数据对象，用数据对象先创建root节点，
之后依次创建子节点，之后给子节点进行元素赋值。
