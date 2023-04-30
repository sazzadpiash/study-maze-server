const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.06w34xu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
    try {
        const countries = client.db('study-maze').collection('countries');

        app.get('/countries', async (req, res) => {
            const result = await countries.find({}).toArray();
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('Study Maze server is running');
})

app.listen(port, () => console.log(`Study Maze running on ${port}`))


