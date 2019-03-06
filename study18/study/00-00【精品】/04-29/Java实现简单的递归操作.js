在数据结构算法设计中，或者一个方法的具体实现的时候，
有一种方法叫做“递归”，这种方法在思想上并不是特别难，
但是实现起来还是有一些需要注意的。
虽然对于'很多递归'算法'都可以由'相应的'循环迭代来代替'，
'但是对于一些比较抽象复杂的算法''不用递归很难理解与实现'。
'递归分为''直接递归和间接递归'，就简单分享一下两个小的直接递归。
对于递归的概念，其实你可以简单的理解为自己定义自己，
记得小时候看过一部电视剧《狼毒花》，里面主角叫做“常发”，
但是个文盲，老师问他叫什么，他说“常发”。
“哪个常？”“常发的常啊！”“哪个发？”“常发的发啊！”
结果第二节课老师就让一群小朋友一起喊“常发的常，
常发的发，傻瓜的傻，傻瓜的瓜”。
言归正传，显然在多数情况下递归是解释一个想法或者定义的一种合理方法。
在'思想上''递归类似于'数学中曾经学过的'数学归纳法'。

递归的实现：
'递归的实现''要注意'有'两点'：'一个递归的选项''和'一个'非递归的选项'，
'后者'成'为基础情形'（base case）。'基础情形''是'递归的'终结情形'，
'没有基础情形'或者处理不好都'会导致无穷递归'，这是我们不想要的结果。
递归实现起来'最关键'的'是处理好基础情形'。 
结合具体事例在说一下递归回溯的过程。

下边来写两个小程序：
1、'爬楼梯算法'：已知'一个楼梯有n个台阶'，'每次可以选择迈上一个''或者两个台阶'，
求'走完一共有多少种不同的走法'。
方法如下：

'递归函数''有返回值'的'比没有返回值'的'麻烦一点'，
因为'一个函数只有一个返回值'，但是递归'还要求有基础情形的存在'，
'所以'还'必须有if判断来终止递归'。
所以'在每一个if或者else后边都有一个return'，
这样'保证函数在任何一种情况下'都'有且仅有一个返回值'。
分析一下这个算法：
A：如果有'0个台阶'，那么'有0种走法'，这个不用多说；
B：如果'有1个台阶'，那么'有1种走法'；
C：如果'有2个台阶'，那么'有2种走法'（'一次走1个，走两次'；'一次走两个'）；
以上的B和C就是基础情形。
D：接下来就是递归了，如果台阶数目多于2个，
那么首先第一步就有两种选择：'第一次走1个'，或者'第一次走两个'。
'这样除了第一次''后边的走法就有了两种情形'：'climbStairs(n-1)和climbStairs(n-2)'。
这样'一直递归'下去，'直到出现'到了'基础情形'（即n=1或n=2的情形），
'递归到'这个地方（'基础情形'），然后'开始回溯'，
这就是所说的和递归密切相关的“回溯”了。
'回溯'，顾名思义'就是从结果倒着回去'，'找到整个过程'，
进而'分析'这个路径或者说是'实现的过程'。

需要注意的是，这个算法实现思路上简单，但是复杂度并没有降低，
还牵扯回溯保存堆栈问题
(其实'递归的设计'尽量'避免这种嵌套两个的''递归方式'
（climb（n）中包含climb（n-1）和climb（n-2）），
'这种操作'会'使得堆栈开辟空间''随着n的增大以指数型增长'，'最终程序很容易崩溃'），
而且'在台阶数目'多'到一定数量'的时候'会越界'（走法次数会超出int的范围），
所以递归程序很大程度上就是思想实现设计上简单理解一些。
下边是源代码：
public class ClimbStairs {
	public int climbStairs(int n) {
        int i=1;
		 if(n<=0)
			return 0;
		 if(n==1){
			 return i;
		 }
		 if(n==2){
			 i++;
			 return i;
		 }
		 else
			 return climbStairs(n-1)+climbStairs(n-2);
   }
//**************************************************************
   	 public static void main(String []args){
		 ClimbStairs cs=new ClimbStairs();
		 int a =cs.climbStairs(4);
	 	 System.out.println(a);
	 }

}
然后还有几个比较典型的递归问题：比如说迷宫问题，
或者最经典的汉诺塔问题，下边都给出源码，大家一块儿学习一下。

汉诺塔问题：一次只能移动一个盘子；不能把大盘子放在小盘子上；
除去盘子在两个柱子之间移动的瞬间，盘子必须都在柱子上。
（在这三点要求下把盘子从起始柱子A全部移动到目标柱子C上）

代码如下：
基础情形：n==1的时候终止递归，进行回溯。

public class HanNuoTower {
	public void tower(int n,char s,char m,char e)//n个塔从s经过m最终全部移动到e
	{
		if(n==1)
			move(s,e);
		else
		{
			tower(n-1,s,e,m);
			move(s,e);
			tower(n-1,m,s,e);
		}
	}
	public void move(char s,char e){
		System.out.println("move "+s+" to "+e);
	}
	public static void main(String []args){
		HanNuoTower hnt =new HanNuoTower();
		hnt.tower(4,'A','B','C');
	}

}
迷宫走法：二维数组构成一个迷宫，
1表示通路，0表示不通，找到一条路径从起始点（traverse函数的参数）到终点（右下角点）。
基础情形：row=grid.length-1&&column=grid[0].length-1时done=true；
public class Maze {
	private final int TRIED=3;
	private final int PATH=7;
	
	private int [][] grid={	{1,1,1,0,0,1,0,1,0,0},
							{0,0,1,1,1,0,0,0,0,0},
							{1,0,1,0,0,0,1,1,1,1},
							{1,1,1,1,1,0,0,0,1,1},
							{0,0,0,0,1,1,1,0,0,0},
							{1,0,1,0,1,0,0,1,0,0},
							{1,0,0,1,1,1,1,1,1,1}};
	public boolean traverse(int row,int column){
		boolean done =false;
		if(valid(row,column))
		{
			grid[row][column]=TRIED;
			if(row==grid.length-1&&column==grid[0].length-1)
				done=true;
			else
			{
				done=traverse(row+1,column);//down
				if(!done)
					done=traverse(row,column+1);//right
				if(!done)
					done=traverse(row-1,column);//up
				if(!done)
					done=traverse(row,column-1);//left
			}
			if(done)
				grid[row][column]=PATH;
		}
		return done;
	}
	private boolean valid(int row,int column){
		boolean result=false;
		if(row>=0&&row<grid.length&&column>=0&&column<grid[row].length)
			if(grid[row][column]==1)
				result=true;
		return result;
	}
	public String toString(){
		String result="\n";
		for (int row=0;row<grid.length;row++){
			for(int column=0;column<grid[row].length;column++){
				result +=grid[row][column]+" ";
			}
			result+="\n";
		}
		return result;
	}
	public static void main (String []args){
		Maze maze=new Maze();
		System.out.println(maze);
		if(maze.traverse(0, 0))
			System.out.println("The maze was successfully travelled!");
		else
			System.out.println("There is no possible path.");
		System.out.println(maze);
	}

}

还有一个九连环的操作，有兴趣的话可以一起看看。Java递归解决九连环问题
如有不得当之处，还望诸位大神指教！
