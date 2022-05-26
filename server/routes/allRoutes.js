const express = require('express');
const  Products = require('../models/products');
const {User,validate } = require("../models/user");
const bcrypt = require("bcrypt");
const { Employee } = require("../models/employee");
const { Order }  = require("../models/order");
const router = express.Router();

//save posts

router.post('/product/save',(req,res)=>{
    let newProduct = new Products(req.body);

    newProduct.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err 
            });
        }
        return res.status(200).json({
            success:"Product saved succesfully"
        });
    });
});


//get products

router.get('/products',(req,res) =>{
    Products.find().exec((err,products) =>{
        if(err){
            return res.status(400).json({
                error: err 
            });
        }
        return res.status(200).json({
            success:true,
            existingProducts:products
        });
    });
});

// //get specific product

router.get("/product/:id",(req,res) =>{
    let productId = req.params.id;

    Products.findById(productId,(err,product) =>{
        if(err){
            return res.status(400).json({success:false, err })
        }

        return res.status(200).json({
            success:true,
            product
        })
    })
})

// // //update products

router.put('/product/update/:id',(req,res)=>{
    Products.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body 
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});

// // //delete product

router.delete('/product/delete/:id',(req,res) =>{
    Products.findByIdAndRemove(req.params.id).exec((err,deletedProduct) =>{
         if(err) return res.status(400).json({
             message:"Delete unsuccessful",err 
         });

         return res.json({
             message:"Delete Successful",deletedProduct 
         });
    });
})


//router for employees///////
router.post("/employee/add",async(req,res) => {
    const employee = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        gender:req.body.gender,
        address:req.body.address,
        phone:req.body.phone
    }
    const user2 = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        role:req.body.role,
        password:req.body.password
    }
    let newEmployee = new Employee(employee);

    newEmployee.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err 
            });
        }
        return res.status(200).json({
            success:"Employee saved succesfully"
        });
    });
try {
    const{ error } = validate(user2);
    if(error)
        return res.status(400).send({message:error.details[0].message});

    const user = await User.findOne({ email:user2.email});
    if(user)
        return res.status(409).send({message:"user with given email already exists!"});

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(user2.password, salt);

    await new User({ ...user2,password:hashPassword}).save();
    res.status(201).send({message:"User created successfully"})

} catch (error) {
    res.status(500).send({message:"Internal Server Error"})
}
})

router.get('/employees',(req,res) =>{
    Employee.find().exec((err,employee) =>{
        if(err){
            return res.status(400).json({
                error: err 
            });
        }
        return res.status(200).json({
            success:true,
            existingEmployees:employee
        });
    });
});


router.delete('/employee/delete/:id',(req,res) =>{
    Employee.findByIdAndRemove(req.params.id).exec((err,deletedEmployee) =>{
         if(err) return res.status(400).json({
             message:"Delete unsuccessful",err 
         });

         return res.json({
             message:"Delete Successful",deletedEmployee
         });
    });
})

router.get("/employee/:id",(req,res) =>{
    let employeeId = req.params.id;

    Employee.findById(employeeId,(err,employee) =>{
        if(err){
            return res.status(400).json({success:false, err })
        }

        return res.status(200).json({
            success:true,
            employee
        })
    })
})

router.put('/employee/update/:id',(req,res)=>{
    Employee.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body 
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});

router.get("/productAndEmployees/:id",(req,res) =>{
    let productId = req.params.id;
    
    Products.findById(productId,(err,product) =>{
        if(err){
            return res.status(400).json({success:false, err })
        }else{
            User.find().exec((err,user) =>{
                if(err){
                    return res.status(400).json({
                        error: err 
                    });
                }
                return res.status(200).json({
                    success:true,
                    existingUsers:user,
                    product
                });
            });

        }
        
    })
    
    
})
router.post('/order/add',(req,res)=>{
    let newOrder = new Order(req.body);

    newOrder.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err 
            });
        }
        return res.status(200).json({
            success:"Order added succesfully"
        });
    });
});

router.get('/myOrders',(req,res) =>{
    Order.find().exec((err,order) =>{
        if(err){
            return res.status(400).json({
                error: err 
            });
        }
        return res.status(200).json({
            success:true,
            existingOrder:order
        });
    });
});

router.put('/order/update/:id',(req,res)=>{
    const data = req.body
    data.orderStatus = "Cancelled"
    Order.findByIdAndUpdate(
        req.params.id,
        {
            $set:data
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});
router.put('/order/updateEmp/:id',(req,res)=>{
    const data = req.body
    data.orderStatus = "Delivered"
    Order.findByIdAndUpdate(
        req.params.id,
        {
            $set:data
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});

router.put('/updatePassword/:id',async(req,res)=>{
    const data = req.body
    
    const user = await User.findOne({ email:req.body.email });
    // console.log(req.body)
    const newUser ={
        _id : req.params.id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        role:req.body.role,
        password:req.body.password
    }

    const validPassword = await bcrypt.compare(
        req.body.currentPassword, user.password)
    if(!validPassword)
        return res.status(401).send({message:"Invalid current Password"});

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(newUser.password, salt);
    
    const updatedUser = {...newUser,password:hashPassword}
    
    User.findByIdAndUpdate(
        req.params.id,
        {
            $set:updatedUser
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
    

});

router.get("/CurrentUser/:id",(req,res) =>{
    let userId = req.params.id;

    User.findById(userId,(err,user) =>{
        if(err){
            return res.status(400).json({success:false, err })
        }

        return res.status(200).json({
            success:true,
            user
        })
    })
})

 module.exports = router;