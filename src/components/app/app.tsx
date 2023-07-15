import { useState } from 'react';
import { tempMovieData, tempWatchedData } from '../../const';
import Nav from '../nav/nav';
import Box from '../box/box';
import MovieList from '../movie-list/movie-list';
import Summary from '../summary/summary';
import Stars from '../stars/stars';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies /* setMovies */] = useState(tempMovieData);
  const [watched /* setWatched */] = useState(tempWatchedData);

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
