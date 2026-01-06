import express from 'express';
import Movies from '../models/Movies.js'
import { protect } from '../middleware/auth.js';
 
const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movies.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('addedBy', 'name');

    const total = await Movies.countDocuments();

    res.json({
      movies,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search movies
router.get('/search', protect, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const movies = await Movies.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { director: { $regex: q, $options: 'i' } },
        { cast: { $regex: q, $options: 'i' } }
      ]
    }).populate('addedBy', 'name');

    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sort movies
router.get('/sorted', protect, async (req, res) => {
  try {
    const { sortBy, order = 'asc' } = req.query;
    let sortOption = {};

    switch (sortBy) {
      case 'title':
        sortOption = { title: order === 'desc' ? -1 : 1 };
        break;
      case 'rating':
        sortOption = { rating: order === 'desc' ? -1 : 1 };
        break;
      case 'releaseDate':
        sortOption = { releaseDate: order === 'desc' ? -1 : 1 };
        break;
      case 'duration':
        sortOption = { duration: order === 'desc' ? -1 : 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const movies = await Movies.find()
      .sort(sortOption)
      .populate('addedBy', 'name');

    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single movie
router.get('/:id', protect, async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id)
      .populate('addedBy', 'name');
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;