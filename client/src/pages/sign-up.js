import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  let navigate = useNavigate();
  const [VaccineStatus, setVaccineStatus] = useState("N/A");
  const [VaccineType, setVaccineType] = useState("N/A");
  const [usersList, setUsersList] = useState([]);

  const [value, setValue] = useState("");
  const [passport, setPassport] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const options = useMemo(() => countryList().getData(), []);
  const API_URL = "http://127.0.0.1:5000";

  const changeHandler = (value) => {
    setValue(value);
    setPassport(value.label);
  };

  // sends a request to the server to add the user with information submitted.
  const addUser = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: email,
        password: password,
        name: name,
        lastName: lastName,
        VaccineStatus: VaccineStatus,
        VaccineType: VaccineType,
        passport: passport
      }
    };
    fetch(API_URL + "/sign_up", requestOptions
    ).then(() => {
      setUsersList([
        ...usersList,
        {
          email: email,
          password: password,
          name: name,
          lastName: lastName,
          VaccineStatus: VaccineStatus,
          VaccineType: VaccineType,
          passport: passport,
        },
      ]);
      console.log("success");
    });
    navigate("/sign-in");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='First Name'
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <label>Vaccine Status:</label>
                <select
                  value={VaccineStatus}
                  onChange={(event) => setVaccineStatus(event.target.value)}
                >
                  <option name='N/A'> N/A </option>
                  <option name='Vaccinated'> Vaccinated </option>
                  <option name='Boosted'> Boosted </option>
                  <option name='Unvaccinated'> Unvaccinated </option>
                </select>
              </Grid>
              <Grid item xs={12}>
                <label>Vaccine Type:</label>
                <select
                  value={VaccineType}
                  onChange={(event) => setVaccineType(event.target.value)}
                >
                  <option name='N/A'> N/A </option>

                  <option name='Pfizer'> Pfizer </option>
                  <option name='J&J'> J&J </option>
                  <option name='Moderna'> Moderna </option>
                </select>
              </Grid>

              <Grid item xs={12}>
                <label>Passport Country:</label>
                <div className='Select'>
                  <Select
                    options={options}
                    value={value}
                    onChange={changeHandler}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I agree to all terms & conditions'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              onClick={addUser}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='sign-in' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
