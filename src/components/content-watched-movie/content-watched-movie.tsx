type ContentWatchedMovieProps = {
  imdbRating: number;
  userRating: number;
  runtime: number;
  id?: string;
  deleteWatchedMovie?: (i: string) => void;
};

export default function ContentWatchedMovie({
  imdbRating,
  userRating,
  runtime,
  id,
  deleteWatchedMovie
}: ContentWatchedMovieProps) {
  return (
    <>
      <p>
        <span>⭐️</span>
        <span>{imdbRating.toFixed(1)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{userRating.toFixed(1)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime} min</span>
      </p>
      {deleteWatchedMovie && <button className="btn-delete" onClick={() => deleteWatchedMovie(id as string)}>X</button>}
    </>
  );
}
