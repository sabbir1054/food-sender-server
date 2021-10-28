const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


//MONGODB
/* const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xyvia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology:true});


async function run() {
  try {
    await client.connect();
    const database = client.db("food-sender");
    const usersCollection = database.collection("users");
      const usersCollection = database.collection("foods");
      
    //Get API
      

    // POST API
    
      
      //Update API

    // delete api
    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir); */


//server response
app.get("/", (req, res) => {
  res.send("Server Is Running ");
});
//server port response
app.listen(port, () => {
  console.log("Listen from", port);
});