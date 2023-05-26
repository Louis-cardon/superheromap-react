import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

function IncCreate(props) {
    const [id, idChange] = useState(0);
    const [incidentResourceId, incidentResourceIdChange] = useState(0);
    const [cityName, cityNameChange] = useState("");
    const [latitude, latitudeChange] = useState(0.0);
    const [longitude, longitudeChange] = useState(0.0);
    const [isResolved, isResolvedChange] = useState(false);
    const [place, setPlace] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 });

    const [incidentResourceList, incidentResourceListChange] = useState(null);

    useEffect(() => {
        fetch("https://localhost:7224/api/IncidentResources")
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);
                incidentResourceListChange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch("https://localhost:7224/api/IncidentResources")
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);
                incidentResourceListChange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    
        // Fetch city name when component mounts
        fetchPlaceInfo(mapCenter.lat, mapCenter.lng);
    }, []);

    const navigate = useNavigate();

    // Extract city name from place result
    const extractCityName = (results) => {
        if (!results[0]) return; // Check if results[0] exists before accessing it

        for (let i = 0; i < results[0].address_components.length; i++) {
            for (let j = 0; j < results[0].address_components[i].types.length; j++) {
                if (results[0].address_components[i].types[j] === "locality") {
                    return results[0].address_components[i].long_name;
                }
            }
        }
    };


    // Fetch place info
    const fetchPlaceInfo = async (latitude, longitude) => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        console.log(response);
        const data = await response.json();

        if (!data.results) return; // Check if data.results exists before accessing it

        const cityName = extractCityName(data.results);
        console.log(cityName);
        cityNameChange(cityName);
        latitudeChange(latitude);
        longitudeChange(longitude);
    };

    const handleSubmit = (e) => {
        console.log(cityName);
        e.preventDefault();
        const incData = {
            id: parseInt(id),
            incidentResourceId: parseInt(incidentResourceId),
            cityName: cityName,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            isResolved: isResolved,
        };

        console.log(incData);
        fetch("https://localhost:7224/api/Incidents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(incData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                alert("Saved successfully.");
                navigate("/Incident/"+ res.id);
            })
            .catch((err) => {
                console.log(err.message);
            });

    };

    return (
        <div>
            <div className='row'>
                <div className='offset-lg-3 col-lg-6'>
                    <form className='card' onSubmit={handleSubmit}>
                        <div className='card-title'>
                            <h2>Incident Create</h2>
                        </div>
                        <div className='card-body'>
                            <div className='row'>

                                <div className=' col-lg-12'>
                                    <div className='form-group'>
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Incident Resource Id</label>
                                        <select
                                            value={incidentResourceId}
                                            onChange={e => incidentResourceIdChange(e.target.value)}
                                            className='form-control'
                                        >
                                            <option value=''>Sélectionnez un ID</option>
                                            {incidentResourceList && incidentResourceList.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='map-container' style={{ width: '100%', overflow: 'hidden' }}>
                                    <Map
                                        google={props.google}
                                        zoom={6}
                                        style={{ width: '100%', height: '100%' }}
                                        containerStyle={{ position: 'relative', width: '100%', height: '300px' }}
                                        initialCenter={{ lat: 48.8566, lng: 2.3522 }}
                                        center={mapCenter}
                                        onClick={(_, __, coords) => {
                                            const latitude = coords.latLng.lat();
                                            const longitude = coords.latLng.lng();
                                            setMapCenter({ lat: latitude, lng: longitude });
                                            setPlace({ latitude: latitude, longitude: longitude });
                                            fetchPlaceInfo(latitude, longitude); // Fetch city name when map is clicked
                                        }}
                                    >
                                        <Marker position={mapCenter} />
                                    </Map>
                                </div>
                                <div className=' col-lg-12'>
                                    <div className='form-check'>
                                        <input value={isResolved} onChange={e => isResolvedChange(e.target.checked)} type='checkbox' className='form-check-input'></input>
                                        <label className='form-check-label'>Is Resolved</label>
                                    </div>
                                </div>
                                <div className=' col-lg-12 d-flex justify-content-center'>
                                    <div className='form-group'>
                                        <button className='btn btn-success m-1' type='submit' disabled={!incidentResourceId || incidentResourceId === 0} >
                                            Save
                                        </button>
                                        <Link to="/Incident" className='btn btn-danger m-1' type='submit'>Back</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(IncCreate);
