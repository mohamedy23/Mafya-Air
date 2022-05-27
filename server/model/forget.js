const mongoose = require("mongoose");
const forgetSchema = mongoose.Schema({
    email:{ type : String , required : true },
    code:{ type : String ,required : true },
    state :{ type : Boolean ,  required : true }
});

const Forget = mongoose.model('Forget',forgetSchema );

module.exports= Forget ;