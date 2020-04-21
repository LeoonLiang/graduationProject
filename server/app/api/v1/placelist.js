const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix: '/api/v1/placelist'
});
const { Business,Business_project } = require('../../models/business')
// const { Comment } = require('../../models/comment')
const { User,Comment } = require('../../models/user')


router.get("/recommendedList", async (ctx) => {
    const { location } = ctx.request.query
    let placeData = [];
    const res = await Business.findAll({
        attributes:[["id","pid"],["business_name","placeName"],"score","city","business_imgURL"],
        where: {
            city:location+"市"
        }
    })
    console.log(res)
    // for (let i = 0; i < res.length; i++) {
    //     res[i].dataValues.placeImg =  "http://"+res[i].dataValues.placeImg;
    //     placeData.push(res[i].dataValues)
    // }
    ctx.body={
        res
    }
})


router.get("/placedetail",async (ctx) => {
    const { bid } = ctx.request.query
    const placeData = await Business.findOne({
        attributes:["id","business_start_time","business_end_time","location","telphone","score","business_name","business_imgURL"],
        where:{
            id:bid
        }
    })
    const projectData = await Business_project.findAll({
        attributes:["id","project_name","describe","price"],
        where:{
            bid
        }
    })
    const commentData = await getComment(bid)
    
   
    ctx.body = {
        placeData,
        commentData,
        projectData
    }
    
})

router.get("/search",async (ctx) => {
    const { keyword } = ctx.request.query
   var searchData = await fuzzySearch(keyword)
   
    ctx.body = {
        searchData
    }
    
})

async function getComment(bid) {
    return await Comment.getComment(bid)
    
}

async function fuzzySearch(keyword) {
    return await Business.fuzzySearch(keyword)
}

module.exports = router 