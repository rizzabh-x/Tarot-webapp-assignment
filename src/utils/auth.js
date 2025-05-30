const AUTH_KEY = 'celestial_auth';

export const setStoredAuth = (user) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const getStoredAuth = () => {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};