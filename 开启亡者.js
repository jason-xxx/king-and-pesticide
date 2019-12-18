// 1.引入http模块和读取文件模块。。。
const http=require('http');

//引入自定义bindRender模块
let bindRender= require('./bindRender')
//引入自定义bindRender模块（路由模块）
let router = require('./router')
//--------------------------------
//2.创建服务器对象
const fwq=http.createServer();

//3.监听服务器端口
fwq.listen(3021,()=>{
    console.log('server is running at http://127.0.0.1:3021');
})

//4.监听用户请求
fwq.on('request',(req,res)=>{
    //调用binRender方法
    bindRender(req,res)
      //调用路由
      router(req,res)
 

})
