import mongoose from 'mongoose';
import Dog from '../models/Dog.js';

// GET /api/dogs?q=&status=&breed=&page=&limit=
export async function listDogs(req, res, next) {
  try {
    const { q = '', status = '', breed = '', page = 1, limit = 12 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (breed) filter.breed = breed;
    if (q) {
      // adjust fields to match your schema (e.g., 'name', 'description', 'notes')
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { notes: { $regex: q, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      Dog.find(filter)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit)),
      Dog.countDocuments(filter),
    ]);

    res.json({ items, total });
  } catch (err) {
    next(err);
  }
}

// GET /api/dogs/breeds
export async function getBreeds(req, res, next) {
  try {
    const breeds = await Dog.distinct('breed'); // unique values for dropdown
    res.json(breeds.filter(Boolean).sort());
  } catch (err) {
    next(err);
  }
}

// GET /api/dogs/:id
export async function getDogById(req, res, next) {
  try {
    const { id } = req.params;

    // Guard against invalid ObjectId to avoid CastError
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const dog = await Dog.findById(id);
    if (!dog) return res.status(404).json({ message: 'Not found' });
    res.json(dog);
  } catch (err) {
    next(err);
  }
}
