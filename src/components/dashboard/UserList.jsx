import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  IconButton,
  Tooltip,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
}));

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const { user } = useAuth();

  useEffect(() => {
    console.log('Fetching users with page:', page, 'size:', rowsPerPage, 'search:', searchTerm); // Debug log
    fetchUsers();
  }, [page, rowsPerPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.getUsers(token, page, rowsPerPage, searchTerm);
      console.log('API Response:', response.data); // Debug log
      
      if (response.data && response.data.users) {
        setUsers(response.data.users);
        setTotalItems(response.data.totalItems);
      } else {
        console.warn('Unexpected API response format:', response.data); // Debug log
        setUsers([]);
        setTotalItems(0);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users');
      setUsers([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    console.log('Changing page to:', newPage); // Debug log
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    console.log('Changing page size to:', newSize); // Debug log
    setRowsPerPage(newSize);
    setPage(0);
  };

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    console.log('Search term changed to:', newSearchTerm); // Debug log
    setSearchTerm(newSearchTerm);
    setPage(0); // Reset to first page when searching
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({
      username: user.username || '',
      email: user.email || '',
      role: user.role || '',
    });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
    setEditFormData({
      username: '',
      email: '',
      role: '',
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.updateUser(selectedUser.id, editFormData, token);
      await fetchUsers();
      handleEditClose();
      setSnackbar({
        open: true,
        message: 'User updated successfully',
        severity: 'success',
      });
    } catch (err) {
      console.error('Error updating user:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to update user',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await api.removeUser(userId, token);
        await fetchUsers();
        setSnackbar({
          open: true,
          message: 'User deleted successfully',
          severity: 'success',
        });
      } catch (err) {
        console.error('Error deleting user:', err);
        setSnackbar({
          open: true,
          message: err.response?.data?.message || 'Failed to delete user',
          severity: 'error',
        });
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
      
      <SearchContainer>
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: 300 }}
        />
      </SearchContainer>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.verified ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(user)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(user.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledTableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Username"
              name="username"
              value={editFormData.username}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={editFormData.email}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              select
              label="Role"
              name="role"
              value={editFormData.role}
              onChange={handleEditChange}
              fullWidth
            >
              <MenuItem value="ROLE_USER">User</MenuItem>
              <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserList;
