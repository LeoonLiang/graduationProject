const util = require('util')
const axios = require('axios')

const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')
class WXManager {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl, global.config.wx.appId,
            global.config.wx.appSecret,
            code)

        const result = await axios.get(url)

        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg

        if (errcode) {
            throw new global.errs.AuthFailed('openid获取失败' + errmsg)
        }
        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}
class WXTemMsg {
    static async temMsg(openid, data) {
        let requestData ={
            "touser": openid,
            "template_id": "PTv7Vt1aJplwpLBw7chjbTptg1HrERStE2IB6TfrPyw",
            "page": "index",
            "data": {
                "thing2": {
                    "value": data.project_name
                },
                "time1": {
                    "value": data.book_date
                },
                "thing3": {
                    "value": data.businessName
                },
                "phone_number4": {
                    "value": data.telphone
                },
                "thing6": {
                    "value": "请调整好时间达到"
                }
            }
          }
        const token = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxbc2136fc045a47e7&secret=973cb832139d2ecf07c3ffac91e5447f`
            )
        const result = await axios.post(`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${token.data.access_token}`, requestData)

    }
}

module.exports = {
    WXManager,
    WXTemMsg
}