import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Inbox from "./InBox";
import {HashRouter as Router}  from "react-router-dom";
import Login from "./Login";
// import '../preload'

import './style.css';

function App() {
  return (
    <>
    <Router>
      {/* <h1>My App</h1> */}
      <h2>
      {/* <button type="button" onClick={() => {
     api.notificationApi.sendNotification('my message')
      // ipcRenderer.send('ss','HIIIIII messages')
    }}>Show Msg</button> */}
      </h2>
       <Routes>
             {/* <Route exact path='/' element={<Home />} /> */}
             <Route exact path='/' element={<Login />} />  
           <Route path='/inbox' element={<Inbox />} />
           {/* <Route path='/login' element={<Login />} /> */}
         </Routes>
         </Router>
    </>
  );
}

export default App;
