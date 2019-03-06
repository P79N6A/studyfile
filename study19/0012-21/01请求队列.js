一、背景
	在移动互联网高速发展的时代，各种电商平台的'抢购业务'变得'越来越火爆'，
抢购业务所'带来'的'高并发问题'值得我们去探索，
主要涉及的方面'包括'处理和'响应速度'、'数据'的'一致性'等。
抢购'开放的一瞬间'，可能'有成千上万'的'下订单请求''发送到服务器'去处理，
'如果只是简单的请求处理响应方式'，'不做任何处理'，
'导致的结果'很可能'是很多客户很长时间''得不到响应'，
根本不知道自己是否下订单成功，或者'下订单的数量'已经'超过了商品的数量'，
这就'导致了超发的问题'。

二、设计思路
	1、用户在'下订单之前'当然是'先查询到这个商品'，在这个查询的时候，
'将数据库中商品的剩余数量''存到redis中'；

	2、'服务器在一瞬间''接到成千上万的下订单请求'，
'在控制层''没有直接处理请求数据'，'而是先根据redis中商品的剩余数量'来'判断'，
'如果>0',就'将请求放到请求队列中'，'否则直接'响
应客户端“'卖完了'”；

	3、考虑到数据的一致性，'队列的容量''就是商品的剩余数量'，
'队列采用的是''线程安全的队列''LinkedBlockingQueue'(单台服务器),
'然后通过新的线程''异步处理这些请求'，'多台服务器'的话,可以'考虑使用消息队列MQ',
'单独用一台服务器'去'处理消息队列中的请求';

	4、'客户端发送订单请求之后'，'会收到响应'，要么是'剩余数量不足'（卖完了），
要么是'请求已经被放到队列中',为下一步的轮询订单做准备;

	5、'如果响应状态是卖完了'，'直接提示客户'，如果'请求已经放入队列中'，
就可以'根据用户id和商品id'去'轮询订单'了；

三、实现步骤
	说明：用java语言，springmvc框架+redis实现
	1、准备工作，'查询商品信息'，'将剩余数量同步到redis中'
		Jedis jedis = jedisPool.getResource();
		BuyGood good=buyGoodService.getById(good_id);
		jedis.set("residue"+good_id, good.getResidue()+"");
		jedisPool.returnResource(jedis);

	2、下订单的方法,下面直接展示代码，包括请求对象，控制层方法，
请求处理线程类的具体实现

	2.1 请求封装对象

public class BuyRequest {
    private int good_id;//商品id
    private int user_id;//用户ID
    private int order_id;//订单id
    private BuyOrders buyOrders;//订单信息
    private int response_status;//0:未处理;1:正常;2:异常
    
    public BuyOrders getBuyOrders() {
        return buyOrders;
    }

    public void setBuyOrders(BuyOrders buyOrders) {
        this.buyOrders = buyOrders;
    }


    public int getGood_id() {
        return good_id;
    }

    public void setGood_id(int good_id) {
        this.good_id = good_id;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getResponse_status() {
        return response_status;
    }

    public void setResponse_status(int response_status) {
        this.response_status = response_status;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}

2.2 '处理请求的controller'

@Controller
@RequestMapping("/buy")
public class BuyController {
    
    private static BuyQueue<BuyRequest> buyqueue =null;//线程安全的'请求队列'

    @RequestMapping("/addOrders.do")
    @ResponseBody
    public Object addOrders(BuyRequest buyrequest){
        Map<String, Object> results = new HashMap<>();
        Jedis jedis = jedisPool.getResource();
        try {
        '下订单之前'，先'获取商品的剩余数量'
        int residue = Integer.valueOf(jedis.get("residue"+buyrequest.getGood_id()));
        if(residue<1){	如果剩余数量不足，直接响应客户端'卖完了'
            results.put("msg", "卖完了");
            results.put("done", false);
            BaseLog.info("addOrders results="+JSON.toJSONString(results)); 
            return results;
        }
        如果'还有剩余'商品,就准备'将请求放到'请求'队列中'
        if(buyqueue==null){'第一次'初始化请求队列,队列的'容量为'当前的'商品剩余数量'
            buyqueue=new BuyQueue<BuyRequest>(residue);
        }
        if(buyqueue.remainingCapacity()>0){'当队列'的'可用容量大于0'时,'将请求放到'请求'队列中'
            buyqueue.put(buyrequest);
        }else{'当请求队列已满',本次请求不能处理,'直接响应客户端'提示请求队列已满
            results.put("msg", "抢购队列已满，请稍候重试！");
            results.put("done", false);
            return results;
        }
            
        if(!DealQueueThread.excute){'如果线程类'的'当前执行标志'为'未执行',即'空闲状态','通过线程池启动线程'
	        DealQueueThread dealQueue = new DealQueueThread(buyqueue);
	        ThreadPoolUtil.pool.execute(dealQueue);
	        BaseLog.info("Thread.activeCount()="+Thread.activeCount());
        }
       '请求放入'到'队列'中，即完成下单请求
            results.put("done", true);
            results.put("msg", "下订单成功");
       
        } catch (Exception e) {
            results.put("done", false);
            results.put("msg", "下单失败");
            BaseLog.info("addOrders results="+JSON.toJSONString(results)); 
            BaseLog.error("addOrders",e);
        }finally{
            jedisPool.returnResource(jedis);
        }
        return results;
    }

}

2.3 '处理请求的线程类'，线程类中涉及到的service代码就不必写出来了，你懂的

@Component
public class DealQueueThread implements Runnable {

    private static DealQueueThread dealQueueThread;
    @Autowired
    BuyGoodService buyGoodService;
    @Autowired
    BuyOrdersService buyOrdersService;
    @Autowired
    JedisPool jedisPool;

    private Jedis jedis;

    private BuyQueue<BuyRequest> buyqueue;

    public static boolean excute = false;线程的'默认执行标志'为'未执行',即空闲状态

    public DealQueueThread() {

    }

    public DealQueueThread(BuyQueue<BuyRequest> buyqueue) {
        this.buyqueue = buyqueue;
        jedis = dealQueueThread.jedisPool.getResource();
    }

    @PostConstruct
    public void init() {
        dealQueueThread = this;
        dealQueueThread.buyGoodService = this.buyGoodService;
        dealQueueThread.buyOrdersService = this.buyOrdersService;
        dealQueueThread.jedisPool = this.jedisPool;
    }

    @Override
    public void run() {
        try {
            excute = true;'修改线程'的'默认执行标志''为执行'状态
            '开始处理'请求'队列中的请求',按'照队列的FIFO的规则','先处理先放入到队列中的请求'
            while (buyqueue != null && buyqueue.size() > 0) {
                BuyRequest buyreq = buyqueue.take();'取出队列中''的请求'
                dealWithQueue(buyreq);'处理请求'
            }
        } catch (InterruptedException e) {
            BaseLog.error("DealQueueThread:", e);
        } finally {
            excute = false;
        }
    }

    public synchronized void dealWithQueue(BuyRequest buyreq) {
        try {
            '为了'尽量'确保数据的一致性',处理之前'先从redis中'获'取当前抢购商品的剩余数量'
            int residue = Integer.valueOf(jedis.get("residue" + buyreq.getGood_id()));
            if (residue < 1) {'如果没有剩余商品',就'直接返回'
                buyreq.setResponse_status(3);
                return;
            }
            '如果有剩余商品',先在redis中将'剩余数量减一',再开始下订单
            jedis.decr("residue" + buyreq.getGood_id());
            '将数据库中'将'剩余数量减一','这一步处理'可以'在队列处理完成之后''一次性更新剩余数量'
            dealQueueThread.buyGoodService.minusResidue(buyreq.getGood_id());

            '处理请求','下订单'
            BuyOrders bo = new BuyOrders();
            bo.setGood_id(buyreq.getGood_id());
            bo.setUser_id(buyreq.getUser_id());
            int order_id = dealQueueThread.buyOrdersService.insert(bo);
            BuyOrders orders = dealQueueThread.buyOrdersService.getById(order_id);
            buyreq.setOrder_id(order_id);//订单id
            buyreq.setBuyOrders(orders);//订单信息
            buyreq.setResponse_status(1);//处理完成状态
        } catch (Exception e) {
            buyreq.setResponse_status(2);//异常状态
            BaseLog.error("DealQueueThread dealWithQueue:", e);
        }
    }

}

3、轮询订单

思路：'查询订单'和'剩余数量'，有以下三种情况：

1）'查到订单'，直接'跳转到确认订单'并'支付的页面完成支付'；

2）还'没有查询到订单'，但是'剩余数量大于0'，说明'请求还在队列中'，'继续轮询'；

3）'没有查到订单'，剩余数量'等于或小于0'，说明'抢购失败了'，直接响应客户抢购失败；

经过测试在并发量超过五百的时候会出现超发现象，程序还有待完善，
