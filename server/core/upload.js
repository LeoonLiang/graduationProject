const multer = require('koa-multer')
const path = require('path')

const storage =  multer.diskStorage({
    //文件保存路径
    destination:(req, file, cb) =>{
        cb(null, './public/images')
    },
    //修改文件名称
    filename:(req, file, cb) =>{
        let fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length-1]);
    }
})

const upload = multer({
    storage,
    limits:{
        fileSize:1024*1024/2
    }
})

module.exports = {
    upload
}