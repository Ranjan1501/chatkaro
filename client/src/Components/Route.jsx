import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// import { Home, Signin, Signup, Chat } from "./pages";
import Home from "../pages/Home/Home";
// import { Chat } from "../pages/Chat/Chat";
// import { Signin } from "../pages/Register/Signin";
import Signup from "../pages/Register/Signup";
import Signin from "../pages/Register/Signin";
import MainContainer from "./MainContainer";

// import { IsUserRedirect, ProtectedRoute } from "./helpers/protectedRoutes";

// import UserProvider from "./context/userContext";

export function RoutePages() {
  //   const [user, setUser] = useState(
  //     JSON.parse(localStorage.getItem("authUser"))
  //   );

  return (
    // <UserProvider data={{ user, setUser }}>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/chat" element={<MainContainer />}>
        {" "}
      </Route>
      {/* <Route
          path="/" component={Home} />

          {/* <IsUserRedirect */}
      {/* exact
            user={user}
            loggedInPath={"/chat"}
            path={"/signin"}
          ></Route> */}
      {/* <Signin /> */}
      {/* </IsUserRedirect> */}

      {/* <IsUserRedirect user={user} loggedInPath={"/chat"} path={"/signup"}>
            <Signup />
          </IsUserRedirect>

          <ProtectedRoute user={user} path={"/chat"}>
            <Chat />
          </ProtectedRoute>
        </Route>  */}
    </Routes>
    // </UserProvider>
  );
}
