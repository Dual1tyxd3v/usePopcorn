type ContentWatchedMovieProps = {
  imdbRating: number;
  userRating: number;
  runtime: number;
};

export default function ContentWatchedMovie({
  imdbRating,
  userRating,
  runtime,
}: ContentWatchedMovieProps) {
  return (
    <>
      <p>
        <span>⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime} min</span>
      </p>
    </>
  );
}
