import { type Exercise } from "../../types/types";
import { Link } from "react-router-dom";

interface Props {
  exercise: Exercise;
  workoutId: number;
}

export default function ExerciseCard({ exercise, workoutId }: Props) {
  return (
    <div>
      <h3>
        <Link to={`/workouts/${workoutId}/exercises/${exercise.id}`}>
          {exercise.name}
        </Link>
      </h3>

      <ul>
        {exercise.sets.map((set) => (
          <li key={set.id}>
            {set.reps} reps x {set.weight} kg
          </li>
        ))}
      </ul>
    </div>
  );
}
