import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveExercise, getExercise } from "../../services/fakeWorkoutService";
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

export default function ExerciseForm() {
  const { id, exerciseId } = useParams();
  const workoutId = Number(id);
  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const [errors, setErrors] = useState({
    exerciseName: "",
  });

  useEffect(() => {
    if (!exerciseId) return;

    const exercise = getExercise(workoutId, Number(exerciseId));
    if (exercise) {
      setExerciseName(exercise.name);
    }
  }, [exerciseId]);

  function handleSubmit(event: any) {
    event.preventDefault();

    const newErrors = {
      exerciseName: "",
    };

    if (!exerciseName.trim()) {
      newErrors.exerciseName = "Exercise name is required.";
    }

    setErrors(newErrors);

    if (newErrors.exerciseName) {
      setOpenErrorSnackbar(true);
      return;
    }

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
    : "Exercise added successfully!";

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
            Add or update your exercise.
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Exercise Name"
              value={exerciseName}
              onChange={(e) => {
                setExerciseName(e.target.value);

                if (errors.exerciseName) {
                  setErrors({
                    ...errors,
                    exerciseName: "",
                  });
                }
              }}
              error={!!errors.exerciseName}
              helperText={errors.exerciseName}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              startIcon={exerciseId ? <UpdateIcon /> : <AddIcon />}
            >
              {exerciseId ? "Update Exercise" : "Add Exercise"}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenErrorSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please fill in the required field.
        </Alert>
      </Snackbar>
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
