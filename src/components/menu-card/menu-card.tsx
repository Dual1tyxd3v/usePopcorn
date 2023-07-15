import { MovieType, WatchedMovieType } from '../../types/types';

type MenuCardProps = {
  movie: MovieType | WatchedMovieType;
  children: JSX.Element;
};

export default function MenuCard({ movie, children }: MenuCardProps) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>{children}</div>
    </li>
  );
}
