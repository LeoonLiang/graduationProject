const Router = require('koa-router')
const success = require('../../lib/helper')
const { Order } = require('../../models/user')
const router = new Router({
    prefix: '/api/v1/order'
});

router.post("/commit", async (ctx) => {
    const { uid, bid,telphone,project_name, book_date, book_hour, total_price } = ctx.request.body
    const res = await Order.create({
        uid,
        bid,
        telphone,
        project_name,
        book_date,
        book_hour,
        total_price,
        order_id:book_date,
        order_type:1
    })
    // console.log(res)
    success("下单成功")
})



module.exports = router 