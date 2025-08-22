// Routes for Dog resources
import { Router } from 'express';
import { listDogs, getBreeds, getDogById } from '../controllers/dogController.js';

const router = Router();

// Specific routes FIRST
router.get('/', listDogs);
router.get('/breeds', getBreeds);   // <-- must be before '/:id'
router.get('/:id', getDogById);     // <-- param route LAST

export default router;
