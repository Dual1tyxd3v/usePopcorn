import { useState } from 'react';
import Logo from '../logo/logo';

type NavProps = {
  moviesLength: number;
};

export default function Nav({ moviesLength }: NavProps) {
  const [query, setQuery] = useState('');
  return (
    <nav className="nav-bar">
      <Logo />
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{moviesLength}</strong> results
      </p>
    </nav>
  );
}
