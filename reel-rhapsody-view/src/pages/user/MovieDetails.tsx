// import { useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Box, Container, Typography, Button, Chip, Skeleton, IconButton } from '@mui/material';
// import { ArrowBack as BackIcon, Star as StarIcon, AccessTime as TimeIcon, CalendarMonth as CalendarIcon, Person as PersonIcon, PlayArrow as PlayIcon } from '@mui/icons-material';
// import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
// import { fetchMovieById, clearCurrentMovie } from '@/features/movies/movieSlice';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';

// const MovieDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { currentMovie: movie, isLoading, error } = useAppSelector((state) => state.movies);

//   useEffect(() => { if (id) dispatch(fetchMovieById(id)); return () => { dispatch(clearCurrentMovie()); }; }, [id, dispatch]);

//   const formatDuration = (minutes: number) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
//   const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   if (error) return (
//     <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}><Navbar /><Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Box sx={{ textAlign: 'center' }}><Typography variant="h5" color="error" sx={{ mb: 2 }}>{error}</Typography><Button component={Link} to="/" variant="contained" startIcon={<BackIcon />}>Back to Home</Button></Box></Box></Box>
//   );

//   return (
//     <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <Navbar />
//       <Box sx={{ position: 'relative', minHeight: { xs: '50vh', md: '70vh' }, mt: '70px' }}>
//         {isLoading ? <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} /> : movie?.backdropUrl && <Box component="img" src={movie.backdropUrl} alt="" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />}
//         <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.4) 100%)' }} />
//         <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,10,0.9) 0%, transparent 60%)' }} />
//         <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}><motion.div whileHover={{ x: -5 }}><IconButton onClick={() => navigate(-1)} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } }}><BackIcon /></IconButton></motion.div></Box>

//         <Container maxWidth="xl" sx={{ position: 'relative', height: '100%', zIndex: 1 }}>
//           <Box sx={{ position: 'absolute', bottom: { xs: 20, md: 60 }, left: 0, right: 0, px: { xs: 2, md: 3 } }}>
//             <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '200px 1fr', md: '250px 1fr' }, gap: 4, alignItems: 'end' }}>
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//                 {isLoading ? <Skeleton variant="rectangular" sx={{ width: '100%', paddingTop: '150%', borderRadius: 3 }} /> : <Box component="img" src={movie?.posterUrl || '/placeholder.svg'} alt={movie?.title} sx={{ width: '100%', borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />}
//               </motion.div>
//               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
//                 {isLoading ? <><Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} /><Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} /></> : movie && <>
//                   <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }, mb: 2, lineHeight: 1.1 }}>{movie.title}</Typography>
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 0.5, borderRadius: 1, background: 'linear-gradient(135deg, #f6e05e 0%, #d69e2e 100%)' }}><StarIcon sx={{ fontSize: 18, color: '#1a202c' }} /><Typography fontWeight={700} sx={{ color: '#1a202c' }}>{movie.rating?.toFixed(1)}</Typography></Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><TimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} /><Typography color="text.secondary">{formatDuration(movie.duration)}</Typography></Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><CalendarIcon sx={{ fontSize: 18, color: 'text.secondary' }} /><Typography color="text.secondary">{formatDate(movie.releaseDate)}</Typography></Box>
//                   </Box>
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>{movie.genre?.map((genre) => <Chip key={genre} label={genre} size="small" sx={{ backgroundColor: 'rgba(229, 62, 62, 0.2)', color: '#fc8181', border: '1px solid rgba(229, 62, 62, 0.3)', fontWeight: 500 }} />)}</Box>
//                   {movie.trailerUrl && <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button variant="contained" size="large" startIcon={<PlayIcon />} href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" sx={{ px: 4, py: 1.5, background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)', boxShadow: '0 4px 20px rgba(229, 62, 62, 0.4)' }}>Watch Trailer</Button></motion.div>}
//                 </>}
//               </motion.div>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//       <Box sx={{ py: 6, flex: 1 }}>
//         <Container maxWidth="xl">
//           <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
//               <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Storyline</Typography>
//               {isLoading ? <><Skeleton variant="text" width="100%" /><Skeleton variant="text" width="100%" /><Skeleton variant="text" width="80%" /></> : <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>{movie?.description}</Typography>}
//             </motion.div>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
//               <Box sx={{ mb: 4 }}><Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Director</Typography>{isLoading ? <Skeleton variant="text" width="60%" /> : <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PersonIcon sx={{ color: 'primary.main' }} /><Typography>{movie?.director}</Typography></Box>}</Box>
//               <Box><Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Cast</Typography>{isLoading ? <><Skeleton variant="text" width="50%" /><Skeleton variant="text" width="60%" /></> : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{movie?.cast?.map((actor) => <Chip key={actor} label={actor} variant="outlined" size="small" sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.secondary' }} />)}</Box>}</Box>
//             </motion.div>
//           </Box>
//         </Container>
//       </Box>
//       <Footer />
//     </Box>
//   );
// };

// export default MovieDetails;





import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Skeleton,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchMovieById, clearCurrentMovie } from '@/features/movies/movieSlice';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentMovie: movie, isLoading, error } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }

    return () => {
      dispatch(clearCurrentMovie());
    };
  }, [id, dispatch]);

  const formatDuration = (minutes: number) =>
    `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  if (error) {
    return (
      <Box minHeight="100vh">
        <Navbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
          flexDirection="column"
        >
          <Typography color="error" variant="h5" mb={2}>
            {error}
          </Typography>
          <Button
            variant="contained"
            startIcon={<BackIcon />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />

      {/* HERO SECTION */}
      <Box
        sx={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,1))',
          pt: 10,
          pb: 6,
        }}
      >
        <Container maxWidth="xl">
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ mb: 3, color: 'white' }}
          >
            <BackIcon />
          </IconButton>

          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '300px 1fr' }}
            gap={5}
          >
            {/* POSTER */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: '100%', height: 450, borderRadius: 3 }}
                />
              ) : (
                <Box
                  component="img"
                  src={movie?.posterUrl}
                  alt={movie?.title}
                  sx={{
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  }}
                />
              )}
            </motion.div>

            {/* DETAILS */}
            <Box>
              {isLoading ? (
                <>
                  <Skeleton width="60%" height={60} />
                  <Skeleton width="40%" />
                </>
              ) : (
                <>
                  <Typography variant="h3" fontWeight={800} mb={1}>
                    {movie?.title}
                  </Typography>

                  <Box display="flex" gap={3} alignItems="center" mb={2}>
                    <Box display="flex" gap={0.5} alignItems="center">
                      <StarIcon sx={{ color: '#facc15' }} />
                      <Typography>{movie?.rating}</Typography>
                    </Box>

                    <Box display="flex" gap={0.5} alignItems="center">
                      <TimeIcon />
                      <Typography>
                        {movie && formatDuration(movie.duration)}
                      </Typography>
                    </Box>

                    <Box display="flex" gap={0.5} alignItems="center">
                      <CalendarIcon />
                      <Typography>
                        {movie && formatDate(movie.releaseDate)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                    {movie?.genres.map((g) => (
                      <Chip key={g} label={g} color="error" variant="outlined" />
                    ))}
                  </Box>

                  <Typography color="text.secondary" lineHeight={1.8}>
                    {movie?.description}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* EXTRA DETAILS */}
      <Container maxWidth="xl" sx={{ py: 6, flex: 1 }}>
        <Divider sx={{ mb: 4 }} />

        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={4}
        >
          <Box>
            <Typography variant="h6" mb={1}>
              Director
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <PersonIcon />
              <Typography>{movie?.director}</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" mb={1}>
              Cast
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {movie?.cast.map((actor) => (
                <Chip key={actor} label={actor} />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6">IMDb ID</Typography>
            <Typography>{movie?.imdbId}</Typography>
          </Box>

    

          <Box>
            <Typography variant="h6">Created At</Typography>
            <Typography>
              {movie && formatDate(movie.createdAt)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">Updated At</Typography>
            <Typography>
              {movie && formatDate(movie.updatedAt)}
            </Typography>
          </Box>

        
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default MovieDetails;
