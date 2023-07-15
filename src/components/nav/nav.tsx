type NavProps = {
  moviesLength: number;
  query: string;
  onChangeInputHandler: (value: string) => void;
};

export default function Nav({ moviesLength, query, onChangeInputHandler }: NavProps) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onChangeInputHandler(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{moviesLength}</strong> results
      </p>
    </nav>
  );
}
