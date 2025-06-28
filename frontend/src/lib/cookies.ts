import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const USER_TOKEN_KEY = 'social_user_token';
const USER_DATA_KEY = 'social_user_data';

export const generateUserToken = (userData: unknown): string => {
  const dataString = JSON.stringify(userData);
  return CryptoJS.SHA256(dataString).toString();
};

export const saveUserToken = (token: string) => {
  Cookies.set(USER_TOKEN_KEY, token, { expires: 7 });
};

export const getUserToken = (): string | undefined => {
  return Cookies.get(USER_TOKEN_KEY);
};

export const saveUserData = (userData: unknown) => {
  Cookies.set(USER_DATA_KEY, JSON.stringify(userData), { expires: 7 });
};

export const getUserData = (): unknown | null => {
  const data = Cookies.get(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearUserData = () => {
  Cookies.remove(USER_TOKEN_KEY);
  Cookies.remove(USER_DATA_KEY);
};
