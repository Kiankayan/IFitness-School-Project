import { type Exercise } from "../../types/types";
import ExerciseCard from "./ExerciseCard";

interface Props {
  exercises: Exercise[];
  workoutId: number;
}

export default function ExerciseList({ exercises, workoutId }: Props) {
  return (
    <>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          workoutId={workoutId}
        />
      ))}
    </>
  );
}
