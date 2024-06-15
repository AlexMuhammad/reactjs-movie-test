import { openDB } from 'idb';
import { MovieProps } from '../types';

const DB_NAME = 'movies-db';
const WATCHED_STORE = 'watched-movies';
const QUEUE_STORE = 'queue';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(WATCHED_STORE)) {
        db.createObjectStore(WATCHED_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(QUEUE_STORE)) {
        db.createObjectStore(QUEUE_STORE, { autoIncrement: true });
      }
    },
  });
};

export const addWatchedMovie = async (movie: MovieProps) => {
  const db = await initDB();
  await db.put(WATCHED_STORE, movie);
  if (!navigator.onLine) {
    await db.add(QUEUE_STORE, { action: 'add', movie });
  }
};

export const getWatchedMovies = async (): Promise<MovieProps[]> => {
  const db = await initDB();
  return db.getAll(WATCHED_STORE);
};

export const deleteWatchedMovie = async (id: number) => {
  const db = await initDB();
  await db.delete(WATCHED_STORE, id);
  if (!navigator.onLine) {
    await db.add(QUEUE_STORE, { action: 'delete', id });
  }
};

export const getQueuedChanges = async () => {
  const db = await initDB();
  return db.getAll(QUEUE_STORE);
};

export const clearQueuedChanges = async () => {
  const db = await initDB();
  const tx = db.transaction(QUEUE_STORE, 'readwrite');
  await tx.store.clear();
  await tx.done;
};
