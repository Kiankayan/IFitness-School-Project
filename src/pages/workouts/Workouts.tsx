import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWorkout, getWorkouts } from "../../services/fakeWorkoutService";
import type { Workout } from "../../types/types";
import { WorkoutList } from "../../components/workouts";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
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

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  function handleDelete(id: number) {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);

    setWorkouts(updatedWorkouts);
    deleteWorkout(id);

    setOpenSnackbar(true);
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Stack spacing={3}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
          }}
        >
          Workouts
        </Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => navigate("/workouts/new")}
          sx={{
            width: "fit-content",
            borderRadius: 3,
            px: 4,
          }}
        >
          Add Workout
        </Button>

        {workouts.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              mt: 3,
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
              No workouts yet
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Create your first workout to start tracking your progress.
            </Typography>
          </Paper>
        ) : (
          <WorkoutList
            workouts={workouts}
            onDelete={(id) => {
              setWorkoutToDelete(id);
              setOpenDialog(true);
            }}
          />
        )}
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Workout?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this workout? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="success" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (workoutToDelete !== null) {
                handleDelete(workoutToDelete);
                setOpenDialog(false);
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
          Workout deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
