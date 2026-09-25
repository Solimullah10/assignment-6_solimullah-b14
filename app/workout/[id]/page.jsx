"use client";
import { useState, useEffect } from "react";
import { usePlan } from "@/context/PlanContext";
import { useParams } from "next/navigation";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    async function getDetails() {
      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${params.id}`,
        );
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error("Failed to fetch details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) getDetails();
  }, [params.id]);

  if (loading)
    return (
      <div className="text-center py-20 text-zinc-500 font-mono">
        Loading details…
      </div>
    );
  if (!workout)
    return (
      <div className="text-center py-20 text-zinc-500">Workout not found!</div>
    );

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center">
        <img
          src={workout.image || workout.illustration}
          alt={workout.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h1 className="text-4xl font-black uppercase mb-2 tracking-tight">
          {workout.name}
        </h1>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
          {workout.description}
        </p>

        <div className="flex gap-2 mb-6">
          {workout.category?.map((cat, idx) => (
            <span
              key={idx}
              className="bg-[#ccff00] text-black font-bold text-xs uppercase px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="bg-[#121418] border border-zinc-800 rounded-xl p-4 mb-8 space-y-3">
          <div className="flex justify-between text-xs py-1 border-b border-zinc-800">
            <span className="text-zinc-500 font-semibold uppercase">
              Equipment
            </span>
            <span className="font-bold text-zinc-200">{workout.equipment}</span>
          </div>
          <div className="flex justify-between text-xs py-1 border-b border-zinc-800">
            <span className="text-zinc-500 font-semibold uppercase">
              Difficulty
            </span>
            <span className="font-bold text-zinc-200">
              {workout.difficulty}
            </span>
          </div>
          <div className="flex justify-between text-xs py-1 border-b border-zinc-800">
            <span className="text-zinc-500 font-semibold uppercase">
              Sets / Reps
            </span>
            <span className="font-bold text-zinc-200">
              {workout.sets} / {workout.reps}
            </span>
          </div>
          <div className="flex justify-between text-xs py-1 border-b border-zinc-800">
            <span className="text-zinc-500 font-semibold uppercase">
              Duration
            </span>
            <span className="font-bold text-zinc-200">{workout.duration}</span>
          </div>
          <div className="flex justify-between text-xs py-1 border-b border-zinc-800">
            <span className="text-zinc-500 font-semibold uppercase">
              Calories
            </span>
            <span className="font-bold text-zinc-200">
              {workout.caloriesBurned || workout.calories || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-xs py-1">
            <span className="text-zinc-500 font-semibold uppercase">
              Rating
            </span>
            <span className="font-bold text-zinc-200">★ {workout.rating}</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase mb-3 text-zinc-300">
            Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-400">
            {workout.instructions?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => addToPlan(workout)}
            className="bg-[#ccff00] text-black font-extrabold text-xs px-5 py-3 rounded-lg flex items-center gap-2 uppercase hover:bg-[#b3ff00]"
          >
            📅 Add to today's plan
          </button>
          <button
            onClick={() => saveForLater(workout)}
            className="border border-zinc-700 text-zinc-300 font-bold text-xs px-5 py-3 rounded-lg flex items-center gap-2 uppercase hover:border-white"
          >
            🔖 Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
