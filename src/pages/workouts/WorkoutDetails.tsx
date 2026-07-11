import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getWorkout, deleteExercise } from "../../services/fakeWorkoutService";
import { ExerciseList } from "../../components/exercises";

export default function WorkoutsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = getWorkout(Number(id));

  const [exercises, setExercises] = useState(workout ? workout.exercises : []);

  if (!workout) return <h1>Workout not found</h1>;

  function handleDelete(exerciseId: number) {
    deleteExercise(workout!.id, exerciseId);
    const newExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId,
    );

    setExercises(newExercises);
  }

  return (
    <>
      <h1>{workout.title}</h1>
      <p>{workout.date}</p>

      <h2>Exercises</h2>

      <button onClick={() => navigate(`/workouts/${id}/exercises/new`)}>
        Add Exercise
      </button>

      <ExerciseList
        exercises={exercises}
        workoutId={workout!.id}
        onDelete={handleDelete}
      />
    </>
  );
}
