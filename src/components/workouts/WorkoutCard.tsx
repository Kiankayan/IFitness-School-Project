import type { Workout } from "../../types/types";
import { Link } from "react-router-dom";

interface Props {
  workout: Workout;
}

export default function WorkoutCard({ workout }: Props) {
  return (
    <div>
      <h3>
        <Link to={`/workouts/${workout.id}`}>{workout.title}</Link>
      </h3>

      <p>{workout.date}</p>
    </div>
  );
}
