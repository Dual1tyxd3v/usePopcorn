import { useEffect, useState } from 'react';
import { QUERY_CHANGE_DELAY } from '../../const';
import Nav from '../nav/nav';
import Box from '../box/box';
import MovieList from '../movie-list/movie-list';
import Summary from '../summary/summary';
import {
  MovieDataType,
  WatchedMovieDataType,
  WatchedMovieType,
} from '../../types/types';
import { fetchMovies } from '../../utils';
import Loader from '../loader/loader';
import Error from '../error/error';
import Movie from '../movie/movie';

export default function App() {
  const [movies, setMovies] = useState<MovieDataType>([]);
  const [watched, setWatched] = useState<WatchedMovieDataType>(() => {
    const movs = localStorage.getItem('movies');
    return movs ? (JSON.parse(movs) as WatchedMovieDataType) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const movs = await fetchMovies(query, controller);
        setMovies(movs.Search || []);
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
    const timer = setTimeout(() => {
      query.length && loadMovies();
    }, QUERY_CHANGE_DELAY);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(watched));
  }, [watched]);

  function changeQuery(value: string) {
    setQuery(value);
  }

  function changeActiveId(value: string | null) {
    setActiveId(value === activeId ? null : value);
  }

  function addWatchedMovie(movie: WatchedMovieType) {
    const index = watched.findIndex((mov) => mov.imdbID === movie.imdbID);
    setWatched(
      index < 0
        ? [...watched, movie]
        : watched.map((mov) => (mov.imdbID === movie.imdbID ? movie : mov))
    );
  }

  function deleteWatchedMovie(id: string) {
    setWatched(watched.filter((mov) => mov.imdbID !== id));
  }

  return (
    <>
      <Nav
        moviesLength={movies.length}
        query={query}
        changeQuery={changeQuery}
      />
      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && error && <Error message={error as string} />}
          {!isLoading && !error && (
            <MovieList changeActiveId={changeActiveId} movies={movies} />
          )}
        </Box>
        <Box>
          {activeId ? (
            <Movie
              watched={watched}
              addWatchedMovie={addWatchedMovie}
              id={activeId}
              closeHandler={changeActiveId}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MovieList
                deleteWatchedMovie={deleteWatchedMovie}
                changeActiveId={changeActiveId}
                movies={watched}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
