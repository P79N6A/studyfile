'Timer正好用在定时任务的处理上'

'1.'Timer timer=new Timer();//新建timer对象
'2.'timer.schedule(new MyTask(),long time1,long timer2);

//第二步	执行MyTask MyTask是继承TimerTask的类，重写MyTask的run方法就能定时执行代码了，
//其实这里就是实现了Runnable接口
//time1表示多久后执行第一次
//time2表示第一次之后每多久执行一次