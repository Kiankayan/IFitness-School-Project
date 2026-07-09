import type { Workout } from "../../types/types";
import { Link } from "react-router-dom";

interface Props {
  workouts: Workout[];
}

export default function WorkoutList({ workouts }: Props) {
  return (
    <>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <h3>
            <Link to={`/workouts/${workout.id}`}>{workout.title}</Link>
          </h3>

          <p>{workout.date}</p>
        </div>
      ))}
    </>
  );
}
