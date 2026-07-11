import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveSet, getSet } from "../services/fakeWorkoutService";

export default function SetForm() {
  const { id, exerciseId, setId } = useParams();

  const workoutId = Number(id);
  const exerciseIdNumber = Number(exerciseId);

  const navigate = useNavigate();

  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    if (!setId) return;

    const existingSet = getSet(workoutId, exerciseIdNumber, Number(setId));

    if (existingSet) {
      setReps(existingSet.reps);
      setWeight(existingSet.weight);
    }
  }, [setId, workoutId, exerciseIdNumber]);

  function handleSubmit(event: any) {
    event.preventDefault();
    const existingSet = setId
      ? getSet(workoutId, exerciseIdNumber, Number(setId))
      : undefined;

    const setToSave = {
      id: existingSet ? existingSet.id : 0,
      reps,
      weight,
    };
    saveSet(workoutId, exerciseIdNumber, setToSave);
    navigate(`/workouts/${workoutId}/exercises/${exerciseIdNumber}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Set Form</h1>

      <label>Reps</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(Number(e.target.value))}
      />

      <label>Weight</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      <button type="submit">Save</button>
    </form>
  );
}
