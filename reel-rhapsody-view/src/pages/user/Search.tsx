import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Slider, Chip, Pagination, Alert, IconButton, Collapse, Button } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, Clear as ClearIcon, Sort as SortIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchMovies, setFilters, clearFilters } from '@/features/movies/movieSlice';
import MovieCard, { MovieCardSkeleton } from '@/components/MovieCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const GENRES = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'];
const SORT_OPTIONS = [{ value: 'releaseDate', label: 'Release Date' }, { value: 'rating', label: 'Rating' }, { value: 'title', label: 'Title' }, { value: 'duration', label: 'Duration' }];
const YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

const Search = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading, error, page, pages, filters } = useAppSelector((state) => state.movies);
  const [searchTerm, setSearchTerm] = useState(filters.keyword || '');
  const [showFilters, setShowFilters] = useState(false);
  const [ratingRange, setRatingRange] = useState<number[]>([filters.minRating || 0, filters.maxRating || 10]);

  useEffect(() => { dispatch(fetchMovies(filters)); }, [dispatch, filters]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); dispatch(setFilters({ ...filters, keyword: searchTerm, page: 1 })); };
  const handleGenreChange = (genre: string) => { dispatch(setFilters({ ...filters, genre: filters.genre === genre ? undefined : genre, page: 1 })); };
  const handleYearChange = (year: string) => { dispatch(setFilters({ ...filters, year, page: 1 })); };
  const handleSortChange = (sortBy: string) => { dispatch(setFilters({ ...filters, sortBy: sortBy as typeof filters.sortBy, page: 1 })); };
  const handleSortOrderChange = () => { dispatch(setFilters({ ...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc', page: 1 })); };
  const handleRatingChange = (_: Event, newValue: number | number[]) => { setRatingRange(newValue as number[]); };
  const handleRatingCommit = () => { dispatch(setFilters({ ...filters, minRating: ratingRange[0], maxRating: ratingRange[1], page: 1 })); };
  const handleClearFilters = () => { setSearchTerm(''); setRatingRange([0, 10]); dispatch(clearFilters()); };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => { dispatch(setFilters({ ...filters, page: value })); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const hasActiveFilters = filters.keyword || filters.genre || filters.year || filters.minRating !== undefined || filters.maxRating !== undefined;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ pt: '100px', pb: 4, flex: 1 }}>
        <Container maxWidth="xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, background: 'linear-gradient(135deg, #ffffff 0%, #a0aec0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Search Movies</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>Find your next favorite movie from our extensive collection</Typography>

            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
              <TextField fullWidth placeholder="Search by title, director, cast..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary' }} /></InputAdornment>, endAdornment: searchTerm && <InputAdornment position="end"><IconButton size="small" onClick={() => { setSearchTerm(''); dispatch(setFilters({ ...filters, keyword: undefined, page: 1 })); }}><ClearIcon fontSize="small" /></IconButton></InputAdornment> }} />
              <Button type="submit" variant="contained" sx={{ px: 4, minWidth: { xs: '100%', md: 'auto' }, background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)' }}>Search</Button>
              <Button variant="outlined" onClick={() => setShowFilters(!showFilters)} startIcon={<FilterIcon />} sx={{ minWidth: { xs: '100%', md: 'auto' }, borderColor: showFilters ? 'primary.main' : 'rgba(255,255,255,0.2)' }}>Filters</Button>
            </Box>

            <Collapse in={showFilters}>
              <Box sx={{ p: 3, mb: 4, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Genres</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {GENRES.map((genre) => <Chip key={genre} label={genre} onClick={() => handleGenreChange(genre)} sx={{ backgroundColor: filters.genre === genre ? 'primary.main' : 'rgba(255, 255, 255, 0.05)', color: filters.genre === genre ? 'white' : 'text.secondary', '&:hover': { backgroundColor: filters.genre === genre ? 'primary.dark' : 'rgba(255, 255, 255, 0.1)' } }} />)}
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                  <FormControl size="small"><InputLabel>Year</InputLabel><Select value={filters.year || ''} onChange={(e) => handleYearChange(e.target.value)} label="Year"><MenuItem value="">All Years</MenuItem>{YEARS.map((year) => <MenuItem key={year} value={year.toString()}>{year}</MenuItem>)}</Select></FormControl>
                  <FormControl size="small"><InputLabel>Sort By</InputLabel><Select value={filters.sortBy || 'releaseDate'} onChange={(e) => handleSortChange(e.target.value)} label="Sort By">{SORT_OPTIONS.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}</Select></FormControl>
                  <Button variant="outlined" onClick={handleSortOrderChange} startIcon={<SortIcon sx={{ transform: filters.sortOrder === 'asc' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />} sx={{ height: 40, borderColor: 'rgba(255,255,255,0.2)' }}>{filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}</Button>
                  <Box><Typography variant="subtitle2" sx={{ mb: 1 }}>Rating: {ratingRange[0]} - {ratingRange[1]}</Typography><Slider value={ratingRange} onChange={handleRatingChange} onChangeCommitted={handleRatingCommit} valueLabelDisplay="auto" min={0} max={10} step={0.5} /></Box>
                </Box>
                {hasActiveFilters && <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}><Button variant="text" color="error" startIcon={<ClearIcon />} onClick={handleClearFilters}>Clear All Filters</Button></Box>}
              </Box>
            </Collapse>

            {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
            {!isLoading && movies.length > 0 && <Typography color="text.secondary" sx={{ mb: 3 }}>Found {movies.length} movies</Typography>}

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }, gap: 3 }}>
              {isLoading ? Array.from({ length: 12 }).map((_, index) => <MovieCardSkeleton key={index} />) : movies.map((movie, index) => <MovieCard key={movie._id} movie={movie} index={index} />)}
            </Box>

            {!isLoading && movies.length === 0 && <Box sx={{ textAlign: 'center', py: 8 }}><SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} /><Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>No movies found</Typography><Typography color="text.secondary" sx={{ mb: 3 }}>Try adjusting your search or filters</Typography><Button variant="outlined" onClick={handleClearFilters}>Clear Filters</Button></Box>}
            {pages > 1 && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}><Pagination count={pages} page={page} onChange={handlePageChange} color="primary" size="large" /></Box>}
          </motion.div>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Search;
