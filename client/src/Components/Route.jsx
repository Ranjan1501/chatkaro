import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Signup from "../pages/Register/Signup";
import Signin from "../pages/Register/Signin";
import MainContainer from "./MainContainer";

export function RoutePages() {

  return (

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/chat" element={<MainContainer />}>
      </Route>

    </Routes>
  );
}
