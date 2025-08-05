// src/features/auth/AuthForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { loginSchema } from './authValidation';

export default function AuthForm() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.auth);

  return (
    <Box sx={{ maxWidth: 360, mx: 'auto' }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors, handleChange, values }) => (
          <Form noValidate>
            <Field
              name="username"
              as={TextField}
              label="Username"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={values.username}
              error={touched.username && !!errors.username}
              helperText={<ErrorMessage name="username" />}
            />

            <Field
              name="password"
              as={TextField}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={values.password}
              error={touched.password && !!errors.password}
              helperText={<ErrorMessage name="password" />}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting || status === 'loading'}
              sx={{ mt: 2 }}
            >
              {status === 'loading' ? 'Signing in…' : 'Sign In'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
