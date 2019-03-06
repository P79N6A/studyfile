排序分为两种
'内排序'，全部记录放在内存，称之为内排序
'外排序'，如果排序过程中需要使用外存，则称为外排序

'常用内排序'
(1).插入排序：直接插入排序，二分法插入排序，希尔排序
(2).选择排序：简单选择排序，堆排序
(3).交换排序：冒泡排序，快速排序
(4).归并排序
(5).基数排序

//1.插入排序
指定一个待排序的数字temp
指定有序数组中待比较的数组int[]j
temp从后往前，分别和int[]j每一个元素比较，
如果temp<int[j] int[j]往后挪一位


'每一步''将'一个'待排序的记录'，按其顺序码大小'插入到'前面'已经排序'的'字序列'的'合适位置'，
直到'全部插入排序完为止'

'*'在已经排序好的序列中找到合适的插入位置

private static int[] makeItOrdered(int [] sort){
	for(int i=1;i<sort.length;i++){
		//待排序的数
		int temp=sort[i];
		int j;
		//前面的数组分别和temp比较大于temp的往后移动，否则跳出循环
		for(j=i-1;j>=0;j--){
			//将大于temp的往后移动一位
			if(sort[j]>temp){
				sort[j+1]=sort[j];
				//126  7  5
				//12  67  5
			}else{
				break;
				//12567  8
			}
		}
		sort[j+1]=temp;
		//12567  5	
	}
	return sort;
}

//2。二分插入排序是按照二分法找到合适位置插入
"*"找合适位置的方式不同，这里按照二分法找到合适的位置

//3.冒泡排序
public class BubbleSort {

	public Integer[] sort(Integer[] score) {
		for (int i = 0; i < score.length - 1; i++) { // 最多做n-1趟排序
			// 对当前无序区间score[0......length-i-1]进行排序(j的范围很关键，这个范围是在逐步缩小的)
			for (int j = 0; j < score.length - i - 1; j++) {
				if (score[j] < score[j + 1]) { // 把小的值交换到后面
					int temp = score[j];
					score[j] = score[j + 1];
					score[j + 1] = temp;
				}
			}
		}
		return score;
	}

	public static void main(String[] args) {
		Integer[] score = { 67, 69, 75, 87, 89, 90, 99, 100 };
		new BubbleSort().sort(score);
		for (int i = 0; i < score.length; i++) {
			System.out.println(score[i]);
		}
	}
	
}




