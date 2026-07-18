import { useParams, useNavigate, Link } from "react-router-dom";
import { getExercise } from "../../services/fakeWorkoutService";
import { Container, Paper, Typography, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export default function ExerciseDetails() {
  const { id, exerciseId } = useParams();
  const exercise = getExercise(Number(id), Number(exerciseId));
  const navigate = useNavigate();

  if (!exercise) return <h1>Exercise not found</h1>;

  return (
    <Container sx={{ mt: 5 }}>
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
            Back to Workout
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
            {exercise.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: "bold",
            }}
          >
            <FormatListNumberedIcon color="success" />
            Sets
          </Typography>

          <Button
            variant="contained"
            color="success"
            sx={{
              width: "fit-content",
              borderRadius: 3,
              px: 4,
            }}
            onClick={() =>
              navigate(`/workouts/${id}/exercises/${exerciseId}/sets/new`)
            }
          >
            Add Set
          </Button>

          <Stack spacing={2}>
            {exercise.sets.map((set) => (
              <Paper
                key={set.id}
                onClick={() =>
                  navigate(
                    `/workouts/${id}/exercises/${exerciseId}/sets/${set.id}`,
                  )
                }
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "all 0.25s ease",
                  cursor: "pointer",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Typography variant="body1">
                  {set.reps} reps × {set.weight} kg
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
