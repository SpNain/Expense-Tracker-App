const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const expenseDetails = sequelize.define('expenseDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
        unique:true
    },
    expenseAmount:{
        type: Sequelize.DOUBLE,
        allowNull :false
    },
    expenseDescription:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    expenseCategory:{
        type: Sequelize.STRING,
        allowNull:false,
    },
});
module.exports = expenseDetails;