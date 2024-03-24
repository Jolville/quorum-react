import { Typography } from "./components";

export function Nav() {
  return (
    <nav className="flex flex-row w-full items-center gap-2 text-gray-700 py-4 px-8 border-b border-gray-200 bg-white">
      <img src="/logo.png" height={32} width={32} />
      <Typography size="xl" element="p" style="bold" className="text-gray-900">
        Quorum
      </Typography>
      <Typography
        size="s"
        element="p"
        style="bold"
        className="beta-tag text-gray-700 uppercase p-1"
      >
        Beta
      </Typography>
    </nav>
  );
}
