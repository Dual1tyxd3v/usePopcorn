export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type MovieDataType = MovieType[];

export type WatchedMovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
};

export type WatchedMovieDataType = WatchedMovieType[];

export type ResponseType = {
  Search: MovieDataType;
  totalResults: number;
  Response: boolean;
}
