const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId=require('mongodb').ObjectId;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

/* const foods = [
  {
    title: "Cheeseburger with Salad",
    description: "",
    imgUrl: "https://i.ibb.co/D9hcBwb/food5.jpg",
    price: 15,
  },
  {
    title: "Royal Cheeseburger with Becon",
    description: "",
    imgUrl: "https://i.ibb.co/93rkKcm/food4.jpg",
    price: 35,
  },
  {
    title: "Shrimp & Olive Pizza ",
    description: "",
    imgUrl: "https://i.ibb.co/xqpMZyf/food3.jpg",
    price: 30,
  },
  {
    title: "Seafood Pizza",
    description: "",
    imgUrl: "https://i.ibb.co/Tw5rdgt/food2.jpg",
    price: 22,
  },
  {
    title: "Roll With Tuna",
    description: "",
    imgUrl: "https://i.ibb.co/fxX1W40/food1.jpg",
    price: 35,
  },
  {
    title: "Octopus Roll",
    description: "",
    imgUrl: "https://i.ibb.co/3B8DgRb/sushi-01-480x480.jpg",
    price: 27,
  },
]; */

//MONGODB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xyvia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("food-sender");
    const usersCollection = database.collection("users");
    const foodsCollection = database.collection("foods");

    //Get all foods API
    app.get("/foods", async (req, res) => {
      const cursor = foodsCollection.find({});
      const foods = await cursor.toArray();
      res.send(foods);
    });
    //Get Single Food Api
    app.get('/placeOrder/:foodId', async (req, res) => {
       console.log("hitted");
      const id = req.params.foodId;
       const query = { _id: ObjectId(id) };
      const food = await foodsCollection.findOne(query);
      res.json(food); 
    }) 

    // POST API

    //Update API

    // delete api
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//server response
app.get("/", (req, res) => {
  res.send("Server Is Running ");
});
/* app.get("/foods", (req, res) => {
  res.send(foods);
}); */
//server port response
app.listen(port, () => {
  console.log("Listen from", port);
});
