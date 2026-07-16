import { useParams, useNavigate } from "react-router-dom";
import { getWorkout, saveWorkout } from "../../services/fakeWorkoutService";
import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export default function WorkoutForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = id ? getWorkout(Number(id)) : null;

  const [title, setTitle] = useState(workout?.title || "");
  const [date, setDate] = useState(workout?.date || "");

  function handleSubmit(event: any) {
    event.preventDefault();

    const workoutToSave = {
      id: workout?.id || 0,
      title: title,
      date: date,
      exercises: workout?.exercises || [],
    };

    saveWorkout(workoutToSave);
    navigate("/workouts");
  }

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Workout Form
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Create or edit your workout.
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Workout Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />

            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Save Workout
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
