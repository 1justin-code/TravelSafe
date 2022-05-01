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

function exploreAirlines() {
  const [usersList, setUsersList] = useState([]);
  const [countries, setCountriesList] = useState([]);
  const [airlines, setAirlinesList] = useState([]);


  const getAirlines = () => {
    Axios.get("http://localhost:3001/airlines").then((response) => {
      setAirlinesList(response.data);
    });
  };


  return (
    <div className='App'>
      <div className='information'>
	<Button onClick={getAirlines}> SHOW AIRLINES </Button>
        {airlines.map((val, _key) => {
          return (
            <div className='airlines'>
              <h3> Airline Id: {val.airline_id} </h3>
              <h3> Airline Name: {val.airline_name} </h3>
              <h3> Mask Required: {val.mask_required} </h3>
              <h3> Vaccine Required: {val.vaccine_required} </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default exploreAirlines;
