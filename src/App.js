import React from "react";
import Navbar from  "./Components/Navbar";
import IncListing from  "./Components/IncListing";
import './App.css';
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navbar/>} />
        <Route path="/Incident" element={<IncListing/>} />
      </Routes>
    </div>
  );
}

export default App;
