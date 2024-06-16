import * as React from "react";
import Navbar from "../components/layouts/navbar";
import { Container } from "../components/layouts/container";
import Card from "../components/ui/card";
import { Typography } from "../components/ui/typography";
import { MovieProps } from "../types";
import { deleteWatchedMovie, getWatchedMovies } from "../services/idb";
import Toast from "../components/ui/toast";

const Watched = () => {
  const [data, setData] = React.useState<MovieProps[]>([]);
  const [watchedMovies, setWatchedMovies] = React.useState<number[]>([]);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchWatchedMovies = async () => {
      const result = await getWatchedMovies();
      const watchedIds = result.map((movie) => movie.id);
      setData(result);
      setWatchedMovies(watchedIds);
    };
    fetchWatchedMovies();
  }, [data]);

  const onToggleWatched = async (movie: MovieProps) => {
    if (watchedMovies.includes(movie.id)) {
      await deleteWatchedMovie(movie.id);
      setData((prevData) => prevData.filter((item) => item.id !== movie.id));
      setWatchedMovies((prevWatchedMovies) =>
        prevWatchedMovies.filter((id) => id !== movie.id)
      );
      setToastMessage(`${movie.title} removed from watched list`);
    }
  };

  return (
    <Container>
      <Navbar />
      <Typography variant="h2" className="text-white">
        Watched List
      </Typography>
      <section className="grid-cols-1 px-3 grid gap-5 md:grid-cols-4 sm:grid-cols-2 md:px-0">
        {data.map((item: MovieProps, index: any) => (
          <Card
            key={index}
            title={item.title}
            poster={item.poster_path}
            date={item.release_date}
            movie_id={item.id}
            description={item.overview}
            popularity={item.popularity}
            vote={item.vote_count}
            watched={watchedMovies.includes(item.id)}
            handleBookmark={() => onToggleWatched(item)}
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

export default Watched;
