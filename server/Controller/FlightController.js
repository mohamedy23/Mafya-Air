
const User = require( '../model/user.js');
const Flight =require( '../model/flight.js');
let alert = require('alert'); 
const Booking = require('../model/booking.js');
const Client = require('../model/client.js');
const clientController=require('../Controller/ClientController');
let logedin = true;

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mafyaair@gmail.com',
    pass: '19021902'
  }
});

const  home= async (req,res)=>
{
 sendMail('ahmednasser1902@gmail.com',"hello world","Mafya")
};


const createUser = async (req,res)=>{
    
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

const userLogin = async (req,res)=>{
    const userData = req.body;
    console.log(req.body)
    try{
         const currentUser = await User.find({userName:userData.userName});
         if(currentUser[0].password==userData.password){
             logedin=true;
             res.send("login")
         }
         else{
             res.send("invalid password")
         }

    }catch (error){
        console.log(error.message)
        res.send("invalid user Name")

    }
};

const createFlight=(req,res)=>
{
    try{
    const flight=new Flight(
        {
            Flight_No : req.body.Flight_No,
            From: req.body.From,
            To : req.body.To,
            DateD:req.body.DateD,
            DateA: req.body.DateA,
            FirstSeats:req.body.FirstSeats,
            BusinessSeats: req.body.BusinessSeats,
            EconomySeats:req.body.EconomySeats,
            ReservedFirstSeats:0,
            ReservedBusinessSeats: 0,
            ReservedEconomySeats:0,
            FirstPrice:req.body.FirstPrice,
            BusinessPrice:req.body.BusinessPrice,
            EconomyPrice:req.body.EconomyPrice,
            FirstSeatsNumbers:implementArray(req.body.FirstSeats),
            BusinessSeatsNumbers:implementArray(req.body.BusinessSeats),
            EconomySeatsNumbers:implementArray(req.body.EconomySeats),
            ReservedFirstSeatsNumbers:[],
            ReservedBusinessSeatsNumbers:[],
            ReservedEconomySeatsNumbers:[],
            BaggageAllowanceFirst:req.body.BaggageAllowanceFirst,
            BaggageAllowanceBusiness:req.body.BaggageAllowanceBusiness,
            BaggageAllowanceEconomy:req.body.BaggageAllowanceEconomy
            

        }
    );
    
    flight.save().then((result)=>{
        res.send("1");
    }).catch((err)=>
    { 
        res.send("2");
    });
    }
    catch(error){
       
        res.send("2");
    }

 
};
const implementArray=(x)=>{
   var arr = []
   for(let i = 0 ;i<x;i++){
       arr.push(i+1);
   }
   return arr;;
}

const deleteFlight = (req,res)=>{
    Flight.findByIdAndRemove(req.params.id).then(result =>{
        notifyCancel(req.params.id)
        res.send("User Deleted successfully");
    }).catch(err => {
        res.send("error");
      });
    

  };

  const notifyCancel= async (id)=>{
        Booking.find({flightId:id}).then(res=>{
            for(let i = 0 ;i<res.length;i++){
                Booking.findByIdAndRemove(res[i]._id).then(resss=>{
                    Client.findById(res[i].clientId).then(currentClient=>{
                    
                        sendMail(currentClient.email,"Unfortunately, your booked flight is canceled due to emergency reasons ","Flight cancellation !!");
    
                    })
                })
  

            }
        })
  }

  const getUpdateFlight = (req,res)=>{
    if(!logedin){
        res.send("Login First");
      }
      else{
      
    const id = req.params.id;
        Flight.findById(id).then((result)=>{
            res.status(200).json(result);
            
        }).catch((err)=>{
            res.status(409).json({message: err.message})
        })
    }

};

const updateFlight = (req,res)=>{
  validateRec(req).then((valid)=>{
      if(valid){

        Flight.findById(req.params.id).then((oldFilght)=>{

            Flight.findByIdAndUpdate(req.params.id,req.body).then(result =>{
                notify(oldFilght,req.body,req.params.id);
        
                res.send("1");
            }).catch(err => {
                res.send("2");
              });

        }).catch(err => {
            res.send("2");
          });


      }
      else{
          res.send("2");
      }

  }).catch(err =>{
      res.send("2");

  })
    

};

const notify=async(oldFlight,newFlight,id)=>{
    //    oldFlight.FirstPrice==newFlight.FirstPrice&&oldFlight.BusinessPrice==newFlight.BusinessPrice&&oldFlight.EconomyPrice==newFlight.EconomyPrice;
    const x=formatDate(oldFlight.DateD)==formatDate(newFlight.DateD)&&formatDate(oldFlight.DateA)==formatDate(newFlight.DateA)&&
    oldFlight.Flight_No==newFlight.Flight_No&&oldFlight.From==newFlight.From&&oldFlight.To==newFlight.To


    const clients = await Booking.find({"flightId":id});
 
        for(let i = 0 ; i<clients.length;i++){
            var currentClient = await Client.findById(clients[i].clientId);
            var m = (isSubset(newFlight.ReservedFirstSeatsNumbers,clients[i].FirstSeatsNumbers)&&
                    isSubset(newFlight.ReservedBusinessSeatsNumbers,clients[i].BusinessSeatsNumbers)&&
                    isSubset(newFlight.ReservedEconomySeatsNumbers,clients[i].EconomySeatsNumbers));
            console.log(x+"  "+m)
            if(!m){
                   ////cancel 
                    clientController.cancelBooking(clients[i]._id.toString()).then(result=>{
                    sendMail(currentClient.email,"Unfortunately, your booked flight is canceled due to emergency reasons ","Flight cancellation !!");
                   })
                   
            }
            else if(!x){
                    ///update 
                    console.log('update')
                    var v ={
                        Flight_No:newFlight.Flight_No,
                        From:newFlight.From,
                        To:newFlight.To,
                        DateD:newFlight.DateD,
                        DateA:newFlight.DateA,
                    }

 

                    Booking.findByIdAndUpdate(clients[i]._id.toString(),v).then((result)=>{
                        sendMail(currentClient.email,"your booked flight is updated due to emergency reasons please visit your profile to check your flights details","Flight updating !!");
                        console.log(clients[i]._id)
                        console.log(v)

                    }).catch(err => {
                        console.log(err.message)
                      });

            }



        }



}


function isSubset(arr1, arr2)
{
  let m = arr1.length;
  let n = arr2.length;
    let i = 0;
    let j = 0;
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++)
            if (arr2[i] == arr1[j])
                break;

        if (j == m)
            return false;
    }

    return true;
}


const sendMail=(email,message,subject)=>{
    var mailOptions = {
        from: 'mafyaair@gmail.com',
        to: email,
        subject: subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 

}


const validateRec = async (req)=>{
    const data = req.body;
    const val ={};
    if(data.Flight_No==null || data.Flight_No=="" )
        return false;
    if(data.From==null || data.From=="")
        return false;
    if(data.To==null || data.To=="")
        return false;
    if(data.FirstSeats==null || data.FirstSeats=="")
        return false;
    if(data.EconomySeats==null || data.EconomySeats=="")
       return false;
    if(data.BusinessSeats==null || data.BusinessSeats=="")
       return false;
    if(data.FirstPrice==null || data.FirstPrice=="")
        return false;
    if(data.EconomyPrice==null || data.EconomyPrice=="")
       return false;
    if(data.BusinessPrice==null || data.BusinessPrice=="")
       return false;
    if(data.DateA==null || data.DateA=="")
       return false;
    if(data.DateD==null || data.DateD=="")
       return false;
    return true;
    
  };
  const findAllFlights = (req, res) => {  
      
      if(!logedin){
        res.send([]);
      } 
      else{                             ``
    Flight.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    }
    };

    const findFlights = (req,res)=>{
        console.log(req.body);
        const data = req.body;
        const val ={};
        if(data.Flight_No!=null && data.Flight_No!="" )
            Object.assign(val,{Flight_No:data.Flight_No})

        if(data.From!=null && data.From!="")
            Object.assign(val,{From:data.From})
        if(data.To!=null && data.To!="")
            Object.assign(val,{To:data.To})

        if(data.FirstSeats!=null && data.FirstSeats!="")
            Object.assign(val,{FirstSeats:data.FirstSeats})
        if(data.ReservedFirstSeats!=null && data.ReservedFirstSeats!="")
            Object.assign(val,{ReservedFirstSeats:data.ReservedFirstSeats})
        if(data.FirstPrice!=null && data.FirstPrice!="")
            Object.assign(val,{FirstPrice:data.FirstPrice})

        if(data.BusinessSeats!=null && data.BusinessSeats!="")
            Object.assign(val,{BusinessSeats:data.BusinessSeats})
        if(data.ReservedBusinessSeats!=null && data.ReservedBusinessSeats!="")
            Object.assign(val,{ReservedBusinessSeats:data.ReservedBusinessSeats})
        if(data.BusinessPrice!=null && data.BusinessPrice!="")
            Object.assign(val,{BusinessPrice:data.BusinessPrice})
        
        if(data.EconomySeats!=null && data.EconomySeats!="")
            Object.assign(val,{EconomySeats:data.EconomySeats})
        if(data.ReservedEconomySeats!=null && data.ReservedEconomySeats!="")
            Object.assign(val,{ReservedEconomySeats:data.ReservedEconomySeats})
        if(data.EconomyPrice!=null && data.EconomyPrice!="")
            Object.assign(val,{EconomyPrice:data.EconomyPrice})


        

        Flight.find(val).then((result)=>{
            resData =  filterDate(result,data) ;
            if(!logedin){
                res.send([])
            }
            else{
                res.status(200).json(resData);
            }
            
        }).catch (error=>{
            res.send("error");
        })
    };
    function filterDate(result,data){
        ans=[];
        for(let i = 0 ; i <result.length;i++){
            let temp = result[i]
            x=(formatDate(result[i].DateD)==formatDate(data.DateD))||data.DateD==''||data.DateD==null;
            y=formatDate(result[i].DateA)==formatDate(data.DateA)||data.DateA==''||data.DateA==null;
            if(x && y)
              ans.push(temp);
        }
        return ans;

    }



    module.exports=
    {
        createFlight,
        deleteFlight,
        getUpdateFlight,
        updateFlight,
        findAllFlights,
        findFlights,
        home,
        userLogin,
        createUser,
        sendMail
    }

    function formatDate(dateVal) {
        if(dateVal=="")
           return "Nan";
        if(dateVal==null)
           return "Nan";
        var newDate = new Date(dateVal);
      
        var sMonth = padValue(newDate.getMonth() + 1);
        var sDay = padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        var sHour = newDate.getHours();
        var sMinute = padValue(newDate.getMinutes());
        var sAMPM = "AM";
      
        var iHourCheck = parseInt(sHour);
      
        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = "12";
        }
      
        sHour = padValue(sHour);
      
        return sMonth + "/" + sDay + "/" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
      }
      
      function padValue(value) {
        return (value < 10) ? "0" + value : value;
      }