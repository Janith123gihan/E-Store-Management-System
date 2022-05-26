   const router = require("express").Router();
   const { User } = require("../models/user");
   const { Customer } = require("../models/customer");
   const { Employee } = require("../models/employee");

   const Joi = require("joi");
   const bcrypt = require("bcrypt");

   router.post("/",async(req,res)=>{
       try {
           const { error } = validate(req.body);
            if(error)
                return res.status(400).send({message:error.details[0].message });
            const user = await User.findOne({ email:req.body.email });
            if(!user)
                return res.status(401).send({ message:"Invalid Email or Password"});
            const validPassword = await bcrypt.compare(
                req.body.password, user.password
            );
            if(!validPassword)
                return res.status(401).send({message:"Invalid Email or Password"});
            const token = user.generateAuthToken();

            const customer = await Customer.findOne({ email:req.body.email });
            const employee = await Employee.findOne({ email:req.body.email });

            const user1 = await User.findOne({ email:req.body.email });
            if(user1.role === "0")
                res.status(200).send({data:token,code:200,name:user1.firstName,id:user1._id, address:customer.address,phone:customer.phone, message:"Logged in successfully"});
            if(user1.role === "1")
                res.status(200).send({data:token,code:201,name:user1.firstName,id:user1._id, address:employee.address,phone:employee.phone, message:"Logged in successfully"});
            if(user1.role === "2")
                res.status(200).send({data:token,code:202,name:user1.firstName,id:user1._id, address:customer.address,phone:customer.phone, message:"Logged in successfully"});
            
       } catch (error) {
           res.status(500).send({message:"Internal Server Error"})
       }
   })

   const validate = (data)=>{
       const schema = Joi.object({
           email:Joi.string().email().required().label("Email"),
           password: Joi.string().required().label("Password")
       });
       return schema.validate(data);

   }

   module.exports = router;