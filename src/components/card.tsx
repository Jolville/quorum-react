export function Card(props: { children: React.ReactNode }) {
  return (
    <div className="p-8 rounded-2xl shadow-lg bg-white">{props.children}</div>
  );
}
