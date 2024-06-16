import * as React from "react";
import { Typography } from "../components/ui/typography";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/button";
import { Bookmark, Play } from "lucide-react";
import { MovieProps } from "../types";
import { addWatchedMovie, deleteWatchedMovie, getWatchedMovies } from "../services/idb";
import Toast from "../components/ui/toast";
import { baseImgUrl } from "../constants";

const Detail: React.FC = () => {
  let { state } = useLocation();
  const {
    date,
    movie_id,
    poster,
    title,
    vote,
    popularity,
    description,
    backdrop,
  } = state?.data;

  const [watchedMovies, setWatchedMovies] = React.useState<number[]>([]);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchWatchedMovies = async () => {
      const movies = await getWatchedMovies();
      setWatchedMovies(movies.map((movie) => movie.id));
    };
    fetchWatchedMovies();
  }, []);

  const movieData: MovieProps = {
    id: movie_id,
    backdrop_path: backdrop,
    title,
    popularity,
    release_date: date,
    poster_path: poster,
    vote_count: vote,
    overview: description
  };

  const onToggleWatched = async (movie: MovieProps) => {
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
    <>
      <div
        className="w-full relative bg-no-repeat bg-cover h-screen z-0 overflow-hidden"
        style={{ backgroundImage: `url(${baseImgUrl}${backdrop})` }}
      >
        <section className="max-w-full px-5 md:pl-10 mx-auto">
          <div className="absolute bottom-10 space-y-5">
            <Typography
              variant="h1"
              className="text-white font-bnv-medium w-full md:w-2/3"
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              className="text-white font-bnv-medium w-full md:w-1/2"
            >
              {description}
            </Typography>
            <div className="space-x-5">
              <Button
                variant="primary"
                className="bg-white text-black text-xl md:text-2xl cursor-pointer px-8 rounded-full"
                type="button"
              >
                <Play className="mr-5" fill="black" />
                Watch Movie
              </Button>
              <Button
                variant="primary"
                className="bg-white text-black text-2xl cursor-pointer rounded-full"
                type="button"
              >
                <Bookmark
                  fill={watchedMovies.includes(movie_id) ? "red" : "transparent"}
                  width={20}
                  height={20}
                  color={watchedMovies.includes(movie_id) ? "red" : "black"}
                  strokeWidth={1}
                  className="hover:cursor-pointer"
                  onClick={() => onToggleWatched(movieData)}
                />
              </Button>
            </div>
          </div>
        </section>
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
};

export default Detail;
