import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExercise } from "../../services/fakeWorkoutService";
import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export default function ExerciseDetails() {
  const { id, exerciseId } = useParams();
  const exercise = getExercise(Number(id), Number(exerciseId));
  const navigate = useNavigate();
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (location.state?.setDeleted) {
      setOpenSnackbar(true);
    }
  }, [location.state]);

  if (!exercise)
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <FitnessCenterIcon
            color="disabled"
            sx={{
              fontSize: 80,
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Exercise not found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 4,
            }}
          >
            The exercise you're looking for doesn't exist or may have been
            deleted.
          </Typography>

          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(`/workouts/${id}`)}
          >
            Back to Workout
          </Button>
        </Paper>
      </Container>
    );

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
            onClick={() => navigate(`/workouts/${id}`)}
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
            Back to Exercises
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

          {exercise.sets.length === 0 ? (
            <Paper
              sx={{
                p: 6,
                mt: 2,
                borderRadius: 4,
                boxShadow: 2,
                textAlign: "center",
              }}
            >
              <FitnessCenterIcon
                color="success"
                sx={{
                  fontSize: 70,
                  mb: 2,
                }}
              />

              <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
                No sets yet
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Add your first set to start tracking your progress.
              </Typography>
            </Paper>
          ) : (
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
          )}
        </Stack>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Set deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
