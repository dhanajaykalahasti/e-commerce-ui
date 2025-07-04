import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Badge,
  Chip,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  LocalShipping,
  History,
  AccountCircle,
  Notifications,
  Star,
  Payment,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '12px',
  background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
  color: 'white',
}));

const UserDashboard = () => {
  // Mock data
  const userStats = [
    { title: 'My Orders', value: '5', icon: <ShoppingCart />, link: '/orders' },
    { title: 'Wishlist', value: '12', icon: <Favorite />, link: '/wishlist' },
    { title: 'Points', value: '2,450', icon: <Star />, link: '/rewards' },
    { title: 'Saved Cards', value: '2', icon: <Payment />, link: '/payment' },
  ];

  const recentOrders = [
    { id: 1, product: 'Wireless Headphones', amount: '$99.99', status: 'Delivered', date: '2024-03-25' },
    { id: 2, product: 'Smart Watch', amount: '$199.99', status: 'Processing', date: '2024-03-24' },
    { id: 3, product: 'Laptop', amount: '$999.99', status: 'Shipped', date: '2024-03-23' },
  ];

  const wishlistItems = [
    { name: 'Wireless Headphones', price: '$99.99', rating: 4.5 },
    { name: 'Smart Watch', price: '$199.99', rating: 4.8 },
    { name: 'Laptop', price: '$999.99', rating: 4.2 },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          My Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Avatar sx={{ bgcolor: '#1a237e' }}>
            <AccountCircle />
          </Avatar>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {userStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Orders</Typography>
              <Button
                variant="outlined"
                startIcon={<History />}
              >
                Order History
              </Button>
            </Box>
            <List>
              {recentOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#1a237e' }}>
                        <ShoppingCart />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={order.product}
                      secondary={`${order.date} - ${order.amount}`}
                    />
                    <Chip
                      label={order.status}
                      color={order.status === 'Delivered' ? 'success' : 'warning'}
                      size="small"
                    />
                  </ListItem>
                  {index < recentOrders.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<ShoppingCart />}
            >
              View All Orders
            </Button>
          </StyledPaper>
        </Grid>

        {/* Wishlist */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" sx={{ mb: 2 }}>My Wishlist</Typography>
            <List>
              {wishlistItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#1a237e' }}>
                        <Favorite />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.price}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ color: '#ffd700', mr: 0.5 }} />
                      <Typography variant="body2">{item.rating}</Typography>
                    </Box>
                  </ListItem>
                  {index < wishlistItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<Favorite />}
            >
              View Wishlist
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard; 