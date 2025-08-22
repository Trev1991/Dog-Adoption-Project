// Explicit Dog model targeting the 'dogs' collection
// Ensures queries hit the same collection you seeded (db 'dogs', collection 'dogs')
import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number },
    status: { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
    description: { type: String },
    photoUrl: { type: String }
  },
  {
    collection: 'dogs',   // <-- force collection name
    timestamps: true
  }
);

export default mongoose.model('Dog', dogSchema);
