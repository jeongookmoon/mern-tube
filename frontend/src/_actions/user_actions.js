import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTHENTICATE_USER } from './user_types';

export const loginUser = (userData) => {
  const serverResponse = axios.post('/api/user/login', userData)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: serverResponse
  }
}

export const registerUser = (userData) => {
  const serverResponse = axios.post('/api/user/register', userData)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: serverResponse
  }
}

export const authenticateUser = () => {
  const serverResponse = axios.get('/api/user/auth')
    .then(response => response.data);

  return {
    type: AUTHENTICATE_USER,
    payload: serverResponse
  }
}

export const logoutUser = () => {
  const serverResponse = axios.get('/api/user/logout')
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: serverResponse
  }
}