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

  const sendAirlines = () => {
    //document.getElementById("country1").value
};

  const sendCountries = () => {
};

  const sendVaccines = () => {
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
  <div>
    <form>
  	  <div>
    		  <label for="airlines1">   Airline Id: </label>
      		<input id="airlines1" type="text" name="text" />
		      <label for="airlines2">   Airline Name: </label>
          <input id="airlines2" type="text" name="text"/>
          <br></br>
		      <label for="airlines3">   Mask Required: </label>
          <input id="airlines3" type="text" name="text"/>
		      <label for="airlines4">   Vaccine Required: </label>
          <input id="airlines4" type="text" name="text"/>
  	  </div>
    </form>
  	<Button onClick={sendAirlines}> SEND AIRLINE TO DB </Button>
    </div>
   	<div>
    <form>
           <div>
                <label for="countries1">   Country Name: </label>
                <input id="countries1" type="text" name="text"/>
                <label for="countries2">   Vaccine Required: </label>
                <input id="countries2" type="text" name="text"/>
                <label for="countries3">   Testing Required: </label>
                <input id="countries3" type="text" name="text"/>
                <br></br>
                <label for="countries4"> Risk Level: </label>
                <input id="countries4" type="text" name="text"/>
                <label for="countries5">   Quarantine Required: </label>
                <input id="countries5" type="text" name="text"/>
          </div>
      </form>
      <Button onClick={sendCountries}> SEND COUNTRY TO DB </Button> 
    </div>    
    <div>
    <form>
           <div>
                <label for="vaccine1">   Vaccine ID: </label>
                <input id="vaccine1" type="text" name="text"/>
                <label for="vaccine2">   Vaccine Name: </label>
                <input id="vaccine2" type="text" name="text"/>
          </div>
      </form>
      <Button onClick={sendVaccines}> SEND VACCINES TO DB </Button> 
    </div> 
	</div>
    </div>
  );
}

export default Control;
