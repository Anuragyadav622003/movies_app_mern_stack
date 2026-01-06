import axiosInstance from './axios';

export interface Movie {
  _id: string;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  genre: string[];
  director: string;
  cast: string[];
  rating: number;
  posterUrl: string;
  backdropUrl?: string;
  trailerUrl?: string;
  imdbId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoviesResponse {
  movies: Movie[];
  page: number;
  pages: number;
  total: number;
}

export interface MovieFilters {
  keyword?: string;
  genre?: string;
  year?: string;
  minRating?: number;
  maxRating?: number;
  sortBy?: 'title' | 'rating' | 'releaseDate' | 'duration';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CreateMovieData {
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  genre: string[];
  director: string;
  cast: string[];
  rating?: number;
  posterUrl: string;
  backdropUrl?: string;
  trailerUrl?: string;
}

// Get all movies with pagination, search, and filters
export const getMovies = async (filters: MovieFilters = {}): Promise<MoviesResponse> => {
  const params = new URLSearchParams();
  
  if (filters.keyword) params.append('keyword', filters.keyword);
  if (filters.genre) params.append('genre', filters.genre);
  if (filters.year) params.append('year', filters.year);
  if (filters.minRating !== undefined) params.append('minRating', filters.minRating.toString());
  if (filters.maxRating !== undefined) params.append('maxRating', filters.maxRating.toString());
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const response = await axiosInstance.get<MoviesResponse>(`/movies?${params.toString()}`);
  return response.data;
};

// Get single movie by ID
export const getMovieById = async (id: string): Promise<Movie> => {
  const response = await axiosInstance.get<Movie>(`/movies/${id}`);
  return response.data;
};

// Create new movie (admin only)
export const createMovie = async (movieData: CreateMovieData): Promise<Movie> => {
  const response = await axiosInstance.post<Movie>('/admin/movies', movieData);
  return response.data;
};

// Update movie (admin only)
export const updateMovie = async (id: string, movieData: Partial<CreateMovieData>): Promise<Movie> => {
  const response = await axiosInstance.put<Movie>(`/admin/movies/${id}`, movieData);
  return response.data;
};

// Delete movie (admin only)
export const deleteMovie = async (id: string): Promise<{ message: string }> => {
  const response = await axiosInstance.delete<{ message: string }>(`/admin/movies/${id}`);
  return response.data;
};

// Scrape movie from IMDb (admin only)
export const scrapeImdb = async (imdbUrl: string): Promise<Movie> => {
  const response = await axiosInstance.post<Movie>('/admin/movies/scrape-imdb', { imdbUrl });
  return response.data;
};

// Get available genres
export const getGenres = async (): Promise<string[]> => {
  const response = await axiosInstance.get<string[]>('/movies/genres');
  return response.data;
};

// Get movies count (admin dashboard)
export const getMoviesCount = async (): Promise<{ count: number }> => {
  const response = await axiosInstance.get<{ count: number }>('/admin/movies/count');
  return response.data;
};
