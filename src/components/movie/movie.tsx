type MovieProps = {
  id: string;
  closeHandler: (v: string | null) => void;
};

export default function Movie({ id, closeHandler }: MovieProps) {
  return (
    <>
      <p>{id}</p>
      <button className="btn-back" onClick={() => closeHandler(null)}>
        &larr;
      </button>
    </>
  );
}
