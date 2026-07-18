import { useParams, Link, useNavigate } from "react-router-dom";
import { getSet, deleteSet } from "../../services/fakeWorkoutService";
import { Container, Paper, Typography, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RepeatIcon from "@mui/icons-material/Repeat";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";

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
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              width: "fit-content",
              mb: 3,
              borderColor: "#4E8B42",
              color: "#4E8B42",
              borderRadius: 2,

              "&:hover": {
                borderColor: "#3d6f34",
                color: "#3d6f34",
                backgroundColor: "rgba(78,139,66,0.08)",
              },
            }}
          >
            Back To Exercise
          </Button>
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: "bold",
            }}
          >
            <FitnessCenterIcon color="success" />
            Set Details
          </Typography>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <RepeatIcon color="success" />
            {set.reps} reps
          </Typography>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MonitorWeightIcon color="success" />
            {set.weight} kg
          </Typography>

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
