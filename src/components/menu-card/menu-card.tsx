import { MovieType, WatchedMovieType } from '../../types/types';
import { MouseEvent } from 'react';

type MenuCardProps = {
  movie: MovieType | WatchedMovieType;
  children: JSX.Element;
  changeActiveId: (v: string | null) => void;
};

export default function MenuCard({
  movie,
  children,
  changeActiveId,
}: MenuCardProps) {
  const { Title, Poster, imdbID } = movie;

  function onClickHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('btn-delete')) {
      return;
    }
    changeActiveId(imdbID);
  }
  return (
    <li onClick={onClickHandler}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>{children}</div>
    </li>
  );
}
