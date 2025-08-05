// src/hooks/useAuth.js
import { useSelector } from 'react-redux';

export default function useAuth() {
  const access = useSelector(state => state.auth.access);
  return { isLoggedIn: Boolean(access) };
}
