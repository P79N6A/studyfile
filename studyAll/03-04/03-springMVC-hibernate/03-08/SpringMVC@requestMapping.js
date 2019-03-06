"@RequestMapping"
���������ַӳ���ע�⣬
�������ϣ���ʾ'���µ����з����Դ�Ϊ��·��'
�����ϣ���ʾ'��·��ִ�и÷���'

'�����๲6������'
//1.value,method
value:ָ�������ʵ�ʵ�ַ��ָ����url������url templateģʽ
{
	1������ֵ��
	2������ĳ������һ��ֵ
	3������ָ��Ϊ��������ʽ��һ��ֵ
}

method:ָ�������method���ͣ�get��post��put��delete
//2.consumes,produces
consumes��ָ��'����������ύ��������'(Content-Type),����application/json,text/html
produces��ָ��'���ص���������'������request����ͷ�е�(Accept)�����а�����ָ�����Ͳŷ���
{
	consumes="application/json":ֻ����Json����
	produces="application/json":����������request������Acceptͷ�а�����"application/json"������	
}

//3.params,headers
params��'ָ��'request��'�������ĳЩ����ֵ'�ǣ����ø÷�������
headers��'ָ��'request��'�������ĳЩָ����header'�����ø÷�����������
{
	params="myParam=myValue") �����������а�������Ϊ"myParam"��ֵΪ"myValue"������
	headers="Referer=http://www.ifeng.com/"������request��header�а�����ָ����Refer������ͷ�Ͷ�ӦֵΪ��http://www.ifeng.com/��������
}


'�󶨵�����'
'@PathVariable'  //rest���ר��
someURL/{paramId}//��paramId��Ϊ����ע�⵽URL��
@Controller  
//���ڰ�id��ɾ�����鿴����������ηǳ�����
@RequestMapping("/owners/{ownerId}")
public class RelativePathUriTemplateController {
  @RequestMapping("/pets/{petId}")
  public void findPet(@PathVariable String ownerId, @PathVariable String petId, Model model) {
	  
  }
}
//�����ownerId��petId��Ϊ������������

'@RequestHeader��@CookieValue'
@RequestHeader //��request��header���ֵ�ֵ�󶨵�����������
//����ͷ
Host							localhost:8080  
Accept						text/html,application/xhtml+xml,application/xml;q=0.9  
Accept-Language		fr,en-gb;q=0.7,en;q=0.3  
Accept-Encoding		gzip,deflate  
Accept-Charset			ISO-8859-1,utf-8;q=0.7,*;q=0.7  
Keep-Alive				300  
//controller
@RequestMapping("/displayHeaderInfo.do") 
public void displayHeaderInfo(@RequestHeader("Accept-Encoding") String encoding, @RequestHeader("Keep-Alive") long keepAlive){
	
}
//��Accept-Encoding��ֵ��������encoding��Keep-Alive���� keepAlive
@CookieValue '��'request 'header�е�cookieֵ��''������������'

@RequestMapping("/displayHeaderInfo.do")  
public void displayHeaderInfo(@CookieValue("JSESSIONID") String cookie)  {
	
}
//����JSESSIONID��ֵ�󶨵�����cookie�ϡ� 


'@RequestParam, @RequestBody'
@RequestParam//

@RequestBody//

'@SessionAttributes, @ModelAttribute'
'@SessionAttributes' ��ע������'��HttpSession�е�attribute'����'��ֵ'������'��'�����е�'������ʹ��'��
//��ע����value��types�������ԣ�����ͨ�����ֺ�����ָ��Ҫʹ�õ�attribute ����
@ModelAttribute  ���ڷ�����ʱ,�������� '���ÿ�����ǰ''���ø÷���'������'������module'
 ���ڲ�����ʱ ͨ��'���ƶ�Ӧ'������Ӧ���Ƶ�ֵ�󶨵�ע��Ĳ���bean��
Ҫ�󶨵�ֵ��Դ��{
	@SessionAttributes ���õ�attribute �����ϣ�
	@ModelAttribute ���ڷ�����ʱָ����model����
	�������������û��ʱ��newһ����Ҫ�󶨵�bean����Ȼ���request�а�'����'��Ӧ�ķ�ʽ��ֵ�󶨵�bean��
}

@ModelAttribute  
public Account addAccount(@RequestParam String number) {
	return accountManager.findAccount(number);  
}  
���ַ�ʽʵ�ʵ�Ч�������ڵ���@RequestMapping�ķ���֮ǰ��Ϊrequest�����model��put��"number",number����

@RequestMapping(value="/owners/{ownerId}/pets/{petId}/edit", method = RequestMethod.POST)  
public String processSubmit(@ModelAttribute Pet pet) {  
	
}
���Ȳ�ѯ @SessionAttributes���ް󶨵�Pet������û�����ѯ@ModelAttribute�����������Ƿ����Pet������û����URI template�е�ֵ����Ӧ�����ư󶨵�Pet����ĸ������ϡ�