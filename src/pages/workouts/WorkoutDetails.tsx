import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getWorkout, deleteExercise } from "../../services/fakeWorkoutService";
import { ExerciseList } from "../../components/exercises";
import { Container, Paper, Typography, Button, Stack } from "@mui/material";

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
