import { useState, useEffect } from 'react';
import { QUERY_CHANGE_DELAY } from '../const';
import { MovieDataType } from '../types/types';
import { fetchMovies } from '../utils';

export function useMovie(query: string) {
  const [movies, setMovies] = useState<MovieDataType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);

  useEffect(() => {
    const controller = new AbortController();
    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const movs = await fetchMovies(query, controller);
        setMovies(movs.Search || []);
      } catch (e) {
        const err = e as Error;
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    const timer = setTimeout(() => {
      query.length && loadMovies();
    }, QUERY_CHANGE_DELAY);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
