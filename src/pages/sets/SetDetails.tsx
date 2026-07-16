import { useParams, Link, useNavigate } from "react-router-dom";
import { getSet, deleteSet } from "../../services/fakeWorkoutService";
import { Container, Paper, Typography, Button, Stack } from "@mui/material";

export default function SetDetails() {
  const { id, exerciseId, setId } = useParams();
  const navigate = useNavigate();

  function handleDelete() {
    deleteSet(Number(id), Number(exerciseId), Number(setId));
    navigate(`/workouts/${id}/exercises/${exerciseId}`);
  }

  const set = getSet(Number(id), Number(exerciseId), Number(setId));

  if (!set) return <h1>Set not found</h1>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}
          >
            Set Details
          </Typography>

          <Typography variant="h6">Reps: {set.reps}</Typography>

          <Typography variant="h6">Weight: {set.weight} kg</Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to={`/workouts/${id}/exercises/${exerciseId}/sets/${setId}/edit`}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>

            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
