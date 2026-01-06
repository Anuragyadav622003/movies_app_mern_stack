import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button, Chip, Alert } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchMovies, removeMovie } from '@/features/movies/movieSlice';

const ManageMovies = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading, error } = useAppSelector((state) => state.movies);

  useEffect(() => { dispatch(fetchMovies({ limit: 50 })); }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      dispatch(removeMovie(id));
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 4 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={800}>Manage Movies</Typography>
            <Button component={Link} to="/admin/add-movie" variant="contained" startIcon={<AddIcon />}>Add Movie</Button>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          <Box sx={{ background: 'rgba(255,255,255,0.03)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', overflow: 'auto' }}>
            <Table>
              <TableHead><TableRow><TableCell>Title</TableCell><TableCell>Rating</TableCell><TableCell>Genre</TableCell><TableCell>Release</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie._id} sx={{ '&:hover': { bgcolor: 'rgba(229,62,62,0.05)' } }}>
                    <TableCell><Typography fontWeight={600}>{movie.title}</Typography></TableCell>
                    <TableCell><Chip label={movie.rating?.toFixed(1)} size="small" sx={{ bgcolor: 'secondary.main', color: '#1a202c' }} /></TableCell>
                    <TableCell>{movie.genre?.slice(0, 2).join(', ')}</TableCell>
                    <TableCell>{new Date(movie.releaseDate).getFullYear()}</TableCell>
                    <TableCell align="right">
                      <IconButton component={Link} to={`/admin/edit-movie/${movie._id}`} size="small"><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDelete(movie._id)} size="small" color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ManageMovies;
