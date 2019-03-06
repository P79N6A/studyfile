break:跳出循环
continue:结束本次循环.

//比如:
for(int i = 0;i < 10;i++){
   if(i == 2)
      break;
   System.out.println(i);
}
//将只是输出:0,1

for(int i = 0;i < 10;i++){
   if(i == 2)
      continue;
   System.out.println(i);
}
//将只是输出:0,1,3,4,5,6,7,8,9(不会输出2),因为当i==2时,将跳过System.out.println(i);的执行,直接到下次循环了。