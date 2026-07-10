import { type Exercise } from "../../types/types";
import { Link } from "react-router-dom";

interface Props {
  exercise: Exercise;
  workoutId: number;
  onDelete: (exerciseId: number) => void;
}

export default function ExerciseCard({ exercise, workoutId, onDelete }: Props) {
  function handleDelete() {
    onDelete(exercise.id);
  }

  return (
    <div>
      <h3>
        <Link to={`/workouts/${workoutId}/exercises/${exercise.id}`}>
          {exercise.name}
        </Link>
      </h3>

      <Link to={`/workouts/${workoutId}/exercises/${exercise.id}/edit`}>
        Edit
      </Link>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
