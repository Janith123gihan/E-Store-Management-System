const mongoose = require('mongoose');
const Joi = require('joi');

const EmployeeSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    gender:{type:String, required:true},
    address:{type:String, required:true},
    phone:{type:String, required:true},
});

const Employee = mongoose.model("employee",EmployeeSchema);

const validateEmployee = (data) =>{
    const schema = Joi.object({
        firstName:Joi.string().required().label("First Name"),
        lastName:Joi.string().required().label("Last Name"),
        email:Joi.string().email().required().label("Email"),
        gender:Joi.string().required().label("Gender"),
        address:Joi.string().required().label("Address"),
        phone:Joi.string().required().label("Phone"),
    });
    return schema.validateEmployee(data)
};

module.exports = {Employee, validateEmployee};