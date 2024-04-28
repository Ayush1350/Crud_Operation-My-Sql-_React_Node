const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to Database");
    return;
  }
  console.log("connected to database");
});

/////////////////////////// Insert ///////////////////////////////////////

app.post("/insertData", (req, res) => {
  const { dataa } = req.body;

  const sql = "INSERT INTO crudoperation (data) VALUES (?)";

  db.query(sql, [dataa], (err, result) => {
    if (err) {
      console.log("Error inserting into Data");
      return;
    }
  });
});


///////////////////////// Delete //////////////////////////////////

app.delete("/deleteData/:id" , (req, res) => {
    
    const { id } = req.params;
 
    const sql = 'DELETE FROM crudoperation WHERE id = ?';

    db.query(sql , [id], (err, result) => {
        if(err) {
            console.log("Error Deleting Data");
            return;
        } 
    })

})

///////////////////////// Fetch All Data //////////////////////////////////

app.get("/fetchAllData", (req, res) => {
    const sql = 'SELECT * FROM crudoperation';

    db.query(sql, (err, result) => {
        if(err) {
            console.log("Error In Fetching All Data");
            return;
        }
        res.json(result);
    })
})


///////////////////////// Update Data //////////////////////////////////

app.put("/updateData/:id", (req, res) => {
  const id = req.params.id;
  const newData = req.body.newData;

  const sql = "UPDATE crudoperation SET data = ? WHERE id = ?";

  db.query(sql, [newData, id], (err, result) => {
      if (err) {
          console.error("Error In Updating Data:", err);
          res.status(500).send("Error In Updating Data");
          return;
      }
      res.send("Data Updated Successfully");
  });
});


///////////////////////// Search Data //////////////////////////////////

app.get("/searchData", (req, res) => {
  const query = req.query.query;
  const sql = `SELECT * FROM crudoperation WHERE data LIKE '%${query}%'`;

  db.query(sql, (err, results) => {
    if(err) {
      console.log("Error In Searching Database");
      return;
    }
    res.json(results);
  })
})



app.listen(3000, () => {
  console.log("Server Is Runiing on port 3000");
});
