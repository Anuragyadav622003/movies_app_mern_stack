import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import Home from '@/pages/user/Home';
import Search from '@/pages/user/Search';
import MovieDetails from '@/pages/user/MovieDetails';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Dashboard from '@/pages/admin/Dashboard';
import AddMovie from '@/pages/admin/AddMovie';
import ManageMovies from '@/pages/admin/ManageMovies';
import ImdbScraper from '@/pages/admin/ImdbScraper';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected User Routes */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/admin/movies" element={<AdminRoute><ManageMovies /></AdminRoute>} />
      <Route path="/admin/add-movie" element={<AdminRoute><AddMovie /></AdminRoute>} />
      <Route path="/admin/scrape" element={<AdminRoute><ImdbScraper /></AdminRoute>} />
      
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
