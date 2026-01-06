import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  Typography,
  Divider,
  useScrollTrigger,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  MovieFilter as MovieIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { logout } from '@/features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isAdmin, user } = useAppSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Search', path: '/search' },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={trigger ? 4 : 0}
      sx={{
        backgroundColor: trigger ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 70 }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-2 no-underline">
              <MovieIcon sx={{ color: 'primary.main', fontSize: 36 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #e53e3e 0%, #fc8181 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                CineVault
              </Typography>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 6, gap: 1 }}>
            {navLinks.map((link) => (
              <motion.div key={link.path} whileHover={{ y: -2 }}>
                <Button
                  component={Link}
                  to={link.path}
                  sx={{
                    color: isActive(link.path) ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive(link.path) ? 700 : 500,
                    px: 2,
                    py: 1,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive(link.path) ? '60%' : 0,
                      height: 2,
                      backgroundColor: 'primary.main',
                      borderRadius: 1,
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60%',
                    },
                  }}
                >
                  {link.label}
                </Button>
              </motion.div>
            ))}
            {isAdmin && (
              <motion.div whileHover={{ y: -2 }}>
                <Button
                  component={Link}
                  to="/admin"
                  startIcon={<DashboardIcon />}
                  sx={{
                    color: isActive('/admin') ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive('/admin') ? 700 : 500,
                    px: 2,
                    py: 1,
                  }}
                >
                  Admin
                </Button>
              </motion.div>
            )}
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search Icon */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                component={Link}
                to="/search"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <SearchIcon />
              </IconButton>
            </motion.div>

            {isAuthenticated ? (
              <>
                {/* User Menu */}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 1 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'primary.main',
                        fontWeight: 600,
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </motion.div>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                    {isAdmin && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'inline-block',
                          mt: 0.5,
                          px: 1,
                          py: 0.25,
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderRadius: 1,
                          fontWeight: 600,
                        }}
                      >
                        Admin
                      </Typography>
                    )}
                  </Box>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  {isAdmin && (
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate('/admin');
                      }}
                    >
                      <DashboardIcon sx={{ mr: 1.5, fontSize: 20 }} />
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={handleLogout}
                    sx={{ color: 'error.main' }}
                  >
                    <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="text"
                  sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'flex' } }}
                >
                  Login
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </>
            )}

            {/* Mobile Menu */}
            <IconButton
              onClick={handleMobileMenuOpen}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
                },
              }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.path}
                  onClick={() => {
                    handleMobileMenuClose();
                    navigate(link.path);
                  }}
                >
                  {link.label}
                </MenuItem>
              ))}
              {isAdmin && (
                <MenuItem
                  onClick={() => {
                    handleMobileMenuClose();
                    navigate('/admin');
                  }}
                >
                  <DashboardIcon sx={{ mr: 1.5, fontSize: 20 }} />
                  Admin Dashboard
                </MenuItem>
              )}
              <Divider />
              {!isAuthenticated && (
                <>
                  <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/login'); }}>
                    <PersonIcon sx={{ mr: 1.5, fontSize: 20 }} />
                    Login
                  </MenuItem>
                  <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/register'); }}>
                    Sign Up
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
