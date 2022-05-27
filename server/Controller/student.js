import student from '../models/student.js'
import user from '../models/user.js';
import flight from '../models/Flight.js';

export const  getStudents  = async(req,res)=>{
    try{
        const allstudents = await student.find();
        res.status(200).json(allstudents);


    } catch(error) {
        res.status(404).json({message: error.message})

    }

};

export const createStudent = async (req,res)=>{
    const newUser = new user(req.body)
    try{
        await newUser.save();
        res.status(201).json(newUser);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

export const userLogin = async (req,res)=>{
    const userData = req.body;
    try{
         const currentUser = await user.find({userName:userData.userName});
         if(currentUser[0].password==userData.password){
             res.send("login ")
         }
         else{
             res.send("invalid user or password")
         }

    }catch (error){
        res.send("error")

    }
};

export const createFlight = async (req,res)=>{
    const newFlight = new flight(req.body)
    try{
        await newFlight.save();
        res.status(201).json(newFlight);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

export const deleteFlight = async (req,res)=>{
    const id = req.params.id;
    try{
        await flight.findByIdAndRemove(id).exec();
        res.status(200).json(id);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

export const getUpdateFlight = async (req,res)=>{
    const id = req.params.id;
    try{
        const ans = await flight.findById(id).exec();
        
        res.status(200).json(ans);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

export const UpdateFlight = async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    try{
        await flight.findByIdAndUpdate(id,{Flight_No:data.Flight_No,From:data.From,To:data.To,DateD:data.DateD,DateA:data.DateA,
            FirstSeats:data.FirstSeats,BusinessSeats:data.BusinessSeats,EconomySeats:data.EconomySeats}).exec();
        
        res.status(200).json("ok");

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

export const findAllFlights = async (req,res)=>{
    try{
       const ans = await flight.find().exec();
        
        res.status(200).json(ans);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

export const findFlights = async (req,res)=>{
    const data = req.body;
    const val ={};
    if(data.Flight_No!=null)
        Object.assign(val,{Flight_No:data.Flight_No})
    if(data.From!=null)
        Object.assign(val,{From:data.From})
    if(data.To!=null)
        Object.assign(val,{To:data.To})
    if(data.DateD!=null)
        Object.assign(val,{DateD:data.DateD})
    if(data.DateA!=null)
        Object.assign(val,{DateA:data.DateA})
    if(data.FirstSeats!=null){
        Object.assign(val,{FirstSeats:data.FirstSeats})
    }
    if(data.EconomySeats!=null)
        Object.assign(val,{EconomySeats:data.EconomySeats})
    if(data.BusinessSeats!=null)
        Object.assign(val,{BusinessSeats:data.BusinessSeats})
    try{
       const ans = await flight.find(val).exec();
        res.status(200).json(ans);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};
