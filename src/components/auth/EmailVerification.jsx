import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { authStyles } from '../../styles/authStyles';

const EmailVerification = ({ email, onVerificationComplete, onResendCode }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleVerify = async () => {
    if (!code) {
      setError('Please enter the code');
      return;
    }

    if (code.length < 4) {
      setError('Code must be at least 4 characters');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onVerificationComplete(code);
    } catch (error) {
      setError(error.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setCountdown(60);
    try {
      await onResendCode();
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setError(error.message || 'Failed to resend code. Please try again.');
      setResendDisabled(false);
    }
  };

  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.formContainer}>
        <Typography variant="h5" sx={authStyles.title}>
          Verify Your Email
        </Typography>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            We've sent a code to:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            {email}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#6b7280' }}>
            Please enter the code sent to your email
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Code"
          variant="outlined"
          value={code}
          onChange={(e) => {
            const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
            setCode(value);
            setError('');
          }}
          error={Boolean(error)}
          helperText={error}
          inputProps={{
            maxLength: 10,
            pattern: "[a-zA-Z0-9]*",
            autoComplete: "one-time-code",
          }}
          sx={authStyles.textField}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleVerify}
          disabled={loading || code.length < 4}
          sx={authStyles.submitButton}
        >
          {loading ? <CircularProgress size={24} /> : 'Verify Email'}
        </Button>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Didn't receive the code?
          </Typography>
          <Button
            onClick={handleResendCode}
            disabled={resendDisabled}
            sx={{
              color: resendDisabled ? '#6b7280' : '#3498db',
              textTransform: 'none',
            }}
          >
            {resendDisabled ? `Resend code in ${countdown}s` : 'Resend code'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailVerification; 