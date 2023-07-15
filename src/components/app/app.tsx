import { useState } from 'react';
import { tempMovieData, tempWatchedData } from '../../const';
import { average } from '../../utils';
import Nav from '../nav/nav';
import Box from '../box/box';
import MovieList from '../movie-list/movie-list';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies /* setMovies */] = useState(tempMovieData);
  const [watched /* setWatched */] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  function onChangeInputHandler(value: string) {
    setQuery(value);
  }

  return (
    <>
      <Nav
        moviesLength={movies.length}
        query={query}
        onChangeInputHandler={onChangeInputHandler}
      />
      <main className="main">
        <Box>
          <MovieList movies={movies} />
        </Box>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? '–' : '+'}
          </button>
          {isOpen2 && (
            <>
              <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>

              <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
}
