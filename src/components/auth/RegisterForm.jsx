// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Typography, Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { registerUser, verifyEmail, resendVerificationEmail } from '../../services/authService';
import { authStyles } from '../../styles/authStyles';
import EmailVerification from './EmailVerification';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setMessage('');
      try {
        const registrationData = {
          username: values.name,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
        };

        console.log('Sending registration data:', registrationData);
        const response = await registerUser(registrationData);
        console.log('Registration response:', response);
        
        setRegisteredEmail(values.email);
        setShowVerification(true);
      } catch (error) {
        console.error('Registration error:', error.response?.data || error);
        setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleVerificationComplete = async (code) => {
    try {
      console.log('Starting verification process...');
      const verificationData = {
        email: registeredEmail,
        code: code
      };
      console.log('Verification data:', verificationData);
      await verifyEmail(verificationData);
      console.log('Verification successful, setting states...');
      setShowVerification(false);
      setVerificationSuccess(true);
    } catch (error) {
      console.error('Verification error:', error);
      throw new Error(error.message || 'Verification failed. Please try again.');
    }
  };

  const handleNext = () => {
    setVerificationSuccess(false);
    setSuccess(true);
  };

  const handleResendVerification = async () => {
    try {
      setResendLoading(true);
      await resendVerificationEmail(formik.values.email);
      setResendSuccess(true);
      setResendError(null);
    } catch (error) {
      setResendError(error.message || 'Failed to resend verification email');
      setResendSuccess(false);
    } finally {
      setResendLoading(false);
    }
  };

  if (showVerification) {
    return (
      <EmailVerification
        email={registeredEmail}
        onVerificationComplete={handleVerificationComplete}
        onResendVerification={handleResendVerification}
      />
    );
  }

  if (verificationSuccess) {
    return (
      <Box sx={authStyles.container}>
        <Box sx={authStyles.formContainer}>
          <Box sx={authStyles.successContainer}>
            <CheckCircleOutlineIcon sx={authStyles.successIcon} />
            <Typography variant="h5" sx={authStyles.successTitle}>
              Email Verified Successfully!
            </Typography>
            <Typography sx={authStyles.successMessage}>
              Your email has been verified. Click Next to complete your registration.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={handleNext}
              sx={authStyles.successButton}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={authStyles.container}>
        <Box sx={authStyles.formContainer}>
          <Box sx={authStyles.successContainer}>
            <CheckCircleOutlineIcon sx={authStyles.successIcon} />
            <Typography variant="h5" sx={authStyles.successTitle}>
              Registration Successful!
            </Typography>
            <Typography sx={authStyles.successMessage}>
              Your account has been created successfully. You can now log in to your account.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('/login')}
              sx={authStyles.successButton}
            >
              Proceed to Login
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.formContainer}>
        <Typography variant="h5" sx={authStyles.title}>
          Create Account
        </Typography>
        <form onSubmit={formik.handleSubmit} style={authStyles.form}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={authStyles.textField}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={authStyles.textField}
          />

          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            id="mobile"
            name="mobile"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            inputProps={{
              maxLength: 10,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            sx={authStyles.textField}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={authStyles.textField}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            sx={authStyles.textField}
          />

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={loading}
            sx={authStyles.submitButton}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>

          {message && (
            <Typography sx={authStyles.errorMessage}>
              {message}
            </Typography>
          )}

          <Box sx={authStyles.linkContainer}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" style={authStyles.link}>
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterForm;
