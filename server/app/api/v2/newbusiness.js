const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix:'/api/v2/new'   
});
const {Business,Business_project} = require('../../models/business')
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

// function format(time) {
//     if (time >= 10) {
//         time = time + ":00"
//       } else {
//         time = "0" + time + ":00"
//       }
//       return time
// }


module.exports = router 