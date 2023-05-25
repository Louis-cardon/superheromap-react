import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SelectMulti from 'react-select';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

function HeroCreate(props) {
  const [id, idChange] = useState(0);
  const [name, nameChange] = useState('');
  const [phoneNumber, phoneNumberChange] = useState('');
  const [place, setPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 });

  const [incidentResourceList, incidentResourceListChange] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7224/api/IncidentResources')
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

  const options = incidentResourceList.map((d) => ({
    value: d.id,
    label: d.type,
  }));

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si au moins un incident est sélectionné
    if (selectedOptions.length === 0) {
      alert('Veuillez sélectionner au moins un incident.');
      return;
    }

    const heroData = {
      id: parseInt(id),
      name: name,
      phoneNumber: phoneNumber,
      latitude: place ? place.latitude : 0,
      longitude: place ? place.longitude : 0,
    };

    console.log(heroData);
    console.log(selectedOptions);

    //Effectuer la sauvegarde
    fetch('https://localhost:7224/api/SuperHeroes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(heroData),
    })
      .then((res) => res.json()) // Conversion de la réponse en JSON
      .then((data) => {
        const heroId = data.id; // Récupération de l'ID de la réponse

        // Utilisation de l'ID dans le mappage des données
        const mappedData = selectedOptions.map((item) => {
          console.log(item);
          return {
            id: 0,
            superHeroId: heroId,
            incidentResourceId: item.value,
          };
        });

        // Utilisation de mappedData
        console.log(mappedData);
        mappedData.map((heroinc) => {
          fetch('https://localhost:7224/api/SuperHeroIncidentResources', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(heroinc),
          });
        });

        alert('Saved successfully.');
        navigate('/Hero');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form className="card my-3" onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <h2 className="text-center">Hero Create</h2>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>ID</label>
                    <input value={id} disabled className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={(e) => nameChange(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => phoneNumberChange(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Incident Resource Id</label>
                    <SelectMulti
                      options={options}
                      isMulti
                      value={selectedOptions}
                      onChange={handleChange}
                      maxMenuHeight={150} // Optional: Set the maximum height of the dropdown menu
                    />
                    <p>{`Selected Options: ${selectedOptions.length}`}</p>
                    {selectedOptions.length === 0 && <p>Veuillez sélectionner au moins un incident.</p>}
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
                      }}
                    >
                      <Marker position={mapCenter} />
                    </Map>
                  </div>            
                <div className="col-lg-12 text-center">
                  <div className="form-group">
                    <button className="btn btn-success m-1" type="submit">
                      Save
                    </button>
                    <Link to="/Hero" className="btn btn-danger m-1" type="submit">
                      Back
                    </Link>
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
})(HeroCreate);
