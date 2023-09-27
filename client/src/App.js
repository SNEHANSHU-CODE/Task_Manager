import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Task from "./components/Task";
import { MyContext } from "./components/MyContext";

function App() {
  const [id, setId] = useState("");
  return (
    <React.Fragment>
      <MyContext.Provider value={{ id, setId }}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/task" exact element={<Task />}></Route>
        </Routes>
      </MyContext.Provider>
    </React.Fragment>
  );
}

export default App;
