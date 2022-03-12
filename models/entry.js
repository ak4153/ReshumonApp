import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 9,
    unique: true,
  },
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
});

export default mongoose.model('Entry', entrySchema);
