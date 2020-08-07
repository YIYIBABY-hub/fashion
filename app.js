//创建服务器
const express=require('express');
//引入body-parser模块
//中间件写在路由的前面(浏览器-中间件-路由)
const bodyParser=require('body-parser');
//引入用户路由器
const r=require('./router/user.js');
//引入ajax接口
const ajax=require('./router/ajax.js');
//创建web服务器
const app=express();
app.listen(8080);
//托管静态资源到public目录
app.use(express.static('./public'));
//在路由器之前,应用body-parser中间件,将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
	extended:false
}));
//将用户路由器挂载到服务器,添加前缀/user/
app.use('/user',r);
app.use('/ajax',ajax);


