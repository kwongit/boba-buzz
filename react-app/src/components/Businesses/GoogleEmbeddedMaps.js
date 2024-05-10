import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import axios from "axios";

export const GoogleEmbeddedMaps = ({ address, city, state }) => {
  const [apiKey, setApiKey] = useState("");
  const location = `${address}, ${city}, ${state}`;

  useEffect(() => {
    axios
      .get("/api/get_api_key")
      .then((response) => {
        setApiKey(response.data.api_key);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const mapURL = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}`;

  return (
    <div>
      <Iframe
        url={mapURL}
        // width="600px"
        // height="450px"
        width="100%"
        height="100%"
        display="initial"
        position="relative"
      />
    </div>
  );
};
