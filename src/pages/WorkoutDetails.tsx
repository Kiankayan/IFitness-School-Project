import { useParams, useNavigate } from "react-router-dom";
import { getWorkout } from "../services/fakeWorkoutService";
import ExerciseList from "../components/exercises/ExerciseList";

export default function WorkoutsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = getWorkout(Number(id));

  if (!workout) return <h1>Workout not found</h1>;

  return (
    <>
      <h1>{workout.title}</h1>
      <p>{workout.date}</p>
      <h2>Exercises</h2>
      <button onClick={() => navigate(`/workouts/${id}/exercises/new`)}>
        Add Exercise
      </button>
      <ExerciseList exercises={workout.exercises} workoutId={workout.id} />
    </>
  );
}
