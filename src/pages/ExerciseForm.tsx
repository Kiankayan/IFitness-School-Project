import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveExercise } from "../services/fakeWorkoutService";

export default function ExerciseForm() {
  const { id } = useParams();
  const workoutId = Number(id);
  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();

    const exerciseToSave = {
      id: 0,
      name: exerciseName,
      sets: [],
    };

    saveExercise(workoutId, exerciseToSave);
    navigate(`/workouts/${workoutId}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Exercise Form</h1>

      <label>Exercise Name</label>
      <input
        type="text"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>
  );
}
