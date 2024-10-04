// importing the neccessary dependancies
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// create a connection object
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
  // connection not successful
  if(err) {
      return console.log("Error connecting to MySQL", err)
  }
    // connection successful
    console.log("MySQL connection successful")
});

// ejs templating configuration
// ejs for the assignment is not necessary
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

// app.get('/data', (req,res) => {
//     // Retrieve data from database 
//     db.query('SELECT * FROM patients', (err, results) =>{
//         if (err){
//             console.error(err);
//             res.status(500).send('Error Retrieving data')
//         }else {
//             //Display the records to the browser 
//             res.render('data', {results: results});
//         }
//     });
// });

// Question 1: get patients
// '/get-patient' is a route
app.get('/get-patients', (req, res) => {
  const getPatients = "SELECT * FROM patients"

  db.query(getPatients, (err, results) => {
      // have an error
      if(err) {
          return res.status(500).send("Failed to fetch the patients")
      }

      // get back the data/results
      res.status(200).send(results)
  })
})

// Question 2: retrieve all providers
// '/retrieve provider'is a route
app.get('/providers', (req, res) => {
  const getProviders = "SELECT * FROM providers"
  
  db.query(getProviders, (err, results) => {
    // have an error
      if (err) {
          return res.status(500).send("Failed to retrieve providers")
      }
      // get back the data/results
      res.status(200).json(results)
  })
})

// Question 3: filter patients by first name
app.get('/patients/by-firstname/:firstName', (req, res) => {
  const firstName = req.params.firstName
  const query = "SELECT * FROM patients WHERE first_name = ?"
  
  db.query(query, [firstName], (err, results) => {
    //have an error
      if (err) {
          return res.status(500).send("Error filtering patients by first name")
      }
      // get back the data/results
      res.status(200).json(results)
  })
})

// Question 4: retrieve providers by specialty
app.get('/providers/by-specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty
  const query = "SELECT * FROM providers WHERE provider_specialty = ?"
  
  db.query(query, [specialty], (err, results) => {
    // have an error
      if (err) {
          return res.status(500).send("Error retrieving providers by specialty")
      }
      //get back the results
      res.status(200).json(results)
  })
})

 // delcare the port and listen to the server
const PORT = 3306
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

 // Sending message to browser
 console.log('Sending to browser...');
 app.get('/', (req,res) => {
     res.send('Server Started Successfully!');
  });