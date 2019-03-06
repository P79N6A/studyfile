1.'电池'后台'没有'，就'保留一份'；
2.'处理管道数据';
//Channel的writeAndFlush方法会'将数据'写'到ChannelPipeline'中'最后一个ChannelHandler'
//然后'数据从尾部'开始'向头部方向''流动'会'经过所有'的'ChannelHandler', 
//ChannelPipeline中的'所有ChannelHandler'都'可以处理数据'。
3.根据'sID【电池id】'和'iccid【卡的标识信息】查询'，
'null' 则直接'新增'save;

4.把车的'版本号'信息，'放到redis里'面去;

5.'保存''或'者'修改''电池'与'卡关系';

