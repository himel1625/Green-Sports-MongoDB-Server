require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 4000;
const app = express();
// middleware
app.use(cors('*'));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s9ap0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const SportsCollection = client.db('SportsDB').collection('Sports');
    // await client.db('admin').command({ ping: 1 });

    // app.post('/products', async (req, res) => {
    //   const item = req.body;
    //   const result = await SportsCollection.insertOne(item);
    //   res.send(result);
    // });

    app.get('/products', async (req, res) => {
      const result = await SportsCollection.find().toArray();
      res.send(result);
    });

    app.get('/Details', async (req, res) => {
      const cursor = SportsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // console.log(
    //   'Pinged your deployment. You successfully connected to MongoDB!',
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
