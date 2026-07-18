import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSet, deleteSet } from "../../services/fakeWorkoutService";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RepeatIcon from "@mui/icons-material/Repeat";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";

export default function SetDetails() {
  const { id, exerciseId, setId } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  function handleDelete() {
    deleteSet(Number(id), Number(exerciseId), Number(setId));

    setOpenDialog(false);

    navigate(`/workouts/${id}/exercises/${exerciseId}`, {
      state: {
        setDeleted: true,
      },
    });
  }

  const set = getSet(Number(id), Number(exerciseId), Number(setId));

  if (!set) return <h1>Set not found</h1>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
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
            Back To Sets
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
            Set Details
          </Typography>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <RepeatIcon color="success" />
            {set.reps} reps
          </Typography>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MonitorWeightIcon color="success" />
            {set.weight} kg
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to={`/workouts/${id}/exercises/${exerciseId}/sets/${setId}/edit`}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDialog(true)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Set?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this set? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
