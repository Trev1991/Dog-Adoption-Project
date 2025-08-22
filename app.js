import express from 'express';
import cors from 'cors';
import dogRoutes from './routes/dogRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/dogs', dogRoutes);

// --- Error handler (keep this AFTER routes) ---
app.use((err, req, res, next) => {
    // Convert common Mongoose cast errors into 400s, not noisy 500s
    if (err?.name === 'CastError') {
        return res.status(400).json({ message: err.message });
    }
    // Fallback
    res.status(500).json({ message: 'Server error' });
});

export default app;
