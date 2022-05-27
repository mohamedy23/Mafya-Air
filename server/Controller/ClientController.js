const Client =require( '../model/client.js');
const Booking =require( '../model/booking');
const Flight =require( '../model/flight');
const Forget =require('../model/forget')
const  asyncHandler = require("express-async-handler");
const  createTokens = require( "../utils/generateToken");
const flightController=require('../Controller/FlightController');
const bcrypt = require("bcryptjs");
const Token = require("../model/token.js");
const stripe = require("stripe")("sk_test_51K8TPLHG9DEEaFkHIgPdKyIv9gCvzOmb2IPAKJRyOwRlUjESClUCLSEQ4BraqG8cyIwIYsMyhjkfx2lfQRvTEemM00ftg3wFQ0")
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const access_key_forget='ee0d55e175ce42e2793234775bcb39cd786317223bb65951957de78b3bd4f5eb07aeafd2c1b546e159e2c0282f60b65f7a9a575ae9392e7e28b29e56e6e4b1ad';


const generateTokenForget =(id) => {
  return  jwt.sign({ id }, access_key_forget, {
    expiresIn: "10d",
  });
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mafyaair@gmail.com',
    pass: '19021902'
  }
});

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





const signUp = asyncHandler(async (req,res)=>{
    console.log(req.body);
    try{

        const client = new Client(req.body);
        await client.save();
        const tok = createTokens.generateToken(client._id);
        const  t = new Token({token:tok});
        await t.save();       
        res.status(201).json({
            _id: client._id,
            name: client.name,
            email: client.email,
            age: client.age,
            passport: client.passport,
            isAdmin:client.isAdmin,
            token: tok,
            refreshToken: createTokens.generateRefreshToken(client._id)
          });

    }catch (error){
      res.send(["This Email is already used"]);

    }
});

const SignIn =asyncHandler(async (req,res)=>{
    const content = req.body;
    try{

    const client = await Client.findOne({ email:content.email });
    const tok = createTokens.generateToken(client._id);
    const  t = new Token({token:tok});
    await t.save();
    if (client && (await client.matchPassword(content.password))) {
      res.json({
        _id: client._id,
        name: client.name,
        email: client.email,
        age: client.age,
        passport: client.passport,
        isAdmin:client.isAdmin,
        token: tok,
        refreshToken:createTokens.generateRefreshToken(client._id)
      });
    } else {
      res.send(["Invalid Email or Password"]);
      
    }
  }
  catch(err){
    res.send(["Invalid Email or Password"]);
  }
});

var forgetStore ={};
var forgetValid ={};

const forgetPasswordStep1 =asyncHandler(async (req,res)=>{
        try{
          const ans =await Client.findOne({email:req.body.email});
          const ans2 = await Forget.findOne({email:req.body.email});
            if(ans&&!ans2){
             
              const code = parseInt(Math.random()*10)+""+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10);
              const forgetReq = new Forget({email:req.body.email,code :generateTokenForget(code),state : false})
              await forgetReq.save();
              const tok = generateTokenForget(forgetReq._id);
              await sendMail(req.body.email,"this is the code for changing your mafya air password account :"+code,'changing password')
              res.json({tokenForget:tok});
            }
            else{
              res.send("Invalid Email");
            }
          }

     catch(err){
            res.send("Invalid Email");
      }
})

const forgetPasswordStep2 =asyncHandler(async (req,res)=>{

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, access_key_forget);
      const forgetReq = await Forget.findById(decoded.id);
      if(forgetReq){
        const serverCode = jwt.verify(forgetReq.code, access_key_forget);
        if(serverCode.id===req.body.code){
            await Forget.findByIdAndUpdate(decoded.id,{state:true});
            res.send("ok");
        }
        else{
          res.send("incorrectCode");
        }

      }
      else{
        res.send("failed");
      }


    } catch (error) {
      console.log(error.message)
      res.send("failed");
    }
  }
  
})

const forgetPasswordStep3 =asyncHandler(async (req,res)=>{

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, access_key_forget);
      const forgetReq = await Forget.findById(decoded.id);
      if(forgetReq){
        const salt = await bcrypt.genSalt(10);
        const passNew = await bcrypt.hash(req.body.password, salt);
        await Client.findOneAndUpdate({email:forgetReq.email},{password:passNew})
        await Forget.findByIdAndDelete(decoded.id);
        res.send("ok");
      }
      else{
        res.send("failed");
      }


    } catch (error) {
      console.log(error.message)
      res.send("failed");
    }
  }
  
})


const payment = asyncHandler((req,res)=>{
  const { product, token } = req.body;
 stripe.customers
    .create({
      email: token.email,
      source: token.id
    }).then(customer =>{
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: customer.email,
          description: `purchase of ${product.name}`,
        }
      
      ).then(result=>{res.status(200).json("ok")})
      .catch(err => res.send("error"))
      
    })
    .catch(err => res.send("error"));
})


const book = asyncHandler(async (req,res)=>{

          const emad= await Flight.findById(req.body.flightId);
          
          if(req.body.FirstNumberOfSeats>emad.FirstSeats||
            req.body.BusinessNumberOfSeats>emad.BusinessSeats||
            req.body.EconomyNumberOfSeats>emad.EconomySeats ||
            req.body.FirstSeatsNumbers.length!=req.body.FirstNumberOfSeats||
            req.body.BusinessSeatsNumbers.length!=req.body.BusinessNumberOfSeats||
            req.body.EconomySeatsNumbers.length!=req.body.EconomyNumberOfSeats
            ){
                res.send("Sorry sets you choose more than available ");
            }
            else if(!(isSubset(emad.FirstSeatsNumbers,req.body.FirstSeatsNumbers)&&
                    isSubset(emad.BusinessSeatsNumbers,req.body.BusinessSeatsNumbers)&&
                    isSubset(emad.EconomySeatsNumbers,req.body.EconomySeatsNumbers))){

                      res.send("Seats unavailable");

                    }
            else{


              
                emad.FirstSeats-=parseInt(req.body.FirstNumberOfSeats)
                emad.BusinessSeats-=parseInt(req.body.BusinessNumberOfSeats)
                emad.EconomySeats-=parseInt(req.body.EconomyNumberOfSeats)

                emad.ReservedFirstSeats+=parseInt(req.body.FirstNumberOfSeats);
                emad.ReservedBusinessSeats+=parseInt(req.body.BusinessNumberOfSeats);
                emad.ReservedEconomySeats+=parseInt(req.body.EconomyNumberOfSeats);

                emad.FirstSeatsNumbers = removeSubset(emad.FirstSeatsNumbers,req.body.FirstSeatsNumbers);
                emad.BusinessSeatsNumbers = removeSubset(emad.BusinessSeatsNumbers,req.body.BusinessSeatsNumbers);
                emad.EconomySeatsNumbers = removeSubset(emad.EconomySeatsNumbers,req.body.EconomySeatsNumbers);

                emad.ReservedFirstSeatsNumbers = combine(emad.ReservedFirstSeatsNumbers,req.body.FirstSeatsNumbers)
                emad.ReservedBusinessSeatsNumbers = combine(emad.ReservedBusinessSeatsNumbers,req.body.BusinessSeatsNumbers)
                emad.ReservedEconomySeatsNumbers = combine(emad.ReservedEconomySeatsNumbers,req.body.EconomySeatsNumbers)

                try{
                 const booking = new Booking(req.body);
                 await booking.save();
                  await Flight.findByIdAndUpdate(req.body.flightId,emad)
                  var currentClient = await Client.findById(booking.clientId);
                  
                  sendMail(currentClient.email,"your flight has been booked successfully you can check details in your profile",'Ticket Reservation')

                  res.send(booking)
          
              }catch (error){
                  console.log(error.message)
                  res.send("can not book");
              }
              }

});
const deleteClientFlight = async(req,res)=>{
  const bookingId=req.params.id;
  try{
    const book = await Booking.findById(bookingId);
    await cancelBooking(bookingId);
    var currentClient = await Client.findById(book.clientId);
    sendMail(currentClient.email,"your flight has been canceled successfully , the refunded amount :"+book.TotalPrice,'Ticket cancellation')
    res.send("User Deleted successfully");

  }
  catch(err){
      console.log(err.message)
      res.send("error");
  }

}

const cancelBooking=async(bookingId)=>{
  
  const book = await Booking.findById(bookingId);
  const flightId = book.flightId;
  const emad= await Flight.findById(flightId);
  


  emad.FirstSeats+=book.FirstNumberOfSeats
  emad.BusinessSeats+=book.BusinessNumberOfSeats
  emad.EconomySeats+=book.EconomyNumberOfSeats

  emad.ReservedFirstSeats-=book.FirstNumberOfSeats;
  emad.ReservedBusinessSeats-=book.BusinessNumberOfSeats;
  emad.ReservedEconomySeats-=book.EconomyNumberOfSeats;

  emad.FirstSeatsNumbers = combine(emad.FirstSeatsNumbers,book.FirstSeatsNumbers);
  emad.BusinessSeatsNumbers = combine(emad.BusinessSeatsNumbers,book.BusinessSeatsNumbers);
  emad.EconomySeatsNumbers = combine(emad.EconomySeatsNumbers,book.EconomySeatsNumbers);

  emad.ReservedFirstSeatsNumbers = removeSubset(emad.ReservedFirstSeatsNumbers,book.FirstSeatsNumbers)
  emad.ReservedBusinessSeatsNumbers = removeSubset(emad.ReservedBusinessSeatsNumbers,book.BusinessSeatsNumbers)
  emad.ReservedEconomySeatsNumbers = removeSubset(emad.ReservedEconomySeatsNumbers,book.EconomySeatsNumbers)



  await Flight.findByIdAndUpdate(flightId,emad);
  await Booking.findByIdAndRemove(bookingId)


}



function isSubset(arr1, arr2,)
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
function combine(arr1,arr2){
  let n = arr2.length;
  let i = 0;
  for (i = 0; i < n; i++) {
    arr1.push(arr2[i]);

  }

  return arr1;
}
function removeSubset(arr1, arr2)
{
  let m = arr1.length;
  let n = arr2.length;
    let i = 0;
    let j = 0;
    for (i = 0; i < n; i++) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);

    }

    return arr1;
}




const findFlights = (req,res)=>{
  const data = req.body;
  const val ={};
  if(data.From!=null && data.From!="")
      Object.assign(val,{From:data.From})
  if(data.To!=null && data.To!="")
      Object.assign(val,{To:data.To})

  
  Flight.find(val).then((result)=>{
    
      resData =  filter(result,data) ;
      console.log(data)
      res.status(200).json(resData);
      
  }).catch (error=>{
    console.log(error.message)
      res.send([]);
  })
};


const getBookFlight = (req,res)=>{

    
  const id = req.params.id;
      Flight.findById(id).select("-_id").then((result)=>{
          res.status(200).json(result);

      }).catch((err)=>{
          res.status(409).json({message: err.message})
      })
  
};

const getProfile = (req,res)=>{

  
  const id = req.user._id.toString();
  //console.log(id)
      Client.findById(id).then((result)=>{
        res.status(200).json({
            name:result.name,
            email:result.email,
            passport:result.passport,
            age:result.age
          });
  

      }).catch((err)=>{
          res.status(409).json({message: err.message})
      })
  
};

const updateProfile = (req,res)=>{
    Client.findByIdAndUpdate(req.user._id.toString(),req.body).then(result =>{
      
        res.send("User updated successfully");
    }).catch(err => {
        res.send("error");
      });
    
};

const getBookings = (req,res)=>{
  const id = req.params.id;
      Booking.find({clientId:id}).then((result)=>{
          res.status(200).send(result);
          
      }).catch((err)=>{
          res.status(409).json({message: err.message})
      })
  

};

const getPassword=asyncHandler(async(req,res)=>{
  const id = req.user._id.toString();
  const client = await Client.findById(id);
  const content = req.body;
  
  if (client && (await client.matchPassword(content.password))) {
          try{
            const salt = await bcrypt.genSalt(10);
            const passNew = await bcrypt.hash(content.newPassword, salt);
          await Client.findByIdAndUpdate(id,{password:passNew});
          res.send("ok");
          }
          catch(error){
            console.log(error.message);
            res.send(error.message);
          }
  }
  else{
        res.send("no");
  }
  


})

const editSeatsNumber=asyncHandler(async(req,res)=>{
  try{
  await Booking.findByIdAndUpdate(req.body.BId,req.body.BN);
  await Flight.findByIdAndUpdate(req.body.FId,req.body.FN);
  res.send("ok")
  }
  catch(err){
    res.send("error")

  }
})


function filter(result,data){
  ans=[];
  for(let i = 0 ; i <result.length;i++){
      let temp = result[i]
      x=(formatDate(result[i].DateD)==formatDate(data.DateD))||data.DateD==''||data.DateD==null;
      y=formatDate(result[i].DateA)==formatDate(data.DateA)||data.DateA==''||data.DateA==null;
      z=(data.FirstSeats<=result[i].FirstSeats|| data.FirstSeats=='' ||data.FirstSeats==null)&&
        (data.EconomySeats<=result[i].EconomySeats||data.EconomySeats==''||data.EconomySeats==null)&&
        (data.BusinessSeats<=result[i].BusinessSeats||data.BusinessSeats==''||data.BusinessSeats==null);
      if(x && y&&z)
        ans.push(temp);
  }
  return ans;

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


  return sMonth + "/" + sDay + "/" + sYear ;
}

function padValue(value) {
  return (value < 10) ? "0" + value : value;
}












module.exports=
{
signUp,
SignIn,
book,
findFlights,
getBookFlight,
getProfile,
updateProfile,
cancelBooking,
getBookings,
deleteClientFlight,
payment,
getPassword,
editSeatsNumber,
forgetPasswordStep1,
forgetPasswordStep2,
forgetPasswordStep3

}
