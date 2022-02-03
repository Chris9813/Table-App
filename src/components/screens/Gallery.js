import axios from "axios";
import React, { useEffect, useState } from "react";

export const Gallery = () => {
  const [photos, setPhotos] = useState("");
  const [clientId, setClientId] = useState(
    "ckZ3lVeMbGftEB1tWsawPBib-zEvV8facfVdHxELq8E"
  );
  const [result, setResult] = useState([]);

  const handleInputChange = (e) => {
    setPhotos(e.target.value);
  };

  const getData = async () => {
    const baseurl = `https://api.unsplash.com/search/photos/?query=${photos}&client_id=${clientId}`;
    axios.get(baseurl).then((reponse) => {
      setResult(reponse.data.results);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(photos);
  };

  return (
    <div>
      <section className="container">
        <h1>Unsplash Gallery</h1>
        <input
          onChange={handleInputChange}
          type="text"
          name="photo"
          placeholder="Search for Photos"
        />
        <button onClick={handleSubmit}>search</button>
      </section>
      <br />
      {result.map((item, i) => (
        <img
          key={i}
          className="img-thumbnail rounded mx-auto d-block my-3"
          src={item.urls.small}
        />
      ))}
    </div>
  );
};
