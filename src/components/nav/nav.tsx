import { useRef } from 'react';
import Logo from '../logo/logo';
import { useKeydown } from '../../hooks/useKeydown';

type NavProps = {
  moviesLength: number;
  query: string;
  changeQuery: (v: string) => void;
};

export default function Nav({ moviesLength, query, changeQuery }: NavProps) {
  const inputEl = useRef(null);
  useKeydown(() => {
    if (!inputEl.current) {
      return;
    }
    const input = inputEl.current as HTMLInputElement;
    if (document.activeElement !== input) {
      changeQuery('');
    }
    input.focus();
  }, 'enter');

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
