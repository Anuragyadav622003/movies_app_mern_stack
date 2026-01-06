import express from 'express';
import Movie from '../models/Movies.js';
import { protect, admin } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';
import Queue from 'bull';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = express.Router();

// Create Redis queue for lazy insertion
const movieQueue = new Queue('movie insertion', process.env.REDIS_URL || 'redis://127.0.0.1:6379');

// Add movie (with lazy insertion via queue)
router.post('/movies', [
  protect,
  admin,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('releaseDate').isDate().withMessage('Valid release date is required'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
  body('rating').isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Add job to queue for lazy insertion
    await movieQueue.add({
      movieData: req.body,
      userId: req.user.id
    });

    res.json({ message: 'Movie addition queued successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Process movie queue jobs
movieQueue.process(async (job) => {
  try {
    const { movieData, userId } = job.data;
    
    const movie = await Movie.create({
      ...movieData,
      addedBy: userId
    });
    
    return { success: true, movieId: movie._id };
  } catch (error) {
    throw new Error(`Failed to insert movie: ${error.message}`);
  }
});

// Update movie
router.put('/movies/:id', [
  protect,
  admin,
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
  body('rating').optional().isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Update movie
    Object.keys(req.body).forEach(key => {
      movie[key] = req.body[key];
    });

    await movie.save();

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete movie
router.delete('/movies/:id', [protect, admin], async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await movie.deleteOne();
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/movies/scrape-imdb', [protect, admin], async (req, res) => {
  try {
    const { imdbUrl } = req.body; // Get URL from request body

    if (!imdbUrl) {
      return res.status(400).json({ message: 'IMDb URL is required' });
    }

    // Make sure the URL is properly formatted
    let url = imdbUrl.trim();
    if (!url.startsWith('http')) {
      url = `https://www.imdb.com/title/${url}/`;
    }

    console.log(`Scraping IMDb URL: ${url}`);

    // Set headers to mimic a real browser
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    };

    // Add timeout configuration
    const { data } = await axios.get(url, { 
      headers,
      timeout: 10000 
    });
    
    const $ = cheerio.load(data);

    // Extract movie details
    const title = $('h1[data-testid="hero-title-block__title"]').text().trim();
    const rating = parseFloat($('div[data-testid="hero-rating-bar__aggregate-rating__score"] span').first().text().trim());
    
    // Extract description/summary
    let description = $('span[data-testid="plot-l"]').text().trim();
    if (!description) {
      description = $('span[data-testid="plot-xl"]').text().trim();
    }

    // Extract release year
    const releaseYearText = $('a[href*="releaseinfo"]').text().trim();
    const releaseYear = releaseYearText ? parseInt(releaseYearText) : new Date().getFullYear();

    // Extract duration
    const durationText = $('li[data-testid="title-techspec_runtime"] div').last().text().trim();
    let duration = 120; // default
    if (durationText) {
      const match = durationText.match(/(\d+)/);
      if (match) duration = parseInt(match[1]);
    }

    // Extract genres
    const genres = [];
    $('a[href*="genre"] span').each((i, element) => {
      genres.push($(element).text().trim());
    });

    // Extract directors
    const director = $('a[href*="/name/"]').first().text().trim() || 'Unknown Director';

    // Extract poster URL
    const posterUrl = $('img[data-testid="hero-media__poster"]').attr('src') || 
                     `https://via.placeholder.com/300x450?text=${encodeURIComponent(title)}`;

    const movieData = {
      title,
      rating,
      description: description || `IMDb movie: ${title}`,
      releaseDate: new Date(releaseYear, 0, 1),
      duration,
      genres: genres.length > 0 ? genres : ['Drama'],
      director,
      posterUrl
    };

    console.log('Scraped movie:', movieData);

    // Add to queue for insertion
    await movieQueue.add({
      movieData,
      userId: req.user.id
    });

    res.json({ 
      message: 'Movie scraped and queued successfully', 
      movie: movieData 
    });

  } catch (error) {
    console.error('IMDb scraping error:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ message: 'Request timeout. Please try again.' });
    }
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        message: `IMDb responded with error: ${error.response.status}` 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to scrape IMDb. The site structure may have changed or the movie ID is invalid.' 
    });
  }
});
export default router;