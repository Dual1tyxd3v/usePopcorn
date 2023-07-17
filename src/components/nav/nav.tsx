import { useEffect, useRef } from 'react';
import Logo from '../logo/logo';

type NavProps = {
  moviesLength: number;
  query: string;
  changeQuery: (v: string) => void;
};

export default function Nav({ moviesLength, query, changeQuery }: NavProps) {
  const inputEl = useRef(null);

  useEffect(() => {
    if (!inputEl.current) {
      return;
    }
    const input = inputEl.current as HTMLInputElement;
    function callback(e: KeyboardEvent) {
      if (e.code !== 'Enter') {
        return;
      }
      if (document.activeElement !== input) {
        changeQuery('');
      }
      input.focus();
    }
    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [changeQuery]);
  return (
    <nav className="nav-bar">
      <Logo />
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => changeQuery(e.target.value)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{moviesLength}</strong> results
      </p>
    </nav>
  );
}
