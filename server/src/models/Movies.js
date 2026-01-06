import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required']
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating cannot be less than 0'],
    max: [10, 'Rating cannot be more than 10']
  },
  genres: [{
    type: String,
    trim: true
  }],
  director: {
    type: String,
    trim: true
  },
  cast: [{
    type: String,
    trim: true
  }],
  posterUrl: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  imdbId: {
    type: String,
    unique: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

movieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Movies', movieSchema);