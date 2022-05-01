import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "../App.css";

import Axios from "axios";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

function ExploreCountries() {
  const [usersList, setUsersList] = useState([]);
  const [countries, setCountriesList] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const getCountries = () => {
    Axios.get("http://localhost:3001/countries").then((response) => {
      setCountriesList(response.data);
    });
  };



  return (
    <div className='App'>
      <div className='information'>
	<Button onClick={getCountries}> SHOW ALL COUNTRIES IN DB </Button>
        {countries.map((val, _key) => {
          return (
            <div className='countries'>
              <h3> Country Name: {val.country_name} </h3>
              <h3> Vaccine Required: {val.vaccine_required} </h3>
              <h3> Testing Required: {val.testing_required} </h3>
              <h3> Risk Level: {val.risk_level} </h3>
              <h3> Quarantine Required: {val.quarantine_required} </h3>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default ExploreCountries;
