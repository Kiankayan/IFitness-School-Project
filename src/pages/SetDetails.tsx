import { useParams, Link, useNavigate } from "react-router-dom";
import { getSet, deleteSet } from "../services/fakeWorkoutService";

export default function SetDetails() {
  const { id, exerciseId, setId } = useParams();
  const navigate = useNavigate();

  function handleDelete() {
    deleteSet(Number(id), Number(exerciseId), Number(setId));
    navigate(`/workouts/${id}/exercises/${exerciseId}`);
  }

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
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
