import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart,
  People,
  Inventory,
  LocalShipping,
  AttachMoney,
  Settings,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1a237e',
    color: 'white',
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const adminMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard/admin' },
  { text: 'Users', icon: <People />, path: '/dashboard/admin/users' },
  { text: 'Products', icon: <Inventory />, path: '/dashboard/admin/products' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/dashboard/orders' },
  { text: 'Customers', icon: <People />, path: '/dashboard/customers' },
  { text: 'Shipping', icon: <LocalShipping />, path: '/dashboard/shipping' },
  { text: 'Analytics', icon: <AttachMoney />, path: '/dashboard/analytics' },
  { text: 'Settings', icon: <Settings />, path: '/dashboard/settings' },
];

const userMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard/user' },
  { text: 'Products', icon: <Inventory />, path: '/dashboard/products' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/dashboard/orders' },
  { text: 'Settings', icon: <Settings />, path: '/dashboard/settings' },
];

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = user?.role === 'ROLE_ADMIN' ? adminMenuItems : userMenuItems;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
    >
      <LogoBox>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          E-Commerce
        </Typography>
      </LogoBox>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'white' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 