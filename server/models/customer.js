const mongoose = require('mongoose');
const Joi = require('joi');

const CustomerSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    gender:{type:String, required:true},
    address:{type:String, required:true},
    phone:{type:String, required:true},
});

const Customer = mongoose.model("customer",CustomerSchema);

const validateCustomer = (data) =>{
    const schema = Joi.object({
        firstName:Joi.string().required().label("First Name"),
        lastName:Joi.string().required().label("Last Name"),
        email:Joi.string().email().required().label("Email"),
        gender:Joi.string().required().label("Gender"),
        address:Joi.string().required().label("Address"),
        phone:Joi.string().required().label("Phone"),
    });
    return schema.validateCustomer(data)
};

module.exports = {Customer, validateCustomer};