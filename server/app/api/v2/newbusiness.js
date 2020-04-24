const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix:'/api/v2/new'   
});
const {Business,Business_project} = require('../../models/business')
const {Money, MoneyRecord} = require('../../models/user')
const {Auth} = require('../../../middlewares/auth')

// const {Business_project} = require('../../models/business')

router.post('/business', async (ctx) => {
    // 省去校验...
    const {business_name, telphone,business_start_time,business_end_time,location,city,uid,business_imgURL} = ctx.request.body 
    await Business.create({
        business_name,
        telphone,
        score:9.5,
        business_start_time,
        business_end_time,
        location,
        city,
        business_imgURL,
        uid
    })
    await Money.create({
        uid
    })
    success("创建成功");  
})

router.post("/project", async (ctx) => {
    const {bid,name,price,describe} = ctx.request.body
    await Business_project.create({
        project_name:name,
        price,
        describe,
        bid:bid
    })

    success("添加项目成功");
})


router.post("/withdraw", async (ctx) => {
    const {uid,ingMoney,telphone} = ctx.request.body
    const money = await Money.findOne({
        where: {
            uid
        }
    })
    if (parseFloat(ingMoney) >= money.dataValues.nowMoney) {
        success("余额不足", 201);
    } else if(parseFloat(ingMoney) <= 0) {
        success("请输入正确的金额", 201);
    }
    if (!telphone) {
        success("手机号不能为空", 201);
    }

    await MoneyRecord.create({
        uid,
        ingMoney,
        telphone
    })

    await Money.update({
        nowMoney: money.dataValues.nowMoney - parseFloat(ingMoney),
        ingMoney: money.dataValues.ingMoney + parseFloat(ingMoney)
    },{
        where:{
            uid    
        }
    })

    success("申请成功", 200)
})
// function format(time) {
//     if (time >= 10) {
//         time = time + ":00"
//       } else {
//         time = "0" + time + ":00"
//       }
//       return time
// }


module.exports = router 