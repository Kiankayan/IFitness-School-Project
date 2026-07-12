import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWorkout, getWorkouts } from "../../services/fakeWorkoutService";
import type { Workout } from "../../types/types";
import { WorkoutList } from "../../components/workouts";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigate = useNavigate();

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

      <button onClick={() => navigate("/workouts/new")}>Add Workout</button>

      <WorkoutList workouts={workouts} onDelete={handleDelete} />
    </>
  );
}
