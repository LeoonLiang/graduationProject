const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix:'/api/v1/user'   
});
const {User} = require('../../models/user')

router.post('/register', async (ctx) => {
    // 省去校验...
    const {nickname, password,phonenum} = ctx.request.body 
    console.log(ctx.request.body )
    await User.create({
        phonenum,
        nickname,
        password
    })
    success();  
})

router.post('/evpi', async (ctx) => {
    // 省去校验...
    const {uid, headUrl,nickname} = ctx.request.body 
    console.log(ctx.request.body )
    const res = await User.update({headUrl:headUrl,nickname:nickname},{
        where:{
            id:uid
        }
    })
    success("信息更新成功");  
    // await User.create({
    //     phonenum,
    //     nickname,
    //     password
    // })
    // success();  
})


module.exports = router 