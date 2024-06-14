import { openDB } from 'idb';
import { MovieProps } from '../types';

const DB_NAME = 'movies-db';
const STORE_NAME = 'watched-movies';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const addWatchedMovie = async (movie: MovieProps) => {
  const db = await initDB();
  return db.put(STORE_NAME, movie);
};

export const getWatchedMovies = async (): Promise<MovieProps[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteWatchedMovie = async (id: number) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
