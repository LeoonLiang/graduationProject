const Router = require('koa-router')
const router = new Router({
    prefix:'/api/v1/store'   
});
const {Auth} = require('../../../middlewares/auth')

router.get('/latest', new Auth().m, async (ctx) => {
    ctx.body = ctx.auth.uid
    
})

module.exports = router 