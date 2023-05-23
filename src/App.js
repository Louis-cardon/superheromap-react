import React from "react";
import Navbar from  "./Components/Navbar";
import './App.css';
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar/>} />
    </Routes>
  );
}

export default App;
