import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-black text-[#ccff00] mb-2">404</h1>
      <h2 className="text-2xl font-black uppercase mb-2">PAGE NOT FOUND</h2>
      <p className="text-zinc-500 text-sm mb-6">
        The lift or page you are looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-bold text-xs px-6 py-3 rounded-lg uppercase"
      >
        Return to Home
      </Link>
    </div>
  );
}
