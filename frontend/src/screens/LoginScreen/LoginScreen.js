import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import axios from 'axios'
import TextField from '@mui/material/TextField';
import "./LoginStyles.css";
import pic from "../../login.png"
function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading]=useState(false);
  const [userInfo, setUserInfo]=useState("");
  

// if(localStorage.getItem("userInfo")){
//   history.push('/homePage');
// }





  const submitHandler = async(e) => {
    e.preventDefault();
    
    try{
      setLoading(true);
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      const {data}=await axios.post('http://localhost:8000/flights/signin',{'email':email,'password':password},config); 
     
      if(data instanceof Array){
        setLoading(false);
        setError("Invalid Email or Password")
      }
      else{
        localStorage.setItem('userInfo',JSON.stringify(data))
        setLoading(false);
        setError('')
        history.push('/homePage');
        window.location.reload();
      }


    }
    catch(err){
      setLoading(false);
      setError("Invalid Email or Password")

    }
  };

  return (
      <div className="Background">
      <div className="loginContainer" >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <img src={pic} style={{height:"200px",marginBottom:"-30px",marginTop:"-30px"}}></img>
          <Form onSubmit={submitHandler} > 
          <div className="form-group">
          <TextField 
             id="filled-basic"
             InputLabelProps={{className:"textfield__label"}}
             InputProps={{className:"textfield__input"}}
             label="Filled" variant="filled" 
            sx={{m:1 ,width: '60ch' }}
            label="Email"
              value={email}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            >
               </TextField>
               </div>
             <div className="form-group">
            <TextField 
             id="filled-basic"
             InputLabelProps={{className:"textfield__label"}}
             InputProps={{className:"textfield__input"}}
             label="Filled" variant="filled" 
            sx={{m:1,width: '60ch' }}
            label="Password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            >
           </TextField>
           </div>
           <Row className="py-3">
          <Col style={{marginTop:'-35px',marginLeft:"0px",color:"white"}}>
            <Link className="forgetPassword" to="/emailStep">Forgot Your Password?</Link>
          </Col>
        </Row>
          
            <div className="form-group">
          <Button className="loginbutton" style={{marginTop:"-20px"}}    type="submit" >
            Login
          </Button>
          {loading && <Loading />}
          </div>
        </Form  >
          
        <Row className="py-3">
          <Col style={{margin:'8px',marginTop:"-20px",color:"white"}}>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
      </div>
  );
}

export default LoginScreen;
