import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import { useParams,useNavigate } from 'react-router-dom';

function SuperHeroIncident(props) {

    const params = useParams();
    console.log(params);

    
    const navigate = useNavigate();


    const [incident, setIncident] = useState(null);
    const [heroes, setHeroes] = useState([]);

    
    const LoadDetail = (id) => {
        const incData = {
            id: 0,
            superHeroId: parseInt(id),
            incidentId: parseInt(incident.id),
        };
        console.log(incData)
        fetch("https://localhost:7224/api/SuperHeroIncidents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(incData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                alert("Saved successfully.");
                navigate("/Incident");
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
      fetch("https://localhost:7224/api/Incidents/" + params.id)
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          setIncident(resp);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);

    useEffect(() => {
        fetch("https://localhost:7224/api/Incidents/Hero/" + params.id)
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);
                setHeroes(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const mapStyles = {
        width: '100%',
        height: '400px',
    };

    return (
        <div className='container mt-5'>
            <div className='card'>
                <div className='card-title m-3'>
                    <h2>Incident Hero Listing</h2>
                </div>
                <div className='map-container'>
                    {incident && (
                        <Map
                            google={props.google}
                            zoom={8}
                            style={{ width: '100%', height: '100%' }}
                            containerStyle={{ position: 'relative', width: '100%', height: '400px' }}
                            initialCenter={{ lat: incident.latitude, lng: incident.longitude }}
                        >
                            {heroes.map((hero) => (
                                <Marker key={hero.id} position={{ lat: hero.latitude, lng: hero.longitude }} />
                            ))}
                            <Circle
                                center={{ lat: incident.latitude, lng: incident.longitude }}
                                radius={50000} // 50 kilomètres
                                strokeColor="#FF0000"
                                strokeOpacity={0.8}
                                strokeWeight={2}
                                fillColor="#FF0000"
                                fillOpacity={0.35}
                            />
                        </Map>
                    )}
                </div>
                <div className='card-body m-3'>
          <table className='table table-bordered'>
            <thead className='bg-bluenav text-white'>
              <tr>
                <td>ID</td>
                <td>City Name</td>
                <td>Type</td>
              </tr>
            </thead>
            <tbody>
              {incident &&(
                  <tr key={incident.id}>
                    <td>{incident.id}</td>
                    <td>{incident.cityName}</td>
                    <td>{incident.incidentResource.type}</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
                <div className='card-body m-3'>
                    <table className='table table-bordered'>
                        <thead className=' bg-bluenav text-white'>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Phone Number</td>
                                <td>Incident Resources</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {heroes &&
                                heroes.map((item) => (
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
                                        <td>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Attach</a>
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
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(SuperHeroIncident);
