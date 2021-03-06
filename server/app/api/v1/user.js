const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix:'/api/v1/user'   
});
const {User, Audit} = require('../../models/user')

router.post('/register', async (ctx) => {
    // 省去校验...
    const {nickname, password,phonenum} = ctx.request.body

    const data = await Audit.findOne({
        attributes:["type"],
        where:{
            telphone:phonenum
        }
    })
    if(data && data.dataValues.type == 1 ){
        await User.create({
            phonenum,
            nickname,
            password
        })
        success('注册成功', 200)
    } else {
        success('该手机号未通过审核', 201)
    }
})

router.post('/signup', async (ctx) => {
    // 省去校验...
    const {nickname, password,phonenum} = ctx.request.body
    await User.create({
        phonenum,
        nickname,
        password
    })
    success('注册成功', 200)
    
})

router.post('/evpi', async (ctx) => {
    // 省去校验...
    const {uid, headUrl,nickname} = ctx.request.body 
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