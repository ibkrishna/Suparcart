var mongoose=require('mongoose')
var contactUsSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    message:{
        type:String,
        require:true,
    },
},{timestamps:true});
module.exports=mongoose.model('ContactUs',contactUsSchema);