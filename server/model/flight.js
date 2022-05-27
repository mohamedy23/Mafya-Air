const mongoose = require("mongoose");

const flightSchema= mongoose.Schema({

    Flight_No:{
        type:String,
        unique : true,
        required:true
    },

    From:{
        type:String,
        required:true
    },
    To:{ 
        type:String,
        required:true
    },
    DateD:{
        type:Date,
        required:true
    },
    DateA:{
        type:Date,
        required:true
    },
    FirstSeats:{
        type:Number,
        required:true
    },
    BusinessSeats:{
        type:Number,
        required:true
    },
    EconomySeats:{
        type:Number,
        required:true
    },
    ReservedFirstSeats:{
        type:Number,
        required:true
    },
    ReservedBusinessSeats:{
        type:Number,
        required:true
    },
    ReservedEconomySeats:{
        type:Number,
        required:true
    },
    FirstPrice:{
        type:Number,
        required:true
    },
    BusinessPrice:{
        type:Number,
        required:true
    },
    EconomyPrice:{
        type:Number,
        required:true
    },
    FirstSeatsNumbers:{
        type:[Number],
        default :[] 
    },
    BusinessSeatsNumbers:{
        type:[Number],
        default : [] 
    },
    EconomySeatsNumbers:{
        type:[Number],
        default : [] 
    },
    ReservedFirstSeatsNumbers:{
        type:[Number],
        default : [] 
    },
    ReservedBusinessSeatsNumbers:{
        type:[Number],
        default : [] 
    },
    ReservedEconomySeatsNumbers:{
        type:[Number],
        default : [] 
    },
    BaggageAllowanceFirst:{
        type:Number,
        default:0,
        required:true
    },
    BaggageAllowanceBusiness:{
        type:Number,
        default:0,
        required:true
    },
    BaggageAllowanceEconomy:{
        type:Number,
        default:0,
        required:true
    }

});

const flight =mongoose.model('flight',flightSchema);

module.exports= flight;
