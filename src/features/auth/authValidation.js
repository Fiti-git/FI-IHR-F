// src/features/auth/authValidation.js
import * as Yup from 'yup';

export const loginSchema = Yup.object({
  username: Yup
    .string()
    .required('Username is required'),
  password: Yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
