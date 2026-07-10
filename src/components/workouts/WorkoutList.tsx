import type { Workout } from "../../types/types";
import WorkoutCard from "./WorkoutCard";

interface Props {
  workouts: Workout[];
  onDelete: (id: number) => void;
}

export default function WorkoutList({ workouts, onDelete }: Props) {
  return (
    <>
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} onDelete={onDelete} />
      ))}
    </>
  );
}
