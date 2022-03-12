/**
 * Connects to db and disconnects in order to preserve resources
 *
 */

import mongoose from 'mongoose';
const dbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crudapp';

const connection = {};
async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  //a connection is created here
  const db = mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}
//disconnects if we are in production to save resources on the server
async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') connection.isConnected = false;
  } else console.log('not disconnected');
}
const db = { connect, disconnect };
export default db;
