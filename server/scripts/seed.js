// Seed script for Dog collection
// Usage:
//   node scripts/seed.js          # insert sample dogs (no deletion)
//   node scripts/seed.js --reset  # delete all dogs first, then insert
//
// Requires: MONGODB_URI in server/.env (falls back to mongodb://127.0.0.1:27017/dogs)
// Node: supports top-level await (Node 18+)

import 'dotenv/config';
import mongoose from 'mongoose';
import Dog from '../models/Dog.js';

const RESET = process.argv.includes('--reset');
const MONGO = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dogs';

const sampleDogs = [
  { name: 'Bella', breed: 'Maltese', age: 3, status: 'available', description: 'Small, affectionate companion.', photoUrl: '' },
  { name: 'Max', breed: 'Labrador Retriever', age: 2, status: 'pending', description: 'Ball chaser and water lover.', photoUrl: '' },
  { name: 'Luna', breed: 'German Shepherd', age: 4, status: 'available', description: 'Smart, loyal, and protective.', photoUrl: '' },
  { name: 'Charlie', breed: 'Beagle', age: 5, status: 'adopted', description: 'Curious nose, gentle soul.', photoUrl: '' },
  { name: 'Daisy', breed: 'Golden Retriever', age: 1, status: 'available', description: 'Eager to please and friendly.', photoUrl: '' },
  { name: 'Rocky', breed: 'Bulldog', age: 6, status: 'available', description: 'Calm, steady, couch connoisseur.', photoUrl: '' },
  { name: 'Milo', breed: 'Poodle', age: 2, status: 'available', description: 'Clever and hypoallergenic.', photoUrl: '' },
  { name: 'Coco', breed: 'Chihuahua', age: 3, status: 'pending', description: 'Pocket-sized with big attitude.', photoUrl: '' },
  { name: 'Buddy', breed: 'Australian Shepherd', age: 2, status: 'available', description: 'Active and highly trainable.', photoUrl: '' },
  { name: 'Zoe', breed: 'Shiba Inu', age: 3, status: 'available', description: 'Independent and fox-like.', photoUrl: '' }
];

try {
  console.log('Connecting to', MONGO);
  await mongoose.connect(MONGO);

  if (RESET) {
    console.log('Reset flag detected — deleting existing dogs...');
    await Dog.deleteMany({});
  }

  const result = await Dog.insertMany(sampleDogs, { ordered: false });
  console.log(`Inserted ${result.length} dogs.`);

  const total = await Dog.countDocuments();
  console.log(`Total dogs in DB: ${total}`);
} catch (err) {
  console.error('Seed error:', err);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
  console.log('Disconnected.');
}
