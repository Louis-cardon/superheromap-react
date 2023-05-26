import React, { useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';
import "../Styles/main.css"

function HeroListing(props) {
    const [herodata, setHerodata] = useState(null);

    const [selectedMarker, setSelectedMarker] = useState(null);

    const onMarkerClick = (props, marker) => {
      setSelectedMarker(marker);
      console.log('data base', marker.heroData.Data); // Affiche les données JSON dans la console
      console.log("test incident")
      if (selectedMarker) console.log('selected marker', selectedMarker.heroData);// Affiche les données JSON dans la console
  
    };
   
    const onCloseInfoWindow = () => {
      setSelectedMarker(null);
    };

    useEffect(() => {
        fetch("https://localhost:7224/api/SuperHeroes")
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);
                setHerodata(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className='container mt-5'>
            <div className='card'>
                <div className='card-title m-3'>
                    <h2>Hero Listing</h2>
                </div>
                <div className='map-container'>
                    <Map
                        google={props.google}
                        zoom={5}
                        initialCenter={{ lat: 48.8566, lng: 2.3522 }}
                        style={{ width: '100%', height: '100%' }}
                        containerStyle={{ position: 'relative', width: '100%', height: '400px' }}                        
                    >
                        {herodata &&
                            herodata.map((hero) => (
                                <Marker
                                    key={hero.id}
                                    position={{ lat: hero.latitude, lng: hero.longitude }}
                                    heroData={hero}
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
              <h3>{selectedMarker.heroData.name}</h3>
              <p>Numéro de téléphone : {selectedMarker.heroData.phoneNumber}</p>
              <h4>Ressources associées :</h4>
              <ul>
                {selectedMarker.heroData.superHeroIncidentResources.map((resource) => (
                  <li key={resource.id}>{resource.incidentResource.type}</li>
                ))}
              </ul>
              <h4>Incidents associés :</h4>
              <ul>
                {selectedMarker.heroData.superHeroIncidents.map((incident) => (
                  <li key={incident.id}>
                  {incident.incident.incidentResource.type} - Résolu : {incident.incident.isResolved ? 'Oui' : 'Non'}
                </li>
                ))}
              </ul>
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
                        <thead className=' bg-bluenav text-white'>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Phone Number</td>
                                <td>Incident Resources</td>
                            </tr>
                        </thead>
                        <tbody>
                            {herodata &&
                                herodata.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            {item.superHeroIncidentResources &&
                                                item.superHeroIncidentResources.map((resource) => (
                                                    <div key={resource.id}>{resource.incidentResource.type}</div>
                                                ))}
                                        </td>
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
})(HeroListing);
