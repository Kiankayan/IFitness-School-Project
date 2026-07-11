import { useEffect, useState } from "react";
import { deleteWorkout, getWorkouts } from "../../services/fakeWorkoutService";
import type { Workout } from "../../types/types";
import WorkoutList from "../../components/workouts/WorkoutList";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  function handleDelete(id: number) {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(updatedWorkouts);
    deleteWorkout(id);
  }

  return (
    <>
      <h1>Workouts</h1>

      <WorkoutList workouts={workouts} onDelete={handleDelete} />
    </>
  );
}
