import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "../components/ExploreHeader";
import "../App.css";

import Axios from "axios";

const Button = styled.button`
  background-color: orange;
  color: white;
  font-size: 20px;
  margin: 10px 0px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  cursor: pointer;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "10vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg5.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function ExploreCountries() {
  const [usersList, setUsersList] = useState([]);
  const [countries, setCountriesList] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [vaccineStatus, setVaccineStatus] = useState("NO");
  const [testingStatus, setTesting] = useState("NO");
  const [quarantineStatus, setQuarantine] = useState("NO");

  const classes = useStyles();
  const getCountries = () => {
    Axios.get("http://127.0.0.1/countries").then((response) => {
      setCountriesList(response.data);
    });
  };



  return (
    <div className='App'>
      <div className={classes.root}>
                <CssBaseline />
  <label>
    <input type="checkbox" onChange={(event) => setVaccineStatus(event.target.value)}/>
    		Vaccine?
  	</label>
    <label>
    		<input type="checkbox" onChange={(event) => setTesting(event.target.value)}/>
    		Testing?
  	</label>
    <label>
    		<input type="checkbox" onChange={(event) => setQuarantine(event.target.value)}/>
    		Quarantine?
  	</label>
	<div className='information'>
	<Button onClick={getCountries}> SEARCH COUNTRIES </Button>
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
  <Header />
      </div>
    </div>
  );
}

export default ExploreCountries;
