const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
    },
    flightId: {
      type: String,
      required: true,
    },
    Flight_No:{
        type:String,
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
    FirstNumberOfSeats:{
        type:Number,
        required:true
    },
    FirstPrice:{
        type:Number,
        required:true
    },

    BusinessNumberOfSeats:{
        type:Number,
        required:true
    },
    BusinessPrice:{
        type:Number,
        required:true
    },
    EconomyNumberOfSeats:{
        type:Number,
        required:true
    },
    EconomyPrice:{
        type:Number,
        required:true
    },
    FirstSeatsNumbers:{
        type:[Number],
        default : []
    },
    BusinessSeatsNumbers:{
        type:[Number] ,
        default : []
    },
    EconomySeatsNumbers:{
        type: [Number],
        default : []
    },
    TotalPrice:{
        type:Number,
        default:'0',
        required:true
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
    },
    TotalBaggageAlowance:{
        type:Number,
        default:0,
        required:true
    },
    NumberOfChildren:{
        type:Number,
        default:0,
        required:true
    }


  },
  {
    timestamps: true,
  }
);



const Booking = mongoose.model("Booking", bookingSchema);

module.exports= Booking;
