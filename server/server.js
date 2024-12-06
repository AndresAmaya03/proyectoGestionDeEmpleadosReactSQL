const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const asyncHandler = require("express-async-handler")

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employees"
})


//POST
app.post(
  "/create", 
  asyncHandler(async (req, res) => {
    const { name, age, country, charge, agesOnCharge } = req.body;

    const sqlInsert = 'INSERT INTO employee (name, age, country, charge, agesOnCharge) VALUES (?, ?, ?, ?, ?)';

    await new Promise((resolve, reject) => {
      db.query(sqlInsert, [name, age, country, charge, agesOnCharge], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.status(201).json({ message: 'Employee registered successfully' });
  })
);

//GET
app.get(
    "/employees",
    asyncHandler(async (req, res) => {
        const sqlFetch = 'SELECT * FROM employee';
        db.query(sqlFetch, (err, result) => {
            if(err) {
                console.error('Error fetching employees: ', err.message)
                res.status(500).json({message: 'Error fetching employees', error: err.message})
                return
            }

            res.status(200).json(result)
        })
    })
)



app.listen(3001, () => {
    console.log("App running on port 3001")
})