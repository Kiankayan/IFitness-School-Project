import { useParams, Link } from "react-router-dom";
import { getSet } from "../services/fakeWorkoutService";

export default function SetDetails() {
  const { id, exerciseId, setId } = useParams();

  const set = getSet(Number(id), Number(exerciseId), Number(setId));

  if (!set) return <h1>Set not found</h1>;

  return (
    <>
      <h1>Set Details</h1>

      <p>Reps: {set.reps}</p>
      <p>Weight: {set.weight} kg</p>

      <Link to={`/workouts/${id}/exercises/${exerciseId}/sets/${setId}/edit`}>
        Edit
      </Link>
    </>
  );
}
