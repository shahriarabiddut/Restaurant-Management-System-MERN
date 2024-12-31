require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Variables
const port = process.env.PORT || 3000;

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
    const menuCollection = database.collection("menu");
    const reviewsCollection = database.collection("reviews");
    app.get('/menu',async (req,res)=>{
        const result = await menuCollection.find().toArray()
        res.send(result);
    })
    app.get('/reviews',async (req,res)=>{
        const result = await reviewsCollection.find().toArray()
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