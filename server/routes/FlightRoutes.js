const express=require('express');
const flightController=require('../Controller/FlightController');
const flightRouter=express.Router();
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended: false}));
const clientController=require('../Controller/ClientController');
const  protect  = require("../middleware/authMiddleware.js");

const testController = require('../Controller/testController')


flightRouter.post('/',flightController.userLogin);

flightRouter.post('/createFlights',flightController.createFlight);





flightRouter.post('/doUpdateFlights/:id',flightController.updateFlight);

flightRouter.get('/updateFlights/:id',flightController.getUpdateFlight);



flightRouter.post('/signin',clientController.SignIn);

flightRouter.post('/signup',clientController.signUp);


flightRouter.get('/getFlights',protect.protectAdmin,flightController.findAllFlights);
flightRouter.post('/getFlights',protect.protectAdmin,flightController.findFlights);
flightRouter.delete('/deleteFlights/:id',protect.protectAdmin,flightController.deleteFlight);

flightRouter.get('/getBookings/:id',protect.protect,clientController.getBookings);
flightRouter.delete('/cancelBooking/:id',protect.protect,clientController.deleteClientFlight);

flightRouter.post('/getBookingFlights',clientController.findFlights);//protect.protect,

flightRouter.post('/book', protect.protect,clientController.book);//// protect.protect, 
flightRouter.get('/bookFlights/:id',clientController.getBookFlight);
flightRouter.get('/getProfile/',protect.protect,clientController.getProfile);
flightRouter.post('/updateProfile/',protect.protect,clientController.updateProfile);
flightRouter.get('/getToken',protect.createTokents);

flightRouter.post('/payment',protect.protect,clientController.payment);
flightRouter.post('/getPassword',protect.protect,clientController.getPassword);
flightRouter.post('/editSeatsNumber',protect.protect,clientController.editSeatsNumber)


flightRouter.post('/forgetPasswordStep1',clientController.forgetPasswordStep1);
flightRouter.post('/forgetPasswordStep2',clientController.forgetPasswordStep2);
flightRouter.post('/forgetPasswordStep3',clientController.forgetPasswordStep3);


flightRouter.post('/test',testController.createst);
flightRouter.post('/testGet',testController.getTest);

flightRouter.get('/testMail',flightController.home);

flightRouter.post('/logout',protect.logout)

module.exports=flightRouter;