// src/features/auth/authAPI.js
import client from '../../api/client';

/**
 * Sends username & password to Django Simple JWT token endpoint.
 * Expects { access, refresh } in response.data.
 */
export function loginUser(credentials) {
  return client.post('/api/token/', credentials);
}
