import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleApiWrapper } from "google-maps-react";
import Navbar from "./Components/Navbar";
import IncListing from "./Components/IncListing";
import IncCreate from "./Components/IncCreate";
import HeroListing from "./Components/HeroListing";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/"/>
        <Route path="/Incident" element={<IncListing />} />
        <Route path="/Incident/Create" element={<IncCreate />} />
        <Route path="/Hero" element={<HeroListing />} />
      </Routes>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(App);
