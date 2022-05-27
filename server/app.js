//using express
const express=require('express');
const app =express();

const flightRouter=require('./routes/FlightRoutes');
const clientRouter=require('./routes/ClientRouter');


const mongoose=require('mongoose');
var cors = require('cors');


const dbPath = 'mongodb+srv://Mafya:1902@mafya.j0cdw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbPath).then((result)=>console.log('connected to DB'))
.catch((err)=>console.log(err));

app.use(cors());



app.use('/flights',flightRouter);



app.listen(8000);
console.log("Back-end Listening on port 8000");











