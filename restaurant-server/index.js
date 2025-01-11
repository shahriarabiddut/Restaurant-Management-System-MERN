require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPESECRET);
// Variables
const port = process.env.PORT || 3000;
const secret = process.env.JWTSECRET;
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
    const paymentsCollection = database.collection("payments");

    // JWT RELATED API
    app.post('/jwt',async (req,res)=>{
        const user = req.body;
        const token = jwt.sign(user,secret,{expiresIn: '2h'})
        res.send({token});
    })
    // MiddleWares : Verify Token
    const verifyToken = (req,res,next)=>{
      // console.log('Inside Verify token : ',req.headers.authorization);
      if(!req.headers.authorization){
        return res.status(401).send({message:'Unauthorized Access!'})
      }
      const token = req.headers.authorization.split(' ')[1];
      // if(!token){
      //   return res.status(401).send({message:'Unauthorized Access!'})
      // }
      jwt.verify(token,secret,(error,decoded)=>{
        if(error){
          return res.status(401).send({message:'Unauthorized Access!'})
        }
        req.decoded = decoded;
        next();
      })
    }
    //MiddleWares: Verfy Admin after Verify Token
    const verifyAdmin = async (req,res,next)=>{
      const email = req.decoded.email;
      // console.log('Inside Admin Verify token : ',email);
      const query = { email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === 'admin';
      if(!isAdmin){
        return res.status(403).send({message:'Forbidden Access!'})
      }
      next();
    }
    // User Related API
     
    app.get('/users',verifyToken,verifyAdmin,async (req,res)=>{
      // console.log(req.headers);
        const result = await usersCollection.find().toArray();
        res.send(result);
    })
    // Get User Data that role is ADMIN or NOT
    app.get('/user/admin/:email',verifyToken,async (req,res)=>{
      let admin = false;
      const email = req.params.email;
      if(email !== req.decoded.email){
        return res.status(403).send({message:'Forbidden Access!'})
      }
      const filter = { email };
      const user = await usersCollection.findOne(filter);
      if(user){
        admin = user?.role === 'admin';
      }
      res.send({admin});
    })
    // Add New User
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
    app.patch('/users/role/:id', verifyToken, verifyAdmin, async (req,res)=>{
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
    app.delete('/users/:id', verifyToken, verifyAdmin, async (req,res)=>{
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
    // Get Menu Item
    app.get('/menu/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await menuCollection.findOne(query);
      console.log('Item Found :',id);
      res.send(result);
    })
    // Add Menu Item
    app.post('/menu',verifyToken,verifyAdmin,async (req,res)=>{
      const item = req.body;
      const result = await menuCollection.insertOne(item);
      console.log('New Item Added');
      res.send(result);
    })
     // Update Menu Item
    app.patch('/menu/:id', verifyToken, verifyAdmin, async (req,res)=>{
      const id = req.params.id;
      const item = req.body;
      const filter = {_id : new ObjectId(id)}
      const updatedUserInfo = {
        $set: {
          name:item.name,
          category:item.category,
          price:item.price,
          recipe:item.recipe,
          image:item.image,
        }
      };
      const result = await menuCollection.updateOne(filter,updatedUserInfo);
      console.log(`Updated Item ${id}`);
      res.send(result);
    })
    // Delete Menu Item
    app.delete('/menu/:id', verifyToken, verifyAdmin, async (req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await menuCollection.deleteOne(query);
      console.log('Item deleted!')
      res.send(result);
    })
    // Reviews
    app.get('/reviews',async (req,res)=>{
        const result = await reviewsCollection.find().toArray();
        res.send(result);
    })
    // Carts
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
    // Payment Related APIS
    // Get Payment History 
    app.get('/payments/:email',verifyToken,async (req,res)=>{
        const email = req.params.email;
        if(email !== req.decoded.email){
          return res.status(403).send({message:'Forbidden Access!'})
        }
        const result = await paymentsCollection.find().toArray();
        res.send(result);
    })
    //  Save Payments
    app.post('/payments',verifyToken,async(req,res)=>{
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      // delete each item from cart 
      const query = { _id: {
        $in: payment.cartIds.map(id=> new ObjectId(id))
      }}
      const deleteResult = await cartsCollection.deleteMany(query);
      // 
      console.log('Payment Saved! ', payment)
      res.send({result,deleteResult});
    })
    // Payment Intent - Stripe
    app.post('/create-payment-intent',async(req,res)=>{
      const {price} = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount : amount,
        currency: 'usd',
        payment_method_types: ['card']
      })
      res.send({
        clientSecret: paymentIntent.client_secret
      })
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