// src/styles/authStyles.js
export const authStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    py: 4,
  },
  formContainer: {
    maxWidth: 400,
    width: '100%',
    mx: 'auto',
    p: 4,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    backgroundColor: '#fff',
    backdropFilter: 'blur(10px)',
  },
  title: {
    textAlign: 'center',
    mb: 3,
    color: '#2c3e50',
    fontWeight: 600,
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#3498db',
      },
    },
  },
  submitButton: {
    mt: 2,
    py: 1.5,
    background: 'linear-gradient(45deg, #3498db 30%, #2980b9 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, #2980b9 30%, #3498db 90%)',
    },
  },
  linkContainer: {
    mt: 2,
    textAlign: 'center',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  errorMessage: {
    mt: 2,
    p: 2,
    borderRadius: 1,
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    textAlign: 'center',
  },
  successContainer: {
    textAlign: 'center',
    p: 3,
  },
  successIcon: {
    fontSize: '4rem',
    color: '#16a34a',
    mb: 2,
  },
  successTitle: {
    color: '#16a34a',
    fontWeight: 600,
    mb: 2,
  },
  successMessage: {
    color: '#374151',
    mb: 3,
  },
  successButton: {
    mt: 2,
    py: 1.5,
    background: 'linear-gradient(45deg, #16a34a 30%, #059669 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, #059669 30%, #16a34a 90%)',
    },
  },
}; 