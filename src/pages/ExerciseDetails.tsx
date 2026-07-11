import { useParams, useNavigate, Link } from "react-router-dom";
import { getExercise } from "../services/fakeWorkoutService";

export default function ExerciseDetails() {
  const { id, exerciseId } = useParams();
  const exercise = getExercise(Number(id), Number(exerciseId));
  const navigate = useNavigate();

  if (!exercise) return <h1>Exercise not found</h1>;

  return (
    <>
      <h1>{exercise.name}</h1>

      <h2>Sets</h2>

      <button
        onClick={() =>
          navigate(`/workouts/${id}/exercises/${exerciseId}/sets/new`)
        }
      >
        Add Set
      </button>

      <ul>
        {exercise.sets.map((set) => (
          <li key={set.id}>
            <Link to={`/workouts/${id}/exercises/${exerciseId}/sets/${set.id}`}>
              {set.reps} reps x {set.weight} kg
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
