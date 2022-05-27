import  React  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "react-bootstrap";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import axios from 'axios';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
//import Airports from '/airports.js'
import Autocomplete from '@mui/material/Autocomplete';
import { Component, useState,useEffect,useParams } from 'react';
import { Container , AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { textAlign } from '@mui/system';
import Paper from '@mui/material/Paper';
import  IconButton  from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MainScreen from "../../components/MainScreen";
import StripeCheckout from "react-stripe-checkout";
import "./payment.css"

import * as location from "../../1055-world-locations.json";
import * as success from "../../1127-success.json";
import * as fail from "../../56947-icon-failed.json";
import Lottie from "react-lottie";


const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions3 = {
  loop: true,
  autoplay: true,
  animationData: fail.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const colorG = "#3ABC5E";
const colorR = "#B2243C";

//import TextField from '@material-ui/core/TextField';
//import createFlight from '../'
export default function CreateFlight({history}) {
    const [flight1,setFlight1]= useState({});
    const [flight2,setFlight2]= useState({});
    const [paymentInfo,setPaymentInfo]= useState([]);
    const [amountPay,setAmount]= useState(0);

    const [id,setId]=useState(null);
    const userInfo  = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
    useEffect(() => {
      setProcessing(true);
      if(!userInfo){
        history.push("/homepage")
      }
      try{
        
        setPaymentInfo(JSON.parse(sessionStorage.getItem("payment")))
        setAmount(JSON.parse(sessionStorage.getItem("amount")));
        setFlight1(JSON.parse(sessionStorage.getItem("bookFlights")).flight1)
        setFlight2(JSON.parse(sessionStorage.getItem("bookFlights")).flight2)
        const x = sessionStorage.getItem("editFlightsClient");
        if(x){
            setId(JSON.parse(sessionStorage.getItem("editFlightsClient")).Id);
        }
        setTimeout(() => {
          setProcessing(false);
        }, 1500);
      }
    
    catch(err){
      history.push("/homepage")

    }


        
    },[])

    


    const makePayment = token => {
      setloading(true);
      setConfirm(false);
      setOption(defaultOptions1);
     
        const config = {
            headers:{
              "Content-type":"application/json",
              Authorization: `Bearer ${userInfo.token}`

            }
          }
        const body = {
          token
        };
        const headers = {
          "Content-Type": "application/json"
        };

        axios.post("http://localhost:8000/flights/payment",body,config) .then(response => {
              const { status } = response;
              bookSeatsCon();
             
            })
            .catch(error => {
              setOption(defaultOptions3);
              setMessage("Error , please try again later");
              setmessageColor(colorR);
              setTimeout(() => {
                setloading(false);
                setOption(defaultOptions1);
                
              }, 3000);

            });

      };

      const bookSeatsCon =async () =>{
        
   
          try{
              //Authorization: `Bearer ${userInfo.token}`
              const config = {
                headers:{
                  "Content-type":"application/json",
                  Authorization: `Bearer ${userInfo.token}`
    
                }
              }
              if(id){
                await axios.delete(`http://localhost:8000/flights/cancelBooking/${id}`,config);
              }
          
              const booking1 = await axios.post('http://localhost:8000/flights/book',flight1,config);
              if(!id){
              const booking2 = await axios.post('http://localhost:8000/flights/book',flight2,config);
              }

              
          
          }
          catch(error){
            setOption(defaultOptions3);
            setMessage("Error , please try again later");
            setmessageColor(colorR);
            setTimeout(() => {
              setloading(false);
              setOption(defaultOptions1);
              
            }, 3000);
            history.push('/homePage');
          }


          setOption(defaultOptions2);
          setMessage("Your Reservation has been completed  successfully");
          setmessageColor(colorG);
          setTimeout(() => {
            setloading(false);
            setOption(defaultOptions1);
            history.push('/homePage');
          }, 3000);
          
  
  
     }
     const [processing, setProcessing] = useState(false);

     const [loading, setloading] = useState(false);
   
     const [confirm,setConfirm] = useState(false);
   
     const [option,setOption]= useState(defaultOptions1);
     const [message,setMessage]= useState("");
     const [messageColor,setmessageColor]=useState("#3ABC5E");
    return (
        
        <>
        <div>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
        rel="stylesheet"
      />
        <div className="TicketContainer">
        {!processing ? (        
          <>
          {id?
          (         
          <div className="progresssss">
          <button  className="progressButtonnnn" onClick={()=>history.push("/searchNewFlight")}>Search</button>
          <div className="progressbarrrr1" ></div>
          <button className="progressButtonnnn1" onClick={()=>history.push("/changeDpFlight")}>Flights</button>
          <div className="progressbarrrr2"></div>
          <button className="progressButtonnnn2" onClick={()=>history.push("/bookDp")} >seats</button>
          <div className="progressbarrrr3"></div>
          <button disabled className="progressButtonnnn3">Payment</button>
          </div>
          ):(
                     <div className="progresssss">
                     <button className="progressButtonnnn" onClick={()=>history.push("/search")}>Search</button>
                     <div className="progressbarrrr1" ></div>
                     <button className="progressButtonnnn1" onClick={()=>history.push("/show")}>Flights</button>
                     <div className="progressbarrrr2"></div>
                     <button className="progressButtonnnn2" onClick={()=>history.push("/book")} >seats</button>
                     <div className="progressbarrrr3"></div>
                     <button disabled className="progressButtonnnn3">Payment</button>
                     </div>
          )}

        <div className="TicketSubContainer1">
        <Card className="Ticketcard" sx={{ m: 3 }}>
         <h3 className="TicketHead">Payment  Info</h3>
         <CardContent>
         <TableContainer component={Paper} className="tableContainer1">
         <Table>
         <TableHead>
         {paymentInfo.map((payment,key) => (
                    <TableRow>
                    <TableCell className="TableCell" align="left"><h5>{payment.s}</h5></TableCell>
                    <TableCell className="TableCell" align="left"><h5>{payment.n}</h5></TableCell>
                </TableRow>


        ))}
                <TableRow>

        </TableRow>
            
        </TableHead >

        </Table>
        </TableContainer>
        </CardContent> 
        
        </Card>
        
        </div>
        
        <StripeCheckout
            stripeKey="pk_test_51K8TPLHG9DEEaFkHJfY1B91ETxQykw5Escd7jvXXrWB0iP17P0n9OPVdHcESNe9Mhf0jiLWYt88hB9qIhSSllYyR00R0wEHU43"
            token={makePayment}
            name="Pay for Mafya"
            amount={amountPay*100}
          >
            
            <Button 
            className="loginbutton"
            style={{ marginTop: "-30px", marginBottom: "20px" }}
             > Pay </Button>
            
             
             
          </StripeCheckout>
          
        </>):(<></>)}


        <>
        {processing ? (
          <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"16%",}} >               <>
            <Lottie options={defaultOptions1} height={200} width={200} />

               </>
                
           
              </div>
          ) : (<></> )}
       </>

       <>
    {loading ? (
      <>
        <div style={{width:"1519px",height:id?("691px"):("955px"),backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"20%",}}>
        </div>
        <div  style={{width:"1519px",height:id?("691px"):("955px"),position:'absolute',top:"50px",paddingTop:"16%",}} >
            <Lottie options={option} height={200} width={200} />
            
            <h2 style={{color:messageColor,left :"670px" ,textAlign:'center'}}>{message}</h2>
            
        </div>
          </>
      ) : (<></>
      )}
    </>

       </div>
        </div>
        </>

    );










}