import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "../App.css";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

function Control() {
  const API_URL = "http://127.0.0.1:5000";

  const [usersList, setUsersList] = useState([]);
  const [countries, setCountriesList] = useState([]);
  const [airlines, setAirlinesList] = useState([]);

  
  //gets all users from the database and sets them to the local usersList
  const getUsers = () => {
  { 
      const requestOptions = {
        method: "GET",
      };
      fetch(API_URL + "/get_users", requestOptions
      ).then(resp => {
        if (resp.status == 200) {
          return resp.json();
        } else {
          alert("error");
      }}).then(data => {
        console.log(data.result)
        setUsersList(data.result);
        console.log("success");
      });
    };

  };

  //remove all users from the database and resets the local usersList
  const clearUsers = () => {
    {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      };
      fetch(API_URL + "/clear_users", requestOptions
      ).then(() => {
        setUsersList([]);
        console.log("success");
      });
    };
  };

  const getCountries = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(API_URL + "/get_all_countries", requestOptions
    ).then(resp => {
      if (resp.status == 200) {
        return resp.json();
      } else {
        alert("error");
    }}).then(data => {
      console.log(data.result)
      setCountriesList(data.result);
      console.log("success");
    });
  };

  //remove all users from the database and resets the local usersList
  const clearCountries = () => {
    {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      };
      fetch(API_URL + "/clear_countries", requestOptions
      ).then(() => {
        setCountriesList([]);
        console.log("success");
      });
    };
  };

  const getAirlines = () => {
    const requestOptions = {
      method: "GET",
    };
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

  //remove all users from the database and resets the local usersList
  const clearAirlines = () => {
    {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      };
      fetch(API_URL + "/clear_airlines", requestOptions
      ).then(() => {
        setAirlinesList([]);
        console.log("success");
      });
    };
  };

  return (
    <div className='App'>
      <div className='information'>
        <Button onClick={getUsers}> SHOW USERS IN DB </Button>
        {usersList.map((val, _key) => {
          return (
            <div className='users'>
              <h3> Name: {val.name} </h3>
              <h3> Email: {val.email} </h3>
              <h3> Password: {val.password} </h3>
              <h3> Vaccine Status: {val.vaccine_status} </h3>
              <h3> Passport Country: {val.passport} </h3>
            </div>
          );
        })}
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

	<Button onClick={getAirlines}> SHOW ALL AIRLINES IN DB </Button>
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
        <Button onClick={clearUsers}> CLEAR USERS IN DB </Button>
	<Button onClick={clearCountries}> CLEAR COUNTRIES IN DB </Button>
	<Button onClick={clearAirlines}> CLEAR AIRLINES IN DB </Button>
      </div>
    </div>
  );
}

export default Control;
