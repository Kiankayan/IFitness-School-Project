import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { saveSet } from "../services/fakeWorkoutService";

export default function SetForm() {
  const { id, exerciseId } = useParams();

  const workoutId = Number(id);
  const exerciseIdNumber = Number(exerciseId);

  const navigate = useNavigate();

  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

  function handleSubmit(event: any) {
    event.preventDefault();
    const setToSave = {
      id: 0,
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
