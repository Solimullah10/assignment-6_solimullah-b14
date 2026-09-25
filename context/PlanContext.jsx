"use client";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedPlan, setSavedPlan] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_todayPlan");
    const localSaved = localStorage.getItem("fitlog_savedPlan");
    if (localPlan) setTodayPlan(JSON.parse(localPlan));
    if (localSaved) setSavedPlan(JSON.parse(localSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_todayPlan", JSON.stringify(todayPlan));
    localStorage.setItem("fitlog_savedPlan", JSON.stringify(savedPlan));
  }, [todayPlan, savedPlan]);

  const addToPlan = (workout) => {
    if (todayPlan.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!");
      return;
    }
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already added to today's plan!");
      return;
    }

    // ক্যালোরির ভ্যালু পার্স করে ক্লিন অবজেক্ট হিসেবে সেভ করা
    const rawCal = workout.caloriesBurned ?? workout.calories ?? 0;
    const calNumber =
      typeof rawCal === "string"
        ? parseInt(rawCal.replace(/[^0-9]/g, ""), 10)
        : Number(rawCal);

    const formattedWorkout = {
      ...workout,
      calories: isNaN(calNumber) ? 0 : calNumber,
    };

    setTodayPlan([...todayPlan, formattedWorkout]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout) => {
    if (savedPlan.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!");
      return;
    }
    setSavedPlan([...savedPlan, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id) => {
    setTodayPlan(todayPlan.filter((item) => item.id !== id));
    toast.success("Removed from plan");
  };

  const removeFromSaved = (id) => {
    setSavedPlan(savedPlan.filter((item) => item.id !== id));
    toast.success("Removed from saved list");
  };

  const markAsDone = (id) => {
    if (!completedList.includes(id)) {
      setCompletedList([...completedList, id]);
      toast.success("Marked as completed!");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        completedList,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
