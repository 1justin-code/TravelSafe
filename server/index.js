const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// connect to local database
const db = mysql.createConnection({
  user: "admin",
  host: "database-2.cbz6gnja77aw.us-east-2.rds.amazonaws.com",
  password: "Cs348proj135!",
  database: "covidtravel_db",
  multipleStatements: true,
});

// insert a user into the database users table
app.post("/create", (req, res) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const VaccineStatus = req.body.VaccineStatus;
  const VaccineType = req.body.VaccineType;
  const passport = req.body.passport;

  db.query(
    "INSERT INTO users (email, password, name, lastName, vaccine_status, vaccine_type, passport) VALUES (?,?,?,?,?,?,?)",
    [email, password, name, lastName, VaccineStatus, VaccineType, passport],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// select all users in the database.
app.get("/users", (req, res) => {
  db.query("SELECT * FROM covidtravel_db.users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete all users in the database and reset the increment counter.
app.get("/clear-users", (req, res) => {
  db.query(
    "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE covidtravel_db.users; ALTER TABLE covidtravel_db.users AUTO_INCREMENT = 0; DELETE FROM covidtravel_db.users; SET FOREIGN_KEY_CHECKS = 1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//listen port for the server.
app.listen(3001, () => {
  console.log("the server is running on 3001");
});
