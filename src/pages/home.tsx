import * as React from "react";
import Navbar from "../components/layouts/navbar";
import { Container } from "../components/layouts/container";
import Card from "../components/ui/card";
import { getMovieList } from "../services/api";
import { MovieProps } from "../types";
import { addWatchedMovie, deleteWatchedMovie, getWatchedMovies } from "../services/idb";

const Home = () => {
  const [data, setData] = React.useState<MovieProps[]>([]);
  const [watchedMovies, setWatchedMovies] = React.useState<number[]>([]);

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
    } else {
      await addWatchedMovie(movie);
      setWatchedMovies((prevWatchedMovies) => [...prevWatchedMovies, movie.id]);
    }
  };

  return (
    <Container>
      <Navbar />
      <section className="grid-cols-1 px-3 grid gap-5 md:grid-cols-4 sm:grid-cols-2 md:px-0">
        {data.map((item: MovieProps, index: any) => (
          <Card
            key={index}
            title={item.title}
            poster={item.poster_path}
            date={item.release_date}
            movie_id={item.id}
            watched={watchedMovies.includes(item.id)}
            onAddToWatched={() => onAddToWatched(item)}
          />
        ))}
      </section>
    </Container>
  );
};

export default Home;
