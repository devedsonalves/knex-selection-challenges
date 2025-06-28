import axios from 'axios';

export const randomUserApi = axios.create({
  baseURL: 'https://randomuser.me/api',
});

export const jsonPlaceholderApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
