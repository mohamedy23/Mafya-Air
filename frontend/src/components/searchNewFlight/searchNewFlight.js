import  React  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Form, Button, Row, Col } from "react-bootstrap";
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
import MainScreen from "../../components/MainScreen";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "./InquiryScreen.css";


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
export default function CreateFlight(props) {

  const theme = useTheme();
  const history = props.history;

  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;



  const [flight,setFlight]= useState({
    From:'',
    To:'',
    DateD:'',
    FirstNumberOfSeats:0,
    BusinessNumberOfSeats:0,
    EconomyNumberOfSeats:0,
    children:0,
  });
  useEffect(() => {
    if(!userInfo){
      history.push("/homepage")
    }
    setFlight({
        From:JSON.parse(sessionStorage.getItem("editFlightsClient")).From,
        To:JSON.parse(sessionStorage.getItem("editFlightsClient")).To,
        DateD:JSON.parse(sessionStorage.getItem("editFlightsClient")).DateD,
        FirstNumberOfSeats:JSON.parse(sessionStorage.getItem("editFlightsClient")).FirstNumberOfSeats,
        BusinessNumberOfSeats:JSON.parse(sessionStorage.getItem("editFlightsClient")).BusinessNumberOfSeats,
        EconomyNumberOfSeats:JSON.parse(sessionStorage.getItem("editFlightsClient")).EconomyNumberOfSeats,
        children:JSON.parse(sessionStorage.getItem("editFlightsClient")).children,

    })
     
  },[]);
  const search=(flight)=>{
    ///// valid dates

    if (
        (new Date(flight.DateD).getFullYear()>new Date().getFullYear()||new Date(flight.DateD).getDate()>=new Date().getDate())
    ) {

    
    if (
      parseInt(flight.FirstNumberOfSeats) +
      parseInt(flight.BusinessNumberOfSeats) +
      parseInt(flight.EconomyNumberOfSeats) >
        0 &&
      parseInt(flight.FirstNumberOfSeats) +
      parseInt(flight.BusinessNumberOfSeats) +
      parseInt(flight.EconomyNumberOfSeats) >
      parseInt(flight.children)){
        sessionStorage.setItem('changeDpFlight',JSON.stringify(flight))
        history.push("/changeDpFlight");
      }
      else{
        setErrorMessage("invalid seats Numbers");
      }
    }
    else{
      setErrorMessage("Invalid Date")
    }
    
   


  }
  const [errorMessage,setErrorMessage] = useState();

  const[DseatsF,setDseatsF]=useState([]);
  const[DseatsB,setDseatsB]=useState([]);
  const[DseatsE,setDseatsE]=useState([]);

  const[DseatsFR,setDseatsFR]=useState([]);
  const[DseatsBR,setDseatsBR]=useState([]);
  const[DseatsER,setDseatsER]=useState([]);

        


    const handleDiff=()=>{
      diffSets(flight.FirstSeatsNumbers,DseatsF);
      diffSets(flight.ReservedFirstSeatsNumbers,DseatsFR);
      diffSets(flight.BusinessSeatsNumbers,DseatsB);
      diffSets(flight.ReservedBusinessSeatsNumbers,DseatsBR);
      diffSets(flight.EconomySeatsNumbers,DseatsE);
      diffSets(flight.ReservedEconomySeatsNumbers,DseatsER);

    }

    const diffSets=(arr1,arr2)=>{
      let n = arr2.length;
        let i = 0;
        for (i = 0; i < n; i++) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    
        return arr1;

    }


  return (
  

    
      <>
          <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
        rel="stylesheet"
      />
          <div className="inquiryMain" style={{ flexDirection: "column" }}>
      <div className="progress">
        <button disabled className="progressButton">Search</button>
        <div   className="progressbar1"></div>
        <button disabled className="progressButton1">Flights</button>
        <div className="progressbar2"></div>
        <button disabled className="progressButton2">seats</button>
        <div className="progressbar3"></div>
        <button disabled className="progressButton3">Payment</button>
      </div>
      <div className="reservationContainer">
       <div className="searchSubContainer">
     
          <h3
            className="heading"
            style={{ paddingLeft: "13px", color: "#3c5977" }}
          >
            Search for a Flight
          </h3>
    

      
      <Form >
      <div className="form-group">
       <TextField 
       id="filled-basic"
       InputLabelProps={{ className: "textfield_label" }}
       InputProps={{ className: "textfield_input" }}
       variant="filled"
       sx={{ m: 2, width: "60ch" }}
        label="From"  value={flight.From}  />

      <TextField id="filled-basic"
        InputLabelProps={{ className: "textfield_label" }}
        InputProps={{ className: "textfield_input" }}
        variant="filled"
        sx={{ m: 2, width: "60ch" }} 
        label="To"
        value={flight.To}  /> 
     </div>
     <div className="form-group">
        <TextField 
                 id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled" 
                type="Number"
                sx={{ m: 2, width: "38.5ch" }} 
                label="FirstNumberOfSeats"
                required
                value={flight.FirstNumberOfSeats} 
                onChange={(event) =>{
          setFlight({...flight, FirstNumberOfSeats:event.target.value})
      }} />
      <TextField 
               id="filled-basic"
               InputLabelProps={{ className: "textfield_label" }}
               InputProps={{ className: "textfield_input" }}
               label="Filled"
               variant="filled" 
               type="Number"
               sx={{ m: 2, width: "38.5ch" }} 
               required
               label="BusinessNumberOfSeats" 
               value={flight.BusinessNumberOfSeats} 
               onChange={(event) =>{
              setFlight({...flight, BusinessNumberOfSeats:event.target.value})
      }} />
      <TextField 
              id="filled-basic"
              InputLabelProps={{ className: "textfield_label" }}
              InputProps={{ className: "textfield_input" }}
              label="Filled"
              variant="filled" 
              type="Number"
              sx={{ m: 2, width: "38.5ch" }} 
              required 
              label="EconomyNumberOfSeats" 
              value={flight.EconomyNumberOfSeats} 
              onChange={(event) =>{
          setFlight({...flight, EconomyNumberOfSeats:event.target.value})
      }} />
      </div>

      <div className="form-group">
      
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
         renderInput={(props) => (
                <TextField
                    id="filled-basic"
                    InputLabelProps={{ className: "textfield_label" }}
                      InputProps={{ className: "textfield_inputDate" }}
                          label="Filled"
                      variant="filled"
                      required
                        {...props}
                         sx={{ m: 2, width: "60ch" }}
                    />
                   )}
        label="Departure Date"
        value={flight.DateD}
        onChange={(newValue) =>{
          setFlight({...flight, DateD:newValue})
      }} 
      />
    </LocalizationProvider>
    <TextField
      id="filled-basic"
      InputLabelProps={{ className: "textfield_label" }}
      InputProps={{ className: "textfield_input" }}
      label="Filled"
      variant="filled" 
      type="Number"
      sx={{ m: 2, width: "60ch" }} 
      required 
      label="numberOfChildern"  
      value={flight.children} onChange={(event) =>{
          setFlight({...flight, children:event.target.value})
      }} />
      </div>
   
   


      
    
      <div className="form-group">
      <h4 style={{color:"red",textAlign:'center'}}>{errorMessage}</h4>
      <Button 
      className="inquirybutton"
      
      onClick={()=> search(flight)}>
        Search</Button>
    
       </div>
    
 
   
    
      </Form>
      </div>
      </div>
      </div>
      </div>
    </>

    


  );
  
}