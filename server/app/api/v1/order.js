const Router = require('koa-router')
const success = require('../../lib/helper')
const { User, Order, Comment, Money } = require('../../models/user')
const { Business } = require('../../models/business')
const { WXTemMsg } = require('../../services/wx')

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
    const businessUid = await Business.findOne({
        attributes: ['uid', 'business_name'],
        where: {
            id: bid
        }
    })
    let open_id = await User.findOne({
        attributes:["openid"],
        where:{
            id:uid
        }
    })
    const money = await Money.findOne({
        where: {
            uid: businessUid.dataValues.uid
        }
    })
    await Money.update({
        nowMoney: money.dataValues.nowMoney + parseFloat(total_price),
    },{
        where:{
            uid: money.dataValues.uid   
        }
    })
    WXTemMsg.temMsg(open_id.dataValues.openid, {
        project_name,
        book_date,
        businessName: businessUid.dataValues.business_name,
        telphone
    })
    success("下单成功")
})


router.get("/myorder", async (ctx) => {
    const { uid } = ctx.request.query
    const orderData = await Order.findAll({
        order:[["createdAt",'DESC']],
        attributes:["id","order_id","book_date", "book_hour", ["total_price","price"],"createdAt","bid","project_name","order_type","uid"],
        where: {
            uid
        }
    })
    
    for(let i=0;i<orderData.length;i++) {
        
        let name = await Business.findOne({
            attributes:["business_name","business_imgURL"],
            where:{
                id:orderData[i].dataValues.bid
            }
        })
        orderData[i].dataValues.business = name

    }

    ctx.body={
        orderData
    }
})

router.post("/comment", async (ctx) => {
    const { uid, bid, content, score, id  } = ctx.request.body
    const res = await Comment.create({
        uid,
        bid,
        content,
        score
    })
    const type = await Order.update({
        order_type:3
    },{
        where:{
            id    
        }
    })

  
    success("评论成功")
})

router.get("/mycomment", async (ctx) => {
    const { uid } = ctx.request.query
    const res = await Comment.findAll({
        attributes:['id','content','createdAt','bid'],
        where:{
            uid
        }
    })
    for(let i=0;i<res.length;i++) {
        let business_name = await Business.findOne({
            attributes:["business_name"],
            where:{
                id:res[i].dataValues.bid
            }
        })
        res[i].dataValues.business_name=business_name.business_name
    }
    ctx.body={
        res
    }
})

router.post("/delcomment", async (ctx) => {
    const { id } = ctx.request.body
    const res = await Comment.destroy({
        where:{
            id
        }
    })
    success("删除成功")
})


module.exports = router 