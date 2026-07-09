import { useParams } from "react-router-dom";
import { getWorkout } from "../services/fakeWorkoutService";
import ExerciseList from "../components/exercises/ExerciseList";

export default function WorkoutsDetails() {
  const { id } = useParams();
  const workout = getWorkout(Number(id));

  if (!workout) return <h1>Workout not found</h1>;

  return (
    <>
      <h1>{workout.title}</h1>
      <p>{workout.date}</p>
      <h2>Exercises</h2>
      <ExerciseList exercises={workout.exercises} />
    </>
  );
}
