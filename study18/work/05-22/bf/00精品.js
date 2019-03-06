1.CountDownLatch
'在一些'应用'场合：'中，需'要等'待某个'条件达到'要求后'才能'（'执行'）做后面的事情；
同时'当线程都完成'后也('要')会'触发事件'，以便进行后面的操作。

CountDownLatch'最重要的方法'是'countDown()'和'await()'，
'countDown()'前者'主要'是'倒数一次'，
'await()'后者'是等'待'倒数到0'，如果'没有到'达'0'，'就'只有'阻塞等待'了。
public class CountDownLatchDemo {
	private static final int PLAY_AMOUNT = 10;
	public static void main(String[] args) {
		'选手开始'跑
		CountDownLatch begin = new CountDownLatch(1);
		当队员'到终点'，则'报告'一个'到达'，'所有人到'达，比赛'结束'
		CountDownLatch end = new CountDownLatch(PLAY_AMOUNT);
		'10个队员'
		Player[] plays = new Player[PLAY_AMOUNT];
		for (int i = 0; i < PLAY_AMOUNT; i++) {
			plays[i] = new Player(i + 1, begin, end);
		}
		'10个线程'
		ExecutorService exe = Executors.newFixedThreadPool(PLAY_AMOUNT);
		for (Player p : plays) {
			exe.execute(p);
		}
		System.out.println("比赛开始");
		begin.countDown();'宣布开始'
		try {
			end.await();'等待结束'
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			System.out.println("比赛结束");
		}
		'注意'：此时'main线程'已经'要结束'了，但是'exe线程'如果'不关闭'是'不会结束'的
		exe.shutdown();
	}

}

class Player implements Runnable {
	private int id;
	private CountDownLatch begin;
	private CountDownLatch end;
	public Player(int id, CountDownLatch begin, CountDownLatch end) {
		super();
		this.id = id;
		this.begin = begin;
		this.end = end;
	}
	public void run() {
		try {
			begin.await(); // 必须等到裁判countdown到0的时候才开始
			Thread.sleep((long) (Math.random() * 100));// 模拟跑步需要的时间
			System.out.println("Play " + id + " has arrived. ");
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			end.countDown();// 向评委报告跑到终点了【跑完就減少一個】
		}
	}
}


2.ExecutorService
线程池管理类'newFixedThreadPool(n)定义总数是n的线程池'；
execute，执行线程；
submit，执行线程，并能够获取线程的结果；
public abstract class ThreadUtils {
	private static ExecutorService service = null;
	static {
		service = Executors.newFixedThreadPool(20);
	}
	/**
	 * 执行线程
	 */
	public static void execute(Runnable runnable) {
		service.execute(runnable);
	}
	/**
	 * 执行线程【能够获取异步结果】
	 */
	public static Future<?> submit(Runnable runnable) {
	    return service.submit(runnable);
	}
}
public class Test {
	public static void main(String[] args) {  
		ThreadUtils.execute(new Runnable() {
		    @Override
		    public void run() {
		    	log.("execute");
		    }
		});
		
        futureArr[i] = ThreadUtils.submit(new Runnable() {
            @Override
            public void run() {
            	log.("submit");
            }
        });
        boolean flag = true;
        while(flag){
            // 异步执行结果数组
            boolean[] resultFlagArr = new boolean[20];
            int j = 0;
            for(Future<?> future:futureArr){
                if(future.isDone() && !future.isCancelled())
                    resultFlagArr[j]=true;
                else
                    resultFlagArr[j]=false;
                j = j+1;
            }
            // 是否全部异步执行完毕
            boolean isAlltrue = true;
            for(boolean resultFlag:resultFlagArr){
                // 如果有一个没有完成，isAlltrue就标记为false
                if(!resultFlag)
                    isAlltrue=false;
            }
            // 如果全部执行完毕，就跳出循环
            if(isAlltrue)
                flag = false;
        }
	}
}


3.ConcurrentHashMap 是map的并发类，牺牲空间，优化时间
他可以同时多个线程进来，每个线程都有自己独立的一份数据，
不会相互影响，造成并发问题
应用场景，一个很多线程都要访问的（全局）map，需要经常对他进行读写
public class NettyChannelMap {
    public static Map<Object, Channel> map = new ConcurrentHashMap<>();
    public static void add(Object clientId, Channel channel) {
        map.put(clientId, channel);
    }
    public static Channel get(Object clientId) {
        return map.get(clientId);
    }
    public static boolean containsKey(Object key) {
        return map.containsKey(key);
    }
    public static Object remove(Channel channel) {
        for (Map.Entry<Object, Channel> entry : map.entrySet()) {
            if (entry.getValue() == channel) {
                Object sID = entry.getKey();
                map.remove(sID);
                return sID;
            }
        }
        return null;
    }
}


