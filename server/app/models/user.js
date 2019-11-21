const bcrypt = require('bcryptjs')
const moment = require('moment')
moment.locale('zh-cn')
const { sequelize } = require('../../core/db');

const { Sequelize, Model } = require('sequelize');
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
            return moment(this.getDataValue('createdAt')).startOf('hour').fromNow();
        }
    }
}, {
    sequelize,
    tableName: 'Comment'
})


class Order extends Model {

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