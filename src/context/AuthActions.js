import { setStoredAuth, clearStoredAuth } from '../utils/auth';

export const loginUser = (credentials) => async (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (credentials.email === 'user@example.com' && credentials.password === '123456') {
        const user = { email: credentials.email, name: 'Cosmic Explorer' };
        dispatch({ type: 'LOGIN', payload: user });
        setStoredAuth(user);
        resolve(true);
      } else {
        throw new Error('Invalid credentials');
      }
    }, 1000);
  });
};

export const logoutUser = () => (dispatch) => {
  clearStoredAuth();
  dispatch({ type: 'LOGOUT' });
};