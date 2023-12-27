const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001;
require('dotenv').config()
console.log(process.env.DB_PASSWORD) // remove this after you've confirmed it is working

// middleware
app.use(cors());
app.use(express.json());

// Ingfah
// RJxU2lsKcmCcjcJg

// mongoDB Config
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-salad-db.vhq6ett.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();

    //database & collections
    const menuCollections = client.db("demo-salad-db").collection("menus")
    const cartCollections = client.db("demo-salad-db").collection("cartItems")

    // all carts operations

    // posting cart to db
    app.post('/carts', async(req,res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result)
    })

    // get cart use mail
    app.get('/carts', async(req,res) => {
      const email = req.query.email;
      const filter = {email:email};
      const result = await cartCollections.find(filter).toArray();
      res.send(result)
    })

    

    // get delete form cart
    app.delete('/carts/:id', async(req,res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollections.deleteOne(filter);
      res.send(result);
    })


    // all menu items operations
    app.get('/menu', async(req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Hello Developer')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})