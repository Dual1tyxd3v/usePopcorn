import Logo from '../logo/logo';

type NavProps = {
  moviesLength: number;
  query: string;
  changeQuery: (v: string) => void;
};

export default function Nav({ moviesLength, query, changeQuery }: NavProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => changeQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{moviesLength}</strong> results
      </p>
    </nav>
  );
}
