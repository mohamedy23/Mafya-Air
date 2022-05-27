import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import clientFlight from "./components/clientFlight/clientFlight"
import bookFlight from "./components/bookFlight/bookFlight"
import showFlights from "./components/showFlight/showFlight"
import createFlight from "./components/createFlight/createFlight"
import InquiryScreen from "./screens/InquiryScreen/InquiryScreen"
import updateFlight from "./components/updateFlight/updateFlight"
import profile from "./components/editProfile/editProfile"
import InquiryFlights from "./components/InquiryFlights/clientFlight"
import AdminScreen from "./screens/AdminScreen/AdminScreen"
import myFlights from "./components/myFlights/myFlights"

import searchNewFlight from "./components/searchNewFlight/searchNewFlight"
import changeDpFlight from "./components/changeDpFlight/changeDpFlight"
import bookDp from "./components/bookDp/bookDp"

import payment from "./components/payment/payment"
import changePassword from "./screens/changePasswordScreen/changePasswordScreen"
import editFlightSeats from "./components/editFlightSeats/editFlightSeats"

import { useState } from "react";
import Button from '@mui/material/Button';
import test from "./components/test"
import emailStep from "./components/forgetPassword/emailStep"
import codeStep from "./components/forgetPassword/codeStep"
import passwordStep from "./components/forgetPassword/passwordStep"
function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">

    
      <Route path="/homepage" component={LandingPage} exact />
        <Route path="/" component={LandingPage} exact />


        <Route path="/payment" component={payment} exact />
        <Route path="/myflights" component={myFlights}  />
        <Route path="/createFlight" component={createFlight}  />
        <Route path='/updateFlight/:id' component={updateFlight } />
        <Route path='/showFlights' component={showFlights} />
        
        <Route path='/adminSearch' component={AdminScreen} />

        <Route path='/changePassword' component={changePassword} />
        <Route path='/editFlightSeats' component={editFlightSeats} />

        <Route path='/emailStep' component={emailStep} />
        <Route path='/codeStep' component={codeStep} />
        <Route path='/passwordStep' component={passwordStep} />
        
        
        <Route path="/profile" component={profile} />
        <Route path="/book" component={bookFlight} />
        <Route path="/show" component={clientFlight} />
        <Route path="/search" component={SearchScreen}  />
        <Route path="/Inquiry" component={InquiryScreen}  />
        <Route path="/showInquiry" component={InquiryFlights}  />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/searchNewFlight" component={searchNewFlight} />
        <Route path="/changeDpFlight" component={changeDpFlight} />
        <Route path="/bookDp" component={bookDp} />
      </main>
    </Router>
  );
}

export default App;
