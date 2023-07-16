import { useEffect, useState } from 'react';
import { fetchFullMovie } from '../../utils';
import { FullMovieType } from '../../types/types';
import Loader from '../loader/loader';
import Error from '../error/error';
import Stars from '../stars/stars';

type MovieProps = {
  id: string;
  closeHandler: (v: string | null) => void;
};

export default function Movie({ id, closeHandler }: MovieProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const [movie, setMovie] = useState<null | FullMovieType>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const mov = await fetchFullMovie(id);
        setMovie(mov);
      } catch (e) {
        const err = e as Error;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    id && loadMovies();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !movie) {
    return <Error message={(error as string) || 'Oops! Try again later...'} />;
  }
  const {
    Title, Poster, Runtime, imdbRating, Plot, Released, Actors, Director, Genre,
  } = movie;
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => closeHandler(null)}>
          &larr;
        </button>
        <img src={Poster} alt={Title} />
        <div className="details-overview">
          <h2>{Title}</h2>
          <p>
            {Released} &bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            {' '}
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <Stars />
        </div>
        <p>
          <em>{Plot}</em>
        </p>
        <p>Starring {Actors}</p>
        <p>Directed by {Director}</p>
      </section>
    </div>
  );
}
