const Test = require( '../model/Test.js');

const createst = async (req,res)=>{
    
    try{
        const test = new Test(req.body);
        await test.save();
        res.status(201).json(test);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

const getTest = async (req,res)=>{
    Test.findById(req.body.id).then((result)=>{
        console.log(result.testArray[0])
        result.testArray.remove(2)
        res.status(200).json(result);

    }).catch((err)=>{
        res.status(409).json({message: err.message})
    })
}

module.exports= {createst,getTest};