const express=require('express');
const clientController=require('../Controller/ClientController');
const flightRouter=express.Router();
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended: false}));

flightRouter.post('/signin',clientController.SignIn);

flightRouter.post('/signup',clientController.signUp);