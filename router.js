//引入模块
const fs =require('fs')
const urlModel=require('url')
const path=require('path')

//引入自定义控制器模块
let Ctrl=require('./controller')

//封装路由
function router(req,res){
  let method=req.method;
  let url=req.url;
  let pathname=urlModel.parse(url,true).pathname
  let query=urlModel.parse(url,true).query
  if(method=='GET'&&(pathname=='/'||pathname=='/index'||pathname=='/index.html')){
    Ctrl.showIndexPage(req,res)
  } else if (method == 'GET' && (pathname == '/add' || pathname == '/add.html')) {
    Ctrl.showAddPage(req,res)
} else if (method == 'GET' && (pathname == '/edit' || pathname == '/edit.html')) {
    Ctrl.showEditPage(req,res)
} else if (method == 'GET' && (pathname == '/info' || pathname == '/info.html')) {
    Ctrl.showInfoPage(req,res)
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