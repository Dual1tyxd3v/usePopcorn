type ContentMovieProps = {
  year: string;
};

export default function ContentMovie({year}: ContentMovieProps) {
  return (
    <div>
      <p>
        <span>🗓</span>
        <span>{year}</span>
      </p>
    </div>
  );
}
