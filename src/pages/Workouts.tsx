import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWorkouts } from "../services/fakeWorkoutService";
import type { Workout } from "../types/types";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  return (
    <>
      <h1>Workouts</h1>

      {workouts.map((workout) => (
        <div key={workout.id}>
          <h3>
            <Link to={`/workouts/${workout.id}`}>{workout.title}</Link>
          </h3>

          <p>{workout.date}</p>
        </div>
      ))}
    </>
  );
}
