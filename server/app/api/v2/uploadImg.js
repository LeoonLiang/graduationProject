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
    ctx.body = {
        filename: '/images/'+ctx.req.file.filename//返回文件名
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
        }
    } catch (error) {
    }
    success("删除成功")
})

module.exports = router 