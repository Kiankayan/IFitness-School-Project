import { useEffect, useState } from "react";
import type { Workout } from "../types/types";
import { getWorkouts } from "../services/fakeWorkoutService";
import { Link } from "react-router-dom";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  return (
    <>
      <h1>Workouts</h1>
      {workouts.map((workout) => (
        <li key={workout.id}>
          <Link to={`/workouts/${workout.id}`}>{workout.title}</Link>
        </li>
      ))}
    </>
  );
}
