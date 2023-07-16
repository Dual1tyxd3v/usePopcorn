type ErrorProps = {
  message: string;
};

export default function Error({ message }: ErrorProps) {
  return <p className="error"><span>🛑</span> {message}</p>;
}
