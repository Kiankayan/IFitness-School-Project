import { type Exercise } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

interface Props {
  exercise: Exercise;
  workoutId: number;
  onDelete: (exerciseId: number) => void;
}

export default function ExerciseCard({ exercise, workoutId, onDelete }: Props) {
  const navigate = useNavigate();

  function handleDelete() {
    onDelete(exercise.id);
  }

  return (
    <Card
      onClick={() =>
        navigate(`/workouts/${workoutId}/exercises/${exercise.id}`)
      }
      sx={{
        mb: 2,
        borderRadius: 4,
        boxShadow: 2,
        transition: "all 0.25s ease",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 5,
        },
      }}
    >
      <CardContent
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
          }}
        >
          <FitnessCenterIcon color="success" />

          <Link
            to={`/workouts/${workoutId}/exercises/${exercise.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {exercise.name}
          </Link>
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
          to={`/workouts/${workoutId}/exercises/${exercise.id}/edit`}
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
            handleDelete();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
