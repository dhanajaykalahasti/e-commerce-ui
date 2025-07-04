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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ShoppingCart,
  People,
  AttachMoney,
  TrendingUp,
  Inventory,
  LocalShipping,
  MoreVert,
  Star,
  Notifications,
  Warning,
  CheckCircle,
  Cancel,
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
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  color: 'white',
}));

const AdminDashboard = () => {
  // Mock data
  const stats = [
    { title: 'Total Sales', value: '$24,500', icon: <AttachMoney />, change: '+12%' },
    { title: 'Total Orders', value: '1,250', icon: <ShoppingCart />, change: '+8%' },
    { title: 'Total Customers', value: '850', icon: <People />, change: '+15%' },
    { title: 'Revenue Growth', value: '18%', icon: <TrendingUp />, change: '+5%' },
  ];

  const recentOrders = [
    { id: 1, customer: 'John Doe', product: 'Wireless Headphones', amount: '$99.99', status: 'Delivered' },
    { id: 2, customer: 'Jane Smith', product: 'Smart Watch', amount: '$199.99', status: 'Processing' },
    { id: 3, customer: 'Mike Johnson', product: 'Laptop', amount: '$999.99', status: 'Shipped' },
  ];

  const lowStockItems = [
    { name: 'Wireless Headphones', stock: 5, threshold: 10 },
    { name: 'Smart Watch', stock: 3, threshold: 10 },
    { name: 'Laptop', stock: 2, threshold: 5 },
  ];

  const recentCustomers = [
    { name: 'John Doe', email: 'john@example.com', joinDate: '2024-03-25' },
    { name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-03-24' },
    { name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-03-23' },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Avatar sx={{ bgcolor: '#1a237e' }}>AD</Avatar>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
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
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ mr: 0.5, fontSize: '1rem' }} />
                      {stat.change} from last month
                    </Typography>
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
              <IconButton>
                <MoreVert />
              </IconButton>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={order.status === 'Delivered' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>

        {/* Low Stock Alert */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Warning color="warning" />
              Low Stock Alert
            </Typography>
            <List>
              {lowStockItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <Inventory />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`Current Stock: ${item.stock} (Threshold: ${item.threshold})`}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      color="warning"
                    >
                      Restock
                    </Button>
                  </ListItem>
                  {index < lowStockItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<Inventory />}
            >
              Manage Inventory
            </Button>
          </StyledPaper>
        </Grid>

        {/* Recent Customers */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Customers</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Join Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentCustomers.map((customer) => (
                    <TableRow key={customer.email}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>
                        <Chip
                          label="Active"
                          color="success"
                          size="small"
                          icon={<CheckCircle />}
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard; 