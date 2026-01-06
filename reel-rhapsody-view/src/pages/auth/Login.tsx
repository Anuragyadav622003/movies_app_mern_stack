// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Box,
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   CircularProgress,
//   InputAdornment,
//   IconButton,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   MovieFilter as MovieIcon,
// } from '@mui/icons-material';
// import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
// import { login, clearError } from '@/features/auth/authSlice';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [validationErrors, setValidationErrors] = useState<{
//     email?: string;
//     password?: string;
//   }>({});

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//     };
//   }, [dispatch]);

//   const validateForm = () => {
//     const errors: { email?: string; password?: string } = {};
    
//     if (!formData.email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = 'Invalid email format';
//     }
    
//     if (!formData.password) {
//       errors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     dispatch(login(formData));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // Clear validation error when user starts typing
//     if (validationErrors[name as keyof typeof validationErrors]) {
//       setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Background Decoration */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '-50%',
//           right: '-20%',
//           width: '60%',
//           height: '150%',
//           background: 'radial-gradient(circle, rgba(229, 62, 62, 0.15) 0%, transparent 60%)',
//           pointerEvents: 'none',
//         }}
//       />
//       <Box
//         sx={{
//           position: 'absolute',
//           bottom: '-30%',
//           left: '-10%',
//           width: '40%',
//           height: '80%',
//           background: 'radial-gradient(circle, rgba(229, 62, 62, 0.1) 0%, transparent 60%)',
//           pointerEvents: 'none',
//         }}
//       />

//       <Container maxWidth="sm">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Box
//             sx={{
//               p: { xs: 3, sm: 5 },
//               borderRadius: 4,
//               background: 'rgba(20, 20, 20, 0.8)',
//               backdropFilter: 'blur(20px)',
//               border: '1px solid rgba(255, 255, 255, 0.05)',
//               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
//             }}
//           >
//             {/* Logo */}
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
//               >
//                 <MovieIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
//               </motion.div>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontWeight: 800,
//                   background: 'linear-gradient(135deg, #e53e3e 0%, #fc8181 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                 }}
//               >
//                 Welcome Back
//               </Typography>
//               <Typography color="text.secondary" sx={{ mt: 1 }}>
//                 Sign in to access your movie collection
//               </Typography>
//             </Box>

//             {/* Error Alert */}
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//               >
//                 <Alert severity="error" sx={{ mb: 3 }}>
//                   {error}
//                 </Alert>
//               </motion.div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={!!validationErrors.email}
//                 helperText={validationErrors.email}
//                 sx={{ mb: 3 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon sx={{ color: 'text.secondary' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={!!validationErrors.password}
//                 helperText={validationErrors.password}
//                 sx={{ mb: 4 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon sx={{ color: 'text.secondary' }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   size="large"
//                   disabled={isLoading}
//                   sx={{
//                     py: 1.5,
//                     fontSize: '1rem',
//                     fontWeight: 600,
//                     background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
//                     boxShadow: '0 4px 20px rgba(229, 62, 62, 0.4)',
//                     '&:hover': {
//                       boxShadow: '0 6px 30px rgba(229, 62, 62, 0.5)',
//                     },
//                   }}
//                 >
//                   {isLoading ? (
//                     <CircularProgress size={24} color="inherit" />
//                   ) : (
//                     'Sign In'
//                   )}
//                 </Button>
//               </motion.div>
//             </form>

//             {/* Register Link */}
//             <Box sx={{ textAlign: 'center', mt: 4 }}>
//               <Typography color="text.secondary">
//                 Don't have an account?{' '}
//                 <Link
//                   to="/register"
//                   style={{
//                     color: '#e53e3e',
//                     fontWeight: 600,
//                     textDecoration: 'none',
//                   }}
//                 >
//                   Sign Up
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default Login;



import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
  Chip,
  Snackbar,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  MovieFilter as MovieIcon,
  ContentCopy,
  Person,
  AdminPanelSettings,
  Check,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { login, clearError } from '@/features/auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [copyNotification, setCopyNotification] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    dispatch(login(formData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const fillDemoCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setFormData({
        email: 'admin@example.com',
        password: 'Admin@123'
      });
    } else {
      setFormData({
        email: 'user@example.com',
        password: 'User@123'
      });
    }
    // Clear any validation errors
    setValidationErrors({});
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyNotification(`${label} copied to clipboard!`);
    setTimeout(() => setCopyNotification(''), 3000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: 3,
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '60%',
          height: '150%',
          background: 'radial-gradient(circle, rgba(229, 62, 62, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '40%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(229, 62, 62, 0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: 'rgba(20, 20, 20, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Logo */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <MovieIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              </motion.div>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #e53e3e 0%, #fc8181 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                MovieDB Admin
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Sign in to manage your movie database
              </Typography>
            </Box>

            {/* Demo Credentials Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  mb: 3,
                  background: 'rgba(229, 62, 62, 0.05)',
                  border: '1px solid rgba(229, 62, 62, 0.15)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Corner Ribbon */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                    color: 'white',
                    padding: '4px 12px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  DEMO
                </Box>

                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AdminPanelSettings sx={{ fontSize: 20, color: 'error.main' }} />
                  Quick Login Credentials
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Click on any account to auto-fill the login form. These accounts have different access levels.
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Admin Credentials */}
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(229, 62, 62, 0.1) 0%, rgba(229, 62, 62, 0.05) 100%)',
                        border: '1px solid rgba(229, 62, 62, 0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(229, 62, 62, 0.15) 0%, rgba(229, 62, 62, 0.08) 100%)',
                          boxShadow: '0 4px 12px rgba(229, 62, 62, 0.2)',
                        },
                      }}
                      onClick={() => fillDemoCredentials('admin')}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <AdminPanelSettings sx={{ fontSize: 22, color: 'error.main' }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'error.main' }}>
                            Administrator Account
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Full access to all features including IMDb scraping
                          </Typography>
                        </Box>
                        <Chip
                          label="Recommended"
                          size="small"
                          sx={{
                            height: 24,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: 'rgba(229, 62, 62, 0.2)',
                            color: '#e53e3e',
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Email:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                              admin@example.com
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard('admin@example.com', 'Admin email');
                              }}
                              sx={{ p: 0.5 }}
                            >
                              <ContentCopy sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Password:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                              Admin@123
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard('Admin@123', 'Admin password');
                              }}
                              sx={{ p: 0.5 }}
                            >
                              <ContentCopy sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* User Credentials */}
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 100%)',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
                        },
                      }}
                      onClick={() => fillDemoCredentials('user')}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <Person sx={{ fontSize: 22, color: 'primary.main' }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            Regular User Account
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Limited access - can view movies only
                          </Typography>
                        </Box>
                        <Chip
                          label="View Only"
                          size="small"
                          sx={{
                            height: 24,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: 'rgba(59, 130, 246, 0.2)',
                            color: '#3b82f6',
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Email:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                              user@example.com
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard('user@example.com', 'User email');
                              }}
                              sx={{ p: 0.5 }}
                            >
                              <ContentCopy sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Password:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                              User@123
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard('User@123', 'User password');
                              }}
                              sx={{ p: 0.5 }}
                            >
                              <ContentCopy sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
                
                <Divider sx={{ my: 3, opacity: 0.2 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', flex: 1 }}>
                    💡 <strong>Admin Tip:</strong> Use the admin account to test IMDb scraping and all admin features.
                  </Typography>
                </Box>
              </Paper>
            </motion.div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {error}
                  </Typography>
                </Alert>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!validationErrors.password}
                helperText={validationErrors.password}
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                    boxShadow: '0 4px 20px rgba(229, 62, 62, 0.4)',
                    borderRadius: 2,
                    '&:hover': {
                      boxShadow: '0 6px 30px rgba(229, 62, 62, 0.5)',
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Sign In as Admin'
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Register Link */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography color="text.secondary" variant="body2">
                Need a personal account?{' '}
                <Link
                  to="/register"
                  style={{
                    color: '#e53e3e',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Copy Notification */}
      <Snackbar
        open={!!copyNotification}
        autoHideDuration={3000}
        onClose={() => setCopyNotification('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          icon={<Check fontSize="small" />}
          severity="success"
          sx={{ 
            background: 'rgba(20, 20, 20, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(229, 62, 62, 0.3)',
          }}
        >
          {copyNotification}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;