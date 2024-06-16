import * as React from "react";
import Navbar from "../components/layouts/navbar";
import { Container } from "../components/layouts/container";
import Card from "../components/ui/card";
import { getMovieList } from "../services/api";
import { MovieProps } from "../types";
import {
  addWatchedMovie,
  deleteWatchedMovie,
  getWatchedMovies,
} from "../services/idb";
import Toast from "../components/ui/toast";

const Home = () => {
  const [data, setData] = React.useState<MovieProps[]>([]);
  const [watchedMovies, setWatchedMovies] = React.useState<number[]>([]);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    getMovieList().then((result: MovieProps[]) => {
      setData(result);
    });
    getWatchedMovies().then((movies) => {
      setWatchedMovies(movies.map((movie) => movie.id));
    });
  }, []);

  const onAddToWatched = async (movie: MovieProps) => {
    if (watchedMovies.includes(movie.id)) {
      await deleteWatchedMovie(movie.id);
      setWatchedMovies((prevWatchedMovies) =>
        prevWatchedMovies.filter((id) => id !== movie.id)
      );
      setToastMessage(`${movie.title} removed from watched list`);
    } else {
      await addWatchedMovie(movie);
      setWatchedMovies((prevWatchedMovies) => [...prevWatchedMovies, movie.id]);
      setToastMessage(`${movie.title} marked as watched`);
    }
  };

  return (
    <Container>
      <Navbar />
      <section className="grid-cols-1 px-3 grid gap-5 md:grid-cols-4 sm:grid-cols-2 md:px-0 pb-5">
        {data.map((item: MovieProps, index: any) => (
          <Card
            key={index}
            title={item.title}
            poster={item.poster_path}
            date={item.release_date}
            description={item.overview}
            movie_id={item.id}
            watched={watchedMovies.includes(item.id)}
            popularity={item.popularity}
            vote={item.vote_count}
            handleBookmark={() => onAddToWatched(item)}
          />
        ))}
      </section>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}
    </Container>
  );
};

export default Home;
