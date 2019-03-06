//Enumeration：继承该接口的实体类，能够从一个数据结构得到连续数据
//例如：
//MyEnumeration类实现Enumeration接口
public class MyEnumerator implements Enumeration{
      int count; // 计数器 MyEnumerator接口类实现 
      int length; // 存储的数组的长度
      object[] dataArray; // 存储数据数组的引用
      // 构造器
      MyEnumeration(int count,int length,object[] dataArray){
            this.count = count;
            this.length= length;
            this.dataArray＝dataArray;
      }
      public boolean hasMoreElements() {
            return (count< length);
      }
      public Object nextElement() {
            return dataArray[count++]；
      }
}


// MyDataStruct类用于实例化一个简单的、可以提供enumeration对象
// 给使用程序的数据结果对象
public class MyDataStruct{
   String[] data;
   // 构造器
   MyDataStruct(){
        data=new String[4] 
        data[0] ="zero";
        data[1] ="one";
        data[2] ="two";
        data[3] ="three";
   }
  // 返回一个enumeration对象给使用程序
  Enumeration getEnum() {
        return new MyEnumeration(0,data.length,data);
  }
}

// 演示Enumeration接口的使用
public class DemoEnumeration{
     public static void main(String[] args){
         // 实例化MyDataStruct类型的对象
         MyDataStruct mySataStruct=new myDataStruct();
         // 得到描述myDataStruct类型对象的enumeration对象
         Enumeration myEnumeration =myDataStruct.getEnum();
         // 使用对象循环显示myDataStruct类型的对象中的每一个元素
         while (myEnumeration.hasMoreElements())
               System.out.println(myEnumeration.nextElement());
    } 
}