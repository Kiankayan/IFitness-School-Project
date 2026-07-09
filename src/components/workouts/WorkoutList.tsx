import type { Workout } from "../../types/types";
import WorkoutCard from "./WorkoutCard";

interface Props {
  workouts: Workout[];
}

export default function WorkoutList({ workouts }: Props) {
  return (
    <>
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </>
  );
}
