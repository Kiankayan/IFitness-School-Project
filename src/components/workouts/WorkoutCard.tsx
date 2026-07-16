import type { Workout } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface Props {
  workout: Workout;
  onDelete: (id: number) => void;
}

export default function WorkoutCard({ workout, onDelete }: Props) {
  const totalExercises = workout.exercises.length;

  const totalSets = workout.exercises.reduce(
    (total, exercise) => total + exercise.sets.length,
    0,
  );

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/workouts/${workout.id}`)}
      sx={{
        mb: 3,
        borderRadius: 4,
        boxShadow: 3,
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FitnessCenterIcon color="success" />

          <Link
            to={`/workouts/${workout.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {workout.title}
          </Link>
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CalendarMonthIcon fontSize="small" />
          {workout.date}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Exercises: {totalExercises}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Sets: {totalSets}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 2,
        }}
      >
        <Button
          component={Link}
          to={`/workouts/${workout.id}/edit`}
          variant="contained"
          color="primary"
          onClick={(event) => event.stopPropagation()}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(workout.id);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
