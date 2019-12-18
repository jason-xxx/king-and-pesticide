//引入模块
const fs =require('fs')
const urlModel=require('url')
const path=require('path')


//封装路由
function router(req,res){
  let method=req.method;
  let url=req.url;
  let pathname=urlModel.parse(url,true).pathname
  let query=urlModel.parse(url,true).query
  if(method=='GET'&&(pathname=='/'||pathname=='/index'||pathname=='/index.html')){
    fs.readFile(path.join(__dirname,'./heros.json'),'utf8',(err,data)=>{
      if(err)return console.log(err.message);
      let heroArr=JSON.parse(data);
      //调用binRender.js中的函数
      res.render('index',{data:heroArr})  
      })
  } else if (method == 'GET' && (pathname == '/add' || pathname == '/add.html')) {
    res.render('add', {})
} else if (method == 'GET' && (pathname == '/edit' || pathname == '/edit.html')) {
    res.render('edit', {})
} else if (method == 'GET' && (pathname == '/info' || pathname == '/info.html')) {
    res.render('info', {})
} else if (method == 'GET' && pathname == '/node_modules/bootstrap/dist/css/bootstrap.css') {
    fs.readFile(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'), (err, data) => {
        if (err) return console.log(err.message);
        res.end(data)
    })
} else if (method == 'GET' && pathname == '/node_modules/jquery/dist/jquery.js') {
    fs.readFile(path.join(__dirname, './node_modules/jquery/dist/jquery.js'), (err, data) => {
        if (err) return console.log(err.message);
        res.end(data)
    })
} else {
    res.end('404');
}
}
//暴露路由方法
module.exports = router;