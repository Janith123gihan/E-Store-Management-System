const router = require("express").Router();
const {User,validate } = require("../models/user");
const bcrypt = require("bcrypt");
const { Customer } = require("../models/customer");

router.post("/",async(req,res) => {
        const customer = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            gender:req.body.gender,
            address:req.body.address,
            phone:req.body.phone
        }
        const user1 = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            role:req.body.role,
            password:req.body.password
        }
        let newCustomer = new Customer(customer);
    
        newCustomer.save((err) =>{
            if(err){
                return res.status(400).json({
                    error:err 
                });
            }
            return res.status(200).json({
                success:"Customer saved succesfully"
            });
        });
    try {
        const{ error } = validate(user1);
        if(error)
            return res.status(400).send({message:error.details[0].message});

        const user = await User.findOne({ email:user1.email});
        if(user)
            return res.status(409).send({message:"user with given email already exists!"});
    
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(user1.password, salt);

        await new User({ ...user1,password:hashPassword}).save();
        res.status(201).send({message:"User created successfully"})
    
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

module.exports = router;