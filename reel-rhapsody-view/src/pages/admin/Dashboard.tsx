import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Movie as MovieIcon, Add as AddIcon, TrendingUp as TrendingIcon, CloudDownload as ScrapeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useAppSelector } from '@/hooks/useRedux';

const Dashboard = () => {
  const { total } = useAppSelector((state) => state.movies);
  const [stats] = useState({ movies: total || 0, genres: 18, recentAdds: 12 });

  const statCards = [
    { title: 'Total Movies', value: stats.movies, icon: MovieIcon, color: '#e53e3e' },
    { title: 'Genres', value: stats.genres, icon: TrendingIcon, color: '#f6e05e' },
    { title: 'Recent Additions', value: stats.recentAdds, icon: AddIcon, color: '#68d391' },
  ];

  const quickActions = [
    { label: 'Add New Movie', path: '/admin/add-movie', icon: AddIcon, color: 'primary' },
    { label: 'IMDb Scraper', path: '/admin/scrape', icon: ScrapeIcon, color: 'secondary' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 4 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>Dashboard</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>Manage your movie collection</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
            {statCards.map((stat, index) => (
              <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card sx={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: `${stat.color}20` }}><stat.icon sx={{ fontSize: 32, color: stat.color }} /></Box>
                    <Box><Typography variant="h3" fontWeight={700}>{stat.value}</Typography><Typography color="text.secondary">{stat.title}</Typography></Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Quick Actions</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {quickActions.map((action) => (
              <Button key={action.label} component={Link} to={action.path} variant="contained" startIcon={<action.icon />} color={action.color as 'primary' | 'secondary'} sx={{ px: 3, py: 1.5 }}>{action.label}</Button>
            ))}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Dashboard;
