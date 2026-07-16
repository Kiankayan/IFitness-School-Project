import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveSet, getSet } from "../../services/fakeWorkoutService";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export default function SetForm() {
  const { id, exerciseId, setId } = useParams();

  const workoutId = Number(id);
  const exerciseIdNumber = Number(exerciseId);

  const navigate = useNavigate();

  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

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
    const existingSet = setId
      ? getSet(workoutId, exerciseIdNumber, Number(setId))
      : undefined;

    const setToSave = {
      id: existingSet ? existingSet.id : 0,
      reps,
      weight,
    };
    saveSet(workoutId, exerciseIdNumber, setToSave);
    navigate(`/workouts/${workoutId}/exercises/${exerciseIdNumber}`);
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
            Set Form
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Create or edit your set.
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Reps"
              type="number"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              fullWidth
            />

            <TextField
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Save Set
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
