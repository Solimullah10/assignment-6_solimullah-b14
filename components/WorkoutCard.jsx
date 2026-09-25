import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="block">
      <div className="bg-[#121418] border border-zinc-800 hover:border-zinc-600 rounded-xl overflow-hidden transition group">
        <div className="h-48 bg-zinc-900 overflow-hidden relative">
          <img
            src={workout.image || workout.illustration}
            alt={workout.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-2">
            {workout.category?.map((cat, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase"
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 className="font-black uppercase text-sm mb-1 text-white group-hover:text-[#ccff00] transition">
            {workout.name}
          </h3>
          <p className="text-zinc-500 text-xs mb-4">{workout.equipment}</p>

          <div className="flex justify-between items-center text-xs text-zinc-400 border-t border-zinc-800/80 pt-3">
            <span>⏱️ {workout.duration}</span>
            <span>🔥 {workout.caloriesBurned || workout.calories || "0"}</span>
            <span>★ {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
