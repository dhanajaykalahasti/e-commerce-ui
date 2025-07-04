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
  People,
  ShoppingCart,
  Inventory,
  AttachMoney,
  LocalShipping,
  Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'User Management',
      icon: <People />,
      path: '/dashboard/admin/users',
      description: 'Manage user accounts and permissions',
    },
    {
      title: 'Product Management',
      icon: <Inventory />,
      path: '/dashboard/admin/products',
      description: 'Add, edit, and manage products',
    },
    {
      title: 'Order Management',
      icon: <ShoppingCart />,
      path: '/dashboard/admin/orders',
      description: 'View and manage orders',
    },
    {
      title: 'Revenue',
      icon: <AttachMoney />,
      path: '/dashboard/admin/revenue',
      description: 'View sales and revenue reports',
    },
    {
      title: 'Shipping',
      icon: <LocalShipping />,
      path: '/dashboard/admin/shipping',
      description: 'Manage shipping and delivery',
    },
    {
      title: 'Settings',
      icon: <Settings />,
      path: '/dashboard/admin/settings',
      description: 'Configure system settings',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
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
                primary="New Order #12345"
                secondary="Placed by John Doe"
              />
              <Button variant="outlined" size="small">
                View Details
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText
                primary="New User Registration"
                secondary="Jane Smith registered"
              />
              <Button variant="outlined" size="small">
                View Profile
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText
                primary="Low Stock Alert"
                secondary="Product: Wireless Headphones"
              />
              <Button variant="outlined" size="small">
                Restock
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 