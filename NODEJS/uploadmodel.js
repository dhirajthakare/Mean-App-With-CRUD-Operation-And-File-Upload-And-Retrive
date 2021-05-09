const mongoose = require('mongoose');
const userschema = mongoose.Schema({
    Name:String,
    Email:String,
    Mob:String,
    imgUrl:String
})
module.exports=mongoose.model('uploadimages',userschema);