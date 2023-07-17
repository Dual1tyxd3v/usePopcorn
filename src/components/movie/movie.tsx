import { useEffect, useState } from 'react';
import { fetchFullMovie } from '../../utils';
import {
  FullMovieType,
  WatchedMovieDataType,
  WatchedMovieType,
} from '../../types/types';
import Loader from '../loader/loader';
import Error from '../error/error';
import Stars from '../stars/stars';

type MovieProps = {
  id: string;
  closeHandler: (v: string | null) => void;
  addWatchedMovie: (m: WatchedMovieType) => void;
  watched: WatchedMovieDataType;
};

export default function Movie({
  id,
  closeHandler,
  addWatchedMovie,
  watched,
}: MovieProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const [movie, setMovie] = useState<null | FullMovieType>(null);
  const [userRating, setUserRating] = useState<number>(0);

  // loading data
  useEffect(() => {
    const controller = new AbortController();
    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const mov = await fetchFullMovie(id, controller);
        setMovie(mov);
      } catch (e) {
        const err = e as Error;
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    id && loadMovies();

    return () => {
      controller.abort();
    };
  }, [id]);

  // handling esc keydown
  useEffect(() => {
    function pressToClose(e: KeyboardEvent) {
      if (e.code === 'Esc') {
        closeHandler(null);
      }
    }
    document.addEventListener('keydown', pressToClose);

    return () => document.removeEventListener('keydown', pressToClose);
  }, [closeHandler]);

  // changing title
  useEffect(() => {
    if (movie) {
      document.title = movie.Title;
    }

    return () => {
      document.title = 'usePopcorn';
    };
  }, [movie]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !movie) {
    return <Error message={(error as string) || ''} />;
  }

  function changeUserRating(value: number) {
    setUserRating(value);
  }

  function addMovie() {
    const newMovie = {
      imdbID,
      Title,
      Year,
      Poster,
      runtime: Runtime,
      imdbRating,
      userRating: userRating.toString(),
    };
    addWatchedMovie(newMovie);
    closeHandler(null);
  }

  const {
    Title,
    imdbID,
    Poster,
    Year,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  const myRating =
    watched.find((mov) => mov.imdbID === imdbID)?.userRating || 0;
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => closeHandler(null)}>
          &larr;
        </button>
        <img src={Poster} alt={Title} />
        <div className="details-overview">
          <h3>{Title}</h3>
          <p>
            {Released} &bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            {' '}
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {myRating ? (
            <p>You already rate this movie - {myRating}⭐</p>
          ) : (
            <>
              <Stars changeUserRating={changeUserRating} />
              {userRating > 0 && (
                <button className="btn-add" onClick={addMovie}>
                  + Add to list
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{Plot}</em>
        </p>
        <p>Starring {Actors}</p>
        <p>Directed by {Director}</p>
      </section>
    </div>
  );
}
