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
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/island2.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function exploreAirlines() {
  const [usersList, setUsersList] = useState([]);
  const [countries, setCountriesList] = useState([]);
  const [airlines, setAirlinesList] = useState([]);
  const [vaccineStatus, setVaccineStatus] = useState(false);
  const [mask, setMask] = useState(false);

  const API_URL = "http://127.0.0.1:5000";

  const getAirlines = () => {
    const requestOptions = {
      method: "POST",
      headers: {
      "vaccine_status": vaccineStatus,
      "mask": mask,
      }
    };
    console.log(requestOptions)
    fetch(API_URL + "/get_all_airlines", requestOptions
  ).then(resp => {
      if (resp.status == 200) {
        return resp.json();
      } else {
        alert("error");
    }}).then(data => {
      console.log(data.result)
      setAirlinesList(data.result);
      console.log("success");
    });
  };
  
    const classes = useStyles();

  return (
    <div className='App'>
  <div className={classes.root}>
      		<CssBaseline />
  	<label>
    		<input type="checkbox" onChange={(event) => setVaccineStatus(!vaccine)}/>
    		Vaccine?
  	</label>
    <label>
    		<input type="checkbox" onChange={(event) => setMask(!mask)}/>
    		Mask?
  	</label>
<div className='information'>
	<Button onClick={getAirlines}> SEARCH AIRLINES </Button>
        {airlines.map((val, _key) => {
          return (
	    <div className = 'airlines'>
	      <h3> Airline Id: {val.airline_id} </h3>
              <h3> Airline Name: {val.airline_name} </h3>
              <h3> Mask Required: {val.mask_policy} </h3>
              <h3> Vaccine Required: {val.vaccine_required} </h3>
	    </div>
          );
        })}
      </div>
	<Header />
   </div>
    </div>
  );
}

export default exploreAirlines;
