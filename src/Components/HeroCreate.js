import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SelectMulti from 'react-select';

export default function HeroCreate() {
  const [id, idChange] = useState(0);
  const [name, nameChange] = useState('');
  const [phoneNumber, phoneNumberChange] = useState('');
  const [latitude, latitudeChange] = useState(0.0);
  const [longitude, longitudeChange] = useState(0.0);

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
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
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
            console.log(item)
            return {
              id: 0,
              superHeroId: heroId,
              incidentResourceId: item.value,
            };
          });
      
          // Utilisation de mappedData
          console.log(mappedData);
          mappedData.map((heroinc)=>{
              fetch("https://localhost:7224/api/SuperHeroIncidentResources", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(heroinc),
            })
          });


          alert('Saved successfully.');
          navigate('/Hero');
        })
        .catch((err) => {
          console.log(err.message);
        });
      
};

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="card" onSubmit={handleSubmit}>
            <div className="card-title">
              <h2>Hero Create</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className=" col-lg-12">
                  <div className="form-group">
                    <label>ID</label>
                    <input value={id} disabled="disabled" className="form-control" />
                  </div>
                </div>
                <div className=" col-lg-12">
                  <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={(e) => nameChange(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className=" col-lg-12">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => phoneNumberChange(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className=" col-lg-12">
                  <div className="form-group">
                    <label>Latitude</label>
                    <input value={latitude} onChange={(e) => latitudeChange(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className=" col-lg-12">
                  <div className="form-group">
                    <label>Longitude</label>
                    <input value={longitude} onChange={(e) => longitudeChange(e.target.value)} className="form-control" />
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
                <div className=" col-lg-12 d-flex justify-content-center">
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
