import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  LocalShipping,
  History,
  AccountCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'My Orders',
      icon: <ShoppingCart />,
      path: '/dashboard/orders',
      description: 'View and track your orders',
    },
    {
      title: 'Wishlist',
      icon: <Favorite />,
      path: '/dashboard/wishlist',
      description: 'View your saved items',
    },
    {
      title: 'Shipping Addresses',
      icon: <LocalShipping />,
      path: '/dashboard/addresses',
      description: 'Manage your shipping addresses',
    },
    {
      title: 'Order History',
      icon: <History />,
      path: '/dashboard/history',
      description: 'View your order history',
    },
    {
      title: 'Profile Settings',
      icon: <AccountCircle />,
      path: '/dashboard/profile',
      description: 'Update your profile information',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Paper
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <Typography variant="h6">{item.title}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Paper>
          <List>
            <ListItem>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText
                primary="Order #12345"
                secondary="Placed on March 15, 2024"
              />
              <Button variant="outlined" size="small">
                View Details
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Favorite />
              </ListItemIcon>
              <ListItemText
                primary="Added to Wishlist"
                secondary="Product: Wireless Headphones"
              />
              <Button variant="outlined" size="small">
                View Wishlist
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalShipping />
              </ListItemIcon>
              <ListItemText
                primary="Order #12344"
                secondary="Delivered on March 10, 2024"
              />
              <Button variant="outlined" size="small">
                View Details
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserDashboard; 