import { useParams } from "react-router-dom";
import { getWorkout } from "../services/fakeWorkoutService";
import { useState } from "react";

export default function WorkoutForm() {
  const { id } = useParams();
  const workout = id ? getWorkout(Number(id)) : null;

  const [title, setTitle] = useState(workout?.title || "");
  const [date, setDate] = useState(workout?.date || "");

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Workout Form</h1>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
