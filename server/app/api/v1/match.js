const Router = require('koa-router')
const success = require('../../lib/helper')
const router = new Router({
    prefix: '/api/v1/Match'
});
const { Match,Match_member } = require('../../models/match')

router.get("/allMatch", async (ctx) => {
    const res = await Match.findAll()
    ctx.body = {
        res
    }
})

router.get("/myMatch", async (ctx) => {
    const { uid } = ctx.request.query
    const matchData = await Match.findAll({
        order:[["createdAt",'DESC']],
        where: {
            uid
        }
    })
    ctx.body = {
        matchData
    }
})

router.get("/matchDetail",async (ctx) => {
    const { mid } = ctx.request.query
    const MatchData = await Match.findOne({
        where:{
            id:mid
        }
    })
   
    ctx.body = {
        MatchData
    }
    
})

router.get("/matchMember",async (ctx) => {
    const { mid } = ctx.request.query
    const MatchData = await Match_member.findAll({
        where:{
            mid
        }
    })
   
    ctx.body = {
        MatchData
    }
    
})
router.post("/addMatch", async (ctx) => {
    const { uid,phone,match_name, matchTime, describe, address, match_imgURL } = ctx.request.body
    const res = await Match.create({
        uid,
        telphone: phone,
        match_name,
        match_start_time: matchTime[0],
        match_end_time: matchTime[1],
        introdution: describe,
        location: address,
        match_type: 0,
        memberNum: 0,
        match_imgURL
    })
    success("创建成功");  
})

router.post("/contest", async (ctx) => {
    const { uid, mid, member_name, telphone, remark, idCard } = ctx.request.body
    const res = await Match_member.create({
        uid,
        member_name,
        telphone,
        idCard,
        remark,
        mid
    })
    const oldnum = await Match.findOne({
        attributes: ['memberNum'],
        where:{
            id:mid
        }
    })
    const newnum = await Match.update({
        memberNum: oldnum.dataValues.memberNum + 1
    },{
        where:{
            id: mid    
        }
    })
    success("创建成功");  
})

module.exports = router