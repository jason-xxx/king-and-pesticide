// 1.引入http模块和读取文件模块。。。
const http=require('http');
const fs=require('fs');
//设置路径
const path = require('path')
//需要使用模板渲染数据  是一个第三方的模块，使用前要先下载
const template = require('art-template')
//引入url
const urlModel=require('url')
 
//引入自定义bindRender模块
let bindRender= require('./bindRender')
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
    let method=req.method;
    let url=req.url;
    let pathname=urlModel.parse(url,true).pathname
    let query=urlModel.parse(url,true).query

    if(method=='GET'&&(pathname=='/'||pathname=='/index'||pathname=='/index.html')){
    //   fs.readFile(path.join(__dirname,'./views/index.html'),'utf8',(err,data)=>{
    //     if(err) return console.log(err.message);
    //     res.end(data);    
    //     })
         fs.readFile(path.join(__dirname,'./heros.json'),'utf8',(err,data)=>{
             if(err) return console.log(err.message);
             //将heros.json中的转换成对象
             let heroArr=JSON.parse(data);
             //引入模板引擎
            //  let str =template(path.join(__dirname,'./views/index.html'),{data:heroArr})
            //渲染页面
            //  res.end(str);
            //调用bindRender中的res.render
            res.render('index',{data:heroArr})
             
         })
    }else if(method=='GET'&&(pathname=='/add'||pathname=='/add.html')){
        // fs.readFile(path.join(__dirname,'./views/add.html'),'utf8',(err,data)=>{
        // if(err) return console.log(err.message);
        // res.end(data)
        res.render('add',{})
    }else if(method=='GET'&&(pathname=='/edit'||pathname=='/edit.html')){
        // fs.readFile(path.join(__dirname,'./views/edit.html'),'utf8',(err,data)=>{
        // if(err) return console.log(err.message);
        // res.end(data)
        res.render('edit',{})
    }else if(method=='GET'&&(pathname=='/info'||pathname=='/info.html')){
        // fs.readFile(path.join(__dirname,'./views/info.html'),'utf8',(err,data)=>{
        // if(err) return console.log(err.message);
        // res.end(data)
        res.render('info',{})
    }else if(method=='GET'&&pathname=='/node_modules/bootstrap/dist/css/bootstrap.css'){
        fs.readFile(path.join(__dirname,'./node_modules/bootstrap/dist/css/bootstrap.css'),'utf8',(err,data)=>{
        if(err)return console.log();
        res.end(data);
        })
    }else if (method == 'GET' && pathname == '/node_modules/jquery/dist/jquery.js') {
        fs.readFile(path.join(__dirname, './node_modules/jquery/dist/jquery.js'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
    }else{
        res.end('404')
        console.log('4040404040404');
        
    }

})
