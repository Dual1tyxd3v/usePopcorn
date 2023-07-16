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
  type?: string;
  changeActiveId: (v: null | string) => void;
};

export default function MovieList({ movies, type = '', changeActiveId }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MenuCard changeActiveId={changeActiveId} key={movie.imdbID} movie={movie}>
          {type === 'short' ? (
            <ContentMovie year={movie.Year} />
          ) : (
            <ContentWatchedMovie
              imdbRating={(movie as WatchedMovieType).imdbRating}
              userRating={(movie as WatchedMovieType).userRating}
              runtime={(movie as WatchedMovieType).runtime}
            />
          )}
        </MenuCard>
      ))}
    </ul>
  );
}
