import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, TextField, Button, Chip, Alert, CircularProgress } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { addMovie } from '@/features/movies/movieSlice';

const AddMovie = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.movies);
  const [formData, setFormData] = useState({ title: '', description: '', releaseDate: '', duration: '', director: '', posterUrl: '', rating: '' });
  const [genres, setGenres] = useState<string[]>([]);
  const [cast, setCast] = useState<string[]>([]);
  const [genreInput, setGenreInput] = useState('');
  const [castInput, setCastInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const movieData = { ...formData, duration: parseInt(formData.duration), rating: parseFloat(formData.rating) || undefined, genre: genres, cast };
    const result = await dispatch(addMovie(movieData));
    if (!result.type.includes('rejected')) navigate('/admin/movies');
  };

  const addGenre = () => { if (genreInput.trim() && !genres.includes(genreInput.trim())) { setGenres([...genres, genreInput.trim()]); setGenreInput(''); } };
  const addCastMember = () => { if (castInput.trim() && !cast.includes(castInput.trim())) { setCast([...cast, castInput.trim()]); setCastInput(''); } };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 4, maxWidth: 800 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>Add New Movie</Typography>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'grid', gap: 3 }}>
              <TextField label="Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <TextField label="Description" multiline rows={4} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField label="Release Date" type="date" required InputLabelProps={{ shrink: true }} value={formData.releaseDate} onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })} />
                <TextField label="Duration (minutes)" type="number" required value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
              </Box>
              <TextField label="Director" required value={formData.director} onChange={(e) => setFormData({ ...formData, director: e.target.value })} />
              <TextField label="Poster URL" required value={formData.posterUrl} onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })} />
              <TextField label="Rating (0-10)" type="number" inputProps={{ step: 0.1, min: 0, max: 10 }} value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
              
              <Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}><TextField size="small" placeholder="Add genre" value={genreInput} onChange={(e) => setGenreInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())} /><Button onClick={addGenre}><AddIcon /></Button></Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{genres.map((g) => <Chip key={g} label={g} onDelete={() => setGenres(genres.filter(x => x !== g))} />)}</Box>
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}><TextField size="small" placeholder="Add cast member" value={castInput} onChange={(e) => setCastInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCastMember())} /><Button onClick={addCastMember}><AddIcon /></Button></Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{cast.map((c) => <Chip key={c} label={c} onDelete={() => setCast(cast.filter(x => x !== c))} />)}</Box>
              </Box>

              <Button type="submit" variant="contained" size="large" disabled={isLoading} sx={{ mt: 2 }}>{isLoading ? <CircularProgress size={24} /> : 'Add Movie'}</Button>
            </Box>
          </form>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AddMovie;
