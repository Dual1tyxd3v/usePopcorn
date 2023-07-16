import { useEffect, useState } from 'react';
import { QUERY_CHANGE_DELAY, tempWatchedData } from '../../const';
import Nav from '../nav/nav';
import Box from '../box/box';
import MovieList from '../movie-list/movie-list';
import Summary from '../summary/summary';
import Stars from '../stars/stars';
import { MovieDataType } from '../../types/types';
import { fetchMovies } from '../../utils';
import Loader from '../loader/loader';
import Error from '../error/error';

export default function App() {
  const [movies, setMovies] = useState<MovieDataType | []>([]);
  const [watched /* setWatched */] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const movs = await fetchMovies(query);
        setMovies(movs.Search || []);
      } catch (e) {
        const err = e as Error;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    const timer = setTimeout(() => {
      query.length && loadMovies();
    }, QUERY_CHANGE_DELAY);

    return () => clearTimeout(timer);
  }, [query]);

  function changeQuery(value: string) {
    setQuery(value);
  }

  return (
    <>
      <Stars />
      <Nav
        moviesLength={movies.length}
        query={query}
        changeQuery={changeQuery}
      />
      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && error && <Error message={error as string} />}
          {!isLoading && !error && <MovieList type="short" movies={movies} />}
        </Box>
        <Box>
          <Summary watched={watched} />
          <MovieList movies={watched} />
        </Box>
      </main>
    </>
  );
}
