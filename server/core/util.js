const jwt = require('jsonwebtoken')
/***
 * 
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

//token
const generateToken = function(uid, scope){
    const secretKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    const token = jwt.sign({
        uid,
        scope
    },secretKey,{
        expiresIn
    })
    return {
        token,
        uid
    }
}

const prepay = async ({openid,orderId,desc,totalPrice,spbill_create_ip})=> {
    let obj = {
        appid,
        // 商户号
        mch_id,
        // 随机字符串
        nonce_str: get_nonce_str(32),
        // 商品描述
        body: desc,
        // 订单号
        out_trade_no: orderId,
        // 金额
        total_fee: parseInt(totalPrice * 100),
        // ip
        spbill_create_ip,
        // 通知地址
        notify_url,
        // 交易类型
        trade_type:'JSAPI',
        openid
    }
    // 把js按顺序排列为数组
    let arr = Object.keys(obj).sort().map(item => {
        return `${item}=${obj[item]}`;
    });
       // key为商户的key
    let str = arr.join('&') + '&key=' + key;
    
    obj.sign = getSign(str);
    let res;
    try{
        // 调用微信统一下单接口拿到 prepay_id
        res = await wechatPay(obj);
        let {prepay_id} = res;
        if(prepay_id){
            res = getClientPayConfig(prepay_id)
        }
    }catch(e){
        res = e;
    }
    return res;
}


/**
 * 统一下单 prepay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
 * @param {Object} obj 调用统一下单的必须参数
 */ 
const wechatPay = (obj)=>{
    let xml = json2xml(obj);
    return new Promise((resolve,reject)=>{
        request({method:'POST',url:  'https://api.mch.weixin.qq.com/pay/unifiedorder',body: xml},(err,res, body)=>{
            if(err){
                reject(err);
            }else{

                let obj = parseXml(body).xml;
                resolve(obj);
            }
        });
    });
}


/**
 * 对指定字符串进行md5加密
 * @param {String} str 
 */
const getSign = (str)=>{
    let hash = crypto.createHash('md5').update(str,'utf8');
    return hash.digest('hex').toUpperCase();
}

/**
 * 转化xml用了xml2js库  
    https://github.com/Leonidas-from-XIV/node-xml2js
 * @param {Object} obj 
 */
const json2xml = (obj)=>{
    let builder = new xml2js.Builder({
        headless:true,
        allowSurrogateChars: true,
        rootName:'xml',
        cdata:true
    });
    var xml = builder.buildObject(obj);
    return xml;
}

const parseXml = (xml)=>{
    let {parseString} = xml2js;
    let res;
    parseString(xml,  {
        trim: true,
        explicitArray: false
    }, function (err, result) {
        res = result;
    });
    return res;
} 

/**
 * 生成指定长度的随机数
 * @param {*int} len 
 */
const get_nonce_str = (len)=>{
    let str = '';
    while(str.length < len){
        str +=  Math.random().toString(36).slice(2);
    }
    return str.slice(-len);
}

const getClientPayConfig = (prepay_id)=>{
    let obj = {
        appId: appid,
        timeStamp: String(Math.floor(Date.now()/1000)),
        nonceStr: get_nonce_str(32),
        package: 'prepay_id=' + prepay_id,
        signType: 'MD5'
    }
    let arr = Object.keys(obj).sort().map(item => {
        return `${item}=${obj[item]}`;
    });
    let str = arr.join('&') + '&key=' + key;
    obj.paySign = getSign(str);
    return obj;
}

module.exports = {
    findMembers,
    prepay,
    generateToken,
}
