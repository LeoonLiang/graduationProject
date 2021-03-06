

const { sequelize } = require('../../core/db');

const { Sequelize, Model, Op } = require('sequelize');

class Match extends Model {
   
}

Match.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    match_name: Sequelize.STRING,
    telphone: Sequelize.STRING(16),
    match_start_time: Sequelize.STRING(10),
    match_end_time: Sequelize.STRING(10),
    introdution: Sequelize.TEXT,
    location: Sequelize.STRING(128),
    city: Sequelize.STRING(16),
    match_type: Sequelize.INTEGER,
    memberNum: Sequelize.INTEGER,
    match_imgURL: {
        type:Sequelize.STRING(256)
    },
    uid: Sequelize.INTEGER

}, {
    sequelize,
    tableName: 'match'
})

class Match_member extends Model {

}

Match_member.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    member_name: Sequelize.STRING,
    telphone: Sequelize.STRING(16),
    idCard: Sequelize.STRING(20),
    remark: Sequelize.TEXT,
    ranking: Sequelize.INTEGER,
    uid: Sequelize.INTEGER,

}, {
    sequelize,
    underscored: true,
    tableName: 'Match_member'
})


Match_member.belongsTo(Match, { foreignKey: 'mid' })
Match_member.sync({ alter: true })

// Match.hasOne(Match_member, { foreignKey: 'mid' })
module.exports = {
    Match,
    Match_member
}