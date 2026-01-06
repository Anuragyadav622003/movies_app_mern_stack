import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface AdminNavLinkProps {
  to: string;
  icon: SvgIconComponent;
  label: string;
  collapsed?: boolean;
}

const AdminNavLink: React.FC<AdminNavLinkProps> = ({ to, icon: Icon, label, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const content = (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <ListItemButton
        component={RouterNavLink}
        to={to}
        sx={{
          borderRadius: 2,
          mb: 0.5,
          py: 1.5,
          px: 2,
          backgroundColor: isActive ? 'rgba(229, 62, 62, 0.15)' : 'transparent',
          borderLeft: isActive ? '3px solid' : '3px solid transparent',
          borderColor: isActive ? 'primary.main' : 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsed ? 0 : 40,
            color: isActive ? 'primary.main' : 'text.secondary',
          }}
        >
          <Icon />
        </ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'primary.main' : 'text.secondary',
              fontSize: '0.95rem',
            }}
          />
        )}
        {isActive && !collapsed && (
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              boxShadow: '0 0 10px rgba(229, 62, 62, 0.5)',
            }}
          />
        )}
      </ListItemButton>
    </motion.div>
  );

  if (collapsed) {
    return (
      <Tooltip title={label} placement="right" arrow>
        {content}
      </Tooltip>
    );
  }

  return content;
};

export default AdminNavLink;
