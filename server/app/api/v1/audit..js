const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix: '/api/v1'
});
const { Audit } = require('../../models/user')

router.get("/check", async (ctx) => {
    const { telphone } = ctx.request.query
    const auditData = await Audit.findOne({
        where:{
            telphone
        }
    })
    ctx.body = {
        auditData
    }
})

router.get("/checkAll", async (ctx) => {
    const auditData = await Audit.findAll()
    ctx.body = {
        auditData
    }
})

router.post("/handAudit", async (ctx) => {
    const { name,idCard,phone, imgUrl0, imgUrl1, imgUrl2, imgUrl3 } = ctx.request.body
    const res = await Audit.create({
        telphone: parseInt(phone),
        name,
        idNum: idCard,
        yingyeImg: imgUrl0,
        idcardFront:  imgUrl1,
        idcardBack:  imgUrl2,
        idcardHand: imgUrl3,
        type: 0
    })
    success("创建成功");  
})

router.post("/audit", async (ctx) => {
    const { type, id } = ctx.request.body
    const audit_type = await Audit.update({
        type
    },{
        where:{
            id    
        }
    })
    success("创建成功");  
})

module.exports = router