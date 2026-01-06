import { Box, Container, Typography, IconButton, Link as MuiLink } from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  MovieFilter as MovieIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Logo & Copyright */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MovieIcon sx={{ color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} CineVault. All rights reserved.
            </Typography>
          </Box>

          {/* Links */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{ fontSize: '0.875rem', '&:hover': { color: 'primary.main' } }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{ fontSize: '0.875rem', '&:hover': { color: 'primary.main' } }}
            >
              Terms of Service
            </MuiLink>
            <MuiLink
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{ fontSize: '0.875rem', '&:hover': { color: 'primary.main' } }}
            >
              Contact
            </MuiLink>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              href='https://www.linkedin.com/in/anurag-yadav-3704b1239/'
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
