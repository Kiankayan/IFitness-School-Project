import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWorkout, getWorkouts } from "../../services/fakeWorkoutService";
import type { Workout } from "../../types/types";
import { WorkoutList } from "../../components/workouts";
import { Container, Typography, Button, Stack } from "@mui/material";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  function handleDelete(id: number) {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(updatedWorkouts);
    deleteWorkout(id);
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Stack spacing={3}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
          }}
        >
          Workouts
        </Typography>

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/workouts/new")}
          sx={{
            width: "fit-content",
            borderRadius: 3,
            px: 4,
          }}
        >
          Add Workout
        </Button>

        <WorkoutList workouts={workouts} onDelete={handleDelete} />
      </Stack>
    </Container>
  );
}
