// src/features/auth/AuthPage.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { Box, Typography } from '@mui/material';

export default function AuthPage() {
  const { access } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (access) {
      navigate('/', { replace: true });
    }
  }, [access, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      px={2}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      <AuthForm />
    </Box>
  );
}
