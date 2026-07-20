import { useParams, useNavigate } from "react-router-dom";
import { getWorkout, saveWorkout } from "../../services/fakeWorkoutService";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

export default function WorkoutForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = id ? getWorkout(Number(id)) : null;

  const [title, setTitle] = useState(workout?.title || "");
  const [date, setDate] = useState(workout?.date || "");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  function handleSubmit(event: any) {
    event.preventDefault();

    const workoutToSave = {
      id: workout?.id || 0,
      title: title,
      date: date,
      exercises: workout?.exercises || [],
    };

    saveWorkout(workoutToSave);

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate("/workouts");
    }, 1000);
  }

  const snackbarMessage = workout
    ? "Workout updated successfully!"
    : "Workout added successfully!";

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
            Add or update your workout.
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
              startIcon={workout ? <UpdateIcon /> : <AddIcon />}
            >
              {workout ? "Update Workout" : "Add Workout"}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
