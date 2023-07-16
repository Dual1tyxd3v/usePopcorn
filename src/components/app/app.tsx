import { useEffect, useState } from 'react';
import { tempWatchedData } from '../../const';
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

  const q = 'pulp';

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const movs = await fetchMovies(q);
        setMovies(movs.Search || []);
      } catch (e) {
        const err = e as Error;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <>
      <Stars />
      <Nav moviesLength={movies.length} />
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
