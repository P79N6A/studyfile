Redis 'Eval 命令'
 Redis 脚本

Redis 'Eval 命令''使用 Lua 解释器''执行脚本'。

语法
redis 'Eval 命令''基本语法如下'：
redis 127.0.0.1:6379> 'EVAL script numkeys key [key ...] arg [arg ...]' 

参数说明：
script：'参数是一段'Lua5.1'脚本程序'。'脚本''不必'(也不应该)'定义为一个Lua函数'。
numkeys：'用于指定'键名'参数的个数'。
key [key ...]：'从EVAL的''第三个参数开始算起'，
  '表示在脚本中''所用到的'那些 'Redis键'(key)，
  '这些键名参数''可以在Lua中''通过全局变量KEYS数组'，
  '用1为基址的形式访问'(KEYS[1]，KEYS[2]，'以此类推')。
arg [arg ...]：'附加参数'，'在Lua中''通过全局变量ARGV数组访问'，
  '访问的形式''和KEYS变量''类似(ARGV[1]、ARGV[2]，诸如此类)'。
可用版本
>= 2.6.0

实例
redis 127.0.0.1:6379> eval "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 first second
1) "key1"
2) "key2"
3) "first"
4) "second"
