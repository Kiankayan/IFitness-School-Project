import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveSet, getSet } from "../../services/fakeWorkoutService";
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

export default function SetForm() {
  const { id, exerciseId, setId } = useParams();

  const workoutId = Number(id);
  const exerciseIdNumber = Number(exerciseId);

  const navigate = useNavigate();

  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const [errors, setErrors] = useState({
    reps: "",
    weight: "",
  });

  useEffect(() => {
    if (!setId) return;

    const existingSet = getSet(workoutId, exerciseIdNumber, Number(setId));

    if (existingSet) {
      setReps(existingSet.reps);
      setWeight(existingSet.weight);
    }
  }, [setId, workoutId, exerciseIdNumber]);

  function handleSubmit(event: any) {
    event.preventDefault();
    const newErrors = {
      reps: "",
      weight: "",
    };

    if (reps <= 0) {
      newErrors.reps = "Reps must be greater than 0.";
    }

    if (weight < 0) {
      newErrors.weight = "Weight cannot be negative.";
    }

    setErrors(newErrors);

    if (newErrors.reps || newErrors.weight) {
      setOpenErrorSnackbar(true);
      return;
    }
    const existingSet = setId
      ? getSet(workoutId, exerciseIdNumber, Number(setId))
      : undefined;

    const setToSave = {
      id: existingSet ? existingSet.id : 0,
      reps,
      weight,
    };
    saveSet(workoutId, exerciseIdNumber, setToSave);

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate(`/workouts/${workoutId}/exercises/${exerciseIdNumber}`);
    }, 1000);
  }
  const snackbarMessage = setId
    ? "Set updated successfully!"
    : "Set added successfully!";

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
            Set Form
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Add or update your set.
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Reps"
              type="number"
              value={reps}
              onChange={(e) => {
                setReps(Number(e.target.value));

                if (errors.reps) {
                  setErrors({
                    ...errors,
                    reps: "",
                  });
                }
              }}
              error={!!errors.reps}
              helperText={errors.reps}
              fullWidth
            />

            <TextField
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => {
                setWeight(Number(e.target.value));

                if (errors.weight) {
                  setErrors({
                    ...errors,
                    weight: "",
                  });
                }
              }}
              error={!!errors.weight}
              helperText={errors.weight}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              startIcon={setId ? <UpdateIcon /> : <AddIcon />}
            >
              {setId ? "Update Set" : "Add Set"}
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
          Please fill in all required fields.
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
