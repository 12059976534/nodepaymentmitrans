'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    ordercode: DataTypes.STRING,
    responpay: DataTypes.TEXT    
  },{
    timestamps:false
  });
  
  return Order;
};