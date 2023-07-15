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
};

export default function MovieList({ movies, type = '' }: MovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MenuCard key={movie.imdbID} movie={movie}>
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
