import React, { useEffect, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';
import "../Styles/main.css"

function HeroListing(props) {
    const [herodata, herodatachange] = useState(null);

    useEffect(() => {
        fetch("https://localhost:7224/api/SuperHeroes")
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);
                herodatachange(resp);
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
                            herodata.map((heroident) => (
                                <Marker
                                    key={heroident.id}
                                    position={{ lat: heroident.latitude, lng: heroident.longitude }}
                                />
                            ))}
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
