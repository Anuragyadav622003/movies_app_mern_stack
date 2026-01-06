import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Chip, Skeleton } from '@mui/material';
import { Star as StarIcon, AccessTime as TimeIcon } from '@mui/icons-material';
import { Movie } from '@/api/movie.api';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  // Format duration to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Get year from release date
  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/movie/${movie._id}`} className="block no-underline">
        <Box
          className="movie-card group"
          sx={{
            position: 'relative',
            aspectRatio: '2/3',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'card',
            cursor: 'pointer',
          }}
        >
          {/* Poster Image */}
          <Box
            component="img"
            src={movie.posterUrl || '/placeholder.svg'}
            alt={movie.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
              opacity: { xs: 1, md: 0 },
              transition: 'opacity 0.3s ease',
              '.group:hover &': {
                opacity: 1,
              },
            }}
          />

          {/* Rating Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              background: 'linear-gradient(135deg, #f6e05e 0%, #d69e2e 100%)',
              boxShadow: '0 2px 8px rgba(246, 224, 94, 0.4)',
            }}
          >
            <StarIcon sx={{ fontSize: 14, color: '#1a202c' }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: '#1a202c' }}
            >
              {movie.rating?.toFixed(1) || 'N/A'}
            </Typography>
          </Box>

          {/* Content Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              transform: { xs: 'translateY(0)', md: 'translateY(100%)' },
              transition: 'transform 0.3s ease',
              '.group:hover &': {
                transform: 'translateY(0)',
              },
            }}
          >
            {/* Year & Duration */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 0.5,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'text.secondary',
                }}
              >
                {getYear(movie.releaseDate)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDuration(movie.duration)}
                </Typography>
              </Box>
            </Box>

            {/* Title */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 1,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {movie.title}
            </Typography>

            {/* Genres */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {movie.genre?.slice(0, 2).map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    backgroundColor: 'rgba(229, 62, 62, 0.2)',
                    color: '#fc8181',
                    border: '1px solid rgba(229, 62, 62, 0.3)',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Link>
    </motion.div>
  );
};

// Loading skeleton for movie card
export const MovieCardSkeleton = () => (
  <Box
    sx={{
      aspectRatio: '2/3',
      borderRadius: 2,
      overflow: 'hidden',
    }}
  >
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      }}
    />
  </Box>
);

export default MovieCard;
