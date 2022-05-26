const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    detail:{
        type:String,
        required:true 
    },
    price:{
        type:String,
        required:true 
    }
});
module.exports = mongoose.model('Products',productSchema);