import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar";
import { UserProvider } from "./components/context";
import Home from "./components/home";
import CreateAccount from "./components/createaccount";
import Login from "./components/login";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import AllData from "./components/alldata";
import AuthDetails from "./components/authDetails";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <NavBar />
          <AuthDetails />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/alldata" element={<AllData />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
