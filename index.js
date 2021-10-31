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
    const ordersCollection = database.collection("orders");

    //Get all foods API
    app.get("/foods", async (req, res) => {
      const cursor = foodsCollection.find({});
      const foods = await cursor.toArray();
      res.send(foods);
    });
    //Get Single Food Api
    app.get('/placeOrder/:foodId', async (req, res) => {
       
      const id = req.params.foodId;
       const query = { _id: ObjectId(id) };
      const food = await foodsCollection.findOne(query);
      res.json(food); 
    }) 
//get all orders
    app.get('/orders', async (req, res) => {
      const cursor = ordersCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders)
    })

//Get single user all orders
    app.get('/userOrders/:email', async (req, res) => {
      const id = req.params.email;

      const cursor =  ordersCollection.find({ email: id });
      const orders = await cursor.toArray();
   
      
      res.json(orders);
    })


    // POST API
      // add new food offer
    app.post("/foods", async (req, res) => {
      const food = req.body;
      const result = await foodsCollection.insertOne(food);
      res.json(result);
    });

    //place a order post api 
    app.post('/orders', async (req, res) => {
      
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      res.json(result);
    })


    //Update API

    // delete api
    app.delete("/orders/:deleteId", async (req, res) => {
      const id = req.params.deleteId;
      const query = { _id: ObjectId(id) };
      const result = await ordersCollection.deleteOne(query);
      res.json(result);
    });



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
