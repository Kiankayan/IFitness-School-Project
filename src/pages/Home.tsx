import { useEffect, useState } from "react";

import { Container, Typography, Paper, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { getWorkouts } from "../services/fakeWorkoutService";
import type { Workout } from "../types/types";

function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  const totalExercises = workouts.reduce(
    (total, workout) => total + workout.exercises.length,
    0,
  );

  const totalSets = workouts.reduce(
    (total, workout) =>
      total +
      workout.exercises.reduce(
        (exerciseTotal, exercise) => exerciseTotal + exercise.sets.length,
        0,
      ),
    0,
  );

  return (
    <Container>
      <Paper
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4">Welcome back 👋</Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          Ready for today's workout?
        </Typography>

        <Button
          variant="contained"
          color="success"
          sx={{
            mt: 3,
            borderRadius: 3,
            px: 4,
          }}
        >
          Start Workout
        </Button>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {workouts.length}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mt: 2,
              }}
            >
              <FitnessCenterIcon color="success" />
              Total Workouts
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {totalExercises}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mt: 2,
              }}
            >
              <TrendingUpIcon color="success" />
              Total Exercises
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {totalSets}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mt: 2,
              }}
            >
              <LocalFireDepartmentIcon color="success" />
              Total Sets
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
