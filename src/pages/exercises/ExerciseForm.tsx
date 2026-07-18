import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveExercise, getExercise } from "../../services/fakeWorkoutService";

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

export default function ExerciseForm() {
  const { id, exerciseId } = useParams();
  const workoutId = Number(id);
  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!exerciseId) return;

    const exercise = getExercise(workoutId, Number(exerciseId));
    if (exercise) {
      setExerciseName(exercise.name);
    }
  }, [exerciseId]);

  function handleSubmit(event: any) {
    event.preventDefault();

    const existingExercise = exerciseId
      ? getExercise(workoutId, Number(exerciseId))
      : undefined;

    const exerciseToSave = {
      id: existingExercise ? existingExercise.id : 0,
      name: exerciseName,
      sets: existingExercise ? existingExercise.sets : [],
    };

    saveExercise(workoutId, exerciseToSave);

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate(`/workouts/${workoutId}`);
    }, 1000);
  }

  const snackbarMessage = exerciseId
    ? "Exercise updated successfully!"
    : "Exercise created successfully!";

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
            Exercise Form
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Create or edit your exercise.
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Exercise Name"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Save Exercise
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
