import { useEffect, useState } from 'react';
import Nav from '../nav/nav';
import Box from '../box/box';
import MovieList from '../movie-list/movie-list';
import Summary from '../summary/summary';
import {
  WatchedMovieDataType,
  WatchedMovieType,
} from '../../types/types';
import Loader from '../loader/loader';
import Error from '../error/error';
import Movie from '../movie/movie';
import { useMovie } from '../../hooks/useMovie';

export default function App() {
  const [watched, setWatched] = useState<WatchedMovieDataType>(() => {
    const movs = localStorage.getItem('movies');
    return movs ? (JSON.parse(movs) as WatchedMovieDataType) : [];
  });
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const {movies, isLoading, error} = useMovie(query);

  // preserve watched films in storage
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
