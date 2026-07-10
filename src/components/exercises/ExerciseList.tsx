import { type Exercise } from "../../types/types";
import ExerciseCard from "./ExerciseCard";

interface Props {
  exercises: Exercise[];
  workoutId: number;
  onDelete: (exerciseId: number) => void;
}

export default function ExerciseList({
  exercises,
  workoutId,
  onDelete,
}: Props) {
  return (
    <>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          workoutId={workoutId}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
