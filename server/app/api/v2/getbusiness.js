const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix: '/api/v2/get'
});
const { Business, Business_project } = require('../../models/business')
// const { Business_project } = require('../../models/business_project')


router.get("/info", async (ctx) => {
    const { uid } = ctx.request.query
    const bid = await Business.findOne({
        attributes: ['id'],
        where: {
            uid
        }
    })
    const businessData = await Business.findOne({
        attributes: ['id',"business_start_time","business_name","business_end_time","location","score","telphone"],
        where: {
            id: bid.dataValues.id
        }
    })
//    console.log(businessData)
    ctx.body={
        businessData
    }
})

router.get("/project", async (ctx) => {
    const { bid } = ctx.request.query
    const projectData = await Business_project.findAll({
        attributes: ['id',"price",["project_name","name"],"describe"],
        where: {
            bid: bid
        }
    })

    ctx.body={
        projectData
    }
})


module.exports = router 