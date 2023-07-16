import { useEffect, useState } from 'react';
import { tempWatchedData } from '../../const';
import Nav from '../nav/nav';
import Box from '../box/box';
import MovieList from '../movie-list/movie-list';
import Summary from '../summary/summary';
import Stars from '../stars/stars';
import { MovieDataType } from '../../types/types';
import { fetchMovies } from '../../utils';

export default function App() {
  const [movies, setMovies] = useState<MovieDataType | []>([]);
  const [watched /* setWatched */] = useState(tempWatchedData);
  const q = 'pulpdqwrqrqr';

  useEffect(() => {
    async function loadMovies() {
      const movs = await fetchMovies(q);
      setMovies(movs.Search);
    }

    loadMovies();
  }, []);

  return (
    <>
      <Stars />
      <Nav moviesLength={0} />
      <main className="main">
        <Box>
          <MovieList type="short" movies={movies} />
        </Box>
        <Box>
          <Summary watched={watched} />
          <MovieList movies={watched} />
        </Box>
      </main>
    </>
  );
}
