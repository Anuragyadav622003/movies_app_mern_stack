import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, TextField, Button, Alert, CircularProgress, Card, CardContent } from '@mui/material';
import { CloudDownload as ScrapeIcon, CheckCircle as SuccessIcon } from '@mui/icons-material';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { scrapeMovieFromImdb } from '@/features/movies/movieSlice';

const ImdbScraper = () => {
  const dispatch = useAppDispatch();
  const { scrapeLoading, scrapeError } = useAppSelector((state) => state.movies);
  const [imdbUrl, setImdbUrl] = useState('');
  const [success, setSuccess] = useState(false);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imdbUrl.includes('imdb.com')) { alert('Please enter a valid IMDb URL'); return; }
    setSuccess(false);
    const result = await dispatch(scrapeMovieFromImdb(imdbUrl));
    if (!result.type.includes('rejected')) { setSuccess(true); setImdbUrl(''); }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 4, maxWidth: 600 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>IMDb Scraper</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>Import movies directly from IMDb by entering the movie URL</Typography>
          
          {scrapeError && <Alert severity="error" sx={{ mb: 3 }}>{scrapeError}</Alert>}
          {success && <Alert severity="success" icon={<SuccessIcon />} sx={{ mb: 3 }}>Movie imported successfully!</Alert>}
          
          <Card sx={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <CardContent>
              <form onSubmit={handleScrape}>
                <TextField fullWidth label="IMDb Movie URL" placeholder="https://www.imdb.com/title/tt0111161/" value={imdbUrl} onChange={(e) => setImdbUrl(e.target.value)} sx={{ mb: 3 }} />
                <Button type="submit" variant="contained" fullWidth size="large" startIcon={scrapeLoading ? <CircularProgress size={20} /> : <ScrapeIcon />} disabled={scrapeLoading || !imdbUrl}>
                  {scrapeLoading ? 'Scraping...' : 'Import from IMDb'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ImdbScraper;
