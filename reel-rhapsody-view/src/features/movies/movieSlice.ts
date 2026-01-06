import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getMovies, 
  getMovieById, 
  createMovie, 
  updateMovie, 
  deleteMovie,
  scrapeImdb,
  Movie, 
  MoviesResponse, 
  MovieFilters,
  CreateMovieData 
} from '@/api/movie.api';

interface MovieState {
  movies: Movie[];
  currentMovie: Movie | null;
  page: number;
  pages: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  filters: MovieFilters;
  scrapeLoading: boolean;
  scrapeError: string | null;
}

const initialState: MovieState = {
  movies: [],
  currentMovie: null,
  page: 1,
  pages: 1,
  total: 0,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    limit: 12,
    sortBy: 'releaseDate',
    sortOrder: 'desc',
  },
  scrapeLoading: false,
  scrapeError: null,
};

// Async thunks
export const fetchMovies = createAsyncThunk<MoviesResponse, MovieFilters | undefined, { rejectValue: string }>(
  'movies/fetchMovies',
  async (filters, { rejectWithValue }) => {
    try {
      return await getMovies(filters);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch movies');
    }
  }
);

export const fetchMovieById = createAsyncThunk<Movie, string, { rejectValue: string }>(
  'movies/fetchMovieById',
  async (id, { rejectWithValue }) => {
    try {
      return await getMovieById(id);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch movie');
    }
  }
);

export const addMovie = createAsyncThunk<Movie, CreateMovieData, { rejectValue: string }>(
  'movies/addMovie',
  async (movieData, { rejectWithValue }) => {
    try {
      return await createMovie(movieData);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to add movie');
    }
  }
);

export const editMovie = createAsyncThunk<Movie, { id: string; data: Partial<CreateMovieData> }, { rejectValue: string }>(
  'movies/editMovie',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateMovie(id, data);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to update movie');
    }
  }
);

export const removeMovie = createAsyncThunk<string, string, { rejectValue: string }>(
  'movies/removeMovie',
  async (id, { rejectWithValue }) => {
    try {
      await deleteMovie(id);
      return id;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to delete movie');
    }
  }
);

export const scrapeMovieFromImdb = createAsyncThunk<Movie, string, { rejectValue: string }>(
  'movies/scrapeImdb',
  async (imdbUrl, { rejectWithValue }) => {
    try {
      return await scrapeImdb(imdbUrl);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to scrape IMDb');
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<MovieFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    clearError: (state) => {
      state.error = null;
      state.scrapeError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch movies
    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action: PayloadAction<MoviesResponse>) => {
      state.isLoading = false;
      state.movies = action.payload.movies;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.total = action.payload.total;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to fetch movies';
    });

    // Fetch movie by ID
    builder.addCase(fetchMovieById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<Movie>) => {
      state.isLoading = false;
      state.currentMovie = action.payload;
    });
    builder.addCase(fetchMovieById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to fetch movie';
    });

    // Add movie
    builder.addCase(addMovie.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
      state.isLoading = false;
      state.movies.unshift(action.payload);
      state.total += 1;
    });
    builder.addCase(addMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to add movie';
    });

    // Edit movie
    builder.addCase(editMovie.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
      state.isLoading = false;
      const index = state.movies.findIndex(m => m._id === action.payload._id);
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
      if (state.currentMovie?._id === action.payload._id) {
        state.currentMovie = action.payload;
      }
    });
    builder.addCase(editMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to update movie';
    });

    // Remove movie
    builder.addCase(removeMovie.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeMovie.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.movies = state.movies.filter(m => m._id !== action.payload);
      state.total -= 1;
    });
    builder.addCase(removeMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to delete movie';
    });

    // Scrape IMDb
    builder.addCase(scrapeMovieFromImdb.pending, (state) => {
      state.scrapeLoading = true;
      state.scrapeError = null;
    });
    builder.addCase(scrapeMovieFromImdb.fulfilled, (state, action: PayloadAction<Movie>) => {
      state.scrapeLoading = false;
      state.movies.unshift(action.payload);
      state.total += 1;
    });
    builder.addCase(scrapeMovieFromImdb.rejected, (state, action) => {
      state.scrapeLoading = false;
      state.scrapeError = action.payload || 'Failed to scrape IMDb';
    });
  },
});

export const { setFilters, clearFilters, clearCurrentMovie, clearError } = movieSlice.actions;
export default movieSlice.reducer;
