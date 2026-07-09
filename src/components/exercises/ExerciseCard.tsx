import { type Exercise } from "../../types/types";

interface Props {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: Props) {
  return (
    <div>
      <h3>{exercise.name}</h3>

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
