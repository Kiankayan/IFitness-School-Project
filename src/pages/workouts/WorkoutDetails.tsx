import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getWorkout, deleteExercise } from "../../services/fakeWorkoutService";
import { ExerciseList } from "../../components/exercises";
import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export default function WorkoutsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = getWorkout(Number(id));

  const [exercises, setExercises] = useState(workout ? workout.exercises : []);
  const [openDialog, setOpenDialog] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (!workout) return <h1>Workout not found</h1>;

  function handleDelete(exerciseId: number) {
    deleteExercise(workout!.id, exerciseId);

    const newExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId,
    );

    setExercises(newExercises);

    setOpenDialog(false);

    setOpenSnackbar(true);
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
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              width: "fit-content",
              borderColor: "#4E8B42",
              color: "#4E8B42",
              borderRadius: 2,

              "&:hover": {
                borderColor: "#3d6f34",
                color: "#3d6f34",
                backgroundColor: "rgba(78, 139, 66, 0.08)",
              },
            }}
          >
            Back to Workouts
          </Button>

          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: "bold",
            }}
          >
            <FitnessCenterIcon color="success" fontSize="large" />
            {workout.title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CalendarMonthIcon color="success" />
            {workout.date}
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
            onDelete={(exerciseId) => {
              setExerciseToDelete(exerciseId);
              setOpenDialog(true);
            }}
          />
        </Stack>
      </Paper>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Exercise?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this exercise? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (exerciseToDelete !== null) {
                handleDelete(exerciseToDelete);
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
          Exercise deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
