const mongoose = require("mongoose");

const TestSchema= mongoose.Schema({

    testArray:{
        type:Array,
        default : [Number] 
    }

});

const test =mongoose.model('test',TestSchema);

module.exports= test;
