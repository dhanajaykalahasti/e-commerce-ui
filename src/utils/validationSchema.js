// src/utils/validationSchema.js
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
});
