"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import WorkoutCard from "@/components/WorkoutCard";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration")
      return parseInt(a.duration, 10) - parseInt(b.duration, 10);
    if (sortBy === "calories") {
      const calA = parseInt(a.caloriesBurned || a.calories || 0, 10);
      const calB = parseInt(b.caloriesBurned || b.calories || 0, 10);
      return calA - calB;
    }
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center border-b border-zinc-800">
        <div>
          <span className="text-[#ccff00] text-xs font-bold uppercase tracking-widest">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase my-4 leading-none tracking-tight">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded uppercase text-sm hover:bg-[#b3ff00] transition"
          >
            BROWSE WORKOUTS ↓
          </a>
        </div>
        <div className="flex justify-center">
          <div className="w-full h-64 border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 font-mono">
            <Image
              src="/banner.png"
              alt="Workout Equipment Banner"
              width={320}
              height={320}
              className="object-contain drop-shadow-[0_10px_20px_rgba(204,255,0,0.15)]"
              priority
            ></Image>
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="px-6 py-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black uppercase">THE LIBRARY</h2>
            <p className="text-zinc-400 text-sm">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-400 uppercase font-semibold">
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-white text-xs py-2 px-3 rounded cursor-pointer outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500 font-mono animate-pulse">
            Loading workouts…
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
