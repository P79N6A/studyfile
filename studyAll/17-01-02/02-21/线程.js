//一个线程类需要继承Runnable接口，或者实现Thread类，重写其中的run方法
//线程的作用是：
//在一个线程中，能够实现资源共享

public class MyThread implements Runnable {
	private int ticket = 10;

	public void run() {
		for (int i = 0; i < 20; i++) {
			if (this.ticket > 0) {
				System.out.println("卖票：ticket" + this.ticket--);
			}
		}
	}
}

public class RunnableTicket {
	public static void main(String[] args) {
		MyThread mt = new MyThread();
		new Thread(mt).start();// 同一个mt，但是在Thread中就不可以，如果用同一
		new Thread(mt).start();// 个实例化对象mt，就会出现异常
		new Thread(mt).start();
	}
};

public class ThreadTicket {
	public static void main(String[] args) {
		MyThread mt1 = new MyThread();
		MyThread mt2 = new MyThread();
		MyThread mt3 = new MyThread();
		new Thread(mt1).start();// 每个线程都各卖了10张，共卖了30张票
		new Thread(mt2).start();// 但实际只有10张票，每个线程都卖自己的票
		new Thread(mt3).start();// 没有达到资源共享
	}
}




