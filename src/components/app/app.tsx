import { useEffect, useState } from 'react';
import { API_URL, tempWatchedData } from '../../const';
import Nav from '../nav/nav';
import Box from '../box/box';
import MovieList from '../movie-list/movie-list';
import Summary from '../summary/summary';
import Stars from '../stars/stars';
import { MovieDataType, ResponseType } from '../../types/types';

export default function App() {
  const [movies, setMovies] = useState<MovieDataType | []>([]);
  const [watched /* setWatched */] = useState(tempWatchedData);

  useEffect(() => {
    fetch(`${API_URL}pulp`)
      .then((res) => res.json())
      .then((res) => {
        const movs = res as ResponseType;
        setMovies(movs.Search);
      });
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
