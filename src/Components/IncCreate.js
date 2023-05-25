import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function IncCreate() {
    const [id, idChange] = useState(0);
    const [incidentResourceId, incidentResourceIdChange] = useState(0);
    const [cityName, cityNameChange] = useState("");
    const [latitude, latitudeChange] = useState(0.0);
    const [longitude, longitudeChange] = useState(0.0);
    const [isResolved, isResolvedChange] = useState(false);

    const [incidentResourceList,incidentResourceListChange] = useState(null);

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

    const navigate = useNavigate();

    const handleSubmit = (e) => {
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
            .then((res) => {
                alert("Saved successfully.");
                navigate("/Incident");
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
                                <div className=' col-lg-12'>
                                    <div className='form-group'>
                                        <label>CityName</label>
                                        <input value={cityName} onChange={e => cityNameChange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className=' col-lg-12'>
                                    <div className='form-group'>
                                        <label>Latitude</label>
                                        <input value={latitude} onChange={e => latitudeChange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className=' col-lg-12'>
                                    <div className='form-group'>
                                        <label>Longitude</label>
                                        <input value={longitude} onChange={e => longitudeChange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className=' col-lg-12'>
                                    <div className='form-check'>
                                        <input value={isResolved} onChange={e => isResolvedChange(e.target.checked)} type='checkbox' className='form-check-input'></input>
                                        <label className='form-check-label'>Is Resolved</label>
                                    </div>
                                </div>
                                <div className=' col-lg-12 d-flex justify-content-center'>
                                    <div className='form-group'>
                                        <button className='btn btn-success m-1' type='submit'>Save</button>
                                        <Link to="/Incident" className='btn btn-danger m-1' type='submit'>Back</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
