import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Drawer,
  List,
  Typography,
  IconButton,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Movie as MovieIcon,
  Add as AddIcon,
  CloudDownload as ScrapeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { logout } from '@/features/auth/authSlice';
import AdminNavLink from './AdminNavLink';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 80;

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', icon: DashboardIcon, label: 'Dashboard' },
    { to: '/admin/movies', icon: MovieIcon, label: 'Manage Movies' },
    { to: '/admin/add-movie', icon: AddIcon, label: 'Add Movie' },
    { to: '/admin/scrape', icon: ScrapeIcon, label: 'IMDb Scraper' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, rgba(15, 15, 15, 0.98) 0%, rgba(10, 10, 10, 1) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'width 0.3s ease',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            minHeight: 70,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #e53e3e 0%, #fc8181 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Admin Panel
              </Typography>
            </motion.div>
          )}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
          <List disablePadding>
            {navItems.map((item) => (
              <AdminNavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                collapsed={collapsed}
              />
            ))}
          </List>

          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.05)' }} />

          {/* Back to Site */}
          <AdminNavLink
            to="/"
            icon={HomeIcon}
            label="Back to Site"
            collapsed={collapsed}
          />
        </Box>

        {/* User Section */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 40,
                height: 40,
                fontWeight: 600,
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            {!collapsed && (
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Administrator
                </Typography>
              </Box>
            )}
          </Box>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <IconButton
              onClick={handleLogout}
              sx={{
                width: '100%',
                borderRadius: 2,
                py: 1,
                color: 'error.main',
                backgroundColor: 'rgba(229, 62, 62, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(229, 62, 62, 0.2)',
                },
              }}
            >
              <LogoutIcon sx={{ mr: collapsed ? 0 : 1 }} />
              {!collapsed && (
                <Typography variant="body2" fontWeight={500}>
                  Logout
                </Typography>
              )}
            </IconButton>
          </motion.div>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
