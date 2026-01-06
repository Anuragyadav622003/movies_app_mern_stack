import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Button, Pagination, Alert } from '@mui/material';
import { PlayArrow as PlayIcon, Search as SearchIcon, Star as StarIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchMovies, setFilters } from '@/features/movies/movieSlice';
import MovieCard, { MovieCardSkeleton } from '@/components/MovieCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading, error, page, pages, filters } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies(filters));
  }, [dispatch, filters]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setFilters({ ...filters, page: value }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredMovie = movies?.length > 0 ? movies[0] : null;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ position: 'relative', minHeight: { xs: '60vh', md: '80vh' }, display: 'flex', alignItems: 'center', overflow: 'hidden', mt: '70px' }}>
        {featuredMovie?.backdropUrl && (
          <Box component="img" src={featuredMovie.backdropUrl} alt="" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        )}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.4) 100%)' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)' }} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ maxWidth: { xs: '100%', md: '60%' } }}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2, mb: 2, display: 'block' }}>WELCOME TO CINEVAULT</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }, fontWeight: 800, lineHeight: 1.1, mb: 3, background: 'linear-gradient(135deg, #ffffff 0%, #a0aec0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Discover Your Next<br />
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #e53e3e 0%, #fc8181 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Favorite Movie</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 500, mb: 4, lineHeight: 1.7 }}>
                Explore thousands of movies, get personalized recommendations, and never miss a must-watch film again.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button component={Link} to="/search" variant="contained" size="large" startIcon={<SearchIcon />} sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 600, background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)', boxShadow: '0 4px 20px rgba(229, 62, 62, 0.4)' }}>Browse Movies</Button>
                </motion.div>
                {featuredMovie && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button component={Link} to={`/movie/${featuredMovie._id}`} variant="outlined" size="large" startIcon={<PlayIcon />} sx={{ px: 4, py: 1.5, fontSize: '1rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(229, 62, 62, 0.1)' } }}>Featured Film</Button>
                  </motion.div>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 4, mt: 6, flexWrap: 'wrap' }}>
                <Box><Typography variant="h4" fontWeight={700} color="primary.main">10K+</Typography><Typography variant="body2" color="text.secondary">Movies</Typography></Box>
                <Box><Typography variant="h4" fontWeight={700} color="primary.main">50+</Typography><Typography variant="body2" color="text.secondary">Genres</Typography></Box>
                <Box><Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><StarIcon sx={{ color: 'secondary.main', fontSize: 28 }} /><Typography variant="h4" fontWeight={700} color="secondary.main">4.9</Typography></Box><Typography variant="body2" color="text.secondary">User Rating</Typography></Box>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Movies Section */}
      <Box sx={{ py: 8, flex: 1 }}>
        <Container maxWidth="xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box><Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>Latest Movies</Typography><Typography variant="body2" color="text.secondary">Discover the newest additions to our collection</Typography></Box>
              <Button component={Link} to="/search" variant="text" sx={{ color: 'primary.main', fontWeight: 600 }}>View All →</Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }, gap: 3 }}>
              {isLoading ? Array.from({ length: 12 }).map((_, index) => <MovieCardSkeleton key={index} />) : movies?.map((movie, index) => <MovieCard key={movie._id} movie={movie} index={index} />)}
            </Box>

            {!isLoading && movies?.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}><Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>No movies found</Typography><Typography color="text.secondary">Check back later for new additions!</Typography></Box>
            )}

            {pages > 1 && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}><Pagination count={pages} page={page} onChange={handlePageChange} color="primary" size="large" /></Box>}
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
