import { useParams } from "react-router-dom";

export default function SetDetails() {
  const { id, exerciseId, setId } = useParams();

  return (
    <>
      <h1>Set Details</h1>

      <p>Workout ID: {id}</p>
      <p>Exercise ID: {exerciseId}</p>
      <p>Set ID: {setId}</p>
    </>
  );
}
