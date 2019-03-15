在智能家居公司混了这么久，都没怎么发些有营养的东西，最近感觉不能再这么懒下去了。
准备写几篇有关的文章，就当记录下免得忘记了，也方便其他人少走弯路。

'数据包协议'('数据收发协议')
'命令协议'('命令交互')
'类型转换'
为什么'需要数据包协议'呢，如果没有对应的协议，你们将无法'(与硬件)沟通'成功，
牛头不对马嘴的在交互，都完全不知道对方说的是什么。 
首先'硬件嵌入式''多'是'用c/c++开发'的所以想'要与之交互''需要使用'它所能读懂的数据结构——'结构体'。 
'c/c++和java''不同数据类型''是不同的'，所以'通讯的时候'要'使用通用的数据类型'——'字节流(byte[])'。
PS：java、c/c++数据类型各占几个字节就请自行百度吧。

'数据包协议'
搞'清楚了交互的数据类型'，就'该弄清'楚接收到的'数据的内容'，因为'都是以字节来表示'，
所以'你需要知道''某个属性'或者说是描述'的字节长度'，否者'强行转型'也'都是乱码'(字符串)'或错误的值'。
接下来就来'定义一个结构体''作为协议的内容'。
typedef struct {
	int cmd;//'命令标识码'
	SMsgContent content;//'实际内容'
}SMsg
结构体已经给出了，也都有注释不难看出其中意义。'cmd''是''交互命令'的'唯一标识码'，
就像Handler的what一样，'用于选择对应的解析与操作'。

下面给出是cmd的写法
public static final int IOCONTROL_GET_ALL_PARAMS_REQ = 0x03D8;
public static final int IOCONTROL_GET_ALL_PARAMS_RESP = 0x03D9;

'命令协议' 
'命令协议''就是''写在数据包协议里的''content'的。'用作cmd对应''的交互用数据'，
比如'该设备是个音响'，'给其设置声音'，那么可能就有音量、低音炮、音频之类的值，
把'这些命令拆开成几个包''分开发送'就'会增加代码量与交互次数'，'相应的耗电就提高'，'业务处理也麻烦'。

typedef struct{
	int version;
	unsigned int reserved[3];
}SMsgGetAllParamsReq

'version''为了让大家了解写法''而加上去的一个参数'，也'可以用作'请求'api的版本号'，
reserved[3]'保留位置'，用于'方便'以后'添加新参数'可用

typedef struct {
 int id;//'设备id'
 char device_name[32];//'设备名称'
 char soft_ver[32];//'软件版本号'
 char firm_ver[32];//'硬件版本号'
 unsigned int reserved[3];
}SMsgGetAllParamsResp

接下来就是'关键代码'了，'将命令''转换为byte[]''用于命令交互'

public class SMsgGetAllParamsReq{
    public static byte[] gen(int version){
        byte[] data = new byte[16];
        System.arraycopy(Packet.intToByteArray_Little(version, 0), 0,arrayOfByte, 0, 4);
        return data;
    }
}
首先'为什么'要'这样实现呢？' 
估计大家都有疑问为什么要设置数组长度为16呢？那是因为'int类型占4个字节'(java、c/c++一样)，
'byte类型占一个字节'(1字节 = 8位,1024字节 = 1KB)。 
System.arraycopy这个系统函数'是用于拷贝数组''在指定内容到另一个数组''的指定位置'。
Packet稍后会给大家做介绍。

public class SMsgGetAllParamsResp{
    public static final COUNT = 3;
    public int id;
    public String device_name;
    public String soft_ver;
    public String firm_ver;
    public int[] reserved = new int[COUNT];
 
    public static SMsgGetAllParamsResp parse(byte[] data){
        SMsgGetAllParamsResp  resp = new SMsgGetAllParamsResp ();
        resp.id = Packet.byteArrayToInt_Little(data,0);
        resp.device_name = new String(data, 4, 32).trim();
        resp.soft_ver = new String(data, 36, 32).trim();
        resp.firm_ver= new String(data, 68, 32).trim();
        int index = 100;
        for(int i=0;i<COUNT;i++){
            resp.reserved[0] = Packet.byteArrayToInt_Little(data,index);
            index += 4;
        }
        return resp;
	}
}
new String(bytes, offset, length)这个函数相信大家都很熟悉我就不介绍了，
里面的值也就是偏移量也是一眼就明了的。

到目前为止命令的解析生成就介绍完毕了。

'类型转换'
数据类型转换不必说大家想必也是很清楚的，'最简单的(int)100L'，'Long类型强转int类型'，
文中为什么不使用呢？因为效率的原因，'直接使用位运算符''操作效率会高很多'。

public static final int byteArrayToInt_Little(byte byt[], int nBeginPos) {
	return (0xff & byt[nBeginPos]) | (0xff & byt[nBeginPos + 1]) << 8 | (0xff & byt[nBeginPos + 2]) << 16 | (0xff & byt[nBeginPos + 3]) << 24;
}

public static final byte[] intToByteArray_Little(int value) {
	return new byte[] { (byte) value, (byte) (value >>> 8), (byte) (value >>> 16), (byte) (value >>> 24) };
}

至于其他类型的转换请各位自行百度吧，相信你们可以找到，要善用搜索引擎。

捣鼓了几个晚上终于写完了，虽然因为公司要加班晚上写文章的时间很少，虽然时间长也算是写完了。
楼主笔风粗俗还望各位海涵，有任何有问题、错误的地方请随时留言。

下一篇准备结合nio写命令的发送接收，把今天的内容整合到一块。

补充内容

'类型转换'还'有些小坑的地方补充下'。 
一个请求的结构体

typedef struct {
	char type;// '设置类型那个'
	int  operate;//	'操作类型 0:打开 1:关闭'
	unsigned int reserved[3];
}

'type占一个字节'，'operate'应该'从索引1开始4的长度'。'正常来说是这样没错'， 
'但是c/c+是会补位的'，也就是说'虽然type只占一个字节'，'但'是'为了后面的operate(4字节)存放'，
'会直接补位补三位0'，当时和同事调接口的时候死活传错参数，
后面才知道'他读取operate是从4开始的'而不是从1开始。

所以遇到类似情况请先和设备端同事沟通，或者看看协议规范。

java后台的同事问我这样传有什么优点，之前还真没仔细考虑过。 
目前总结几点，也请各大神帮我补充

字节流传输跨平台，兼容性好，效率高(底层都是转为字节流传输的)
使用结构体，方便嵌入式直接转换为指针对象，就像java的序列化一样，
减少了嵌入式代码量(嵌入式一般受硬件条件约束，空间有限，尽量缩减代码)