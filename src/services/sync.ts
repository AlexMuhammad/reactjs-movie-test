import { getQueuedChanges, clearQueuedChanges, addWatchedMovie, deleteWatchedMovie } from './idb';
import { MovieProps } from '../types';

interface Change {
  action: 'add' | 'delete';
  movie?: MovieProps;
  id?: number;
  comment?: string;
  rating?: number;
}

export const syncOfflineChanges = async (): Promise<void> => {
  const changes: Change[] = await getQueuedChanges();
  for (const change of changes) {
    if (change.action === 'add' && change.movie) {
      await addMovieToIndexedDB(change.movie);
      if (change.comment || change.rating !== undefined) {
        await addCommentToIndexedDB(change.movie.id, change.comment!, change.rating!);
      }
    } else if (change.action === 'delete' && change.id !== undefined) {
      await deleteMovieFromIndexedDB(change.id);
    }
  }
  await clearQueuedChanges();
};

const addMovieToIndexedDB = async (movie: MovieProps): Promise<void> => {
  console.log(`Simulating adding movie to IndexedDB: ${movie.title}`);
  // Directly add the movie to IndexedDB
  await addWatchedMovie(movie);
};

const deleteMovieFromIndexedDB = async (id: number): Promise<void> => {
  console.log(`Simulating deleting movie from IndexedDB with id ${id}`);
  // Directly delete the movie from IndexedDB
  await deleteWatchedMovie(id);
};

const addCommentToIndexedDB = async (movieId: number, comment: string, rating: number): Promise<void> => {
  console.log(`Simulating adding comment and rating to IndexedDB for movieId ${movieId}`);
  // You can store comments and ratings similarly in IndexedDB or just log them here
  console.log(`Comment: ${comment}, Rating: ${rating}`);
};
