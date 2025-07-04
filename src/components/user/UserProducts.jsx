import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Rating,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { getAllProducts } from '../../services/productService';

const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Books',
  'Home & Kitchen',
  'Sports',
  'Beauty',
  'Toys',
];

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', product);
  };

  const handleAddToWishlist = (product) => {
    // TODO: Implement add to wishlist functionality
    console.log('Adding to wishlist:', product);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Products
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Products"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
              onClick={() => handleProductClick(product)}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl || 'https://via.placeholder.com/200'}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={4.5} readOnly precision={0.5} />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    (4.5)
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    color={product.stock > 0 ? 'success' : 'error'}
                    size="small"
                  />
                  <Box>
                    <IconButton onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWishlist(product);
                    }}>
                      <FavoriteBorder />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedProduct.imageUrl || 'https://via.placeholder.com/400'}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    ${selectedProduct.price}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedProduct.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={selectedProduct.category}
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      color={selectedProduct.stock > 0 ? 'success' : 'error'}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={4.5} readOnly precision={0.5} />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      (4.5)
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCart />}
                    disabled={selectedProduct.stock === 0}
                    onClick={() => handleAddToCart(selectedProduct)}
                    sx={{ mr: 1 }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FavoriteBorder />}
                    onClick={() => handleAddToWishlist(selectedProduct)}
                  >
                    Add to Wishlist
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default UserProducts; 