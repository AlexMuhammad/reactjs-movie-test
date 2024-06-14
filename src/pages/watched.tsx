import * as React from "react";
import Navbar from "../components/layouts/navbar";
import { Container } from "../components/layouts/container";
import Card from "../components/ui/card";
import { Typography } from "../components/ui/typography";
import { MovieProps } from "../types";
import { getWatchedMovies } from "../services/idb";

const Watched = () => {
    const [watchedMovies, setWatchedMovies] = React.useState<MovieProps[]>([]);

    React.useEffect(() => {
      const fetchWatchedMovies = async () => {
        const movies = await getWatchedMovies();
        setWatchedMovies(movies);
      };
      fetchWatchedMovies();
    }, []);
  return (
    <Container>
      <Navbar />
      <Typography variant="h2" className="text-white">Watched List</Typography>
      <section className="grid-cols-1 px-3 grid gap-5 md:grid-cols-4 sm:grid-cols-2 md:px-0">
      {
          watchedMovies.map((item: MovieProps, index: any) => (
            <Card key={index} title={item.title} poster={item.poster_path} date={item.release_date} movie_id={item.id} />
          ))
        }
      </section>
    </Container>
  );
};

export default Watched;
