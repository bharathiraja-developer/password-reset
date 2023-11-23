import React, { createContext, useState } from "react";
import SignupPage from "./components/SignupPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SigninPage from "./components/SigninPage";
import Welcome from "./components/Welcome";
import Forget from "./components/Forget";

const userContext = createContext();

function App() {
  const [register, setRegister] = useState({
    email: "",
    name: "",
    password: "",
  });
  return (
    <userContext.Provider value={{ register, setRegister }}>
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/Signin" element={<SigninPage />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/Forget" element={<Forget />} />
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export { App as default, userContext };
