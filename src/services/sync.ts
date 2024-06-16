import { getQueuedChanges, clearQueuedChanges, addWatchedMovie, deleteWatchedMovie } from "./idb";
import { MovieProps } from "../types";

interface Change {
  action: "add" | "delete";
  movie?: MovieProps;
  id?: number;
}

export const syncOfflineChanges = async (): Promise<void> => {
  const changes: Change[] = await getQueuedChanges();
  for (const change of changes) {
    if (change.action === "add" && change.movie) {
      await addMovieToServer(change.movie);
    } else if (change.action === "delete" && change.id !== undefined) {
      await deleteMovieFromServer(change.id);
    }
  }
  await clearQueuedChanges();
};

const addMovieToServer = async (movie: MovieProps): Promise<void> => {
  await addWatchedMovie(movie);
};

const deleteMovieFromServer = async (id: number): Promise<void> => {
  await deleteWatchedMovie(id);
};
