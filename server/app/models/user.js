const bcrypt = require('bcryptjs')
const moment = require('moment')
moment.locale('ZH-CN')
const { sequelize } = require('../../core/db');

const { Sequelize, Model, Op } = require('sequelize');
class User extends Model {
    static async verifyPhonePassword(phonenum, plainPassword) {


        const user = await User.findOne({
            where: {
                phonenum
            }
        })

        if (!user) {

            throw new global.errs.AuthFailed("账号不正确");

        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed("密码不正确");
        }
        return user
    }

    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }

    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    phonenum: {
        type: Sequelize.STRING(128),
        unique: true
    },
    headUrl: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        set(val) {
            //生成盐，加密密码
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue("password", psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'users'
})


class Comment extends Model {
    static async getComment(bid) {
        // console.log("里面",bid)
        const commentData = await Comment.findAll({
            order:[["createdAt",'DESC']],
            include: [{
                model: User,
                attributes: ["nickname", "headURL"],
                where: {
                    id: Sequelize.col('comment.uid')
                }
            }],
            where: {
                bid
            }
        })
        return commentData
    }
}

Comment.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: Sequelize.STRING,
    score: Sequelize.FLOAT,
    uid: Sequelize.INTEGER,
    bid: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format("YYYY-MM-DD HH:mm:ss")
        }
    }
}, {
    sequelize,
    tableName: 'Comment'
})


class Order extends Model {
    static async newOrder(bid) {
        const res = await Order.findAll({
            order:[["createdAt",'DESC']],
            include: [{
                model: User,
                attributes: ["nickname"],
                where: {
                    id: Sequelize.col('Order.uid')
                }
            }],
            where:{
                [Op.and]:[
                    {bid:bid},
                    {book_date:moment(new Date()).format("YYYY-MM-DD")}
                ]
            }
        })
        return res
    }

    static async orderList(bid) {
        const res = await Order.findAll({
            order:[["createdAt",'DESC']],
            include: [{
                model: User,
                attributes: ["nickname"],
                where: {
                    id: Sequelize.col('Order.uid')
                }
            }],
            where:{
                bid
            }
        })
        return res
    }

}

Order.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type:Sequelize.BIGINT,
        set(val){
            const oid = moment(val).valueOf().toString().substr(0,10)+Math.ceil(Math.random()*10)+this.getDataValue('id')+Math.ceil(Math.random()*10);
            this.setDataValue("order_id", parseInt(oid))
        }
    },
    telphone: Sequelize.STRING(16),
    uid: Sequelize.INTEGER,
    bid: Sequelize.INTEGER,
    project_name: Sequelize.STRING(16),
    book_date: Sequelize.STRING(48),
    book_hour: Sequelize.INTEGER,
    total_price: Sequelize.INTEGER,
    order_type: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD hh:mm:ss')
        }
    }

}, {
    sequelize,
    tableName: 'Order'
})


Order.belongsTo(User, { foreignKey: 'uid' })
// User.hasOne(Comment,{foreignKey:'uid'})
Comment.belongsTo(User, { foreignKey: 'uid' })

module.exports = {
    User,
    Comment,
    Order
}