import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api/login'; 

export const register = (userData) =>
  axios.post(
    `${API_BASE}/register/`,
    userData,
    { headers: { 'Content-Type': 'application/json' } }
  );

export const login = (credentials) =>
  axios.post(
    `${API_BASE}/debug-login/`,
    credentials,
    { headers: { 'Content-Type': 'application/json' } }
  );

export const getProfile = (token) =>
  axios.get(
    `${API_BASE}/editar-perfil/`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const updateProfile = (token, data) =>
  axios.put(
    `${API_BASE}/editar-perfil/`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const requestPasswordReset = (email) =>
  axios.post(
    `${API_BASE}/request-reset-email/`,
    { email },
    { headers: { 'Content-Type': 'application/json' } }
  );

export const verifyResetToken = (uidb64, token) =>
  axios.get(
    `${API_BASE}/password-reset/${uidb64}/${token}/`
  );

export const setNewPassword = ({ uidb64, token, password }) =>
  axios.patch(
    `${API_BASE}/password-reset-complete/`,
    { uidb64, token, password },
    { headers: { 'Content-Type': 'application/json' } }
  );
