//引入模块
const fs = require('fs')
const path = require('path')
//下载的添加时间第三方模块
const moment=require('moment')


//数据处理方法  //暴露处理方法
//因为处理数据的方法很多，我们都需要对外暴露，所以我们使用一个对象来处理
module.exports = {
    //获取所有的英雄数据
    getAllHero(callback) {
        fs.readFile(path.join(__dirname, './heros.json'), 'utf8', (err, data) =>{
            if(err) return callback(err)
            callback(null,data)
        })
    },
    //设置查看英雄按钮 添加详情页
    getOneHero(id,callback) {
        this.getAllHero((err,data)=>{
            if(err) return callback(err)
            //因为读取的数据是一个字符串形式的数组，转换成一个真正的数组
            let heroArr = JSON.parse(data)
            let obj;
            heroArr.some(item=>{   //item表示数组中的每一个项
                if(id == item.id) {
                    obj = item
                }
            }) 
            callback(null,obj)
        })
    },
    //设置添加英雄按钮 渲染相关数据
    addHeroInfo(hero,callback){
      this.getAllHero((err,data)=>{
        if(err)return callback(false)
         //因为读取的数据是一个字符串形式的数组，转换成一个真正的数组
        let heroArr=JSON.parse(data)
        //添加的数据没有id，没有date（时间），需设置添加英雄的时间
        hero.date=moment().format('YYYY-MM-DD HH:mm:ss')
        //因为添加的英雄需要设置id，这个id通过前一个数据+1的到
        //通过+heroArr将字符串转化为数字进行相加，在把相加后的值
        //转换字符串存入json中
        hero.id=(+heroArr[heroArr.length-1].id+1).toString();
        heroArr.push(hero)
        //将数据写入json中
        fs.writeFile(path.join(__dirname,'./heros.json'),JSON.stringify(heroArr),err=>{
            if(err)return callback(false)
            callback(true)

        })
      })
    }

}




