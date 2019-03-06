一个WSDL文档通常包含有以下元素，即types、message、portType、operation、binding、 service元素。
这些元素嵌套在definitions元素中。

definitions是'WSDL文档的根元素'，definitions还'声明各命名空间'

types，'数据类型定义的容器'，它'使用某种类型系统'('一般地使用XML Schema中的类型系统')

'types描述WebMethod的名称'（Add），'传入参数'（testClass——包括对TestClass的详细描述,id）,
'响应信息'（AddResponse）。

'message描述通信消息的数据结构'的'抽象类型化定义'，使用'types的描述的类型'来'定义整个消息的数据结构'。

portType和operation描述服务和服务的方法。operation包括输入和输出（使用message的描述）。

binding描述Web Services的通信协议。 <soap:binding/>描述使用SOAP协议，binding还描述Web Services的方法、输入、输出。

service描述Web Services访问点的集合。因为包括SOAP1.1和SOAP1.2的描述，所以一个方法有对应两描述。

结构：
<wsdl:definitions>
	<wsdl:types>
	   <xsd:schema> 
	   		<xsd:element name="roleName" type="xsd:string"></xsd:element>
	   		<xsd:element name="roleList" type="tns:RoleList"></xsd:element>
	   		
	        <xsd:complexType name="RoleBase">
	      		<xsd:sequence>
	      			<xsd:element name="roleId" type="xsd:string" minOccurs="1" maxOccurs="1"></xsd:element>
	      			<xsd:element name="roleName" type="xsd:string" minOccurs="1" maxOccurs="1"></xsd:element>
	      		</xsd:sequence>
	      	</xsd:complexType>
	      	
	   </xsd:schema>
	</wsdl:types>
	
	<wsdl:message name="processResponse">
		<wsdl:part element="impl:ZiCRMM02PageInquiryWXProtMemberInfoSrvResponse" name="ZiCRMM02PageInquiryWXProtMemberInfoSrvResponse">
		</wsdl:part>
	</wsdl:message>
	
</wsdl:definitions>   






