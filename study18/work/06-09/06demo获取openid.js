微信'公众平台''获取''openid'在公众号的开发中有很多用途，
前段时间为实现用户使用公众号在登录一次以后可以免密登陆而使用了openid。
开发过程中遇到了一些问题，在这里向需要且还没有获取到openid的米娜桑
分享一下简单的流程及部分代码，和一些问题的解决方式，
给初次接触微信openid的朋友们一个参考。目的只在于获取openid，
至于优化及应用上诸君请自由发挥。

首先了解'openid是'什么，一个'微信号与一个公众号'对应'一个固定不变的openid'。
所以'一个微信号''在一个公众号下'的'openid'是'不变'的，
如果换了一个对应的公众号，那就是另一个openid了。
且只有在微信自带浏览器中打开的项目才可获取到。

准备：
'首先'你要'有一个公众号'，还'有一个外网'可'访问'的'域名'，我的公众号类型是企业号，
这里就以企业号为例了。获取'openid'需'要的公众号'的 'appid' 和 'secret'
（登陆'公众平台'  '开发'----->'基本配置'中的'开发者ID'(AppID)和 '开发者密码'(AppSecret)就是）。

'其次'是'设置网页授权域名'（登陆公众平台  '设置----->公众号设置------>功能设置----->网页授权域名' 按步骤操作并设置就好），
这个'域名'就'是你获取openid'的web'项目发布的域名'，这里注意'服务器'请一定'跑在80端口'。

流程：
1.'调用https://open.weixin.qq.com/connect/oauth2/authorize'接口'获取到code'

2.得到'code作为'一个'参数'调'用https://api.weixin.qq.com/sns/oauth2/access_token'接口'获取到openid'

'因为只是简单'的'获取'到'openid'，这里'只放两个servlet''与用到的''工具类'代码：

第一个是'获取code'用的WxCodeServlt

public class WxCodeServlet extends HttpServlet {  
  
    public void doGet(HttpServletRequest request, HttpServletResponse response)  
            throws ServletException, IOException {  
  
        doPost(request, response);  
    }  
  
    public void doPost(HttpServletRequest request, HttpServletResponse response)  
            throws ServletException, IOException {  
  
        response.setContentType("text/html");  
        response.setCharacterEncoding("UTF-8");  
        request.setCharacterEncoding("UTF-8");  
                //这里要将你的授权回调地址处理一下，否则微信识别不了  
        String redirect_uri=URLEncoder.encode("/*你的授权回调地址*/", "UTF-8");  
                //简单获取openid的话参数response_type与scope与state参数固定写死即可  
        StringBuffer url=new StringBuffer("https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+redirect_uri+  
                "&appid="+/*你的appid*/+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect");  
        response.sendRedirect(url.toString());//这里请不要使用get请求单纯的将页面跳转到该url即可  
          
}  

当'用户'用'微信进入'我们的'网页'并'调用到WxCodeServlet'之后，若'参数无误'，设置的'网页授权域名正确'，
'微信'就'会重定向页面''到我们提交的回调地址'，同时'我们想要的code'也'会被传过来'

而这个'回调地址'就是我们的第二个servlet 'WxOpenIdServlet'
public class WxOpenIdServlet extends HttpServlet {  
  
    private static final long serialVersionUID = 1L;  
  
    public void doGet(HttpServletRequest request, HttpServletResponse response)  
            throws ServletException, IOException {  
                  
        response.setContentType("text/html");  
  
        request.setCharacterEncoding("UTF-8");  
        response.setCharacterEncoding("UTF-8");  
        String code = request.getParameter("code");//获取code  
        Map params = new HashMap();  
        params.put("secret", "/*你的secret*/");  
        params.put("appid", "/*你的appid*/");  
        params.put("grant_type", "authorization_code");  
        params.put("code", code);  
        String result = HttpGetUtil.httpRequestToString(  
                "https://api.weixin.qq.com/sns/oauth2/access_token", params);  
        JSONObject jsonObject = JSONObject.fromObject(result);  
  
        String openid = jsonObject.get("openid").toString();  
        System.out.println("得到的openid为:"+openid);  
    }  
  
  
    public void doPost(HttpServletRequest request, HttpServletResponse response)  
            throws ServletException, IOException {  
        doGet(request, response);  
    }  
}  

在这里我要补充一下了，一位朋友获取到code后去请求却被'微信反回'了一个'错误码"errcode":40125'，
对应的错误是'appsecret无效'，可是'填写的appsecret''与公众平台'中的'appsecret一致'。这个问题在开发时我也遇到过，
'解决方式'是'重置appsecret'，当初也没在意，现在看来这个问题挺频繁的，所以在这里再补充一下。

其中用到了一个工具类HttpGetUtil JSON需要的包这里就不说了
public class HttpGetUtil {  
  
    public static String httpRequestToString(String url,   
            Map<String,String> params) {  
        String result = null;  
        try {  
            InputStream is = httpRequestToStream(url,  params);  
            BufferedReader in = new BufferedReader(new InputStreamReader(is,  
                    "UTF-8"));  
            StringBuffer buffer = new StringBuffer();  
            String line = "";  
            while ((line = in.readLine()) != null) {  
                buffer.append(line);  
            }  
            result = buffer.toString();  
        } catch (Exception e) {  
            return null;  
        }  
        return result;  
    }  
  
    private static InputStream httpRequestToStream(String url,  
            Map<String, String> params) {  
         InputStream is = null;  
            try {  
                String parameters = "";  
                boolean hasParams = false;  
                for(String key : params.keySet()){  
                    String value = URLEncoder.encode(params.get(key), "UTF-8");  
                    parameters += key +"="+ value +"&";  
                    hasParams = true;  
                }  
                if(hasParams){  
                    parameters = parameters.substring(0, parameters.length()-1);  
                }  
  
  
                    url += "?"+ parameters;  
                
                URL u = new URL(url);  
                HttpURLConnection conn = (HttpURLConnection) u.openConnection();  
                conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");  
                conn.setRequestProperty("Accept-Charset", "UTF-8");  
                conn.setRequestProperty("contentType", "utf-8");  
                conn.setConnectTimeout(50000);    
                conn.setReadTimeout(50000);  
                conn.setDoInput(true);  
                //设置请求方式，默认为GET  
                conn.setRequestMethod("GET");  
  
  
                is = conn.getInputStream();  
            } catch (UnsupportedEncodingException e) {  
                e.printStackTrace();  
            } catch (MalformedURLException e) {  
                e.printStackTrace();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
            return is;  
    }  
      
}  

至此'如果各个步骤'都'没有出错'的话，当'我们的WxCodeServlet'被'调用后'，
'控制台'就'能打印出'来刚才通过'微信打开我们网页'并'调用到WxCodeServlet'的'微信用户''对应'我们'公众平台的openid'了

注意问题：
1.'网页授权域名设置'如果'与提交的回调地址'的'域名不对应'，微信是'无法回调'到的。
2.'单纯的获取openid''使用'的'授权方式''是静态授权'，'不需要经过用户许可'的（用户看不到授权的过程），
而想要获取用户的头像昵称等信息是另一种授权（用户端会弹出授权窗口），在此就不介绍了。

3.提交的'回调地址格式'为  'http://xxxx.xxxx.com/xxxxx/WxOpenIdServlet'，
使用java.net 包里的'URLEncoder.encode（"url","utf-8"）''处理后提交'

4.如遇到问题，请耐心细心的回头按步骤检查资料信息以及代码
