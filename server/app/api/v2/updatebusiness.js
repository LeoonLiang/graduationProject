const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix: '/api/v2/update'
});
const { Business, Business_project } = require('../../models/business')
const { Order } = require('../../models/user')

// const { Business_project } = require('../../models/business')
router.post("/info", async (ctx)=>{
    const {business_name, telphone,business_start_time,business_end_time,location,bid} = ctx.request.body
    const res = await Business.update({
        business_name,
        telphone,
        business_start_time,
        business_end_time,
        location,
    },{
        where:{
            id:bid
        }
    })
    success("修改成功")
})

router.post("/project", async (ctx)=>{
    const {id, name,price,describe} = ctx.request.body
    const res = await Business_project.update({
        project_name:name,
        price,
        describe
    },{
        where:{
            id
        }
    })
    success("修改成功")
})

router.post("/ordertype", async (ctx)=>{
    const {order_id} = ctx.request.body
    console.log(order_id,ctx.request.body)
    const res = await Order.update({
        order_type:2
    },{
        where:{
            order_id    
        }
    })
    success("修改成功")
})
module.exports = router 