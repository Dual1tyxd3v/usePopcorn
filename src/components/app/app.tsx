import { useEffect, useState } from 'react';
import { API_URL, tempWatchedData } from '../../const';
import Nav from '../nav/nav';
import Box from '../box/box';
import MovieList from '../movie-list/movie-list';
import Summary from '../summary/summary';
import Stars from '../stars/stars';
import { MovieDataType, ResponseType } from '../../types/types';

export default function App() {
  const [query, setQuery] = useState('');
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

  function onChangeInputHandler(value: string) {
    setQuery(value);
  }

  return (
    <>
      <Stars />
      <Nav
        moviesLength={movies.length}
        query={query}
        onChangeInputHandler={onChangeInputHandler}
      />
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
