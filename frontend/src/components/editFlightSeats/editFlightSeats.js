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
import "./editFlightSeats.css"
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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  

 
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function CreateFlight({history}) {
  const theme = useTheme();



  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const[DseatsF,setDseatsF]=useState([]);
  const[DseatsB,setDseatsB]=useState([]);
  const[DseatsE,setDseatsE]=useState([]);
  const[DseatsFR,setDseatsFR]=useState([]);
  const[DseatsBR,setDseatsBR]=useState([]);
  const[DseatsER,setDseatsER]=useState([]);




  useEffect(() => {
    if(!userInfo){
      history.push("/homepage");
    }
    

    var firstId = JSON.parse(sessionStorage.getItem("editSeats")).flightId;




    axios.get(`http://localhost:8000/flights/bookFlights/${firstId}`).then((res)=>{
    
      setFlight1({
        
        clientId:userInfo?userInfo._id:'',
        id:JSON.parse(sessionStorage.getItem("editSeats"))._id,
        flightId:firstId,
        Flight_No:res.data.Flight_No,
        From:res.data.From,
        To:res.data.To,
        DateD:res.data.DateD,
        DateA:res.data.DateA,
        FirstNumberOfSeats:JSON.parse(sessionStorage.getItem("editSeats")).FirstNumberOfSeats,
        BusinessNumberOfSeats:JSON.parse(sessionStorage.getItem("editSeats")).BusinessNumberOfSeats,
        EconomyNumberOfSeats:JSON.parse(sessionStorage.getItem("editSeats")).EconomyNumberOfSeats,
        FirstSeatsNumbers:[],
        BusinessSeatsNumbers :[],
        EconomySeatsNumbers : [],
        TotalPrice:JSON.parse(sessionStorage.getItem("editSeats")).TotalPrice,
        TotalBaggageAlowance:JSON.parse(sessionStorage.getItem("editSeats")).TotalBaggageAlowance,
        NumberOfChildren:JSON.parse(sessionStorage.getItem("editSeats")).children
      })
    

    //setFlight1(JSON.parse(sessionStorage.getItem("editSeats"))) ;



    setDseatsF(combine(JSON.parse(sessionStorage.getItem("editSeats")).FirstSeatsNumbers,res.data.FirstSeatsNumbers))
    setDseatsB(combine(JSON.parse(sessionStorage.getItem("editSeats")).BusinessSeatsNumbers,res.data.BusinessSeatsNumbers))
    setDseatsE(combine(JSON.parse(sessionStorage.getItem("editSeats")).EconomySeatsNumbers,res.data.EconomySeatsNumbers))
    setDseatsFR(res.data.ReservedFirstSeatsNumbers)
    setDseatsBR(res.data.ReservedBusinessSeatsNumbers)
    setDseatsER(res.data.ReservedEconomySeatsNumbers)
    
      
      
    
    })

        
        
  },[]);

  const [flight1, setFlight1] = useState({
    id:"",
    clientId: "",
    flightId: "",
    Flight_No: "",
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstNumberOfSeats: "0",
    BusinessNumberOfSeats: "0",
    EconomyNumberOfSeats: "0",
    FirstSeatsNumbers: [],
    BusinessSeatsNumbers: [],
    EconomySeatsNumbers: [],
    totalPrice: "0",
    TotalBaggageAlowance: "0",
    NumberOfChildren: "0",
  });
  const combine =(x,y)=>{
    let temp = [];
    for(let i = 0 ; i<x.length;i++){
      temp.push(x[i]);
    }

    for(let i = 0 ; i<y.length;i++){
      temp.push(y[i]);
    }

    return temp;

  }
        
 






    const bookSeats = () =>{
      
      setErrorMessage(null);
      if(userInfo){
        if(flight1.FirstSeatsNumbers.length==flight1.FirstNumberOfSeats && flight1.BusinessSeatsNumbers.length==flight1.BusinessNumberOfSeats && flight1.EconomySeatsNumbers.length==flight1.EconomyNumberOfSeats){

          bookSeatsCon();
        }
        else{
          setErrorMessage("Invalid seats Numbers");
        }
         

      }
      else{
   
        history.push("/homepage")

      }
    
    }

    const bookSeatsCon =async () =>{
      setloading(true);
      setConfirm(false);
      setOption(defaultOptions1);
       ///
       let AvlF = [];
       let AvlB = [];
       let AvlE = [];
       let AvlFR = [];
       let AvlBR = [];
       let AvlER = [];
       for(let i = 0 ; i<DseatsF.length;i++){
         if(!flight1.FirstSeatsNumbers.includes(DseatsF[i])){
           AvlF.push(DseatsF[i]);
         }
       }
       for(let i = 0 ; i<DseatsB.length;i++){
        if(!flight1.BusinessSeatsNumbers.includes(DseatsB[i])){
          AvlB.push(DseatsB[i]);
        }
      }
      for(let i = 0 ; i<DseatsE.length;i++){
        if(!flight1.EconomySeatsNumbers.includes(DseatsE[i])){
          AvlE.push(DseatsE[i]);
        }
      }

      for(let i = 0 ; i<DseatsFR.length;i++){
        if(!AvlF.includes(DseatsFR[i])){
          AvlFR.push(DseatsFR[i]);
        }
      }
      for(let i = 0 ; i<flight1.FirstSeatsNumbers;i++){
        if(!AvlFR.includes(flight1.FirstSeatsNumbers[i])){
          AvlFR.push(flight1.FirstSeatsNumbers[i])
        }
      }

      for(let i = 0 ; i<DseatsBR.length;i++){
        if(!AvlB.includes(DseatsBR[i])){
          AvlBR.push(DseatsBR[i]);
        }
      }
      for(let i = 0 ; i<flight1.BusinessSeatsNumbers;i++){
        if(!AvlBR.includes(flight1.BusinessSeatsNumbers[i])){
          AvlBR.push(flight1.BusinessSeatsNumbers[i])
        }
      }
      for(let i = 0 ; i<DseatsER.length;i++){
        if(!AvlE.includes(DseatsER[i])){
          AvlER.push(DseatsER[i]);
        }
      }
      for(let i = 0 ; i<flight1.EconomySeatsNumbers;i++){
        if(!AvlER.includes(flight1.EconomySeatsNumbers[i])){
          AvlER.push(flight1.EconomySeatsNumbers[i])
        }
      }


      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization: `Bearer ${userInfo.token}`

        }
      }
      const body ={BId:flight1.id,BN:{FirstSeatsNumbers:flight1.FirstSeatsNumbers,BusinessSeatsNumbers:flight1.BusinessSeatsNumbers,EconomySeatsNumbers:flight1.EconomySeatsNumbers},
                   FId:flight1.flightId,FN:{FirstSeatsNumbers:AvlF,BusinessSeatsNumbers:AvlB,EconomySeatsNumbers:AvlE,ReservedFirstSeatsNumbers:AvlFR,ReservedBusinessSeatsNumbers:AvlBR,ReservedEconomySeatsNumbers:AvlER}}
      const res = await axios.post("http://localhost:8000/flights//editSeatsNumber",body,config);
      if(res.data==="ok"){
        //'
        setOption(defaultOptions2);
        setMessage("Seats Changed Successfully");
        setmessageColor(colorG);
        setTimeout(() => {
          setloading(false);
          setOption(defaultOptions1);
          setMessage(null);
          history.push("/myflights");
        }, 3000);



       }
       else{
        setOption(defaultOptions3);
        setMessage("Error , Please Try again later");
        setmessageColor(colorR);
        setTimeout(() => {
          setloading(false);
          setOption(defaultOptions1);
          setMessage(null);
          
        }, 3000);


       }

      

      

   }

   const handleChange = (event,x,y) => {
    const {
      target: { value },
    } = event;

    return typeof value.length === 'string' ? (value.split(',').length>y?x: value.split(',')): (value.length>y?x:value)

  };

  const [errorMessage,setErrorMessage] = useState();
 
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
     {!processing ?( 
       <>  
        <div className="TicketSubContainer1">
          <Card className="Ticketcard" sx={{ m: 3 }}>
            <h3 className="TicketHead">Mafya Air Ticket</h3>
            <CardContent>
              <TableContainer component={Paper} className="tableContainer1">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" className="TableCell">
                        FlightNo :{" "}
                        <span style={{ color: "black" }}>
                          {flight1.Flight_No}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="TableCell">
                        Total Price :{" "}
                        <span style={{ color: "black" }}>
                          {" "}
                          {flight1.TotalPrice} $
                        </span>
                      </TableCell>
                      <TableCell align="left" className="TableCell">
                        {" "}
                        Total Baggage Alowance :{" "}
                        <span style={{ color: "black" }}>
                          {flight1.TotalBaggageAlowance}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="TableCell">
                        From :{" "}
                        <span style={{ color: "black" }}>{flight1.From}</span>
                      </TableCell>
                      <TableCell className="TableCell">
                        To :{" "}
                        <span style={{ color: "black" }}>{flight1.To}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="TableCell">
                        Departure Time :{" "}
                        <span style={{ color: "black" }}>
                          {departureHour(flight1.DateD)}{" "}
                        </span>
                      </TableCell>
                      <TableCell className="TableCell" align="left">
                        Arrival Time :{" "}
                        <span style={{ color: "black" }}>
                          {departureHour(flight1.DateA)}
                        </span>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="TableCell">
                        Departure Day :{" "}
                        <span style={{ color: "black" }}>
                          {departureDay(flight1.DateD)}
                        </span>
                      </TableCell>
                      <TableCell className="TableCell" align="left">
                        Arrival Day :{" "}
                        <span style={{ color: "black" }}>
                          {departureDay(flight1.DateA)}
                        </span>
                      </TableCell>
                      <TableCell
                        className="TableCell"
                        align="right"
                      ></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="TableCell">
                        <h5>First Class Seats Number</h5>
                      </TableCell>
                      <TableCell className="TableCell">
                        <div>
                          <FormControl className="ddList">
                            <InputLabel id="demo-multiple-name-label">
                              Select Seats
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              value={flight1.FirstSeatsNumbers}
                              onChange={(event) => {
                                setFlight1({
                                  ...flight1,
                                  FirstSeatsNumbers: handleChange(
                                    event,
                                    flight1.FirstSeatsNumbers,
                                    flight1.FirstNumberOfSeats
                                  ),
                                });
                              }}
                              input={<OutlinedInput label="Select Seats" />}
                              MenuProps={MenuProps}
                            >
                              {DseatsF.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(
                                    name,
                                    flight1.FirstSeatsNumbers,
                                    theme
                                  )}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="TableCell">
                        <h5>Business Seats Number</h5>
                      </TableCell>
                      <TableCell className="TableCell">
                        <div>
                          <FormControl className="ddList">
                            <InputLabel id="demo-multiple-name-label">
                              Select Seats
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              value={flight1.BusinessSeatsNumbers}
                              onChange={(event) => {
                                setFlight1({
                                  ...flight1,
                                  BusinessSeatsNumbers: handleChange(
                                    event,
                                    flight1.BusinessSeatsNumbers,
                                    flight1.BusinessNumberOfSeats
                                  ),
                                });
                              }}
                              input={<OutlinedInput label="Select Seats" />}
                              MenuProps={MenuProps}
                            >
                              {DseatsB.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(
                                    name,
                                    flight1.FirstSeatsNumbers,
                                    theme
                                  )}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="TableCell">
                        <h5>Economy Seats Number</h5>
                      </TableCell>
                      <TableCell className="TableCell">
                        <div>
                          <FormControl className="ddList">
                            <InputLabel id="demo-multiple-name-label">
                              Select Seats
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              value={flight1.EconomySeatsNumbers}
                              onChange={(event) => {
                                setFlight1({
                                  ...flight1,
                                  EconomySeatsNumbers: handleChange(
                                    event,
                                    flight1.EconomySeatsNumbers,
                                    flight1.EconomyNumberOfSeats
                                  ),
                                });
                              }}
                              input={<OutlinedInput label="Select Seats" />}
                              MenuProps={MenuProps}
                            >
                              {DseatsE.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(
                                    name,
                                    flight1.FirstSeatsNumbers,
                                    theme
                                  )}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>


        <h4 style={{color:"red",textAlign:'center',marginTop: "-30px"}}>{errorMessage}</h4>
        <Button
          className="loginbutton"
          style={{ marginBottom: "20px" }}
          onClick={bookSeats}
        >
          Update
        </Button>
        </>   ):(<></>)}


      <>
{processing ? (
       <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"16%",}} >
      <Lottie options={defaultOptions1} height={200} width={200} />

 
        
   
      </div>
  ) : (<></> )}
</>

      <>
{loading ? (
<>
<div style={{width:"1519px",height:"815px",backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"20%",}}>
</div>
<div  style={{width:"1519px",height:"815px",position:'absolute',top:"50px",paddingTop:"16%",}} >
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
function formatDate(dateVal) {
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
  
    return new Date(sYear,sMonth,sDay,sHour,sMinute ,0);
  }
 
  function departureHour(dateVal) {
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
  
    return   sHour + ":" + sMinute + " " + sAMPM;
  }
  function departureDay(dateVal) {
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
  
    return   sMonth + "/" + sDay + "/" + sYear
  }  
  
  function padValue(value) {
    return (value < 10) ? "0" + value : value;
  }

