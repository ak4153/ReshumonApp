import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: { type: String, unique: true },
  location: { type: String },
});

export default mongoose.model('Visitor', visitorSchema);
