import { useEffect, useState } from "react";

import { Container, Typography, Paper, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { getWorkouts } from "../services/fakeWorkoutService";
import type { Workout } from "../types/types";

import StatCard from "../components/dashboard/StatCard";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import CheckListIcon from "@mui/icons-material/CheckList";

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

  const progress = Math.min(workouts.length * 25, 100);

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
          <StatCard
            title="Total Workouts"
            value={workouts.length}
            icon={<FitnessCenterIcon color="success" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Exercises"
            value={totalExercises}
            icon={<SportsGymnasticsIcon color="success" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Sets"
            value={totalSets}
            icon={<CheckListIcon color="success" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <StatCard
            title="Progress"
            value={progress}
            suffix="%"
            icon={<TrendingUpIcon color="success" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <StatCard
            title="Calories Burned"
            value={0}
            icon={<LocalFireDepartmentIcon color="success" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
