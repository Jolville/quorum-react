export function Nav() {
  return (
    <nav className="flex flex-row w-full items-center gap-2 text-gray-700 py-4 px-8 border-b border-gray-200 bg-white">
      <img src="/logo.png" height={32} width={32} />
      <h1 className="font-bold text-xl">Quorum</h1>
      <p className="beta-tag font-bold text-sm text-gray-700 uppercase p-1">
        Beta
      </p>
    </nav>
  );
}
