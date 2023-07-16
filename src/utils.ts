import { API_URL } from './const';
import { ResponseType } from './types/types';

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arrs) => acc + cur / arrs.length, 0);

export const fetchMovies = async (query: string) => {
  const res = await fetch(`${API_URL}${query}`);
  if (!res.ok) {
    throw new Error('Could not load');
  }
  const data = await res.json() as ResponseType;
  if (!data.Search) {
    throw new Error('Films not found');
  }
  return data;
};

