require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Variables
const port = process.env.PORT || 3000;
const secret = process.env.JWTSECRET || '7d6156787bbbc8678e6a1b7be51f4b776814798fd4ed827f0d6d5cb108cb7b58f16170c8700b7b1371d3174210535356279112bae8496e332da8f6acbf511631';

// App
const app = express();

// middleware
app.use(cors())
app.use(express.json())

// Database
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// MongoDB Starts 
const uri = `mongodb+srv://${dbUser}:${dbPassword}@crudnodejs.33uff.mongodb.net/?retryWrites=true&w=majority&appName=crudNodeJs`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // DB
    const database = client.db(dbName);
    // DB Collections
    const usersCollection = database.collection("users");
    const menuCollection = database.collection("menu");
    const reviewsCollection = database.collection("reviews");
    const cartsCollection = database.collection("carts");
    // User Related API
     
    app.get('/users',async (req,res)=>{
        const result = await usersCollection.find().toArray();
        res.send(result);
    })
    app.post('/users',async (req,res)=>{
      const user = req.body;
      const userModified = {...user,role:'user'};
      const result = await usersCollection.insertOne(userModified);
      res.send(result);
    })
    // Update Login info Using Patch
    app.patch('/users',async (req,res)=>{
      const {  lastSignInTime,email, name,photo } = req.body;
      const filter = { email };
      const updatedUserInfo = {
        $set: {}
      };
      //if data provided then update
      if (name) {
        updatedUserInfo.$set.name = name;
      }
      if (photo) {
        updatedUserInfo.$set.photo = photo;
      }
      if (lastSignInTime) {
        updatedUserInfo.$set.lastSignInTime = lastSignInTime;
      }
      //
      const result = await usersCollection.updateOne(filter,updatedUserInfo);
      console.log('Updated Info of User',updatedUserInfo.$set);
      res.send(result);
    })
    // Change Role : Admin / User
    app.patch('/users/role/:id',async (req,res)=>{
      const id = req.params.id;
      const { role } = req.body;
      const filter = {_id : new ObjectId(id)}
      const updatedUserInfo = {
        $set: {role}
      };
      const result = await usersCollection.updateOne(filter,updatedUserInfo);
      console.log(`Updated User to ${role}`);
      res.send(result);
    })
    // Delete API
    app.delete('/users/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await usersCollection.deleteOne(query);
      console.log('User deleted!')
      res.send(result);
    })

    // MENU
    app.get('/menu',async (req,res)=>{
        const result = await menuCollection.find().toArray();
        res.send(result);
    })
    app.get('/reviews',async (req,res)=>{
        const result = await reviewsCollection.find().toArray();
        res.send(result);
    })
    app.get('/carts',async (req,res)=>{
      const email = req.query.email;
      const query = {email}
      const result = await cartsCollection.find(query).toArray();
      res.send(result);
    })
    app.post('/carts',async (req,res)=>{
      const cartItem = req.body;
      const result = await cartsCollection.insertOne(cartItem);
      res.send(result);
    })
    app.delete('/carts/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await cartsCollection.deleteOne(query);
      console.log('Item deleted from cart!')
      res.send(result);
    })
    

  } finally {
    // Ensures that the client will close when you finish/error
    // console.log("Finally Executed!");
  }
}
run().catch(console.dir);
// MongoDB Ends

// Initial Setup
app.get('/', (req,res)=>{res.send(`Restaurant Server is Running!`)})
app.listen(port, ()=>{console.log(`Restaurant Server is Running on Port : ${port}`)})