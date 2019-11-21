const Router = require('koa-router')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { Business } = require('../../models/business')

const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManager } = require('../../services/wx')
const router = new Router({
    prefix: '/api/v1/token'
});
let userData;
let checkBid;
router.post('/', async (ctx) => {
    const { type, account, password } = ctx.request.body
    switch (type) {
        case LoginType.USER_MOBILE:
            userData = await phoneLogin(account, password, ctx)
            checkBid = await checkBusiness(userData.uid)
            ctx.body = {
                token: userData.token,
                uid: userData.uid,
                exist: checkBid
            }
            break;
        case LoginType.USER_MINI_PROGRAM:
            userData = await WXManager.codeToToken(account)
            ctx.body = {
                token: userData.token,
                uid:userData.uid
            }
            break;
        default:
            throw new global.errs.ParameterException("无对应处理函数");
    }

})

async function phoneLogin(account, secret, ctx) {
    const user = await User.verifyPhonePassword(account, secret)
    let token = generateToken(user.id, Auth.USER)
    return {
        token: token.token,
        uid: user.id
    }
}


async function checkBusiness(uid) {
    return await Business.existBusiness(uid)
}


module.exports = router 