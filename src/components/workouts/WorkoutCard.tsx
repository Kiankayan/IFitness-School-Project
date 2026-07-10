import type { Workout } from "../../types/types";
import { Link } from "react-router-dom";

interface Props {
  workout: Workout;
  onDelete: (id: number) => void;
}

export default function WorkoutCard({ workout, onDelete }: Props) {
  return (
    <div>
      <h3>
        <Link to={`/workouts/${workout.id}`}>{workout.title}</Link>
      </h3>

      <p>{workout.date}</p>

      <Link to={`/workouts/${workout.id}/edit`}>Edit</Link>

      <button onClick={() => onDelete(workout.id)}>Delete</button>
    </div>
  );
}
