const sequelize = require('sequelize'); 
const db = require('../config/DBConfig');

// Create videos table in MySQL Database


class Product extends sequelize.Model{

}
Product.init({
        sku:{type: sequelize.INTEGER, autoIncrement: false, primaryKey: true},
        name: { type: sequelize.STRING }, 
        description: { type: sequelize.STRING(2000) }, 
        price: { type: sequelize.FLOAT }, 
        quantity: {type: sequelize.INTEGER},
        category:{type:sequelize.STRING}
        
},
    {
        freezeTableName: true,
        timestamps: true,
        sequelize: db,
        modelName: "product",
    }
)    

module.exports = Product;