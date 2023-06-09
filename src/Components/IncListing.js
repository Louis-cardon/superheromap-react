import React, { useEffect, useState } from 'react';
import { Map, Marker,InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/main.css"

function IncListing(props) {
  const [incdata, incdatachange] = useState(null);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMarkerClick = (props, marker) => {
    setSelectedMarker(marker);
    console.log('data base', marker.incidentData); // Affiche les données JSON dans la console
    console.log("test incident")
    if (selectedMarker) console.log('selected marker', selectedMarker.incidentData.incidentResource);// Affiche les données JSON dans la console

  };
 
  const onCloseInfoWindow = () => {
    setSelectedMarker(null);
  };

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
      <div className='card'>
        <div className='card-title m-3'>
          <h2>Incident Listing</h2>
        </div>
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
              incidentData={incident}
              onClick={onMarkerClick}
            />
          ))}

{selectedMarker && (
          <InfoWindow
            marker={selectedMarker}
            visible={true}
            onClose={onCloseInfoWindow}
          >
            <div>
              <h3>{selectedMarker.incidentData.cityName}</h3>
              {<p>Type d'incident : {selectedMarker.incidentData.incidentResource && selectedMarker.incidentData.incidentResource.type}</p>}
              <p>Résolu : {selectedMarker.incidentData.isResolved ? 'Oui' : 'Non'}</p>
              <a href={'/Incident/'+ selectedMarker.incidentData.id} className="btn btn-primary">View</a>
            </div>
          </InfoWindow>
        )}
      </Map>
        </div>
        <div className='card-body m-3'>
          <div className='divbtn'>
            <Link to="Create" className='btn btn-success my-1'>Add New (+)</Link>
          </div>
          <table className='table table-bordered'>
            <thead className='bg-bluenav text-white'>
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
