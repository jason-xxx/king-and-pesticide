//引入模板
const fs=require('fs')
const path=require('path')
const querystring = require('querystring')

let heroData = require('./modelData')
//处理方法
/*不同的业务的处理逻辑不同，意味着我们需要些很多的方法来处理，
由于对外需要暴露很多的方法，以至于要暴露的方法非常多，
所以我们使用一个对象，将方法放在对象中，对位暴露这个对象就可以了*/

//即！设置对象将方法一起暴露，不用一个个暴露怎么麻烦

module.exports={
    showIndexPage(req,res) {
        heroData.getAllHero((err,data)=>{
            if(err) return res.end(JSON.stringify({
                code: 201,
                msg: '数据获取失败'
            }))
            let heroArr = JSON.parse(data);
            res.render('index', { data: heroArr })
        })
    },
    //显示添加页面
    showAddPage(req,res) {
        res.render('add', {})
    },
    //显示编辑页面
    showEditPage(req,res) {
        //英雄id存在query中
        let {id}=req.query
        heroData.getOneHero(id,(err,data)=>{
            if(err)return res.end(JSON.stringify({
                code:201,
                msg:'英雄不存在'
            }))
        //render中传输的对象必须是有数据的
        res.render('edit', data)
    })
    },
    //1.显示单个英雄详情信息页面
    showInfoPage(req,res) {
        let {id} = req.query;
        heroData.getOneHero(id,(err,data)=>{
            if(err) return res.end(JSON.stringify({
                code: 201,
                msg: '你查找的英雄不存在'
            }))
            res.render('info',data)  
        })
        
    },
        //2.添加英雄信息
    addHeroInfo(req,res){
        //获取用户添加的数据
        //定义一个变量暂存用户传输的数据
        let str='';
        //注册监听数据变化事件
        req.on('data',chunk=>{
          str+=chunk;
        })
        //注册事件监听是否传输成功
        req.on('end',()=>{
            let hero=querystring.parse(str)
            heroData.addHeroInfo(hero,result=>{
                if (result)return res.json({
                    code:200,
                    msg:'添加成功'
                })
                res.json({
                    code: 201,
                    msg: '添加失败'
                })
            })
        })

    },
    //3.编辑英雄信息
    editHeroInfo(req,res){
    //因为post请求，所以需要使用变量暂存数据，注册事件来完成数据接收
      let str ='';
      req.on('data',chunk=>{
          str+=chunk;
      })
      req.on('end',()=>{
          let editHero=querystring.parse(str)
          //调用数据层中的方法来对数据做进一步操作
          heroData.editHeroInfo(editHero,(result)=>{
              if(result) return res.end(JSON.stringify({
                  code:200,
                  msg:'修改成功'
              }))
              res.end(JSON.stringify({
                  code:201,
                  msg:'修改失败'
              }))
          })
      })
    },
    //添加css、js等
    loadStaticResource(req, res) {
        fs.readFile(path.join(__dirname, req.pathname), (err, data) => {
            if (err) return console.log(err.message);
            if (req.pathname.endsWith('.css')) {
                res.writeHeader(200, {
                    'Content-Type': 'text/css;charset=utf-8;'
                    //js在浏览器自己会解析使用没有转换
                })
            }
            res.end(data)
        })
    }

}
//暴露出去

// module.exports = obj;