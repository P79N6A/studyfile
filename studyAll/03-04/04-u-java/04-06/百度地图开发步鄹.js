//一，地图的创建
//1.引用api文件
<script type="text/javascript" src="http://api.map.baidu.com/api?key=afsjfklasjflerwer54534354354&v=1.3&services=false">
</script>

//2.创建地图容器//通过地图容器将地图显示在页面上
<div style="width:520px;height:340px;border:1px solid gray" id="container"></div>

//3.命名空间
API 使用 BMap 作为命名空间，所有类均在改命名空间下，比如：BMap.Map，BMap.Control.  

//4.创建地图实例
var map = new BMap.Map("container"); 
//5.创建点坐标
var point = new BMap.Point(x,y);
//6.地图初始化
map.centerAndZoom(point,10)//10是地图级别


//二。地图的操作
//添加信息窗口
var map = new BMap.Map("container"); 
var point = new BMap.Point(116.404, 39.915); 
var marker = new BMap.Marker(point); 
var opts = {
  width : 250,  //信息窗口宽度
  height: 100,  //信息窗口高度
  title : "Hello"//信息窗口标题
} 

map.centerAndZoom(point, 15);
