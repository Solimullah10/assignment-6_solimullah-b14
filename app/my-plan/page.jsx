"use client";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";

export default function MyPlanPage() {
  const {
    todayPlan,
    savedPlan,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    completedList,
  } = usePlan();
  const [activeTab, setActiveTab] = useState("plan");

  const currentList = activeTab === "plan" ? todayPlan : savedPlan;

  const totalExercises = todayPlan.length;

  // Minutes হিসেব
  const totalMinutes = todayPlan.reduce((acc, curr) => {
    const val = curr.duration ? parseInt(curr.duration, 10) : 0;
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  // Calories হিসেব (calories, caloriesBurned বা calories_burned সব কাভার করবে)
  const totalCalories = todayPlan.reduce((acc, curr) => {
    const rawCal =
      curr.caloriesBurned ?? curr.calories ?? curr.calories_burned ?? 0;
    const val =
      typeof rawCal === "string"
        ? parseInt(rawCal.replace(/[^0-9]/g, ""), 10)
        : Number(rawCal);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black uppercase mb-1">MY PLAN</h1>
      <p className="text-zinc-500 text-xs mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Summary Cards */}
      <div className="bg-[#121418] border border-zinc-800 rounded-xl p-6 grid grid-cols-3 gap-6 mb-8">
        <div>
          <span className="text-zinc-500 text-xs uppercase font-bold block mb-1">
            Exercises
          </span>
          <span className="text-4xl font-black text-[#ccff00]">
            {totalExercises}
          </span>
        </div>
        <div className="border-l border-zinc-800 pl-6">
          <span className="text-zinc-500 text-xs uppercase font-bold block mb-1">
            Minutes
          </span>
          <span className="text-4xl font-black text-white">{totalMinutes}</span>
        </div>
        <div className="border-l border-zinc-800 pl-6">
          <span className="text-zinc-500 text-xs uppercase font-bold block mb-1">
            Calories
          </span>
          <span className="text-4xl font-black text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${
              activeTab === "plan"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Today's Plan ({todayPlan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${
              activeTab === "saved"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Saved ({savedPlan.length})
          </button>
        </div>
      </div>

      {/* List / Empty State */}
      {currentList.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-xl p-16 text-center">
          <h3 className="text-xl font-black uppercase text-zinc-400 mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-zinc-600 text-xs mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] text-black font-bold text-xs px-6 py-2.5 rounded-lg uppercase hover:bg-[#b3ff00] transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => {
            const isDone = completedList.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#121418] border border-zinc-800 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || item.illustration}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase">{item.name}</h4>
                    <p className="text-zinc-500 text-xs">{item.equipment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/workout/${item.id}`}
                    className="border border-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded hover:border-white transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded transition ${
                        isDone
                          ? "bg-zinc-700 text-zinc-400 cursor-default"
                          : "bg-[#ccff00] text-black hover:bg-[#b3ff00]"
                      }`}
                    >
                      {isDone ? "✓ Done" : "Mark as Done"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
