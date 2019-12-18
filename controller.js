//引入模板
const fs=require('fs')
const path=require('path')


//处理方法
/*不同的业务的处理逻辑不同，意味着我们需要些很多的方法来处理，
由于对外需要暴露很多的方法，以至于要暴露的方法非常多，
所以我们使用一个对象，将方法放在对象中，对位暴露这个对象就可以了*/

//即！设置对象将方法一起暴露，不用一个个暴露怎么麻烦

module.exports={
    showIndexPage(req,res) {
        fs.readFile(path.join(__dirname, './heros.json'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
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
        res.render('edit', {})
    },
    //显示详情页面
    showInfoPage(req,res) {
        res.render('info', {})
    }
}
//暴露出去

// module.exports = obj;