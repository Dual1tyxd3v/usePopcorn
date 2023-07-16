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

export default function App() {
  const [movies, setMovies] = useState<MovieDataType | []>([]);
  const [watched /* setWatched */] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const q = 'pulp';

  useEffect(() => {
    async function loadMovies() {
      setIsLoading(true);
      const movs = await fetchMovies(q);
      setMovies(movs.Search);
      setIsLoading(false);
    }

    loadMovies();
  }, []);

  return (
    <>
      <Stars />
      <Nav moviesLength={0} />
      <main className="main">
        <Box>
          {isLoading ? <Loader /> : <MovieList type="short" movies={movies} />}
        </Box>
        <Box>
          <Summary watched={watched} />
          <MovieList movies={watched} />
        </Box>
      </main>
    </>
  );
}
