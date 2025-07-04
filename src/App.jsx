// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import AdminProducts from './components/admin/AdminProducts';
import UserProducts from './components/user/UserProducts';
import UserList from './components/dashboard/UserList';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // If user is admin and trying to access admin routes, allow it
    if (user?.role === 'ROLE_ADMIN' && location.pathname.startsWith('/dashboard/admin')) {
      return children;
    }
    // If user is admin, redirect to admin dashboard
    if (user?.role === 'ROLE_ADMIN') {
      return <Navigate to="/dashboard/admin" replace />;
    }
    // For regular users, redirect to user dashboard
    return <Navigate to="/dashboard/user" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="admin" replace />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="user"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_USER']}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/products"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/users"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="products"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
                    <UserProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
                    <div>Orders Page</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="customers"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                    <div>Customers Page</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="shipping"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                    <div>Shipping Page</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="analytics"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                    <div>Analytics Page</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
                    <div>Settings Page</div>
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Root redirect */}
            <Route
              path="/"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

// Public Route component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === 'ROLE_ADMIN') {
      return <Navigate to="/dashboard/admin" replace />;
    }
    return <Navigate to="/dashboard/user" replace />;
  }

  return children;
};

export default App;
