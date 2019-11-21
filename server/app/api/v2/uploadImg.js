const Router = require('koa-router')
const {upload} = require('../../../core/upload')
const success = require('../../lib/helper')

const path = require('path')
const fs  = require('fs')
const router = new Router({
    prefix:'/api/v2/img'   
});


router.post('/upload', upload.single('file'),async (ctx) => {
    // 省去校验...
    console.log(ctx.request.headers.host)
    ctx.body = {
        filename: ctx.request.headers.host+'/images/'+ctx.req.file.filename//返回文件名
    }
})

router.post('/delete',async (ctx) => {
    let name = ctx.request.body.filename.split("/")
    let delPath = path.join(__dirname, '../../../public/images/'+name[name.length-1])
  
    try {
        /**
         * @des 判断文件或文件夹是否存在
         */
        if (fs.existsSync(delPath)) {
            fs.unlinkSync(delPath);
        } else {
            console.log('inexistence path：', delPath);
        }
    } catch (error) {
        console.log('del error', error);
    }
    success("删除成功")
})

// router.get('/:args',async (ctx) => {
//     // 省去校验...
//     let resUrl = ctx.req.url.split("/");
//     res.sendFile(__dirname + '/statics/uploads/' + resUrl[resUrl.length - 1]);
    
// })

module.exports = router 