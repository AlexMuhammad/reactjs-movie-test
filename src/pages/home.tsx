import * as React from "react";
import Navbar from "../components/layouts/navbar";
import { Container } from "../components/layouts/container";
import Card from "../components/ui/card";
import { getMovieList } from "../services/api";
import { MovieProps } from "../types";
import { addWatchedMovie } from "../services/idb";

const Home = () => {
  const [data, setData] = React.useState<MovieProps[]>([]);

  React.useEffect(() => {
    getMovieList().then((result: MovieProps[]) => {
      setData(result);
    })
  }, [])

  const onAddToWatched = (movie: MovieProps) => {
    addWatchedMovie(movie);
  }

  return (
    <Container>
      <Navbar />
      <section className="grid-cols-1 px-3 grid gap-5 md:grid-cols-4 sm:grid-cols-2 md:px-0">
        {
          data.map((item: MovieProps, index: any) => (
            <Card key={index} title={item.title} poster={item.poster_path} date={item.release_date} movie_id={item.id} onAddToWatched={() => onAddToWatched(item)}/>
          ))
        }
      </section>
    </Container>
  );
};

export default Home;
