import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
});

export const getAllPhotos = () => {
  return instance.get('/');
};

export const searcgPhotos = (q, page) => {
  return instance.get(
    `/?key=40897256-f68fd432eb22abb1df1949638&q=${q}&per_page=12&page=${page}`
  );
};
