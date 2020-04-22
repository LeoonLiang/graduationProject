const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix:'/api/v2/del'   
});
const {Business,Business_project} = require('../../models/business')
// const {Business_project} = require('../../models/business_project')

router.post("/project", async (ctx) => {
    const {id} = ctx.request.body
    await Business_project.destroy({
        where:{
            id
        }
    })
    success("删除成功");
})


module.exports = router 