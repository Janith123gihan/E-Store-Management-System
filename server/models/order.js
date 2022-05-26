const mongoose = require('mongoose');
const Joi = require('joi');

const OrderSchema = new mongoose.Schema({
    name:{type:String, required:true},
    detail:{type:String, required:true},
    price:{type:String, required:true},
    employeeId:{type:String, required:true},
    customerName:{type:String, required:true},
    address:{type:String, required:true},
    phone:{type:String, required:true},
    orderStatus:{type:String, required:true}
});

const Order = mongoose.model("order",OrderSchema);

const validateOrder = (data) =>{
    const schema = Joi.object({
        name:Joi.string().required().label(" Name"),
        detail:Joi.string().required().label("Detail"),
        price:Joi.string().required().label("Price"),
        employeeId:Joi.string().required().label("Employee Id"),
        customerName:Joi.string().required().label("Customer Name"),
        address:Joi.string().required().label("Address"),
        phone:Joi.string().required().label("Phone"),
        orderStatus:Joi.string().required().label("Status")
    });
    return schema.validateOrder(data)
};

module.exports = {Order, validateOrder};