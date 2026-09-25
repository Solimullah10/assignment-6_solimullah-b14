import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#0b0c0e] text-zinc-500 border-t border-zinc-800 px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-xs">
      <div className="flex items-center gap-2 mb-4 sm:mb-0">
        <span className=" text-black px-1.5 py-0.5 rounded font-black text-xs">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </span>
        <span className="font-black text-white tracking-wider">FITLOG</span>
      </div>
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}
