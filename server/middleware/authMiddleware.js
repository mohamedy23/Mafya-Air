const jwt = require("jsonwebtoken");
const Client = require("../model/client.js");
const Token = require("../model/token.js");
const generateToken = require("../utils/generateToken.js");
const  asyncHandler = require("express-async-handler");
const access_key=generateToken.access_key;
const refresh_key= generateToken.refresh_key;

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    try {
      token = req.headers.authorization.split(" ")[1];
      const tData = await  Token.findOne({token:token});
      if(tData){

      //decodes token id
      const decoded = jwt.verify(token, access_key);
      

      req.user = await Client.findById(decoded.id).select("-password");
      next();
      }
      else{
        res.status(401).send("Not authorized, token failed");
      }
    } catch (error) {
      res.status(401).send("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).send("Not authorized, token failed");
  }
});

const protectForget = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, access_key);
      req.email= decoded;
      next();
      
    } catch (error) {
      res.send("failed");
    }
  }

  if (!token) {
    res.send("failed");
  }
});






const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    try {
      token = req.headers.authorization.split(" ")[1];
      const tData = await Token.findOne({token:token});
      if(tData){

      //decodes token id
      const decoded = jwt.verify(token, access_key);
      

      req.user = await Client.findById(decoded.id).select("-password");
      if(req.user && req.user.isAdmin)
             next();
      else if(req.user)
            res.status(401).send("your are not the admin");
      }
      else{
        res.status(401).send("Not authorized, token failed");
      }
    } catch (error) {
      res.status(401).send("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).send("Not authorized, token failed");
  }
});

const logout = asyncHandler(async (req, res) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      Token.deleteOne({'token':token}).then(result=>{
        res.send("ok");
    
      }).catch(error=>{
        res.send(error.message);
      })
    }
    catch(err){
      res.send(error.message);
    }
  }


})

const createTokents = asyncHandler(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization&&Token.findOne({token:req.headers.authorization})
  ) {
    try{
      token = req.headers.authorization;
      const decoded = jwt.verify(token, refresh_key);
      const u =await Client.findById(decoded.id);
      if(u){
        console.log("newwwwwwwww")
             res.send(generateToken.generateToken(u._id));
      }
      else{
        res.status(401).send("Not authorized, token failed");
      }
    }
    catch(error){
      res.status(401).send("Not authorized, token failed");
    }
    
  }
  else{
    res.status(401).send("Not authorized, token failed");
  }




})


module.exports= { 
  protect,
  protectAdmin,
  createTokents,
  logout,
  protectForget
 };
