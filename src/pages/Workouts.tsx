import { useEffect, useState } from "react";
import type { Workout } from "../types/types";
import { getWorkouts } from "../services/fakeWorkoutService";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  return (
    <>
      <h1>Workouts</h1>
      {workouts.map((workout) => (
        <h3 key={workout.id}>{workout.title}</h3>
      ))}
    </>
  );
}
