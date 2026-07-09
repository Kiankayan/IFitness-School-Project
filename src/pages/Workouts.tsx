import { useEffect, useState } from "react";
import { getWorkouts } from "../services/fakeWorkoutService";
import type { Workout } from "../types/types";
import WorkoutList from "../components/workouts/WorkoutList";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  return (
    <>
      <h1>Workouts</h1>

      <WorkoutList workouts={workouts} />
    </>
  );
}
