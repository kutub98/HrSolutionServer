const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middle ware
require("dotenv").config();
app.use(cors());
app.use(express.json());



// hrSolution server Database connect
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.SITE_NAME}:${process.env.SITE_KEY}@cluster0.mlxcjcs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// hrSolution server Database run
async function run() {
  try {
    await client.connect();
    console.log(" hrSolution server Database connect");
  } catch (error) {
    console.error(error);
  }
}


// All collection 
const userCollection = client.db("HrSolutionServer").collection("users");
const bannerImgCollect = client.db("HrSolutionServer").collection("bannerImg");
const collectColorCode = client.db('HrSolutionServer').collection("colorCode")
const todoItemsCollect = client.db('HrSolutionServer').collection("todoItems")

//Post to saver Users
app.post("/users", async (req, res) => {
    const users = req.body;
    const addUsers = await userCollection.insertOne(users);
    console.log(addUsers);
    res.send(addUsers); 
});
//get all Users
  app.get("/users", async (req, res) => {
    const users = {};
    const getUsers = await userCollection.find(users).toArray();
    console.log(getUsers);
    res.send(getUsers);
  });



app.listen(port, () => {
    console.log(`Hr Solution server is running ${port}`);
  });
  
  
  run().catch((error) => console.error(error));
