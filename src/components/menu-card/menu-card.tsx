import { MovieType, WatchedMovieType } from '../../types/types';

type MenuCardProps = {
  movie: MovieType | WatchedMovieType;
  children: JSX.Element;
  changeActiveId: (v: string | null) => void;
};

export default function MenuCard({ movie, children, changeActiveId }: MenuCardProps) {
  const {Title, Poster, imdbID} = movie;
  return (
    <li onClick={() => changeActiveId(imdbID)}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>{children}</div>
    </li>
  );
}
