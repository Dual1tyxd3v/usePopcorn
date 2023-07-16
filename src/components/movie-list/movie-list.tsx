import {
  MovieDataType,
  WatchedMovieDataType,
  WatchedMovieType,
} from '../../types/types';
import ContentMovie from '../content-movie/content-movie';
import ContentWatchedMovie from '../content-watched-movie/content-watched-movie';
import MenuCard from '../menu-card/menu-card';

type MovieListProps = {
  movies: MovieDataType | WatchedMovieDataType;
  changeActiveId: (v: null | string) => void;
  deleteWatchedMovie?: (i: string) => void;
};

export default function MovieList({ movies, changeActiveId, deleteWatchedMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MenuCard changeActiveId={changeActiveId} key={movie.imdbID} movie={movie}>
          {!deleteWatchedMovie ? (
            <ContentMovie year={movie.Year} />
          ) : (
            <ContentWatchedMovie
              imdbRating={+(movie as WatchedMovieType).imdbRating}
              userRating={+(movie as WatchedMovieType).userRating}
              runtime={Number.parseInt((movie as WatchedMovieType).runtime, 10)}
              deleteWatchedMovie={deleteWatchedMovie}
              id={movie.imdbID}
            />
          )}
        </MenuCard>
      ))}
    </ul>
  );
}
