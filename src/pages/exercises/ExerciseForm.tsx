import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveExercise, getExercise } from "../../services/fakeWorkoutService";

export default function ExerciseForm() {
  const { id, exerciseId } = useParams();
  const workoutId = Number(id);
  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState("");

  useEffect(() => {
    if (!exerciseId) return;

    const exercise = getExercise(workoutId, Number(exerciseId));
    if (exercise) {
      setExerciseName(exercise.name);
    }
  }, [exerciseId]);

  function handleSubmit(event: any) {
    event.preventDefault();

    const existingExercise = exerciseId
      ? getExercise(workoutId, Number(exerciseId))
      : undefined;

    const exerciseToSave = {
      id: existingExercise ? existingExercise.id : 0,
      name: exerciseName,
      sets: existingExercise ? existingExercise.sets : [],
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
