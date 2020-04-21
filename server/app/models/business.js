

const { sequelize } = require('../../core/db');

const { Sequelize, Model, Op } = require('sequelize');

class Business extends Model {
    static async existBusiness(uid) {
        let exist = await Business.findOne({
            where: {
                uid
            }
        })
        if (!exist) {
            exist = -1
        } else {
            exist = 1
        }
        return exist
    }
    static async fuzzySearch(keyword) {
        let result = await Business.findAll({
            attributes:[["id","pid"],["business_name","placeName"],"score","city","business_imgURL"],
            include: [{
                model: Business_project,
                where: {
                        project_name: {
                            [Op.like]: '%' + keyword + '%'
                        }    

                }
            }],
            // where: {
            //     business_name: {
            //         [Op.like]: '%' + keyword + '%'
            //     }
            // }
        })
        return result

    }
}

Business.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    business_name: Sequelize.STRING,
    telphone: Sequelize.STRING(16),
    business_start_time: Sequelize.STRING(10),
    business_end_time: Sequelize.STRING(10),
    score: Sequelize.FLOAT,
    location: Sequelize.STRING(128),
    city: Sequelize.STRING(16),
    business_imgURL: {
        type:Sequelize.STRING(256)
    },
    uid: Sequelize.INTEGER

}, {
    sequelize,
    tableName: 'Business'
})

class Business_project extends Model {

}

Business_project.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    project_name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    describe: Sequelize.TEXT,
    bid: Sequelize.INTEGER

}, {
    sequelize,
    tableName: 'Business_project'
})

Business_project.belongsTo(Business, { foreignKey: 'bid' })
Business.hasOne(Business_project, { foreignKey: 'bid' })
module.exports = {
    Business,
    Business_project
}