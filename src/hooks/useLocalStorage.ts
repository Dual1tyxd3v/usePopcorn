import { useEffect, useState } from 'react';

export function useLocalStorage<T>(initState: T, name: string) {
  const [watched, setWatched] = useState<T>(() => {
    const movs = localStorage.getItem(name);
    return movs ? (JSON.parse(movs) as T) : initState;
  });

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(watched));
  }, [watched, name]);

  return {watched, setWatched};
}
