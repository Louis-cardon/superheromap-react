import React, { useEffect, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';
import "../Styles/main.css"

function IncListing(props) {
  const [incdata, incdatachange] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7224/api/Incidents")
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        incdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className='container mt-5'>
    <div className='map-container'>
      <Map
        google={props.google}
        zoom={5}
        initialCenter={{ lat: 48.8566, lng: 2.3522 }}
        style={{ width: '100%', height: '100%' }}
        containerStyle={{ position: 'relative', width: '100%', height: '400px' }}
      >
        {incdata &&
          incdata.map((incident) => (
            <Marker
              key={incident.id}
              position={{ lat: incident.latitude, lng: incident.longitude }}
            />
          ))}
      </Map>
    </div>
      <div className='card'>
        <div className='card-title m-3'>
          <h2>Incident Listing</h2>
        </div>
        <div className='card-body m-3'>
          <div className='divbtn'>
            <Link to="Create" className='btn btn-success'>Add New (+)</Link>
          </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <td>ID</td>
                <td>City Name</td>
                <td>Type</td>
              </tr>
            </thead>
            <tbody>
              {incdata &&
                incdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.cityName}</td>
                    <td>{item.incidentResource.type}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(IncListing);
