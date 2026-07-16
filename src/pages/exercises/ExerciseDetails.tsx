import { useParams, useNavigate, Link } from "react-router-dom";
import { getExercise } from "../../services/fakeWorkoutService";
import { Container, Paper, Typography, Button, Stack } from "@mui/material";

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
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
            }}
          >
            {exercise.name}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
            }}
          >
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
                <Link
                  to={`/workouts/${id}/exercises/${exerciseId}/sets/${set.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography variant="body1">
                    {set.reps} reps × {set.weight} kg
                  </Typography>
                </Link>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
