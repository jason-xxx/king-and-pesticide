//binRender.js为用户模块

//1.引入模块
const template=require('art-template')
const path =require('path')


//2.封装页面
function binRender(req,res){
    res.render=function(filename,obj){
        let str =template(path.join(__dirname,'./views/'+filename+'.html'),obj)
        res.end(str)
    }
}

//3.暴露方法给外部使用
module.exports=binRender;