import { WatchedMovieDataType } from '../../types/types';
import { average } from '../../utils';
import ContentWatchedMovie from '../content-watched-movie/content-watched-movie';

type SummaryProps = {
  watched: WatchedMovieDataType;
};

export default function Summary({ watched }: SummaryProps) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <ContentWatchedMovie
          imdbRating={avgImdbRating}
          userRating={avgUserRating}
          runtime={avgRuntime}
        />
      </div>
    </div>
  );
}
