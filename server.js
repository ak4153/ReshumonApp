import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import entry from './models/entry.js';
import db from './utils/db.js';
import visitor from './models/visitor.js';
import path from 'path';
const app = express();
const port = process.env.PORT || 3001;
var environment = process.env.NODE_ENV || 'development';
//middleware
app.use(bodyParser.json());
app.use(cors());

//apis
app.get('/getentries', async (req, res) => {
  try {
    await db.connect();

    const allEntries = await entry.find();
    await db.disconnect();
    return res.status(202).send(allEntries);
  } catch (error) {
    await db.disconnect();
    return res.status(404).send({ message: 'Could not fetch entries(404)' });
  }
});

app.delete('/deleteentry', async (req, res) => {
  try {
    await db.connect();
    const allEntries = await entry.findByIdAndDelete(req.body._id);
    await db.disconnect();
    return res.status(202).send({ message: 'successfully deleted entry' });
  } catch (error) {
    await db.disconnect();
    return res.status(404).send({ message: 'Could not delete entry(404)' });
  }
});

app.get('/geter', async (req, res) => {
  try {
    await db.connect();
    const allVisitors = await visitor.find();
    const allEntries = await entry.find();
    await db.disconnect();
    return res
      .status(202)
      .send({ allVisitors: allVisitors, allEntries: allEntries });
  } catch (error) {
    await db.disconnect();
    return res.status(404).send({ message: 'Could not fetch entries(404)' });
  }
});
app.put('/edit', async (req, res) => {
  const { _id, firstName, lastName, ID } = req.body.data;
  console.log(req.body.data._id);
  try {
    await db.connect();
    const foundEntry = await entry.findById(_id);
    console.log(foundEntry);
    // foundEntry.ID = ID;
    foundEntry.firstName = firstName;
    foundEntry.lastName = lastName;
    await foundEntry.save();
    await db.disconnect();
    return res.status(202).send({ message: 'Entry edited successfully' });
  } catch (error) {
    await db.disconnect();
    return res.status(404).send({
      message: 'Could not edit, check the ID',
    });
  }
});
app.post('/countvisitors', async (req, res) => {
  const { ip, country } = req.body.data.ip;
  console.log(req.body.data.ip);
  try {
    const newVisitor = new visitor({
      ip: ip,
      location: country,
    });
    await db.connect();
    await newVisitor.save();
    res.status(202);
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    res.status(418);
  }
});

//todo error handling
app.post('/', async (req, res) => {
  try {
    await db.connect();
    const { firstName, lastName, ID } = req.body;
    const newEntry = new entry({
      firstName: firstName,
      lastName: lastName,
      ID: ID,
    });
    if (newEntry) {
      await db.disconnect();
      await newEntry.save();
      return res.status(202).send(newEntry);
    }
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(404).send({ message: 'Could not create an entry(404)' });
  }
});

//heroku deployment
if (environment === 'production') {
  app.use(express.static('./crudtest/build'));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './crudtest/build' });
  });
} else {
  app.get('/', (req, res) => {
    res.send('api running');
  });
}

app.listen(port, console.log(`listening on ${port}`));
