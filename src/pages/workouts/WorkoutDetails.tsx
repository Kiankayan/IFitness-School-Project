import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getWorkout, deleteExercise } from "../../services/fakeWorkoutService";
import { ExerciseList } from "../../components/exercises";
import { Container, Paper, Typography, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function WorkoutsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = getWorkout(Number(id));

  const [exercises, setExercises] = useState(workout ? workout.exercises : []);

  if (!workout) return <h1>Workout not found</h1>;

  function handleDelete(exerciseId: number) {
    deleteExercise(workout!.id, exerciseId);
    const newExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId,
    );

    setExercises(newExercises);
  }

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
            {workout.title}
          </Typography>

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
            Back to Workouts
          </Button>

          <Typography variant="body1" color="text.secondary">
            {workout.date}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
            }}
          >
            Exercises
          </Typography>

          <Button
            variant="contained"
            color="success"
            sx={{
              width: "fit-content",
              borderRadius: 3,
              px: 4,
            }}
            onClick={() => navigate(`/workouts/${id}/exercises/new`)}
          >
            Add Exercise
          </Button>

          <ExerciseList
            exercises={exercises}
            workoutId={workout!.id}
            onDelete={handleDelete}
          />
        </Stack>
      </Paper>
    </Container>
  );
}
