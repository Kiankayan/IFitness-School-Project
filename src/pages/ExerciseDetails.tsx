import { useParams } from "react-router-dom";

export default function ExerciseDetails() {
  const { id, exerciseId } = useParams();

  return (
    <>
      <h1>Exercise Details</h1>

      <p>Workout ID: {id}</p>
      <p>Exercise ID: {exerciseId}</p>
    </>
  );
}
